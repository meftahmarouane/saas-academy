export type UserLevel = "Novice" | "Builder" | "Founder" | "Scale Master" | "SaaS Legend";

export interface UserProfile {
    id: string;
    email: string;
    level: UserLevel;
    current_xp: number;
    current_streak: number;
    longest_streak: number;
    current_mrr: number;
    target_mrr: number;
    start_date: string; // ISO date
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
