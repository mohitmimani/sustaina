"use client";

import { TelegramConnect } from "@/components/dashboard/telegram-connect";
import { RecentReceipts } from "@/components/dashboard/recent-receipts";
import { StatsSummary } from "@/components/dashboard/stats-summary";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EnvironmentalImpact } from "@/components/dashboard/environmental-impact";
import { RewardsCard } from "@/components/dashboard/RewardsCard";

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
    <div className="space-y-6">
      {/* Telegram Bot Connection Card */}
      <TelegramConnect />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Receipts */}
        <RecentReceipts />

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

      {/* Rewards Card */}
      <div className="w-full">
        <RewardsCard />
      </div>
    </div>
  );
}
