-- CreateTable
CREATE TABLE "users" (
    "cuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("cuid")
);

-- CreateTable
CREATE TABLE "users_to_channel" (
    "id" INTEGER NOT NULL,
    "userCuid" TEXT NOT NULL,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "users_to_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isPuclib" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_to_channel_userCuid_channelId_idx" ON "users_to_channel"("userCuid", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "channels_name_key" ON "channels"("name");

-- AddForeignKey
ALTER TABLE "users_to_channel" ADD CONSTRAINT "users_to_channel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_to_channel" ADD CONSTRAINT "users_to_channel_userCuid_fkey" FOREIGN KEY ("userCuid") REFERENCES "users"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;
