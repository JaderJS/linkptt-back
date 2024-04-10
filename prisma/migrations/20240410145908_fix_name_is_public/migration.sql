/*
  Warnings:

  - You are about to drop the column `isPuclib` on the `channels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "channels" DROP COLUMN "isPuclib",
ADD COLUMN     "isPuclic" BOOLEAN NOT NULL DEFAULT true;
