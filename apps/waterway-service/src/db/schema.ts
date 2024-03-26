import {
  decimal,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const Country = pgEnum('countryEnum', ['bj']);
export const SpeciesState = pgEnum('speciesState', [
  'endangered',
  'safe',
  'disappearing',
]);

export const waterways = pgTable('waterways', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  length: decimal('length'),
  description: text('description'),
  cover: varchar('cover'),
  gallery: varchar('gallery').array().notNull().default([]),
  country: Country('country').notNull(),
  locality: varchar('locality'),
  longitude: numeric('longitude').notNull(),
  latitude: numeric('latitude').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const waterwayRelations = relations(waterways, ({ many }) => ({
  waterQuality: many(waterQuality),
  species: many(species),
  contribution: many(contributions),
}));

// @ts-ignore
export const waterQuality = pgTable('water_quality', {
  id: uuid('id').primaryKey().defaultRandom(),
  pH: numeric('pH', { scale: 1 }),
  temperature: numeric('temperature', { scale: 1 }),
  turbidity: numeric('turbidity', { scale: 1 }),
  conductivity: numeric('conductivity', { scale: 1 }),
  dissolvedOxygen: numeric('dissolved_oxygen', { scale: 1 }),
  waterwayId: uuid('waterway_id')
    .notNull()
    .references(() => waterways.id),
  contributionId: uuid('contribution_id')
    .notNull()
    .references(() => contributions.id),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const waterQualityRelations = relations(waterQuality, ({ one }) => ({
  waterway: one(waterways, {
    fields: [waterQuality.waterwayId],
    references: [waterways.id],
  }),
  contribution: one(contributions, {
    fields: [waterQuality.contributionId],
    references: [contributions.id],
  }),
}));

export const species = pgTable('species', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  scientificName: varchar('scientific_name').notNull(),
  waterwayId: uuid('waterway_id')
    .notNull()
    .references(() => waterways.id),
  cover: varchar('cover'),
  description: text('description'),
  state: SpeciesState('state').notNull(),
  gallery: varchar('gallery').array().default([]),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const speciesRelation = relations(species, ({ one }) => ({
  waterway: one(waterways, {
    fields: [species.waterwayId],
    references: [waterways.id],
  }),
}));

// @ts-ignore
export const contributions = pgTable('contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributorId: uuid('contributor_id').notNull(),
  waterwayId: uuid('waterway_id')
    .notNull()
    .references(() => waterways.id),
  waterQualityDataId: uuid('water_quality_data_id')
    .references(() => waterQuality.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const contributionRelations = relations(contributions, ({ one }) => ({
  waterway: one(waterways, {
    fields: [contributions.waterwayId],
    references: [waterways.id],
  }),
  data: one(waterQuality, {
    fields: [contributions.waterQualityDataId],
    references: [waterQuality.id],
  }),
}));
