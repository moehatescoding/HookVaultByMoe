import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Quote, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">HookVault<span className="text-purple-500">ByMoe</span></span>
          </div>
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-24 md:pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-purple-600 rounded-full blur-[80px] md:blur-[128px]" />
          <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600 rounded-full blur-[80px] md:blur-[128px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs md:sm mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 md:w-4 h-4 text-purple-400" />
            <span className="text-white/80 uppercase tracking-widest font-bold">AI-Powered Content Strategy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight md:tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent leading-[1.1]">
            Generate Viral Content <br /> In <span className="text-purple-500">Seconds</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Stop guessing. Start posting high-retention content powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all hover:scale-105 flex items-center gap-2">
                  Start Generating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="group px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all hover:scale-105 flex items-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SignedIn>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 text-left">
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
              <div className="mb-6 p-4 rounded-2xl bg-purple-600/20 inline-block group-hover:scale-110 transition-transform">
                <Quote className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Generate Hooks</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Scroll-stopping hooks optimized for retention. Captivate your audience in the first 3 seconds of your video.
              </p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
              <div className="mb-6 p-4 rounded-2xl bg-blue-600/20 inline-block group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Generate Viral Stories</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Short-form story frameworks engineered to go viral. Built with emotional triggers and high-retention pacing.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-white/40 text-sm">
          &copy; 2026 HookVaultByMoe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
