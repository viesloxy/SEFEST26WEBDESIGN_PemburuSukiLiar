"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Transaction,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  CATEGORY_ICONS,
} from "@/types";
import { formatCurrency, formatShortDate } from "@/lib/calculations";
import * as LucideIcons from "lucide-react";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const iconName = CATEGORY_ICONS[category] || "Package";
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Package;
};

const getCategoryName = (category: string): string => {
  const allCategories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
  const cat = allCategories.find((c) => c.id === category);
  return cat?.name || category;
};

export default function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const [showActions, setShowActions] = useState(false);
  const IconComponent = getCategoryIcon(transaction.category);
  const isIncome = transaction.type === "income";

  return (
    <motion.div
      className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-xl border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      layout
    >
      {/* Left: Icon + Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isIncome ? "bg-income/10" : "bg-primary/10"
          }`}
        >
          {isIncome ? (
            <TrendingUp className="w-6 h-6 text-income" />
          ) : (
            <IconComponent className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-base text-black dark:text-white truncate">
            {transaction.description || getCategoryName(transaction.category)}
          </p>
          <p className="text-sm text-neutral-500 dark:text-white/50">
            {getCategoryName(transaction.category)} •{" "}
            {formatShortDate(transaction.date)}
          </p>
        </div>
      </div>

      {/* Right: Amount + Actions */}
      <div className="flex items-center gap-4">
        <p
          className={`text-lg font-semibold whitespace-nowrap ${
            isIncome ? "text-income" : "text-expense"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(transaction)}
            className="w-9 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-colors"
            aria-label="Edit transaksi"
          >
            <Pencil className="w-4 h-4 text-neutral-500" />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="w-9 h-9 rounded-lg hover:bg-expense/10 flex items-center justify-center transition-colors"
            aria-label="Hapus transaksi"
          >
            <Trash2 className="w-4 h-4 text-expense" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}