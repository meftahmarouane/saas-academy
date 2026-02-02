"use client";

import { useUIStore } from "@/store/user-store";
import { Menu, Bell } from "lucide-react";

export function Header() {
    const { toggleSidebar } = useUIStore();

    return (
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30 lg:hidden px-4 flex items-center justify-between">
            <button onClick={toggleSidebar} className="text-slate-400 hover:text-slate-200">
                <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-slate-200">SaaS-500K Academy</span>
            <button className="text-slate-400 hover:text-slate-200">
                <Bell className="w-5 h-5" />
            </button>
        </header>
    );
}
