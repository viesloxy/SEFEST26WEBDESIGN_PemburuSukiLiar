"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Transaction } from "@/types";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

// Group transactions by date
const groupByDate = (
  transactions: Transaction[]
): { date: string; transactions: Transaction[] }[] => {
  const groups: Record<string, Transaction[]> = {};

  transactions.forEach((t) => {
    const dateKey = t.date.split("T")[0];
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(t);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([date, txns]) => ({
      date,
      transactions: txns.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    }));
};

// Format date for display
const formatDateHeader = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return "Hari Ini";
  }

  // Check if it's yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Kemarin";
  }

  // Format as "13 Mei 2026"
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const groupedTransactions = useMemo(
    () => groupByDate(transactions),
    [transactions]
  );

  return (
    <div className="space-y-8">
      <AnimatePresence mode="popLayout">
        {groupedTransactions.map((group) => (
          <div key={group.date}>
            {/* Date Header */}
            <h3 className="text-sm font-semibold text-neutral-500 dark:text-white/50 mb-4 py-2">
              {formatDateHeader(group.date)}
            </h3>

            {/* Transaction Items */}
            <div className="space-y-3">
              <AnimatePresence>
                {group.transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}