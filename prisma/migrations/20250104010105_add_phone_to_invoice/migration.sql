/*
  Warnings:

  - Added the required column `email` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;
