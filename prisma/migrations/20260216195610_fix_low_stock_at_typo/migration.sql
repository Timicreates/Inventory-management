/*
  Warnings:

  - You are about to drop the column `losStockAt` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "losStockAt",
ADD COLUMN     "lowStockAt" INTEGER;
