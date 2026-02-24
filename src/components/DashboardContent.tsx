"use client";

import { useState } from "react";
import { generateHooks, generateStories } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import { Loader2, Sparkles, Send, Layers, Globe, Users, Target, Palette, Hash, Zap, BookOpen, Quote } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type GeneratorType = "hooks" | "stories";

export default function DashboardContent({ initialHistory }: { initialHistory: any[] }) {
    const [loading, setLoading] = useState(false);
    const [generatorType, setGeneratorType] = useState<GeneratorType>("hooks");
    const [output, setOutput] = useState("");

    // Hooks Form State
    const [hooksData, setHooksData] = useState({
        niche: "",
        topic: "",
        audience: "",
        platform: "TikTok",
        tone: "Educational",
        goal: "Go Viral",
        hookCount: "10",
    });

    // Stories Form State
    const [storiesData, setStoriesData] = useState({
        niche: "",
        storyType: "Transformation",
        audience: "",
        platform: "TikTok",
        tone: "Inspirational",
        goal: "Go Viral",
        length: "Medium",
    });

    async function handleHooksSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateHooks(hooksData);
            if (result.success) {
                setOutput(result.hooks);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate hooks. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleStoriesSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await generateStories(storiesData);
            if (result.success) {
                setOutput(result.stories);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate viral stories. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* LEFT SIDE: Input Form */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="max-w-xl mx-auto">
                    {/* Header & Toggle */}
                    <div className="mb-8 md:mb-10">
                        <h1 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                            {generatorType === "hooks" ? "Generate Hooks" : "Generate Stories"}
                        </h1>

                        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 w-full sm:w-fit mb-8">
                            <button
                                onClick={() => { setGeneratorType("hooks"); setOutput(""); }}
                                className={cn(
                                    "flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                                    generatorType === "hooks" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-white/40 hover:text-white"
                                )}
                            >
                                <Quote className="w-4 h-4" />
                                Hooks
                            </button>
                            <button
                                onClick={() => { setGeneratorType("stories"); setOutput(""); }}
                                className={cn(
                                    "flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                                    generatorType === "stories" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-white/40 hover:text-white"
                                )}
                            >
                                <BookOpen className="w-4 h-4" />
                                Viral Stories
                            </button>
                        </div>

                        <p className="text-sm md:text-base text-white/40">
                            {generatorType === "hooks"
                                ? "Enter your details and let AI craft the perfect viral hooks."
                                : "Fill in the details to generate a high-retention viral story script."}
                        </p>
                    </div>

                    {generatorType === "hooks" ? (
                        <form onSubmit={handleHooksSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Niche
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Finance, Fitness"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        value={hooksData.niche}
                                        onChange={(e) => setHooksData({ ...hooksData, niche: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Topic
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Best Stocks to Buy"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        value={hooksData.topic}
                                        onChange={(e) => setHooksData({ ...hooksData, topic: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Target Audience
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 20-30 year old investors"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    value={hooksData.audience}
                                    onChange={(e) => setHooksData({ ...hooksData, audience: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Target className="w-4 h-4" /> Platform
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={hooksData.platform}
                                        onChange={(e) => setHooksData({ ...hooksData, platform: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Instagram</option>
                                        <option className="bg-zinc-900">TikTok</option>
                                        <option className="bg-zinc-900">YouTube Shorts</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Palette className="w-4 h-4" /> Tone
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={hooksData.tone}
                                        onChange={(e) => setHooksData({ ...hooksData, tone: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Aggressive</option>
                                        <option className="bg-zinc-900">Luxury</option>
                                        <option className="bg-zinc-900">Educational</option>
                                        <option className="bg-zinc-900">Storytelling</option>
                                        <option className="bg-zinc-900">Playful</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Goal
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={hooksData.goal}
                                        onChange={(e) => setHooksData({ ...hooksData, goal: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Grow Followers</option>
                                        <option className="bg-zinc-900">Go Viral</option>
                                        <option className="bg-zinc-900">Sell Product</option>
                                        <option className="bg-zinc-900">Build Authority</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Hash className="w-4 h-4" /> Number of Hooks
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={hooksData.hookCount}
                                        onChange={(e) => setHooksData({ ...hooksData, hookCount: e.target.value })}
                                    >
                                        <option value="10" className="bg-zinc-900">10 Hooks</option>
                                        <option value="20" className="bg-zinc-900">20 Hooks</option>
                                        <option value="30" className="bg-zinc-900">30 Hooks</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-4 md:mt-8"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating Hooks...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Generate Hooks
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleStoriesSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Niche
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Finance, Fitness"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        value={storiesData.niche}
                                        onChange={(e) => setStoriesData({ ...storiesData, niche: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Target className="w-4 h-4" /> Story Type
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={storiesData.storyType}
                                        onChange={(e) => setStoriesData({ ...storiesData, storyType: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Transformation</option>
                                        <option className="bg-zinc-900">Controversial Take</option>
                                        <option className="bg-zinc-900">Personal Failure</option>
                                        <option className="bg-zinc-900">Underdog Win</option>
                                        <option className="bg-zinc-900">Myth-Busting</option>
                                        <option className="bg-zinc-900">Relatable Pain</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Target Audience
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 20-30 year old investors"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    value={storiesData.audience}
                                    onChange={(e) => setStoriesData({ ...storiesData, audience: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Platform
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={storiesData.platform}
                                        onChange={(e) => setStoriesData({ ...storiesData, platform: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Instagram</option>
                                        <option className="bg-zinc-900">TikTok</option>
                                        <option className="bg-zinc-900">YouTube Shorts</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Palette className="w-4 h-4" /> Tone
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={storiesData.tone}
                                        onChange={(e) => setStoriesData({ ...storiesData, tone: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Emotional</option>
                                        <option className="bg-zinc-900">Dramatic</option>
                                        <option className="bg-zinc-900">Inspirational</option>
                                        <option className="bg-zinc-900">Dark</option>
                                        <option className="bg-zinc-900">Playful</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Goal
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={storiesData.goal}
                                        onChange={(e) => setStoriesData({ ...storiesData, goal: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Go Viral</option>
                                        <option className="bg-zinc-900">Build Authority</option>
                                        <option className="bg-zinc-900">Sell Softly</option>
                                        <option className="bg-zinc-900">Build Community</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                        <Hash className="w-4 h-4" /> Story Length
                                    </label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                        value={storiesData.length}
                                        onChange={(e) => setStoriesData({ ...storiesData, length: e.target.value })}
                                    >
                                        <option className="bg-zinc-900">Short</option>
                                        <option className="bg-zinc-900">Medium</option>
                                        <option className="bg-zinc-900">Long</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-4 md:mt-8"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating Viral Story...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Generate Viral Story
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE: Generated Output */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 bg-white/5 overflow-y-auto">
                <div className="max-w-xl mx-auto h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-purple-400">
                            <Sparkles className="w-4 h-4 md:w-5 h-5" />
                            AI Generated {generatorType === "hooks" ? "Hooks" : "Story"}
                        </h2>
                        {output && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(output);
                                    alert("Copied to clipboard!");
                                }}
                                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                Copy All
                            </button>
                        )}
                    </div>

                    {!output && !loading && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 md:py-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center mb-4 md:mb-6">
                                <Zap className="w-6 h-6 md:w-8 h-8 text-white/20" />
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-white/40 mb-2">Nothing generated yet</h3>
                            <p className="text-white/20 text-xs md:text-sm max-w-xs px-6">Fill out the form on the left to generate content.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-1 space-y-4 animate-pulse">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="h-16 bg-white/5 rounded-2xl w-full" />
                            ))}
                        </div>
                    )}

                    {output && !loading && (
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    ol: ({ node, ...props }) => <ol className="space-y-4 list-decimal pl-4" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-base md:text-lg leading-relaxed text-white/80 pl-2 marker:text-purple-500 marker:font-bold" {...props} />
                                }}
                            >
                                {output}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
