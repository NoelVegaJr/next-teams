/*
  Warnings:

  - You are about to drop the column `messageGroupId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `MessageGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_messageGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageGroup` DROP FOREIGN KEY `MessageGroup_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageGroup` DROP FOREIGN KEY `MessageGroup_conversationParticipantId_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `messageGroupId`,
    ADD COLUMN `conversationId` VARCHAR(191) NOT NULL,
    ADD COLUMN `participantId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `MessageGroup`;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `ConversationParticipant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
