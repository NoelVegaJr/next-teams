-- CreateTable
CREATE TABLE `ServerInvitationLink` (
    `id` VARCHAR(191) NOT NULL,
    `serverId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `serverMemberId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServerInvitationLink` ADD CONSTRAINT `ServerInvitationLink_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServerInvitationLink` ADD CONSTRAINT `ServerInvitationLink_serverMemberId_fkey` FOREIGN KEY (`serverMemberId`) REFERENCES `ServerMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
