import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

// Log the frontend URL for debugging
console.log('Frontend URL:', process.env.FRONTEND_URL);

// CORS configuration
app.use(
    cors({
      origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'https://inovatory-management.vercel.app',
        'https://inovatory-management-rrsh-5lekeqjep-swaroops-projects-6c84d2ee.vercel.app',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true, // Allows cookies and authentication headers
    })
  );
  
  // Explicitly handle preflight requests
 
console.log('Frontend URL:', process.env.FRONTEND_URL); // Debugging


// Handle preflight requests
app.options('*', cors());

// Application routes
app.use('/api/v1', rootRouter);

// Global error handler
app.use(globalErrorHandler);

// 404 Not Found middleware
app.use(notFound);

export default app;
