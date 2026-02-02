import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RightPanel } from "@/components/layout/RightPanel";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                <Header />

                <main className="flex-1 flex min-h-0">
                    <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
                        <div className="mx-auto max-w-5xl">
                            {children}
                        </div>
                    </div>

                    <RightPanel />
                </main>
            </div>
        </div>
    );
}
