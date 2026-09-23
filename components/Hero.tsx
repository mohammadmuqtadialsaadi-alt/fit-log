import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-black">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        
        {/* Hero Content */}
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse Workouts
            <ArrowDownRight size={19} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute h-72 w-72 rounded-full bg-[#ccff00]/10 blur-3xl sm:h-96 sm:w-96" />

          <Image
            src="/banner.png"
            alt="FitLog workout illustration"
            width={600}
            height={600}
            priority
            className="relative z-10 h-auto w-full max-w-md object-contain lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}