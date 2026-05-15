"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
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

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: Omit<SavingsGoal, "id" | "currentAmount" | "createdAt">) => void;
  editGoal?: SavingsGoal | null;
}

const goalIcons = [
  { id: "headphones", name: "Headphones", component: Headphones },
  { id: "plane", name: "Travel", component: Plane },
  { id: "laptop", name: "Laptop", component: Laptop },
  { id: "gift", name: "Gift", component: Gift },
  { id: "home", name: "Home", component: Home },
  { id: "car", name: "Car", component: Car },
  { id: "smartphone", name: "Phone", component: Smartphone },
  { id: "wallet", name: "Wallet", component: Wallet },
];

const quickAmounts = [500000, 1000000, 2000000, 5000000, 10000000];

function formatNumber(num: number): string {
  return num.toLocaleString("id-ID");
}

function parseFormattedNumber(str: string): number {
  return parseInt(str.replace(/\./g, "")) || 0;
}

export default function AddGoalModal({
  isOpen,
  onClose,
  onSave,
  editGoal,
}: AddGoalModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountDisplay, setAmountDisplay] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet");
  const [errors, setErrors] = useState<{ name?: string; amount?: string; deadline?: string }>({});

  // Reset form when modal opens/closes or editGoal changes
  useEffect(() => {
    if (isOpen) {
      if (editGoal) {
        setName(editGoal.name);
        setAmount(editGoal.targetAmount);
        setAmountDisplay(formatNumber(editGoal.targetAmount));
        setDeadline(editGoal.deadline.split("T")[0]);
        setSelectedIcon(editGoal.icon);
      } else {
        setName("");
        setAmount(0);
        setAmountDisplay("");
        setDeadline("");
        setSelectedIcon("wallet");
      }
      setErrors({});
    }
  }, [isOpen, editGoal]);

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

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Nama tujuan harus diisi";
    }

    if (amount < 1000) {
      newErrors.amount = "Minimal target Rp 1.000";
    }

    if (!deadline) {
      newErrors.deadline = "Deadline harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSave({
      name: name.trim(),
      targetAmount: amount,
      deadline: new Date(deadline).toISOString(),
      icon: selectedIcon,
    });

    onClose();
  };

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
              className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-md max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 flex-shrink-0">
                <h2 className="text-xl font-semibold text-black dark:text-white">
                  {editGoal ? "Edit Tujuan" : "Tujuan Tabungan Baru"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Nama Tujuan
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Headphone Sony"
                    className={`w-full bg-white dark:bg-neutral-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-colors ${
                      errors.name
                        ? "border-expense focus:border-expense"
                        : "border-black/10 dark:border-white/10 focus:border-primary"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-expense">{errors.name}</p>
                  )}
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Target Amount
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
                        errors.amount
                          ? "border-expense focus:border-expense"
                          : "border-black/10 dark:border-white/10 focus:border-primary"
                      }`}
                      placeholder="0"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-xs text-expense">{errors.amount}</p>
                  )}
                  {/* Quick Amounts */}
                  <div className="flex flex-wrap gap-2">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleQuickAmount(amt)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

                {/* Deadline */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={getMinDate()}
                    className={`w-full bg-white dark:bg-neutral-800 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-colors ${
                      errors.deadline
                        ? "border-expense focus:border-expense"
                        : "border-black/10 dark:border-white/10 focus:border-primary"
                    }`}
                  />
                  {errors.deadline && (
                    <p className="text-xs text-expense">{errors.deadline}</p>
                  )}
                </div>

                {/* Icon Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                    Icon
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {goalIcons.map((icon) => (
                      <button
                        key={icon.id}
                        type="button"
                        onClick={() => setSelectedIcon(icon.id)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          selectedIcon === icon.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-neutral-100 dark:bg-neutral-800 border-2 border-transparent"
                        }`}
                      >
                        <icon.component
                          className={`w-6 h-6 ${
                            selectedIcon === icon.id
                              ? "text-primary"
                              : "text-neutral-600 dark:text-white/60"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-neutral-900 rounded-full py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editGoal ? "Simpan Perubahan" : "Buat Tujuan"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}