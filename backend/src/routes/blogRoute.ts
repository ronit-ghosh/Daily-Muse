import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createBlogValidation,
  updateBlogValidation,
} from "@ronit-ghosh/daily-muse-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "5", 10);
  const exclude = (page - 1) * limit;
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
          },
        },
      },
    });

    const blogs = allBlogs.map((blog) => {
      const strippedContent = blog.content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .split(" ")
        .slice(0, 100)
        .join(" ");

      return {
        id: blog.id,
        title: blog.title,
        content: strippedContent,
        created: blog.created,
        authorDetails: blog.User,
      };
    });
    const blogCountPerReq = blogs.length;

    return c.json({
      msg: "All blogs fetched",
      blogs,
      page,
      limit,
      blogCountPerReq,
      totalBlogs,
    });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

blogRoute.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
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
          },
        },
      },
    });
    return c.json({ msg: "Blog fetched", blog });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

blogRoute.use("/*", async (c, next) => {
  const authToken = c.req.header("authorization") || "";
  if (!authToken.startsWith("Bearer ") || authToken === "") {
    c.status(401);
    return c.json({ msg: "Wrong Auth Headers!" });
  }
  const jwtToken = authToken.split(" ")[1];

  try {
    const verifiedToken = await verify(jwtToken, c.env.JWT_SECRET);
    if (!verifiedToken) {
      c.status(401);
      return c.json({ msg: "You are not Authenticated!" });
    }

    c.set("userId", verifiedToken.id as string);

    await next();
    return c.json({ msg: "You are Authenticated" });
  } catch (error) {
    c.status(400);
    c.json({ error });
  }
});

blogRoute.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { title, content } = body;
    const userId = c.get("userId");

    if (!title || !content) {
      c.status(400);
      return c.json({ msg: "Title / Content Cannot be Empty" });
    }

    const parsedvalue = createBlogValidation.safeParse({ title, content });
    if (!parsedvalue.success) {
      c.status(401);
      return c.json({ msg: "Wrong Inputs!" });
    }

    const existingTitle = await prisma.post.findFirst({ where: { title } });
    if (existingTitle) {
      c.status(401);
      return c.json({
        msg: "Title already exists Please choose another title for your blog!",
      });
    }

    const blog = await prisma.post.create({
      data: { title, content, userId },
    });

    return c.json({ msg: "Blog Posted!", id: blog.id });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

blogRoute.get("/user/blogs/:username", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const username =  c.req.param('username')

  try {
    const user = await prisma.user.findFirst({
      where: { username },
      select: { id: true },
    });
    console.log(user)
    if (!user) {
      c.status(400);
      return c.json({ msg: "This username does not exists!" });
    }

    const allBlogs = await prisma.post.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        content: true,
        created: true,
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    const blogs = allBlogs.map((blog) => {
      const strippedContent = blog.content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .split(" ")
        .slice(0, 60)
        .join(" ");
      return {
        id: blog.id,
        title: blog.title,
        content: strippedContent,
        username: blog.User.username,
        created: blog.created,
      };
    });
    return c.json({ msg: "Blogs fetched", blogs });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

blogRoute.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
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
      return c.json({ msg: "Wrong Inputs!" });
    }

    const updatedBlog = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return c.json({ msg: "Blog Updated!", id: updatedBlog.id });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

blogRoute.post("/delete", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { blogId } = body;

  if (!blogId) {
    c.status(400);
    return c.json({ msg: "Blog ID is required!" });
  }

  try {
    await prisma.post.delete({
      where: {
        id: blogId,
      },
    });

    return c.json({ msg: "Blog has been deleted" });
  } catch (error) {
    c.status(400);
    return c.json({ msg: "Error deleting blog", error });
  }
});

export default blogRoute;
