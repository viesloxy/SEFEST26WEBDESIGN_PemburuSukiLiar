"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Bell,
  Database,
  AlertTriangle,
  Info,
  CheckCircle,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface SettingsSidebarProps {
  className?: string;
}

const navItems = [
  { id: "profile", label: "Profil", icon: User },
  { id: "email", label: "Email", icon: Mail },
  { id: "password", label: "Kata Sandi", icon: Lock },
  { id: "notification", label: "Notifikasi", icon: Bell },
  { id: "data", label: "Kelola Data", icon: Database },
  { id: "danger", label: "Zona Berbahaya", icon: AlertTriangle },
  { id: "account", label: "Info Akun", icon: Info },
];

export default function SettingsSidebar({ className = "" }: SettingsSidebarProps) {
  const [activeId, setActiveId] = useState("profile");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!mounted) {
    return (
      <aside className={`w-72 flex-shrink-0 hidden lg:block ${className}`}>
        <div className="sticky top-24 space-y-6">
          {/* Logo placeholder */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/Logo.svg" alt="KANTONGEK" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-black dark:text-white">
              KANTONGEK
            </span>
          </div>

          {/* Placeholder nav */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/5 p-6">
            <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`w-72 flex-shrink-0 hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-2">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/Logo.svg" alt="KANTONGEK" fill className="object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-black dark:text-white">
              KANTONGEK
            </span>
          </Link>
        </div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/5 p-6"
        >
          <h3 className="text-sm font-medium text-neutral-600 dark:text-white/50 mb-4">
            Navigasi Cepat
          </h3>

          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 text-left
                    ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-600 dark:text-white/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                      layoutId="activeDot"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </motion.div>

        {/* Tips & Help */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/5 dark:border-white/5 p-6"
        >
          <h3 className="text-sm font-medium text-neutral-600 dark:text-white/50 mb-4">
            Tips & Bantuan
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-income/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-income" />
              </div>
              <div>
                <p className="text-xs font-medium text-black dark:text-white">
                  Perubahan disimpan otomatis
                </p>
                <p className="text-xs text-neutral-500 dark:text-white/50">
                  Data Anda tersimpan dengan aman di browser
                </p>
              </div>
            </div>

            <div className="border-t border-black/5 dark:border-white/5 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-black dark:text-white">
                    Butuh bantuan?
                  </p>
                  <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    Hubungi kami
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* App Version */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">K</span>
            </div>
            <div>
              <p className="text-sm font-medium text-black dark:text-white">
                KANTONGEK
              </p>
              <p className="text-xs text-neutral-500 dark:text-white/50">
                v1.0.0
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}