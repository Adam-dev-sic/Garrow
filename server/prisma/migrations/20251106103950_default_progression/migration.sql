-- AlterTable
ALTER TABLE "Daily" ALTER COLUMN "weeklyProgress" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Monthly" ALTER COLUMN "yearlyProgress" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Weekly" ALTER COLUMN "monthlyProgress" SET DEFAULT 0;
