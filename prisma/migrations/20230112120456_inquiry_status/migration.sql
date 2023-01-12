/*
  Warnings:

  - You are about to drop the column `fname` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `Inquiry` table. All the data in the column will be lost.
  - Added the required column `name` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Inquiry` DROP COLUMN `fname`,
    DROP COLUMN `lname`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
