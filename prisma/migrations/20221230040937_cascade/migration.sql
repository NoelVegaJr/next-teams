-- DropForeignKey
ALTER TABLE `MessageGroup` DROP FOREIGN KEY `MessageGroup_conversationParticipantId_fkey`;

-- AddForeignKey
ALTER TABLE `MessageGroup` ADD CONSTRAINT `MessageGroup_conversationParticipantId_fkey` FOREIGN KEY (`conversationParticipantId`) REFERENCES `ConversationParticipant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
