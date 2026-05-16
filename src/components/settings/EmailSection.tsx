"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import SettingsSection from "./SettingsSection";

export default function EmailSection() {
  const { user } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = async () => {
    // Validate new email
    if (!newEmail.trim()) {
      setError("Email harus diisi");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError("Format email tidak valid");
      return;
    }
    if (newEmail.toLowerCase() === user?.email.toLowerCase()) {
      setError("Email baru harus berbeda dari email saat ini");
      return;
    }

    // Validate password
    if (!password) {
      setError("Kata sandi harus diisi untuk mengubah email");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real app, verify password and update email
      setSuccess("Email berhasil diubah");
      setNewEmail("");
      setPassword("");
    } catch {
      setError("Gagal mengubah email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Email"
      icon={<Mail className="w-5 h-5 text-primary" />}
      description="Ubah alamat email akun Anda"
    >
      <div className="space-y-6">
        {/* Current Email Display */}
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-white/80 mb-2 block">
            Email saat ini
          </label>
          <div className="px-4 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-white/50">
              {user?.email || "demo@kantongek.id"}
            </p>
          </div>
        </div>

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

        {/* New Email Input */}
        <AuthInput
          label="Email Baru"
          type="email"
          placeholder="Masukkan email baru"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          prefixIcon={<Mail className="w-5 h-5" />}
        />

        {/* Password Confirmation */}
        <AuthInput
          label="Kata Sandi Saat Ini"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan kata sandi untuk konfirmasi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          prefixIcon={<Lock className="w-5 h-5" />}
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white/60 transition-colors"
            >
              {showPassword ? (
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

        {/* Security Note */}
        <p className="text-xs text-neutral-500 dark:text-white/50 flex items-center gap-1">
          <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Anda harus memasukkan kata sandi untuk mengubah email
        </p>

        <AuthButton
          label="Ubah Email"
          onClick={handleChangeEmail}
          isLoading={isLoading}
        />
      </div>
    </SettingsSection>
  );
}