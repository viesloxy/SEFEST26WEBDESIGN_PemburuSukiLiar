"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface TransactionEmptyStateProps {
  onAddTransaction: () => void;
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export default function TransactionEmptyState({
  onAddTransaction,
  hasFilters = false,
  onClearFilters,
}: TransactionEmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Empty State Illustration - SVG */}
      <div className="w-48 h-48 mb-8">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wallet Icon */}
          <rect
            x="40"
            y="60"
            width="120"
            height="80"
            rx="12"
            className="fill-neutral-100 dark:fill-neutral-800 stroke-primary"
            strokeWidth="3"
          />
          <rect
            x="40"
            y="60"
            width="120"
            height="30"
            rx="12"
            className="fill-primary/20"
          />
          <circle
            cx="140"
            cy="75"
            r="12"
            className="fill-primary"
          />

          {/* Plus Sign */}
          <rect
            x="88"
            y="110"
            width="24"
            height="6"
            rx="3"
            className="fill-primary"
          />
          <rect
            x="97"
            y="101"
            width="6"
            height="24"
            rx="3"
            className="fill-primary"
          />

          {/* Decorative Elements */}
          <circle cx="30" cy="30" r="8" className="fill-primary/30" />
          <circle cx="170" cy="40" r="6" className="fill-primary/20" />
          <circle cx="160" cy="170" r="10" className="fill-primary/20" />
        </svg>
      </div>

      {/* Message */}
      {hasFilters ? (
        <>
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            Tidak Ada Transaksi Ditemukan
          </h3>
          <p className="text-neutral-600 dark:text-white/50 mb-6 max-w-sm">
            Tidak ada transaksi yang sesuai dengan filter yang kamu pilih.
          </p>
          <button
            onClick={onClearFilters}
            className="bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Reset Filter
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
            Belum Ada Transaksi
          </h3>
          <p className="text-neutral-600 dark:text-white/50 mb-6 max-w-sm">
            Yuk mulai catat keuanganmu untuk lebih teratur!
          </p>
          <button
            onClick={onAddTransaction}
            className="bg-primary text-neutral-900 rounded-full px-6 py-3 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <Plus className="w-5 h-5" />
            Tambah Transaksi
          </button>
        </>
      )}
    </motion.div>
  );
}