"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setUser: setStoreUser } = useUserStore();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then((result) => {
            const session = result.data?.session;
            setUser(session?.user ?? null);
            if (session?.user) {
                setStoreUser({
                    id: session.user.id,
                    email: session.user.email ?? "",
                });
            }
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: string, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                setStoreUser({
                    id: session.user.id,
                    email: session.user.email ?? "",
                });
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
