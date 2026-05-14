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
      className="mb-8 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <PiggyBank className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Tabungan
          </h1>
          <p className="text-neutral-500 dark:text-white/50">
            Raih tujuan finansialmu!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-primary/5 rounded-xl">
          <p className="text-sm text-neutral-500 dark:text-white/50">
            Total Tabungan
          </p>
          <p className="text-xl font-bold text-primary">
            {formatCurrency(totalSavings)}
          </p>
        </div>
        <div className="p-4 bg-primary/5 rounded-xl">
          <p className="text-sm text-neutral-500 dark:text-white/50">
            Tujuan Aktif
          </p>
          <p className="text-xl font-bold text-primary">
            {activeGoalsCount}
          </p>
        </div>
      </div>

      {/* Add Goal Button */}
      <motion.button
        onClick={onAddGoal}
        className="w-full mt-4 bg-primary text-neutral-900 rounded-full py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="w-5 h-5" />
        Tambah Tujuan
      </motion.button>
    </motion.div>
  );
}
