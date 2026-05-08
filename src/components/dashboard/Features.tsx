"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Pencatatan Transaksi",
    description: "Catat setiap pengeluaran dan pemasukan dengan cepat dan akurat dalam hitungan detik",
  },
  {
    title: "Budget Management",
    description: "Atur budget per kategori dan dapatkan notifikasi saat mendekati batas pengeluaran",
  },
  {
    title: "Tabungan Goals",
    description: "Tetapkan tujuan tabungan dan track progressmu secara real-time",
  },
  {
    title: "Analisis Keuangan",
    description: "Lihat grafik dan insight mendalam tentang kebiasaan finansialmu",
  },
  {
    title: "Streak Harian",
    description: "Bangun kebiasaan baik dengan streak tracking yang memotivasi",
  },
  {
    title: "Akses Offline",
    description: "Tidak perlu internet, semua data tersimpan aman di perangkatmu",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-24" id="fitur">
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
            Semua yang Kamu Butuhkan
          </h2>
          <p className="text-base max-w-2xl mx-auto text-neutral-600 dark:text-white/50">
            Dirancang khusus untuk Gen-Z Indonesia dengan fitur lengkap untuk mengelola keuangan sehari-hari
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full group cursor-pointer p-8 rounded-2xl border-black/5 dark:border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                  {/* Number Indicator */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <span className="text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Content */}
                  <h3 className="text-lg font-medium mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-grow text-neutral-600 dark:text-white/50">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}