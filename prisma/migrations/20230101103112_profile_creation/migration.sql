/*
  Warnings:

  - Added the required column `banner` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `banner` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
