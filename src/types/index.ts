export type UserLevel = "Novice" | "Builder" | "Founder" | "Scale Master" | "SaaS Legend";

export interface MrrLog {
    date: string;
    amount: number;
    source: "new_customer" | "expansion" | "churn_recovery" | "initial";
    note?: string;
}

export interface ModuleProgress {
    completed: number; // 0 to 1
    lastLesson: string;
    locked?: boolean;
}

export interface WeeklyWin {
    date: string;
    text: string;
    type: "lesson" | "mrr" | "manual" | "customer";
    completed: boolean;
}

export interface UserProfile {
    id: string;
    email: string;
    level: UserLevel;
    xp: number;
    streakDays: number;
    lastActive: string;
    currentMRR: number;
    mrrGoal: number;
    mrrHistory: MrrLog[];
    moduleProgress: Record<string, ModuleProgress>;
    achievements: string[]; // Achievement IDs
    weeklyWins: WeeklyWin[];
}

export interface Module {
    id: string;
    title: string;
    description: string;
    category: "Fundamentals" | "Ideation" | "Technical" | "Launch" | "Scale" | "Operations";
    xp_reward: number;
    estimated_minutes: number;
    slug: string;
    order: number;
}

export interface Lesson {
    id: string;
    module_id: string;
    title: string;
    slug: string;
    order: number;
    content_type: "reading" | "interactive" | "quiz";
    xp_reward: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name or emoji
    unlocked_at?: string; // If null, locked
}
