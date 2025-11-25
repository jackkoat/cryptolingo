import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BookOpen, Trophy, Wallet, Zap, ArrowRight, CheckCircle } from 'lucide-react';

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
      gradient: 'from-primary-500/20 to-primary-500/5',
      iconColor: 'text-primary-600'
    },
    {
      icon: Wallet,
      title: 'Wallet-First Experience',
      description: 'Connect your Phantom wallet and start learning immediately - no signup required',
      color: 'success',
      gradient: 'from-success-500/20 to-success-500/5',
      iconColor: 'text-success-600'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Track your learning journey with detailed stats and achievement badges',
      color: 'orange',
      gradient: 'from-orange-500/20 to-orange-500/5',
      iconColor: 'text-orange-600'
    },
  ];

  const paths = [
    {
      name: 'Beginner Fundamentals',
      description: 'Master blockchain basics, cryptocurrency, and wallet security',
      lessons: 4,
      color: 'primary'
    },
    {
      name: 'DeFi Essentials',
      description: 'Learn about decentralized finance, trading, and staking',
      lessons: 4,
      color: 'purple'
    },
  ];

  return (
    // 1. Main container is transparent to let the InteractiveBackground show through
    <div className="min-h-screen bg-transparent overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-24 px-4">
        {/* Subtle overlay to ensure text readability against moving particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white/80 pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-primary-200 mb-8 animate-float shadow-sm">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500"></span>
            </span>
            <span className="text-sm font-semibold text-primary-700">Web3 Education Reimagined</span>
          </div>

          <h1 className="text-hero md:text-[5rem] leading-tight font-black text-neutral-900 mb-6 tracking-tight">
            Learn Crypto Like <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              Duolingo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Master blockchain and cryptocurrency through interactive lessons. 
            Connect your wallet and start your streak today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link to="/dashboard">
                <Button size="large" className="min-w-[200px] shadow-glow-purple text-lg h-14">
                  Continue Learning
                </Button>
              </Link>
            ) : (
              <>
                <Button 
                  size="large" 
                  variant="success"
                  className="min-w-[200px] shadow-glow-green text-lg h-14 group"
                  onClick={handleConnectWallet}
                  loading={loading}
                >
                  <Wallet className="w-5 h-5 mr-2 group-hover:-rotate-12 transition-transform" />
                  Connect Wallet
                </Button>
                {!isPhantomInstalled && (
                  <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="large" 
                      variant="secondary" 
                      className="min-w-[200px] bg-white/80 backdrop-blur-md border-2 border-neutral-200 hover:bg-white text-lg h-14"
                    >
                      Get Phantom
                    </Button>
                  </a>
                )}
              </>
            )}
          </div>
          
          {!user && !isPhantomInstalled && (
            <p className="text-sm text-neutral-500 mt-6 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              No signup required. Just connect and learn.
            </p>
          )}
        </div>
      </section>

      {/* --- Features Section (Glass Cards) --- */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">Why CryptoLingo?</h2>
            <p className="text-large text-neutral-600">Learn crypto the fun and Web3-native way</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Blob behind icon */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100`} />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-h3 font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-body text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Learning Paths (Frosted Panels) --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-h2 font-bold text-neutral-900 mb-2">Learning Paths</h2>
              <p className="text-large text-neutral-600">Choose your journey into the crypto world</p>
            </div>
            {/* Decorative decorative line */}
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-neutral-200 to-transparent mx-8 mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {paths.map((path, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 p-1 transition-all hover:bg-white/90 hover:shadow-lg group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500" />
                <div className="p-8 flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0 border border-primary-100 group-hover:bg-primary-100 transition-colors">
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider">
                        Path {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {path.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 leading-relaxed">{path.description}</p>
                    <div className="flex items-center text-sm font-medium text-neutral-500">
                      <div className="flex -space-x-2 mr-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white" />
                        ))}
                      </div>
                      {path.lessons} Lessons
                    </div>
                  </div>
                  <div className="ml-auto self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowRight className="text-primary-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- How It Works (Step Cards) --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decorative strip */}
        <div className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary-50/50 to-transparent -z-10 skew-y-3" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { step: 1, title: 'Connect Wallet', desc: 'Link your Phantom wallet in one click', icon: Wallet, color: 'bg-success-500', shadow: 'shadow-glow-green' },
              { step: 2, title: 'Choose a Path', desc: 'Select from beginner or DeFi paths', icon: BookOpen, color: 'bg-primary-500', shadow: 'shadow-glow-purple' },
              { step: 3, title: 'Earn Badges', desc: 'Complete lessons and unlock achievements', icon: Trophy, color: 'bg-orange-500', shadow: 'shadow-glow-orange' },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector Line */}
                {i !== 2 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-neutral-100 -z-10">
                    <div className="h-full bg-neutral-200 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                )}
                
                <div className={`w-24 h-24 ${item.color} ${item.shadow} rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-8 text-white relative z-10`}>
                  <item.icon className="w-10 h-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-900 font-bold shadow-sm border border-neutral-100">
                    {item.step}
                  </div>
                </div>
                
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
                  <h3 className="text-h3 font-bold text-neutral-900 mb-3">{item.title}</h3>
                  <p className="text-body text-neutral-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center">
            {/* Glassmorphic Background for CTA */}
            <div className="absolute inset-0 bg-primary-600/90 backdrop-blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/50 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Start Your Crypto Journey
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
                Join thousands of learners mastering Web3. <br/>
                No email required. Just connect your wallet and learn.
              </p>
              
              {!user && (
                <Button 
                  size="large" 
                  variant="secondary" 
                  className="bg-white text-primary-700 hover:bg-neutral-50 shadow-xl border-0 text-lg h-16 px-10 rounded-2xl"
                  onClick={handleConnectWallet}
                  loading={loading}
                >
                  <Wallet className="w-6 h-6 mr-3" />
                  Connect Wallet to Start
                </Button>
              )}
              
              <div className="mt-8 flex items-center justify-center gap-6 text-primary-200 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Free Forever
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Earn NFTs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}