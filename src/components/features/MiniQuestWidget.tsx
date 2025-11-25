import React from 'react';
import { motion } from 'framer-motion';
import { Target, X } from 'lucide-react';

interface MiniQuestWidgetProps {
  onDismiss?: () => void;
}

export function MiniQuestWidget({ onDismiss }: MiniQuestWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-16 z-40 mb-6"
    >
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-2xl p-4 mx-auto max-w-4xl relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Icon */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <Target className="w-6 h-6 text-white" />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">
                Complete your first lesson to earn 50 XP!
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <span className="text-white/90 text-sm font-medium whitespace-nowrap">
                  0 / 1 lessons
                </span>
              </div>
            </div>
          </div>

          {/* Dismiss button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-4 text-white/60 hover:text-white transition-colors p-1"
              aria-label="Dismiss quest"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.5)',
              '0 0 40px rgba(139, 92, 246, 0.7)',
              '0 0 20px rgba(139, 92, 246, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
