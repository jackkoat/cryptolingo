import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trophy, CheckCircle2, Star, Zap } from 'lucide-react';

interface LessonCompleteProps {
  lessonTitle: string;
  pathId: string;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
}

const CELEBRATION_MESSAGES = [
  'Incredible work!',
  'You crushed it!',
  'Amazing job!',
  'You\'re on fire!',
  'Phenomenal!',
  'Outstanding!',
  'You\'re a star!',
  'Brilliant performance!',
];

export function LessonComplete({
  lessonTitle,
  pathId,
  correctAnswers,
  totalQuestions,
  xpEarned,
}: LessonCompleteProps) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(0);
  const celebrationMessage = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-neutral-50 flex items-center justify-center py-12 px-4">
      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <Card className="max-w-2xl w-full text-center relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success-500 via-primary-500 to-success-500" />
          
          {/* Trophy Animation */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.2 }}
          >
            <div className="w-28 h-28 bg-gradient-to-br from-primary-100 to-success-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Trophy className="w-16 h-16 text-primary-600" />
              </motion.div>
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Star className="w-6 h-6 text-primary-500 fill-primary-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <Zap className="w-6 h-6 text-success-500 fill-success-500" />
              </motion.div>
            </div>

            <motion.h1
              className="text-h1 text-neutral-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {celebrationMessage}
            </motion.h1>
            <motion.p
              className="text-large text-neutral-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              You completed {lessonTitle}
            </motion.p>
          </motion.div>

          {/* XP Earned */}
          <motion.div
            className="bg-gradient-to-br from-primary-50 to-success-50 rounded-2xl p-8 mb-8 border-2 border-primary-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <motion.p
              className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-success-600 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}
            >
              +{xpEarned} XP
            </motion.p>
            <p className="text-body text-neutral-700">Experience earned</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
              <p className="text-small text-neutral-500 mb-2">Questions Correct</p>
              <motion.p
                className="text-4xl font-bold text-neutral-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                {correctAnswers}/{totalQuestions}
              </motion.p>
            </div>
            <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6 border border-success-200">
              <p className="text-small text-success-700 mb-2">Accuracy</p>
              <motion.p
                className="text-4xl font-bold text-success-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
              >
                {accuracy}%
              </motion.p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              onClick={() => navigate(`/path/${pathId}`)}
              className="flex-1 gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Continue Learning
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
