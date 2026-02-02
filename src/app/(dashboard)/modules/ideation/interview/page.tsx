"use client";

import { InterviewSimulator } from "@/components/modules/ideation/InterviewSimulator";
import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function InterviewLessonPage() {
    const { addXp } = useUserStore();

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">

            {/* Header */}
            <div className="space-y-4">
                <Link href="/modules/ideation" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Ideation
                </Link>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <Badge variant="info" className="mb-2">Lesson 2</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">The Mom Test Simulator</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Practice asking unbiased questions. Your goal: Get them to complain about a specific problem without you pitching a solution.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+200</div>
                        </div>
                    </div>
                </div>
            </div>

            <InterviewSimulator />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-200">Key Takeaways</h3>
                    <ul className="space-y-2 list-disc list-inside text-slate-400">
                        <li>Don't ask "Would you use this?" (They will lie).</li>
                        <li>Ask "When was the last time you did [task]?"</li>
                        <li>Ask "How much did you pay to solve it?"</li>
                    </ul>

                    <div className="pt-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => addXp(200)}>
                                Finish Lesson <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div>
                    <LessonChecklist
                        title="Simulator Targets"
                        items={[
                            { id: "1", text: "Identify the persona's top pain point" },
                            { id: "2", text: "Discover their current solution (Excel?)" },
                            { id: "3", text: "Find out their budget constraint" },
                            { id: "4", text: "Avoid pitching until the end" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
