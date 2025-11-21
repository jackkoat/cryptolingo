import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { BookOpen, Trophy, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface PathCardProps {
  path: {
    id: string;
    name: string;
    description: string;
    totalXP: number;
  };
  progress?: {
    completed: number;
    total: number;
  };
  onClick?: () => void;
}

export function PathCard({ path, progress, onClick }: PathCardProps) {
  const progressValue = progress ? progress.completed : 0;
  const progressMax = progress ? progress.total : 4;
  const isComplete = progressValue === progressMax && progressMax > 0;
  const isStarted = progressValue > 0;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card hover onClick={onClick} className="relative overflow-hidden">
        {/* Completion badge */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4"
          >
            <div className="flex items-center gap-1 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Complete
            </div>
          </motion.div>
        )}

        <div className="flex items-start gap-4">
          <motion.div 
            className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${
              isComplete 
                ? 'bg-gradient-to-br from-success-100 to-success-200' 
                : 'bg-gradient-to-br from-primary-100 to-primary-200'
            }`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {isComplete ? (
              <Trophy className="w-7 h-7 text-success-600" />
            ) : (
              <BookOpen className="w-7 h-7 text-primary-600" />
            )}
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-h3 text-neutral-900">{path.name}</h3>
              {isStarted && !isComplete && (
                <Sparkles className="w-4 h-4 text-primary-500" />
              )}
            </div>
            <p className="text-body text-neutral-700 mb-4">{path.description}</p>
            
            <div className="mb-3">
              <ProgressBar value={progressValue} max={progressMax} showLabel />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge icon={Trophy} label={`${path.totalXP} Total XP`} variant="primary" />
                <span className="text-small text-neutral-500">
                  {progressValue} of {progressMax} lessons
                </span>
              </div>
              <motion.div
                className="flex items-center gap-1 text-primary-600 font-medium"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm">{isStarted ? 'Continue' : 'Start'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-success-500/5 pointer-events-none opacity-0"
          whileHover={{ opacity: 1 }}
        />
      </Card>
    </motion.div>
  );
}
