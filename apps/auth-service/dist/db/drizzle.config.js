"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.default = {
    schema: './schema.ts',
    out: '.',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
};
//# sourceMappingURL=drizzle.config.js.map