import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserProgress } from '../lib/supabase';
import { LEARNING_PATHS } from '../data/lessons';
import { PathCard } from '../components/features/PathCard';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { Sparkles } from 'lucide-react';

export function PathsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.walletAddress);

      if (progressData) setUserProgress(progressData);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }

  const getPathProgress = (pathId: string) => {
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return { completed: 0, total: 0 };

    const completedLessons = userProgress.filter(
      p => p.path_id === pathId && p.is_completed
    ).length;

    return { completed: completedLessons, total: path.lessons.length };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-neutral-700">Loading learning paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12">
      <InteractiveBackground />
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">Learning Paths</h1>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-primary-500" />
            </motion.div>
          </div>
          <p className="text-xl text-neutral-700">Choose your path to crypto mastery</p>
        </motion.div>

        {/* Learning Paths Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {LEARNING_PATHS.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <PathCard
                path={path}
                progress={getPathProgress(path.id)}
                onClick={() => navigate(`/path/${path.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}