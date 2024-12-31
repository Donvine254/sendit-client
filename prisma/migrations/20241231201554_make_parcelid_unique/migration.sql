/*
  Warnings:

  - A unique constraint covering the columns `[parcelId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_parcelId_key" ON "Invoice"("parcelId");
