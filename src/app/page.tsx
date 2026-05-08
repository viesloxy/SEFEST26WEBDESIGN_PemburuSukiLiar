"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/dashboard/Navbar";
import HeroStats from "@/components/dashboard/HeroStats";
import MarqueeText from "@/components/dashboard/MarqueeText";
import Features from "@/components/dashboard/Features";
import MockupSection from "@/components/dashboard/MockupSection";
import Testimonials from "@/components/dashboard/Testimonials";
import Footer from "@/components/dashboard/Footer";
import LogoTicker from "@/components/dashboard/LogoTicker";
import MotionButton from "@/components/ui/MotionButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <HeroStats />
      <MarqueeText />
      <Features />
      <MockupSection />
      <LogoTicker />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24" id="kontak">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-neutral-100 dark:bg-neutral-950 rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-primary/20"
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
                Siap Mengelola Keuanganmu?
              </h2>
              <p className="text-base max-w-xl mx-auto mb-8 text-neutral-600 dark:text-white/50">
                Bergabung dengan ribuan Gen-Z Indonesia yang sudah merasakan manfaat KANTONGEK dalam mengelola keuangan sehari-hari
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MotionButton label="Mulai Sekarang - Gratis" />
                <MotionButton label="Hubungi Kami" variant="secondary" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
