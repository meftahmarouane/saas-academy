"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge as BadgeUI } from "@/components/ui/Badge";
import { Award, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const ALL_ACHIEVEMENTS = [
    { id: 'first_dollar', title: 'First Dollar', icon: '💎', description: 'Log your first revenue in the tracker' },
    { id: 'seven_day_streak', title: '7 Day Streak', icon: '🔥', description: 'Study for 7 days in a row' },
    { id: 'builder', title: 'Builder', icon: '🛠️', description: 'Complete your first module' },
    { id: 'scale_master', title: 'Scale Master', icon: '📊', description: 'Unlock the Scale module', locked: true },
];

export function BadgeSection() {
    const { achievements } = useUserStore();

    const recentAchievements = ALL_ACHIEVEMENTS.filter(a => achievements.includes(a.id));
    const lockedAchievements = ALL_ACHIEVEMENTS.filter(a => !achievements.includes(a.id));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4" /> Recent Achievements
                </h3>
                <button className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                    View All <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {recentAchievements.slice(0, 4).map((achievement, index) => (
                    <motion.div
                        key={achievement.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
                    >
                        <div className="text-3xl mb-2 filter drop-shadow-lg group-hover:scale-110 transition-transform">
                            {achievement.icon}
                        </div>
                        <p className="text-xs font-bold text-slate-200 text-center">{achievement.title}</p>
                    </motion.div>
                ))}

                {recentAchievements.length < 4 && lockedAchievements.slice(0, 4 - recentAchievements.length).map((achievement, index) => (
                    <div
                        key={achievement.id}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/20 border border-dashed border-slate-800 opacity-50 grayscale"
                    >
                        <div className="text-3xl mb-2 opacity-50">
                            {achievement.icon}
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 text-center">{achievement.title}</p>
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20"
            >
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Award className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-xs text-blue-300 font-bold uppercase tracking-tight">Recent: "First Dollar" badge earned!</p>
                    <p className="text-[10px] text-blue-400/70">You received +100 XP for this achievement</p>
                </div>
            </motion.div>
        </div>
    );
}
