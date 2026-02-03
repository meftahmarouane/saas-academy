"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { supabase } from "@/lib/supabase";

export function useAuthSync() {
    const { setUser, id } = useUserStore();

    useEffect(() => {
        // 1. Check active session on mount
        const syncUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch detailed profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: profile.id,
                        email: session.user.email || "",
                        level: profile.level,
                        current_xp: profile.current_xp,
                        current_streak: profile.current_streak,
                        target_mrr: profile.target_mrr
                        // Note: current_mrr is derived from logs usually, handled separately or we add a field later
                    });
                }
            }
        };

        syncUser();

        // 2. Listen for changes (Sign In / Sign Out)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                // Re-run sync or just set basic info
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profile) {
                    setUser({
                        id: profile.id,
                        email: session.user.email || "",
                        level: profile.level,
                        current_xp: profile.current_xp,
                        current_streak: profile.current_streak,
                        target_mrr: profile.target_mrr
                    });
                }
            } else if (event === 'SIGNED_OUT') {
                // Optional: Clear store or reset to mock/guest
                // setUser({ id: 'guest', ... }) 
                // For now, we trust the persistence layer or page refresh
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [setUser]);
}
