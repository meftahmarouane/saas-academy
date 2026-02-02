"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Hammer, ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
    title: string;
    description?: string;
}

export function ComingSoon({ title, description = "We are currently building this module. Check back later!" }: ComingSoonProps) {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full border-blue-500/20 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-10 pb-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto relative group">
                        <Construction className="w-10 h-10 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        <Hammer className="w-6 h-6 text-blue-500 absolute -top-1 -right-1 animate-bounce" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-300 font-mono">
                        🚧 WORK IN PROGRESS
                    </div>

                    <Link href="/dashboard">
                        <Button variant="secondary" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
