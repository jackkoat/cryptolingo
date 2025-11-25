'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/Card';
import { LessonCard } from '@/components/ui/LessonCard';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface LearningPathDetails {
  id: string;
  title: string;
  description: string;
  totalXp: number;
  totalLessons: number;
  lessons: Array<{
    id: string;
    title: string;
    order: number;
    xpReward: number;
    completed?: boolean;
    locked?: boolean;
  }>;
}

export default function LearningPathDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const [path, setPath] = useState<LearningPathDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const url = publicKey
          ? `/api/learning-paths/${params.id}?wallet=${publicKey.toString()}`
          : `/api/learning-paths/${params.id}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPath(data.data);
        } else {
          router.push('/learning-paths');
        }
      } catch (error) {
        console.error('Error fetching learning path:', error);
        router.push('/learning-paths');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPath();
    }
  }, [params.id, publicKey, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!path) {
    return null;
  }

  const completedLessons = path.lessons.filter(
    (l) => l.completed
  ).length;
  const progress = (completedLessons / path.totalLessons) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Path Header */}
      <Card className="p-8 mb-8" glass>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {path.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{path.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-6 text-sm">
            <span className="text-gray-600">
              {completedLessons} / {path.totalLessons} Lessons
            </span>
            <span className="font-semibold text-purple-600">
              {path.totalXp} Total XP
            </span>
          </div>
        </div>

        {publicKey && <ProgressBar progress={progress} showLabel />}
      </Card>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons</h2>
        <div className="space-y-4">
          {path.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>

      {!publicKey && (
        <Card className="p-6 mt-8 bg-yellow-50 border-2 border-yellow-200">
          <p className="text-yellow-800">
            Connect your wallet to start lessons and earn XP!
          </p>
        </Card>
      )}
    </div>
  );
}
