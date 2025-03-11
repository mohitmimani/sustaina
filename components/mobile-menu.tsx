"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white dark:bg-slate-900 p-4 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex flex-col space-y-6 mt-10 items-center">
        <Link href="#how-it-works" className="text-xl font-medium text-slate-800 dark:text-white" onClick={onClose}>
          How It Works
        </Link>
        <Link href="#features" className="text-xl font-medium text-slate-800 dark:text-white" onClick={onClose}>
          Features
        </Link>
        <Link href="#partners" className="text-xl font-medium text-slate-800 dark:text-white" onClick={onClose}>
          Partner Stores
        </Link>
        <Link href="#testimonials" className="text-xl font-medium text-slate-800 dark:text-white" onClick={onClose}>
          Testimonials
        </Link>
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <Button variant="outline" className="rounded-full w-full">
            Log In
          </Button>
          <Button className="rounded-full w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            Get Started
          </Button>
        </div>
      </nav>
    </motion.div>
  )
}

