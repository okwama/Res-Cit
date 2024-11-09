-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userEmail_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `userEmail` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `user`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
