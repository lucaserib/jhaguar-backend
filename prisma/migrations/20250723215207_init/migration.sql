-- CreateEnum
CREATE TYPE "RideTypeEnum" AS ENUM ('STANDARD', 'FEMALE_ONLY', 'LUXURY', 'ARMORED', 'MOTORCYCLE', 'DELIVERY', 'EXPRESS', 'SCHEDULED', 'SHARED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VehicleType" ADD VALUE 'MOTORCYCLE';
ALTER TYPE "VehicleType" ADD VALUE 'ARMORED_CAR';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "isArmoredVehicle" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "deliveryInstructions" TEXT,
ADD COLUMN     "isDelivery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rideTypeConfigId" TEXT;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "deliveryCapable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isArmored" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLuxury" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMotorcycle" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RideTypeConfig" (
    "id" TEXT NOT NULL,
    "type" "RideTypeEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "femaleOnly" BOOLEAN NOT NULL DEFAULT false,
    "requiresArmored" BOOLEAN NOT NULL DEFAULT false,
    "vehicleTypes" "VehicleType"[],
    "basePrice" DOUBLE PRECISION NOT NULL,
    "pricePerKm" DOUBLE PRECISION NOT NULL,
    "pricePerMin" DOUBLE PRECISION NOT NULL,
    "surgeMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "minimumPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideTypeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverRideType" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "rideTypeId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverRideType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RideTypeConfig_type_key" ON "RideTypeConfig"("type");

-- CreateIndex
CREATE INDEX "RideTypeConfig_name_idx" ON "RideTypeConfig"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DriverRideType_driverId_rideTypeId_key" ON "DriverRideType"("driverId", "rideTypeId");

-- AddForeignKey
ALTER TABLE "DriverRideType" ADD CONSTRAINT "DriverRideType_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverRideType" ADD CONSTRAINT "DriverRideType_rideTypeId_fkey" FOREIGN KEY ("rideTypeId") REFERENCES "RideTypeConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_rideTypeConfigId_fkey" FOREIGN KEY ("rideTypeConfigId") REFERENCES "RideTypeConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;
