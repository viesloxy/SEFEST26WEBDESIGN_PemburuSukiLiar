"use client";

import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  variant?: "default" | "danger";
}

export default function SettingsSection({
  title,
  description,
  icon,
  children,
  variant = "default",
}: SettingsSectionProps) {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 rounded-2xl p-6 border ${
        variant === "danger"
          ? "border-expense/20"
          : "border-black/5 dark:border-white/5"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-medium tracking-tight text-black dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-neutral-500 dark:text-white/50">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}