"use client";

import { useUserStore } from "@/store/user-store";
import { StatHeader } from "@/components/dashboard/StatHeader";
import { FocusCard } from "@/components/dashboard/FocusCard";
import { MrrTracker } from "@/components/dashboard/MrrTracker";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";
import { WeeklyWins } from "@/components/dashboard/WeeklyWins";
import { BadgeSection } from "@/components/dashboard/BadgeSection";
import { motion } from "framer-motion";
import { Settings, User } from "lucide-react";

export default function DashboardPage() {
    const { email, level } = useUserStore();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pb-12 space-y-8">
            {/* Top Navigation / Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xs">S</div>
                    <h1 className="text-xl font-bold text-slate-100 tracking-tight">SaaS-500K Academy</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 hover:text-slate-100 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 pl-4 border-l border-slate-800">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-bold text-slate-200">{email.split('@')[0]}</p>
                            <p className="text-[10px] text-slate-500 font-medium">Founder Level</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome & Stats */}
            <div className="space-y-1">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-black text-white"
                >
                    Good morning, Founder!
                </motion.h2>
                <StatHeader />
            </div>

            {/* Main Interactive Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {/* Column 1: Focus & Badges */}
                <motion.div variants={itemVariants} className="space-y-8 lg:col-span-1">
                    <FocusCard />
                    <BadgeSection />
                </motion.div>

                {/* Column 2: MRR Tracker */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                    <MrrTracker />
                </motion.div>

                {/* Column 3: Journey & Wins */}
                <motion.div variants={itemVariants} className="space-y-8 lg:col-span-1">
                    <ModuleGrid />
                    <WeeklyWins />
                </motion.div>
            </motion.div>
        </div>
    );
}

