-- ========================================
-- JHAGUAR RIDE CLEANUP SQL COMMANDS
-- ========================================
-- Use these commands to directly clean up the database
-- when API methods are not working or for emergency cleanup
--
-- IMPORTANT: Always backup your database before running these commands!
-- Execute these commands in your PostgreSQL console connected to the database
--
-- The problematic ride ID mentioned: aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0
-- ========================================

-- 1. INSPECT THE SPECIFIC PROBLEMATIC RIDE
-- ========================================
SELECT
    r.id,
    r.status as ride_status,
    r."originAddress",
    r."destinationAddress",
    r."finalPrice",
    r."createdAt",
    r."dropOffTime",
    pu.firstName as passenger_name,
    pu.email as passenger_email,
    du.firstName as driver_name,
    du.email as driver_email,
    p.status as payment_status,
    p.method as payment_method,
    p.amount as payment_amount,
    p."confirmedByDriver",
    p."driverConfirmationTime",
    d."isAvailable" as driver_available,
    d."isActiveTrip" as driver_active_trip
FROM "Ride" r
LEFT JOIN "Passenger" pass ON r."passengerId" = pass.id
LEFT JOIN "User" pu ON pass."userId" = pu.id
LEFT JOIN "Driver" d ON r."driverId" = d.id
LEFT JOIN "User" du ON d."userId" = du.id
LEFT JOIN "Payment" p ON r.id = p."rideId"
WHERE r.id = 'aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0';

-- 2. CHECK ALL COMPLETED RIDES WITH PENDING PAYMENTS
-- ========================================
SELECT
    r.id,
    r.status as ride_status,
    r."originAddress",
    r."finalPrice",
    r."createdAt",
    p.status as payment_status,
    p.method as payment_method,
    pu.firstName as passenger_name,
    du.firstName as driver_name
FROM "Ride" r
LEFT JOIN "Payment" p ON r.id = p."rideId"
LEFT JOIN "Passenger" pass ON r."passengerId" = pass.id
LEFT JOIN "User" pu ON pass."userId" = pu.id
LEFT JOIN "Driver" d ON r."driverId" = d.id
LEFT JOIN "User" du ON d."userId" = du.id
WHERE r.status = 'COMPLETED'
  AND p.status = 'PENDING';

-- 3. CHECK FOR ANY RIDES BLOCKING NEW CREATION
-- ========================================
-- Find rides in states that could block new ride creation
SELECT
    r.id,
    r.status,
    r."passengerId",
    r."createdAt",
    EXTRACT(EPOCH FROM (NOW() - r."createdAt")) / 60 as age_minutes,
    pu.firstName as passenger_name,
    pu.email as passenger_email
FROM "Ride" r
LEFT JOIN "Passenger" pass ON r."passengerId" = pass.id
LEFT JOIN "User" pu ON pass."userId" = pu.id
WHERE r.status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED')
  AND (
    r.status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
    OR (r.status = 'COMPLETED' AND EXISTS (
      SELECT 1 FROM "Payment" p
      WHERE p."rideId" = r.id AND p.status = 'PENDING'
    ))
  )
ORDER BY r."createdAt" DESC;

-- 4. EMERGENCY FIX: UPDATE PAYMENT STATUS TO PAID
-- ========================================
-- This fixes the immediate blocking issue
-- Execute this for the specific problematic ride
UPDATE "Payment"
SET
    status = 'PAID',
    "confirmedByDriver" = true,
    "driverConfirmationTime" = NOW(),
    "driverNotes" = 'Payment confirmed via emergency cleanup SQL'
WHERE "rideId" = 'aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0'
  AND status = 'PENDING';

-- Verify the update
SELECT * FROM "Payment"
WHERE "rideId" = 'aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0';

-- 5. MARK DRIVER AS AVAILABLE (if needed)
-- ========================================
-- Make sure the driver is available for new rides
UPDATE "Driver"
SET
    "isAvailable" = true,
    "isActiveTrip" = false
WHERE id IN (
    SELECT "driverId"
    FROM "Ride"
    WHERE id = 'aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0'
);

-- 6. BULK FIX: ALL COMPLETED RIDES WITH PENDING PAYMENTS
-- ========================================
-- Use this to fix ALL rides with the same issue
-- CAUTION: This affects multiple rides, test first!

-- First, check how many will be affected:
SELECT COUNT(*) as affected_count
FROM "Payment" p
INNER JOIN "Ride" r ON p."rideId" = r.id
WHERE r.status = 'COMPLETED'
  AND p.status = 'PENDING';

-- If the count looks reasonable, execute the update:
UPDATE "Payment"
SET
    status = 'PAID',
    "confirmedByDriver" = true,
    "driverConfirmationTime" = NOW(),
    "driverNotes" = 'Payment confirmed via bulk cleanup SQL'
WHERE "rideId" IN (
    SELECT r.id
    FROM "Ride" r
    WHERE r.status = 'COMPLETED'
) AND status = 'PENDING';

-- 7. PROCESS WALLET TRANSFERS (if needed)
-- ========================================
-- For wallet-paid rides, you might need to process the actual transfer
-- First, check which rides need wallet processing:
SELECT
    r.id as ride_id,
    r."finalPrice",
    p.method,
    p.status,
    pw.balance as passenger_balance,
    dw.balance as driver_balance,
    pu.firstName as passenger_name,
    du.firstName as driver_name
FROM "Ride" r
INNER JOIN "Payment" p ON r.id = p."rideId"
INNER JOIN "Passenger" pass ON r."passengerId" = pass.id
INNER JOIN "User" pu ON pass."userId" = pu.id
LEFT JOIN "UserWallet" pw ON pu.id = pw."userId"
LEFT JOIN "Driver" d ON r."driverId" = d.id
LEFT JOIN "User" du ON d."userId" = du.id
LEFT JOIN "UserWallet" dw ON du.id = dw."userId"
WHERE r.status = 'COMPLETED'
  AND p.method = 'WALLET_BALANCE'
  AND p.status = 'PENDING';

-- 8. CLEAN UP OLD ORPHANED RIDES (older than 1 hour)
-- ========================================
-- Delete very old rides that are clearly abandoned
-- CAUTION: This permanently deletes data!

-- First, see what would be deleted:
SELECT
    r.id,
    r.status,
    r."createdAt",
    EXTRACT(EPOCH FROM (NOW() - r."createdAt")) / 3600 as age_hours,
    pu.firstName as passenger_name
FROM "Ride" r
LEFT JOIN "Passenger" pass ON r."passengerId" = pass.id
LEFT JOIN "User" pu ON pass."userId" = pu.id
WHERE r.status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
  AND r."createdAt" < NOW() - INTERVAL '1 hour';

-- If you want to delete them (PERMANENT):
/*
BEGIN;

-- Delete related records first
DELETE FROM "RideStatusHistory"
WHERE "rideId" IN (
    SELECT id FROM "Ride"
    WHERE status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
    AND "createdAt" < NOW() - INTERVAL '1 hour'
);

DELETE FROM "Payment"
WHERE "rideId" IN (
    SELECT id FROM "Ride"
    WHERE status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
    AND "createdAt" < NOW() - INTERVAL '1 hour'
);

DELETE FROM "Transaction"
WHERE "rideId" IN (
    SELECT id FROM "Ride"
    WHERE status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
    AND "createdAt" < NOW() - INTERVAL '1 hour'
);

-- Delete the rides
DELETE FROM "Ride"
WHERE status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
  AND "createdAt" < NOW() - INTERVAL '1 hour';

-- Make sure all drivers are available
UPDATE "Driver"
SET "isAvailable" = true, "isActiveTrip" = false
WHERE "isActiveTrip" = true
  AND id NOT IN (
    SELECT DISTINCT "driverId"
    FROM "Ride"
    WHERE status IN ('ACCEPTED', 'IN_PROGRESS')
    AND "driverId" IS NOT NULL
  );

COMMIT;
*/

-- 9. RESET USER RIDE CREATION LOCKS
-- ========================================
-- If the application has any cache-based locks, this clears them from DB side
-- Check for any passengers who might be considered "in ride" but shouldn't be

SELECT
    pu.id as user_id,
    pu.firstName,
    pu.email,
    COUNT(r.id) as active_rides
FROM "User" pu
INNER JOIN "Passenger" pass ON pu.id = pass."userId"
LEFT JOIN "Ride" r ON pass.id = r."passengerId"
    AND r.status IN ('REQUESTED', 'ACCEPTED', 'IN_PROGRESS')
GROUP BY pu.id, pu.firstName, pu.email
HAVING COUNT(r.id) > 1; -- Users with more than 1 active ride (shouldn't happen)

-- 10. VERIFICATION QUERIES
-- ========================================
-- Run these after cleanup to verify everything is clean

-- Check the specific ride is fixed:
SELECT
    r.id,
    r.status,
    p.status as payment_status,
    p."confirmedByDriver",
    d."isAvailable",
    d."isActiveTrip"
FROM "Ride" r
LEFT JOIN "Payment" p ON r.id = p."rideId"
LEFT JOIN "Driver" d ON r."driverId" = d.id
WHERE r.id = 'aeac2eef-d8e3-4ffb-bc11-db02ab5bf5b0';

-- Check no more problematic rides exist:
SELECT COUNT(*) as problematic_rides_count
FROM "Ride" r
LEFT JOIN "Payment" p ON r.id = p."rideId"
WHERE r.status = 'COMPLETED' AND p.status = 'PENDING';

-- Check all drivers are properly available:
SELECT
    COUNT(*) as stuck_drivers
FROM "Driver" d
LEFT JOIN "Ride" r ON d.id = r."driverId"
    AND r.status IN ('ACCEPTED', 'IN_PROGRESS')
WHERE d."isActiveTrip" = true
  AND r.id IS NULL; -- Drivers marked as active but no active ride

-- ========================================
-- SUMMARY OF RECOMMENDED ACTIONS:
-- ========================================
--
-- FOR IMMEDIATE FIX (run these in order):
-- 1. Run query #1 to inspect the specific ride
-- 2. Run query #4 to fix the payment status
-- 3. Run query #5 to make driver available
-- 4. Run verification queries #10
--
-- FOR COMPREHENSIVE CLEANUP:
-- 1. Run query #2 to see all affected rides
-- 2. Run query #6 to fix all similar issues
-- 3. Run query #8 to clean up old orphaned rides (optional)
-- 4. Run verification queries #10
--
-- REMEMBER: Always backup your database before running these commands!
-- ========================================