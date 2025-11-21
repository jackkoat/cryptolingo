import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { BookOpen, Trophy, ArrowRight, Sparkles, CheckCircle2, Rocket } from 'lucide-react';

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
  const progressPercentage = progressMax > 0 ? (progressValue / progressMax) * 100 : 0;

  const pathColors = {
    beginner: {
      gradient: 'from-success-100 to-success-200',
      iconGradient: 'from-success-400 to-success-600',
      textGradient: 'from-success-600 to-emerald-600',
      shadow: 'shadow-glow-pastel-green',
      bgGlow: 'from-success-50/50 to-success-100/50'
    },
    defi: {
      gradient: 'from-primary-100 to-primary-200',
      iconGradient: 'from-primary-400 to-primary-600',
      textGradient: 'from-primary-600 to-purple-600',
      shadow: 'shadow-glow-pastel-purple',
      bgGlow: 'from-primary-50/50 to-primary-100/50'
    }
  };

  const colorScheme = path.id === 'beginner-fundamentals' ? pathColors.beginner : pathColors.defi;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card 
        hover 
        onClick={onClick} 
        className={`relative overflow-hidden border-2 ${
          isComplete ? 'border-success-200' : 'border-primary-100'
        } ${isComplete ? 'shadow-glow-pastel-green' : ''}`}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.bgGlow} opacity-60`} />
        
        {/* Completion badge */}
        {isComplete && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-success-500 to-success-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-glow-green">
              <CheckCircle2 className="w-5 h-5" />
              Complete
            </div>
          </motion.div>
        )}

        <div className="relative z-10 flex items-start gap-5">
          <motion.div 
            className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${colorScheme.iconGradient} ${colorScheme.shadow}`}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {isComplete ? (
              <Trophy className="w-8 h-8 text-white" />
            ) : isStarted ? (
              <Rocket className="w-8 h-8 text-white" />
            ) : (
              <BookOpen className="w-8 h-8 text-white" />
            )}
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className={`text-2xl font-bold bg-gradient-to-br ${colorScheme.textGradient} bg-clip-text text-transparent`}>
                {path.name}
              </h3>
              {isStarted && !isComplete && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0" />
                </motion.div>
              )}
            </div>
            <p className="text-base text-neutral-700 mb-5 leading-relaxed">{path.description}</p>
            
            {/* Progress section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-neutral-600">
                  {progressValue} of {progressMax} lessons
                </span>
                <span className="text-sm font-bold text-primary-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <ProgressBar 
                value={progressValue} 
                max={progressMax} 
                variant={isComplete ? 'success' : 'primary'}
              />
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br ${colorScheme.gradient} rounded-xl`}>
                  <Trophy className="w-4 h-4 text-neutral-700" />
                  <span className="text-sm font-bold text-neutral-800">{path.totalXP} XP</span>
                </div>
              </div>
              <motion.div
                className="flex items-center gap-2 text-primary-600 font-semibold group"
                whileHover={{ x: 5 }}
              >
                <span className="text-base">{isComplete ? 'Review' : isStarted ? 'Continue' : 'Start'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorScheme.bgGlow} pointer-events-none opacity-0`}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}
