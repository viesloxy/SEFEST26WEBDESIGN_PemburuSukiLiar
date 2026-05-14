"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, PartyPopper } from "lucide-react";

interface GoalCelebrationProps {
  isOpen: boolean;
  goalName: string;
  onClose: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const confettiColors = ["#A4D624", "#4CAF50", "#FF9800", "#FF5252", "#FFE66D"];

export default function GoalCelebration({
  isOpen,
  goalName,
  onClose,
}: GoalCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti pieces
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          delay: Math.random() * 0.5,
          size: Math.random() * 8 + 4,
        });
      }
      setConfetti(pieces);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${piece.x}%`,
                  top: -20,
                  backgroundColor: piece.color,
                  width: piece.size,
                  height: piece.size,
                }}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{
                  y: window.innerHeight + 20,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 3,
                  delay: piece.delay,
                  ease: "easeIn",
                }}
              />
            ))}
          </div>

          {/* Celebration Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: 2, duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-income flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
              Selamat!
            </h2>
            <p className="text-neutral-500 dark:text-white/50 mb-2">
              Tujuan "{goalName}" sudah tercapai!
            </p>
            <p className="text-sm text-primary font-medium mb-6">
              Great job managing your finances!
            </p>

            <motion.button
              onClick={onClose}
              className="w-full bg-primary text-neutral-900 rounded-full py-3 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PartyPopper className="w-5 h-5" />
              Mantap!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}