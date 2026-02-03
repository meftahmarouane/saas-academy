"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Rocket, Menu, X, LogOut, LayoutDashboard, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function GlobalHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();

    // Don't show header on auth pages
    if (pathname?.startsWith('/login') || pathname?.startsWith('/signup')) {
        return null;
    }

    return (
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur fixed top-0 w-full z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-100 hover:text-white transition-colors">
                    <Rocket className="w-6 h-6 text-blue-500" />
                    <span>SaaS-500K</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {loading ? (
                        <div className="w-20 h-8 bg-slate-800 animate-pulse rounded" />
                    ) : user ? (
                        // Logged in state
                        <>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/analytics"
                                className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                <TrendingUp className="w-4 h-4" />
                                My Progress
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={logout}
                                className="flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </Button>
                        </>
                    ) : (
                        // Logged out state
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Log In
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800 bg-slate-950">
                    <nav className="container mx-auto px-6 py-4 flex flex-col gap-3">
                        {loading ? (
                            <div className="w-full h-10 bg-slate-800 animate-pulse rounded" />
                        ) : user ? (
                            // Logged in mobile menu
                            <>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/analytics"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    My Progress
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </button>
                            </>
                        ) : (
                            // Logged out mobile menu
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Button size="sm" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
