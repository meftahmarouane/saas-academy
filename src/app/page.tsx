"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Rocket, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">

      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-100">
            <Rocket className="w-6 h-6 text-blue-500" />
            <span>SaaS-500K</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/login">
              <Button size="sm" className="hidden sm:flex">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20">

        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Now in Public Beta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 tracking-tight max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            Build your SaaS to <br />
            <span className="text-blue-500">$500K ARR</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Stop guessing. Follow a gamified, step-by-step roadmap designed for solo founders.
            Validate ideas, launch quickly, and scale without the burnout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Link href="/login">
              <Button size="lg" className="h-12 px-8 text-base">
                Start Your Journey <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Member Login
              </Button>
            </Link>
          </div>

          <div className="pt-12 flex justify-center gap-8 text-sm text-slate-500 animate-in fade-in duration-1000 delay-300">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Free for Beta Users</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> No Credit Card Required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Real-time Progress</div>
          </div>
        </section>

        {/* Feature Grid (Simple) */}
        <section className="container mx-auto px-6 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Ideation", desc: "Validate before you build. Use our Idea Score calculator and Competitor Finder." },
              { title: "Launch", desc: "A strict 6-week MVP sprint schedule to get you to market fast." },
              { title: "Scale", desc: "Unit economics, LTV:CAC, and hiring your first support agent." }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center mb-4">
                  <span className="font-bold text-blue-400">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 SaaS-500K Academy. Built in public.</p>
      </footer>
    </div>
  );
}
