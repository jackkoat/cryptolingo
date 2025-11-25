'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function FloatingXPBadge() {
  const { publicKey } = useWallet();
  const [stats, setStats] = useState({ level: 1, totalXp: 0 });

  useEffect(() => {
    if (!publicKey) return;

    const fetchStats = async () => {
      try {
        const response = await fetch(
          `/api/user/${publicKey.toString()}/progress`
        );
        if (response.ok) {
          const data = await response.json();
          setStats({
            level: data.data.user.level,
            totalXp: data.data.user.totalXp,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-2xl p-4 min-w-[120px]">
        <div className="text-center">
          <div className="text-xs font-medium opacity-90">Level</div>
          <div className="text-2xl font-bold">{stats.level}</div>
          <div className="mt-2 pt-2 border-t border-white/20">
            <div className="text-xs opacity-90">{stats.totalXp} XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
