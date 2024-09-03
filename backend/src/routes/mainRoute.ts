import { Hono } from "hono";
import signupRoute from "./signupRoute";
import signinRoute from "./signinRoute";
import blogRoute from "./blogRoute";

const mainRoute = new Hono();

mainRoute.route('/signup', signupRoute);
mainRoute.route('/signin', signinRoute);
mainRoute.route('/blog', blogRoute);

export default mainRoute;
