import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth"; // Adjust the import path as necessary

const prisma = new PrismaClient();

const unauthorizedResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);

async function getWasteStats(userId: string) {
  const items = await prisma.item.findMany({
    where: { receipt: { userId } },
    include: { receipt: true },
  });

  const stats: {
    total: number;
    recycled: number;
    composted: number;
    landfill: number;
    monthlyData: {
      month: string;
      recycled: number;
      composted: number;
      landfill: number;
    }[];
    wasteByCategory: {
      category: string;
      amount: number;
      recyclable: boolean;
    }[];
  } = {
    total: 0,
    recycled: 0,
    composted: 0,
    landfill: 0,
    monthlyData: [],
    wasteByCategory: [],
  };

  const monthlyDataMap = new Map<
    string,
    { month: string; recycled: number; composted: number; landfill: number }
  >();
  const wasteByCategoryMap = new Map<
    string,
    { category: string; amount: number; recyclable: boolean }
  >();

  items.forEach((item) => {
    const month = item.receipt.date.toLocaleString("default", {
      month: "short",
    });

    if (!monthlyDataMap.has(month)) {
      monthlyDataMap.set(month, {
        month,
        recycled: 0,
        composted: 0,
        landfill: 0,
      });
    }

    const monthStats = monthlyDataMap.get(month);

    if (monthStats) {
      // Categorizing waste
      switch (item.wasteCategory) {
        case "RECYCLE":
          stats.recycled += item.quantity;
          monthStats.recycled += item.quantity;
          break;
        case "COMPOST":
          stats.composted += item.quantity;
          monthStats.composted += item.quantity;
          break;
        case "LANDFILL":
          stats.landfill += item.quantity;
          monthStats.landfill += item.quantity;
          break;
      }
    }

    stats.total += item.quantity;

    // Waste by material category
    if (!wasteByCategoryMap.has(item.materialCategory)) {
      wasteByCategoryMap.set(item.materialCategory, {
        category: item.materialCategory,
        amount: 0,
        recyclable: item.wasteCategory === "RECYCLE",
      });
    }

    const categoryStats = wasteByCategoryMap.get(item.materialCategory);
    if (categoryStats) {
      categoryStats.amount += item.quantity;
    }
  });

  // Convert maps to arrays
  stats.monthlyData = Array.from(monthlyDataMap.values());
  stats.wasteByCategory = Array.from(wasteByCategoryMap.values());

  return stats;
}

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const stats = await getWasteStats(session.user.id);
  return NextResponse.json(stats);
}
