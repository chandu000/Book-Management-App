/*
  Warnings:

  - Made the column `createdAt` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;
