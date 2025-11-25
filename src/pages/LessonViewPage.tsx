import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { LESSONS, Question } from '../data/lessons';
import { QuestionCard } from '../components/features/QuestionCard';
import { LessonComplete } from '../components/features/LessonComplete';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ArrowRight, X, Heart, Zap } from 'lucide-react';

export function LessonViewPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question: Question; isCorrect: boolean; userAnswer: string | number | boolean }[]>([]);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [startTime] = useState(Date.now());
  const [xpEarned, setXpEarned] = useState(0);
  const [questionKey, setQuestionKey] = useState(0); // For re-rendering QuestionCard
  const [showStreakBonus, setShowStreakBonus] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (!lesson) {
      navigate('/dashboard');
    }
  }, [user, lesson, navigate]);

  if (!lesson) return null;

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.questions.length - 1;
  const progress = ((currentQuestionIndex) / lesson.questions.length) * 100;

  const handleAnswer = (isCorrect: boolean, userAnswer: string | number | boolean) => {
    setAnswers([...answers, { question: currentQuestion, isCorrect, userAnswer }]);
    
    // Show streak bonus for consecutive correct answers
    const currentCorrectStreak = [...answers.filter(a => a.isCorrect)].length;
    if (isCorrect && currentCorrectStreak >= 2) {
      setShowStreakBonus(true);
      setTimeout(() => setShowStreakBonus(false), 1500);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      completeLesson();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionKey(questionKey + 1); // Force re-render with new key
    }
  };

  const completeLesson = async () => {
    const correctAnswers = answers.filter(a => a.isCorrect).length + 1; // +1 for current
    const totalQuestions = lesson.questions.length;
    const accuracy = (correctAnswers / totalQuestions) * 100;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const earnedXP = Math.floor(lesson.xpReward * (accuracy / 100));
    setXpEarned(earnedXP);

    try {
      if (user) {
        // Save progress using wallet address as user_id (skip in demo mode)
        if (isSupabaseConfigured) {
          await supabase
            .from('user_progress')
            .upsert({
              user_id: user.walletAddress,
              path_id: lesson.pathId,
              lesson_id: lesson.id,
              is_completed: true,
              score: correctAnswers,
              xp_earned: earnedXP,
              accuracy_percentage: accuracy,
              time_taken_seconds: timeTaken,
              completed_at: new Date().toISOString(),
            });
        }

        // Update user profile
        const newTotalXP = (profile?.total_xp || 0) + earnedXP;
        const newLevel = Math.floor(newTotalXP / 100) + 1;
        
        await updateProfile({
          total_xp: newTotalXP,
          user_level: newLevel,
          last_activity_date: new Date().toISOString().split('T')[0],
        });

        // Check and award achievements (skip in demo mode)
        if (isSupabaseConfigured) {
          await checkAndAwardAchievements(correctAnswers, totalQuestions, newTotalXP);
        }

        await refreshProfile();
      }

      setIsLessonComplete(true);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  const checkAndAwardAchievements = async (correct: number, total: number, totalXP: number) => {
    if (!user) return;

    const achievementsToAward: string[] = [];

    // Get all achievements
    const { data: allAchievements } = await supabase
      .from('achievements')
      .select('*');

    // Get user's current achievements using wallet address
    const { data: userAchievements } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', user.walletAddress);

    const unlockedIds = userAchievements?.map(ua => ua.achievement_id) || [];

    // Check conditions
    const { data: userProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.walletAddress)
      .eq('is_completed', true);

    const completedLessons = (userProgress?.length || 0) + 1;

    allAchievements?.forEach(achievement => {
      if (unlockedIds.includes(achievement.id)) return;

      let shouldAward = false;

      if (achievement.slug === 'first-lesson' && completedLessons >= 1) shouldAward = true;
      if (achievement.slug === 'five-lessons' && completedLessons >= 5) shouldAward = true;
      if (achievement.slug === 'perfect-score' && correct === total) shouldAward = true;
      if (achievement.slug === 'xp-1000' && totalXP >= 1000) shouldAward = true;

      if (shouldAward) {
        achievementsToAward.push(achievement.id);
      }
    });

    // Award achievements using wallet address as user_id
    for (const achievementId of achievementsToAward) {
      await supabase
        .from('user_achievements')
        .insert({
          user_id: user.walletAddress,
          achievement_id: achievementId,
        });
    }
  };

  if (isLessonComplete) {
    const correctAnswers = answers.filter(a => a.isCorrect).length + 1;

    return (
      <LessonComplete
        lessonTitle={lesson.title}
        pathId={lesson.pathId}
        correctAnswers={correctAnswers}
        totalQuestions={lesson.questions.length}
        xpEarned={xpEarned}
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <InteractiveBackground />
      {/* Progress Header */}
      <motion.div 
        className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-20 border-b border-neutral-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Top row with close button and stats */}
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/path/${lesson.pathId}`)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-4">
              {/* Hearts (lives) indicator */}
              <div className="flex items-center gap-1 text-error-500">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold text-sm">5</span>
              </div>

              {/* XP indicator */}
              <motion.div 
                className="flex items-center gap-1 text-primary-600"
                animate={showStreakBonus ? { scale: [1, 1.2, 1] } : {}}
              >
                <Zap className="w-5 h-5" />
                <span className="font-semibold text-sm">{lesson.xpReward} XP</span>
              </motion.div>
            </div>
          </div>

          {/* Progress bar row */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500 font-medium min-w-[80px]">
              {currentQuestionIndex + 1} / {lesson.questions.length}
            </span>
            <div className="flex-1">
              <motion.div
                className="h-3 bg-neutral-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Streak Bonus Notification */}
      <AnimatePresence>
        {showStreakBonus && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="bg-gradient-to-r from-primary-500 to-success-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold">Streak Bonus!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Area */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={questionKey}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Question Button */}
        <motion.div 
          className="max-w-2xl mx-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleNextQuestion}
            className="w-full gap-2"
            disabled={answers.length <= currentQuestionIndex}
          >
            {isLastQuestion ? (
              <>
                Complete Lesson
                <Zap className="w-5 h-5" />
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
