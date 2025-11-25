'use client';

import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { truncateAddress } from '@/lib/utils';

export function Navbar() {
  const { publicKey } = useWallet();

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">CL</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              CryptoLingo
            </span>
          </Link>

          {/* Navigation Links */}
          {publicKey && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/learning-paths"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Learning Paths
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Profile
              </Link>
            </div>
          )}

          {/* Wallet Button */}
          <div className="flex items-center space-x-4">
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-purple-600 hover:!from-purple-600 hover:!to-purple-700 !rounded-xl !h-10 !px-6 !text-sm !font-medium transition-all !shadow-lg hover:!shadow-xl" />
          </div>
        </div>
      </div>
    </nav>
  );
}
