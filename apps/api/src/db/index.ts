import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { config } from '../config';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;
let pool: mysql.Pool;

export const getDb = async () => {
  if (!db) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      // Required for Railway and most hosted MySQL providers
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });

    db = drizzle(pool, { schema, mode: 'default' });
  }
  return db;
};

export const closeDb = async () => {
  if (pool) {
    await pool.end();
  }
};

export { schema };
