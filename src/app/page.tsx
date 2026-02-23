import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Smartphone, Target } from "lucide-react";

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
      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-white/80">AI-Powered Content Strategy</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Generate Viral Hooks <br /> In <span className="text-purple-500">Seconds</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
            Stop guessing. Start posting high-retention content powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-all hover:scale-105 flex items-center gap-2">
                  Generate Hooks
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
            <button className="px-8 py-4 rounded-full bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium transition-colors">
              How it works
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
            {[
              {
                icon: <Smartphone className="w-6 h-6 text-blue-400" />,
                title: "Short-Form Optimized",
                desc: "Hooks designed specifically for TikTok, Reels, and Shorts algorithms."
              },
              {
                icon: <Target className="w-6 h-6 text-purple-400" />,
                title: "Retention Focused",
                desc: "Psychologically engineered to stop the scroll and boost your watch time."
              },
              {
                icon: <Zap className="w-6 h-6 text-amber-400" />,
                title: "Instant Results",
                desc: "Get 30+ viral hook variations in less than 5 seconds."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
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
