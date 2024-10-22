import { log } from 'console';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import 'dotenv/config';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL ?? '');
const db = drizzle(client);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migration done successfully ⚡');
  } catch (err) {
    log(err);
    console.log('An error occurred');
  }
  process.exit(0);
};

main();
