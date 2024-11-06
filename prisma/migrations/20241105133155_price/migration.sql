/*
  Warnings:

  - You are about to alter the column `additionalPrice` on the `Option` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Option` MODIFY `additionalPrice` DECIMAL(65, 30) NOT NULL;
