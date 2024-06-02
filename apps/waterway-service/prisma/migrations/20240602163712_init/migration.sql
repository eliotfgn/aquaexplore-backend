-- CreateEnum
CREATE TYPE "CountryEnum" AS ENUM ('BJ');

-- CreateEnum
CREATE TYPE "SpeciesState" AS ENUM ('ENDANGERED', 'SAFE', 'DISAPPEARING');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "ContributionResourceType" AS ENUM ('water_quality', 'species', 'gallery', 'tip');

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "format" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "waterwaysId" TEXT,
    "speciesId" TEXT,
    "contributionId" TEXT,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "flag" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waterways" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "length" DECIMAL(65,30),
    "description" TEXT,
    "cover" TEXT,
    "countryId" TEXT NOT NULL,
    "locality" TEXT,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "waterways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_quality_data" (
    "id" TEXT NOT NULL,
    "pH" DOUBLE PRECISION,
    "temperature" DOUBLE PRECISION,
    "turbidity" DOUBLE PRECISION,
    "conductivity" DOUBLE PRECISION,
    "dissolvedOxygen" DOUBLE PRECISION,
    "waterwayId" TEXT NOT NULL,
    "contributionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "water_quality_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "waterwayId" TEXT NOT NULL,
    "cover" TEXT,
    "description" TEXT,
    "state" "SpeciesState" NOT NULL,
    "contributionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contriutions" (
    "id" TEXT NOT NULL,
    "type" "ContributionResourceType" NOT NULL DEFAULT 'water_quality',
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "contributorId" TEXT NOT NULL,
    "contributorProfilePic" TEXT,
    "contributorName" TEXT NOT NULL,
    "waterwayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contriutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_url_key" ON "media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "media_contributionId_key" ON "media"("contributionId");

-- CreateIndex
CREATE UNIQUE INDEX "water_quality_data_contributionId_key" ON "water_quality_data"("contributionId");

-- CreateIndex
CREATE UNIQUE INDEX "species_contributionId_key" ON "species"("contributionId");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_waterwaysId_fkey" FOREIGN KEY ("waterwaysId") REFERENCES "waterways"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "contriutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "waterways" ADD CONSTRAINT "waterways_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_quality_data" ADD CONSTRAINT "water_quality_data_waterwayId_fkey" FOREIGN KEY ("waterwayId") REFERENCES "waterways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_quality_data" ADD CONSTRAINT "water_quality_data_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "contriutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "species" ADD CONSTRAINT "species_waterwayId_fkey" FOREIGN KEY ("waterwayId") REFERENCES "waterways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "species" ADD CONSTRAINT "species_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "contriutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contriutions" ADD CONSTRAINT "contriutions_waterwayId_fkey" FOREIGN KEY ("waterwayId") REFERENCES "waterways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
