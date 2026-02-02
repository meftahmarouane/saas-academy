"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BrainCircuit } from "lucide-react";

interface Option {
    id: string;
    label: string;
    isCorrect?: boolean;
    feedback: string;
}

const scenario = {
    question: "Your CAC is $500 and LTV is $800 (1.6:1 ratio). You have 6 months of runway. What is the BEST immediate move?",
    options: [
        { id: "A", label: "Raise prices to increase LTV", isCorrect: true, feedback: "Correct! Increasing price directly boosts LTV without necessarily increasing CAC, fixing the ratio fastest." },
        { id: "B", label: "Spend more on ads to grow faster", isCorrect: false, feedback: "Risky. Your unit economics are broken. Scaling now just burns cash faster." },
        { id: "C", label: "Reduce churn significantly", isCorrect: false, feedback: "Good long term, but takes too long to impact LTV within your runway constraints." },
    ] as Option[],
};

export function DecisionScenario() {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelected(id);
    };

    const selectedOption = scenario.options.find((o) => o.id === selected);

    return (
        <Card variant="default" className="w-full max-w-md border-blue-500/30">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4" /> Decision Scenario
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-slate-200 font-medium leading-relaxed">
                    {scenario.question}
                </p>

                <div className="space-y-2">
                    {scenario.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            disabled={!!selected}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${selected === option.id
                                    ? option.isCorrect
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                                        : "bg-red-500/20 border-red-500/50 text-red-200"
                                    : selected
                                        ? "bg-slate-800/50 border-slate-700 opacity-50 cursor-not-allowed"
                                        : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:border-blue-500/50"
                                }`}
                        >
                            <span className="font-bold mr-2 text-slate-500">[{option.id}]</span> {option.label}
                        </button>
                    ))}
                </div>

                {selectedOption && (
                    <div className={`mt-4 p-3 rounded-lg text-sm animate-in fade-in zoom-in-95 ${selectedOption.isCorrect ? "bg-emerald-900/40 text-emerald-200" : "bg-red-900/40 text-red-200"
                        }`}>
                        <span className="font-bold">{selectedOption.isCorrect ? "✅ Correct:" : "❌ Incorrect:"}</span> {selectedOption.feedback}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
