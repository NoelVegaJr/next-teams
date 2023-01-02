/*
  Warnings:

  - You are about to drop the column `userId` on the `ConversationParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `user1Id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `ConversationParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `friendId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ConversationParticipant` DROP FOREIGN KEY `ConversationParticipant_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user1Id_fkey`;

-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user2Id_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `ConversationParticipant` DROP COLUMN `userId`,
    ADD COLUMN `profileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Friendship` DROP COLUMN `user1Id`,
    DROP COLUMN `user2Id`,
    ADD COLUMN `friendId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('online', 'offline', 'away', 'sleeping') NOT NULL DEFAULT 'online',
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `status`,
    DROP COLUMN `username`;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_username_key` ON `Profile`(`username`);

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConversationParticipant` ADD CONSTRAINT `ConversationParticipant_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
