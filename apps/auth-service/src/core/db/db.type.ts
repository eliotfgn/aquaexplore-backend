import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

type DbClient = PostgresJsDatabase<typeof schema>;

export default DbClient;
