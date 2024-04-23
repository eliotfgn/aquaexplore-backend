import { createId } from '@paralleldrive/cuid2';
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
export const VerificationType = pgEnum('verification_type', [
  'password',
  'account'
]);

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
  deviceNotificationToken: many(deviceNotificationTokens),
  verificationCodes: many(verificationCodes)
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

export const verificationCodes = pgTable('verification_codes', {
  id: varchar('id').primaryKey().default(createId()),
  code: text('code').notNull(),
  type: VerificationType('verification_type').notNull(),
  verified: boolean('verified').notNull().default(false),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp('created_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const verificationCodeRelation = relations(
  verificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationCodes.userId],
      references: [users.id]
    })
  })
);
