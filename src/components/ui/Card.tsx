import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "interactive";
}

export function Card({ className, variant = "default", ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border p-6 transition-all duration-200",
                variant === "default" && "bg-slate-800/50 border-slate-700/50",
                variant === "glass" && "bg-slate-900/30 backdrop-blur-md border-slate-700/30",
                variant === "interactive" && "bg-slate-800/50 border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer",
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn("font-semibold leading-none tracking-tight text-slate-100", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("text-slate-400", className)} {...props} />;
}
