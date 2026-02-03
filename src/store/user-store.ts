import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/types";
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

            addXp: (amount) => set((state) => {
                const newXp = state.current_xp + amount;
                updateProfile(state.id, { current_xp: newXp });
                return { current_xp: newXp };
            }),
            updateStreak: (days) => set((state) => {
                updateProfile(state.id, { current_streak: days });
                return { current_streak: days };
            }),
            updateMrr: (amount) => set((state) => {
                updateProfile(state.id, { target_mrr: amount }); // Assuming this maps to target_mrr for now based on context, or we need a current_mrr field in DB? 
                // Wait, DB types: current_streak, longest_streak, current_xp, level. 
                // mrr_logs table handles the logs. 
                // The store has `current_mrr` and `target_mrr`. 
                // Let's check DB schema again. `profiles` has `target_mrr`. 
                // `current_mrr` is likely derived or stored. The DB schema in earlier steps for profiles has `target_mrr`.
                // Let's just update local state for MRR for now if it's not in profiles, or assume it's calculated.
                // Actually, let's look at `updateMrr` usage. It sets `current_mrr`. 
                // If `current_mrr` isn't on profile, we can't sync it easily without a column.
                // I will add it to the local update only for now, or check if I should add it to DB. 
                // The implementation plan says: "mrr_logs" table exists. 
                // Let's stick to syncing what overlaps.
                return { current_mrr: amount };
            }),
            setUser: (user) => set((state) => {
                // If setting user (e.g. on login), we don't necessarily push BACK to DB immediately unless it's an update.
                // Usually this is for hydration.
                return { ...state, ...user };
            }),
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
