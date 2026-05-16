"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardProvider } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";
import TopBar from "@/components/dashboard/TopBar/TopBar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
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
      {/* Left Sidebar - Dashboard Navigation */}
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
          <div className="flex gap-8">
            {/* Main Settings Content */}
            <div className="flex-1 min-w-0">
              {/* Page Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                    Pengaturan
                  </h1>
                  <p className="text-neutral-600 dark:text-white/50 mt-1">
                    Kelola akun dan preferensi aplikasi
                  </p>
                </div>
              </motion.div>

              {/* Settings Sections */}
              <div className="space-y-6">
                {/* Profile Section */}
                <motion.section
                  id="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <ProfileSection />
                </motion.section>

                {/* Email Section */}
                <motion.section
                  id="email"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                >
                  <EmailSection />
                </motion.section>

                {/* Password Section */}
                <motion.section
                  id="password"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  <PasswordSection />
                </motion.section>

                {/* Notification Section */}
                <motion.section
                  id="notification"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                >
                  <NotificationSection />
                </motion.section>

                {/* Data Management Section */}
                <motion.section
                  id="data"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  <DataManagementSection />
                </motion.section>

                {/* Danger Zone Section */}
                <motion.section
                  id="danger"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                >
                  <DangerZoneSection />
                </motion.section>

                {/* Account Info Section */}
                <motion.section
                  id="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                >
                  <AccountInfoSection />
                </motion.section>
              </div>

              {/* Bottom Spacing */}
              <div className="h-16" />
            </div>

            {/* Right Sidebar - Settings Navigation */}
            <SettingsSidebar className="lg:block" />
          </div>
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