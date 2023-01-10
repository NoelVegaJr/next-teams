/*
  Warnings:

  - You are about to drop the column `workspaceChannelMemberId` on the `TaskAssignee` table. All the data in the column will be lost.
  - You are about to drop the `Friendship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Server` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerInvitationLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskBoard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceChannelMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isComplete` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contributorId` to the `TaskAssignee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isComplete` to the `TaskCheckListItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerInvitationLink` DROP FOREIGN KEY `ServerInvitationLink_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerInvitationLink` DROP FOREIGN KEY `ServerInvitationLink_serverMemberId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerMember` DROP FOREIGN KEY `ServerMember_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ServerMember` DROP FOREIGN KEY `ServerMember_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskAssignee` DROP FOREIGN KEY `TaskAssignee_workspaceChannelMemberId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskList` DROP FOREIGN KEY `TaskList_taskBoardId_fkey`;

-- DropForeignKey
ALTER TABLE `Workspace` DROP FOREIGN KEY `Workspace_serverId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceChannel` DROP FOREIGN KEY `WorkspaceChannel_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceChannel` DROP FOREIGN KEY `WorkspaceChannel_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceChannelMember` DROP FOREIGN KEY `WorkspaceChannelMember_channelId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceChannelMember` DROP FOREIGN KEY `WorkspaceChannelMember_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMember` DROP FOREIGN KEY `WorkspaceMember_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMember` DROP FOREIGN KEY `WorkspaceMember_workspaceId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN `projectId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `companyId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Task` ADD COLUMN `isComplete` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `TaskAssignee` DROP COLUMN `workspaceChannelMemberId`,
    ADD COLUMN `contributorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TaskCheckListItem` ADD COLUMN `isComplete` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `Friendship`;

-- DropTable
DROP TABLE `Server`;

-- DropTable
DROP TABLE `ServerInvitationLink`;

-- DropTable
DROP TABLE `ServerMember`;

-- DropTable
DROP TABLE `TaskBoard`;

-- DropTable
DROP TABLE `Workspace`;

-- DropTable
DROP TABLE `WorkspaceChannel`;

-- DropTable
DROP TABLE `WorkspaceChannelMember`;

-- DropTable
DROP TABLE `WorkspaceMember`;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `phone` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NOT NULL,
    `taskboardId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Project_taskboardId_key`(`taskboardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contributer` (
    `id` VARCHAR(191) NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taskboard` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Taskboard_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Conversation_projectId_key` ON `Conversation`(`projectId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contributer` ADD CONSTRAINT `Contributer_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contributer` ADD CONSTRAINT `Contributer_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taskboard` ADD CONSTRAINT `Taskboard_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskList` ADD CONSTRAINT `TaskList_taskBoardId_fkey` FOREIGN KEY (`taskBoardId`) REFERENCES `Taskboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskAssignee` ADD CONSTRAINT `TaskAssignee_contributorId_fkey` FOREIGN KEY (`contributorId`) REFERENCES `Contributer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
