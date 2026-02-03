"use client";

import { CompetitorFinder } from "@/components/modules/ideation/CompetitorFinder";
import { ExperimentTracker } from "@/components/modules/ideation/validation/ExperimentTracker";
import { IdeaScoreCalculator } from "@/components/modules/ideation/IdeaScoreCalculator";
import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function IdeationModulePage() {
    const { addXp, level } = useUserStore();

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">

            {/* Header */}
            <div className="space-y-4">
                <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <Badge variant="info" className="mb-2">Module 1: Ideation</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">The Boring SaaS Method</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Stop trying to invent the next iPhone. Instead, find ugly, profitable software in niche markets and build a better version.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+150</div>
                        </div>
                        <div className="text-center px-4">
                            <div className="text-xs text-slate-500 uppercase">Est. Time</div>
                            <div className="text-xl font-bold text-slate-200">15m</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Step 1 */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            Find a Slow, Ugly Competitor
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Your goal is to find software that looks like it was built in 2005 but is still making money.
                            Use our "Ugly Finder" tool below to simulate researching a niche.
                        </p>
                        <CompetitorFinder />
                    </section>

                    {/* Step 2 */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            Validate the Idea Score
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Don't fall in love with an idea. Score it ruthlessly.
                            High willingness to pay + High market advantage = Success.
                        </p>
                        <IdeaScoreCalculator />
                    </section>

                    {/* Step 3 */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            Run Cheap Experiments
                        </h2>
                        <p className="text-slate-400 leading-relaxed">
                            Before writing code, validate your hypothesis. If you can't get 10 people to reply to an email, you won't get them to pay for software.
                        </p>
                        <ExperimentTracker />
                    </section>

                    {/* Conclusion */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                        <h3 className="font-bold text-slate-200 mb-2">Ready to move on?</h3>
                        <p className="text-slate-400 mb-4 text-sm">
                            Check your action items on the right to complete this lesson.
                        </p>
                        <Button className="w-full sm:w-auto" onClick={() => addXp(150)}>
                            Mark Lesson Complete <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    <LessonChecklist
                        items={[
                            { id: "1", text: "Find 3 ugly competitors in your niche" },
                            { id: "2", text: "Read their negative G2/Capterra reviews" },
                            { id: "3", text: "Calculate Idea Score (Must be > 300)" },
                            { id: "4", text: "Confirm they make > $10K MRR" },
                            { id: "5", text: "Draft your 'We are X but faster' pitch" }
                        ]}
                    />

                    <Card className="bg-gradient-to-br from-violet-900/20 to-blue-900/20 border-violet-500/20">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-violet-400 mt-1" />
                                <div>
                                    <h4 className="font-bold text-violet-100 text-sm">Founder Tip</h4>
                                    <p className="text-xs text-violet-200/70 mt-1 leading-relaxed">
                                        "Competition is validation. If no one is solving this problem, maybe it's not a problem worth solving."
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
