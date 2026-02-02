"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FlaskConical, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Experiment {
    id: string;
    hypothesis: string;
    method: "Landing Page" | "Cold Email" | "Prototype";
    status: "Running" | "Success" | "Failed";
    result?: string;
}

export function ExperimentTracker() {
    const [experiments, setExperiments] = useState<Experiment[]>([
        { id: "1", hypothesis: "Dog walkers will pay $20/mo for scheduling", method: "Landing Page", status: "Success", result: "15 signups in 2 days" }
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newExp, setNewExp] = useState({ hypothesis: "", method: "Landing Page" });

    const addExperiment = () => {
        if (!newExp.hypothesis) return;
        setExperiments([
            ...experiments,
            { id: Date.now().toString(), hypothesis: newExp.hypothesis, method: newExp.method as any, status: "Running" }
        ]);
        setIsAdding(false);
        setNewExp({ hypothesis: "", method: "Landing Page" });
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <FlaskConical className="w-4 h-4" /> Experiment Tracker
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(!isAdding)}>
                    <Plus className="w-4 h-4" /> New
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {isAdding && (
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <input
                            placeholder="Hypothesis (e.g. Lawyers need better invoicing)"
                            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200"
                            value={newExp.hypothesis}
                            onChange={(e) => setNewExp({ ...newExp, hypothesis: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <select
                                className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200"
                                value={newExp.method}
                                onChange={(e) => setNewExp({ ...newExp, method: e.target.value })}
                            >
                                <option>Landing Page</option>
                                <option>Cold Email</option>
                                <option>Prototype</option>
                            </select>
                            <Button size="sm" onClick={addExperiment}>Admit</Button>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    {experiments.map(exp => (
                        <div key={exp.id} className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700/50 rounded-lg">
                            <div className="space-y-1">
                                <div className="font-medium text-slate-200 text-sm">{exp.hypothesis}</div>
                                <div className="flex gap-2 text-xs">
                                    <Badge variant="secondary" className="scale-90 origin-left">{exp.method}</Badge>
                                    {exp.result && <span className="text-slate-400">• {exp.result}</span>}
                                </div>
                            </div>
                            <Badge
                                variant={exp.status === 'Success' ? 'success' : exp.status === 'Failed' ? 'destructive' : 'warning'}
                            >
                                {exp.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
