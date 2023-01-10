/*
  Warnings:

  - Added the required column `conversationId` to the `WorkspaceChannel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerMember` DROP FOREIGN KEY `ServerMember_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerMember` DROP FOREIGN KEY `ServerMember_serverId_fkey`;

-- AlterTable
ALTER TABLE `WorkspaceChannel` ADD COLUMN `conversationId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerMember` ADD CONSTRAINT `ServerMember_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerMember` ADD CONSTRAINT `ServerMember_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkspaceChannel` ADD CONSTRAINT `WorkspaceChannel_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
