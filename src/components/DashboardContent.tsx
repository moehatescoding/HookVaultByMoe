"use client";

import { useState } from "react";
import { generateHooks } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import { Loader2, Sparkles, Send, Layers, Globe, Users, Target, Palette, Hash, Zap } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardContent({ initialHistory }: { initialHistory: any[] }) {
    const [loading, setLoading] = useState(false);
    const [generatedHooks, setGeneratedHooks] = useState("");
    const [formData, setFormData] = useState({
        niche: "",
        topic: "",
        audience: "",
        platform: "TikTok",
        tone: "Educational",
        goal: "Go Viral",
        hookCount: "10",
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateHooks(formData);
            if (result.success) {
                setGeneratedHooks(result.hooks);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate hooks. Check your API keys and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-1 overflow-hidden">
            {/* LEFT SIDE: Input Form */}
            <div className="w-1/2 p-10 overflow-y-auto border-r border-white/5">
                <div className="max-w-xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black mb-2 tracking-tight">Generate Hooks</h1>
                        <p className="text-white/40">Enter your details and let AI craft the perfect viral hook.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Layers className="w-4 h-4" /> Niche
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Finance, Fitness"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    value={formData.niche}
                                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Topic
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Best Stocks to Buy"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                <Users className="w-4 h-4" /> Target Audience
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 20-30 year old investors"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                value={formData.audience}
                                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Platform
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                    value={formData.platform}
                                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                                >
                                    <option className="bg-zinc-900">Instagram</option>
                                    <option className="bg-zinc-900">TikTok</option>
                                    <option className="bg-zinc-900">YouTube Shorts</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Palette className="w-4 h-4" /> Tone
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                    value={formData.tone}
                                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                                >
                                    <option className="bg-zinc-900">Aggressive</option>
                                    <option className="bg-zinc-900">Luxury</option>
                                    <option className="bg-zinc-900">Educational</option>
                                    <option className="bg-zinc-900">Storytelling</option>
                                    <option className="bg-zinc-900">Playful</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Goal
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                    value={formData.goal}
                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                >
                                    <option className="bg-zinc-900">Grow Followers</option>
                                    <option className="bg-zinc-900">Go Viral</option>
                                    <option className="bg-zinc-900">Sell Product</option>
                                    <option className="bg-zinc-900">Build Authority</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Hash className="w-4 h-4" /> Number of Hooks
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                    value={formData.hookCount}
                                    onChange={(e) => setFormData({ ...formData, hookCount: e.target.value })}
                                >
                                    <option value="10" className="bg-zinc-900">10 Hooks</option>
                                    <option value="20" className="bg-zinc-900">20 Hooks</option>
                                    <option value="30" className="bg-zinc-900">30 Hooks</option>
                                </select>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-8"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating Viral Hooks...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Generate Hooks
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: Generated Hooks */}
            <div className="w-1/2 p-10 bg-white/5 overflow-y-auto">
                <div className="max-w-xl mx-auto h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
                            <Sparkles className="w-5 h-5" />
                            AI Generated Output
                        </h2>
                        {generatedHooks && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedHooks);
                                    alert("Copied to clipboard!");
                                }}
                                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
                            >
                                Copy All
                            </button>
                        )}
                    </div>

                    {!generatedHooks && !loading && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-white/20" />
                            </div>
                            <h3 className="text-lg font-bold text-white/40 mb-2">No hooks yet</h3>
                            <p className="text-white/20 text-sm max-w-xs">Fill out the form on the left to generate content.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-1 space-y-4 animate-pulse">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 bg-white/5 rounded-2xl w-full" />
                            ))}
                        </div>
                    )}

                    {generatedHooks && !loading && (
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    ol: ({ node, ...props }) => <ol className="space-y-4 list-decimal pl-4" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-lg leading-relaxed text-white/80 pl-2 marker:text-purple-500 marker:font-bold" {...props} />
                                }}
                            >
                                {generatedHooks}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
