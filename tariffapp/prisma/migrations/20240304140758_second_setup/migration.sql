/*
  Warnings:

  - You are about to drop the column `Status` on the `tariff` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tariff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tariff` DROP COLUMN `Status`,
    DROP COLUMN `price`,
    ADD COLUMN `status` ENUM('ACTIVE', 'NOT_ACTIVE') NOT NULL DEFAULT 'NOT_ACTIVE';
