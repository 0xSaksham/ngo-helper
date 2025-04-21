import { GlowEffectButton } from "@/app/components/landing-page/glowing-button";
import Link from "next/link";
import { SparklesCore } from "@/app/components/ui/sparkles";

export default function Home() {
  return (
    <>
      <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlescolorful"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#00ff00"
            speed={0.5}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-7 relative z-20">
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Welcome to NGO Helper!
          </h1>
          <div className="mt-4 ">
            <Link href="/submit-report">
              <GlowEffectButton />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
