"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setUser: setStoreUser } = useUserStore();

    useEffect(() => {
        // 1. Sync user and profile helper
        const syncUser = async (session: Session | null) => {
            if (session?.user) {
                // Fetch detailed profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                setStoreUser({
                    id: session.user.id,
                    email: session.user.email ?? "",
                    level: profile?.level ?? "Novice",
                    current_xp: profile?.current_xp ?? 0,
                    current_streak: profile?.current_streak ?? 0,
                    target_mrr: profile?.target_mrr ?? 0,
                });
            } else {
                setUser(null);
            }
        };

        // 2. Get initial session
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            if (session) await syncUser(session);
            setLoading(false);
        };

        getInitialSession();

        // 3. Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user ?? null);
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                if (session) await syncUser(session);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [setStoreUser]);

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return {
        user,
        loading,
        logout,
        isAuthenticated: !!user,
    };
}
