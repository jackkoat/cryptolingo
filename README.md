# CryptoLingo - Gamified Crypto Education Platform

A Duolingo-style learning platform for cryptocurrency and blockchain education, featuring interactive lessons, gamification, and Phantom wallet integration.

## Live Demo

**Production URL**: [https://iokautqjfl3f.space.minimax.io](https://iokautqjfl3f.space.minimax.io)

## Features

### Educational Content
- **8 Comprehensive Lessons** across 2 learning paths:
  - **Path 1: Beginner Fundamentals** (4 lessons)
    - What is Blockchain?
    - Understanding Cryptocurrency
    - Public vs Private Keys
    - Wallet Basics & Security
  - **Path 2: DeFi Essentials** (4 lessons)
    - What is DeFi?
    - Swapping & Trading
    - Liquidity Pools
    - Staking Basics

### Interactive Learning
- **Multiple Question Types**:
  - Multiple Choice (4 options)
  - Fill in the Blank (text validation)
  - Matching Pairs (drag & drop style)
- Real educational content (no placeholders)
- Immediate feedback and explanations

### Gamification System
- **XP Points**: Earn experience for lesson completion
- **User Levels**: Progress through levels based on total XP
- **Daily Streaks**: Track consecutive days of learning
- **Achievement Badges**: Unlock badges for milestones
  - First Steps (complete first lesson)
  - Learning Streak (5 lessons)
  - Path Master (complete a path)
  - Perfectionist (100% score)
  - Week Warrior (7-day streak)
  - Crypto Ready (connect wallet)
  - XP Collector (1000 XP)
  - Master Learner (complete all paths)

### Wallet Integration
- Phantom wallet connection
- Display wallet address
- Store wallet in user profile

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS (custom design tokens)
- **Routing**: React Router v6
- **Backend**: Supabase (Auth + Database)
- **Wallet**: Solana wallet adapter
- **Icons**: Lucide React
- **Animations**: Canvas Confetti

## Project Structure

```
cryptolingo/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── features/        # Feature-specific components
│   │   │   ├── LessonCard.tsx
│   │   │   ├── PathCard.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   └── AchievementCard.tsx
│   │   └── layout/
│   │       └── Navigation.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── data/
│   │   └── lessons.ts       # All 8 lessons with questions
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client config
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LearningPathPage.tsx
│   │   ├── LessonViewPage.tsx
│   │   └── ProfilePage.tsx
│   └── App.tsx
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
├── docs/
│   ├── content-structure-plan.md
│   ├── design-specification.md
│   └── design-tokens.json
├── SETUP.md                 # Detailed setup instructions
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account (free tier works)
- Phantom wallet browser extension (optional, for wallet features)

### Step 1: Clone and Install

```bash
cd cryptolingo
pnpm install
```

### Step 2: Configure Supabase

1. Create a new project at [https://supabase.com](https://supabase.com)

2. Create `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run the database migration:
   - Go to Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL

This will create:
- `profiles` table (user profiles)
- `user_progress` table (lesson completion)
- `achievements` table (badge definitions)
- `user_achievements` table (unlocked badges)
- Row Level Security policies
- Triggers for auto-creating profiles

### Step 3: Run Development Server

```bash
pnpm dev
```

Visit http://localhost:5173

### Step 4: Build for Production

```bash
pnpm build
```

The `dist` folder contains the production build.

## Design System

### Color Palette
- **Primary Purple**: #8B5CF6 (buttons, brand elements)
- **Success Green**: #10B981 (XP, achievements, correct answers)
- **Neutral**: #171717 to #FAFAFA (text and backgrounds)
- **Error**: #EF4444 (incorrect answers, errors)

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: 12px to 72px (responsive scale)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Based on 8-point grid
- Card padding: 32-48px
- Section gaps: 64-96px
- Border radius: 8-16px

### Components
All components follow:
- **Single Responsibility Principle**
- **SOLID principles**
- Reusable, composable architecture
- Consistent styling via design tokens

## Architecture Highlights

### Component Structure
- **UI Components**: Atomic, reusable elements (Button, Card, Input)
- **Feature Components**: Domain-specific elements (LessonCard, QuestionCard)
- **Pages**: Route-level containers

### State Management
- React Context API for auth state
- Local state for UI interactions
- Supabase for persistent data

### Authentication Flow
1. User signs up with email/password
2. Supabase creates auth user
3. Database trigger creates profile
4. User gains access to dashboard

### Progress Tracking
- Lesson completion stored in `user_progress`
- XP calculated based on accuracy
- Achievements checked and awarded automatically
- Streaks updated on daily activity

## Features in Detail

### Lesson System
- Progressive unlocking (complete lesson N to unlock N+1)
- Multiple question types per lesson
- Real-time feedback
- XP rewards based on accuracy
- Completion celebration with confetti

### Gamification
- XP: 100-200 per lesson depending on difficulty
- Levels: Every 100 XP = 1 level
- Streaks: Track consecutive days (reset if missed)
- Badges: 8 achievements with unlock conditions

### Phantom Wallet
- Connect/disconnect functionality
- Display truncated address
- Store in user profile
- Award "Crypto Ready" badge on connection

## Testing

The application has been comprehensively tested:
- ✅ Landing page and navigation
- ✅ Authentication UI
- ✅ Visual design adherence
- ✅ Responsive design (desktop)
- ✅ Error handling
- ✅ Interactive elements

See `test-progress.md` for detailed test results.

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern mobile browsers

## Known Limitations

1. **Supabase Required**: Full functionality requires Supabase configuration
2. **Phantom Wallet**: Browser extension needed for wallet features
3. **Mobile Testing**: Full mobile responsive testing pending

## Future Enhancements

Potential additions:
- More learning paths (NFTs, Smart Contracts, DAOs)
- Social features (leaderboards, friend challenges)
- Certification system
- Video lessons
- Practice mode (review completed lessons)
- Multi-language support

## Contributing

This is a demonstration project. For production use:
1. Add comprehensive error logging
2. Implement analytics
3. Add automated testing suite
4. Set up CI/CD pipeline
5. Add content management system

## License

MIT License - Feel free to use for educational purposes

## Support

For issues or questions:
- Review `SETUP.md` for detailed configuration
- Check Supabase logs for backend errors
- Verify browser console for frontend errors
- Ensure Phantom wallet is installed for wallet features

## Credits

- Design inspiration: Duolingo
- Icons: Lucide React
- Fonts: Inter (Google Fonts)
- Backend: Supabase
- Deployment: MiniMax Space

---

**Built with React, TypeScript, TailwindCSS, and Supabase**

*Learn crypto the fun way!*
