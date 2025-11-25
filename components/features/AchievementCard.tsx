import { FC } from 'react';
import { Card } from '../ui/Card';

interface AchievementCardProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
  };
}

export const AchievementCard: FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <Card
      className={`p-6 ${
        achievement.unlocked
          ? 'border-2 border-green-400'
          : 'opacity-50'
      }`}
      glass={!achievement.unlocked}
      hover={achievement.unlocked}
    >
      <div className="text-center">
        <div
          className={`text-5xl mb-3 ${
            !achievement.unlocked && 'grayscale'
          }`}
        >
          {achievement.icon}
        </div>
        <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
        <p className="text-sm text-gray-600">{achievement.description}</p>
        {achievement.unlocked && (
          <div className="mt-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full inline-block">
            Unlocked
          </div>
        )}
      </div>
    </Card>
  );
};
