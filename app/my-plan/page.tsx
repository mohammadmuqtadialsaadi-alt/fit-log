"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { Workout } from "@/lib/types";
import {
  getPlan,
  getSaved,
  removeFromPlan,
  removeSaved,
} from "@/lib/storage";

type Tab = "today" | "saved";
type SortBy = "duration" | "calories" | "rating";

const DONE_KEY = "fitlog-done";

export default function MyPlanPage() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortBy>("duration");
  const [doneIds, setDoneIds] = useState<number[]>([]);

  useEffect(() => {
    setPlan(getPlan());
    setSaved(getSaved());

    try {
      const stored = localStorage.getItem(DONE_KEY);

      if (stored) {
        setDoneIds(JSON.parse(stored));
      }
    } catch {
      setDoneIds([]);
    }
  }, []);

  function refreshData() {
    setPlan(getPlan());
    setSaved(getSaved());
  }

  function markAsDone(id: number) {
    const updated = doneIds.includes(id)
      ? doneIds
      : [...doneIds, id];

    setDoneIds(updated);
    localStorage.setItem(DONE_KEY, JSON.stringify(updated));
  }

  function removeWorkout(id: number) {
    if (activeTab === "today") {
      removeFromPlan(id);
    } else {
      removeSaved(id);
    }

    refreshData();
  }

  const currentWorkouts = useMemo(() => {
    const list =
      activeTab === "today" ? [...plan] : [...saved];

    list.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });

    return list;
  }, [activeTab, plan, saved, sortBy]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-[#0d0f13] text-white">

      {/* Main content */}
      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10">

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-xs text-[#858892] sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-[#262a32] bg-[#14171d] sm:grid-cols-3">

          <div className="border-b border-[#262a32] px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-[#858892]">
              Exercises
            </p>

            <p className="mt-1 text-3xl font-black text-[#caff00]">
              {plan.length}
            </p>
          </div>

          <div className="border-b border-[#262a32] px-5 py-5 sm:border-b-0 sm:border-r">
            <p className="text-[10px] text-[#858892]">
              Minutes
            </p>

            <p className="mt-1 text-3xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="px-5 py-5">
            <p className="text-[10px] text-[#858892]">
              Calories
            </p>

            <p className="mt-1 text-3xl font-black">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs + Sort */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Tabs */}
          <div className="inline-flex w-fit rounded-lg border border-[#292d35] bg-[#15181e] p-1">

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${
                activeTab === "today"
                  ? "bg-[#252a32] text-white"
                  : "text-[#858892] hover:text-white"
              }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 text-[10px] font-medium transition ${
                activeTab === "saved"
                  ? "bg-[#252a32] text-white"
                  : "text-[#858892] hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#858892]">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortBy)
              }
              className="rounded-lg border border-[#292d35] bg-[#15181e] px-3 py-2 text-[10px] text-white outline-none"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>
          </div>

        </div>

        {/* Workout content */}
        <div className="mt-5">

          {currentWorkouts.length === 0 ? (

            /* Empty state */
            <div className="flex min-h-[230px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292d35] bg-[#0f1115] px-6 text-center">

              <h2 className="text-base font-black uppercase tracking-wide">
                Nothing here yet
              </h2>

              <p className="mt-2 text-[10px] text-[#858892]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-5 rounded-full bg-[#caff00] px-5 py-2.5 text-[10px] font-bold text-black transition hover:bg-[#d8ff45]"
              >
                Go to workouts
              </Link>

            </div>

          ) : (

            /* Workout list */
            <div className="space-y-3">

              {currentWorkouts.map((workout) => {
                const isDone = doneIds.includes(workout.id);

                return (
                  <article
                    key={workout.id}
                    className={`flex flex-col gap-4 rounded-xl border border-[#252932] bg-[#14171d] p-3 transition sm:flex-row sm:items-center ${
                      isDone ? "opacity-60" : ""
                    }`}
                  >

                    {/* Image */}
                    <div className="relative h-16 w-full shrink-0 overflow-hidden rounded-lg bg-[#1b1e24] sm:h-16 sm:w-[112px]">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="h-full w-full object-cover"
                        sizes="(min-width: 640px) 112px, 100vw"
                      />
                    </div>

                    {/* Information */}
                    <div className="min-w-0 flex-1">

                      <h2 className="truncate text-sm font-black uppercase">
                        {workout.name}
                      </h2>

                      <p className="mt-0.5 text-[10px] text-[#858892]">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[9px] text-[#b0b3bb]">

                        <span className="flex items-center gap-1">
                          <span className="text-[#caff00]">
                            ◷
                          </span>
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <span className="text-[#caff00]">
                            ♦
                          </span>
                          {workout.caloriesBurned} kcal
                        </span>

                        <span className="flex items-center gap-1">
                          <span className="text-[#caff00]">
                            ★
                          </span>
                          {workout.rating}
                        </span>

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">

                      <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-full border border-[#343944] px-4 py-2 text-[9px] font-medium text-white transition hover:bg-[#1c2027]"
                      >
                        View Details
                      </Link>

                      {activeTab === "today" && (
                        <button
                          type="button"
                          onClick={() => markAsDone(workout.id)}
                          disabled={isDone}
                          className={`rounded-full px-4 py-2 text-[9px] font-bold transition ${
                            isDone
                              ? "cursor-default bg-[#252a31] text-[#858892]"
                              : "bg-[#caff00] text-black hover:bg-[#d8ff45]"
                          }`}
                        >
                          {isDone ? "✓ Done" : "✓ Mark as Done"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeWorkout(workout.id)}
                        aria-label={`Remove ${workout.name}`}
                        className="px-2 text-lg text-[#727681] transition hover:text-white"
                      >
                        ×
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          )}

        </div>

      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-[#20232a]">

        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">

          <div className="flex items-center gap-2">
            <span className="text-lg text-[#caff00]">
              ⚒
            </span>

            <span className="text-xs font-black tracking-wide">
              FITLOG
            </span>
          </div>

          <p className="text-[9px] text-[#70747e]">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>

      </footer>

    </main>
  );
}