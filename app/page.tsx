import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="min-h-screen bg-black px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            The Library
          </h2>

          <p className="mt-4 text-white/50">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>
    </main>
  );
}