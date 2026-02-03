"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUIStore, useUserStore } from "@/store/user-store";
import { cn } from "@/lib/utils";
import {
    Rocket,
    LayoutDashboard,
    BookOpen,
    Lightbulb,
    Zap,
    Bot,
    PieChart,
    Settings,
    Menu,
    X,
    Trophy,
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, toggleSidebar } = useUIStore();
    const { level, xp } = useUserStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by returning null or skeleton on server/first render
    if (!mounted) return null;

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Fundamentals", href: "/modules/fundamentals", icon: BookOpen },
        { name: "Ideation", href: "/modules/ideation", icon: Lightbulb },
        { name: "Launch", href: "/modules/launch", icon: Rocket },
        { name: "Scale", href: "/modules/scale", icon: Zap },
        { name: "Analytics", href: "/analytics", icon: PieChart },
    ];

    return (
        <>
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
                    !isSidebarOpen && "hidden lg:hidden",
                    isSidebarOpen && "translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo / Header */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">SaaS-500K</span>
                        </Link>
                        <button onClick={toggleSidebar} className="lg:hidden text-slate-400">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* User Status Card */}
                    <div className="px-4 py-2">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400">
                                    <Trophy className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-semibold">Current Level</div>
                                    <div className="font-bold text-slate-200">{level}</div>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                    style={{ width: `${(xp % 1000) / 10}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1.5 text-[10px] text-slate-500">
                                <span>{xp} XP</span>
                                <span>Next: {Math.ceil(xp / 1000) * 1000}</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                    )}
                                >
                                    <item.icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500")} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-slate-800">
                        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
                            <Settings className="w-5 h-5 text-slate-500" />
                            Settings
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}
