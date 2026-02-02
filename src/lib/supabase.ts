import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
    supabaseUrl && supabaseAnonKey
        ? createClient<Database>(supabaseUrl, supabaseAnonKey)
        : createMockClient();

function createMockClient() {
    console.warn("Supabase credentials missing. Using Mock Client.");
    return {
        auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            signInWithPassword: async () => ({ data: { user: { id: "mock-user" } }, error: null }),
            signOut: async () => ({ error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        },
        from: (table: string) => ({
            select: () => ({
                eq: () => ({
                    single: () => ({ data: null, error: null }),
                    data: [],
                    error: null
                }), // simple chain mock
                data: [],
                error: null,
            }),
        }),
    } as any;
}
