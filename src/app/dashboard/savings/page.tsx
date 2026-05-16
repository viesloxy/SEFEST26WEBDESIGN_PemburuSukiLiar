"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar/Sidebar";
import TopBar from "@/components/dashboard/TopBar/TopBar";
import {
  SavingsHeader,
  SavingsList,
  AddGoalModal,
  ColekModal,
  GoalCelebration,
} from "@/components/savings";
import { SavingsGoal } from "@/types";

function SavingsContent() {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, addFundsToGoal } = useDashboard();

  // State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isColekModalOpen, setIsColekModalOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [celebrationGoalName, setCelebrationGoalName] = useState("");

  // Computed values
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const activeGoalsCount = savingsGoals.filter(
    (g) => g.currentAmount < g.targetAmount
  ).length;

  // Handlers
  const handleAddGoal = () => {
    setEditingGoal(null);
    setIsAddModalOpen(true);
  };

  const handleEditGoal = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setIsAddModalOpen(true);
  };

  const handleSaveGoal = (
    goalData: Omit<SavingsGoal, "id" | "currentAmount" | "createdAt">
  ) => {
    if (editingGoal) {
      // Update existing goal
      updateSavingsGoal(editingGoal.id, {
        name: goalData.name,
        targetAmount: goalData.targetAmount,
        deadline: goalData.deadline,
        icon: goalData.icon,
      });
    } else {
      // Create new goal
      addSavingsGoal(goalData);
    }
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm("Yakin ingin menghapus tujuan ini?")) {
      deleteSavingsGoal(id);
    }
  };

  const handleColek = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setIsColekModalOpen(true);
  };

  const handleSaveFunds = (amount: number, note?: string) => {
    if (!selectedGoal) return;

    // Check if this will complete the goal
    const wasComplete = selectedGoal.currentAmount >= selectedGoal.targetAmount;
    const willBeComplete = selectedGoal.currentAmount + amount >= selectedGoal.targetAmount;

    // Add funds
    addFundsToGoal(selectedGoal.id, amount, note);

    // Show celebration if just completed
    if (!wasComplete && willBeComplete) {
      setCelebrationGoalName(selectedGoal.name);
      setIsCelebrationOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        currentPage="tabungan"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          currentPage="tabungan"
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 xl:p-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                Tabungan
              </h1>
              <p className="text-neutral-600 dark:text-white/50 mt-1">
                Raih tujuan finansialmu!
              </p>
            </div>
          </motion.div>

          {/* Stats Card */}
          <SavingsHeader
            totalSavings={totalSavings}
            activeGoalsCount={activeGoalsCount}
            onAddGoal={handleAddGoal}
          />

          {/* Savings List */}
          <SavingsList
            goals={savingsGoals}
            onAddGoal={handleAddGoal}
            onColek={handleColek}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
          />

          {/* Bottom Spacing */}
          <div className="h-16" />
        </main>
      </div>

      {/* Modals */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveGoal}
        editGoal={editingGoal}
      />

      <ColekModal
        isOpen={isColekModalOpen}
        onClose={() => setIsColekModalOpen(false)}
        onSave={handleSaveFunds}
        goal={selectedGoal}
      />

      <GoalCelebration
        isOpen={isCelebrationOpen}
        goalName={celebrationGoalName}
        onClose={() => setIsCelebrationOpen(false)}
      />
    </div>
  );
}

export default function SavingsPage() {
  return (
    <DashboardProvider>
      <SavingsContent />
    </DashboardProvider>
  );
}