 "use client";

import { motion } from "framer-motion";
import { Gift, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function RewardsCard() {
  // Sample rewards data - replace with actual data in production
  const points = 1250;
  const nextRewardAt = 1500;
  const progress = (points / nextRewardAt) * 100;
  
  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="backdrop-blur-md bg-white/70 border-green-100 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-green-100 rounded-full opacity-70" />
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-lg font-bold flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            Sustainability Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center">
                <Star className="h-6 w-6 text-amber-500 mr-2 fill-amber-500" />
                <h3 className="text-2xl font-bold text-gray-900">{points} Points</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Earn points for every sustainable action you take
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Current</span>
                  <span>Next Reward: {nextRewardAt} pts</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-100" indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                Redeem Points
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                View Rewards History
              </Button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Available Rewards</p>
              <p className="font-semibold text-green-700">5</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Redeemed</p>
              <p className="font-semibold text-green-700">3</p>
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <p className="text-xs text-gray-600">Level</p>
              <p className="font-semibold text-green-700">Silver</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 
