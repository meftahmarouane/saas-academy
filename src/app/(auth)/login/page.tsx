"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useUserStore } from "@/store/user-store";
import { Rocket, Mail, Loader2, Play } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [lastAttempt, setLastAttempt] = useState(0);
    const router = useRouter();
    const { setUser } = useUserStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastAttempt < 3000) {
            setMessage("Please wait a moment before trying again.");
            return;
        }
        setLastAttempt(now);

        setLoading(true);
        setMessage(null);

        // MOCK LOGIN PATH for dev without real internet/supabase credentials
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            console.warn("Using Mock Login");
            setTimeout(() => {
                setUser({ email, id: "mock-user-123", level: "Novice" });
                router.push("/dashboard");
            }, 1000);
            return;
        }

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setMessage(error.message);
            } else {
                setMessage("Check your email for the login link!");
            }
        } catch (err) {
            console.error(err);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDevLogin = () => {
        setUser({ email: "dev@example.com", id: "dev-user", level: "Founder", current_streak: 42 });
        router.push("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-w-sm border-slate-800 bg-slate-900/50">
                <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
                        <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">Welcome back</CardTitle>
                    <p className="text-slate-400 text-sm">Enter the academy for solo founders</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    placeholder="founder@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 text-xs text-center border border-blue-500/20">
                                {message}
                            </div>
                        )}

                        <Button className="w-full" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {loading ? "Sending link..." : "Continue with Email"}
                        </Button>
                    </form>

                    <div className="mt-6 border-t border-slate-800 pt-4">
                        <Button variant="ghost" size="sm" className="w-full text-slate-500 hover:text-white" onClick={handleDevLogin}>
                            <Play className="w-3 h-3 mr-2" /> Dev Skip (Mock)
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
