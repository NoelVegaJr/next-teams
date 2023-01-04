/*
  Warnings:

  - A unique constraint covering the columns `[profileId,serverId]` on the table `ServerMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ServerMember_profileId_serverId_key` ON `ServerMember`(`profileId`, `serverId`);
