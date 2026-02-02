"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, ExternalLink, Loader2 } from "lucide-react";

export function CompetitorFinder() {
    const [niche, setNiche] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!niche) return;
        setLoading(true);

        // Mock Search
        setTimeout(() => {
            setResults([
                { name: "LegacyTool '98", revenue: "$50K/mo", weakness: "Looks like Windows 95, No Mobile App" },
                { name: "Enterprisey Corp", revenue: "$2M/yr", weakness: "Requires 'Schedule Demo', Costs $5K/mo" },
                { name: "Excel Sheet", revenue: "N/A", weakness: "Manual, Error prone" }
            ]);
            setLoading(false);
        }, 1500);
    };

    return (
        <Card variant="interactive" className="w-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Search className="w-4 h-4" /> Competitor Finder
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        placeholder="e.g. Dog Walking CRM"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Button disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Find"}
                    </Button>
                </form>

                {results.length > 0 && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                        <p className="text-xs text-slate-500 font-medium">Found 3 "Ugly" Competitors:</p>
                        {results.map((r, i) => (
                            <div key={i} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-slate-200 text-sm">{r.name}</div>
                                    <div className="text-xs text-red-300 mt-1">Weakness: {r.weakness}</div>
                                </div>
                                <div className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded">
                                    {r.revenue}
                                </div>
                            </div>
                        ))}
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
                            💡 Insight: Valid market exists. People pay for bad software here.
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
