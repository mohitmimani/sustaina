"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  Recycle,
  ShoppingBag,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dashboardImages = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === dashboardImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? dashboardImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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

  return (
    <section
      id="dashboard"
      className="py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-emerald-300/10 dark:bg-emerald-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-blue-300/10 dark:bg-blue-700/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4"
          >
            Intuitive Dashboard Experience
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Visualize your sustainability metrics with our beautiful and
            informative AI-powered dashboard.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 border border-white/20 dark:border-slate-700/20">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={dashboardImages[currentSlide] || "/placeholder.svg"}
                alt={`Dashboard Preview ${currentSlide + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {dashboardImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-teal-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  AI Insights
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Updated in real-time
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -top-6 -left-6 md:-top-8 md:-left-8 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  Shopping Patterns
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  AI-analyzed for waste reduction
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-24 max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14">
              <TabsTrigger value="personal" className="text-base py-3">
                Personal Dashboard
              </TabsTrigger>
              <TabsTrigger value="business" className="text-base py-3">
                Business Dashboard
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Waste Reduction
                      </h3>
                      <Recycle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      32%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Reduced this month
                    </p>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-4">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Expiry Alerts
                      </h3>
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      24
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Items expiring soon
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Today
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Next Week
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Reward Points
                      </h3>
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      1,250
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Points earned
                    </p>
                    <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg">
                      Redeem Points
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="business" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Customer Engagement
                      </h3>
                      <BarChart3 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      89%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Telegram open rate
                    </p>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-4">
                      <div
                        className="h-2 bg-emerald-500 rounded-full"
                        style={{ width: "89%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Paper Saved
                      </h3>
                      <Recycle className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      12,450
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Sheets this month
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Last Month
                      </span>
                      <span className="text-emerald-500 text-xs">+24%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/20 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Customer Retention
                      </h3>
                      <ShoppingBag className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                      42%
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Increase since launch
                    </p>
                    <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-lg">
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
