"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Award,
  Star,
  ChevronRight,
  Leaf,
  Trophy,
  BadgeCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
};

export function RewardsCard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isHoveringRedeem, setIsHoveringRedeem] = useState(false);

  // Sample rewards data - replace with actual data in production
  const points = 1250;
  const nextRewardAt = 1500;
  const progress = (points / nextRewardAt) * 100;
  const pointsToNextReward = nextRewardAt - points;

  // Sample upcoming rewards
  const upcomingRewards = [
    {
      id: 1,
      name: "10% Off Next Purchase",
      points: 1500,
      icon: <Gift className="h-4 w-4" />,
    },
    {
      id: 2,
      name: "Free Eco-Friendly Tote",
      points: 2000,
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      id: 3,
      name: "Carbon Offset Certificate",
      points: 3000,
      icon: <BadgeCheck className="h-4 w-4" />,
    },
  ];

  // Sample achievements
  const achievements = [
    {
      id: 1,
      name: "First Recycling",
      completed: false,
      icon: <Leaf className="h-4 w-4" />,
    },
    {
      id: 2,
      name: "5 Sustainable Purchases",
      completed: false,
      icon: <BadgeCheck className="h-4 w-4" />,
    },
    {
      id: 3,
      name: "Refer a Friend",
      completed: true,
      icon: <Trophy className="h-4 w-4" />,
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="w-full mx-auto"
    >
      <Card className="backdrop-blur-md bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70 border-green-100 dark:border-green-900 shadow-lg overflow-hidden relative">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 sm:w-40 sm:h-40 -mt-5 sm:-mt-10 -mr-5 sm:-mr-10 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full"
          variants={pulseVariants}
          animate="pulse"
        />
        <motion.div
          className="absolute bottom-0 left-0 w-12 h-12 sm:w-24 sm:h-24 -mb-4 sm:-mb-8 -ml-4 sm:-ml-8 bg-gradient-to-tr from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 rounded-full opacity-70"
          variants={pulseVariants}
          animate="pulse"
          transition={{ delay: 1 }}
        />

        <CardHeader className="pb-2 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-lg font-bold flex items-center">
                <Award className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Sustainability Rewards
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Earn points for every sustainable action
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 mt-2 sm:mt-0"
            >
              Silver Level
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center justify-between"
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="relative">
                      <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-400"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0], opacity: [0, 0.5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 3,
                        }}
                      />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {points}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Total Points
                      </p>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setIsHoveringRedeem(true)}
                    onHoverEnd={() => setIsHoveringRedeem(false)}
                  >
                    <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-md">
                      Redeem Points
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Progress to Next Reward
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {points}/{nextRewardAt}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={progress}
                      className="h-3 bg-gray-100 dark:bg-gray-800"
                      indicatorClassName="bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                    <AnimatePresence>
                      {isHoveringRedeem && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-md shadow-sm"
                          style={{
                            left: `${progress}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          {pointsToNextReward} points to go
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-2 text-center mt-4"
                >
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Available
                    </p>
                    <p className="font-semibold text-green-700 dark:text-green-400 text-lg">
                      5
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Redeemed
                    </p>
                    <p className="font-semibold text-green-700 dark:text-green-400 text-lg">
                      3
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Streak
                    </p>
                    <p className="font-semibold text-green-700 dark:text-green-400 sm:text-lg">
                      7 days
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="rewards" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Unlock these rewards with your sustainability points:
                </motion.p>

                {upcomingRewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      reward.points <= points
                        ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    )}
                  >
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "p-2 rounded-full mr-3",
                          reward.points <= points
                            ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        )}
                      >
                        {reward.icon}
                      </div>
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            reward.points <= points
                              ? "text-gray-800 dark:text-gray-200"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {reward.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {reward.points} points
                        </p>
                      </div>
                    </div>

                    {reward.points <= points ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                      >
                        Redeem <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                      >
                        {reward.points - points} more
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Complete these actions to earn more points:
                </motion.p>

                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      achievement.completed
                        ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    )}
                  >
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "p-2 rounded-full mr-3",
                          achievement.completed
                            ? "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        )}
                      >
                        {achievement.icon}
                      </div>
                      <p
                        className={cn(
                          "font-medium",
                          achievement.completed
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {achievement.name}
                      </p>
                    </div>

                    {achievement.completed ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                        Completed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 border-gray-200 hover:bg-gray-50 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800/70"
                      >
                        Pending
                      </Button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* <CardFooter className="pt-0 pb-4 relative z-10">
          <Button
            variant="ghost"
            className="w-full text-green-700 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
          >
            View Rewards History
          </Button>
        </CardFooter> */}
      </Card>
    </motion.div>
  );
}
