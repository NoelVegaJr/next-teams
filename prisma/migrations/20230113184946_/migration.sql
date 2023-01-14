-- AlterTable
ALTER TABLE `Task` MODIFY `description` TEXT NULL,
    MODIFY `isComplete` BOOLEAN NOT NULL DEFAULT false;
