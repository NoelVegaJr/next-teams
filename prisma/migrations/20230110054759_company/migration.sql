/*
  Warnings:

  - You are about to drop the column `about` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Company` DROP COLUMN `about`,
    DROP COLUMN `city`,
    DROP COLUMN `state`,
    DROP COLUMN `zip`;
