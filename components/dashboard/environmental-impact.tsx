"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

interface EnvironmentalImpactProps {
  treesEquivalent: string
  waterSaved: string
  co2Reduced: string
}

export function EnvironmentalImpact({ treesEquivalent, waterSaved, co2Reduced }: EnvironmentalImpactProps) {
  return (
    <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-600" />
          Your Impact
        </CardTitle>
        <CardDescription>Environmental benefits of your efforts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-center">
            <span className="text-2xl mr-2">💧</span>
            <span className="text-sm">Water Saved</span>
          </div>
          <span className="font-bold text-blue-700">{waterSaved} liters</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-100">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🌳</span>
            <span className="text-sm">Trees Equivalent</span>
          </div>
          <span className="font-bold text-green-700">{treesEquivalent} trees</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
          <div className="flex items-center">
            <span className="text-2xl mr-2">☁️</span>
            <span className="text-sm">CO₂ Reduced</span>
          </div>
          <span className="font-bold text-gray-700">{co2Reduced} kg</span>
        </div>
      </CardContent>
    </Card>
  )
}

