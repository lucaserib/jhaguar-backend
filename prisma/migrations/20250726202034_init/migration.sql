/*
  Warnings:

  - The values [ARMORED_CAR,PET_FRIENDLY,DELIVERY] on the enum `VehicleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VehicleType_new" AS ENUM ('ECONOMY', 'COMFORT', 'LUXURY', 'SUV', 'VAN', 'MOTORCYCLE');
ALTER TABLE "Vehicle" ALTER COLUMN "vehicleType" TYPE "VehicleType_new" USING ("vehicleType"::text::"VehicleType_new");
ALTER TABLE "RideTypeConfig" ALTER COLUMN "vehicleTypes" TYPE "VehicleType_new"[] USING ("vehicleTypes"::text::"VehicleType_new"[]);
ALTER TYPE "VehicleType" RENAME TO "VehicleType_old";
ALTER TYPE "VehicleType_new" RENAME TO "VehicleType";
DROP TYPE "VehicleType_old";
COMMIT;

-- DropEnum
DROP TYPE "RideType";
