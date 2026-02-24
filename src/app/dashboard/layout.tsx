import { UserButton } from "@clerk/nextjs";
import { Zap, History, LayoutDashboard, FileText, Clock } from "lucide-react";
import Link from "next/link";
import { getHistory, getScriptsHistory } from "@/app/actions";
import SidebarHistory from "@/components/SidebarHistory";
import ScriptsHistory from "@/components/ScriptsHistory";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const history = await getHistory();
    const scriptsHistory = await getScriptsHistory();

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#0A0A0A] text-white overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">HookVault<span className="text-purple-500">ByMoe</span></span>
                    </Link>
                    <Link href="/dashboard/scripts" className="p-2 text-white/60 hover:text-purple-400 transition-colors">
                        <FileText className="w-5 h-5" />
                    </Link>
                </div>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "w-8 h-8 rounded-lg"
                        }
                    }}
                />
            </header>

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex lg:w-80 border-r border-white/10 flex-col">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">HookVault<span className="text-purple-500">ByMoe</span></span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="space-y-1 mb-8">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-medium">Hook Generator</span>
                        </Link>
                        <Link
                            href="/dashboard/scripts"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all"
                        >
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Script Generator</span>
                        </Link>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="px-4 border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    Hooks History
                                </h3>
                            </div>
                            <SidebarHistory history={history} />
                        </div>

                        <div className="space-y-4">
                            <div className="px-4 border-b border-white/5 pb-2">
                                <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    Scripts History
                                </h3>
                            </div>
                            <ScriptsHistory history={scriptsHistory} />
                        </div>
                    </div>
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
            <main className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col">
                {children}
            </main>
        </div>
    );
}
