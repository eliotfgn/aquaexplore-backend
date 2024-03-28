import { relations } from 'drizzle-orm';
import {
  timestamp,
  varchar,
  pgTable,
  pgEnum,
  uuid,
  boolean,
  text
} from 'drizzle-orm/pg-core';

export const Role = pgEnum('role', ['user', 'admin', 'expert']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  isVerified: boolean('is_verified').notNull().default(true),
  role: Role('role').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const userRelations = relations(users, ({ many }) => ({
  deviceNotificationToken: many(deviceNotificationTokens)
}));

export const deviceNotificationTokens = pgTable('device_notification_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: text('token').notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id)
});

export const deviceNotificationTokenRelations = relations(
  deviceNotificationTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [deviceNotificationTokens.userId],
      references: [users.id]
    })
  })
);
