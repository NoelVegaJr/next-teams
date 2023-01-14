/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `status` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `Profile` MODIFY `status` ENUM('online', 'offline', 'away', 'sleeping') NOT NULL DEFAULT 'offline',
    MODIFY `companyId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `profileId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_profileId_key` ON `User`(`profileId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
