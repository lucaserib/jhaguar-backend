-- CreateEnum
CREATE TYPE "RideRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "DriverLocation" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "heading" DECIMAL(5,2),
    "speed" DECIMAL(5,2),
    "accuracy" DECIMAL(5,2),
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRequest" (
    "id" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "rideTypeId" TEXT NOT NULL,
    "pickupAddress" TEXT NOT NULL,
    "pickupLatitude" DECIMAL(10,8) NOT NULL,
    "pickupLongitude" DECIMAL(11,8) NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "destinationLatitude" DECIMAL(10,8) NOT NULL,
    "destinationLongitude" DECIMAL(11,8) NOT NULL,
    "estimatedPrice" DECIMAL(10,2),
    "estimatedDistance" INTEGER,
    "estimatedDuration" INTEGER,
    "status" "RideRequestStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideStatusHistory" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "previousStatus" TEXT,
    "newStatus" TEXT NOT NULL,
    "locationLatitude" DECIMAL(10,8),
    "locationLongitude" DECIMAL(11,8),
    "notes" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RideStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DriverLocation_driverId_idx" ON "DriverLocation"("driverId");

-- CreateIndex
CREATE INDEX "DriverLocation_latitude_longitude_idx" ON "DriverLocation"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "DriverLocation_isOnline_isAvailable_idx" ON "DriverLocation"("isOnline", "isAvailable");

-- CreateIndex
CREATE INDEX "DriverLocation_createdAt_idx" ON "DriverLocation"("createdAt");

-- CreateIndex
CREATE INDEX "RideRequest_status_idx" ON "RideRequest"("status");

-- CreateIndex
CREATE INDEX "RideRequest_passengerId_idx" ON "RideRequest"("passengerId");

-- CreateIndex
CREATE INDEX "RideRequest_rideTypeId_idx" ON "RideRequest"("rideTypeId");

-- CreateIndex
CREATE INDEX "RideRequest_expiresAt_idx" ON "RideRequest"("expiresAt");

-- CreateIndex
CREATE INDEX "RideRequest_pickupLatitude_pickupLongitude_idx" ON "RideRequest"("pickupLatitude", "pickupLongitude");

-- CreateIndex
CREATE INDEX "RideStatusHistory_rideId_idx" ON "RideStatusHistory"("rideId");

-- CreateIndex
CREATE INDEX "RideStatusHistory_driverId_idx" ON "RideStatusHistory"("driverId");

-- CreateIndex
CREATE INDEX "RideStatusHistory_changedAt_idx" ON "RideStatusHistory"("changedAt");

-- AddForeignKey
ALTER TABLE "DriverLocation" ADD CONSTRAINT "DriverLocation_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequest" ADD CONSTRAINT "RideRequest_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequest" ADD CONSTRAINT "RideRequest_rideTypeId_fkey" FOREIGN KEY ("rideTypeId") REFERENCES "RideTypeConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideStatusHistory" ADD CONSTRAINT "RideStatusHistory_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideStatusHistory" ADD CONSTRAINT "RideStatusHistory_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
