/*
  Warnings:

  - You are about to drop the column `savedtasklistId` on the `SavedTasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."SavedTasks" DROP CONSTRAINT "SavedTasks_savedtasklistId_fkey";

-- AlterTable
ALTER TABLE "SavedTasks" DROP COLUMN "savedtasklistId";

-- CreateTable
CREATE TABLE "_ListTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ListTasks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ListTasks_B_index" ON "_ListTasks"("B");

-- AddForeignKey
ALTER TABLE "_ListTasks" ADD CONSTRAINT "_ListTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedTaskList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListTasks" ADD CONSTRAINT "_ListTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "SavedTasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
