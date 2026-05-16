"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

interface TopBarProps {
  onMenuClick: () => void;
  currentPage: string;
}

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  transaksi: "Transaksi",
  budget: "Budget",
  tabungan: "Tabungan",
  statistik: "Statistik",
  settings: "Pengaturan",
};

export default function TopBar({ onMenuClick, currentPage }: TopBarProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { settings } = useDashboard();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pageTitle = pageTitles[currentPage] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-6 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-black dark:text-white" />
        </button>

        {/* Page Title */}
        <h1 className="text-lg font-medium text-black dark:text-white">
          {pageTitle}
        </h1>
      </div>

      {/* Right Section */}
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
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
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
                  <button
                    onClick={() => {
                      router.push("/dashboard/settings");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-black/60 dark:text-white/60" />
                    <span className="text-sm text-black dark:text-white">Pengaturan</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left text-expense"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Keluar</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}