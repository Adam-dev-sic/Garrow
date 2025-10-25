-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily" (
    "id" SERIAL NOT NULL,
    "goal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,
    "weeklyProgress" DOUBLE PRECISION DEFAULT 0,
    "monthlyProgress" DOUBLE PRECISION DEFAULT 0,
    "yearlyProgress" DOUBLE PRECISION DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "weeklyId" INTEGER,
    "monthlyId" INTEGER,
    "yearlyId" INTEGER,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weekly" (
    "id" SERIAL NOT NULL,
    "goal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,
    "progression" DOUBLE PRECISION,
    "monthlyProgress" DOUBLE PRECISION DEFAULT 0,
    "yearlyProgress" DOUBLE PRECISION DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "monthlyId" INTEGER,
    "yearlyId" INTEGER,

    CONSTRAINT "Weekly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monthly" (
    "id" SERIAL NOT NULL,
    "goal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,
    "progress" DOUBLE PRECISION,
    "yearlyProgress" DOUBLE PRECISION DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "yearlyId" INTEGER,

    CONSTRAINT "Monthly_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yearly" (
    "id" SERIAL NOT NULL,
    "goal" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 0,
    "progression" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Yearly_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_weeklyId_fkey" FOREIGN KEY ("weeklyId") REFERENCES "Weekly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_monthlyId_fkey" FOREIGN KEY ("monthlyId") REFERENCES "Monthly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Daily" ADD CONSTRAINT "Daily_yearlyId_fkey" FOREIGN KEY ("yearlyId") REFERENCES "Yearly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_monthlyId_fkey" FOREIGN KEY ("monthlyId") REFERENCES "Monthly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly" ADD CONSTRAINT "Weekly_yearlyId_fkey" FOREIGN KEY ("yearlyId") REFERENCES "Yearly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly" ADD CONSTRAINT "Monthly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly" ADD CONSTRAINT "Monthly_yearlyId_fkey" FOREIGN KEY ("yearlyId") REFERENCES "Yearly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yearly" ADD CONSTRAINT "Yearly_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
