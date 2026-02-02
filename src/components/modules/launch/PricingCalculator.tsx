"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DollarSign } from "lucide-react";

export function PricingCalculator() {
    const [monthlyCost, setMonthlyCost] = useState(50); // Hosting etc
    const [margin, setMargin] = useState(80); // %
    const [goal, setGoal] = useState(10000); // Raise goal

    // Rough math: 
    // Lifetime Cost Estimate (2 years) = cost * 24
    // Min Price = LTV Cost / (1 - margin)
    // Users needed = Goal / Price

    // Simplification for LTD:
    // Suggest 3 tiers.

    const basePrice = Math.round((monthlyCost * 24) * (1 + (margin / 100)));
    // This logic is flawed for "marginal cost", but for "hosting cost allocation" it's a safe bet.
    // Better logic: Competitor Price * 10 = Lifetime Value?
    // Let's us a simple "Cashflow Multiplier".
    // "One time payment equal to 12 months of SaaS"

    const tier1 = Math.round(monthlyCost * 12); // "Yearly equivalent"
    const tier2 = Math.round(monthlyCost * 24); // "2 Year equivalent"
    const tier3 = Math.round(monthlyCost * 36); // "3 Year equivalent"

    return (
        <Card variant="interactive">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> LTD Pricing Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">Typical Monthly Price ($)</label>
                        <input
                            type="number"
                            value={monthlyCost} onChange={e => setMonthlyCost(Number(e.target.value))}
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">Launch Goal ($)</label>
                        <input
                            type="number"
                            value={goal} onChange={e => setGoal(Number(e.target.value))}
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recommended Tiers</h4>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-slate-900 rounded">
                                <div className="text-xs text-slate-400">Starter</div>
                                <div className="font-bold text-xl text-blue-400">${tier1}</div>
                                <div className="text-[10px] text-slate-600">Need {Math.ceil(goal / tier1)} sales</div>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-blue-500/30 shadow-lg shadow-blue-900/20">
                                <div className="text-xs text-blue-300">Pro (Best)</div>
                                <div className="font-bold text-xl text-white">${tier2}</div>
                                <div className="text-[10px] text-slate-500">Need {Math.ceil(goal / tier2)} sales</div>
                            </div>
                            <div className="p-2 bg-slate-900 rounded">
                                <div className="text-xs text-slate-400">Agency</div>
                                <div className="font-bold text-xl text-violet-400">${tier3}</div>
                                <div className="text-[10px] text-slate-600">Need {Math.ceil(goal / tier3)} sales</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
