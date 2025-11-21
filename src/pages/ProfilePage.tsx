import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, truncateAddress } from '../contexts/AuthContext';
import { supabase, Achievement, UserAchievement, UserProgress } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import { AchievementCard } from '../components/features/AchievementCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Wallet, Trophy, Target, Flame, Edit2, Check, X, Copy, ExternalLink } from 'lucide-react';

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
        .eq('user_id', user.walletAddress)
        .eq('is_completed', true);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-neutral-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-h1 text-neutral-900 mb-12">Your Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-success-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Wallet className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mb-2">
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
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-h2 text-neutral-900">{profile?.full_name || 'Crypto Learner'}</h2>
                      <button
                        onClick={() => {
                          setNewName(profile?.full_name || '');
                          setIsEditingName(true);
                        }}
                        className="text-neutral-500 hover:text-primary-600 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  {/* Wallet Address Display */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-success-50 rounded-md">
                      <Wallet className="w-4 h-4 text-success-600" />
                      <span className="text-small font-mono text-success-700">
                        {user?.walletAddress ? truncateAddress(user.walletAddress) : 'Not connected'}
                      </span>
                    </div>
                    <button
                      onClick={copyAddress}
                      className="p-2 text-neutral-500 hover:text-primary-600 transition-colors"
                      title="Copy full address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={openExplorer}
                      className="p-2 text-neutral-500 hover:text-primary-600 transition-colors"
                      title="View on Solscan"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    {copied && (
                      <span className="text-small text-success-600">Copied!</span>
                    )}
                  </div>
                  
                  <p className="text-small text-neutral-500">
                    Member since {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Dashboard */}
            <Card>
              <h3 className="text-h3 text-neutral-900 mb-6">Learning Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    <p className="text-small text-neutral-500">Level</p>
                  </div>
                  <p className="text-xp-medium text-neutral-900">{profile?.user_level || 1}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-success-600" />
                    <p className="text-small text-neutral-500">Total XP</p>
                  </div>
                  <p className="text-xp-medium text-neutral-900">{profile?.total_xp || 0}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-warning-500" />
                    <p className="text-small text-neutral-500">Current Streak</p>
                  </div>
                  <p className="text-xp-medium text-neutral-900">{profile?.current_streak || 0} days</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-neutral-600" />
                    <p className="text-small text-neutral-500">Badges</p>
                  </div>
                  <p className="text-xp-medium text-neutral-900">{userAchievements.length}</p>
                </div>
              </div>
            </Card>

            {/* Learning History */}
            <Card>
              <h3 className="text-h3 text-neutral-900 mb-6">Recent Activity</h3>
              {userProgress.length > 0 ? (
                <div className="space-y-3">
                  {userProgress.slice(0, 5).map((progress) => (
                    <div
                      key={progress.id}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-md"
                    >
                      <div>
                        <p className="text-body text-neutral-900">{progress.lesson_id}</p>
                        <p className="text-small text-neutral-500">
                          {new Date(progress.completed_at || '').toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-body font-semibold text-success-600">+{progress.xp_earned} XP</p>
                        <p className="text-small text-neutral-500">
                          {progress.accuracy_percentage?.toFixed(0)}% accuracy
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body text-neutral-500 text-center py-8">
                  No completed lessons yet. Start learning!
                </p>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Wallet Info Section */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-6 h-6 text-success-600" />
                <h3 className="text-h3 text-neutral-900">Connected Wallet</h3>
              </div>
              <div className="bg-success-50 rounded-md p-4">
                <p className="text-caption text-success-700 mb-2">Phantom Wallet</p>
                <p className="text-small font-mono text-neutral-900 break-all">
                  {user?.walletAddress}
                </p>
              </div>
              <p className="text-small text-neutral-500 mt-4">
                Your progress and achievements are tied to this wallet address.
              </p>
            </Card>

            {/* Achievement Gallery */}
            <div>
              <h3 className="text-h3 text-neutral-900 mb-6">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => {
                  const userAchievement = userAchievements.find(
                    (ua) => ua.achievement_id === achievement.id
                  );
                  return (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      isUnlocked={!!userAchievement}
                      unlockedAt={userAchievement?.unlocked_at}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
