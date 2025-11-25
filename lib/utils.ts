import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function calculateLevel(totalXp: number): number {
  return Math.floor(totalXp / 500) + 1;
}

export function getXpForNextLevel(totalXp: number): number {
  const currentLevel = calculateLevel(totalXp);
  return currentLevel * 500;
}

export function getXpProgress(totalXp: number): number {
  const currentLevelMinXp = (calculateLevel(totalXp) - 1) * 500;
  const xpInCurrentLevel = totalXp - currentLevelMinXp;
  return (xpInCurrentLevel / 500) * 100;
}

export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function checkStreak(lastActive: Date | null): number {
  if (!lastActive) return 1;
  
  const now = new Date();
  const lastActiveDate = new Date(lastActive);
  const diffTime = Math.abs(now.getTime() - lastActiveDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If last active was within 24 hours, maintain streak
  // If within 48 hours, maintain streak (1 day grace)
  // Otherwise, reset to 1
  if (diffDays <= 1) {
    return -1; // Return -1 to indicate no change
  } else if (diffDays === 2) {
    return -1; // Grace period
  } else {
    return 1; // Reset streak
  }
}

export function formatDate(date: Date | null): string {
  if (!date) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export const ACHIEVEMENTS = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    requirement: (stats: { completedLessons: number }) => stats.completedLessons >= 1,
  },
  {
    id: 'beginner-complete',
    title: 'Beginner Graduate',
    description: 'Complete the Beginner Fundamentals path',
    icon: '🎓',
    requirement: (stats: { completedLessons: number }) => stats.completedLessons >= 4,
  },
  {
    id: 'defi-complete',
    title: 'DeFi Master',
    description: 'Complete the DeFi Essentials path',
    icon: '⚡',
    requirement: (stats: { completedLessons: number }) => stats.completedLessons >= 8,
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach level 5',
    icon: '⭐',
    requirement: (stats: { level: number }) => stats.level >= 5,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    requirement: (stats: { streakDays: number }) => stats.streakDays >= 7,
  },
  {
    id: 'all-lessons',
    title: 'Crypto Expert',
    description: 'Complete all lessons',
    icon: '👑',
    requirement: (stats: { completedLessons: number; totalLessons: number }) =>
      stats.completedLessons >= stats.totalLessons && stats.totalLessons === 8,
  },
];
