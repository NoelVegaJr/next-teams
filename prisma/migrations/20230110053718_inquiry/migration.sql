/*
  Warnings:

  - You are about to drop the column `city` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Inquiry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Inquiry` DROP COLUMN `city`,
    DROP COLUMN `state`,
    DROP COLUMN `zip`;
