'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LearningPathCard } from '@/components/ui/LearningPathCard';
import { Card } from '@/components/ui/Card';
import { LearningPath } from '@/lib/types';

export default function LearningPathsPage() {
  const { publicKey } = useWallet();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const url = publicKey
          ? `/api/learning-paths?wallet=${publicKey.toString()}`
          : '/api/learning-paths';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPaths(data.data);
        }
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, [publicKey]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Learning Paths
        </h1>
        <p className="text-xl text-gray-600">
          Choose your path and start mastering crypto concepts
        </p>
      </div>

      {!publicKey && (
        <Card className="p-6 mb-8 bg-yellow-50 border-2 border-yellow-200">
          <p className="text-yellow-800">
            Connect your wallet to track your progress and earn XP!
          </p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {paths.map((path) => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>
    </div>
  );
}
