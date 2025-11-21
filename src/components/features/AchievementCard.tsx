import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Lock, Trophy, Award, Crown, Target, Flame, Wallet, Sparkles, GraduationCap } from 'lucide-react';
import { cn } from '../../lib/utils';

const iconMap = {
  Trophy,
  Award,
  Crown,
  Target,
  Flame,
  Wallet,
  Sparkles,
  GraduationCap,
};

interface AchievementCardProps {
  achievement: {
    name: string;
    description: string;
    badge_type: string;
    icon_name?: string;
  };
  isUnlocked?: boolean;
  unlockedAt?: string;
}

export function AchievementCard({ achievement, isUnlocked = false, unlockedAt }: AchievementCardProps) {
  const Icon = iconMap[achievement.icon_name as keyof typeof iconMap] || Trophy;
  
  const badgeColors = {
    bronze: {
      bg: 'bg-gradient-to-br from-amber-200 to-amber-300',
      icon: 'text-amber-700',
      shadow: 'shadow-glow-soft',
      border: 'border-amber-300',
      glow: 'from-amber-100/50 to-amber-200/50'
    },
    silver: {
      bg: 'bg-gradient-to-br from-gray-200 to-gray-300',
      icon: 'text-gray-700',
      shadow: 'shadow-glow-soft',
      border: 'border-gray-300',
      glow: 'from-gray-100/50 to-gray-200/50'
    },
    gold: {
      bg: 'bg-gradient-to-br from-yellow-300 to-yellow-400',
      icon: 'text-yellow-800',
      shadow: 'shadow-glow-soft',
      border: 'border-yellow-400',
      glow: 'from-yellow-100/50 to-yellow-200/50'
    },
    platinum: {
      bg: 'bg-gradient-to-br from-purple-300 to-purple-400',
      icon: 'text-purple-800',
      shadow: 'shadow-glow-purple',
      border: 'border-purple-400',
      glow: 'from-purple-100/50 to-purple-200/50'
    },
  };

  const colorScheme = badgeColors[achievement.badge_type as keyof typeof badgeColors] || badgeColors.bronze;

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={cn(
        'text-center relative overflow-hidden border-2',
        isUnlocked 
          ? `${colorScheme.border} ${colorScheme.shadow}` 
          : 'border-neutral-200 opacity-60 grayscale'
      )}>
        {/* Background glow effect for unlocked achievements */}
        {isUnlocked && (
          <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.glow} opacity-40`} />
        )}

        <div className="relative z-10">
          <motion.div 
            className={cn(
              'w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center',
              isUnlocked ? colorScheme.bg : 'bg-neutral-200'
            )}
            whileHover={isUnlocked ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {isUnlocked ? (
              <Icon className={cn('w-10 h-10', colorScheme.icon)} />
            ) : (
              <Lock className="w-10 h-10 text-neutral-500" />
            )}
          </motion.div>
          
          <h4 className="text-xl font-bold text-neutral-900 mb-2">{achievement.name}</h4>
          <p className="text-sm text-neutral-700 mb-3 leading-relaxed">{achievement.description}</p>
          
          {isUnlocked && unlockedAt && (
            <div className="inline-block px-3 py-1 bg-success-100 text-success-700 rounded-full text-xs font-semibold">
              Unlocked {new Date(unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
          
          {!isUnlocked && (
            <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs font-semibold">
              Locked
            </div>
          )}
        </div>

        {/* Shimmer effect on hover for unlocked achievements */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        )}
      </Card>
    </motion.div>
  );
}
