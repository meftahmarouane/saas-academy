"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FlaskConical, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface Experiment {
    id: string;
    hypothesis: string;
    method: "Landing Page" | "Cold Email" | "Prototype";
    status: "Running" | "Success" | "Failed";
    result?: string;
}

export function ExperimentTracker() {
    const [experiments, setExperiments] = useState<Experiment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newExp, setNewExp] = useState({ hypothesis: "", method: "Landing Page" });

    useEffect(() => {
        fetchExperiments();
    }, []);

    const fetchExperiments = async () => {
        try {
            const { data, error } = await supabase
                .from('experiments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setExperiments(data as unknown as Experiment[]);
        } catch (error) {
            console.error('Error fetching experiments:', error);
        } finally {
            setLoading(false);
        }
    };

    const addExperiment = async () => {
        if (!newExp.hypothesis) return;

        // Optimistic update
        const tempId = Date.now().toString();
        const optimisticExp: Experiment = {
            id: tempId,
            hypothesis: newExp.hypothesis,
            method: newExp.method as any,
            status: "Running"
        };

        setExperiments([optimisticExp, ...experiments]);
        setIsAdding(false);
        setNewExp({ hypothesis: "", method: "Landing Page" });

        try {
            const { data, error } = await supabase
                .from('experiments')
                .insert([
                    {
                        hypothesis: newExp.hypothesis,
                        method: newExp.method,
                        status: "Running"
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            // Replace optimistic with real
            if (data) {
                setExperiments(prev => prev.map(exp =>
                    exp.id === tempId ? (data as unknown as Experiment) : exp
                ));
            }
        } catch (error) {
            console.error('Error adding experiment:', error);
            // Revert on error
            setExperiments(prev => prev.filter(exp => exp.id !== tempId));
        }
    };

    const updateStatus = async (id: string, newStatus: "Running" | "Success" | "Failed") => {
        // Optimistic update
        setExperiments(prev => prev.map(exp =>
            exp.id === id ? { ...exp, status: newStatus } : exp
        ));

        try {
            const { error } = await supabase
                .from('experiments')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating status:', error);
            // Revert could be implemented here by refetching
            fetchExperiments();
        }
    };

    return (
        <Card className="w-full border-slate-800 bg-slate-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-violet-400" /> Experiment Tracker
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setIsAdding(!isAdding)} className="h-8 w-8 p-0">
                    <Plus className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {isAdding && (
                    <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <input
                            placeholder="Hypothesis (e.g. Lawyers need better invoicing)"
                            className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
                            value={newExp.hypothesis}
                            onChange={(e) => setNewExp({ ...newExp, hypothesis: e.target.value })}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <select
                                className="bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
                                value={newExp.method}
                                onChange={(e) => setNewExp({ ...newExp, method: e.target.value })}
                            >
                                <option>Landing Page</option>
                                <option>Cold Email</option>
                                <option>Prototype</option>
                            </select>
                            <Button size="sm" onClick={addExperiment} className="bg-violet-600 hover:bg-violet-700">Add Experiment</Button>
                        </div>
                    </div>
                )}

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {loading ? (
                        <div className="text-center py-8 text-slate-500 text-sm">Loading experiments...</div>
                    ) : experiments.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-800 rounded-lg">
                            No experiments yet. Click + to start validating.
                        </div>
                    ) : (
                        experiments.map(exp => (
                            <div key={exp.id} className="group flex items-center justify-between p-3 bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all rounded-lg">
                                <div className="space-y-1">
                                    <div className="font-medium text-slate-200 text-sm">{exp.hypothesis}</div>
                                    <div className="flex gap-2 text-xs items-center">
                                        <Badge variant="outline" className="text-slate-400 border-slate-700 bg-slate-900/50">{exp.method}</Badge>
                                        <span className="text-slate-600 text-[10px]">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {exp.status === 'Running' ? (
                                        <div className="flex gap-1">
                                            <Button
                                                size="sm" variant="ghost" className="h-6 w-6 p-0 hover:text-green-400 hover:bg-green-400/10"
                                                onClick={() => updateStatus(exp.id, 'Success')}
                                                title="Mark as Success"
                                            >
                                                <Check className="w-3 h-3" />
                                            </Button>
                                            <Button
                                                size="sm" variant="ghost" className="h-6 w-6 p-0 hover:text-red-400 hover:bg-red-400/10"
                                                onClick={() => updateStatus(exp.id, 'Failed')}
                                                title="Mark as Failed"
                                            >
                                                <X className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Badge
                                            className={cn(
                                                exp.status === 'Success' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    exp.status === 'Failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            )}
                                        >
                                            {exp.status}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
