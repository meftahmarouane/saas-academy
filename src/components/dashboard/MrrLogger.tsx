"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/store/user-store";
import { logMrr } from "@/lib/actions";
import { Badge } from "@/components/ui/Badge";
import { Loader2, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { triggerMoneyConfetti } from "@/lib/confetti";

export function MrrLogger() {
    const { id: userId, updateMrr } = useUserStore();
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState<'new' | 'expansion' | 'churn'>('new');
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const val = parseFloat(amount);
        if (isNaN(val) || val <= 0) return;

        // Mock Logic for Dev
        if (!userId || userId.startsWith('mock-')) {
            setTimeout(() => {
                // For mock, we just want to see the UI update. 
                // The store updateMrr sets the TOTAL, so we need to calculate it manually or change store logic.
                // Assuming for now updateMrr sets the absolute value, but let's just pretend we fetched the new total.
                // In a real app the server returns the new total.
                alert("Simulating Log: " + category + " $" + val);
                setLoading(false);
                setAmount("");
            }, 500);
            return;
        }

        const res = await logMrr(userId, val, category, note);

        if (res.error) {
            alert("Error: " + res.error);
        } else if (res.newMrr !== undefined) {
            updateMrr(res.newMrr);
            if (category === 'new' || category === 'expansion') {
                triggerMoneyConfetti();
            }
            setAmount("");
            setNote("");
        }

        setLoading(false);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm uppercase text-slate-400">
                    <TrendingUp className="w-4 h-4" /> Log Revenue
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                                placeholder="100"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-500">Type</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                                className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                            >
                                <option value="new">New Business</option>
                                <option value="expansion">Expansion</option>
                                <option value="churn">Churn</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">Note (Optional)</label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                            placeholder="Customer name, deal details..."
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading} variant={category === 'churn' ? 'danger' : 'default'}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                        Log Transaction
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
