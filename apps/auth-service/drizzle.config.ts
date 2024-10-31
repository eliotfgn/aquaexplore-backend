import { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/core/db/schema.ts',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? ''
  }
} satisfies Config;
