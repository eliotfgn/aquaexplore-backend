"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const migrator_1 = require("drizzle-orm/postgres-js/migrator");
const sql = neon(process.env.DATABASE_URL ?? '');
const db = (0, postgres_js_1.drizzle)(sql);
const main = async () => {
    await (0, migrator_1.migrate)(db, { migrationsFolder: '../../drizzle/migrations' });
    await sql.end();
};
main();
//# sourceMappingURL=migrate.js.map