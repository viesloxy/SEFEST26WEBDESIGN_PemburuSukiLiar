"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/lib/settings";
import { useAuth } from "@/context/AuthContext";
import SettingsSection from "./SettingsSection";
import ActionItem from "./ActionItem";
import AuthInput from "@/components/auth/AuthInput";

export default function DangerZoneSection() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") return;

    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      deleteAccount();
      logout();
      router.push("/");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SettingsSection
        title="Zona Berbahaya"
        icon={<AlertTriangle className="w-5 h-5 text-expense" />}
        description="Tindakan yang tidak dapat dibatalkan"
        variant="danger"
      >
        <ActionItem
          icon={<AlertTriangle className="w-5 h-5 text-expense" />}
          title="Hapus Akun"
          description="Semua data akan dihapus permanen"
          onClick={() => setShowDeleteConfirm(true)}
          variant="danger"
        />
      </SettingsSection>

      {/* Delete Account Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteConfirm("");
              }}
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
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-expense/10 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-expense" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-center mb-2 text-black dark:text-white">
                  Hapus Akun?
                </h3>
                <p className="text-neutral-600 dark:text-white/50 text-center mb-6">
                  Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus permanen.
                </p>

                {/* Confirmation Input */}
                <div className="mb-6">
                  <AuthInput
                    label="Ketik DELETE untuk konfirmasi"
                    type="text"
                    placeholder="DELETE"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirm("");
                    }}
                    disabled={isDeleting}
                    className="flex-1 bg-transparent border-2 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== "DELETE" || isDeleting}
                    className="flex-1 bg-expense text-white rounded-full py-3 font-semibold hover:bg-expense/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Menghapus...
                      </>
                    ) : (
                      "Hapus Permanen"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}