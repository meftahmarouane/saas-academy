"use client";

import { ExperimentTracker } from "@/components/modules/ideation/validation/ExperimentTracker";
import { FakeDoorGenerator } from "@/components/modules/ideation/validation/FakeDoorGenerator";
import { EmailTemplates } from "@/components/modules/ideation/validation/EmailTemplates";
import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function ValidationLessonPage() {
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
                        <Badge variant="info" className="mb-2">Lesson 3</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">Validation Experiments</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Don't build until they buy. Use "Smoke Tests" and "Fake Doors" to prove demand with $0 spent.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+300</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12">

                {/* Section 1: Track Experiments */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        The Experiment Log
                    </h2>
                    <p className="text-slate-400">
                        Treat your startup like a science lab. Write down your hypothesis BEFORE you run the test.
                    </p>
                    <ExperimentTracker />
                </section>

                {/* Section 2: Fake Door */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        The "Fake Door" Generator
                    </h2>
                    <p className="text-slate-400">
                        Create a simple landing page that promises the value. If they give you an email, they want it.
                    </p>
                    <FakeDoorGenerator />
                </section>

                {/* Section 3: Cold Outreach */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        Pre-Sale Scripts
                    </h2>
                    <p className="text-slate-400">
                        Don't know what to write? Use these proven templates to get your first 10 calls.
                    </p>
                    <EmailTemplates />
                </section>

            </div>

            {/* Completion */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-6 rounded-xl border border-emerald-500/20">
                        <h3 className="font-bold text-slate-100 mb-2">You finished the Ideation Module! 🚀</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            You have validated your idea, found competitors, and even pre-sold a few users (hopefully).
                            Next stop: The MVP Sprint.
                        </p>
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => addXp(300)}>
                                Complete Module & Return Home <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div>
                    <LessonChecklist
                        title="Validation Criteria"
                        items={[
                            { id: "1", text: "Log at least 3 hypotheses" },
                            { id: "2", text: "Get 10 signups on a Fake Door page" },
                            { id: "3", text: "Send 20 cold emails / DMs" },
                            { id: "4", text: "Get ONE strangers verbal commitment" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
