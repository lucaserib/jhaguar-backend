-- AlterEnum
ALTER TYPE "MessageSenderType" ADD VALUE 'SYSTEM';

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatId_fkey";

-- DropForeignKey
ALTER TABLE "RideChat" DROP CONSTRAINT "RideChat_rideId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "RideChat" ADD COLUMN     "endedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "RideChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideChat" ADD CONSTRAINT "RideChat_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE CASCADE ON UPDATE CASCADE;
