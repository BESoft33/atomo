/*
  Warnings:

  - You are about to drop the column `moderatorId` on the `Vechile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vechile" DROP CONSTRAINT "Vechile_moderatorId_fkey";

-- AlterTable
ALTER TABLE "Vechile" DROP COLUMN "moderatorId",
ADD COLUMN     "driverId" INTEGER;

-- AddForeignKey
ALTER TABLE "Vechile" ADD CONSTRAINT "Vechile_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
