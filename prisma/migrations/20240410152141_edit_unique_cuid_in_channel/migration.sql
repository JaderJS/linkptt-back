/*
  Warnings:

  - A unique constraint covering the columns `[cuid]` on the table `channels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "channels_cuid_key" ON "channels"("cuid");
