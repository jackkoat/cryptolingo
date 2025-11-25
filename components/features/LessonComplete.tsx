'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface LessonCompleteProps {
  xpEarned: number;
  newTotalXp: number;
  newLevel: number;
  leveledUp: boolean;
  pathId: string;
}

export const LessonComplete: FC<LessonCompleteProps> = ({
  xpEarned,
  newTotalXp,
  newLevel,
  leveledUp,
  pathId,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 flex items-center justify-center p-6">
      <Card className="p-12 max-w-2xl w-full text-center" glass>
        {leveledUp && (
          <div className="mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Level Up!
            </h2>
            <p className="text-xl text-purple-600 font-semibold">
              You reached Level {newLevel}
            </p>
          </div>
        )}

        {!leveledUp && (
          <div className="mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Lesson Complete!
            </h2>
          </div>
        )}

        <div className="bg-gradient-to-br from-purple-100 to-green-100 rounded-2xl p-8 mb-8">
          <div className="text-5xl font-bold text-purple-600 mb-2">
            +{xpEarned} XP
          </div>
          <p className="text-gray-600">Total XP: {newTotalXp}</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => router.push(`/learning-paths/${pathId}`)}
            variant="primary"
            size="lg"
            className="w-full"
          >
            Continue Learning
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};
