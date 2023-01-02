/*
  Warnings:

  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FriendRequest` DROP FOREIGN KEY `FriendRequest_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `FriendRequest` DROP FOREIGN KEY `FriendRequest_senderId_fkey`;

-- AlterTable
ALTER TABLE `Friendship` MODIFY `status` ENUM('recieved', 'pending', 'blocked', 'friends') NOT NULL;

-- DropTable
DROP TABLE `FriendRequest`;
