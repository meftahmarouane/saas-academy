export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    level: number
                    current_xp: number
                    current_streak: number
                    longest_streak: number
                    target_mrr: number
                    start_date: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    level?: number
                    current_xp?: number
                    current_streak?: number
                    longest_streak?: number
                    target_mrr?: number
                    start_date?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    level?: number
                    current_xp?: number
                    current_streak?: number
                    longest_streak?: number
                    target_mrr?: number
                    start_date?: string
                    updated_at?: string
                }
            }
            mrr_logs: {
                Row: {
                    id: string
                    user_id: string
                    amount: number
                    date: string
                    category: 'new' | 'expansion' | 'churn' | 'initial'
                    note: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    amount: number
                    date?: string
                    category: 'new' | 'expansion' | 'churn' | 'initial'
                    note?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    amount?: number
                    date?: string
                    category?: 'new' | 'expansion' | 'churn' | 'initial'
                    note?: string | null
                    created_at?: string
                }
            }
            user_progress: {
                Row: {
                    user_id: string
                    module_id: string
                    lesson_id: string
                    completed: boolean
                    input_data: Json
                    completed_at: string
                }
                Insert: {
                    user_id: string
                    module_id: string
                    lesson_id: string
                    completed?: boolean
                    input_data?: Json
                    completed_at?: string
                }
                Update: {
                    user_id?: string
                    module_id?: string
                    lesson_id?: string
                    completed?: boolean
                    input_data?: Json
                    completed_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
