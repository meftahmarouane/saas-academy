"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-950 text-slate-200">
            <h2 className="text-xl font-bold">Authentication Error</h2>
            <p className="text-slate-400 text-sm max-w-md text-center">
                Something went wrong during sign in. This might be due to a network issue or an expired link.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => window.location.href = '/login'} variant="secondary">
                    Try Again
                </Button>
            </div>
        </div>
    );
}
