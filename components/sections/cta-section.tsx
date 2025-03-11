"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MessageSquare, Sparkles, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-700 dark:to-emerald-700 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Sustainability Revolution?
            </h2>
            <p className="text-lg text-teal-50 mb-8">
              Whether you&apos;re a shopper looking to reduce waste or a store
              wanting to enhance customer experience, Sustaina has a solution
              for you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="backdrop-blur-sm bg-white/20 border border-white/20 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-8 w-8 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">
                      For Shoppers
                    </h3>
                  </div>
                  <p className="text-teal-50 mb-6">
                    Join via Telegram and start receiving digital receipts and
                    expiry alerts.
                  </p>
                  <Button className="w-full bg-white text-emerald-600 hover:bg-teal-50 rounded-lg">
                    Join via Telegram
                  </Button>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/20 border border-white/20 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Store className="h-8 w-8 text-white mr-3" />
                    <h3 className="text-xl font-bold text-white">For Stores</h3>
                  </div>
                  <p className="text-teal-50 mb-6">
                    Partner with us to offer digital receipts and enhance
                    customer loyalty.
                  </p>
                  <Button className="w-full bg-white text-emerald-600 hover:bg-teal-50 rounded-lg">
                    Become a Partner
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm bg-white/10 border border-white/20">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Sustaina Mobile App"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl" />
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Telegram Integration
                  </p>
                  <p className="text-xs text-slate-500">Simple and seamless</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    AI-Powered
                  </p>
                  <p className="text-xs text-slate-500">
                    Smart recommendations
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
