/*
  Warnings:

  - You are about to drop the column `monthlyId` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `weeklyId` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyId` on the `Daily` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyId` on the `Monthly` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyId` on the `Weekly` table. All the data in the column will be lost.
  - You are about to drop the column `yearlyId` on the `Weekly` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `Daily` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `DoneTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Monthly` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Weekly` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Yearly` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Daily` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `uuid` to the `DoneTask` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Monthly` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Weekly` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Yearly` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "public"."Daily" DROP CONSTRAINT "Daily_monthlyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Daily" DROP CONSTRAINT "Daily_weeklyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Daily" DROP CONSTRAINT "Daily_yearlyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Monthly" DROP CONSTRAINT "Monthly_yearlyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Weekly" DROP CONSTRAINT "Weekly_monthlyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Weekly" DROP CONSTRAINT "Weekly_yearlyId_fkey";

-- AlterTable
ALTER TABLE "Daily" DROP COLUMN "monthlyId",
DROP COLUMN "weeklyId",
DROP COLUMN "yearlyId",
ADD COLUMN     "monthlyUuid" TEXT,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD COLUMN     "weeklyUuid" TEXT,
ADD COLUMN     "yearlyUuid" TEXT;

-- AlterTable
ALTER TABLE "DoneTask" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Monthly" DROP COLUMN "yearlyId",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD COLUMN     "yearlyUuid" TEXT;

-- AlterTable
ALTER TABLE "Weekly" DROP COLUMN "monthlyId",
DROP COLUMN "yearlyId",
ADD COLUMN     "monthlyUuid" TEXT,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD COLUMN     "yearlyUuid" TEXT;

-- AlterTable
ALTER TABLE "Yearly" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Daily_uuid_key" ON "Daily"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "DoneTask_uuid_key" ON "DoneTask"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Monthly_uuid_key" ON "Monthly"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Weekly_uuid_key" ON "Weekly"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Yearly_uuid_key" ON "Yearly"("uuid");

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_weeklyUuid_fkey" FOREIGN KEY ("weeklyUuid") REFERENCES "Weekly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_monthlyUuid_fkey" FOREIGN KEY ("monthlyUuid") REFERENCES "Monthly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_yearlyUuid_fkey" FOREIGN KEY ("yearlyUuid") REFERENCES "Yearly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_monthlyUuid_fkey" FOREIGN KEY ("monthlyUuid") REFERENCES "Monthly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_yearlyUuid_fkey" FOREIGN KEY ("yearlyUuid") REFERENCES "Yearly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly" ADD CONSTRAINT "Monthly_yearlyUuid_fkey" FOREIGN KEY ("yearlyUuid") REFERENCES "Yearly"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
