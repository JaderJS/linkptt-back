/*
  Warnings:

  - You are about to drop the column `isPuclic` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "isPuclic",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
