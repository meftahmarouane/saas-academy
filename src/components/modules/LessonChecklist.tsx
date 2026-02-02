"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
    id: string;
    text: string;
}

interface LessonChecklistProps {
    items: ChecklistItem[];
    title?: string;
}

export function LessonChecklist({ items, title = "Action Items" }: LessonChecklistProps) {
    const [checked, setChecked] = useState<string[]>([]);

    const toggle = (id: string) => {
        setChecked(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const progress = Math.round((checked.length / items.length) * 100);

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-200">{title}</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {progress}% Complete
                </span>
            </div>

            <div className="space-y-2">
                {items.map((item) => {
                    const isChecked = checked.includes(item.id);
                    return (
                        <div
                            key={item.id}
                            onClick={() => toggle(item.id)}
                            className={cn(
                                "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all border",
                                isChecked
                                    ? "bg-blue-500/10 border-blue-500/20"
                                    : "bg-slate-800/50 border-transparent hover:bg-slate-800"
                            )}
                        >
                            <div className={cn("mt-0.5", isChecked ? "text-blue-400" : "text-slate-500")}>
                                {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                            </div>
                            <span className={cn("text-sm transition-colors", isChecked ? "text-slate-200 line-through opacity-70" : "text-slate-300")}>
                                {item.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
