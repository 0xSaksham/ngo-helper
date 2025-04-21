# NGO Helper - NGO Impact Reporting Portal

NGO Helper is a web application designed to help NGOs streamline their impact reporting process. It enables organizations to submit monthly reports and provides administrators with a dashboard to view aggregated impact data. Built as a hobby project, this tool aims to simplify impact tracking for non-profits.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui with custom enhancements
- **State Management**: React Server Components architecture
- **Type Safety**: TypeScript

### Backend

- **Runtime**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase JavaScript Client

### DevOps

- **Deployment**: Netlify
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Styling**: PostCSS

## ✨ Features

### NGO User Features

- **Monthly Report Submission**
  - Intuitive form with fields for:
    - NGO ID
    - Reporting Month
    - People Helped
    - Events Conducted
    - Funds Utilized
  - Client-side validation
  - Interactive UI with animated feedback

### Admin Features

- **Impact Dashboard**
  - Month-wise aggregated statistics:
    - Total NGOs Reported
    - Cumulative People Helped
    - Total Events Conducted
    - Total Funds Utilized
  - Interactive month selector
  - Visual data presentation with Sparkles effects

### Technical Highlights

- Theme switching with persistence
- Custom UI components:
  - Animated Glowing Effects
  - Interactive Sparkles
  - Responsive Data Tables
- Client-side caching strategies
- Type-safe database interactions

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm
- Supabase account

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/ngo-helper.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run development server:
   ```bash
   pnpm dev
   ```

## 🌐 Deployment

The application is deployed on Netlify:
[Live Demo](https://https://ngo-helper.netlify.app/)

## 🖥️ Project Structure

Key directories:

```
src/
├── app/ - Next.js route handlers
├── components/ - Reusable UI components
├── supabase/ - Database client configuration
├── types/ - TypeScript definitions
├── actions/ - Server actions
└── providers/ - Context providers
```

## 📝 Development Notes

### Implementation Approach

1. **Full-Stack Architecture**: Leveraged Next.js for seamless API integration
2. **Database Design**: Used PostgreSQL with Row-Level Security
3. **UI/UX Focus**: Implemented subtle animations for better user engagement
4. **Type Safety**: Maintained strict type checks across frontend and backend

### AI Assistance

- **Component Generation**: Sparkles and GlowEffect components created with AI suggestions
- **SQL Optimization**: Database functions refined using AI recommendations
- **Animation Help**: Keyframe animations developed with AI pair-programming

### Future Improvements

- **Authentication System**: NGO login with credentials
- **Data Visualization**: Interactive charts for trend analysis
- **Notification System**: Email reminders for report submissions
- **Advanced Filtering**: Multi-dimensional dashboard filtering
- **PDF Export**: Report generation capability

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss proposed changes.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details
