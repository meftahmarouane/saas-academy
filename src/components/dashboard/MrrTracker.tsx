"use client";

import { useUserStore } from "@/store/user-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, Plus, Calendar, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import confetti from "canvas-confetti";
import { MrrLogModal } from "./MrrLogModal";

export function MrrTracker() {
    const { currentMRR, mrrGoal, mrrHistory, updateMrr } = useUserStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const progress = (currentMRR / mrrGoal) * 100;

    // Sort history by date for the chart
    const chartData = [...mrrHistory]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(log => ({
            date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            amount: log.amount
        }));


    return (
        <Card className="h-full bg-slate-900/50 backdrop-blur-xl border-emerald-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-slate-200">Live MRR Tracker</CardTitle>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">Goal: ${mrrGoal.toLocaleString()} (June 2025)</p>
                </div>
                <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-2 py-1 gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +$50 this week
                </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-50 tracking-tight">${currentMRR.toLocaleString()}</span>
                    <span className="text-slate-500 font-medium">/ 25% of goal</span>
                </div>

                <div className="space-y-3">
                    <ProgressBar value={progress} variant="emerald" className="h-3 bg-slate-800" />
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        <span>$0</span>
                        <span>Projection: $1k by March</span>
                        <span>$1,000</span>
                    </div>
                </div>

                <div className="h-[120px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                itemStyle={{ color: '#10b981' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#mrrGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button onClick={() => setIsModalOpen(true)} className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-900/20">
                        <Plus className="w-4 h-4" /> Log Revenue
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2 border-slate-700 text-slate-300 hover:bg-slate-800">
                        Details <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>

                <MrrLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </CardContent>
        </Card>
    );
}
