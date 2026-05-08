"use client";

import { useEffect, useRef, useState } from "react";
import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";

const marqueeItems = [
  "Track Pengeluaran",
  "Budget Management",
  "Tabungan Goals",
  "Analisis Data",
  "Streak Harian",
  "Gen-Z Finance",
  "Simple & Clean",
  "Offline Mode",
  "Modern UI",
  "Easy to Use",
];

export default function MarqueeText() {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();
  const animation = useRef<AnimationPlaybackControls>();

  useEffect(() => {
    animation.current = animate(
      scope.current,
      { x: "-50%" },
      { duration: 40, ease: "linear", repeat: Infinity }
    );
  }, [animate, scope]);

  useEffect(() => {
    if (animation.current) {
      if (isHovered) {
        animation.current.speed = 0.3;
      } else {
        animation.current.speed = 1;
      }
    }
  }, [isHovered]);

  return (
    <section className="py-16 overflow-hidden border-y border-primary/20">
      <motion.div
        ref={scope}
        animate={{ x: "-50%" }}
        className="flex gap-16 whitespace-nowrap group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.from({ length: 2 }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex items-center gap-16">
            {marqueeItems.map((item, index) => (
              <div key={`${repeatIndex}-${index}`} className="flex items-center gap-16">
                <span className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-400 dark:text-white/60 group-hover:text-primary transition-colors duration-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
