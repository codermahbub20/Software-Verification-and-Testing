import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import notFound from './app/middlewares/notFound';

const app: Application = express();

// Use CORS with proper configuration
app.use(
  cors({
    origin: 'https://crm-project-frontend.vercel.app', // ✅ your frontend URL
    credentials: true, // ✅ allow cookies, headers, etc.
  }),
);

app.use(express.json());

// Application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello CRM World!');
});

app.use(globalErrorHandler);

// app.use(notFound);

export default app;
