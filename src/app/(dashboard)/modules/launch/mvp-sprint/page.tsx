"use client";

import { SprintTracker } from "@/components/modules/launch/SprintTracker";
import { TechStackSelector } from "@/components/modules/launch/TechStackSelector";
import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function MvpSprintLessonPage() {
    const { addXp } = useUserStore();

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">

            {/* Header */}
            <div className="space-y-4">
                <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <Badge variant="info" className="mb-2">Launch Module: Lesson 1</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">The 6-Week MVP Sprint</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Stop building endlessly. You have 6 weeks to ship or kill the project.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+500</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12">

                {/* Section 1: Tech Stack */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        Choose Your Weapons
                    </h2>
                    <p className="text-slate-400">
                        Don't use Kubernetes for a landing page. Answer these 3 questions to find your ideal stack.
                    </p>
                    <div className="max-w-2xl">
                        <TechStackSelector />
                    </div>
                </section>

                {/* Section 2: Timeline */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        The Schedule
                    </h2>
                    <p className="text-slate-400">
                        If it's not on the list, you don't build it. Strict deadline.
                    </p>
                    <SprintTracker />
                </section>

            </div>

            {/* Completion */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <h3 className="font-bold text-slate-200 mb-2">Ready to ship?</h3>
                        <p className="text-slate-400 mb-4 text-sm">
                            Mark this lesson complete only when you have defined your stack and started Week 1.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => addXp(500)}>
                                Finish Lesson <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div>
                    <LessonChecklist
                        title="Sprint Rules"
                        items={[
                            { id: "1", text: "No new features after Week 3" },
                            { id: "2", text: "Deploy to production on Day 1" },
                            { id: "3", text: "Talk to users every Friday" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
