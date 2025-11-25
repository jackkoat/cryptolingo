import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth, truncateAddress } from '../contexts/AuthContext';
import { supabase, Achievement, UserAchievement, UserProgress } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { AchievementCard } from '../components/features/AchievementCard';
import { FloatingXPBadge } from '../components/features/FloatingXPBadge';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Wallet, Trophy, Target, Flame, Edit2, Check, X, Copy, ExternalLink, Award, BookOpen, Calendar, TrendingUp, Lock, Crown, Sparkles as SparklesIcon, GraduationCap } from 'lucide-react';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LEARNING_PATHS } from '../data/lessons';

const iconMap = {
  Trophy,
  Award,
  Crown,
  Target,
  Flame,
  Wallet,
  Sparkles: SparklesIcon,
  GraduationCap,
};

export function ProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadProfileData();
  }, [user, navigate]);

  async function loadProfileData() {
    if (!user) return;

    try {
      // Load achievements
      const { data: achievementsData } = await supabase
        .from('achievements')
        .select('*');
      if (achievementsData) setAchievements(achievementsData);

      // Load user achievements
      const { data: userAchievementsData } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.walletAddress);
      if (userAchievementsData) setUserAchievements(userAchievementsData);

      // Load user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.walletAddress);
      if (progressData) setUserProgress(progressData);
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveNewName() {
    if (!newName.trim()) return;
    try {
      await updateProfile({ full_name: newName });
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }

  const copyAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openExplorer = () => {
    if (user?.walletAddress) {
      window.open(`https://solscan.io/account/${user.walletAddress}`, '_blank');
    }
  };

  const completedLessons = userProgress.filter(p => p.is_completed).length;
  const totalLessons = LEARNING_PATHS.reduce((sum, path) => sum + path.lessons.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-neutral-700">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 relative">
      <InteractiveBackground />
      {/* Floating XP Badge */}
      <FloatingXPBadge xp={profile?.total_xp || 0} level={profile?.user_level || 1} />

      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-neutral-900 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Profile
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="relative overflow-hidden border-2 border-primary-100">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-pastel/10 via-purple-100/20 to-success-pastel/10" />
                
                <div className="relative z-10 flex items-start gap-6">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-primary-500 via-purple-500 to-success-500 rounded-3xl flex items-center justify-center text-white flex-shrink-0 shadow-glow-purple"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Wallet className="w-12 h-12" />
                  </motion.div>
                  <div className="flex-1">
                    {isEditingName ? (
                      <div className="flex items-center gap-2 mb-3">
                        <Input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Enter your name"
                          className="flex-1"
                        />
                        <Button onClick={saveNewName} className="px-3">
                          <Check className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditingName(false)}
                          className="px-3"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-3xl font-bold text-neutral-900">{profile?.full_name || 'Crypto Learner'}</h2>
                        <button
                          onClick={() => {
                            setNewName(profile?.full_name || '');
                            setIsEditingName(true);
                          }}
                          className="text-neutral-400 hover:text-primary-600 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    
                    {/* Wallet Address Display */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <div className="flex items-center gap-2 px-4 py-2 bg-success-100/80 backdrop-blur-sm rounded-xl border border-success-200">
                        <Wallet className="w-4 h-4 text-success-600" />
                        <span className="text-sm font-mono text-success-700 font-semibold">
                          {user?.walletAddress ? truncateAddress(user.walletAddress) : 'Not connected'}
                        </span>
                      </div>
                      <motion.button
                        onClick={copyAddress}
                        className="p-2 text-neutral-500 hover:text-primary-600 transition-colors bg-white rounded-lg hover:bg-primary-50"
                        title="Copy full address"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={openExplorer}
                        className="p-2 text-neutral-500 hover:text-primary-600 transition-colors bg-white rounded-lg hover:bg-primary-50"
                        title="View on Solscan"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                      {copied && (
                        <motion.span 
                          className="text-sm text-success-600 font-semibold"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm">
                        Member since {new Date(profile?.created_at || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary-500" />
                Learning Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Level */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow-purple"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Target className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Level</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-primary-600 to-purple-600 bg-clip-text text-transparent">
                      {profile?.user_level || 1}
                    </p>
                  </div>
                </Card>

                {/* Total XP */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success-50 to-success-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-success-400 to-success-600 rounded-2xl flex items-center justify-center shadow-glow-green"
                      whileHover={{ scale: 1.1, rotate: -10 }}
                    >
                      <Trophy className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Total XP</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-success-600 to-emerald-600 bg-clip-text text-transparent">
                      {profile?.total_xp || 0}
                    </p>
                  </div>
                </Card>

                {/* Current Streak */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-glow-orange"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Flame className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Streak</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      {profile?.current_streak || 0}
                    </p>
                  </div>
                </Card>

                {/* Lessons Completed */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-info-50 to-info-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-info-400 to-info-600 rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <BookOpen className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Lessons</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-info-600 to-blue-600 bg-clip-text text-transparent">
                      {completedLessons}
                    </p>
                  </div>
                </Card>

                {/* Badges Earned */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow-purple"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Award className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Badges</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {userAchievements.length}
                    </p>
                  </div>
                </Card>

                {/* Longest Streak */}
                <Card className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-warning-50 to-warning-100/20" />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-warning-400 to-warning-600 rounded-2xl flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Flame className="w-7 h-7 text-white" />
                    </motion.div>
                    <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-2">Longest</p>
                    <p className="text-4xl font-bold bg-gradient-to-br from-warning-600 to-orange-600 bg-clip-text text-transparent">
                      {profile?.longest_streak || 0}
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Learning Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-500" />
                Learning Progress
              </h3>
              <Card>
                <div className="space-y-6">
                  {LEARNING_PATHS.map((path, index) => {
                    const pathProgress = userProgress.filter(p => p.path_id === path.id && p.is_completed).length;
                    const totalInPath = path.lessons.length;
                    return (
                      <motion.div 
                        key={path.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            pathProgress === totalInPath 
                              ? 'bg-gradient-to-br from-success-400 to-success-600 shadow-glow-green' 
                              : 'bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-purple'
                          }`}>
                            {pathProgress === totalInPath ? (
                              <Trophy className="w-6 h-6 text-white" />
                            ) : (
                              <BookOpen className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-neutral-900">{path.name}</h4>
                              <span className="text-sm font-semibold text-neutral-600">
                                {pathProgress} / {totalInPath}
                              </span>
                            </div>
                            <ProgressBar 
                              value={pathProgress} 
                              max={totalInPath} 
                              variant={pathProgress === totalInPath ? 'success' : 'primary'}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Achievements Gallery */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {achievements.map((achievement, index) => {
                  const userAchievement = userAchievements.find(
                    (ua) => ua.achievement_id === achievement.id
                  );
                  const isUnlocked = !!userAchievement;
                  const Icon = iconMap[achievement.icon_name as keyof typeof iconMap] || Trophy;
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Card className={`relative overflow-hidden transition-all duration-300 ${
                        isUnlocked 
                          ? 'border-2 border-success-200 shadow-glow-pastel-green hover:shadow-glow-green' 
                          : 'border-2 border-neutral-200 opacity-60 grayscale'
                      }`}>
                        {!isUnlocked && (
                          <div className="absolute top-3 right-3 z-10">
                            <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
                              <Lock className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            isUnlocked ? 'bg-gradient-to-br from-primary-100 to-success-100' : 'bg-neutral-100'
                          }`}>
                            {isUnlocked ? (
                              <Icon className="w-8 h-8 text-primary-600" />
                            ) : (
                              <Lock className="w-8 h-8 text-neutral-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-neutral-900 mb-1">{achievement.name}</h4>
                            <p className="text-sm text-neutral-600">{achievement.description}</p>
                            {isUnlocked && userAchievement && (
                              <p className="text-xs text-success-600 font-medium mt-2">
                                Unlocked {new Date(userAchievement.unlocked_at).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
