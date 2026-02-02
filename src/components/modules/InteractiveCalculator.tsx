"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react";

export function LtvCacCalculator() {
    const [cac, setCac] = useState<number | string>("");
    const [ltv, setLtv] = useState<number | string>("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const c = Number(cac);
        const l = Number(ltv);
        if (c > 0 && l > 0) {
            setResult(Number((l / c).toFixed(1)));
        }
    };

    const status = result
        ? result >= 3
            ? "healthy"
            : result >= 1
                ? "warning"
                : "danger"
        : "neutral";

    return (
        <Card variant="glass" className="w-full max-w-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Interactive Calculator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500">CAC ($)</label>
                        <input
                            type="number"
                            value={cac}
                            onChange={(e) => setCac(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500">LTV ($)</label>
                        <input
                            type="number"
                            value={ltv}
                            onChange={(e) => setLtv(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                            placeholder="1500"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full" size="sm">
                    Calculate Ratio
                </Button>

                {result !== null && (
                    <div className={`mt-4 p-3 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 ${status === "healthy" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" :
                            status === "warning" ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" :
                                "bg-red-500/10 border border-red-500/20 text-red-400"
                        }`}>
                        <div className="flex items-center gap-2">
                            {status === "healthy" && <CheckCircle2 className="w-5 h-5" />}
                            {status !== "healthy" && <AlertTriangle className="w-5 h-5" />}
                            <span className="font-bold text-lg">{result}:1</span>
                        </div>
                        <span className="text-xs font-medium">
                            {status === "healthy" ? "Healthy! LTV > 3x CAC" : status === "warning" ? "Cautious. Aim for 3:1" : "Unsustainable."}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
