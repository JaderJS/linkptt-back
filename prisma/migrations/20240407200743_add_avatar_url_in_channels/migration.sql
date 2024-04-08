/*
  Warnings:

  - Added the required column `avatarUrl` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
