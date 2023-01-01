-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `Profile`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
