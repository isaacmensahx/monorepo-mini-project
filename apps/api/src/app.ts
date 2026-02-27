import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config';
import cardRoutes from './routes/card.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({ origin: config.cors.origins }));
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
