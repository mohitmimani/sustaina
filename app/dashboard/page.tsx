"use client";

import { TelegramConnect } from "@/components/dashboard/telegram-connect";
import { RecentReceipts } from "@/components/dashboard/recent-receipts";
import { StatsSummary } from "@/components/dashboard/stats-summary";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EnvironmentalImpact } from "@/components/dashboard/environmental-impact";
import { RewardsCard } from "@/components/dashboard/RewardsCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Telegram Bot Connection Card */}
      <TelegramConnect />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Receipts */}
        <RecentReceipts />

        {/* Statistics */}
        <StatsSummary />

        {/* Actions & Impact */}
        <div className="space-y-6 md:col-span-3 xl:col-span-1">
          {/* Actions Card */}
          <QuickActions />

          {/* Environmental Impact Card */}
          <EnvironmentalImpact />
        </div>
      </div>

      {/* Rewards Card */}
      <div className="w-full">
        <RewardsCard />
      </div>
    </div>
  );
}
