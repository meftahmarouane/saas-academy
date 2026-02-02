"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMPLATES = [
    {
        id: "cold",
        name: "Cold Outreach",
        subject: "Quick question about [Problem]",
        body: "Hi [Name],\n\nI noticed you're using [Competitor] for [Task].\n\nI'm building a tool that automates [Task] in half the time. \n\nMind if I send over a specific example of how it works?"
    },
    {
        id: "presale",
        name: "Presale Launch",
        subject: "Early access for [Product]",
        body: "Hi [Name],\n\nYou previously mentioned you hate [Problem].\n\nWe just opened early access slots for [Product]. It fixes [Problem] by [Solution].\n\nSince we spoke early, here is a 50% lifetime discount link: [Link]\n\nBest,\n[Founder]"
    }
];

export function EmailTemplates() {
    const [active, setActive] = useState(TEMPLATES[0]);
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(`Subject: ${active.subject}\n\n${active.body}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card>
            <CardContent className="p-0 flex flex-col md:flex-row h-[350px]">
                {/* Sidebar */}
                <div className="w-full md:w-1/3 border-r border-slate-800 bg-slate-900/50 p-4 space-y-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Templates</h3>
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActive(t)}
                            className={cn(
                                "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                active.id === t.id ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            )}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <div className="text-xs text-slate-500 uppercase">Subject Line</div>
                            <div className="font-medium text-slate-200">{active.subject}</div>
                        </div>
                        <Button size="sm" variant="outline" onClick={copy}>
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
                        </Button>
                    </div>

                    <div className="flex-1 bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap border border-slate-800 overflow-y-auto">
                        {active.body}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
