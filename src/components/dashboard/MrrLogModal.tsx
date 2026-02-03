"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/user-store";

interface MrrLogModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MrrLogModal({ isOpen, onClose }: MrrLogModalProps) {
    const { updateMrr, currentMRR } = useUserStore();
    const [amount, setAmount] = useState<string>("");
    const [source, setSource] = useState<"new_customer" | "expansion" | "churn_recovery">("new_customer");
    const [note, setNote] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return;

        // In this implementation, currentMRR is the TOTAL, so we add the new amount
        // Wait, requirements say "Log Revenue", usually means add to existing OR set total.
        // Usually MRR is the current total. So if I get $100 new, it's current + 100.
        updateMrr(currentMRR + numAmount, source, note);
        onClose();
        setAmount("");
        setNote("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-md"
                    >
                        <Card className="bg-slate-900 border-slate-700 shadow-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Log Revenue</CardTitle>
                                <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Amount ($)</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="e.g. 150"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                            autoFocus
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Source</label>
                                        <select
                                            value={source}
                                            onChange={(e) => setSource(e.target.value as any)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                        >
                                            <option value="new_customer">New Customer</option>
                                            <option value="expansion">Expansion</option>
                                            <option value="churn_recovery">Churn Recovery</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Note (Optional)</label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Who was it? Any details?"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-24 resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500">
                                            Log Entry
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
