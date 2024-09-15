import { Hono } from "hono";
import signupRoute from "./signupRoute";
import signinRoute from "./signinRoute";
import blogRoute from "./blogRoute";
import { verify } from "hono/jwt";

const mainRoute = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

mainRoute.route("/signup", signupRoute);
mainRoute.route("/signin", signinRoute);
mainRoute.route("/blog", blogRoute);

mainRoute.post("/me", async (c) => {
  const authToken = c.req.header("authorization") || "";
  if (!authToken.startsWith("Bearer ") || authToken === "") {
    c.status(400);
    return c.json({ msg: "Wrong Auth Headers!" });
  }
  const jwtToken = authToken.split(" ")[1];
  try {
    await verify(jwtToken, c.env.JWT_SECRET);
    return c.json({ msg: "You are Logged In" });
  } catch (error) {
    c.status(400);
    return c.json({ msg: "You are not Logged In, Please Login!" });
  }
});

export default mainRoute;
