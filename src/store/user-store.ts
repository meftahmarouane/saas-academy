import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/types";

interface UserState extends UserProfile {
    // Actions
    addXp: (amount: number) => void;
    updateStreak: (days: number) => void;
    updateMrr: (amount: number) => void;
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
            level: "Novice",
            current_xp: 0,
            current_streak: 0,
            longest_streak: 0,
            current_mrr: 0,
            target_mrr: 1000,
            start_date: new Date().toISOString(),

            addXp: (amount) => set((state) => ({ current_xp: state.current_xp + amount })),
            updateStreak: (days) => set({ current_streak: days }),
            updateMrr: (amount) => set({ current_mrr: amount }),
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
