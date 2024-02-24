/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `Vechile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vechile_registrationNumber_key" ON "Vechile"("registrationNumber");
