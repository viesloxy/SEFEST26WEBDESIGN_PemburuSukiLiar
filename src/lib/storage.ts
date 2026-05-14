import { AppData, Transaction, SavingsGoal, StreakData, UserSettings } from "@/types";

const STORAGE_KEY = "kantongek_data";

const defaultSettings: UserSettings = {
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

const defaultAppData: AppData = {
  settings: defaultSettings,
  transactions: [],
  savingsGoals: [],
  gamification: {
    streak: {
      current: 0,
      lastCheckIn: "",
      longest: 0,
      longestDate: "",
    },
    badges: [],
  },
};

// Get data from localStorage
export function getAppData(): AppData {
  if (typeof window === "undefined") return defaultAppData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return defaultAppData;
}

// Save data to localStorage
export function saveAppData(data: AppData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Initialize with demo data for showcase
export function initDemoData(): AppData {
  const today = new Date();
  const demoTransactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      category: "gaji",
      amount: 2000000,
      description: "Gaji bulanan",
      date: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
    },
    {
      id: "2",
      type: "expense",
      category: "makanan",
      amount: 25000,
      description: "Nasi padang",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    },
    {
      id: "3",
      type: "expense",
      category: "transportasi",
      amount: 15000,
      description: "Ojol ke kampus",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
    },
    {
      id: "4",
      type: "expense",
      category: "hiburan",
      amount: 50000,
      description: "Top up game",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    },
    {
      id: "5",
      type: "expense",
      category: "makanan",
      amount: 18000,
      description: "Makan siang",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    },
    {
      id: "6",
      type: "expense",
      category: "pulsa",
      amount: 50000,
      description: "Paket internet",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    },
    {
      id: "7",
      type: "expense",
      category: "belanja",
      amount: 120000,
      description: "Beli baju",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    },
    {
      id: "8",
      type: "income",
      category: "freelance",
      amount: 500000,
      description: "Freelance web design",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
    },
  ];

  const demoSavingsGoals: SavingsGoal[] = [
    {
      id: "1",
      name: "Headphone Sony",
      targetAmount: 2000000,
      currentAmount: 800000,
      deadline: new Date(today.getFullYear(), today.getMonth() + 2, 1).toISOString(),
      createdAt: new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString(),
      icon: "headphones",
    },
    {
      id: "2",
      name: "Trip Jakarta",
      targetAmount: 2500000,
      currentAmount: 500000,
      deadline: new Date(today.getFullYear(), today.getMonth() + 4, 1).toISOString(),
      createdAt: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
      icon: "plane",
    },
  ];

  const demoAppData: AppData = {
    settings: {
      ...defaultSettings,
      name: "KANTONGEK User",
      monthlyIncome: 2500000,
    },
    transactions: demoTransactions,
    savingsGoals: demoSavingsGoals,
    gamification: {
      streak: {
        current: 7,
        lastCheckIn: new Date().toISOString().split("T")[0],
        longest: 14,
        longestDate: "2026-04-14",
      },
      badges: ["first_trans", "10x_trans", "7day_streak"],
    },
  };

  // Save demo data
  saveAppData(demoAppData);
  return demoAppData;
}

// Clear all data
export function clearAppData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}