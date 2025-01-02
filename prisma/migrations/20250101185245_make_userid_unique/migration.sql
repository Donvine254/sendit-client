/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `shippingAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shippingAddress_userId_key" ON "shippingAddress"("userId");
