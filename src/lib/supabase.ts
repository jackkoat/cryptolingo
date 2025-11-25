import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Create client with placeholder values if not configured
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  wallet_address: string;
  wallet_id?: string;
  total_xp: number;
  user_level: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  has_seen_tutorial?: boolean;
  tutorial_completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string; // Now stores wallet_address
  path_id: string;
  lesson_id: string;
  is_completed: boolean;
  score?: number;
  xp_earned: number;
  accuracy_percentage?: number;
  time_taken_seconds?: number;
  completed_at?: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  badge_type: string;
  unlock_condition: string;
  icon_name?: string;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string; // Now stores wallet_address
  achievement_id: string;
  unlocked_at: string;
}
