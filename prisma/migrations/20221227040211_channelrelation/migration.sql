/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `WorkspaceChannelMember` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `WorkspaceChannelMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `WorkspaceChannelMember` DROP FOREIGN KEY `WorkspaceChannelMember_workspaceId_fkey`;

-- AlterTable
ALTER TABLE `WorkspaceChannelMember` DROP COLUMN `workspaceId`,
    ADD COLUMN `channelId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WorkspaceChannelMember` ADD CONSTRAINT `WorkspaceChannelMember_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `WorkspaceChannel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
