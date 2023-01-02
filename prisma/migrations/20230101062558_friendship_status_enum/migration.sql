/*
  Warnings:

  - Added the required column `status` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Friendship` ADD COLUMN `status` ENUM('pending', 'blocked', 'friends') NOT NULL;
