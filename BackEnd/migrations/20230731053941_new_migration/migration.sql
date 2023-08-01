-- AlterTable
ALTER TABLE `Book` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NULL,
    MODIFY `publicationYear` INTEGER NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;
