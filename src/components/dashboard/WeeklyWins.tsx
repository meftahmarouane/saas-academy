"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Circle, Plus, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function WeeklyWins() {
    const { weeklyWins } = useUserStore();

    return (
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-slate-200">This Week</CardTitle>
                <div className="p-1 px-2 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    3/4 Complete
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {weeklyWins.length === 0 ? (
                    <div className="py-8 text-center">
                        <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-400 font-medium">What did you ship this week?</p>
                        <Button variant="ghost" className="text-blue-500 text-sm mt-2">Log a Win →</Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {weeklyWins.map((win, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-2 group"
                            >
                                {win.completed ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : (
                                    <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-500 transition-colors" />
                                )}
                                <span className={`text-sm font-medium ${win.completed ? 'text-slate-300' : 'text-slate-500'}`}>
                                    {win.text}
                                </span>
                            </motion.div>
                        ))}

                        <div className="pt-4 border-t border-slate-800/50">
                            <Button variant="ghost" className="w-full justify-start gap-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 h-9">
                                <Plus className="w-4 h-4" /> Log a Win
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
