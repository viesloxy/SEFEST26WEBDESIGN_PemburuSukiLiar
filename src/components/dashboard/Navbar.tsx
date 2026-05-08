"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Fitur", href: "#fitur" },
  { label: "Preview", href: "#preview" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <section className="py-4 lg:py-6 fixed w-full top-0 z-50">
        <div className="container max-w-6xl">
          <div className="rounded-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-black/10 dark:border-white/10">
            <div className="grid grid-cols-3 lg:grid-cols-3 lg:border-none rounded-full p-2 px-4 md:pr-2 items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-9 h-9 md:w-10 md:h-10">
                  <Image
                    src="/images/Logo.svg"
                    alt="KANTONGEK"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-base md:text-lg tracking-tight text-black dark:text-white">KANTONGEK</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex justify-center items-center">
                <div className="flex gap-8 font-medium text-sm tracking-wide">
                  {navLinks.map((link) => (
                    <Link
                      href={link.href}
                      key={link.label}
                      className="text-black/60 dark:text-white/60 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Right Actions */}
              <div className="flex justify-end items-center gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-black/5 dark:bg-white/10"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <div className="relative w-5 h-5">
                    <Sun
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "light"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 rotate-90 scale-0"
                      } text-black`}
                    />
                    <Moon
                      className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                        theme === "dark"
                          ? "opacity-100 rotate-0 scale-100"
                          : "opacity-0 -rotate-90 scale-0"
                      } text-white`}
                    />
                  </div>
                </button>

                {/* Desktop Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                  <Button variant="primary" size="sm">
                    Daftar
                  </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="w-5 h-5 text-black dark:text-white" />
                  ) : (
                    <Menu className="w-5 h-5 text-black dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="lg:hidden overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center gap-4 py-6 border-t border-black/10 dark:border-white/10">
                    {navLinks.map((link) => (
                      <Link
                        href={link.href}
                        key={link.label}
                        className="text-black/60 dark:text-white/60 hover:text-primary transition-colors py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <Button variant="ghost" size="sm">
                        Masuk
                      </Button>
                      <Button variant="primary" size="sm">
                        Daftar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* Spacer for fixed navbar */}
      <div className="pb-24 md:pb-28" />
    </>
  );
}
