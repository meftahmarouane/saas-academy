"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lightbulb, TrendingUp } from "lucide-react";

export function IdeaScoreCalculator() {
    const [market, setMarket] = useState(5);
    const [advantage, setAdvantage] = useState(5);
    const [wtp, setWtp] = useState(5);

    const score = market * advantage * wtp;
    const maxScore = 1000;

    // Rating: 
    // < 100: Bad
    // 100-300: Okay
    // 300-600: Good
    // > 600: Unicorn/Great

    const getRating = (s: number) => {
        if (s < 125) return { label: "Don't build", color: "text-red-400", bg: "bg-red-500/10" };
        if (s < 343) return { label: "Meh...", color: "text-amber-400", bg: "bg-amber-500/10" };
        if (s < 729) return { label: "Promising!", color: "text-blue-400", bg: "bg-blue-500/10" };
        return { label: "BUILD THIS NOW", color: "text-emerald-400", bg: "bg-emerald-500/10" };
    };

    const rating = getRating(score);

    return (
        <Card variant="glass" className="w-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Idea Score Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">Market Size</span>
                            <span className="text-slate-400">{market}/10</span>
                        </div>
                        <input
                            type="range" min="1" max="10"
                            value={market} onChange={(e) => setMarket(Number(e.target.value))}
                            className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">Unfair Advantage</span>
                            <span className="text-slate-400">{advantage}/10</span>
                        </div>
                        <input
                            type="range" min="1" max="10"
                            value={advantage} onChange={(e) => setAdvantage(Number(e.target.value))}
                            className="w-full accent-violet-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-300">Willingness to Pay</span>
                            <span className="text-slate-400">{wtp}/10</span>
                        </div>
                        <input
                            type="range" min="1" max="10"
                            value={wtp} onChange={(e) => setWtp(Number(e.target.value))}
                            className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className={`p-4 rounded-xl flex items-center justify-between ${rating.bg} border border-slate-700/50`}>
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Total Score</div>
                        <div className="text-3xl font-bold text-slate-100">{score}</div>
                    </div>
                    <div className="text-right">
                        <div className={`text-lg font-bold ${rating.color}`}>{rating.label}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
