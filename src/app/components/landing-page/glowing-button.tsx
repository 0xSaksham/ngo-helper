import { GlowEffect } from "@/app/components/ui/glow-effect";
import { ArrowRight } from "lucide-react";

export function GlowEffectButton() {
  return (
    <div className="relative">
      <GlowEffect
        colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
        mode="colorShift"
        blur="soft"
        duration={3}
        scale={0.9}
      />
      <button className="relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-4 py-2 sm:px-6 sm:py-3 font-bold text-xl sm:text-3xl text-zinc-50 outline-1 outline-[#fff2f21f]">
        Get Started <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>
    </div>
  );
}
