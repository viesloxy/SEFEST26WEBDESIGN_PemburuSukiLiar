"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { BarChart3, TrendingUp, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useDashboard } from "@/context/DashboardContext";
import { formatCurrency } from "@/lib/calculations";
import { CATEGORY_ICONS } from "@/types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

type ChartType = "bar" | "pie";
type TimeRange = "week" | "month" | "3months";

interface StatisticsChartProps {
  className?: string;
}

export default function StatisticsChart({ className = "" }: StatisticsChartProps) {
  const { transactions } = useDashboard();
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  // Get category color
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

  // Prepare bar chart data (weekly income vs expense)
  const getBarChartData = () => {
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const today = new Date();
    const labels: string[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      labels.push(days[date.getDay()]);

      const dayTransactions = transactions.filter((t) => t.date.split("T")[0] === dateStr);

      incomeData.push(
        dayTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0)
      );
      expenseData.push(
        dayTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0)
      );
    }

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "#4CAF50",
          borderRadius: 8,
          barThickness: 24,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "#FF5252",
          borderRadius: 8,
          barThickness: 24,
        },
      ],
    };
  };

  // Prepare pie chart data (expense by category)
  const getPieChartData = () => {
    const categoryTotals: Record<string, number> = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const colors = labels.map((label) => categoryColors[label] || "#A4D624");

    const categoryNames: Record<string, string> = {
      makanan: "Makanan",
      transportasi: "Transportasi",
      hiburan: "Hiburan",
      pendidikan: "Pendidikan",
      kesehatan: "Kesehatan",
      belanja: "Belanja",
      pulsa: "Pulsa",
      hadiah: "Hadiah",
      lainnya: "Lainnya",
    };

    return {
      labels: labels.map((l) => categoryNames[l] || l),
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    };
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "Poppins",
            size: 12,
          },
          color: "#666666",
        },
      },
      tooltip: {
        backgroundColor: "#1A1A1A",
        titleFont: {
          family: "Poppins",
          size: 12,
        },
        bodyFont: {
          family: "Poppins",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Poppins",
            size: 11,
          },
          color: "#666666",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          font: {
            family: "Poppins",
            size: 11,
          },
          color: "#666666",
          callback: (value: any) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`;
            return value;
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          padding: 16,
          font: {
            family: "Poppins",
            size: 11,
          },
          color: "#666666",
        },
      },
      tooltip: {
        backgroundColor: "#1A1A1A",
        titleFont: {
          family: "Poppins",
          size: 12,
        },
        bodyFont: {
          family: "Poppins",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${formatCurrency(context.raw)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="rounded-2xl border-black/5 dark:border-white/5" padding="none">
        {/* Header */}
        <div className="p-6 border-b border-black/5 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white">
                  Statistik Pengeluaran
                </h3>
                <p className="text-xs text-neutral-500 dark:text-white/40">
                  Analisis keuangan kamu
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
              {/* Chart type toggle */}
              <div className="flex bg-black/5 dark:bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    chartType === "bar"
                      ? "bg-primary text-neutral-900"
                      : "text-neutral-600 dark:text-white/60 hover:text-primary"
                  }`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType("pie")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    chartType === "pie"
                      ? "bg-primary text-neutral-900"
                      : "text-neutral-600 dark:text-white/60 hover:text-primary"
                  }`}
                >
                  Pie
                </button>
              </div>

              {/* Time range selector - Segmented control */}
              <div className="flex bg-black/5 dark:bg-white/10 rounded-full p-1 w-full sm:w-auto">
                <button
                  onClick={() => setTimeRange("week")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    timeRange === "week"
                      ? "bg-primary text-neutral-900"
                      : "text-neutral-600 dark:text-white/60 hover:text-primary"
                  }`}
                >
                  Minggu
                </button>
                <button
                  onClick={() => setTimeRange("month")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    timeRange === "month"
                      ? "bg-primary text-neutral-900"
                      : "text-neutral-600 dark:text-white/60 hover:text-primary"
                  }`}
                >
                  Bulan
                </button>
                <button
                  onClick={() => setTimeRange("3months")}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    timeRange === "3months"
                      ? "bg-primary text-neutral-900"
                      : "text-neutral-600 dark:text-white/60 hover:text-primary"
                  }`}
                >
                  3 Bulan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <div className="h-64 md:h-80">
            {chartType === "bar" ? (
              <Bar data={getBarChartData()} options={barOptions} />
            ) : (
              <Pie data={getPieChartData()} options={pieOptions} />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}