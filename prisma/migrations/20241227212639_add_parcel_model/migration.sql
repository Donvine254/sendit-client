-- CreateEnum
CREATE TYPE "ParcelStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Parcel" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ParcelStatus" NOT NULL DEFAULT 'PENDING',
    "price" DOUBLE PRECISION NOT NULL,
    "pickupAddress" JSONB NOT NULL DEFAULT '{"street": "", "city": "", "state": "", "postalCode": "", "country": ""}',
    "deliveryAddress" JSONB NOT NULL DEFAULT '{"street": "", "city": "", "state": "", "postalCode": "", "country": ""}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parcel_pkey" PRIMARY KEY ("id")
);
