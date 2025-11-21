import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target } from 'lucide-react';

interface FloatingXPBadgeProps {
  xp: number;
  level: number;
}

export function FloatingXPBadge({ xp, level }: FloatingXPBadgeProps) {
  return (
    <motion.div
      className="fixed top-20 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-glow-soft border border-neutral-200/50 px-4 py-3">
        {/* Level Badge */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Target className="w-4 h-4 text-primary-600" />
          <div className="flex flex-col">
            <span className="text-[10px] text-primary-600 font-medium uppercase tracking-wide leading-none">
              Level
            </span>
            <span className="text-lg font-bold text-primary-700 leading-none mt-0.5">
              {level}
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-px h-8 bg-neutral-200" />

        {/* XP Badge */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-success-100 to-success-200 rounded-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Trophy className="w-4 h-4 text-success-600" />
          <div className="flex flex-col">
            <span className="text-[10px] text-success-600 font-medium uppercase tracking-wide leading-none">
              XP
            </span>
            <span className="text-lg font-bold text-success-700 leading-none mt-0.5">
              {xp.toLocaleString()}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
