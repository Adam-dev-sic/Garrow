/*
  Warnings:

  - You are about to drop the column `progression` on the `Weekly` table. All the data in the column will be lost.
  - You are about to drop the column `progression` on the `Yearly` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Monthly" ALTER COLUMN "progress" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalpoints" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Weekly" DROP COLUMN "progression",
ADD COLUMN     "progress" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "Yearly" DROP COLUMN "progression",
ADD COLUMN     "progress" DOUBLE PRECISION DEFAULT 0;
