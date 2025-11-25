import { FC } from 'react';
import Link from 'next/link';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { LearningPath } from '@/lib/types';

interface LearningPathCardProps {
  path: LearningPath;
}

export const LearningPathCard: FC<LearningPathCardProps> = ({ path }) => {
  const progress = path.progress ?? 0;
  const completedLessons = path.completedLessons ?? 0;

  return (
    <Link href={`/learning-paths/${path.id}`}>
      <Card className="p-6" hover>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {path.title}
            </h3>
            <p className="text-gray-600 text-sm">{path.description}</p>
          </div>
          <div className="ml-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
            {path.order === 1 ? '🎯' : '⚡'}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {completedLessons} / {path.totalLessons} Lessons
            </span>
            <span className="font-semibold text-purple-600">
              {path.totalXp} XP
            </span>
          </div>

          <ProgressBar progress={progress} gradient="from-purple-500 to-purple-600" />
        </div>
      </Card>
    </Link>
  );
};
