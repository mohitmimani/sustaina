import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Create a receipt with multiple items for the user
  const receipt = await prisma.receipt.create({
    data: {
      name: "Grocery Shopping",
      date: new Date(),
      amount: "100.00",
      type: "Grocery",
      userId: user.id,
      items: {
        create: [
          {
            name: "Milk",
            weight: "1L",
            category: "Dairy",
            expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            price: 2.5,
            quantity: 2,
            brand: "Brand A",
          },
          {
            name: "Bread",
            weight: "500g",
            category: "Bakery",
            expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            price: 1.5,
            quantity: 1,
            brand: "Brand B",
          },
          {
            name: "Eggs",
            weight: "12pcs",
            category: "Poultry",
            expiry: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            price: 3.0,
            quantity: 1,
            brand: "Brand C",
          },
        ],
      },
    },
  });

  console.log("Seed data created:", { user, receipt });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
