import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BookOpen, Trophy, Wallet, Zap } from 'lucide-react';

export function LandingPage() {
  const { user, connectWallet, isPhantomInstalled, loading } = useAuth();
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Gamified Learning',
      description: 'Earn XP, maintain streaks, and unlock achievements as you master crypto concepts',
      color: 'primary',
    },
    {
      icon: Wallet,
      title: 'Wallet-First Experience',
      description: 'Connect your Phantom wallet and start learning immediately - no signup required',
      color: 'success',
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Track your learning journey with detailed stats and achievement badges',
      color: 'primary',
    },
  ];

  const paths = [
    {
      name: 'Beginner Fundamentals',
      description: 'Master blockchain basics, cryptocurrency, and wallet security',
      lessons: 4,
    },
    {
      name: 'DeFi Essentials',
      description: 'Learn about decentralized finance, trading, and staking',
      lessons: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-neutral-50 py-32 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-hero md:text-h1 text-neutral-900 mb-6">
              Learn Crypto Like Duolingo
            </h1>
            <p className="text-large text-neutral-700 mb-8 max-w-2xl mx-auto">
              Master blockchain and cryptocurrency through interactive lessons. Connect your Phantom wallet and start learning immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="large" className="min-w-48">Continue Learning</Button>
                </Link>
              ) : (
                <>
                  <Button 
                    size="large" 
                    variant="success"
                    className="min-w-48"
                    onClick={handleConnectWallet}
                    loading={loading}
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </Button>
                  {!isPhantomInstalled && (
                    <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
                      <Button size="large" variant="secondary" className="min-w-48">
                        Get Phantom Wallet
                      </Button>
                    </a>
                  )}
                </>
              )}
            </div>
            {!user && !isPhantomInstalled && (
              <p className="text-small text-neutral-500 mt-4">
                Phantom wallet required. Install it to get started.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-neutral-900 mb-4">Why CryptoLingo?</h2>
            <p className="text-large text-neutral-700">Learn crypto the fun and Web3-native way</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    feature.color === 'success' ? 'bg-success-100' : 'bg-primary-100'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      feature.color === 'success' ? 'text-success-600' : 'text-primary-600'
                    }`} />
                  </div>
                  <h3 className="text-h3 text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-body text-neutral-700">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Preview */}
      <section className="py-24 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-neutral-900 mb-4">Learning Paths</h2>
            <p className="text-large text-neutral-700">Choose your journey into the crypto world</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paths.map((path, index) => (
              <Card key={index} hover>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-h3 text-neutral-900 mb-2">{path.name}</h3>
                    <p className="text-body text-neutral-700 mb-3">{path.description}</p>
                    <p className="text-small text-neutral-500">{path.lessons} lessons</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-neutral-900 mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-500 text-white rounded-full flex items-center justify-center text-h2 font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Connect Wallet</h3>
              <p className="text-body text-neutral-700">Link your Phantom wallet in one click</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-h2 font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Choose a Path</h3>
              <p className="text-body text-neutral-700">Select from beginner or DeFi paths</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-h2 font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-h3 text-neutral-900 mb-2">Earn Badges</h3>
              <p className="text-body text-neutral-700">Complete lessons and unlock achievements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-16 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-h1 text-white mb-4">Start Your Crypto Journey</h2>
          <p className="text-large text-primary-50 mb-8">No email required. Just connect your wallet and learn.</p>
          {!user && (
            <Button 
              size="large" 
              variant="secondary" 
              className="bg-white text-success-600 hover:bg-neutral-50"
              onClick={handleConnectWallet}
              loading={loading}
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet to Start
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
