import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { compareSync } from "bcrypt-ts";
import { sign } from "hono/jwt";
import { signinValidation } from "@ronit-ghosh/daily-muse-common";

const signinRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

signinRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { email, password } = body;

        if (!email || !password) {
            c.status(422);
            return c.json({ msg: "Inputs cannot be Empty!" });
        }

        const parsedvalue = signinValidation.safeParse({ email, password });
        const signinValidationError = parsedvalue.error?.issues[0].message;
        if (!parsedvalue.success) {
            c.status(422);
            return c.json({ msg: signinValidationError });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (!existingUser) {
            c.status(409);
            return c.json({ msg: "User does not Exists, Please Signup First!" });
        }

        const hashedPassword = existingUser.password;
        const passwordMatched = compareSync(password, hashedPassword);
        if (!passwordMatched) {
            c.status(401);
            return c.json({ msg: "Password is Incorrect!" });
        }

        const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);

        return c.json({ msg: "Logged in Successfully", token, username: existingUser.username });
    } catch (error) {
        c.status(400);
        return c.json({ error });
    }
});

export default signinRoute;
