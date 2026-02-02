# SaaS-500K Academy

A gamified dashboard for solo founders to learn, build, and scale their SaaS to $500k ARR.

## 🚀 Features

*   **Gamified Progress**: XP, Levels, and Streaks.
*   **Interactive Modules**:
    *   **Ideation**: Idea Score, Competitor Finder, Customer Interview Simulator.
    *   **Launch**: 6-Week Sprint, LTD Strategy, 0-1K Survival Mode.
*   **Real Tools**:
    *   MRR Logger (with confetti 🎉).
    *   Browser Notifications for daily focus.
*   **Tech Stack**: Next.js 14, Tailwind CSS, Supabase, Framer Motion.

## 🛠️ Setup

1.  **Clone & Install**:
    ```bash
    git clone <repo>
    cd saas-academy
    npm install
    ```

2.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and add your keys:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Mock Mode**:
    If no Supabase keys are provided, the app runs in Mock Mode (some features simulated).

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push to GitHub.
2.  Import project in Vercel.
3.  Add Environment Variables.
4.  Deploy!

## 🧪 Testing

Run the build verification locally:
```bash
npm run build
```
