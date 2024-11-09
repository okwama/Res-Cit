-- AlterTable
ALTER TABLE `Order` ADD COLUMN `tableNo` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `OrderProduct` ADD COLUMN `productTitle` VARCHAR(191) NULL;
