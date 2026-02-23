"use client";

import { History as HistoryIcon, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function SidebarHistory({ history }: { history: any[] }) {
    if (history.length === 0) {
        return (
            <div className="px-4 py-8 text-center">
                <p className="text-xs text-white/20">No generations yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {history.map((item) => (
                <button
                    key={item.id}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group flex items-center justify-between"
                    onClick={() => {
                        // In a real app, we would load this into the state or navigate
                        // For now, it shows we have the data
                        alert("This would load: " + item.topic);
                    }}
                >
                    <div className="min-w-0">
                        <h4 className="text-sm font-medium truncate text-white/80 group-hover:text-white">
                            {item.topic}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase font-bold text-purple-500/80 bg-purple-500/10 px-1.5 py-0.5 rounded">
                                {item.platform}
                            </span>
                            <span className="text-[10px] text-white/30 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {formatDistanceToNow(new Date(item.createdAt))} ago
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                </button>
            ))}
        </div>
    );
}
