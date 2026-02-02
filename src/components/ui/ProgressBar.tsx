import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
    max?: number;
    variant?: "blue" | "violet" | "emerald" | "amber";
    showLabel?: boolean;
}

export function ProgressBar({
    value,
    max = 100,
    variant = "blue",
    showLabel = false,
    className,
    ...props
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const variants = {
        blue: "from-blue-500 to-indigo-500",
        violet: "from-violet-500 to-fuchsia-500",
        emerald: "from-emerald-500 to-teal-500",
        amber: "from-amber-500 to-orange-500",
    };

    return (
        <div className={cn("w-full", className)} {...props}>
            {showLabel && (
                <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400 font-medium">Progress</span>
                    <span className="text-slate-200 font-bold">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div
                    className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out", variants[variant])}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
