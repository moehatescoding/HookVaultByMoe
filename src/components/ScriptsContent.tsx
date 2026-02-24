"use client";

import { useState, useMemo } from "react";
import { generateScript } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import { Loader2, Sparkles, Send, Layers, Globe, Users, Target, Palette, Hash, Zap, FileText, ChevronDown, Copy, RotateCcw } from "lucide-react";

export default function ScriptsContent({
    initialCategories,
    initialSubCategories,
    initialScriptTypes
}: {
    initialCategories: any[],
    initialSubCategories: any[],
    initialScriptTypes: any[]
}) {
    const [loading, setLoading] = useState(false);
    const [generatedScript, setGeneratedScript] = useState("");
    const [formData, setFormData] = useState({
        categoryId: "",
        subCategoryId: "",
        scriptTypeId: "",
        inputText: "",
    });

    const filteredSubCategories = useMemo(() => {
        return initialSubCategories.filter(sc => sc.categoryId === formData.categoryId);
    }, [formData.categoryId, initialSubCategories]);

    const filteredScriptTypes = useMemo(() => {
        return initialScriptTypes.filter(st => st.subCategoryId === formData.subCategoryId);
    }, [formData.subCategoryId, initialScriptTypes]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formData.categoryId || !formData.subCategoryId || !formData.scriptTypeId) {
            alert("Please select all options");
            return;
        }

        setLoading(true);
        try {
            const result = await generateScript(formData);
            if (result.success) {
                setGeneratedScript(result.script.outputText);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to generate script. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedScript);
        alert("Copied to clipboard!");
    };

    return (
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* LEFT SIDE: Input Form */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/5">
                <div className="max-w-xl mx-auto">
                    <div className="mb-8 md:mb-10">
                        <h1 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Generate Scripts</h1>
                        <p className="text-sm md:text-base text-white/40">Choose your niche and script type to create high-retention content.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                <Layers className="w-4 h-4" /> Category
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none"
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subCategoryId: "", scriptTypeId: "" })}
                                >
                                    <option value="" className="bg-zinc-900">Select Category</option>
                                    {initialCategories.map(cat => (
                                        <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> Sub-Category
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        disabled={!formData.categoryId}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none disabled:opacity-50"
                                        value={formData.subCategoryId}
                                        onChange={(e) => setFormData({ ...formData, subCategoryId: e.target.value, scriptTypeId: "" })}
                                    >
                                        <option value="" className="bg-zinc-900">Select Sub-Category</option>
                                        {filteredSubCategories.map(sub => (
                                            <option key={sub.id} value={sub.id} className="bg-zinc-900">{sub.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                    <Target className="w-4 h-4" /> Script Type
                                </label>
                                <div className="relative">
                                    <select
                                        required
                                        disabled={!formData.subCategoryId}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none disabled:opacity-50"
                                        value={formData.scriptTypeId}
                                        onChange={(e) => setFormData({ ...formData, scriptTypeId: e.target.value })}
                                    >
                                        <option value="" className="bg-zinc-900">Select Type</option>
                                        {filteredScriptTypes.map(type => (
                                            <option key={type.id} value={type.id} className="bg-zinc-900">{type.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-semibold text-white/60 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> What is this script about? (Optional)
                            </label>
                            <textarea
                                placeholder="e.g. A 30-second reel about why most startups fail in the first year..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all min-h-[120px] resize-none"
                                value={formData.inputText}
                                onChange={(e) => setFormData({ ...formData, inputText: e.target.value })}
                            />
                        </div>

                        <button
                            disabled={loading || !formData.categoryId || !formData.subCategoryId || !formData.scriptTypeId}
                            className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all mt-4 md:mt-8 shadow-lg shadow-purple-600/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Crafting Your Script...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Script
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: Generated Output */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 bg-white/5 overflow-y-auto">
                <div className="max-w-xl mx-auto h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-purple-400">
                            <FileText className="w-4 h-4 md:w-5 h-5" />
                            Generated Script
                        </h2>
                        {generatedScript && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                    title="Regenerate"
                                >
                                    <RotateCcw className="w-4 h-4 text-white/60" />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                    Copy
                                </button>
                            </div>
                        )}
                    </div>

                    {!generatedScript && !loading && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-10 md:py-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center mb-4 md:mb-6">
                                <Zap className="w-6 h-6 md:w-8 h-8 text-white/20" />
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-white/40 mb-2">No script yet</h3>
                            <p className="text-white/20 text-xs md:text-sm max-w-xs px-6">Fill out the form to generate your high-retention script.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-1 space-y-4 animate-pulse">
                            <div className="h-8 bg-white/5 rounded-lg w-1/3 mb-4" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                            <div className="h-4 bg-white/5 rounded-lg w-3/4 mb-8" />

                            <div className="h-8 bg-white/5 rounded-lg w-1/4 mb-4" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                            <div className="h-4 bg-white/5 rounded-lg w-full" />
                        </div>
                    )}

                    {generatedScript && !loading && (
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-purple-400 mt-6 mb-2 border-b border-purple-500/20 pb-1" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-white/90 mt-6 mb-2" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-base md:text-lg leading-relaxed text-white/70 mb-4" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="text-purple-300 font-bold" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-2 mb-4 text-white/70" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-2 mb-4 text-white/70" {...props} />,
                                }}
                            >
                                {generatedScript}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
