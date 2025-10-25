/*
  Warnings:

  - You are about to drop the column `monthlyProgress` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyProgress` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyProgress` on the `Weekly` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Daily" DROP COLUMN "monthlyProgress",
DROP COLUMN "yearlyProgress";

-- AlterTable
ALTER TABLE "Weekly" DROP COLUMN "yearlyProgress";
