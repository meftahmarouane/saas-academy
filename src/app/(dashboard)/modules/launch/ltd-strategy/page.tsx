"use client";

import { PricingCalculator } from "@/components/modules/launch/PricingCalculator";
import { LessonChecklist } from "@/components/modules/LessonChecklist";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export default function LtdStrategyPage() {
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
                        <Badge variant="info" className="mb-2">Launch Module: Lesson 2</Badge>
                        <h1 className="text-3xl font-bold text-slate-50">The Lifetime Deal (LTD) Strategy</h1>
                        <p className="text-slate-400 mt-2 max-w-2xl">
                            Get cash upfront to fund development. The goal is $10k in 7 days.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                        <div className="text-center px-4 border-r border-slate-800">
                            <div className="text-xs text-slate-500 uppercase">XP Reward</div>
                            <div className="text-xl font-bold text-blue-400">+400</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Section 1: Pricing */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        Set Your Price
                    </h2>
                    <p className="text-slate-400">
                        Don't charge $5 for life. Use your target monthly price to calculate sustainable LTD tiers.
                    </p>
                    <PricingCalculator />
                </section>

                {/* Section 2: Timeline */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-100 flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        The 7-Day Launch Sequence
                    </h2>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                        {[
                            { day: "Day 1", task: "Email Waitlist + Open Cart (50% off for 48h)" },
                            { day: "Day 3", task: "Social Proof Blast (Share first testimonials)" },
                            { day: "Day 5", task: "FAQ / Objection Handling Email" },
                            { day: "Day 7", task: "Close Cart Warning (Price increases at midnight)" }
                        ].map(d => (
                            <div key={d.day} className="flex gap-4 items-start">
                                <div className="font-bold text-blue-400 w-12 shrink-0">{d.day}</div>
                                <div className="text-slate-300 text-sm">{d.task}</div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Completion */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <h3 className="font-bold text-slate-200 mb-2">Ready to Launch?</h3>
                        <Link href="/dashboard">
                            <Button size="lg" className="w-full sm:w-auto" onClick={() => addXp(400)}>
                                Finish Lesson <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div>
                    <LessonChecklist
                        title="Launch Checklist"
                        items={[
                            { id: "1", text: "Stripe Coupons Created" },
                            { id: "2", text: "Emails Scheduled (ConvertKit/MailerLite)" },
                            { id: "3", text: "Terms of Service (No Refunds > 30 days)" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
