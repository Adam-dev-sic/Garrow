import { PrismaClient } from "../generated/prisma/index.js";

// scripts/backfillGettingStarted.js

const prisma = new PrismaClient();

try {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const existing = await prisma.achievements.findFirst({
      where: { userId: user.id, title: "Getting Started" },
    });

    if (!existing) {
      await prisma.achievements.create({
        data: {
          title: "Getting Started",
          description:
            "Welcome, Getting started is always the first step Champion! Work hard, grind points, and get more Achievements!",
          difficulty: "champion",
          userId: user.id,
        },
      });
      console.log(`✅ Added achievement for ${user.email}`);
    }
  }
  const PeopleILove = await prisma.user.findFirst({
    where: { email: "ademyak2006@gmail.com" },
  });
  const existingAchiev = await prisma.achievements.findFirst({
    where: { userId: PeopleILove.id, title: "The Secret Achievement" },
  });

  if (!existingAchiev) {
    await prisma.achievements.create({
      data: {
        title: "The Secret Achievement",
        description: "Only few people worthy of this achievement :p",
        difficulty: "unobtainable",
        userId: PeopleILove.id,
      },
    });
    console.log(`✅ Unobtainable Achievement added for ${PeopleILove.email}`);
  }
  const myLovelyGirl = await prisma.user.findFirst({
    where: { email: "lilyvrxa@gmail.com" },
  });
  const myGirlAchiev = await prisma.achievements.findFirst({
    where: { userId: myLovelyGirl.id, title: "My Lovely Girlfriend" },
  });
  if (!myGirlAchiev) {
    await prisma.achievements.create({
      data: {
        title: "My Lovely Girlfriend",
        description: "Special achievement for my precious girl <3",
        difficulty: "special",
        userId: myLovelyGirl.id,
      },
    });
    console.log(`✅ Added achievement for ${myLovelyGirl.email}`);
  }
  console.log("🎯 Backfill complete.");
} catch (err) {
  console.error("❌ Backfill failed:", err);
} finally {
  await prisma.$disconnect();
}
