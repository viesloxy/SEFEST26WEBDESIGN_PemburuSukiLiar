"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  TrendingUp,
  BarChart3,
  Flame,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  currentPage: string;
  isOpen: boolean;
  onClose: () => void;
}

const mainNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transaksi", href: "/dashboard/transactions", icon: Receipt },
  { label: "Budget", href: "/dashboard/budget", icon: PiggyBank },
  { label: "Tabungan", href: "/dashboard/savings", icon: TrendingUp },
  { label: "Statistik", href: "/dashboard/stats", icon: BarChart3 },
  { label: "Streak", href: "/dashboard/gamification", icon: Flame },
];

const bottomNavItems = [
  { label: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({ currentPage, isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { settings } = useDashboard();

  // Detect mobile on mount and resize
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get current page label for matching
  const getCurrentPageLabel = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard";
      case "transaksi":
        return "Transaksi";
      case "budget":
        return "Budget";
      case "tabungan":
        return "Tabungan";
      case "statistik":
        return "Statistik";
      case "gamification":
        return "Streak";
      default:
        return "";
    }
  };

  const currentPageLabel = getCurrentPageLabel();

  // During SSR or before mount, render minimal version
  if (!mounted) {
    return (
      <aside className="fixed top-0 left-0 h-screen w-64 md:w-72 bg-white dark:bg-neutral-950 border-r border-black/10 dark:border-white/10 z-50 flex flex-col">
        <div className="flex items-center gap-3 px-4 h-16 border-b border-black/10 dark:border-white/10">
          <div className="relative w-9 h-9 flex-shrink-0">
            <Image src="/images/Logo.svg" alt="Kantongek" fill className="object-contain" />
          </div>
          <span className="font-bold text-lg tracking-tight text-black dark:text-white">Kantongek</span>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          bg-white dark:bg-neutral-950
          border-r border-black/10 dark:border-white/10
          transition-transform duration-300 ease-in-out
          w-64 md:w-72
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          hidden lg:block
        `}
        initial={false}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-black/10 dark:border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/images/Logo.svg"
                alt="Kantongek"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-black dark:text-white whitespace-nowrap">
              Kantongek
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1 relative">
            {mainNavItems.map((item) => {
              const isActive = currentPageLabel === item.label;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl
                    transition-all duration-300 relative
                    ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-black/10 dark:border-white/10 py-4 px-3">
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 dark:text-white/60 hover:bg-expense/10 hover:text-expense transition-all duration-300"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Keluar</span>
            </button>
          </div>

          {/* User Info */}
          <div className="mt-4 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/avatar-5.jpeg"
                  alt={settings.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-black dark:text-white truncate">
                  {settings.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-white/40">
                  Gen-Z User
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar (separate from desktop) */}
      <motion.aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          bg-white dark:bg-neutral-950
          border-r border-black/10 dark:border-white/10
          transition-transform duration-300 ease-in-out
          w-64 md:w-72
          lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        initial={false}
      >
        {/* Logo Section with Close Button */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-black/10 dark:border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/images/Logo.svg"
                alt="Kantongek"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-black dark:text-white whitespace-nowrap">
              Kantongek
            </span>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-white/60" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1 relative">
            {mainNavItems.map((item) => {
              const isActive = currentPageLabel === item.label;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl
                    transition-all duration-300 relative
                    ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-black/10 dark:border-white/10 py-4 px-3">
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary transition-all duration-300"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-600 dark:text-white/60 hover:bg-expense/10 hover:text-expense transition-all duration-300"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium whitespace-nowrap">Keluar</span>
            </button>
          </div>

          {/* User Info */}
          <div className="mt-4 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/avatar-5.jpeg"
                  alt={settings.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-black dark:text-white truncate">
                  {settings.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-white/40">
                  Gen-Z User
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}