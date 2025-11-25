# CryptoLingo - Next.js 14 Production Build

A gamified cryptocurrency education platform built with Next.js 14, Prisma, TypeScript, and Solana Wallet Adapter. Learn blockchain and crypto concepts through interactive lessons while earning XP, leveling up, and unlocking achievements.

## Features

- **Next.js 14 App Router**: Modern React framework with server components and optimized performance
- **Prisma ORM**: Type-safe database access with PostgreSQL (Supabase)
- **Solana Wallet Integration**: Phantom, Solflare, and Backpack wallet support
- **TypeScript Strict Mode**: Fully typed codebase for maintainability
- **Gamification System**: XP, levels, streaks, and achievements
- **8 Interactive Lessons**: 100+ questions across 2 learning paths
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Modular Architecture**: Clean, maintainable, production-ready code

## Learning Paths

### 1. Beginner Fundamentals (650 XP)
- Blockchain Basics (12 questions)
- Understanding Cryptocurrency (12 questions)
- Public vs Private Keys (12 questions)
- Wallet Basics & Security (12 questions)

### 2. DeFi Essentials (725 XP)
- What is DeFi? (12 questions)
- Swapping & Trading (13 questions)
- Liquidity Pools (13 questions)
- Staking Basics (14 questions)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Blockchain**: Solana (Devnet)
- **Styling**: Tailwind CSS
- **Wallet Adapter**: @solana/wallet-adapter-react
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+ or pnpm 8+
- PostgreSQL database (Supabase recommended)
- Solana wallet (Phantom, Solflare, or Backpack)

## Installation

### 1. Clone or copy the project

```bash
cd cryptolingo-nextjs
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database URLs (from Supabase)
DATABASE_URL="postgresql://postgres.nzjzunlpjebyeafnbrza:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.nzjzunlpjebyeafnbrza:YOUR_PASSWORD@aws-0-us-west-1.pooler.supabase.com:5432/postgres"

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK="devnet"
NEXT_PUBLIC_SOLANA_RPC="https://api.devnet.solana.com"
```

**Supabase Connection Details:**
- Project ID: `nzjzunlpjebyeafnbrza`
- Get your password from Supabase dashboard → Settings → Database
- Use the **Pooler URL** for DATABASE_URL (port 6543)
- Use the **Direct URL** for DIRECT_URL (port 5432)

### 4. Set up the database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed the database with lesson content
npm run prisma:seed

# Or run all at once
npm run db:setup
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  ├─ layout.tsx                 # Root layout with WalletProvider
  ├─ page.tsx                   # Landing page
  ├─ dashboard/page.tsx         # User dashboard
  ├─ learning-paths/
  │   ├─ page.tsx              # All paths overview
  │   └─ [id]/page.tsx         # Single path with lessons
  ├─ lesson/[id]/page.tsx      # Lesson quiz view
  ├─ profile/page.tsx          # User profile
  └─ api/
      ├─ learning-paths/route.ts       # GET all paths
      ├─ learning-paths/[id]/route.ts  # GET single path
      ├─ lesson/complete/route.ts      # POST lesson completion
      └─ user/[wallet]/progress/route.ts # GET user progress

/components
  ├─ providers/WalletProvider.tsx
  ├─ layout/
  │   ├─ Navbar.tsx
  │   └─ FloatingXPBadge.tsx
  ├─ ui/
  │   ├─ Button.tsx
  │   ├─ Card.tsx
  │   ├─ StatCard.tsx
  │   ├─ ProgressBar.tsx
  │   ├─ LearningPathCard.tsx
  │   └─ LessonCard.tsx
  └─ features/
      ├─ QuestionCard.tsx
      ├─ LessonComplete.tsx
      └─ AchievementCard.tsx

/lib
  ├─ prisma.ts      # Prisma client singleton
  ├─ types.ts       # TypeScript definitions
  └─ utils.ts       # Helper functions

/prisma
  ├─ schema.prisma  # Database schema
  ├─ seed.ts        # Seed script
  └─ seed-data.ts   # Lesson content
```

## Database Schema

### Models

- **User**: Wallet address, level, XP, streak, timestamps
- **LearningPath**: Title, description, total XP, lesson count
- **Lesson**: Title, content (JSON), order, XP reward
- **UserProgress**: User-lesson completion tracking

### Relationships

- One User → Many UserProgress
- One LearningPath → Many Lessons
- One Lesson → Many UserProgress

## API Routes

### GET /api/learning-paths
Returns all learning paths with optional user progress.
- Query params: `?wallet=<wallet_address>`
- Response: Array of learning paths with progress percentage

### GET /api/learning-paths/[id]
Returns single path details with lessons and locked state.
- Query params: `?wallet=<wallet_address>`
- Response: Path details with lesson array

### POST /api/lesson/complete
Marks lesson as completed and updates user stats.
- Body: `{ walletAddress: string, lessonId: string }`
- Response: Updated user stats, XP earned, level info

### GET /api/user/[wallet]/progress
Returns user statistics and achievements.
- Response: User data, completed lessons, achievements

## Features Explained

### Gamification System

- **XP (Experience Points)**: Earn XP for completing lessons
- **Levels**: 500 XP = 1 level (formula: `level = floor(totalXp / 500) + 1`)
- **Streaks**: Daily login tracking with 24-hour grace period
- **Achievements**: 6 unlockable achievements based on progress

### Wallet Authentication

- Connect with Phantom, Solflare, or Backpack
- Wallet address used as unique user ID
- Automatic user creation on first connect
- No email/password required

### Lesson Flow

1. User selects a learning path
2. Lessons unlock sequentially (complete previous to unlock next)
3. Answer questions (multiple-choice, true/false, fill-blank, matching)
4. Receive instant feedback with explanations
5. Complete lesson to earn XP and update stats
6. Track progress across dashboard and profile

## Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Add environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXT_PUBLIC_SOLANA_NETWORK`
   - `NEXT_PUBLIC_SOLANA_RPC`
4. Deploy

### Build Locally

```bash
npm run build
npm run start
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Pooler connection (serverless) | `postgresql://...6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Direct connection (migrations) | `postgresql://...5432/postgres` |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Solana cluster | `devnet` or `mainnet-beta` |
| `NEXT_PUBLIC_SOLANA_RPC` | RPC endpoint | `https://api.devnet.solana.com` |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed database with content
- `npm run db:setup` - Complete database setup (generate + push + seed)

## Design System

### Colors

- **Primary Purple**: `#8B5CF6` (Purple 500)
- **Success Green**: `#10B981` (Green 500)
- **Neutral Gray**: Tailwind gray scale
- **Gradients**: Purple → Purple, Green → Green

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold, large sizes (3xl-5xl)
- **Body**: Regular, readable (base-lg)

### Components

- **Cards**: Rounded (2xl), soft shadows, glassmorphism option
- **Buttons**: Rounded (xl), gradients, hover effects
- **Progress Bars**: Thick (8-10px), animated, gradient fills

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL uses port 6543 (pooler)
- Verify DIRECT_URL uses port 5432 (direct)
- Check Supabase database password is correct
- Ensure IP is allowlisted in Supabase (or allow all)

### Wallet Connection Issues

- Ensure wallet extension is installed and unlocked
- Switch wallet to Devnet network
- Clear browser cache/cookies if connection fails
- Check browser console for errors

### Build Errors

- Run `npm run prisma:generate` before building
- Ensure all environment variables are set
- Check TypeScript errors with `npm run lint`
- Verify Node.js version is 18+

## Future Enhancements

- [ ] React Server Components optimization
- [ ] Loading states with skeleton loaders
- [ ] Error boundaries for better error handling
- [ ] Optimistic UI updates
- [ ] Local storage for offline progress
- [ ] Daily quest system
- [ ] Leaderboard functionality
- [ ] More learning paths (NFTs, DAOs, etc.)
- [ ] Mobile app (React Native)

## Contributing

This is a production-ready educational project. Feel free to:
- Add more lessons and learning paths
- Enhance UI/UX design
- Improve gamification mechanics
- Add new question types
- Optimize performance

## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions:
1. Check this README
2. Review the code comments
3. Check Prisma/Next.js documentation
4. Review Solana Wallet Adapter docs

## Credits

Built with:
- Next.js 14
- Prisma ORM
- Solana Wallet Adapter
- Tailwind CSS
- TypeScript

---

**Ready to deploy!** This is a production-grade, fully-typed, modular Next.js application ready for Vercel deployment.
