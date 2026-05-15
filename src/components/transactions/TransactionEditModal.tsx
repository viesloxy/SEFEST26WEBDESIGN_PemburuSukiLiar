"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  TrendingUp,
  TrendingDown,
  Save,
  Check,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, Transaction, TransactionType } from "@/types";
import { useDashboard } from "@/context/DashboardContext";
import * as LucideIcons from "lucide-react";

interface TransactionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

interface FormErrors {
  type?: string;
  category?: string;
  amount?: string;
  description?: string;
  date?: string;
}

const getIconComponent = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Package;
};

export default function TransactionEditModal({
  isOpen,
  onClose,
  transaction,
}: TransactionEditModalProps) {
  const { updateTransaction } = useDashboard();

  const [formData, setFormData] = useState({
    type: "expense" as TransactionType,
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Populate form when transaction changes
  useEffect(() => {
    if (transaction && isOpen) {
      setFormData({
        type: transaction.type,
        category: transaction.category,
        amount: new Intl.NumberFormat("id-ID").format(transaction.amount),
        description: transaction.description,
        date: transaction.date.split("T")[0],
      });
      setErrors({});
      setShowSuccess(false);
    }
  }, [transaction, isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setErrors({});
    }
  }, [isOpen]);

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

  const categories = useMemo(
    () => (formData.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES),
    [formData.type]
  );

  const handleTypeChange = (newType: TransactionType) => {
    setFormData((prev) => ({ ...prev, type: newType, category: "" }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setFormData((prev) => ({ ...prev, amount: "" }));
    } else {
      const number = parseInt(rawValue, 10);
      const formatted = new Intl.NumberFormat("id-ID").format(number);
      setFormData((prev) => ({ ...prev, amount: formatted }));
    }
    setErrors((prev) => ({ ...prev, amount: undefined }));
  };

  const parseAmount = (amountStr: string): number => {
    return parseInt(amountStr.replace(/[^0-9]/g, "") || "0", 10);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const amount = parseAmount(formData.amount);

    if (!formData.category) newErrors.category = "Pilih kategori transaksi";
    if (amount <= 0) newErrors.amount = "Jumlah harus lebih dari 0";
    if (!formData.date) newErrors.date = "Pilih tanggal transaksi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !transaction) return;

    setIsSubmitting(true);
    try {
      updateTransaction(transaction.id, {
        type: formData.type,
        category: formData.category,
        amount: parseAmount(formData.amount),
        description: formData.description || "Tanpa keterangan",
        date: new Date(formData.date).toISOString(),
      });

      setShowSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error("Error updating transaction:", error);
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
            className="w-20 h-20 rounded-full bg-income flex items-center justify-center mb-4"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <p className="text-xl font-semibold text-black dark:text-white">
            Transaksi Berhasil Diperbarui!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && transaction && (
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
              aria-labelledby="edit-modal-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 flex-shrink-0">
                <h2 id="edit-modal-title" className="text-xl font-semibold text-black dark:text-white">
                  Edit Transaksi
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
                {/* Type Tabs */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Tipe Transaksi
                  </label>
                  <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleTypeChange("expense")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        formData.type === "expense"
                          ? "bg-white dark:bg-neutral-900 text-expense shadow-sm"
                          : "text-neutral-600 dark:text-white/50"
                      }`}
                    >
                      <TrendingDown className="w-5 h-5" />
                      Expense
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange("income")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        formData.type === "income"
                          ? "bg-white dark:bg-neutral-900 text-income shadow-sm"
                          : "text-neutral-600 dark:text-white/50"
                      }`}
                    >
                      <TrendingUp className="w-5 h-5" />
                      Income
                    </button>
                  </div>
                </div>

                {/* Category Grid */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Kategori
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((cat) => {
                      const IconComponent = getIconComponent(cat.icon);
                      const isSelected = formData.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, category: cat.id }));
                            setErrors((prev) => ({ ...prev, category: undefined }));
                          }}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-black/10 dark:border-white/10"
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

                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Jumlah
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">Rp</span>
                    <input
                      type="text"
                      value={formData.amount}
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

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Keterangan <span className="text-neutral-400 font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Masukkan keterangan..."
                    rows={3}
                    maxLength={200}
                    className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 resize-none text-black dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <p className="text-xs text-neutral-500 text-right">{formData.description.length}/200</p>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Tanggal
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
                  </div>
                  {errors.date && (
                    <p className="text-sm text-expense flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
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