import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateExistingItems() {
  await prisma.item.updateMany({
    data: {
      wasteCategory: "RECYCLE",
    },
  });
  console.log("Updated all existing items to have isUsed: false");
}

updateExistingItems()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
