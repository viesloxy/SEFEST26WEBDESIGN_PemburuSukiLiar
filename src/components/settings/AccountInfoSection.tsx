"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { getTransactionCount } from "@/lib/settings";
import SettingsSection from "./SettingsSection";

export default function AccountInfoSection() {
  const { user } = useAuth();
  const { transactions } = useDashboard();
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    setTransactionCount(getTransactionCount() || transactions.length);
  }, [transactions.length]);

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "Demo") {
      return "1 Mei 2026";
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "1 Mei 2026";
    }
  };

  return (
    <SettingsSection
      title="Info Akun"
      icon={<Info className="w-5 h-5 text-primary" />}
      description="Informasi akun Anda"
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-neutral-600 dark:text-white/50">Terdaftar sejak</p>
          <p className="text-sm font-medium text-black dark:text-white">
            {formatDate(user?.createdAt || "2026-05-01")}
          </p>
        </div>
        <div className="border-t border-black/5 dark:border-white/5" />
        <div className="flex justify-between items-center py-2">
          <p className="text-sm text-neutral-600 dark:text-white/50">Total transaksi</p>
          <p className="text-sm font-medium text-black dark:text-white">
            {transactionCount}
          </p>
        </div>
      </div>
    </SettingsSection>
  );
}