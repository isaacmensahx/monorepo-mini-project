// apps/api/drizzle.config.ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',          // ← make sure this path is correct!
  out: './drizzle',
  dialect: 'mysql',
  driver: 'mysql2',                      // ← explicitly set this (fixes the --driver error)
  dbCredentials: {
    url: process.env.DATABASE_URL!,      // ← prefer this single field
  },
  verbose: true,
} satisfies Config;