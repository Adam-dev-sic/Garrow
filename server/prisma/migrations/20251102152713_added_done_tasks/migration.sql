-- CreateTable
CREATE TABLE "DoneTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkedTo" TEXT,
    "progress" DOUBLE PRECISION,

    CONSTRAINT "DoneTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoneTask" ADD CONSTRAINT "DoneTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
