'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { LearningPathCard } from '@/components/ui/LearningPathCard';
import { LearningPath } from '@/lib/types';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [stats, setStats] = useState({
    level: 1,
    totalXp: 0,
    streakDays: 0,
    completedLessons: 0,
  });
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user stats
        const statsResponse = await fetch(
          `/api/user/${publicKey.toString()}/progress`
        );
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats({
            level: statsData.data.user.level,
            totalXp: statsData.data.user.totalXp,
            streakDays: statsData.data.user.streakDays,
            completedLessons: statsData.data.completedLessons,
          });
        }

        // Fetch learning paths
        const pathsResponse = await fetch(
          `/api/learning-paths?wallet=${publicKey.toString()}`
        );
        if (pathsResponse.ok) {
          const pathsData = await pathsResponse.json();
          setPaths(pathsData.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <Card className="p-8 mb-8" glass>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back!
            </h1>
            <p className="text-lg text-gray-600">
              Continue your crypto learning journey
            </p>
          </div>
          <div className="hidden md:block text-6xl">👋</div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon="📊"
          label="Level"
          value={stats.level}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          icon="⭐"
          label="Total XP"
          value={stats.totalXp}
          gradient="from-yellow-500 to-yellow-600"
        />
        <StatCard
          icon="🔥"
          label="Day Streak"
          value={stats.streakDays}
          gradient="from-orange-500 to-red-600"
        />
        <StatCard
          icon="✅"
          label="Lessons Done"
          value={stats.completedLessons}
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* Learning Paths */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Your Learning Paths
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
}
