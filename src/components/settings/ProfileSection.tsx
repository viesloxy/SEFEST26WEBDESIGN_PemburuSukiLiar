"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import SettingsSection from "./SettingsSection";

export default function ProfileSection() {
  const { user } = useAuth();
  const { settings, updateSettings } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(settings.name || user?.name || "");
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Ukuran foto maksimal 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Nama harus diisi");
      return;
    }
    if (name.trim().length < 2) {
      setError("Nama minimal 2 karakter");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update settings through dashboard context
      updateSettings({ name: name.trim() });

      setSuccess("Profil berhasil diperbarui");
    } catch {
      setError("Gagal menyimpan perubahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsSection
      title="Profil"
      icon={<User className="w-5 h-5 text-primary" />}
      description="Kelola informasi profil Anda"
    >
      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar Preview */}
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 cursor-pointer group"
            onClick={handlePhotoClick}
          >
            <Image
              src={photo || user?.name ? `/images/default-avatar.png` : "/images/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover"
            />
            {/* Camera overlay on hover */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Upload Button */}
          <div>
            <button
              type="button"
              onClick={handlePhotoClick}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors"
            >
              Ganti Foto
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <p className="text-xs text-neutral-500 dark:text-white/50 mt-2">
              Format: JPG, PNG. Max: 2MB
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

        {/* Name Input */}
        <div className="space-y-4">
          <AuthInput
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            prefixIcon={<User className="w-5 h-5" />}
          />

          <AuthButton
            label="Simpan Perubahan"
            onClick={handleSave}
            isLoading={isLoading}
          />
        </div>
      </div>
    </SettingsSection>
  );
}