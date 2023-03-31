/*
  Warnings:

  - You are about to drop the `time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "time";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(500) NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFiles_userId_fkey" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(500) NOT NULL,
    "extname" TEXT NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uid" TEXT NOT NULL,

    CONSTRAINT "UserFiles_userId_fkey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_uid_key" ON "UserToken"("uid");

-- CreateIndex
CREATE INDEX "UserFiles_uid_fkey" ON "UserFiles_userId_fkey"("uid");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFiles_userId_fkey" ADD CONSTRAINT "UserFiles_userId_fkey_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
