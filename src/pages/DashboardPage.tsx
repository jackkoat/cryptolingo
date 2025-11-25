import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth, truncateAddress } from '../contexts/AuthContext';
import { supabase, UserProgress, Achievement, UserAchievement } from '../lib/supabase';
import { LEARNING_PATHS } from '../data/lessons';
import { Card } from '../components/ui/Card';
import { PathCard } from '../components/features/PathCard';
import { AchievementCard } from '../components/features/AchievementCard';
import { FloatingXPBadge } from '../components/features/FloatingXPBadge';
import { WelcomeTutorial } from '../components/features/WelcomeTutorial';
import { MiniQuestWidget } from '../components/features/MiniQuestWidget';
import { Trophy, Flame, Target, Wallet, Sparkles, Star, Zap, ArrowRight, BookOpen, Award } from 'lucide-react';
import '../styles/onboarding-animations.css';

// Motivational greetings based on time of day
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Motivational messages based on progress
const getMotivationalMessage = (streak: number, totalXP: number) => {
  if (streak >= 7) return 'Amazing streak! You\'re on fire!';
  if (streak >= 3) return 'Keep that streak going strong!';
  if (totalXP >= 500) return 'You\'re becoming a crypto expert!';
  if (totalXP >= 100) return 'Great progress on your learning journey!';
  return 'Ready to learn something new today?';
};

export function DashboardPage() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  useEffect(() => {
    // Show tutorial for new users - only once per browser session
    if (profile && !profile.has_seen_tutorial && !loading && !localStorage.getItem('tutorialShown')) {
      setShowTutorial(true);
    }
  }, [profile, loading]);

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

  const handleTutorialComplete = async () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialShown', 'true');
    if (user && profile) {
      try {
        await updateProfile({
          has_seen_tutorial: true,
          tutorial_completed_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error updating tutorial status:', error);
      }
    }
  };

  const handleTutorialSkip = async () => {
    setShowTutorial(false);
    localStorage.setItem('tutorialShown', 'true');
    if (user && profile) {
      try {
        await updateProfile({
          has_seen_tutorial: true,
        });
      } catch (error) {
        console.error('Error updating tutorial status:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center">
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

  const motivationalMessage = getMotivationalMessage(profile?.current_streak || 0, profile?.total_xp || 0);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 py-12 relative">
      {/* Floating XP Badge */}
      <FloatingXPBadge xp={profile?.total_xp || 0} level={profile?.user_level || 1} />

      <div className="container mx-auto px-4">
        {/* Hero Welcome Card */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <Card className="relative overflow-hidden border-2 border-primary-100">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-pastel/20 via-purple-100/30 to-success-pastel/20 opacity-60" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-success-300/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
                    {getGreeting()}, {profile?.full_name || 'Learner'}!
                  </h1>
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-8 h-8 text-primary-500" />
                  </motion.div>
                </div>
                <p className="text-xl text-neutral-700 mb-4">{motivationalMessage}</p>
                <div className="flex items-center gap-2 text-success-600">
                  <Wallet className="w-5 h-5" />
                  <span className="font-mono text-sm">{user ? truncateAddress(user.walletAddress) : ''}</span>
                </div>
              </div>
              
              {/* Mascot Area - Can add an illustration here */}
              <motion.div
                className="hidden md:flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary-200 to-success-200 rounded-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <BookOpen className="w-16 h-16 text-primary-600" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Level Stat */}
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/50" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow-purple"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Target className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Level</p>
                    <motion.p 
                      className="text-4xl font-bold bg-gradient-to-br from-primary-600 to-purple-600 bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    >
                      {profile?.user_level || 1}
                    </motion.p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* XP Stat */}
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-success-50 to-success-100/50" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-success-400 to-success-600 rounded-2xl flex items-center justify-center shadow-glow-green"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Trophy className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Total XP</p>
                    <motion.p 
                      className="text-4xl font-bold bg-gradient-to-br from-success-600 to-emerald-600 bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                    >
                      {profile?.total_xp || 0}
                    </motion.p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Streak Stat */}
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/50" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-glow-orange"
                    animate={{ 
                      scale: profile?.current_streak && profile.current_streak > 0 ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Flame className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Streak</p>
                    <motion.p 
                      className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
                    >
                      {profile?.current_streak || 0}
                      <span className="text-sm font-normal text-neutral-500 ml-1">days</span>
                    </motion.p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Badges Stat */}
          <motion.div variants={itemVariants}>
            <Card className="card-hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/50" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-3">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow-purple"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Award className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">Badges</p>
                    <motion.p 
                      className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                    >
                      {userAchievements.length}
                    </motion.p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* MiniQuest Widget for New Users */}
        {totalLessonsCompleted === 0 && (
          <MiniQuestWidget />
        )}

        {/* Learning Paths */}
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">Learning Paths</h2>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary-500" />
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-neutral-900">Recent Achievements</h2>
                <Trophy className="w-6 h-6 text-primary-500" />
              </div>
              <motion.button
                onClick={() => navigate('/profile')}
                className="text-lg text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 group"
                whileHover={{ x: 5 }}
              >
                View All
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

      {/* Welcome Tutorial for New Users */}
      {showTutorial && (
        <WelcomeTutorial
          onComplete={handleTutorialComplete}
          onSkip={handleTutorialSkip}
        />
      )}
    </div>
  );
}
