"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import DashboardHeader from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import QuickAddModal from "@/components/dashboard/QuickAddModal";

// Dynamic import for StatisticsChart to reduce initial bundle size
const StatisticsChart = dynamic(
  () => import("@/components/dashboard/StatisticsChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 md:h-80 bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse" />
    ),
  }
);

interface DashboardContentProps {
  currentPage: string;
}

function DashboardContent({ currentPage }: DashboardContentProps) {
  const { isLoading } = useDashboard();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"income" | "expense">("expense");

  const handleAddIncome = () => {
    setModalType("income");
    setIsModalOpen(true);
  };

  const handleAddExpense = () => {
    setModalType("expense");
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 relative">
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 border-4 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-neutral-600 dark:text-white/50 animate-pulse">
            Memuat dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          currentPage={currentPage}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 xl:p-8">
          {/* Header Section */}
          <DashboardHeader />

          {/* Summary Cards */}
          <SummaryCards className="mb-8" />

          {/* Quick Actions */}
          <QuickActions
            onAddIncome={handleAddIncome}
            onAddExpense={handleAddExpense}
          />

          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions - 2 columns on desktop */}
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>

            {/* Budget Overview - 1 column on desktop */}
            <div className="lg:col-span-1">
              <BudgetOverview />
            </div>
          </div>

          {/* Statistics Chart - Full width */}
          <div className="mt-6">
            <StatisticsChart />
          </div>

          {/* Bottom Spacing */}
          <div className="h-16" />
        </main>
      </div>

      {/* Add Transaction Modal */}
      <QuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultType={modalType}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent currentPage="dashboard" />
    </DashboardProvider>
  );
}