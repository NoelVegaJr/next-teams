/*
  Warnings:

  - You are about to drop the column `userId` on the `WorkspaceChannelMember` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkspaceMember` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `WorkspaceChannelMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `WorkspaceChannelMember` DROP FOREIGN KEY `WorkspaceChannelMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMember` DROP FOREIGN KEY `WorkspaceMember_userId_fkey`;

-- AlterTable
ALTER TABLE `WorkspaceChannelMember` DROP COLUMN `userId`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WorkspaceMember` DROP COLUMN `userId`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkspaceMember` ADD CONSTRAINT `WorkspaceMember_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkspaceChannelMember` ADD CONSTRAINT `WorkspaceChannelMember_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
