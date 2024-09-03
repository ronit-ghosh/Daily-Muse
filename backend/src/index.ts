import { Hono } from 'hono';
import mainRoute from './routes/mainRoute';

const app = new Hono();

app.get('/', (c) => { return c.text('Hi There!'); });

app.route('/api/v1', mainRoute);

export default app;
