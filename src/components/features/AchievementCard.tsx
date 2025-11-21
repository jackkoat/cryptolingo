import React from 'react';
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
    bronze: 'bg-amber-100 text-amber-600',
    silver: 'bg-gray-200 text-gray-700',
    gold: 'bg-yellow-100 text-yellow-600',
    platinum: 'bg-purple-100 text-purple-600',
  };

  const color = badgeColors[achievement.badge_type as keyof typeof badgeColors] || badgeColors.bronze;

  return (
    <Card className={cn('text-center', !isUnlocked && 'opacity-50 grayscale')}>
      <div className={cn('w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center', color)}>
        {isUnlocked ? (
          <Icon className="w-8 h-8" />
        ) : (
          <Lock className="w-8 h-8 text-neutral-500" />
        )}
      </div>
      <h4 className="text-h3 text-neutral-900 mb-2">{achievement.name}</h4>
      <p className="text-small text-neutral-700 mb-3">{achievement.description}</p>
      {isUnlocked && unlockedAt && (
        <p className="text-caption text-neutral-500">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </p>
      )}
    </Card>
  );
}
