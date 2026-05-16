"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { getSettings, updateNotificationSettings, initSettings } from "@/lib/settings";
import SettingsSection from "./SettingsSection";
import Toggle from "./Toggle";

interface NotificationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function NotificationItem({ title, description, checked, onChange }: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-black dark:text-white">{title}</p>
        <p className="text-xs text-neutral-500 dark:text-white/50">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

export default function NotificationSection() {
  const [budgetNotification, setBudgetNotification] = useState(true);
  const [savingsNotification, setSavingsNotification] = useState(true);

  // Load settings on mount
  useEffect(() => {
    const settings = getSettings() || initSettings();
    setBudgetNotification(settings.notifications.budget);
    setSavingsNotification(settings.notifications.savings);
  }, []);

  const handleBudgetChange = (checked: boolean) => {
    setBudgetNotification(checked);
    updateNotificationSettings({ budget: checked });
  };

  const handleSavingsChange = (checked: boolean) => {
    setSavingsNotification(checked);
    updateNotificationSettings({ savings: checked });
  };

  return (
    <SettingsSection
      title="Notifikasi"
      icon={<Bell className="w-5 h-5 text-primary" />}
      description="Atur preferensi notifikasi Anda"
    >
      <div className="space-y-1">
        <NotificationItem
          title="Notifikasi Budget"
          description="Ingat saat budget hampir habis"
          checked={budgetNotification}
          onChange={handleBudgetChange}
        />
        <div className="border-t border-black/5 dark:border-white/5" />
        <NotificationItem
          title="Notifikasi Tabungan"
          description="Ingat saat deadline tabungan dekat"
          checked={savingsNotification}
          onChange={handleSavingsChange}
        />
      </div>
    </SettingsSection>
  );
}