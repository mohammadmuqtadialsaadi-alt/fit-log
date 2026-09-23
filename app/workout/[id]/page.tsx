import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CalendarPlus,
  Star,
} from "lucide-react";

import { getWorkout } from "@/lib/api";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0c0d10] text-white">
      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10">
        {/* BACK */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#858892] transition hover:text-white"
        >
          <ArrowLeft size={16} />

          Back to workouts
        </Link>

        {/* DETAILS GRID */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ========================= */}
          {/* LEFT IMAGE */}
          {/* ========================= */}

          <div className="relative h-[500px] overflow-hidden rounded-xl bg-[#15171c] sm:h-[600px] lg:h-[650px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ========================= */}
          {/* RIGHT CONTENT */}
          {/* ========================= */}

          <div className="flex flex-col justify-center">
            {/* TITLE */}

            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-[48px]">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#9699a3] sm:text-[15px]">
              {workout.description}
            </p>

            {/* TAGS */}

            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#caff00] px-4 py-1.5 text-[11px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* ========================= */}
            {/* SPECS */}
            {/* ========================= */}

            <div className="mt-6 overflow-hidden rounded-xl border border-[#282b32] bg-[#171920]">
              <SpecRow
                label="Equipment"
                value={workout.equipment}
              />

              <SpecRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <SpecRow
                label="Sets"
                value={`${workout.sets}`}
              />

              <SpecRow
                label="Reps"
                value={workout.reps}
              />

              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="Rating"
                value={workout.rating.toString()}
                icon={
                  <Star
                    size={12}
                    fill="currentColor"
                  />
                }
              />
            </div>

            {/* ========================= */}
            {/* INSTRUCTIONS */}
            {/* ========================= */}

            <div className="mt-7">
              <h2 className="text-sm font-black uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${index}-${instruction}`}
                      className="flex gap-3 text-sm leading-6 text-[#9a9da6]"
                    >
                      <span className="min-w-[14px] text-[#666a74]">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* ========================= */}
            {/* ACTION BUTTONS */}
            {/* ========================= */}

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-[#caff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#d8ff45]"
              >
                <CalendarPlus size={15} />

                Add to today's plan
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-[#343740] bg-transparent px-5 py-3 text-xs font-bold uppercase text-white transition hover:bg-[#1b1d23]"
              >
                <Bookmark size={15} />

                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ========================= */
/* SPEC ROW */
/* ========================= */

function SpecRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[56px] items-center justify-between border-b border-[#282b32] px-5 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#858892]">
        {label}
      </span>

      <span className="flex items-center gap-1 text-sm text-[#e4e5e8]">
        {icon}

        {value}
      </span>
    </div>
  );
}