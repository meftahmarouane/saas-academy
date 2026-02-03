"use client";

import { useUserStore } from "@/store/user-store";
import { Flame, Star, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function StatHeader() {
    const { streakDays, xp, level } = useUserStore();

    return (
        <div className="flex flex-wrap items-center gap-6 py-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 group cursor-default"
            >
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 group-hover:bg-orange-500/20 transition-colors">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Streak</p>
                    <p className="text-lg font-bold text-slate-100">{streakDays} Days</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 group cursor-default"
            >
                <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                    <Star className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total XP</p>
                    <p className="text-lg font-bold text-slate-100">{xp.toLocaleString()}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 group cursor-default"
            >
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <Trophy className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Level</p>
                    <p className="text-lg font-bold text-slate-100">{level}</p>
                </div>
            </motion.div>
        </div>
    );
}
