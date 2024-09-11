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

    const page = parseInt(c.req.query('page') || '1', 10)
    const limit = parseInt(c.req.query('limit') || '5', 10)
    const exclude = (page - 1) * limit
    const totalBlogs = await prisma.post.count();
    try {
        const allBlogs = await prisma.post.findMany({
            skip: exclude,
            take: limit,
            select: {
                id: true,
                title: true,
                content: true,
                created: true,
                User: {
                    select: {
                        firstname: true,
                        lastname: true,
                        username: true,
                    }
                }
            }
        });

        const blogs = allBlogs.map(blog => {
            return {
                id: blog.id,
                title: blog.title,
                content: blog.content.split(' ').slice(0, 100).join(' '),
                created: blog.created,
                authorDetails: blog.User
            }
        });
        const blogCountPerReq = blogs.length

        return c.json({ msg: "All blogs fetched", blogs, page, limit, totalBlogs, blogCountPerReq });
    } catch (error) {
        c.status(400); 
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
            select: {
                title: true,
                content: true,
                created: true,
                User: {
                    select: {
                        firstname: true,
                        lastname: true,
                        username: true,
                        bio: true,
                    }
                }
            }
        });
        return c.json({ msg: "Blog fetched", blog });
    } catch (error) {
        c.status(400); 
        return c.json({ error });
    }
});

blogRoute.use('/*', async (c, next) => {
    const authToken = c.req.header("authorization") || "";
    if (!authToken.startsWith('Bearer ') || authToken === "") {
        c.status(401);
        return c.json({ msg: "Wrong Auth Headers!" });
    }
    const jwtToken = authToken.split(' ')[1];

    try {
        const verifiedToken = await verify(jwtToken, c.env.JWT_SECRET);
        if (!verifiedToken) {
            c.status(401);
            return c.json({ msg: "You are not Authenticated!" });
        }

        c.set('userId', verifiedToken.id as string);

        await next();
        return c.json({ msg: "You are Authenticated" });
    } catch (error) {
        c.status(400);
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

        if (!title || !content) {
            c.status(400);
            return c.json({ msg: "Title / Content Cannot be Empty" });
        }

        const parsedvalue = createBlogValidation.safeParse({ title, content });
        if (!parsedvalue.success) {
            c.status(401);
            return c.json({ msg: "Wrong Inputs!" })
        }

        const blog = await prisma.post.create({
            data: { title, content, userId }
        });

        return c.json({ msg: "Blog Posted!", id: blog.id });
    } catch (error) {
        c.status(400);
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

        if (!title || !content) {
            c.status(400);
            return c.json({ msg: "Title / Content Cannot be Empty" });
        }

        const parsedvalue = updateBlogValidation.safeParse({ id, title, content });
        if (!parsedvalue.success) {
            c.status(401);
            return c.json({ msg: "Wrong Inputs!" })
        }

        const blog = await prisma.post.update({
            where: { id },
            data: { title, content }
        });

        return c.json({ msg: "Blog Updated!", id: blog.id });
    } catch (error) {
        c.status(400);
        return c.json({ error });
    }
});

export default blogRoute;
