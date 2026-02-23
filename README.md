# HookVaultByMoe 🚀

Generate viral hooks in seconds using AI.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Clerk
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **AI**: GitHub Models (GPT-4o)

## Getting Started

### 1. Environment Variables
Fill in the `.env.local` file with your credentials:
- `CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.com/)
- `DATABASE_URL`: Get from [Neon Console](https://console.neon.tech/)
- `GITHUB_TOKEN`: Get from [GitHub Models](https://github.com/marketplace/models)

### 2. Database Setup
Push the schema to your Neon database:
```bash
npx drizzle-kit push
```

### 3. Run Locally
```bash
npm run dev
```

## Features
- **Landing Page**: Conversion-optimized hero section.
- **Protected Dashboard**: Accessible only to authenticated users.
- **Viral Hook Generator**: Customizable by niche, topic, platform, and tone.
- **History Tracking**: All generated hooks are saved to your account.
- **Premium UI**: Modern dark mode with purple/neon accents.
