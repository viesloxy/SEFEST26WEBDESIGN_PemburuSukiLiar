"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LayoutDashboard, Receipt, PiggyBank, TrendingUp, BarChart3, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDashboard } from "@/context/DashboardContext";

interface DashboardNavbarProps {
  currentPage?: string;
}

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transaksi", href: "/dashboard/transactions", icon: Receipt },
  { label: "Budget", href: "/dashboard/budget", icon: PiggyBank },
  { label: "Tabungan", href: "/dashboard/savings", icon: TrendingUp },
  { label: "Statistik", href: "/dashboard/stats", icon: BarChart3 },
];

export default function DashboardNavbar({ currentPage = "dashboard" }: DashboardNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings } = useDashboard();

  return (
    <>
      <section className="fixed w-full top-0 z-50">
        <div className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/images/Logo.svg"
                    alt="Kantongek"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-lg tracking-tight text-black dark:text-white">
                  Kantongek
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center">
                <div className="flex gap-1">
                  {navLinks.map((link) => {
                    const isActive = currentPage === link.label.toLowerCase();
                    return (
                      <Link
                        href={link.href}
                        key={link.label}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                          ${isActive
                            ? "text-primary bg-primary/10"
                            : "text-black/60 dark:text-white/60 hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
                          }
                        `}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-black/5 dark:bg-white/10"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <div className="relative w-5 h-5">
                    <Sun
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "light"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 rotate-90 scale-0"
                      } text-black`}
                    />
                    <Moon
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "dark"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 -rotate-90 scale-0"
                      } text-white`}
                    />
                  </div>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-300"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/images/avatar-5.jpeg"
                        alt={settings.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-black dark:text-white">
                      {settings.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10 shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-3 border-b border-black/10 dark:border-white/10">
                          <p className="font-medium text-black dark:text-white">{settings.name}</p>
                          <p className="text-sm text-neutral-500">Gen-Z User</p>
                        </div>
                        <div className="p-2">
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                            <Settings className="w-4 h-4 text-black/60 dark:text-white/60" />
                            <span className="text-sm text-black dark:text-white">Pengaturan</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
                            <LogOut className="w-4 h-4 text-black/60 dark:text-white/60" />
                            <span className="text-sm text-black dark:text-white">Keluar</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="w-5 h-5 text-black dark:text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-black dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  className="lg:hidden overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col gap-1 py-4 border-t border-black/10 dark:border-white/10">
                    {navLinks.map((link) => {
                      const isActive = currentPage === link.label.toLowerCase();
                      return (
                        <Link
                          href={link.href}
                          key={link.label}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                            ${isActive
                              ? "text-primary bg-primary/10"
                              : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5"
                            }
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          <link.icon className="w-5 h-5" />
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}