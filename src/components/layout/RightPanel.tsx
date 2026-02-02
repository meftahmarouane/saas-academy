export function RightPanel() {
    return (
        <aside className="hidden xl:flex flex-col w-80 border-l border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Coming Up
                </h3>
                <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                        <span className="text-xs text-blue-400 font-medium">Tomorrow</span>
                        <p className="font-medium text-slate-200 mt-1">Weekly Review</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 opacity-60">
                        <span className="text-xs text-slate-500 font-medium">In 3 days</span>
                        <p className="font-medium text-slate-200 mt-1">Pricing Strategy</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Quick Stats
                </h3>
                {/* Placeholder for small charts */}
                <div className="h-32 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center justify-center text-xs text-slate-500">
                    Weekly Activity Chart
                </div>
            </div>
        </aside>
    );
}
