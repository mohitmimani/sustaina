"use client";

import Link from "next/link";
import { Leaf, Menu, Sun, Moon, ListEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/store/menuStore";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
const { useSession } = authClient;

export function Navbar() {
  const setIsMenuOpen = useMenuStore((state) => state.setIsMenuOpen);
  const { theme, setTheme } = useTheme();

  const { data: session, isPending, error } = useSession();
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex gap-x-3 ">
              {session ? (
                <Link href="/dashboard">
                  <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
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
                </>
              )}
            </div>
            <hr className="h-6 border-r border-slate-200 dark:border-slate-700 lg:flex hidden" />
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                aria-label="Toggle Dark Mode"
                className="rounded-full p-1 hover:bg-green-100 dark:hover:bg-green-800/40 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-amber-500" />
                ) : (
                  <Moon className="h-5 w-5 text-teal-600" />
                )}
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
      </div>
    </header>
  );
}
