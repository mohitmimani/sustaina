"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CommunityComparisonProps {
  userRate: number
  communityAverage: number
  topPerformers: number
}

export function CommunityComparison({ userRate, communityAverage, topPerformers }: CommunityComparisonProps) {
  return (
    <Card className="backdrop-blur-md bg-white/70 dark:bg-slate-900 border-green-100 dark:border-green-900/30 shadow-sm">
      <CardHeader>
        <CardTitle className="dark:text-gray-300">Community Comparison</CardTitle>
        <CardDescription className="dark:text-gray-400">
          See how your recycling rate compares to others
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-300">Your Recycling Rate</span>
            <span className="font-medium dark:text-green-400">{userRate}%</span>
          </div>
          <Progress value={userRate} className="h-2 bg-gray-100 dark:bg-slate-900" indicatorClassName="bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-300">Community Average</span>
            <span className="font-medium dark:text-gray-300">{communityAverage}%</span>
          </div>
          <Progress value={communityAverage} className="h-2 bg-gray-100 dark:bg-slate-900" indicatorClassName="bg-gray-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="dark:text-gray-300">Top Performers</span>
            <span className="font-medium dark:text-gray-300">{topPerformers}%</span>
          </div>
          <Progress value={topPerformers} className="h-2 bg-gray-100 dark:bg-slate-900" indicatorClassName="bg-green-500" />
        </div>

        <div className="p-4 bg-green-50 dark:bg-slate-900 rounded-lg border border-green-100 dark:border-green-900/30">
          <p className="text-sm text-green-800 dark:text-green-400">
            {userRate > communityAverage
              ? `You're recycling ${userRate - communityAverage}% more than the community average!`
              : `You're recycling ${communityAverage - userRate}% less than the community average. Keep improving!`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
