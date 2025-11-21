import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Lock, CheckCircle2, Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    estimatedMinutes: number;
  };
  isLocked?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
}

export function LessonCard({ lesson, isLocked = false, isCompleted = false, onClick }: LessonCardProps) {
  return (
    <Card
      hover={!isLocked}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        'relative',
        isLocked && 'opacity-60 cursor-not-allowed'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-h3 text-neutral-900">{lesson.title}</h3>
            {isCompleted && <CheckCircle2 className="w-6 h-6 text-success-500" />}
            {isLocked && <Lock className="w-5 h-5 text-neutral-500" />}
          </div>
          <p className="text-body text-neutral-700 mb-4">{lesson.description}</p>
          <div className="flex items-center gap-3">
            <Badge icon={Trophy} label={`${lesson.xpReward} XP`} variant="primary" />
            <span className="text-small text-neutral-500">{lesson.estimatedMinutes} min</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
