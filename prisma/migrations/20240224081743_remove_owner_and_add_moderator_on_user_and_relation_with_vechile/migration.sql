/*
  Warnings:

  - The values [OWNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ownerId` on the `Vechile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moderatorId]` on the table `Vechile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moderatorId` to the `Vechile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('DRIVER', 'MECHANIC', 'MODERATOR');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Vechile" DROP CONSTRAINT "Vechile_ownerId_fkey";

-- DropIndex
DROP INDEX "Vechile_ownerId_key";

-- AlterTable
ALTER TABLE "Vechile" DROP COLUMN "ownerId",
ADD COLUMN     "moderatorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vechile_moderatorId_key" ON "Vechile"("moderatorId");

-- AddForeignKey
ALTER TABLE "Vechile" ADD CONSTRAINT "Vechile_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
