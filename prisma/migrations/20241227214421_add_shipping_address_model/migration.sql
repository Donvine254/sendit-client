-- CreateTable
CREATE TABLE "shippingAddress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "shippingAddress_pkey" PRIMARY KEY ("id")
);
