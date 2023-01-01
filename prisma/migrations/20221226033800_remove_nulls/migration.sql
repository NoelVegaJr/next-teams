/*
  Warnings:

  - Made the column `name` on table `Server` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Server` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Server` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Server` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `image` VARCHAR(191) NOT NULL;
