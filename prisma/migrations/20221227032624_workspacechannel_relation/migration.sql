-- AddForeignKey
ALTER TABLE `WorkspaceChannel` ADD CONSTRAINT `WorkspaceChannel_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `Workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
