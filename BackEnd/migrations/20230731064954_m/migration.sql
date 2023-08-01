/*
  Warnings:

  - Made the column `title` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publicationYear` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `author` VARCHAR(191) NOT NULL,
    MODIFY `publicationYear` INTEGER NOT NULL;
