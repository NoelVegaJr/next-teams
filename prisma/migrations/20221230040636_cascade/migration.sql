-- DropForeignKey
ALTER TABLE `ConversationParticipant` DROP FOREIGN KEY `ConversationParticipant_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_messageGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `MessageGroup` DROP FOREIGN KEY `MessageGroup_conversationId_fkey`;

-- AddForeignKey
ALTER TABLE `ConversationParticipant` ADD CONSTRAINT `ConversationParticipant_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MessageGroup` ADD CONSTRAINT `MessageGroup_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_messageGroupId_fkey` FOREIGN KEY (`messageGroupId`) REFERENCES `MessageGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
