-- AlterTable
ALTER TABLE "Daily" ALTER COLUMN "weeklyProgress" SET DEFAULT 14.29;

-- AlterTable
ALTER TABLE "Monthly" ALTER COLUMN "yearlyProgress" SET DEFAULT 8.33333333;

-- AlterTable
ALTER TABLE "Weekly" ALTER COLUMN "monthlyProgress" SET DEFAULT 25;
