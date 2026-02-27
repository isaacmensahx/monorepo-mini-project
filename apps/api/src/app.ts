import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import cardRoutes from './routes/card.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

// CORS — supports comma-separated origins from env var
const allowedOrigins = config.cors.origins;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(morgan(config.app.env === 'production' ? 'combined' : 'dev'));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: config.app.env, timestamp: new Date().toISOString() });
});

// Routes
app.use(`${config.app.apiPrefix}/cards`, cardRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
