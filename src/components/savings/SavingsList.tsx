"use client";

import { motion } from "framer-motion";
import { PiggyBank, Plus } from "lucide-react";
import { SavingsGoal } from "@/types";
import SavingsGoalCard from "./SavingsGoalCard";

interface SavingsListProps {
  goals: SavingsGoal[];
  onAddGoal: () => void;
  onColek: (goal: SavingsGoal) => void;
  onEdit: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
}

export default function SavingsList({
  goals,
  onAddGoal,
  onColek,
  onEdit,
  onDelete,
}: SavingsListProps) {
  const activeGoals = goals.filter(
    (g) => g.currentAmount < g.targetAmount
  );
  const completedGoals = goals.filter(
    (g) => g.currentAmount >= g.targetAmount
  );

  // Empty state
  if (goals.length === 0) {
    return (
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10 p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <PiggyBank className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
          Belum Ada Tujuan
        </h3>
        <p className="text-neutral-500 dark:text-white/50 mb-6">
          Mulai sekarang dan wujudkan tujuan finansialmu!
        </p>
        <motion.button
          onClick={onAddGoal}
          className="bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-primary/30 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Tambah Tujuan
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Tujuan Aktif
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGoals.map((goal, index) => (
              <SavingsGoalCard
                key={goal.id}
                goal={goal}
                onColek={onColek}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
            Tujuan Tercapai
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedGoals.map((goal, index) => (
              <SavingsGoalCard
                key={goal.id}
                goal={goal}
                onColek={onColek}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}