/*
  Warnings:

  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `about` VARCHAR(191) NULL,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `banner` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NULL;
