"use client";

import { useState } from "react";
import { Download, Trash2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { exportAppData, clearTransactions, resetApp } from "@/lib/settings";
import { useDashboard } from "@/context/DashboardContext";
import SettingsSection from "./SettingsSection";
import ActionItem from "./ActionItem";

export default function DataManagementSection() {
  const { refreshData } = useDashboard();
  const [showExportConfirm, setShowExportConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExportData = async () => {
    setIsProcessing(true);
    try {
      exportAppData();
      setShowExportConfirm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearTransactions = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      clearTransactions();
      refreshData();
      setShowClearConfirm(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetApp = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      resetApp();
      refreshData();
      window.location.href = "/";
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SettingsSection
      title="Kelola Data"
      icon={<Download className="w-5 h-5 text-primary" />}
      description="Ekspor, hapus, atau atur ulang data aplikasi"
    >
      <div className="space-y-3">
        {/* Export Data */}
        <ActionItem
          icon={<Download className="w-5 h-5 text-primary" />}
          title="Export Data"
          description="Download semua data transaksi"
          onClick={() => setShowExportConfirm(true)}
        />

        {/* Clear Transactions */}
        <ActionItem
          icon={<Trash2 className="w-5 h-5 text-warning" />}
          title="Hapus Semua Transaksi"
          description="Menghapus semua data transaksi"
          onClick={() => setShowClearConfirm(true)}
        />

        {/* Reset App */}
        <ActionItem
          icon={<RotateCcw className="w-5 h-5 text-neutral-600 dark:text-white/60" />}
          title="Reset Aplikasi"
          description="Mengatur ulang semua pengaturan"
          onClick={() => setShowResetConfirm(true)}
        />
      </div>

      {/* Export Confirmation */}
      <AnimatePresence>
        {showExportConfirm && (
          <ConfirmDialog
            title="Export Data?"
            description="Data akan didownload dalam format JSON."
            confirmText="Export"
            confirmVariant="default"
            isLoading={isProcessing}
            onConfirm={handleExportData}
            onCancel={() => setShowExportConfirm(false)}
          />
        )}
      </AnimatePresence>

      {/* Clear Transactions Confirmation */}
      <AnimatePresence>
        {showClearConfirm && (
          <ConfirmDialog
            title="Hapus Semua Transaksi?"
            description="Tindakan ini tidak dapat dibatalkan. Semua data transaksi Anda akan dihapus permanen."
            confirmText="Hapus"
            confirmVariant="warning"
            isLoading={isProcessing}
            onConfirm={handleClearTransactions}
            onCancel={() => setShowClearConfirm(false)}
          />
        )}
      </AnimatePresence>

      {/* Reset App Confirmation */}
      <AnimatePresence>
        {showResetConfirm && (
          <ConfirmDialog
            title="Reset Aplikasi?"
            description="Semua data termasuk transaksi, tabungan, dan pengaturan akan dihapus. Anda perlu login ulang."
            confirmText="Reset"
            confirmVariant="warning"
            isLoading={isProcessing}
            onConfirm={handleResetApp}
            onCancel={() => setShowResetConfirm(false)}
          />
        )}
      </AnimatePresence>
    </SettingsSection>
  );
}

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText: string;
  confirmVariant?: "default" | "warning" | "danger";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  title,
  description,
  confirmText,
  confirmVariant = "default",
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const buttonStyles = {
    default: "bg-primary text-neutral-900 hover:bg-primary/90",
    warning: "bg-warning text-white hover:bg-warning/90",
    danger: "bg-expense text-white hover:bg-expense/90",
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      />

      {/* Dialog */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-sm p-6">
          {/* Content */}
          <h3 className="text-xl font-semibold text-center mb-2 text-black dark:text-white">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-white/50 text-center mb-6">
            {description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 rounded-full py-3 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${buttonStyles[confirmVariant]}`}
            >
              {isLoading ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Memproses...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}