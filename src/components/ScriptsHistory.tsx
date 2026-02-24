"use client";

import { formatDistanceToNow } from "date-fns";
import { FileText, Clock } from "lucide-react";

export default function ScriptsHistory({ history }: { history: any[] }) {
    if (history.length === 0) {
        return (
            <div className="px-4 py-8 text-center">
                <p className="text-xs text-white/20 italic">No scripts generated yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {history.map((script) => (
                <div
                    key={script.id}
                    className="group flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/10"
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-3 h-3 text-purple-400" />
                        <span className="text-xs font-bold text-white/80 line-clamp-1">
                            {script.category?.name} • {script.subCategory?.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/40 font-medium">
                            {script.scriptType?.name}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-white/20">
                            <Clock className="w-2.5 h-2.5" />
                            {formatDistanceToNow(new Date(script.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
