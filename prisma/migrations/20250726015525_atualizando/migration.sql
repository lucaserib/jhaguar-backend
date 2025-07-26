/*
  Warnings:

  - The values [STANDARD,FEMALE_ONLY,LUXURY,ARMORED,MOTORCYCLE,EXPRESS,SCHEDULED,SHARED] on the enum `RideTypeEnum` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isArmoredVehicle` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `rideType` on the `Ride` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentType" ADD VALUE 'ARMORED_VEHICLE_CERTIFICATE';
ALTER TYPE "DocumentType" ADD VALUE 'MOTORCYCLE_LICENSE';
ALTER TYPE "DocumentType" ADD VALUE 'PET_TRANSPORT_CERTIFICATE';

-- AlterEnum
BEGIN;
CREATE TYPE "RideTypeEnum_new" AS ENUM ('NORMAL', 'EXECUTIVO', 'BLINDADO', 'PET', 'MULHER', 'DELIVERY', 'MOTO');
ALTER TABLE "RideTypeConfig" ALTER COLUMN "type" TYPE "RideTypeEnum_new" USING ("type"::text::"RideTypeEnum_new");
ALTER TYPE "RideTypeEnum" RENAME TO "RideTypeEnum_old";
ALTER TYPE "RideTypeEnum_new" RENAME TO "RideTypeEnum";
DROP TYPE "RideTypeEnum_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VehicleType" ADD VALUE 'PET_FRIENDLY';
ALTER TYPE "VehicleType" ADD VALUE 'DELIVERY';

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "isArmoredVehicle",
ADD COLUMN     "isPetFriendly" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "rideType",
ADD COLUMN     "hasPets" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "petDescription" TEXT;

-- AlterTable
ALTER TABLE "RideTypeConfig" ADD COLUMN     "allowMotorcycle" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeliveryOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxDistance" INTEGER,
ADD COLUMN     "minDistance" INTEGER,
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "requiresPetFriendly" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "isPetFriendly" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "DriverRideType_driverId_idx" ON "DriverRideType"("driverId");

-- CreateIndex
CREATE INDEX "DriverRideType_rideTypeId_idx" ON "DriverRideType"("rideTypeId");

-- CreateIndex
CREATE INDEX "Ride_rideTypeConfigId_idx" ON "Ride"("rideTypeConfigId");

-- CreateIndex
CREATE INDEX "RideTypeConfig_type_idx" ON "RideTypeConfig"("type");

-- CreateIndex
CREATE INDEX "RideTypeConfig_isActive_idx" ON "RideTypeConfig"("isActive");

-- CreateIndex
CREATE INDEX "RideTypeConfig_priority_idx" ON "RideTypeConfig"("priority");
