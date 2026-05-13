"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, CATEGORY_ICONS, Transaction, TransactionType } from "@/types";
import { useDashboard } from "@/context/DashboardContext";
import { formatCurrency } from "@/lib/calculations";

interface TransactionFilters {
  type: TransactionType | "";
  category: string;
  startDate: string;
  endDate: string;
  search: string;
}

interface TransactionFilterBarProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

const initialFilters: TransactionFilters = {
  type: "",
  category: "",
  startDate: "",
  endDate: "",
  search: "",
};

export default function TransactionFilterBar({
  filters,
  onFiltersChange,
}: TransactionFilterBarProps) {
  const { transactions } = useDashboard();

  // Get all unique categories from transactions
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    transactions.forEach((t) => categories.add(t.category));
    return Array.from(categories);
  }, [transactions]);

  // Get category name by ID
  const getCategoryName = (id: string): string => {
    const allCats = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
    const cat = allCats.find((c) => c.id === id);
    return cat?.name || id;
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type) count++;
    if (filters.category) count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.search) count++;
    return count;
  }, [filters]);

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, type: e.target.value as TransactionType | "" });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, category: e.target.value });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, startDate: e.target.value });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, endDate: e.target.value });
  };

  const clearFilter = (key: keyof TransactionFilters) => {
    onFiltersChange({ ...filters, [key]: key === "type" ? "" : "" });
  };

  const clearAllFilters = () => {
    onFiltersChange(initialFilters);
  };

  return (
    <motion.div
      className="sticky top-20 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl p-4 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Cari transaksi..."
            className="w-full bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl pl-12 pr-4 py-3 text-black dark:text-white placeholder-neutral-400 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            aria-label="Cari transaksi"
          />
          {filters.search && (
            <button
              onClick={() => clearFilter("search")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 text-neutral-500" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-3">
          {/* Type Filter */}
          <div className="relative">
            <select
              value={filters.type}
              onChange={handleTypeChange}
              className="appearance-none bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl px-4 py-3 pr-10 text-black dark:text-white cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors min-w-[140px]"
              aria-label="Filter tipe transaksi"
            >
              <option value="">Semua Tipe</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="appearance-none bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl px-4 py-3 pr-10 text-black dark:text-white cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors min-w-[160px]"
              aria-label="Filter kategori"
            >
              <option value="">Semua Kategori</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryName(cat)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={handleStartDateChange}
              className="bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl px-4 py-3 text-black dark:text-white cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Tanggal mulai"
            />
            <span className="text-neutral-400">-</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={handleEndDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="bg-neutral-100 dark:bg-neutral-800 border-0 rounded-xl px-4 py-3 text-black dark:text-white cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Tanggal akhir"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <motion.div
          className="flex items-center gap-2 mt-4 flex-wrap"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <span className="text-sm text-neutral-500">Filter aktif:</span>

          {filters.type && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
              {filters.type === "income" ? "Income" : "Expense"}
              <button
                onClick={() => clearFilter("type")}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Hapus filter tipe"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
              {getCategoryName(filters.category)}
              <button
                onClick={() => clearFilter("category")}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Hapus filter kategori"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.startDate && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
              Dari: {new Date(filters.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
              <button
                onClick={() => clearFilter("startDate")}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Hapus filter tanggal mulai"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.endDate && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
              Sampai: {new Date(filters.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
              <button
                onClick={() => clearFilter("endDate")}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Hapus filter tanggal akhir"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.search && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center gap-1">
              "{filters.search}"
              <button
                onClick={() => clearFilter("search")}
                className="hover:bg-primary/20 rounded-full p-0.5"
                aria-label="Hapus filter pencarian"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:underline ml-2"
          >
            Clear All
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}