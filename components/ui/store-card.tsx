"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

interface StoreCardProps {
  store: {
    name: string;
    logo: string;
    locations: number;
  };
  variants: any;
}

export function StoreCard({ store, variants }: StoreCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      className="group"
    >
      <Card className="h-full rounded-2xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/20">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={store.logo || "/placeholder.svg"}
              alt={store.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
            {store.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {store.locations} locations
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
