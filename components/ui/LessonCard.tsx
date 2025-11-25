import { FC } from 'react';
import Link from 'next/link';
import { Card } from './Card';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    order: number;
    xpReward: number;
    completed?: boolean;
    locked?: boolean;
  };
}

export const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
  const isLocked = lesson.locked ?? false;
  const isCompleted = lesson.completed ?? false;

  const CardContent = (
    <Card
      className={`p-6 ${
        isLocked
          ? 'opacity-50 cursor-not-allowed'
          : isCompleted
          ? 'border-2 border-green-400'
          : ''
      }`}
      hover={!isLocked}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
              isCompleted
                ? 'bg-green-500 text-white'
                : isLocked
                ? 'bg-gray-300 text-gray-500'
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            {isCompleted ? '✓' : isLocked ? '🔒' : lesson.order}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              {lesson.xpReward} XP
            </p>
          </div>
        </div>

        {!isLocked && !isCompleted && (
          <div className="text-purple-600 font-medium">Start →</div>
        )}
        {isCompleted && (
          <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            Completed
          </div>
        )}
      </div>
    </Card>
  );

  if (isLocked) {
    return <div>{CardContent}</div>;
  }

  return <Link href={`/lesson/${lesson.id}`}>{CardContent}</Link>;
};
