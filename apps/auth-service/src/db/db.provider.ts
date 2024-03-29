import postgres from 'postgres';
import 'dotenv/config';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import DbClient from './db.type';
import { Provider } from '@nestjs/common';

export const DB_CLIENT = 'DB_CLIENT';

export const DbProvider: Provider = {
  provide: DB_CLIENT,
  useFactory: () => {
    const sql = postgres(process.env.DATABASE_URL ?? '');
    const db: DbClient = drizzle(sql, { schema });

    return db;
  }
};
