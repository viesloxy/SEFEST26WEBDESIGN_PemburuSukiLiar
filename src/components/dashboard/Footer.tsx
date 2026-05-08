"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MotionButton from "@/components/ui/MotionButton";

const footerLinks = {
  produk: [
    { label: "Fitur", href: "#fitur" },
    { label: "Harga", href: "#harga" },
    { label: "Tutorial", href: "#tutorial" },
    { label: "Changelog", href: "#changelog" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Karir", href: "#karir" },
    { label: "Blog", href: "#blog" },
    { label: "Kontak", href: "#kontak" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "#privasi" },
    { label: "Syarat & Ketentuan", href: "#syarat" },
    { label: "Cookie Policy", href: "#cookie" },
  ],
  komunitas: [
    { name: "Instagram", src: "/images/Platform=Instagram, Color=Negative.svg", href: "#" },
    { name: "TikTok", src: "/images/Platform=TikTok, Color=Negative.svg", href: "#" },
    { name: "X", src: "/images/Platform=X (Twitter), Color=Negative.svg", href: "#" },
    { name: "YouTube", src: "/images/Platform=YouTube, Color=Negative.svg", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-neutral-50 dark:bg-black border-t border-primary/20 transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Logo.svg"
                  alt="KANTONGEK"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">KANTONGEK</span>
            </Link>
            <p className="text-sm mb-6 max-w-sm text-neutral-600 dark:text-white/50">
              Aplikasi pengelolaan keuangan pribadi untuk Gen-Z Indonesia. Kelola uangmu dengan smarter, simpler, dan lebih menyenangkan.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Dapatkan update terbaru</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white dark:bg-neutral-900 border border-black/10 dark:border-primary/30 rounded-lg px-4 py-2.5 text-sm focus:border-primary focus:outline-none transition-colors text-black dark:text-white"
                />
                <MotionButton label="Submit" showIcon={false} />
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {footerLinks.komunitas.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-900 hover:bg-primary/20 flex items-center justify-center transition-colors border border-black/10 dark:border-white/10"
                  aria-label={social.name}
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-600 dark:text-white/50">
              2026 KANTONGEK. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#kontak" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                Kontak
              </Link>
              <Link href="#faq" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                FAQ
              </Link>
              <Link href="#bantuan" className="text-sm hover:text-primary transition-colors text-neutral-600 dark:text-white/50">
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
