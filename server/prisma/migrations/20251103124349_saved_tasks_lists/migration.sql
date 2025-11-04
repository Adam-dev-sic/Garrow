-- CreateTable
CREATE TABLE "SavedTaskList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SavedTaskList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedTasks" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "savedtasklistId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "linkedProgress" INTEGER,
    "linkedTo" TEXT,
    "progress" DOUBLE PRECISION,

    CONSTRAINT "SavedTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedTasks_uuid_key" ON "SavedTasks"("uuid");

-- AddForeignKey
ALTER TABLE "SavedTaskList" ADD CONSTRAINT "SavedTaskList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedTasks" ADD CONSTRAINT "SavedTasks_savedtasklistId_fkey" FOREIGN KEY ("savedtasklistId") REFERENCES "SavedTaskList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
