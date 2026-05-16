// Settings storage utilities
const SETTINGS_KEY = "kantongek_settings";

export interface SettingsData {
  notifications: {
    budget: boolean;
    savings: boolean;
  };
  createdAt: string;
}

// Get settings from localStorage
export const getSettings = (): SettingsData | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Save settings to localStorage
export const saveSettings = (settings: SettingsData): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Initialize default settings
export const initSettings = (): SettingsData => {
  const existing = getSettings();
  if (existing) return existing;

  const defaults: SettingsData = {
    notifications: {
      budget: true,
      savings: true,
    },
    createdAt: new Date().toISOString(),
  };

  saveSettings(defaults);
  return defaults;
};

// Update notification settings
export const updateNotificationSettings = (updates: Partial<SettingsData["notifications"]>): SettingsData | null => {
  const current = getSettings();
  if (!current) {
    const initial = initSettings();
    return updateNotificationSettings(updates) || initial;
  }

  const updated: SettingsData = {
    ...current,
    notifications: {
      ...current.notifications,
      ...updates,
    },
  };

  saveSettings(updated);
  return updated;
};

// Clear all settings
export const clearSettings = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SETTINGS_KEY);
};

// Export all app data
export const exportAppData = (): void => {
  if (typeof window === "undefined") return;

  const data = {
    transactions: localStorage.getItem("kantongek_transactions"),
    savingsGoals: localStorage.getItem("kantongek_savings_goals"),
    gamification: localStorage.getItem("kantongek_gamification"),
    settings: localStorage.getItem(SETTINGS_KEY),
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kantongek-backup-${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Clear all transactions
export const clearTransactions = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("kantongek_transactions");
  localStorage.removeItem("kantongek_gamification");
};

// Reset app to initial state
export const resetApp = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("kantongek_transactions");
  localStorage.removeItem("kantongek_savings_goals");
  localStorage.removeItem("kantongek_gamification");
  clearSettings();
};

// Get transaction count
export const getTransactionCount = (): number => {
  if (typeof window === "undefined") return 0;
  const transactions = localStorage.getItem("kantongek_transactions");
  if (!transactions) return 0;
  const parsed = JSON.parse(transactions);
  return Array.isArray(parsed) ? parsed.length : 0;
};

// Delete user account
export const deleteAccount = (): void => {
  if (typeof window === "undefined") return;
  // Clear all user data
  localStorage.removeItem("kantongek_transactions");
  localStorage.removeItem("kantongek_savings_goals");
  localStorage.removeItem("kantongek_gamification");
  localStorage.removeItem(SETTINGS_KEY);
  localStorage.removeItem("kantongek_users");
  localStorage.removeItem("kantongek_current_user");
};