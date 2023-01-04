/*
  Warnings:

  - You are about to drop the column `userId` on the `ServerMember` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `ServerMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ServerMember` DROP FOREIGN KEY `ServerMember_userId_fkey`;

-- AlterTable
ALTER TABLE `ServerMember` DROP COLUMN `userId`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ServerMember` ADD CONSTRAINT `ServerMember_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
