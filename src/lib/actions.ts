"use server";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// @ts-ignore
const supabase: any = createClient<Database>(supabaseUrl, supabaseKey);

export async function logMrr(userId: string, amount: number, category: 'new' | 'expansion' | 'churn', note?: string) {
    const insertData: Database['public']['Tables']['mrr_logs']['Insert'] = {
        user_id: userId,
        amount,
        category,
        note: note || null, // Handle undefined -> null
        date: new Date().toISOString()
    };

    const { data, error } = await supabase.from('mrr_logs').insert(insertData).select().single();

    if (error) {
        console.error("Error logging MRR:", error);
        return { error: error.message };
    }

    // Update profile current MRR
    const { data: profile } = await supabase.from('profiles').select('current_mrr').eq('id', userId).single();
    const current = profile?.current_mrr || 0;
    const newAmount = Number(current) + (category === 'churn' ? -Number(amount) : Number(amount));

    await supabase.from('profiles').update({ current_mrr: newAmount }).eq('id', userId);

    return { data, newMrr: newAmount };
}

export async function getMrrHistory(userId: string) {
    const { data, error } = await supabase.from('mrr_logs').select('*').eq('user_id', userId).order('date', { ascending: false });
    return { data, error };
}
