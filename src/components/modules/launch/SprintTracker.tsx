"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle2, Circle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const SPRINT_WEEKS = [
    { week: 1, title: "Foundation", items: ["Setup Repo & Auth", "Database Schema", "Landing Page Skeleton"] },
    { week: 2, title: "Core Feature 1", items: ["Build the 'One Thing'", "Manual Onboarding Flow", "Stripe Integration (Test Mode)"] },
    { week: 3, title: "Core Feature 2", items: ["Secondary value prop", "User Settings", "Email Notifications"] },
    { week: 4, title: "Polish & content", items: ["Empty States", "Loading Skeletons", "Help Docs / Loom Videos"] },
    { week: 5, title: "Alpha Test", items: ["Onboard 5 friends", "Fix critical bugs", "Collect testimonials"] },
    { week: 6, title: "Launch Week", items: ["Switch Stripe to Live", "Post on Product Hunt", "Email Waitlist"] }
];

export function SprintTracker() {
    const [checked, setChecked] = useState<string[]>([]);

    const toggle = (id: string) => {
        setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SPRINT_WEEKS.map((w) => (
                <Card key={w.week} className="border-slate-800 bg-slate-900/30">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-slate-300 flex justify-between">
                            <span>Week {w.week}: {w.title}</span>
                            <Calendar className="w-4 h-4 text-slate-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {w.items.map((item, i) => {
                            const id = `w${w.week}-${i}`;
                            const isChecked = checked.includes(id);
                            return (
                                <div
                                    key={id}
                                    onClick={() => toggle(id)}
                                    className={cn(
                                        "flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-800 p-1.5 rounded transition-colors"
                                    )}
                                >
                                    {isChecked
                                        ? <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                                        : <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                                    }
                                    <span className={isChecked ? "text-slate-500 line-through" : "text-slate-400"}>
                                        {item}
                                    </span>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
