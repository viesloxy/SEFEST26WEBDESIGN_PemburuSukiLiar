"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardProvider } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";
import TopBar from "@/components/dashboard/TopBar/TopBar";
import ProfileSection from "@/components/settings/ProfileSection";
import EmailSection from "@/components/settings/EmailSection";
import PasswordSection from "@/components/settings/PasswordSection";
import NotificationSection from "@/components/settings/NotificationSection";
import DataManagementSection from "@/components/settings/DataManagementSection";
import DangerZoneSection from "@/components/settings/DangerZoneSection";
import AccountInfoSection from "@/components/settings/AccountInfoSection";

interface SettingsContentProps {
  currentPage: string;
}

function SettingsContent({ currentPage }: SettingsContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 min-h-screen flex flex-col">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          currentPage={currentPage}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="text-2xl font-medium tracking-tight text-black dark:text-white">
              Pengaturan
            </h1>
            <p className="text-sm text-neutral-600 dark:text-white/50">
              Kelola akun dan preferensi aplikasi
            </p>
          </motion.div>

          {/* Settings Sections */}
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <ProfileSection />
            </motion.div>

            {/* Email Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <EmailSection />
            </motion.div>

            {/* Password Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <PasswordSection />
            </motion.div>

            {/* Notification Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <NotificationSection />
            </motion.div>

            {/* Data Management Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <DataManagementSection />
            </motion.div>

            {/* Danger Zone Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <DangerZoneSection />
            </motion.div>

            {/* Account Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              <AccountInfoSection />
            </motion.div>
          </div>

          {/* Bottom Spacing */}
          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <DashboardProvider>
      <SettingsContent currentPage="settings" />
    </DashboardProvider>
  );
}