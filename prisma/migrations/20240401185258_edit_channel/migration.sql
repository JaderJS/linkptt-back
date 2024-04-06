/*
  Warnings:

  - Added the required column `createdBy` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `channels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('root', 'user');

-- CreateEnum
CREATE TYPE "TypeUserChannel" AS ENUM ('admin', 'user');

-- DropForeignKey
ALTER TABLE "users_to_channel" DROP CONSTRAINT "users_to_channel_channelId_fkey";

-- DropForeignKey
ALTER TABLE "users_to_channel" DROP CONSTRAINT "users_to_channel_userCuid_fkey";

-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "TypeUser" NOT NULL;

-- AlterTable
ALTER TABLE "users_to_channel" ADD COLUMN     "type" "TypeUserChannel" NOT NULL DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "users_to_channel" ADD CONSTRAINT "users_to_channel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_to_channel" ADD CONSTRAINT "users_to_channel_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "users"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;
