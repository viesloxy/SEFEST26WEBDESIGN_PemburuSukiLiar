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

// Category with emoji
export interface Category {
  id: string;
  name: string;
  emoji: string;
  type: TransactionType;
}

export const EXPENSE_CATEGORIES: Category[] = [
  { id: "makanan", name: "Makanan", emoji: "🍜", type: "expense" },
  { id: "transportasi", name: "Transportasi", emoji: "🚌", type: "expense" },
  { id: "hiburan", name: "Hiburan", emoji: "🎮", type: "expense" },
  { id: "pendidikan", name: "Pendidikan", emoji: "📚", type: "expense" },
  { id: "kesehatan", name: "Kesehatan", emoji: "💊", type: "expense" },
  { id: "belanja", name: "Belanja", emoji: "🛒", type: "expense" },
  { id: "pulsa", name: "Pulsa & Internet", emoji: "📱", type: "expense" },
  { id: "hadiah", name: "Hadiah", emoji: "🎁", type: "expense" },
  { id: "lainnya", name: "Lainnya", emoji: "📦", type: "expense" },
];

export const INCOME_CATEGORIES: Category[] = [
  { id: "gaji", name: "Gaji", emoji: "💼", type: "income" },
  { id: "uang_saku", name: "Uang Saku", emoji: "🎓", type: "income" },
  { id: "freelance", name: "Freelance", emoji: "💻", type: "income" },
  { id: "hadiah", name: "Hadiah", emoji: "🎁", type: "income" },
  { id: "investasi", name: "Investasi", emoji: "📈", type: "income" },
  { id: "lainnya", name: "Lainnya", emoji: "🔄", type: "income" },
];

// Badge definitions
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: number;
}

export const BADGES: Badge[] = [
  { id: "first_trans", name: "First Ngek", emoji: "🌟", description: "First transaction logged", requirement: 1 },
  { id: "10x_trans", name: "10x Ngek", emoji: "🎯", description: "10 transactions logged", requirement: 10 },
  { id: "50x_trans", name: "50x Ngek", emoji: "🎯", description: "50 transactions logged", requirement: 50 },
  { id: "save_100k", name: "Save Rp100k", emoji: "💰", description: "Tabungan mencapai Rp 100.000", requirement: 100000 },
  { id: "save_500k", name: "Save Rp500k", emoji: "💰", description: "Tabungan mencapai Rp 500.000", requirement: 500000 },
  { id: "save_1jt", name: "Save Rp1jt", emoji: "💰", description: "Tabungan mencapai Rp 1.000.000", requirement: 1000000 },
  { id: "7day_streak", name: "7 Day Streak", emoji: "🔥", description: "7 hari streak", requirement: 7 },
  { id: "30day_streak", name: "30 Day Streak", emoji: "🔥", description: "30 hari streak", requirement: 30 },
  { id: "budget_master", name: "Budget Master", emoji: "🎯", description: "Semua budget di bawah 100%", requirement: 1 },
  { id: "full_goal", name: "First Goal", emoji: "💎", description: "Buat 1 savings goal", requirement: 1 },
];