import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth, truncateAddress } from '../contexts/AuthContext';
import { supabase, UserProgress, Achievement, UserAchievement } from '../lib/supabase';
import { LEARNING_PATHS } from '../data/lessons';
import { Card } from '../components/ui/Card';
import { PathCard } from '../components/features/PathCard';
import { AchievementCard } from '../components/features/AchievementCard';
import { Trophy, Flame, Target, Wallet, Sparkles, Star, Zap, ArrowRight } from 'lucide-react';

// Motivational greetings based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Motivational messages
const MOTIVATIONAL_MESSAGES = [
  'Ready to learn something new today?',
  'Every lesson brings you closer to crypto mastery!',
  'Great things take time. Keep going!',
  'You\'re doing amazing! Keep it up!',
  'Knowledge is power. Let\'s level up!',
  'Another day, another opportunity to grow!',
];

export function DashboardPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [motivationalMessage] = useState(
    MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
  );

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  async function loadDashboardData() {
    if (!user) return;

    try {
      // Load user progress using wallet address
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.walletAddress);
      
      if (progressData) setUserProgress(progressData);

      // Load achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*');
      
      if (achievementsData) setAchievements(achievementsData);

      // Load user achievements using wallet address
      const { data: userAchievementsData } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.walletAddress);
      
      if (userAchievementsData) setUserAchievements(userAchievementsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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

  const recentAchievements = achievements
    .filter(achievement => 
      userAchievements.some(ua => ua.achievement_id === achievement.id)
    )
    .slice(0, 3);

  const totalLessonsCompleted = userProgress.filter(p => p.is_completed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-neutral-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-neutral-700">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-neutral-50 py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-h1 text-neutral-900">
              {getGreeting()}, {profile?.full_name || 'Crypto Learner'}!
            </h1>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 text-primary-500" />
            </motion.div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-large text-neutral-700">
            <span>{motivationalMessage}</span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <div className="flex items-center gap-1 text-success-600">
              <Wallet className="w-4 h-4" />
              <span className="font-mono text-small">{user ? truncateAddress(user.walletAddress) : ''}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Header */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Target className="w-6 h-6 text-primary-600" />
                </motion.div>
                <div>
                  <p className="text-caption text-neutral-500">Level</p>
                  <motion.p 
                    className="text-3xl font-bold text-neutral-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    {profile?.user_level || 1}
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Trophy className="w-6 h-6 text-success-600" />
                </motion.div>
                <div>
                  <p className="text-caption text-neutral-500">Total XP</p>
                  <motion.p 
                    className="text-3xl font-bold text-neutral-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  >
                    {profile?.total_xp || 0}
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: profile?.current_streak && profile.current_streak > 0 ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Flame className="w-6 h-6 text-orange-500" />
                </motion.div>
                <div>
                  <p className="text-caption text-neutral-500">Streak</p>
                  <motion.p 
                    className="text-3xl font-bold text-neutral-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                  >
                    {profile?.current_streak || 0}
                    <span className="text-sm font-normal text-neutral-500 ml-1">days</span>
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <p className="text-caption text-neutral-500">Badges</p>
                  <motion.p 
                    className="text-3xl font-bold text-neutral-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                  >
                    {userAchievements.length}
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Encouraging message for new users */}
        {totalLessonsCompleted === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary-50 to-success-50 border-2 border-primary-200">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-h3 text-neutral-900 mb-1">Start Your Journey!</h3>
                  <p className="text-body text-neutral-700">
                    Complete your first lesson to earn XP and unlock achievements. Let's go!
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary-600" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Learning Paths */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-h2 text-neutral-900">Learning Paths</h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
            </motion.div>
          </div>
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
        </motion.section>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-h2 text-neutral-900">Recent Achievements</h2>
                <Trophy className="w-5 h-5 text-primary-500" />
              </div>
              <motion.button
                onClick={() => navigate('/profile')}
                className="text-body text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                whileHover={{ x: 5 }}
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentAchievements.map((achievement, index) => {
                const userAchievement = userAchievements.find(
                  ua => ua.achievement_id === achievement.id
                );
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AchievementCard
                      achievement={achievement}
                      isUnlocked
                      unlockedAt={userAchievement?.unlocked_at}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
