"use client";

import { motion } from "framer-motion";
import { PiggyBank, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/calculations";

interface SavingsHeaderProps {
  totalSavings: number;
  activeGoalsCount: number;
  onAddGoal: () => void;
}

export default function SavingsHeader({
  totalSavings,
  activeGoalsCount,
  onAddGoal,
}: SavingsHeaderProps) {
  return (
    <motion.div
      className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <PiggyBank className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Tambah Tujuan
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mt-8 mb-8">
        <div className="p-5 bg-primary/5 rounded-xl">
          <p className="text-sm text-neutral-500 dark:text-white/50 mb-2">
            Total Tabungan
          </p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalSavings)}
          </p>
        </div>
        <div className="p-5 bg-primary/5 rounded-xl">
          <p className="text-sm text-neutral-500 dark:text-white/50 mb-2">
            Tujuan Aktif
          </p>
          <p className="text-2xl font-bold text-primary">
            {activeGoalsCount}
          </p>
        </div>
      </div>

      {/* Add Goal Button */}
      <motion.button
        onClick={onAddGoal}
        className="w-full bg-primary text-neutral-900 rounded-full py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Tambah Tujuan
      </motion.button>
    </motion.div>
  );
}
