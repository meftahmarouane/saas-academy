"use client";

import { useAuthSync } from "@/hooks/useAuthSync";
import { ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
    useAuthSync();
    return <>{children}</>;
}
