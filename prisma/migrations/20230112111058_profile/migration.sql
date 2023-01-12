/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_userId_key` ON `Profile`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `userId`,
    MODIFY `status` ENUM('online', 'offline', 'away', 'sleeping') NULL DEFAULT 'online';
