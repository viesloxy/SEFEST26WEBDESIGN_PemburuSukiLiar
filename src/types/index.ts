// Transaction Types
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
}

// Budget Types
export interface Budget {
  makanan: number;
  transportasi: number;
  hiburan: number;
  pendidikan: number;
  kesehatan: number;
  lainnya: number;
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  createdAt: string;
  icon: string;
  lastContribution?: {
    amount: number;
    date: string;
    note?: string;
  };
}

// Streak Types
export interface StreakData {
  current: number;
  lastCheckIn: string;
  longest: number;
  longestDate: string;
}

// User Settings
export interface UserSettings {
  name: string;
  darkMode: boolean;
  monthlyBudget: Budget;
  monthlyIncome: number;
}

// App Data
export interface AppData {
  settings: UserSettings;
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  gamification: {
    streak: StreakData;
    badges: string[];
  };
}

// Category with icon (Lucide icon name)
export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  type: TransactionType;
}

// Category icon mapping for dashboard
export const CATEGORY_ICONS: Record<string, string> = {
  // Expense categories
  makanan: "Utensils",
  transportasi: "Car",
  hiburan: "Gamepad2",
  pendidikan: "BookOpen",
  kesehatan: "Heart",
  belanja: "ShoppingBag",
  pulsa: "Smartphone",
  hadiah: "Gift",
  lainnya: "Package",
  // Income categories
  gaji: "Briefcase",
  uang_saku: "Wallet",
  freelance: "Laptop",
  investasi: "TrendingUp",
};

export const EXPENSE_CATEGORIES: Category[] = [
  { id: "makanan", name: "Makanan", icon: "Utensils", type: "expense" },
  { id: "transportasi", name: "Transportasi", icon: "Car", type: "expense" },
  { id: "hiburan", name: "Hiburan", icon: "Gamepad2", type: "expense" },
  { id: "pendidikan", name: "Pendidikan", icon: "BookOpen", type: "expense" },
  { id: "kesehatan", name: "Kesehatan", icon: "Heart", type: "expense" },
  { id: "belanja", name: "Belanja", icon: "ShoppingBag", type: "expense" },
  { id: "pulsa", name: "Pulsa & Internet", icon: "Smartphone", type: "expense" },
  { id: "hadiah", name: "Hadiah", icon: "Gift", type: "expense" },
  { id: "lainnya", name: "Lainnya", icon: "Package", type: "expense" },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: "gaji", name: "Gaji", icon: "Briefcase", type: "income" },
  { id: "uang_saku", name: "Uang Saku", icon: "Wallet", type: "income" },
  { id: "freelance", name: "Freelance", icon: "Laptop", type: "income" },
  { id: "hadiah", name: "Hadiah", icon: "Gift", type: "income" },
  { id: "investasi", name: "Investasi", icon: "TrendingUp", type: "income" },
  { id: "lainnya", name: "Lainnya", icon: "Package", type: "income" },
];

// Badge definitions
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirement: number;
}

export const BADGES: Badge[] = [
  { id: "first_trans", name: "First Ngek", icon: "Star", description: "First transaction logged", requirement: 1 },
  { id: "10x_trans", name: "10x Ngek", icon: "Target", description: "10 transactions logged", requirement: 10 },
  { id: "50x_trans", name: "50x Ngek", icon: "Target", description: "50 transactions logged", requirement: 50 },
  { id: "save_100k", name: "Save Rp100k", icon: "Coins", description: "Tabungan mencapai Rp 100.000", requirement: 100000 },
  { id: "save_500k", name: "Save Rp500k", icon: "Coins", description: "Tabungan mencapai Rp 500.000", requirement: 500000 },
  { id: "save_1jt", name: "Save Rp1jt", icon: "Banknote", description: "Tabungan mencapai Rp 1.000.000", requirement: 1000000 },
  { id: "7day_streak", name: "7 Day Streak", icon: "Flame", description: "7 hari streak", requirement: 7 },
  { id: "30day_streak", name: "30 Day Streak", icon: "Flame", description: "30 hari streak", requirement: 30 },
  { id: "budget_master", name: "Budget Master", icon: "Target", description: "Semua budget di bawah 100%", requirement: 1 },
  { id: "full_goal", name: "First Goal", icon: "Gem", description: "Buat 1 savings goal", requirement: 1 },
];