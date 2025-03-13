"use client";

import Link from "next/link";
import { Leaf, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/store/menuStore";
import { useState } from "react";

export function Navbar() {
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-slate-800 dark:text-white">
                Sustaina
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#partners"
              className="text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              Partner Stores
            </Link>
            <Link
              href="#testimonials"
              className="text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              Testimonials
            </Link>
            <div className="flex gap-x-3">
              <Link href="/login">
                <Button variant="outline" className="rounded-full">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-blue-500" />}
            </Button>
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
