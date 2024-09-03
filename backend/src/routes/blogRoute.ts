import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogValidation, updateBlogValidation } from "@ronit-ghosh/daily-muse-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const allBlogs = await prisma.post.findMany();

        const blogs = allBlogs.map(blog => {
            return {
                title: blog.title,
                content: blog.content,
            }
        });

        return c.json({ msg: "All blogs fetched", blogs });
    } catch (error) {
        return c.json({ error });
    }
});

blogRoute.use('/*', async (c, next) => {
    const authToken = c.req.header("authorization") || "";
    if (!authToken.startsWith('Bearer ') || authToken === "") {
        return c.json({ msg: "Wrong Auth Headers!" });
    }
    const jwtToken = authToken.split(' ')[1];

    try {
        const verifiedToken = await verify(jwtToken, c.env.JWT_SECRET);
        if (!verifiedToken) {
            return c.json({ msg: "You are not Authenticated!" });
        }

        c.set('userId', verifiedToken.id as string);

        await next();
        return c.json({ msg: "You are Authenticated" });
    } catch (error) {
        c.json({ error });
    }
});

blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { title, content } = body;
        const userId = c.get('userId')

        const parsedvalue = createBlogValidation.safeParse({ title, content });
        if (!parsedvalue.success) {
            return c.json({ msg: "Wrong Inputs!" })
        }

        const blog = await prisma.post.create({
            data: { title, content, userId }
        });

        return c.json({ msg: "Blog Posted!", id: blog.id });
    } catch (error) {
        return c.json({ error });
    }
});

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { id, title, content } = body;

        const parsedvalue = updateBlogValidation.safeParse({ id, title, content });
        if (!parsedvalue.success) {
            return c.json({ msg: "Wrong Inputs!" })
        }

        const blog = await prisma.post.update({
            where: { id },
            data: { title, content }
        });

        return c.json({ msg: "Blog Updated!", id: blog.id });
    } catch (error) {
        return c.json({ error });
    }
});

blogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        const blog = await prisma.post.findFirst({
            where: { id },
        });
        return c.json({ msg: "Blog fetched", title: blog?.title, content: blog?.content });
    } catch (error) {
        return c.json({ error });
    }
});

export default blogRoute;
