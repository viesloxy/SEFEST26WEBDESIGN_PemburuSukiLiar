"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Check,
  AlertCircle,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { EXPENSE_CATEGORIES, CATEGORY_ICONS, Budget } from "@/types";
import { formatCurrency } from "@/lib/calculations";

interface BudgetEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string, amount: number) => void;
  category?: string;
  currentLimit?: number;
  mode: "edit" | "add";
  existingCategories?: string[];
}

const getCategoryIcon = (category: string) => {
  const iconName = CATEGORY_ICONS[category] || "Package";
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Package;
};

const getCategoryName = (category: string): string => {
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === category);
  return cat?.name || category;
};

const QUICK_AMOUNTS = [100000, 250000, 500000, 750000, 1000000];

export default function BudgetEditModal({
  isOpen,
  onClose,
  onSave,
  category: initialCategory,
  currentLimit = 0,
  mode,
  existingCategories = [],
}: BudgetEditModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "");
  const [amount, setAmount] = useState<string>("");
  const [errors, setErrors] = useState<{ category?: string; amount?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory || "");
      setAmount(currentLimit > 0 ? new Intl.NumberFormat("id-ID").format(currentLimit) : "");
      setErrors({});
      setShowSuccess(false);
    }
  }, [isOpen, initialCategory, currentLimit]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Available categories for "add" mode (only categories without budget)
  const availableCategories = useMemo(() => {
    if (mode === "edit") return EXPENSE_CATEGORIES;
    return EXPENSE_CATEGORIES.filter((cat) => !existingCategories.includes(cat.id));
  }, [mode, existingCategories]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setAmount("");
    } else {
      const number = parseInt(rawValue, 10);
      const formatted = new Intl.NumberFormat("id-ID").format(number);
      setAmount(formatted);
    }
    setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const handleQuickAmount = (quickAmount: number) => {
    const formatted = new Intl.NumberFormat("id-ID").format(quickAmount);
    setAmount(formatted);
    setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const parseAmount = (amountStr: string): number => {
    return parseInt(amountStr.replace(/[^0-9]/g, "") || "0", 10);
  };

  const validateForm = (): boolean => {
    const newErrors: { category?: string; amount?: string } = {};

    if (mode === "add" && !selectedCategory) {
      newErrors.category = "Pilih kategori";
    }
    if (parseAmount(amount) <= 0) {
      newErrors.amount = "Jumlah harus lebih dari 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const categoryToSave = mode === "edit" ? (initialCategory || "") : selectedCategory;
      onSave(categoryToSave, parseAmount(amount));
      setShowSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error("Error saving budget:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4"
          >
            <Check className="w-10 h-10 text-neutral-900" />
          </motion.div>
          <p className="text-xl font-semibold text-black dark:text-white">
            Budget Berhasil Disimpan!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden"
              role="dialog"
              aria-labelledby="budget-modal-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 flex-shrink-0">
                <h2 id="budget-modal-title" className="text-xl font-semibold text-black dark:text-white">
                  {mode === "edit" ? "Edit Budget" : "Atur Budget Baru"}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5 text-neutral-600 dark:text-white/60" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Category Selector (only for "add" mode) */}
                {mode === "add" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Kategori
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableCategories.map((cat) => {
                        const IconComponent = getCategoryIcon(cat.id);
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setErrors((prev) => ({ ...prev, category: undefined }));
                            }}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                              isSelected
                                ? "border-primary bg-primary/10"
                                : "border-black/10 dark:border-white/10 hover:border-primary/30"
                            }`}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${
                                isSelected ? "text-primary" : "text-neutral-600 dark:text-white/60"
                              }`}
                            />
                            <span className={`text-xs font-medium ${
                              isSelected ? "text-primary" : "text-neutral-600 dark:text-white/60"
                            }`}>
                              {cat.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.category && (
                      <p className="text-sm text-expense flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                )}

                {/* Category Display (for "edit" mode) */}
                {mode === "edit" && initialCategory && (
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center gap-3">
                    {(() => {
                      const IconComponent = getCategoryIcon(initialCategory);
                      return (
                        <>
                          <IconComponent className="w-5 h-5 text-primary" />
                          <span className="font-medium text-black dark:text-white">
                            {getCategoryName(initialCategory)}
                          </span>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Budget Limit
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0"
                      className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-lg font-semibold text-black dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-expense flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Quick Set
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_AMOUNTS.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        type="button"
                        onClick={() => handleQuickAmount(quickAmount)}
                        className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {formatCurrency(quickAmount)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-black/10 dark:border-white/10 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="flex-1 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full px-6 py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin"
                      />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
