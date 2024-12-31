/*
  Warnings:

  - Added the required column `updatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Invoice_userId_parcelId_idx" ON "Invoice"("userId", "parcelId");

-- CreateIndex
CREATE INDEX "shippingAddress_userId_idx" ON "shippingAddress"("userId");
