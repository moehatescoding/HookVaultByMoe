"use client";

import { Clock, ChevronRight, Quote, BookOpen } from "lucide-react";
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
                        alert("History item: " + (item.topic || item.storyType));
                    }}
                >
                    <div className="min-w-0 pr-2 space-y-1">
                        <h4 className="text-sm font-medium truncate text-white/80 group-hover:text-white flex items-center gap-2">
                            {item.type === "hook" ? (
                                <Quote className="w-3 h-3 text-purple-500" />
                            ) : (
                                <BookOpen className="w-3 h-3 text-blue-500" />
                            )}
                            {item.type === "hook" ? "(Hook) " + item.topic : "(Story) " + item.storyType}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-white/40 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                                {item.platform}
                            </span>
                            <span className="text-[10px] text-white/30 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
            ))}
        </div>
    );
}
