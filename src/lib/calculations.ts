import { Transaction, Budget, SavingsGoal } from "@/types";
import { EXPENSE_CATEGORIES } from "@/types";

// Format currency to Indonesian Rupiah
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date to Indonesian format
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Format short date
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(date);
}

// Get total income
export function getTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get total expense
export function getTotalExpense(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get today's expense
export function getTodayExpense(transactions: Transaction[]): number {
  const today = new Date().toISOString().split("T")[0];
  return transactions
    .filter(
      (t) =>
        t.type === "expense" && t.date.split("T")[0] === today
    )
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get this week's expense
export function getWeekExpense(transactions: Transaction[]): number {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  return transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return t.type === "expense" && transactionDate >= startOfWeek;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get this month's expense
export function getMonthExpense(transactions: Transaction[]): number {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return t.type === "expense" && transactionDate >= startOfMonth;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get this month's income
export function getMonthIncome(transactions: Transaction[]): number {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return transactions
    .filter((t) => {
      const transactionDate = new Date(t.date);
      return t.type === "income" && transactionDate >= startOfMonth;
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

// Get expense by category
export function getExpenseByCategory(
  transactions: Transaction[]
): { category: string; amount: number; emoji: string }[] {
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap = new Map<string, number>();

  expenses.forEach((t) => {
    const current = categoryMap.get(t.category) || 0;
    categoryMap.set(t.category, current + t.amount);
  });

  return EXPENSE_CATEGORIES.filter((cat) => categoryMap.has(cat.id)).map((cat) => ({
    category: cat.id,
    amount: categoryMap.get(cat.id) || 0,
    emoji: cat.emoji,
  }));
}

// Calculate budget usage percentage
export function getBudgetUsage(
  category: string,
  transactions: Transaction[],
  budget: Budget
): { used: number; percentage: number; remaining: number } {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const spent = transactions
    .filter(
      (t) =>
        t.type === "expense" &&
        t.category === category &&
        new Date(t.date) >= startOfMonth
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetAmount = budget[category as keyof Budget] || 0;
  const percentage = budgetAmount > 0 ? Math.min((spent / budgetAmount) * 100, 100) : 0;
  const remaining = Math.max(budgetAmount - spent, 0);

  return { used: spent, percentage, remaining };
}

// Get total savings from goals
export function getTotalSavings(goals: SavingsGoal[]): number {
  return goals.reduce((sum, g) => sum + g.currentAmount, 0);
}

// Calculate balance (income - expense)
export function getBalance(transactions: Transaction[]): number {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
}

// Get recent transactions
export function getRecentTransactions(
  transactions: Transaction[],
  limit: number = 5
): Transaction[] {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Get transactions for current month
export function getMonthTransactions(transactions: Transaction[]): Transaction[] {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return transactions.filter((t) => new Date(t.date) >= startOfMonth);
}

// Get weekly data for bar chart
export function getWeeklyData(
  transactions: Transaction[]
): { day: string; income: number; expense: number }[] {
  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const today = new Date();
  const result: { day: string; income: number; expense: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const dayTransactions = transactions.filter(
      (t) => t.date.split("T")[0] === dateStr
    );

    result.push({
      day: days[date.getDay()],
      income: dayTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
      expense: dayTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    });
  }

  return result;
}

// Get category percentages for pie chart
export function getCategoryPercentages(
  transactions: Transaction[]
): { label: string; value: number; color: string }[] {
  const categoryColors: Record<string, string> = {
    makanan: "#FF6B6B",
    transportasi: "#4ECDC4",
    hiburan: "#FFE66D",
    pendidikan: "#95E1D3",
    kesehatan: "#F38181",
    belanja: "#AA96DA",
    pulsa: "#FCBAD3",
    hadiah: "#A8D8EA",
    lainnya: "#C9B1FF",
  };

  const byCategory = getExpenseByCategory(transactions);
  const total = byCategory.reduce((sum, c) => sum + c.amount, 0);

  return byCategory.map((c) => ({
    label: c.emoji + " " + c.category.charAt(0).toUpperCase() + c.category.slice(1),
    value: total > 0 ? Math.round((c.amount / total) * 100) : 0,
    color: categoryColors[c.category] || "#A4D624",
  }));
}