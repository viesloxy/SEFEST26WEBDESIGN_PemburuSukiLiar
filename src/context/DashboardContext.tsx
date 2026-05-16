"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { AppData, Transaction, UserSettings, SavingsGoal, StreakData, Badge, BADGES } from "@/types";
import { getAppData, saveAppData, initDemoData, generateId } from "@/lib/storage";
import { getMonthIncome, getMonthExpense, getBalance, getRecentTransactions, getBudgetUsage } from "@/lib/calculations";

interface DashboardContextType {
  // Data
  appData: AppData | null;
  transactions: Transaction[];
  settings: UserSettings;
  savingsGoals: SavingsGoal[];

  // Computed values
  monthlyIncome: number;
  monthlyExpense: number;
  balance: number;
  recentTransactions: Transaction[];
  totalSavings: number;

  // Gamification
  streakData: StreakData;
  unlockedBadgeIds: string[];
  hasCheckedInToday: boolean;
  checkIn: () => void;
  checkAndUnlockBadges: () => Badge[];
  useStreakFreeze: () => void;
  isBadgeUnlocked: (badgeId: string) => boolean;
  getBadgeProgress: (badgeId: string) => number;

  // Actions
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, "id" | "currentAmount" | "createdAt">) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  addFundsToGoal: (id: string, amount: number, note?: string) => void;
  refreshData: () => void;

  // Loading state
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    let data = getAppData();

    // Initialize with demo data if no transactions
    if (data.transactions.length === 0) {
      data = initDemoData();
    }

    setAppData(data);
    setIsLoading(false);
  }, []);

  // Computed values
  const transactions = appData?.transactions || [];
  const savingsGoals = appData?.savingsGoals || [];
  const settings = appData?.settings || {
    name: "Viesloxy",
    darkMode: false,
    monthlyBudget: {
      makanan: 500000,
      transportasi: 200000,
      hiburan: 150000,
      pendidikan: 100000,
      kesehatan: 100000,
      lainnya: 150000,
    },
    monthlyIncome: 0,
  };

  const monthlyIncome = getMonthIncome(transactions);
  const monthlyExpense = getMonthExpense(transactions);
  const balance = getBalance(transactions);
  const recentTransactions = getRecentTransactions(transactions, 5);
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  // Actions
  const refreshData = useCallback(() => {
    const data = getAppData();
    setAppData(data);
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
    };

    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        transactions: [newTransaction, ...prev.transactions],
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        transactions: prev.transactions.map((t) =>
          t.id === id ? { ...t, ...updates } : t
        ),
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        transactions: prev.transactions.filter((t) => t.id !== id),
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        settings: {
          ...prev.settings,
          ...updates,
        },
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const addSavingsGoal = useCallback((goal: Omit<SavingsGoal, "id" | "currentAmount" | "createdAt">) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: generateId(),
      currentAmount: 0,
      createdAt: new Date().toISOString(),
    };

    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        savingsGoals: [newGoal, ...prev.savingsGoals],
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const updateSavingsGoal = useCallback((id: string, updates: Partial<SavingsGoal>) => {
    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        savingsGoals: prev.savingsGoals.map((g) =>
          g.id === id ? { ...g, ...updates } : g
        ),
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const deleteSavingsGoal = useCallback((id: string) => {
    setAppData((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        savingsGoals: prev.savingsGoals.filter((g) => g.id !== id),
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  const addFundsToGoal = useCallback((id: string, amount: number, note?: string) => {
    setAppData((prev) => {
      if (!prev) return null;
      const goal = prev.savingsGoals.find((g) => g.id === id);
      if (!goal) return prev;

      const updated = {
        ...prev,
        savingsGoals: prev.savingsGoals.map((g) =>
          g.id === id
            ? {
                ...g,
                currentAmount: g.currentAmount + amount,
                lastContribution: {
                  amount,
                  date: new Date().toISOString(),
                  note,
                },
              }
            : g
        ),
      };
      saveAppData(updated);
      return updated;
    });
  }, []);

  // ===== GAMIFICATION =====

  // Streak data
  const streakData: StreakData = appData?.gamification?.streak || {
    current: 0,
    lastCheckIn: new Date().toISOString().split("T")[0],
    longest: 0,
    longestDate: "",
    streakFreezeAvailable: true,
    streakFreezeUsedThisMonth: false,
  };

  // Unlocked badges
  const unlockedBadgeIds = appData?.gamification?.badges || [];

  // Check if user has checked in today
  const hasCheckedInToday = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return streakData.lastCheckIn === today;
  }, [streakData.lastCheckIn]);

  // Check-in function
  const checkIn = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];

    setAppData((prev) => {
      if (!prev) return null;

      const currentStreak = prev.gamification.streak.current;
      const lastCheckIn = prev.gamification.streak.lastCheckIn;
      const lastDate = new Date(lastCheckIn).toISOString().split("T")[0];

      // Already checked in today
      if (lastDate === today) return prev;

      // Calculate new streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      let newStreak = 1;
      if (lastDate === yesterdayStr) {
        newStreak = currentStreak + 1;
      }

      const newLongest = Math.max(prev.gamification.streak.longest, newStreak);
      const newLongestDate = newLongest === newStreak ? today : prev.gamification.streak.longestDate;

      const updatedStreak: StreakData = {
        current: newStreak,
        lastCheckIn: today,
        longest: newLongest,
        longestDate: newLongestDate,
        streakFreezeAvailable: prev.gamification.streak.streakFreezeAvailable,
        streakFreezeUsedThisMonth: prev.gamification.streak.streakFreezeUsedThisMonth,
      };

      const updated = {
        ...prev,
        gamification: {
          ...prev.gamification,
          streak: updatedStreak,
        },
      };

      saveAppData(updated);
      return updated;
    });
  }, []);

  // Use streak freeze
  const useStreakFreeze = useCallback(() => {
    setAppData((prev) => {
      if (!prev) return null;

      const updatedStreak: StreakData = {
        ...prev.gamification.streak,
        streakFreezeAvailable: false,
        streakFreezeUsedThisMonth: true,
      };

      const updated = {
        ...prev,
        gamification: {
          ...prev.gamification,
          streak: updatedStreak,
        },
      };

      saveAppData(updated);
      return updated;
    });
  }, []);

  // Check and unlock badges
  const checkAndUnlockBadges = useCallback((): Badge[] => {
    const newlyUnlocked: Badge[] = [];
    const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const currentBadges = unlockedBadgeIds;

    // Check transaction badges
    const transactionCount = transactions.length;
    const transBadges = BADGES.filter((b) => b.category === "transaction");
    transBadges.forEach((badge) => {
      if (transactionCount >= badge.requirement && !currentBadges.includes(badge.id)) {
        newlyUnlocked.push(badge);
      }
    });

    // Check savings badges
    const savingsBadges = BADGES.filter((b) => b.category === "savings");
    savingsBadges.forEach((badge) => {
      if (totalSavings >= badge.requirement && !currentBadges.includes(badge.id)) {
        newlyUnlocked.push(badge);
      }
    });

    // Check streak badges
    const streakBadges = BADGES.filter((b) => b.category === "streak");
    streakBadges.forEach((badge) => {
      if (streakData.current >= badge.requirement && !currentBadges.includes(badge.id)) {
        newlyUnlocked.push(badge);
      }
    });

    // Check goal badge
    const goalBadge = BADGES.find((b) => b.id === "full_goal");
    if (goalBadge && savingsGoals.length >= 1 && !currentBadges.includes(goalBadge.id)) {
      newlyUnlocked.push(goalBadge);
    }

    // Update badges in state if any newly unlocked
    if (newlyUnlocked.length > 0) {
      setAppData((prev) => {
        if (!prev) return null;
        const updated = {
          ...prev,
          gamification: {
            ...prev.gamification,
            badges: [...prev.gamification.badges, ...newlyUnlocked.map((b) => b.id)],
          },
        };
        saveAppData(updated);
        return updated;
      });
    }

    return newlyUnlocked;
  }, [transactions, savingsGoals, streakData.current, unlockedBadgeIds]);

  // Helper: check if badge is unlocked
  const isBadgeUnlocked = useCallback(
    (badgeId: string) => unlockedBadgeIds.includes(badgeId),
    [unlockedBadgeIds]
  );

  // Helper: get badge progress percentage
  const getBadgeProgress = useCallback(
    (badgeId: string) => {
      const badge = BADGES.find((b) => b.id === badgeId);
      if (!badge) return 0;

      let currentValue = 0;
      switch (badge.category) {
        case "transaction":
          currentValue = transactions.length;
          break;
        case "savings":
          currentValue = totalSavings;
          break;
        case "streak":
          currentValue = streakData.current;
          break;
        case "goal":
          currentValue = savingsGoals.length;
          break;
      }

      return Math.min((currentValue / badge.requirement) * 100, 100);
    },
    [transactions, totalSavings, streakData.current, savingsGoals]
  );

  const value: DashboardContextType = {
    appData,
    transactions,
    settings,
    savingsGoals,
    monthlyIncome,
    monthlyExpense,
    balance,
    recentTransactions,
    totalSavings,

    // Gamification
    streakData,
    unlockedBadgeIds,
    hasCheckedInToday: hasCheckedInToday(),
    checkIn,
    checkAndUnlockBadges,
    useStreakFreeze,
    isBadgeUnlocked,
    getBadgeProgress,

    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateSettings,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    addFundsToGoal,
    refreshData,
    isLoading,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}