import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: parseInt(process.env.PORT || '3306', 10),
    env: process.env.NODE_ENV || 'development',
    apiPrefix: '/api/v1',
  },
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'railway',
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

// Startup log — confirms env vars are loaded (remove after debugging)
console.log('[Config] DB_HOST:', process.env.DB_HOST || 'NOT SET — using fallback 127.0.0.1');
console.log('[Config] DB_PORT:', process.env.DB_PORT || 'NOT SET — using fallback 3306');
console.log('[Config] DB_NAME:', process.env.DB_NAME || 'NOT SET — using fallback card_system');

export type AppConfig = typeof config;
