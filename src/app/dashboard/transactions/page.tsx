"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import {
  TransactionFilterBar,
  TransactionSummaryStats,
  TransactionList,
  TransactionEmptyState,
  TransactionPagination,
  DeleteConfirmDialog,
} from "@/components/transactions";
import TransactionEditModal from "@/components/transactions/TransactionEditModal";
import QuickAddModal from "@/components/dashboard/QuickAddModal";
import { Transaction, TransactionType } from "@/types";

interface TransactionFilters {
  type: TransactionType | "";
  category: string;
  startDate: string;
  endDate: string;
  search: string;
}

const initialFilters: TransactionFilters = {
  type: "",
  category: "",
  startDate: "",
  endDate: "",
  search: "",
};

const ITEMS_PER_PAGE = 10;

function TransactionsContent() {
  const { transactions, deleteTransaction } = useDashboard();

  // State
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply filters to transactions
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower) ||
          t.amount.toString().includes(filters.search)
      );
    }

    // Type filter
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    // Category filter
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    // Date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter((t) => new Date(t.date) >= startDate);
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      result = result.filter((t) => new Date(t.date) <= endDate);
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [transactions, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setIsDeleting(true);
      setTimeout(() => {
        deleteTransaction(deletingId);
        setDeletingId(null);
        setIsDeleting(false);
      }, 500);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters = filters.type || filters.category || filters.startDate || filters.endDate || filters.search;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        currentPage="transaksi"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          currentPage="transaksi"
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 xl:p-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                  Riwayat Transaksi
                </h1>
                <p className="text-neutral-600 dark:text-white/50 mt-1">
                  Total {filteredTransactions.length} transaksi
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Tambah</span>
              </button>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <TransactionFilterBar
            filters={filters}
            onFiltersChange={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
            }}
          />

          {/* Summary Stats */}
          <TransactionSummaryStats transactions={filteredTransactions} />

          {/* Transaction List or Empty State */}
          {filteredTransactions.length === 0 ? (
            <TransactionEmptyState
              onAddTransaction={() => setIsAddModalOpen(true)}
              hasFilters={!!hasActiveFilters}
              onClearFilters={() => setFilters(initialFilters)}
            />
          ) : (
            <>
              <TransactionList
                transactions={paginatedTransactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {/* Pagination */}
              <TransactionPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {/* Bottom Spacing */}
          <div className="h-16" />
        </main>
      </div>

      {/* Add Transaction Modal */}
      <QuickAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultType="expense"
      />

      {/* Edit Transaction Modal */}
      <TransactionEditModal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        transaction={editingTransaction}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <DashboardProvider>
      <TransactionsContent />
    </DashboardProvider>
  );
}