-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_profileId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `profileId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
