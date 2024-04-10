/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `channels` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `users_to_channel` table. All the data in the column will be lost.
  - The required column `cuid` was added to the `channels` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `channelCuid` to the `users_to_channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_to_channel" DROP CONSTRAINT "users_to_channel_channelId_fkey";

-- DropIndex
DROP INDEX "users_to_channel_userCuid_channelId_idx";

-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
DROP COLUMN "id",
ADD COLUMN     "cuid" TEXT NOT NULL,
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "users_to_channel" DROP COLUMN "channelId",
ADD COLUMN     "channelCuid" TEXT NOT NULL,
ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "historys_talk_to_channel" (
    "id" BIGSERIAL NOT NULL,
    "channelCuid" TEXT NOT NULL,
    "blobUrl" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "historys_talk_to_channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_to_channel_userCuid_channelCuid_idx" ON "users_to_channel"("userCuid", "channelCuid");

-- AddForeignKey
ALTER TABLE "users_to_channel" ADD CONSTRAINT "users_to_channel_channelCuid_fkey" FOREIGN KEY ("channelCuid") REFERENCES "channels"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys_talk_to_channel" ADD CONSTRAINT "historys_talk_to_channel_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historys_talk_to_channel" ADD CONSTRAINT "historys_talk_to_channel_channelCuid_fkey" FOREIGN KEY ("channelCuid") REFERENCES "channels"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;
