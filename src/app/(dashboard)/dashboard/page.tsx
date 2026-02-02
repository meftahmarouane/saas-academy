"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Flame, Target, TrendingUp, Play, CheckCircle2, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
import { MrrLogger } from "@/components/dashboard/MrrLogger";
import { NotificationWidget } from "@/components/dashboard/NotificationWidget";

export default function DashboardPage() {
    const {
        current_streak,
        level,
        current_mrr,
        target_mrr
    } = useUserStore();

    const mrrProgress = (current_mrr / target_mrr) * 100;
    const greeting = "Good Morning, Alex!"; // TODO: Dynamic time-based greeting

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                        <span className=" bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                            {level} Lvl 7
                        </span>
                        <span className="flex items-center gap-1 text-orange-400 font-medium">
                            <Flame className="w-4 h-4 fill-orange-500/20" /> {current_streak} Day Streak
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-50">{greeting}</h1>
                </div>
                <div className="flex gap-3">
                    {/* Quick Actions if needed */}
                </div>
            </div>

            {/* Main Focus Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Today's Focus - Spans 2 cols */}
                <Card variant="interactive" className="lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Target className="w-32 h-32" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-400 uppercase text-sm tracking-wider">
                            <Target className="w-4 h-4" /> Today's Focus
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-100 mb-2">Unit Economics: LTV/CAC Ratio</h2>
                            <p className="text-slate-400 max-w-lg">
                                You're 75% through Module 3. Complete the interactive calculator to unlock the "Scale Master" badge.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-blue-400">75%</span>
                            </div>
                            <ProgressBar value={75} variant="blue" className="h-2" />
                        </div>

                        <div className="pt-2">
                            <Link href="/modules/unit-economics">
                                <Button size="lg" className="w-full sm:w-auto gap-2">
                                    Pick up where you left off <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Win / Suggestion */}
                <Card variant="glass" className="h-full flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-violet-400 uppercase text-sm tracking-wider flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Quick Win
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-slate-300 font-medium">Calculate your target Runway</p>
                        <p className="text-xs text-slate-500">
                            Determine exactly when you need to raise or reach profitability. Takes ~5 mins.
                        </p>
                        <Button variant="secondary" className="w-full" size="sm">
                            Start Activity (5m)
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Stats & Progress Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* MRR Tracker */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-slate-200">MRR Tracker</CardTitle>
                        <Badge variant="success" className="gap-1">
                            <TrendingUp className="w-3 h-3" /> +12%
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-50">${current_mrr.toLocaleString()}</span>
                                <span className="text-slate-500 text-sm">/ ${target_mrr.toLocaleString()} goal</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Current monthly recurring revenue</p>
                        </div>

                        <div className="space-y-2">
                            <ProgressBar value={mrrProgress} variant="emerald" showLabel />
                        </div>

                        <Button variant="outline" className="w-full">View History (Coming Soon)</Button>
                    </CardContent>
                </Card>

                {/* Log Revenue Widget */}
                <MrrLogger />

                {/* Notification Widget */}
                <NotificationWidget />

                {/* Active Modules Block */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-slate-200">Active Modules</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { name: "Fundamentals", progress: 80, status: "Resume", href: "/dashboard" },
                            { name: "Ideation", progress: 60, status: "Resume", href: "/modules/ideation" },
                            { name: "Launch", progress: 30, status: "Resume", href: "/modules/launch/mvp-sprint" },
                        ].map((mod) => (
                            <Link href={mod.href} key={mod.name}>
                                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
                                    <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-blue-400 transition-colors">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-slate-200">{mod.name}</span>
                                            <span className="text-xs text-slate-500">{mod.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-600 group-hover:bg-blue-500 transition-colors"
                                                style={{ width: `${mod.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

