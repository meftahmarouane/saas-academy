"use client";

import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Activity, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function SurvivalPage() {
    const { addXp } = useUserStore();

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">

            {/* Header */}
            <div className="space-y-4">
                <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <Badge variant="destructive" className="mb-2">Launch Module: Lesson 3</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">0 to $1K Survival Mode</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            The hardest phase. Your only job is to talk to users and fix bugs.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+1000</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Section 1: Daily Log */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        The Daily Accountability Log
                    </h2>
                    <p className="text-slate-400">
                        Every day, you must answer these 3 questions. If the answer is "0", you are dying.
                    </p>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-slate-500 font-bold">1. Who did you talk to today?</label>
                            <input className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm text-slate-200" placeholder="e.g. John from Twitter" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-slate-500 font-bold">2. What did you ship?</label>
                            <input className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm text-slate-200" placeholder="e.g. Fixed login bug" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-slate-500 font-bold">3. One thing you learned?</label>
                            <input className="w-full bg-slate-800 border-slate-700 rounded px-3 py-2 text-sm text-slate-200" placeholder="e.g. Users don't understand the pricing" />
                        </div>
                        <Button className="w-full" variant="secondary">Log Day</Button>
                    </div>
                </section>

                {/* Section 2: Churn Warning */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        Churn Early Warning System
                    </h2>
                    <div className="flex gap-4">
                        <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">Active Users</div>
                                <div className="text-xl font-bold text-white">12</div>
                            </div>
                        </div>
                        <div className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                                <TrendingDown className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">At Risk</div>
                                <div className="text-xl font-bold text-white">2</div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Completion */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <h3 className="font-bold text-slate-200 mb-2">You Made It.</h3>
                        <p className="text-slate-400 mb-4 text-sm">
                            Reaching $1K MRR is harder than reaching $10K. Keep grinding.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => addXp(1000)}>
                                Complete Academy Beta <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div>
                    <LessonChecklist
                        title="Survival Habits"
                        items={[
                            { id: "1", text: "Answer support tickets < 1 hour" },
                            { id: "2", text: "Onboard every new user manually" },
                            { id: "3", text: "Celebrate every $10 MRR" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
