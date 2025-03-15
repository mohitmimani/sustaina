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
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
      <CardHeader>
        <CardTitle>Community Comparison</CardTitle>
        <CardDescription>See how your recycling rate compares to others</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Your Recycling Rate</span>
            <span className="font-medium">{userRate}%</span>
          </div>
          <Progress value={userRate} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Community Average</span>
            <span className="font-medium">{communityAverage}%</span>
          </div>
          <Progress value={communityAverage} className="h-2 bg-gray-100" indicatorClassName="bg-gray-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Top Performers</span>
            <span className="font-medium">{topPerformers}%</span>
          </div>
          <Progress value={topPerformers} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-sm text-green-800">
            {userRate > communityAverage
              ? `You're recycling ${userRate - communityAverage}% more than the community average!`
              : `You're recycling ${communityAverage - userRate}% less than the community average. Keep improving!`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

