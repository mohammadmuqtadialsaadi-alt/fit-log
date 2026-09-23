import Hero from "@/components/Hero";
import WorkoutGrid from "@/components/WorkoutGrid";
import { getWorkouts } from "@/lib/api";

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />

      <section
        id="library"
        className="bg-black px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              The Library
            </h2>

            <p className="mt-4 text-white/50">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <WorkoutGrid workouts={workouts} />
        </div>
      </section>
    </main>
  );
}