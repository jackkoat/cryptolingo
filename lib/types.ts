// Type definitions for CryptoLingo

export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  matchingPairs?: { term: string; definition: string }[];
}

export interface LessonContent {
  questions: Question[];
}

export interface Lesson {
  id: string;
  learningPathId: string;
  title: string;
  content: LessonContent;
  order: number;
  xpReward: number;
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  description: string;
  totalXp: number;
  totalLessons: number;
  order: number;
  lessons?: Lesson[];
  progress?: number;
  completedLessons?: number;
}

export interface User {
  id: string; // wallet address
  username: string | null;
  level: number;
  totalXp: number;
  streakDays: number;
  lastActive: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserStats {
  level: number;
  totalXp: number;
  streakDays: number;
  completedLessons: number;
  totalLessons: number;
  achievements: Achievement[];
}
