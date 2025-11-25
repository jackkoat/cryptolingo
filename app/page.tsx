import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
            Learn Crypto the Fun Way
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Master blockchain and cryptocurrency concepts through interactive,
            gamified lessons
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="success">
                Get Started Free
              </Button>
            </Link>
            <Link href="/learning-paths">
              <Button size="lg" variant="outline">
                Explore Paths
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center" hover>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🎮
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Gamified Learning
            </h3>
            <p className="text-gray-600">
              Earn XP, level up, and unlock achievements as you master crypto
              concepts
            </p>
          </Card>

          <Card className="p-8 text-center" hover>
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🔐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Wallet-First Experience
            </h3>
            <p className="text-gray-600">
              Connect your Phantom, Solflare, or Backpack wallet to get started
              instantly
            </p>
          </Card>

          <Card className="p-8 text-center" hover>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              📚
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Comprehensive Content
            </h3>
            <p className="text-gray-600">
              8 lessons covering blockchain basics, DeFi, wallets, and more
            </p>
          </Card>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Learning Paths
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8" hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Beginner Fundamentals
                </h3>
                <p className="text-gray-600">
                  Master the core concepts of blockchain and cryptocurrency
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                🎯
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">4 Lessons</span>
              <span className="font-semibold text-purple-600">650 XP</span>
            </div>
          </Card>

          <Card className="p-8" hover>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  DeFi Essentials
                </h3>
                <p className="text-gray-600">
                  Learn about decentralized finance and its powerful
                  applications
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl">
                ⚡
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">4 Lessons</span>
              <span className="font-semibold text-green-600">725 XP</span>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 text-center" glass>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect your wallet and begin your crypto education journey today
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="primary">
              Start Learning Now
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
