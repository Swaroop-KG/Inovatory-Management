import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({ origin: ['process.env.FRONTEND_URL', 'inovatory-management.vercel.app'] }));

// application routes
app.use('/api/v1', rootRouter);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
