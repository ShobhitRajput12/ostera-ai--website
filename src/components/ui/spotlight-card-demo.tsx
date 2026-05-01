import { GlowCard } from "./spotlight-card";
import { Zap, Brain, Rocket } from "lucide-react";

export function SpotlightCardDemo(){
  return(
    <div className="w-screen min-h-screen flex flex-col items-center justify-center gap-10 bg-zinc-950 p-10 overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-4">Spotlight Cards (Purple Edition)</h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
        <GlowCard className="flex flex-col items-start justify-end p-6 group">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Fast Performance</h3>
          <p className="text-zinc-400 text-sm">Optimized algorithms for lightning-fast AI responses and real-time processing.</p>
        </GlowCard>

        <GlowCard className="flex flex-col items-start justify-end p-6 group">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Brain size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Neural Networks</h3>
          <p className="text-zinc-400 text-sm">Advanced machine learning models trained on massive datasets for high accuracy.</p>
        </GlowCard>

        <GlowCard className="flex flex-col items-start justify-end p-6 group">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <Rocket size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Scalable Solutions</h3>
          <p className="text-zinc-400 text-sm">Deploy and scale your AI applications effortlessly across cloud infrastructures.</p>
        </GlowCard>
      </div>
    </div>
  );
};
