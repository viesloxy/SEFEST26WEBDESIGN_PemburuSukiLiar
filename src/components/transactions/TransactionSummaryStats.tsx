"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/calculations";

interface TransactionSummaryStatsProps {
  transactions: Transaction[];
  className?: string;
}

interface StatsData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export default function TransactionSummaryStats({
  transactions,
  className = "",
}: TransactionSummaryStatsProps) {
  // Calculate stats
  const stats: StatsData = transactions.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.totalIncome += t.amount;
      } else {
        acc.totalExpense += t.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, netBalance: 0 }
  );

  stats.netBalance = stats.totalIncome - stats.totalExpense;

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Total Income Card */}
      <Card className="p-6 rounded-2xl border-income/20 hover:border-income/40 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-income/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-income" />
          </div>
          <span className="text-sm text-neutral-600 dark:text-white/50 font-medium">
            Total Income
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-income">
          +{formatCurrency(stats.totalIncome)}
        </p>
      </Card>

      {/* Total Expense Card */}
      <Card className="p-6 rounded-2xl border-expense/20 hover:border-expense/40 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-expense/10 flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-expense" />
          </div>
          <span className="text-sm text-neutral-600 dark:text-white/50 font-medium">
            Total Expense
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-expense">
          -{formatCurrency(stats.totalExpense)}
        </p>
      </Card>

      {/* Net Balance Card */}
      <Card className="p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm text-neutral-600 dark:text-white/50 font-medium">
            Net Balance
          </span>
        </div>
        <p
          className={`text-2xl md:text-3xl font-bold ${
            stats.netBalance >= 0 ? "text-income" : "text-expense"
          }`}
        >
          {stats.netBalance >= 0 ? "+" : ""}
          {formatCurrency(stats.netBalance)}
        </p>
      </Card>
    </motion.div>
  );
}