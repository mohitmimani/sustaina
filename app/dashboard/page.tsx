"use client";

import { TelegramConnect } from "@/components/dashboard/telegram-connect";
import { RecentReceipts } from "@/components/dashboard/recent-receipts";
import { StatsSummary } from "@/components/dashboard/stats-summary";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EnvironmentalImpact } from "@/components/dashboard/environmental-impact";

// Mock data for the dashboard
const recentReceipts = [
  {
    id: 1,
    name: "Grocery Store",
    date: "May 15, 2023",
    amount: "12.5kg",
    type: "Mixed",
    items: [
      { name: "Plastic packaging", weight: "3.2kg", category: "Recycle" },
      { name: "Food waste", weight: "5.1kg", category: "Compost" },
      { name: "Paper bags", weight: "2.7kg", category: "Recycle" },
      { name: "Non-recyclables", weight: "1.5kg", category: "Landfill" },
    ],
  },
  {
    id: 2,
    name: "Farmers Market",
    date: "May 12, 2023",
    amount: "8.2kg",
    type: "Compost",
    items: [
      { name: "Vegetable scraps", weight: "4.5kg", category: "Compost" },
      { name: "Fruit peels", weight: "3.7kg", category: "Compost" },
    ],
  },
  {
    id: 3,
    name: "Electronics Store",
    date: "May 10, 2023",
    amount: "5.7kg",
    type: "Recycle",
    items: [
      { name: "Cardboard boxes", weight: "3.2kg", category: "Recycle" },
      { name: "Plastic packaging", weight: "1.8kg", category: "Recycle" },
      { name: "Styrofoam", weight: "0.7kg", category: "Landfill" },
    ],
  },
  {
    id: 4,
    name: "Department Store",
    date: "May 5, 2023",
    amount: "3.1kg",
    type: "Landfill",
    items: [
      {
        name: "Non-recyclable plastics",
        weight: "2.1kg",
        category: "Landfill",
      },
      { name: "Mixed materials", weight: "1.0kg", category: "Landfill" },
    ],
  },
];

const stats = {
  total: 100,
  recycled: 70,
  composted: 20,
  landfill: 10,
  monthlyData: [
    { month: "Jan", recycled: 65, composted: 15, landfill: 20 },
    { month: "Feb", recycled: 68, composted: 17, landfill: 15 },
    { month: "Mar", recycled: 70, composted: 20, landfill: 10 },
    { month: "Apr", recycled: 72, composted: 22, landfill: 6 },
    { month: "May", recycled: 75, composted: 20, landfill: 5 },
  ],
  wasteByCategory: [
    { category: "Paper", amount: 30, recyclable: true },
    { category: "Plastic", amount: 25, recyclable: true },
    { category: "Food", amount: 20, recyclable: true },
    { category: "Glass", amount: 15, recyclable: true },
    { category: "Metal", amount: 5, recyclable: true },
    { category: "Other", amount: 5, recyclable: false },
  ],
};

export default function Dashboard() {
  const treesEquivalent = (stats.recycled * 0.17).toFixed(1);
  const waterSaved = (stats.recycled * 13.3).toFixed(1);
  const co2Reduced = (stats.recycled * 2.5).toFixed(1);

  return (
    <>
      {/* Telegram Bot Connection Card */}
      <TelegramConnect />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Receipts */}
        <RecentReceipts receipts={recentReceipts} />

        {/* Statistics */}
        <StatsSummary stats={stats} />

        {/* Actions & Impact */}
        <div className="space-y-6 md:col-span-3 lg:col-span-1">
          {/* Actions Card */}
          <QuickActions />

          {/* Environmental Impact Card */}
          <EnvironmentalImpact
            treesEquivalent={treesEquivalent}
            waterSaved={waterSaved}
            co2Reduced={co2Reduced}
          />
        </div>
      </div>
    </>
  );
}
