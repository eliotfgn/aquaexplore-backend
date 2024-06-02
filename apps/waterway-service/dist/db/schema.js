"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributionRelations = exports.contributions = exports.speciesRelation = exports.species = exports.waterQualityRelations = exports.waterQuality = exports.waterwayRelations = exports.waterways = exports.SpeciesState = exports.Country = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.Country = (0, pg_core_1.pgEnum)('countryEnum', ['bj']);
exports.SpeciesState = (0, pg_core_1.pgEnum)('speciesState', [
    'endangered',
    'safe',
    'disappearing',
]);
exports.waterways = (0, pg_core_1.pgTable)('waterways', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    length: (0, pg_core_1.decimal)('length'),
    description: (0, pg_core_1.text)('description'),
    cover: (0, pg_core_1.varchar)('cover'),
    gallery: (0, pg_core_1.varchar)('gallery').array().notNull().default([]),
    country: (0, exports.Country)('country').notNull(),
    locality: (0, pg_core_1.varchar)('locality'),
    longitude: (0, pg_core_1.numeric)('longitude').notNull(),
    latitude: (0, pg_core_1.numeric)('latitude').notNull(),
    createdAt: (0, pg_core_1.timestamp)('createdAt').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt'),
});
exports.waterwayRelations = (0, drizzle_orm_1.relations)(exports.waterways, ({ many }) => ({
    waterQuality: many(exports.waterQuality),
    species: many(exports.species),
    contribution: many(exports.contributions),
}));
exports.waterQuality = (0, pg_core_1.pgTable)('water_quality', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    pH: (0, pg_core_1.numeric)('pH', { scale: 1 }),
    temperature: (0, pg_core_1.numeric)('temperature', { scale: 1 }),
    turbidity: (0, pg_core_1.numeric)('turbidity', { scale: 1 }),
    conductivity: (0, pg_core_1.numeric)('conductivity', { scale: 1 }),
    dissolvedOxygen: (0, pg_core_1.numeric)('dissolved_oxygen', { scale: 1 }),
    waterwayId: (0, pg_core_1.uuid)('waterway_id')
        .notNull()
        .references(() => exports.waterways.id),
    contributionId: (0, pg_core_1.uuid)('contribution_id')
        .notNull()
        .references(() => exports.contributions.id),
    createdAt: (0, pg_core_1.timestamp)('createdAt').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt'),
});
exports.waterQualityRelations = (0, drizzle_orm_1.relations)(exports.waterQuality, ({ one }) => ({
    waterway: one(exports.waterways, {
        fields: [exports.waterQuality.waterwayId],
        references: [exports.waterways.id],
    }),
    contribution: one(exports.contributions, {
        fields: [exports.waterQuality.contributionId],
        references: [exports.contributions.id],
    }),
}));
exports.species = (0, pg_core_1.pgTable)('species', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    scientificName: (0, pg_core_1.varchar)('scientific_name').notNull(),
    waterwayId: (0, pg_core_1.uuid)('waterway_id')
        .notNull()
        .references(() => exports.waterways.id),
    cover: (0, pg_core_1.varchar)('cover'),
    description: (0, pg_core_1.text)('description'),
    state: (0, exports.SpeciesState)('state').notNull(),
    gallery: (0, pg_core_1.varchar)('gallery').array().default([]),
    createdAt: (0, pg_core_1.timestamp)('createdAt').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt'),
});
exports.speciesRelation = (0, drizzle_orm_1.relations)(exports.species, ({ one }) => ({
    waterway: one(exports.waterways, {
        fields: [exports.species.waterwayId],
        references: [exports.waterways.id],
    }),
}));
exports.contributions = (0, pg_core_1.pgTable)('contributions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    contributorId: (0, pg_core_1.uuid)('contributor_id').notNull(),
    waterwayId: (0, pg_core_1.uuid)('waterway_id')
        .notNull()
        .references(() => exports.waterways.id),
    waterQualityDataId: (0, pg_core_1.uuid)('water_quality_data_id')
        .references(() => exports.waterQuality.id)
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.contributionRelations = (0, drizzle_orm_1.relations)(exports.contributions, ({ one }) => ({
    waterway: one(exports.waterways, {
        fields: [exports.contributions.waterwayId],
        references: [exports.waterways.id],
    }),
    data: one(exports.waterQuality, {
        fields: [exports.contributions.waterQualityDataId],
        references: [exports.waterQuality.id],
    }),
}));
//# sourceMappingURL=schema.js.map