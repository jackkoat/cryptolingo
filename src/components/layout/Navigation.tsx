import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Wallet, Twitter } from 'lucide-react';
import { useAuth, truncateAddress } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function Navigation() {
  const { user, profile, disconnectWallet, connectWallet, isPhantomInstalled, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    navigate('/');
  };

  const navLinks = user
    ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/paths', label: 'Learning Paths' },
        { to: '/profile', label: 'Profile' },
      ]
    : [];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-normal py-2',
        'bg-white/90 backdrop-blur-md',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.jpeg" alt="CryptoLingo" className="w-10 h-10" />
            <span className="text-h3 text-primary-600 font-bold">CryptoLingo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'text-body font-medium transition-colors',
                  isActiveLink(link.to)
                    ? 'text-primary-600 border-b-2 border-primary-500'
                    : 'text-neutral-700 hover:text-primary-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* X (Twitter) Link */}
            <a
              href="https://x.com/cryptolingosite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-primary-600 transition-colors"
              title="Follow us on X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-primary-50 rounded-md">
                  <span className="text-small font-semibold text-primary-600">
                    Level {profile?.user_level || 1}
                  </span>
                  <span className="text-small text-neutral-700">
                    {profile?.total_xp || 0} XP
                  </span>
                </div>
                <Link to="/profile">
                  <div className="flex items-center gap-2 px-3 py-2 bg-success-50 rounded-md cursor-pointer hover:bg-success-100 transition-colors">
                    <Wallet className="w-4 h-4 text-success-600" />
                    <span className="text-small font-mono text-success-700">
                      {truncateAddress(user.walletAddress)}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleDisconnect}
                  className="text-neutral-700 hover:text-error-500 transition-colors"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Button onClick={handleConnectWallet} loading={loading}>
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4">
              {/* X (Twitter) Link */}
              <a
                href="https://x.com/cryptolingosite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-body font-medium text-neutral-700 hover:text-primary-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Twitter className="w-5 h-5" />
                Follow us on X
              </a>
              {user && (
                <div className="flex items-center gap-2 px-3 py-2 bg-success-50 rounded-md">
                  <Wallet className="w-4 h-4 text-success-600" />
                  <span className="text-small font-mono text-success-700">
                    {truncateAddress(user.walletAddress)}
                  </span>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-body font-medium py-2',
                    isActiveLink(link.to) ? 'text-primary-600' : 'text-neutral-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    handleDisconnect();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-body font-medium text-error-500 py-2 text-left"
                >
                  Disconnect Wallet
                </button>
              ) : (
                <Button onClick={handleConnectWallet} className="w-full" loading={loading}>
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
