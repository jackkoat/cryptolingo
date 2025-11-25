'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { AchievementCard } from '@/components/features/AchievementCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { truncateAddress, getXpProgress } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function ProfilePage() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) {
      router.push('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `/api/user/${publicKey.toString()}/progress`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
          setAchievements(data.data.achievements);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [publicKey, router]);

  if (!publicKey) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const xpProgress = getXpProgress(userData.user.totalXp);
  const nextLevelXp = userData.user.level * 500;
  const currentLevelXp = (userData.user.level - 1) * 500;
  const xpInLevel = userData.user.totalXp - currentLevelXp;
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <Card className="p-8 mb-8" glass>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Profile
            </h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="font-mono text-sm">
                {truncateAddress(publicKey.toString(), 8)}
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(publicKey.toString())
                }
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="text-6xl">👤</div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon="📊"
          label="Level"
          value={userData.user.level}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          icon="⭐"
          label="Total XP"
          value={userData.user.totalXp}
          gradient="from-yellow-500 to-yellow-600"
        />
        <StatCard
          icon="🔥"
          label="Day Streak"
          value={userData.user.streakDays}
          gradient="from-orange-500 to-red-600"
        />
        <StatCard
          icon="✅"
          label="Completed"
          value={`${userData.completedLessons}/${userData.totalLessons}`}
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* Level Progress */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Level Progress
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Level {userData.user.level}</span>
            <span>
              {xpInLevel} / 500 XP
            </span>
          </div>
          <ProgressBar
            progress={xpProgress}
            height="lg"
            gradient="from-purple-500 to-purple-600"
          />
        </div>
      </Card>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Achievements</h2>
          <span className="text-gray-600">
            {unlockedAchievements.length} / {achievements.length} Unlocked
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
