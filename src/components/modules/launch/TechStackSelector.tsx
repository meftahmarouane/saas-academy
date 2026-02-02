"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Code2, Layers, Check } from "lucide-react";

export function TechStackSelector() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0); // <0 = NoCode, >0 = Code
    const [result, setResult] = useState<string | null>(null);

    const questions = [
        { text: "Can you write a React component from scratch?", options: [{ label: "Yes, easily", val: 5 }, { label: "I can copy-paste", val: 1 }, { label: "No idea", val: -5 }] },
        { text: "Do you need complex database relationships?", options: [{ label: "Yes, many-to-many", val: 2 }, { label: "Standard CRUD", val: 0 }, { label: "Just a spreadsheet", val: -2 }] },
        { text: "Is SEO critical for your MVP?", options: [{ label: "Yes, #1 priority", val: 3 }, { label: "Maybe later", val: 0 }, { label: "No, it's a tool", val: -1 }] }
    ];

    const answer = (val: number) => {
        const newScore = score + val;
        setScore(newScore);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            recommend(newScore);
        }
    };

    const recommend = (finalScore: number) => {
        if (finalScore > 3) setResult("Next.js + Supabase + Tailwind");
        else if (finalScore > -3) setResult("Bubble.io or FlutterFlow");
        else setResult("Airtable + Softr (No-Code)");
    };

    return (
        <Card>
            <CardContent className="pt-6">
                {!result ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="text-xs text-slate-500 uppercase">Question {step + 1}/{questions.length}</div>
                            <h3 className="text-lg font-bold text-slate-200">{questions[step].text}</h3>
                        </div>
                        <div className="grid gap-3">
                            {questions[step].options.map((opt, i) => (
                                <Button key={i} variant="outline" className="justify-start h-auto py-3 px-4" onClick={() => answer(opt.val)}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs font-mono text-slate-500">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span>{opt.label}</span>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-900/50">
                            {score > 0 ? <Code2 className="w-8 h-8 text-white" /> : <Layers className="w-8 h-8 text-white" />}
                        </div>
                        <div>
                            <div className="text-sm text-slate-400">Your recommended stack</div>
                            <h2 className="text-2xl font-bold text-white mt-1">{result}</h2>
                        </div>
                        <Button onClick={() => { setStep(0); setScore(0); setResult(null); }} variant="ghost">Start Over</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
