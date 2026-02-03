"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Target, Zap, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function FocusCard() {
    const { moduleProgress } = useUserStore();

    // In a real app, this logic would be more complex
    const currentModuleKey = 'unitEconomics';
    const progress = moduleProgress[currentModuleKey] || { completed: 0, lastLesson: '0' };

    return (
        <Card variant="interactive" className="h-full relative overflow-hidden group border-blue-500/20 bg-slate-900/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-blue-400 uppercase text-xs font-bold tracking-[0.2em]">
                    <Target className="w-4 h-4" /> Today's Focus
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">Continue: Unit Economics</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Complete Lesson {parseInt(progress.lastLesson) + 1} to stay ahead of your goal. You're {Math.round(progress.completed * 100)}% through this module.
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-slate-500">Module Progress</span>
                        <span className="text-blue-400">{Math.round(progress.completed * 100)}% • 8 min left</span>
                    </div>
                    <ProgressBar value={progress.completed * 100} variant="blue" className="h-2.5 bg-slate-800" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link href="/modules/unit-economics" className="flex-1">
                        <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-900/20">
                            <Play className="w-4 h-4 fill-current" /> Resume Lesson
                        </Button>
                    </Link>
                </div>

                <div className="pt-4 border-t border-slate-800/50">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-700/60 transition-colors group/win cursor-pointer">
                        <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                            <Zap className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-tight">Quick Win</p>
                            <p className="text-sm text-slate-400">Log yesterday's revenue (2 min)</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover/win:text-slate-400 transition-colors self-center" />
                    </div>
                </div>
            </CardContent>

            {/* Background Decorative Element */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <Target className="w-64 h-64" />
            </div>
        </Card>
    );
}
