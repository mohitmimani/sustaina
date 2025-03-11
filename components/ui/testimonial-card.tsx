"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    store: string;
    image: string;
    quote: string;
  };
  variants: Variants;
}

export function TestimonialCard({
  testimonial,
  variants,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
    >
      <Card className="h-full rounded-2xl border-none shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {testimonial.role}, {testimonial.store}
              </p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 italic">
            &quot;{testimonial.quote}&quot;
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
