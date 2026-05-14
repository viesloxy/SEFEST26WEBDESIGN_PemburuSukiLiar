"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { AppData, Transaction, UserSettings, SavingsGoal } from "@/types";
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
    name: "Gen-Z User",
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