"use client";

import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface ActionItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

export default function ActionItem({
  icon,
  title,
  description,
  onClick,
  variant = "default",
}: ActionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
        variant === "danger"
          ? "bg-expense/5 hover:bg-expense/10"
          : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            variant === "danger" ? "bg-expense/10" : "bg-primary/10"
          }`}
        >
          {icon}
        </div>
        <div className="text-left">
          <p
            className={`text-sm font-medium ${
              variant === "danger" ? "text-expense" : "text-black dark:text-white"
            }`}
          >
            {title}
          </p>
          <p className="text-xs text-neutral-500 dark:text-white/50">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-neutral-400" />
    </button>
  );
}