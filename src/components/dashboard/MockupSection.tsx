"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const mockups = [
  {
    title: "Dashboard Intuitive",
    description: "Pantau saldo dan statistik keuanganmu dalam satu tampilan yang bersih dan mudah dipahami",
  },
  {
    title: "Pencatatan Cepat",
    description: "Tambahkan transaksi hanya dalam beberapa detik dengan input yang simpel",
  },
  {
    title: "Budget Tracking",
    description: "Kelola budget per kategori dengan visualisasi progress yang jelas",
  },
  {
    title: "Tabungan Goals",
    description: "Tetapkan dan capai tujuan finansialmu dengan fitur tabungan bertarget",
  },
];

export default function MockupSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-black transition-colors duration-300" id="preview">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
            Tampilan Aplikasi
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Antarmuka yang modern dan intuitif, dirancang untuk pengalaman terbaik
          </p>
        </motion.div>

        {/* Mockups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {mockups.map((mockup) => (
            <motion.div key={mockup.title} variants={itemVariants}>
              <Card className="overflow-hidden p-0 group rounded-2xl border-black/5 dark:border-white/5" padding="none">
                {/* Mockup Image Placeholder */}
                <div className="aspect-[4/3] bg-white dark:bg-neutral-950 flex items-center justify-center relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                  {/* UI Elements Simulation */}
                  <div className="absolute top-6 left-6 right-6 h-10 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg" />
                  <div className="absolute top-10 left-6 w-32 h-3 bg-neutral-300 dark:bg-neutral-700/50 rounded" />

                  {/* Main content box */}
                  <div className="absolute inset-12 border border-neutral-800 rounded-xl" />
                  <div className="absolute inset-16 border border-neutral-700/50 rounded-lg" />

                  {/* Bottom bars */}
                  <div className="absolute bottom-12 left-6 right-6 h-16 bg-neutral-200 dark:bg-neutral-800/50 rounded-xl" />
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    <div className="flex-1 h-8 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg" />
                    <div className="flex-1 h-8 bg-neutral-200 dark:bg-neutral-800/50 rounded-lg" />
                    <div className="flex-1 h-8 bg-primary/20 rounded-lg" />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5 rounded-full border border-primary/30">
                    <span className="text-xs text-primary">{mockup.title}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-2">{mockup.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/50">
                    {mockup.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Platform Promo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block p-8 md:p-12 rounded-2xl border-primary/20">
            <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">
              Tersedia di Semua Platform
            </h3>
            <p className="text-base mb-6 max-w-md mx-auto text-neutral-600 dark:text-white/50">
              KANTONGEK dapat diakses melalui browser di desktop maupun mobile. Tidak perlu download aplikasi tambahan
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-primary/20">
                <div className="w-4 h-4 bg-primary/20 rounded" />
                <span className="text-sm text-black dark:text-white">Web App</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-black/10 dark:border-white/10">
                <div className="w-4 h-4 bg-black/10 dark:bg-white/10 rounded" />
                <span className="text-sm text-neutral-600 dark:text-white/50">Mobile Responsive</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-black/10 dark:border-white/10">
                <div className="w-4 h-4 bg-black/10 dark:bg-white/10 rounded" />
                <span className="text-sm text-neutral-600 dark:text-white/50">Offline Mode</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}