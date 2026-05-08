"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MotionButton from "@/components/ui/MotionButton";

export default function HeroStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-28" id="home">
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Left Draggable Logo */}
        <motion.div
          initial={{ opacity: 0, y: 80, x: -80 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          drag
          dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block cursor-grab active:cursor-grabbing z-10"
        >
          <Image
            src="/images/Logo.svg"
            alt="KANTONGEK"
            width={100}
            height={100}
            className="w-24 h-auto"
            draggable={false}
          />
        </motion.div>

        {/* Right Draggable Logo */}
        <motion.div
          initial={{ opacity: 0, y: 80, x: 80 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          drag
          dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block cursor-grab active:cursor-grabbing z-10"
        >
          <Image
            src="/images/Logo.svg"
            alt="KANTONGEK"
            width={100}
            height={100}
            className="w-24 h-auto"
            draggable={false}
          />
        </motion.div>

        {/* Center Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center w-full"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-xs text-primary font-medium tracking-wider">
                Gen-Z Finance Tracker
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-medium text-center leading-tight tracking-tight mb-6"
          >
            Kelola Keuanganmu
            <br />
            <span className="text-primary">dengan Cara Lebih Cerdas</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-neutral-600 dark:text-white/60 max-w-2xl mb-10"
          >
            Track pengeluaran, atur budget, dan capai tujuan finansialmu dengan antarmuka yang simpel dan menyenangkan
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 relative z-10"
          >
            <MotionButton label="Mulai Sekarang" />
            <MotionButton label="Lihat Demo" variant="secondary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none z-0">
        <img
          src="https://i.postimg.cc/Ss6yShGy/glows.png"
          alt=""
          className="w-full h-auto opacity-30"
        />
      </div>
    </section>
  );
}
