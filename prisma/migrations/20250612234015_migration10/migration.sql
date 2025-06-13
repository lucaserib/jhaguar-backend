-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "isActiveTrip" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastLocationUpdate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Driver_isOnline_isAvailable_idx" ON "Driver"("isOnline", "isAvailable");

-- CreateIndex
CREATE INDEX "Driver_accountStatus_idx" ON "Driver"("accountStatus");
