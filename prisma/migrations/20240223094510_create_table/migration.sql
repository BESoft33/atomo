-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'UNDERMAINTAINANCE', 'RETIRED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DRIVER', 'MECHANIC', 'OWNER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastname" TEXT,
    "role" "Role",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vechile" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "buildYear" TIMESTAMP(3) NOT NULL,
    "buyYear" TIMESTAMP(3) NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "currentStatus" "Status" NOT NULL DEFAULT 'ACTIVE',
    "location" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vechile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vechile_ownerId_key" ON "Vechile"("ownerId");

-- AddForeignKey
ALTER TABLE "Vechile" ADD CONSTRAINT "Vechile_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
