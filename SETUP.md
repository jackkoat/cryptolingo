# CryptoLingo - Supabase Setup Instructions

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

1. Create a new Supabase project at https://supabase.com

2. Run the migration file located at `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor

3. The migration will:
   - Create `profiles` table (user profiles with XP, level, streaks)
   - Create `user_progress` table (lesson completion tracking)
   - Create `achievements` table (badge definitions)
   - Create `user_achievements` table (user unlocked badges)
   - Set up Row Level Security (RLS) policies
   - Create triggers for new user signup
   - Insert default achievements

## Authentication Setup

Supabase Authentication is configured for:
- Email/Password authentication
- Automatic profile creation on signup
- Session management

## Testing the Application

After setting up Supabase credentials:

1. Install dependencies: `pnpm install`
2. Run development server: `pnpm dev`
3. Create a test account and start learning!

## Features Implemented

### Backend (Supabase Ready)
- Database schema with RLS policies
- User authentication
- Progress tracking
- Achievement system
- XP and leveling system
- Streak tracking

### Frontend
- Complete React application
- 8 educational lessons across 2 paths
- Interactive question types (multiple choice, fill-blank, matching)
- Gamification (XP, streaks, badges, levels)
- Phantom wallet integration
- Profile management
- Progress tracking dashboard

## Notes

- The application is fully functional once Supabase credentials are added
- All backend code is ready - just needs credentials
- User will need to provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
