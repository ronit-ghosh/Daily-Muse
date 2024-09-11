import { Hono } from 'hono';
import mainRoute from './routes/mainRoute';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/*', cors({
    origin: "http://localhost:5173",
    allowMethods: ['GET', 'POST', 'PUT']
}))

app.get('/', (c) => { return c.text('Hi There!'); });

app.route('/api/v1', mainRoute);

export default app;
