import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: parseInt(process.env.PORT || '3001', 10),
    env: process.env.NODE_ENV || 'development',
    apiPrefix: '/api/v1',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Clarityhitman47!',
    database: process.env.DB_NAME || 'XSPLocal',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5173').split(','),
  },
  analytics: {
    enabled: process.env.ANALYTICS_ENABLED !== 'false',
    logLevel: process.env.ANALYTICS_LOG_LEVEL || 'info',
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
};

export type AppConfig = typeof config;
