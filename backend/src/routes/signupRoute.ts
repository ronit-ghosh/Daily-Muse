import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { signupValidation } from "@ronit-ghosh/daily-muse-common";

const signupRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>(); // Without the generic ts will complain that "c.env" does not have a type

signupRoute.post("/", async (c) => {
  // Getting the Prisma Client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { username, firstname, lastname, bio, email, password } = body;

    if (!username || !firstname || !lastname || !bio || !email || !password) {
      c.status(422);
      return c.json({ msg: "Inputs cannot be Empty!" });
    }

    const parsedvalue = signupValidation.safeParse({
      username,
      firstname,
      lastname,
      bio,
      email,
      password,
    });
    const signupValidationError = parsedvalue.error?.issues[0].message;
    if (!parsedvalue.success) {
      c.status(422);
      return c.json({ msg: signupValidationError });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (existingUser) {
      c.status(409);
      return c.json({
        msg: "This Email/Username Already Exists, Please Login!",
      });
    }

    const salt = genSaltSync(11);
    const hashedPassword = hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        firstname,
        lastname,
        bio,
        email,
        password: hashedPassword,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ msg: "User Created Successfully", token, username });
  } catch (error) {
    c.status(400);
    return c.json({ error });
  }
});

export default signupRoute;
