"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Rocket, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
    const [lastAttempt, setLastAttempt] = useState(0);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastAttempt < 3000) {
            setMessage("Please wait a moment before trying again.");
            setMessageType("error");
            return;
        }
        setLastAttempt(now);

        setLoading(true);
        setMessage(null);

        // MOCK SIGNUP PATH for dev without real internet/supabase credentials
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            console.warn("Using Mock Signup");
            setTimeout(() => {
                setMessage("✅ Mock account created! Redirecting...");
                setMessageType("success");
                setTimeout(() => router.push("/dashboard"), 1000);
            }, 1000);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                // Check for specific error types
                if (error.message.toLowerCase().includes('rate limit')) {
                    setMessage("⚠️ Too many signup attempts. Please wait a few minutes or use the Dev Skip option.");
                    setMessageType("error");
                } else if (error.message.toLowerCase().includes('already registered')) {
                    setMessage("This email is already registered. Try logging in instead.");
                    setMessageType("error");
                } else {
                    setMessage(error.message);
                    setMessageType("error");
                }
            } else {
                setMessage("✅ Check your email! We sent you a magic link to complete signup.");
                setMessageType("success");
            }
        } catch (err) {
            console.error(err);
            setMessage("An unexpected error occurred. Please try again.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    const handleDevSignup = () => {
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-w-sm border-slate-800 bg-slate-900/50">
                <CardHeader className="text-center pb-2">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to home
                    </Link>
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
                        <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">Create your account</CardTitle>
                    <p className="text-slate-400 text-sm">Start your journey to $500K ARR</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
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
                            <div className={`p-3 rounded-lg text-xs text-center border ${messageType === 'error'
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                    : messageType === 'success'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                }`}>
                                {message}
                            </div>
                        )}

                        <Button className="w-full" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {loading ? "Creating account..." : "Sign Up with Email"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                            Log in
                        </Link>
                    </div>

                    <div className="mt-6 border-t border-slate-800 pt-4">
                        <p className="text-xs text-slate-500 text-center mb-2">For development/testing:</p>
                        <Button
                            variant={messageType === 'error' ? 'default' : 'ghost'}
                            size="sm"
                            className={`w-full ${messageType === 'error' ? 'bg-violet-600 hover:bg-violet-700 text-white' : 'text-slate-500 hover:text-white'}`}
                            onClick={handleDevSignup}
                            type="button"
                        >
                            Dev Skip (Mock Signup)
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
