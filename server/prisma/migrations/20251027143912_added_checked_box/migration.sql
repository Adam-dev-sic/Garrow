-- AlterTable
ALTER TABLE "Daily" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Monthly" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Weekly" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Yearly" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;
