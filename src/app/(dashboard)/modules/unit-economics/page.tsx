"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Clock, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { LtvCacCalculator } from "@/components/modules/InteractiveCalculator";
import { DecisionScenario } from "@/components/modules/DecisionScenario";

export default function UnitEconomicsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">

            {/* Module Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/dashboard" className="hover:text-slate-300">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-300">Module 3: Unit Economics</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-50 mb-2">Unit Economics Mastery</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-slate-400">
                                <Star className="w-4 h-4 text-yellow-500" /> 450 XP
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                                <Clock className="w-4 h-4" /> 25 min
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                                <Trophy className="w-4 h-4 text-indigo-400" /> Level 5 Req
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Progress</span>
                            <span>75%</span>
                        </div>
                        <ProgressBar value={75} variant="blue" className="h-2" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-slate-800" />

            {/* Lesson Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                {/* Left Column: Theory & Calculator */}
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-100">Why LTV:CAC Matters</h2>
                        <p className="text-slate-400 leading-relaxed">
                            The ratio of Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) is the pulse of your SaaS.
                            If it's below 1, you're losing money on every sale. If it's above 3, you have a money printing machine.
                        </p>
                        <Card className="bg-blue-900/20 border-blue-900/50 p-4">
                            <p className="text-blue-200 text-sm font-medium">
                                💡 Rule of Thumb: Target a ratio of 3:1 or higher.
                            </p>
                        </Card>
                    </section>

                    <LtvCacCalculator />
                </div>

                {/* Right Column: Scenarios */}
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-100">Test Your Knowledge</h2>
                        <p className="text-slate-400 leading-relaxed">
                            You're the founder. A crisis hits. What's your move?
                        </p>
                    </section>

                    <DecisionScenario />

                    <Card className="border-slate-800 bg-slate-900/50">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <div className="font-semibold text-slate-200">Complete Lesson</div>
                                <div className="text-xs text-slate-500">Claim your 50 XP</div>
                            </div>
                            <Button variant="default" size="sm">Mark Complete</Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
