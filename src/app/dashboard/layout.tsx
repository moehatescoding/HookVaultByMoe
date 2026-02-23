import { UserButton } from "@clerk/nextjs";
import { Zap, History, LayoutDashboard, PlusCircle } from "lucide-react";
import Link from "next/link";
import { getHistory } from "@/app/actions";
import SidebarHistory from "@/components/SidebarHistory";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const history = await getHistory();

    return (
        <div className="flex h-screen bg-[#0A0A0A] text-white">
            {/* Sidebar */}
            <aside className="w-80 border-r border-white/10 flex flex-col">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">HookVault<span className="text-purple-500">ByMoe</span></span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600/20 transition-all mb-8"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span className="font-medium">New Generation</span>
                    </Link>

                    <div className="mb-4 px-4 border-b border-white/5 pb-2">
                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                            <History className="w-3 h-3" />
                            History
                        </h3>
                    </div>

                    <SidebarHistory history={history} />
                </nav>

                <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-9 h-9 rounded-xl"
                                }
                            }}
                        />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white/80">Premium Account</span>
                            <span className="text-[10px] text-white/40">HookVault Pro</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
}
