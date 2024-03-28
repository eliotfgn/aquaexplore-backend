"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.Role = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.Role = (0, pg_core_1.pgEnum)('role', ['user', 'expert', 'admin']);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    email: (0, pg_core_1.varchar)('email').notNull().unique(),
    password: (0, pg_core_1.varchar)('password').notNull(),
    firstName: (0, pg_core_1.varchar)('first_name'),
    lastName: (0, pg_core_1.varchar)('last_name'),
    isVerified: (0, pg_core_1.boolean)('is_verified').notNull().default(true),
    role: (0, exports.Role)('user_role').notNull().default('user'),
    deviceNotificationTokens: (0, pg_core_1.varchar)('device_notification_tokens')
        .array()
        .default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at'),
});
//# sourceMappingURL=schema.js.map