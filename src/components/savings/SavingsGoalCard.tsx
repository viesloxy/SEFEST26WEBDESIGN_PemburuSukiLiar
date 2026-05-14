"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  Plane,
  Laptop,
  Gift,
  Home,
  Car,
  Smartphone,
  Wallet,
  Plus,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import { SavingsGoal } from "@/types";
import { formatCurrency } from "@/lib/calculations";
import * as LucideIcons from "lucide-react";

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  onColek: (goal: SavingsGoal) => void;
  onEdit: (goal: SavingsGoal) => void;
  onDelete: (id: string) => void;
  index?: number;
}

const goalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  headphones: Headphones,
  plane: Plane,
  laptop: Laptop,
  gift: Gift,
  home: Home,
  car: Car,
  smartphone: Smartphone,
  wallet: Wallet,
};

function getGoalIcon(iconName: string) {
  const IconComponent = goalIcons[iconName];
  return IconComponent || Wallet;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getEstimatedTime(goal: SavingsGoal): string {
  const remaining = goal.targetAmount - goal.currentAmount;
  if (remaining <= 0) return "Selesai!";

  // Calculate average contribution
  const contributions = goal.lastContribution;
  if (!contributions) return "Tambahkan dana";

  // Simple monthly estimate based on last contribution
  const avgMonthly = contributions.amount * 4; // Assume weekly contributions
  if (avgMonthly === 0) return "Tambahkan dana";

  const monthsNeeded = remaining / avgMonthly;

  if (monthsNeeded < 1) return "~1 bulan lagi";
  if (monthsNeeded < 2) return "~2 bulan lagi";
  return `~${Math.ceil(monthsNeeded)} bulan lagi`;
}

function getDaysRemaining(deadline: string): number {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getGoalStatus(goal: SavingsGoal): "active" | "approaching" | "overdue" | "completed" {
  const percentage = (goal.currentAmount / goal.targetAmount) * 100;
  if (percentage >= 100) return "completed";

  const daysRemaining = getDaysRemaining(goal.deadline);
  if (daysRemaining < 0) return "overdue";
  if (daysRemaining <= 14 || percentage >= 80) return "approaching";

  return "active";
}

export default function SavingsGoalCard({
  goal,
  onColek,
  onEdit,
  onDelete,
  index = 0,
}: SavingsGoalCardProps) {
  const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const isComplete = percentage >= 100;
  const status = getGoalStatus(goal);
  const daysRemaining = getDaysRemaining(goal.deadline);

  const IconComponent = getGoalIcon(goal.icon);

  const statusColors = {
    active: "text-primary",
    approaching: "text-savings-pending",
    overdue: "text-savings-overdue",
    completed: "text-income",
  };

  return (
    <motion.div
      className={`bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/5 p-6 hover:border-primary/30 transition-all ${
        isComplete ? "border-income/30" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header with Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isComplete ? "bg-income/10" : "bg-primary/10"
            }`}
          >
            <IconComponent
              className={`w-6 h-6 ${
                isComplete ? "text-income" : "text-primary"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-black dark:text-white">
              {goal.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-white/50">
              {percentage.toFixed(0)}% tercapai
            </p>
          </div>
        </div>
        {isComplete && (
          <div className="px-3 py-1 bg-income/10 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3 text-income" />
            <span className="text-xs font-medium text-income">Tercapai!</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              isComplete ? "bg-income" : "bg-primary"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Amount Stats */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-neutral-500 dark:text-white/50">Terkumpul</p>
          <p className="text-lg font-bold text-black dark:text-white">
            {formatCurrency(goal.currentAmount)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-500 dark:text-white/50">Target</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(goal.targetAmount)}
          </p>
        </div>
      </div>

      {/* Deadline & Estimate */}
      <div className="flex justify-between text-sm mb-4 pb-4 border-b border-black/5 dark:border-white/5">
        <div>
          <p className="text-neutral-500">Deadline</p>
          <p className={`font-medium ${statusColors[status]}`}>
            {formatDate(goal.deadline)}
          </p>
          {!isComplete && status !== "active" && (
            <p className="text-xs text-neutral-400">
              {daysRemaining < 0
                ? `${Math.abs(daysRemaining)} hari terlambat`
                : `${daysRemaining} hari lagi`}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-neutral-500">Estimasi</p>
          <p className="font-medium text-primary">{getEstimatedTime(goal)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => onColek(goal)}
          className="flex-1 bg-primary text-neutral-900 rounded-full py-2.5 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Colek
        </motion.button>
        <motion.button
          onClick={() => onEdit(goal)}
          className="px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Pencil className="w-4 h-4 text-neutral-600 dark:text-white/60" />
        </motion.button>
        <motion.button
          onClick={() => onDelete(goal.id)}
          className="px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 hover:bg-expense/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className="w-4 h-4 text-expense" />
        </motion.button>
      </div>
    </motion.div>
  );
}