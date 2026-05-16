"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";
import TopBar from "@/components/dashboard/TopBar/TopBar";
import {
  StreakHeader,
  BadgeGrid,
  BadgeUnlockAnimation,
} from "@/components/gamification";
import { Badge } from "@/types";

function GamificationContent() {
  const {
    streakData,
    hasCheckedInToday,
    checkIn,
    checkAndUnlockBadges,
    isBadgeUnlocked,
    getBadgeProgress,
  } = useDashboard();

  // State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const handleCheckIn = () => {
    checkIn();
    // Check for new badges after check-in
    const newBadges = checkAndUnlockBadges();
    if (newBadges.length > 0) {
      setUnlockedBadge(newBadges[0]);
      setShowUnlockAnimation(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        currentPage="gamification"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          currentPage="gamification"
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 xl:p-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                Gamifikasi
              </h1>
              <p className="text-neutral-600 dark:text-white/50 mt-1">
                Cek streak dan unlock badge untuk tetap motivated!
              </p>
            </div>
          </motion.div>

          {/* Streak Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <StreakHeader
              streakData={streakData}
              hasCheckedInToday={hasCheckedInToday}
              onCheckIn={handleCheckIn}
            />

            {/* Quick Stats Card */}
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <span className="text-neutral-500 dark:text-white/50">
                    Total Badge
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {isBadgeUnlocked("first_trans") ? "1" : "0"}+
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <span className="text-neutral-500 dark:text-white/50">
                    Current Streak
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {streakData.current} hari
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <span className="text-neutral-500 dark:text-white/50">
                    Longest Streak
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {streakData.longest} hari
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <span className="text-neutral-500 dark:text-white/50">
                    Freeze Tersedia
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {streakData.streakFreezeAvailable ? "Ya" : "Tidak"}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Badges Section */}
          <BadgeGrid
            isBadgeUnlocked={isBadgeUnlocked}
            getBadgeProgress={getBadgeProgress}
          />

          {/* Bottom Spacing */}
          <div className="h-16" />
        </main>
      </div>

      {/* Badge Unlock Animation */}
      <BadgeUnlockAnimation
        isOpen={showUnlockAnimation}
        badge={unlockedBadge}
        onClose={() => setShowUnlockAnimation(false)}
      />
    </div>
  );
}

export default function GamificationPage() {
  return (
    <DashboardProvider>
      <GamificationContent />
    </DashboardProvider>
  );
}