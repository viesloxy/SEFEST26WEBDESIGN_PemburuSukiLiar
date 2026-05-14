"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PiggyBank,
  Headphones,
  Plane,
  Laptop,
  Gift,
  Home,
  Car,
  Smartphone,
  Wallet,
} from "lucide-react";
import { SavingsGoal } from "@/types";
import { formatCurrency } from "@/lib/calculations";

interface ColekModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amount: number, note?: string) => void;
  goal: SavingsGoal | null;
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

const quickAmounts = [25000, 50000, 100000, 250000];

function formatNumber(num: number): string {
  return num.toLocaleString("id-ID");
}

export default function ColekModal({
  isOpen,
  onClose,
  onSave,
  goal,
}: ColekModalProps) {
  const [amount, setAmount] = useState(0);
  const [amountDisplay, setAmountDisplay] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount(0);
      setAmountDisplay("");
      setNote("");
      setError("");
    }
  }, [isOpen]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, "").replace(/[^0-9]/g, "");
    const numValue = parseInt(rawValue) || 0;
    setAmount(numValue);
    setAmountDisplay(formatNumber(numValue));
  };

  const handleQuickAmount = (amt: number) => {
    setAmount(amt);
    setAmountDisplay(formatNumber(amt));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 1000) {
      setError("Minimal Rp 1.000");
      return;
    }

    onSave(amount, note || undefined);
    onClose();
  };

  if (!goal) return null;

  const IconComponent = goalIcons[goal.icon] || Wallet;
  const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md p-6 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  Colek Tabungan
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Goal Info */}
              <div className="flex items-center gap-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {goal.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>

              {/* Remaining indicator */}
              {remaining > 0 && (
                <p className="text-sm text-neutral-500 mb-4 text-center">
                  Sisa {formatCurrency(remaining)} untuk mencapai target
                </p>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Jumlah
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={amountDisplay}
                      onChange={handleAmountChange}
                      className={`w-full bg-white dark:bg-neutral-800 border rounded-xl pl-12 pr-4 py-3 text-lg font-semibold focus:ring-2 focus:ring-primary/20 outline-none transition-colors ${
                        error
                          ? "border-expense focus:border-expense"
                          : "border-black/10 dark:border-white/10 focus:border-primary"
                      }`}
                      placeholder="0"
                    />
                  </div>
                  {error && <p className="text-xs text-expense">{error}</p>}

                  {/* Quick Amounts */}
                  <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickAmount(amt)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                          amount === amt
                            ? "bg-primary text-neutral-900"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-white/60 hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        {formatCurrency(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Catatan{" "}
                    <span className="text-neutral-400 font-normal">(opsional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Dari gaji bulanan"
                    rows={2}
                    className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-neutral-900 rounded-full py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PiggyBank className="w-5 h-5" />
                  Colek Sekarang
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}