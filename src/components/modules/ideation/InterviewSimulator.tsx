"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Bot, Send, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

const PERSONAS = {
    cto: {
        name: "Alex, Busy CTO",
        bio: "Manage 50 engineers. Hates lengthy sales calls.",
        initial: "I have 5 minutes. What is this about?"
    },
    freelancer: {
        name: "Sam, Freelancer",
        bio: "Works solo. Price sensitive but needs efficiency.",
        initial: "Hey, does this actually save me time?"
    }
};

export function InterviewSimulator() {
    const [persona, setPersona] = useState<'cto' | 'freelancer'>('cto');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'ai', text: PERSONAS['cto'].initial }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const reset = (p: 'cto' | 'freelancer') => {
        setPersona(p);
        setMessages([{ id: '1', role: 'ai', text: PERSONAS[p].initial }]);
        setInput("");
    }

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        // Mock AI Logic
        setTimeout(() => {
            let reply = "Interesting. Tell me more.";
            const lower = input.toLowerCase();

            if (persona === 'cto') {
                if (lower.includes("cost") || lower.includes("price")) reply = "We have budget, but only for things that replace 3 other tools.";
                if (lower.includes("time") || lower.includes("fast")) reply = "Time is money. Does it integrate with Jira?";
                if (lower.includes("problem")) reply = "My biggest headache is developer onboarding.";
            } else {
                if (lower.includes("cost") || lower.includes("price")) reply = "I can't pay more than $20/mo right now.";
                if (lower.includes("time")) reply = "Automation is key. I spend too much time on invoices.";
            }

            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: reply }]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xs uppercase text-slate-500">Pick Persona</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button
                            variant={persona === 'cto' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => reset('cto')}
                        >
                            <Bot className="w-4 h-4 mr-2" /> CTO Alex
                        </Button>
                        <Button
                            variant={persona === 'freelancer' ? 'default' : 'ghost'}
                            className="w-full justify-start"
                            onClick={() => reset('freelancer')}
                        >
                            <Bot className="w-4 h-4 mr-2" /> Freelancer Sam
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-blue-900/10 border-blue-500/20">
                    <CardContent className="pt-6">
                        <p className="text-xs text-blue-300">
                            <strong>Goal:</strong> Find out their "Hair on Fire" problem directly. Don't pitch your solution yet!
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Chat Area */}
            <Card className="md:col-span-3 flex flex-col overflow-hidden border-slate-700">
                <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                    <div>
                        <div className="font-bold text-slate-200">{PERSONAS[persona].name}</div>
                        <div className="text-xs text-slate-500">{PERSONAS[persona].bio}</div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => reset(persona)}>
                        <RotateCcw className="w-4 h-4 text-slate-400" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50" ref={scrollRef}>
                    {messages.map(m => (
                        <div key={m.id} className={cn("flex gap-3 max-w-[80%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", m.role === 'user' ? "bg-blue-600" : "bg-slate-700")}>
                                {m.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-slate-300" />}
                            </div>
                            <div className={cn("p-3 rounded-2xl text-sm", m.role === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-800 text-slate-200 rounded-tl-none")}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-slate-300" />
                            </div>
                            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 bg-slate-800 border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                        <Button disabled={loading || !input.trim()}>
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
