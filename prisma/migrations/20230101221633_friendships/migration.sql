/*
  Warnings:

  - You are about to drop the column `userId` on the `Friendship` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_userId_fkey`;

-- AlterTable
ALTER TABLE `Friendship` DROP COLUMN `userId`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
