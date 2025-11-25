import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, UserProfile, isSupabaseConfigured } from '../lib/supabase';

// Phantom wallet types
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string } | null;
      on: (event: string, callback: () => void) => void;
      off: (event: string, callback: () => void) => void;
    };
  }
}

interface WalletUser {
  walletAddress: string;
}

interface AuthContextType {
  user: WalletUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isPhantomInstalled: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to truncate wallet address for display
export function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<WalletUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(false);

  // Check if Phantom is installed
  useEffect(() => {
    const checkPhantom = () => {
      const isInstalled = Boolean(window.solana?.isPhantom);
      setIsPhantomInstalled(isInstalled);
      return isInstalled;
    };

    // Check immediately
    if (checkPhantom()) {
      // Check if already connected
      if (window.solana?.publicKey) {
        const address = window.solana.publicKey.toString();
        setUser({ walletAddress: address });
        loadOrCreateProfile(address);
      } else {
        setLoading(false);
      }
    } else {
      // Wait a bit for Phantom to inject
      const timeout = setTimeout(() => {
        checkPhantom();
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Listen for wallet connection changes
    const handleConnect = () => {
      if (window.solana?.publicKey) {
        const address = window.solana.publicKey.toString();
        setUser({ walletAddress: address });
        loadOrCreateProfile(address);
      }
    };

    const handleDisconnect = () => {
      setUser(null);
      setProfile(null);
    };

    window.solana?.on('connect', handleConnect);
    window.solana?.on('disconnect', handleDisconnect);

    return () => {
      window.solana?.off('connect', handleConnect);
      window.solana?.off('disconnect', handleDisconnect);
    };
  }, []);

  const loadOrCreateProfile = useCallback(async (walletAddress: string) => {
    if (!isSupabaseConfigured) {
      // Demo mode - create mock profile
      setProfile({
        id: walletAddress,
        email: '',
        full_name: 'Crypto Learner',
        wallet_address: walletAddress,
        total_xp: 0,
        user_level: 1,
        current_streak: 0,
        longest_streak: 0,
        has_seen_tutorial: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setLoading(false);
      return;
    }

    try {
      // Check if profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching profile:', fetchError);
      }

      if (existingProfile) {
        setProfile(existingProfile);
      } else {
        // Create new profile for this wallet
        const newProfile: Partial<UserProfile> = {
          id: walletAddress, // Use wallet address as ID
          wallet_address: walletAddress,
          full_name: 'Crypto Learner',
          total_xp: 0,
          user_level: 1,
          current_streak: 0,
          longest_streak: 0,
          has_seen_tutorial: false,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          // If insert fails (maybe due to constraint), try to fetch again
          const { data: retryProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', walletAddress)
            .maybeSingle();
          
          if (retryProfile) {
            setProfile(retryProfile);
          } else {
            // Fallback to demo profile if backend fails
            console.warn('[CryptoLingo] Using demo profile due to backend errors');
            setProfile({
              id: walletAddress,
              email: '',
              full_name: 'Crypto Learner',
              wallet_address: walletAddress,
              total_xp: 0,
              user_level: 1,
              current_streak: 0,
              longest_streak: 0,
              has_seen_tutorial: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        } else if (createdProfile) {
          setProfile(createdProfile);
          
          // Award wallet-connected achievement
          await awardWalletAchievement(walletAddress);
        }
      }
    } catch (error) {
      console.error('Error in loadOrCreateProfile:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const awardWalletAchievement = async (walletAddress: string) => {
    try {
      // Get wallet achievement
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('slug', 'wallet-connected')
        .single();

      if (achievement) {
        // Check if already awarded
        const { data: existing } = await supabase
          .from('user_achievements')
          .select('id')
          .eq('user_id', walletAddress)
          .eq('achievement_id', achievement.id)
          .maybeSingle();

        if (!existing) {
          await supabase
            .from('user_achievements')
            .insert({
              user_id: walletAddress,
              achievement_id: achievement.id,
            });
        }
      }
    } catch (error) {
      console.error('Error awarding wallet achievement:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.solana) {
      // Open Phantom installation page in new tab
      window.open('https://phantom.app/', '_blank');
      alert('Phantom wallet not detected. Please install the Phantom browser extension to continue.');
      return;
    }

    try {
      setLoading(true);
      const response = await window.solana.connect();
      const address = response.publicKey.toString();
      setUser({ walletAddress: address });
      await loadOrCreateProfile(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setLoading(false);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect();
      }
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !isSupabaseConfigured) {
      throw new Error('Wallet connection required');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('wallet_address', user.walletAddress)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (data) setProfile(data);
  };

  const refreshProfile = async () => {
    if (user && isSupabaseConfigured) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', user.walletAddress)
        .maybeSingle();
      
      if (data) setProfile(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isPhantomInstalled,
        connectWallet,
        disconnectWallet,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
