import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, MrrLog, WeeklyWin } from "@/types";
import { supabase } from "@/lib/supabase";

const updateProfile = async (id: string, data: Partial<UserProfile>) => {
    if (id.startsWith('mock-')) return;

    const { error } = await supabase
        .from('profiles')
        .upsert({ id, ...data, updated_at: new Date().toISOString() });

    if (error) console.error('Failed to sync profile:', error);
};

interface UserState extends UserProfile {
    // Actions
    addXp: (amount: number) => void;
    updateStreak: (days: number) => void;
    updateMrr: (amount: number, source?: MrrLog["source"], note?: string) => void;
    addWeeklyWin: (win: WeeklyWin) => void;
    setUser: (user: Partial<UserProfile>) => void;
}

interface UIState {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            // Initial Mock State
            id: "mock-user-1",
            email: "founder@example.com",
            level: "Builder",
            xp: 650,
            streakDays: 5,
            lastActive: new Date().toISOString(),
            currentMRR: 250,
            mrrGoal: 1000,
            mrrHistory: [
                { date: '2024-01-01', amount: 100, source: 'initial' },
                { date: '2024-01-15', amount: 150, source: 'new_customer' },
                { date: '2024-02-01', amount: 250, source: 'new_customer' },
            ],
            moduleProgress: {
                ideation: { completed: 0.8, lastLesson: '3' },
                unitEconomics: { completed: 0.4, lastLesson: '2' },
                launch: { completed: 0, lastLesson: '0' },
                scale: { completed: 0, lastLesson: '0', locked: true }
            },
            achievements: ['first_dollar', 'seven_day_streak'],
            weeklyWins: [
                { date: new Date().toISOString(), text: "Completed 3 lessons", type: 'lesson', completed: true },
                { date: new Date().toISOString(), text: "Logged $150 new MRR", type: 'mrr', completed: true },
                { date: new Date().toISOString(), text: "Validate idea with 3 customers", type: 'customer', completed: false },
            ],

            addXp: (amount) => set((state) => {
                const newXp = state.xp + amount;
                updateProfile(state.id, { xp: newXp } as any);
                return { xp: newXp };
            }),
            updateStreak: (days) => set((state) => {
                updateProfile(state.id, { streakDays: days } as any);
                return { streakDays: days };
            }),
            updateMrr: (amount, source = 'new_customer', note) => set((state) => {
                const newLog: MrrLog = {
                    date: new Date().toISOString().split('T')[0],
                    amount,
                    source,
                    note
                };
                const newHistory = [...state.mrrHistory, newLog];
                updateProfile(state.id, { currentMRR: amount } as any);
                return {
                    currentMRR: amount,
                    mrrHistory: newHistory
                };
            }),
            addWeeklyWin: (win) => set((state) => ({
                weeklyWins: [...state.weeklyWins, win]
            })),
            setUser: (user) => set((state) => ({ ...state, ...user })),
        }),
        {
            name: "saas-academy-user-storage",
        }
    )
);

export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
