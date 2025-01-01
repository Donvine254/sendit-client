/*
  Warnings:

  - You are about to drop the column `city` on the `shippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `shippingAddress` table. All the data in the column will be lost.
  - Added the required column `address` to the `shippingAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `shippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parcel" ALTER COLUMN "pickupAddress" SET DEFAULT '{"region": "", "district": "", "address": "", "fullName": "","phone": "", "email": ""}',
ALTER COLUMN "deliveryAddress" SET DEFAULT '{"region": "", "district": "", "address": "", "fullName": "","phone": "", "email": ""}';

-- AlterTable
ALTER TABLE "shippingAddress" DROP COLUMN "city",
DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
