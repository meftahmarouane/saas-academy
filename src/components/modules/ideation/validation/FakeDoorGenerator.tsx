"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LayoutTemplate, Eye } from "lucide-react";

export function FakeDoorGenerator() {
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [cta, setCta] = useState("Join Waitlist");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <LayoutTemplate className="w-4 h-4" /> 1. Configure Landing Page
                    </h3>

                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">Product Name</label>
                        <input
                            value={name} onChange={e => setName(e.target.value)}
                            placeholder="e.g. TurboTax for Dog Walkers"
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">Value Prop (Headline)</label>
                        <input
                            value={headline} onChange={e => setHeadline(e.target.value)}
                            placeholder="e.g. Save 10 hours a week on scheduling"
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-slate-500">CTA Text</label>
                        <input
                            value={cta} onChange={e => setCta(e.target.value)}
                            className="w-full bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Preview */}
            <div className="border border-slate-700 rounded-xl overflow-hidden bg-white h-[300px] flex flex-col relative">
                <div className="bg-slate-100 border-b border-slate-200 p-2 flex items-center gap-2 px-4">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="mx-auto text-[10px] text-slate-400 font-mono bg-white px-2 py-0.5 rounded-sm shadow-sm opacity-50">
                        {name ? name.toLowerCase().replace(/\s/g, '') + '.com' : 'example.com'}
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-white">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900">
                            {headline || "Your Value Prop Here"}
                        </h1>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">
                            Stop struggling with the old way. We are building the future of X.
                        </p>
                    </div>

                    <div className="flex gap-2 w-full max-w-xs">
                        <input disabled placeholder="email@address.com" className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm bg-slate-50" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
                            {cta}
                        </button>
                    </div>

                    <p className="text-[10px] text-slate-400">Powered by SaaS-500K</p>
                </div>

                <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Preview
                </div>
            </div>
        </div>
    );
}
