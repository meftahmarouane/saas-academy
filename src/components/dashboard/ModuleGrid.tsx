"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BookOpen, Lock, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const modules = [
    { id: 'ideation', title: 'Ideation', icon: '💡', slug: 'ideation' },
    { id: 'unitEconomics', title: 'Unit Economics', icon: '💰', slug: 'unit-economics' },
    { id: 'launch', title: 'Launch', icon: '🚀', slug: 'launch' },
    { id: 'scale', title: 'Scale', icon: '📈', slug: 'scale' },
];

export function ModuleGrid() {
    const { moduleProgress } = useUserStore();

    return (
        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800">
            <CardHeader>
                <CardTitle className="text-slate-200">Your Journey</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                {modules.map((mod, index) => {
                    const progress = moduleProgress[mod.id] || { completed: 0, lastLesson: '0' };
                    const isLocked = progress.locked;
                    const isCompleted = progress.completed >= 1;

                    return (
                        <motion.div
                            key={mod.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isLocked ? 'bg-slate-900/50 border-slate-800/50 grayscale' : 'bg-slate-800/20 border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/40'}`}
                        >
                            <div className={`p-3 rounded-xl text-xl ${isLocked ? 'bg-slate-800 text-slate-600' : 'bg-blue-500/10 text-white'}`}>
                                {mod.icon}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                        {mod.title}
                                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                    </h3>
                                    {!isLocked && (
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{Math.round(progress.completed * 100)}%</span>
                                    )}
                                </div>

                                {!isLocked ? (
                                    <ProgressBar value={progress.completed * 100} variant={isCompleted ? "emerald" : "blue"} className="h-1.5" />
                                ) : (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 italic">
                                        <Lock className="w-3 h-3" /> Locked (Complete {modules[index - 1]?.title || 'Previous'})
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center">
                                {isLocked ? (
                                    <Button size="sm" variant="ghost" disabled className="text-slate-600">
                                        <Lock className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Link href={`/modules/${mod.slug}`}>
                                        <Button size="sm" variant={progress.completed > 0 ? "secondary" : "default"} className="font-bold text-xs uppercase tracking-wider h-8 px-4">
                                            {progress.completed > 0 ? 'Resume' : 'Start'}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
