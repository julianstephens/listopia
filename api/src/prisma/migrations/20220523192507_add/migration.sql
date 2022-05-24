/*
  Warnings:

  - Added the required column `modified` to the `List` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `List` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `modified` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ListItem` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `modified` DATETIME(3) NOT NULL;
