"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { validateRegisterPassword, validatePasswordConfirmation, getPasswordStrength, type PasswordStrength } from "@/lib/validation";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import SettingsSection from "./SettingsSection";

const STRENGTH_LABELS: Record<PasswordStrength, { text: string; color: string }> = {
  weak: { text: "Lemah", color: "bg-expense" },
  medium: { text: "Sedang", color: "bg-warning" },
  strong: { text: "Kuat", color: "bg-income" },
};

export default function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = getPasswordStrength(newPassword);
  const strengthInfo = STRENGTH_LABELS[passwordStrength];

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    // Validate current password
    if (!currentPassword) {
      setError("Kata sandi saat ini harus diisi");
      return;
    }

    // Validate new password
    const newPasswordResult = validateRegisterPassword(newPassword);
    if (!newPasswordResult.isValid) {
      setError(newPasswordResult.error || "Kata sandi tidak valid");
      return;
    }

    // Validate confirmation
    const confirmResult = validatePasswordConfirmation(newPassword, confirmPassword);
    if (!confirmResult.isValid) {
      setError(confirmResult.error || "Konfirmasi kata sandi tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Kata sandi berhasil diubah");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Gagal mengubah kata sandi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Ubah Kata Sandi"
      icon={<Lock className="w-5 h-5 text-primary" />}
      description="Perbarui kata sandi akun Anda"
    >
      <div className="space-y-5">
        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 rounded-lg bg-expense/10 border border-expense/20">
            <p className="text-sm text-expense">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-income/10 border border-income/20">
            <p className="text-sm text-income">{success}</p>
          </div>
        )}

        {/* Current Password */}
        <AuthInput
          label="Kata Sandi Saat Ini"
          type={showCurrent ? "text" : "password"}
          placeholder="Masukkan kata sandi saat ini"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          prefixIcon={<Lock className="w-5 h-5" />}
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
            >
              {showCurrent ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          }
        />

        {/* New Password */}
        <div className="space-y-2">
          <AuthInput
            label="Kata Sandi Baru"
            type={showNew ? "text" : "password"}
            placeholder="Masukkan kata sandi baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            prefixIcon={<Lock className="w-5 h-5" />}
            suffixIcon={
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
              >
                {showNew ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            }
          />

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="space-y-2">
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded-full ${newPassword ? strengthInfo.color : "bg-neutral-300 dark:bg-neutral-600"}`} />
                <div className={`h-1 flex-1 rounded-full ${passwordStrength !== "weak" ? strengthInfo.color : "bg-neutral-300 dark:bg-neutral-600"}`} />
                <div className={`h-1 flex-1 rounded-full ${passwordStrength === "strong" ? strengthInfo.color : "bg-neutral-300 dark:bg-neutral-600"}`} />
              </div>
              <p className="text-xs text-neutral-500 dark:text-white/50">
                Kekuatan: <span className={passwordStrength === "weak" ? "text-expense" : passwordStrength === "medium" ? "text-warning" : "text-income"}>{strengthInfo.text}</span>
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <AuthInput
          label="Konfirmasi Kata Sandi"
          type={showConfirm ? "text" : "password"}
          placeholder="Masukkan ulang kata sandi baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          prefixIcon={<Lock className="w-5 h-5" />}
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
            >
              {showConfirm ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          }
        />

        <AuthButton
          label="Ubah Kata Sandi"
          onClick={handleChangePassword}
          isLoading={isLoading}
        />
      </div>
    </SettingsSection>
  );
}