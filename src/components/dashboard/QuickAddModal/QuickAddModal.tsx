"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  TrendingUp,
  TrendingDown,
  Save,
  Check,
  AlertCircle,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, CATEGORY_ICONS, Transaction, TransactionType } from "@/types";
import { useDashboard } from "@/context/DashboardContext";
import * as LucideIcons from "lucide-react";

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: TransactionType;
  initialData?: Partial<Transaction>;
}

interface FormErrors {
  type?: string;
  category?: string;
  amount?: string;
  description?: string;
  date?: string;
}

const initialFormState = {
  type: "expense" as TransactionType,
  category: "",
  amount: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

export default function QuickAddModal({
  isOpen,
  onClose,
  defaultType = "expense",
  initialData,
}: QuickAddModalProps) {
  const { addTransaction } = useDashboard();

  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get icon component dynamically
  const getIconComponent = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || LucideIcons.Package;
  };

  // Categories based on type
  const categories = useMemo(
    () => (formData.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES),
    [formData.type]
  );

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: defaultType,
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
      setErrors({});
      setShowSuccess(false);
    }
  }, [isOpen, defaultType]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle type change
  const handleTypeChange = (newType: TransactionType) => {
    setFormData((prev) => ({
      ...prev,
      type: newType,
      category: "", // Reset category when type changes
    }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  };

  // Handle amount change with formatting
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

  // Handle other form changes
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setFormData((prev) => ({ ...prev, description: value }));
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, date: e.target.value }));
    setErrors((prev) => ({ ...prev, date: undefined }));
  };

  // Parse amount for submission
  const parseAmount = (amountStr: string): number => {
    return parseInt(amountStr.replace(/[^0-9]/g, "") || "0", 10);
  };

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.type) {
      newErrors.type = "Pilih tipe transaksi";
    }

    if (!formData.category) {
      newErrors.category = "Pilih kategori transaksi";
    }

    const amount = parseAmount(formData.amount);
    if (amount <= 0) {
      newErrors.amount = "Jumlah harus lebih dari 0";
    }

    if (formData.description.length > 200) {
      newErrors.description = "Maksimal 200 karakter";
    }

    if (!formData.date) {
      newErrors.date = "Pilih tanggal transaksi";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selectedDate > today) {
        newErrors.date = "Tanggal tidak valid";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const transaction = {
        type: formData.type,
        category: formData.category,
        amount: parseAmount(formData.amount),
        description: formData.description || "Tanpa keterangan",
        date: new Date(formData.date).toISOString(),
      };

      addTransaction(transaction);

      // Show success animation
      setShowSuccess(true);

      // Close after success animation
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Success animation view
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
            className="w-20 h-20 rounded-full bg-income flex items-center justify-center mb-4"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold text-black dark:text-white"
          >
            Transaksi Berhasil Disimpan!
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg overflow-hidden"
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
                <h2 id="modal-title" className="text-xl font-semibold text-black dark:text-white">
                  Tambah Transaksi
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="w-5 h-5 text-neutral-600 dark:text-white/60" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5" onKeyDown={handleKeyDown}>
                {/* Transaction Type Tabs */}
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
                          : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white"
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
                          : "text-neutral-600 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white"
                      }`}
                    >
                      <TrendingUp className="w-5 h-5" />
                      Income
                    </button>
                  </div>
                </div>

                {/* Category Selector */}
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
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                            isSelected
                              ? `border-primary bg-primary/10`
                              : "border-black/10 dark:border-white/10 hover:border-primary/50"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${
                              isSelected ? "text-primary" : "text-neutral-600 dark:text-white/60"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium text-center ${
                              isSelected ? "text-primary" : "text-neutral-600 dark:text-white/60"
                            }`}
                          >
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.category && (
                    <p className="text-sm text-expense flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Jumlah
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={formData.amount}
                      onChange={handleAmountChange}
                      placeholder="0"
                      autoFocus
                      className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-lg font-semibold text-black dark:text-white placeholder-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-expense flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.amount}
                    </p>
                  )}
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Keterangan{" "}
                    <span className="text-neutral-400 font-normal">(Opsional)</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Masukkan keterangan transaksi..."
                    rows={3}
                    className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 resize-none text-black dark:text-white placeholder-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-right">
                    {formData.description.length}/200
                  </p>
                  {errors.description && (
                    <p className="text-sm text-expense flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Tanggal
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-10"
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

              {/* Footer Actions */}
              <div className="flex gap-3 p-6 border-t border-black/10 dark:border-white/10">
                <button
                  onClick={onClose}
                  className="flex-1 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full px-6 py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-neutral-900/30 border-t-neutral-900 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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