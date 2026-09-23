"use client";

import { useState } from "react";
import type { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

type WorkoutGridProps = {
  workouts: Workout[];
};

export default function WorkoutGrid({ workouts }: WorkoutGridProps) {
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">(
    "duration"
  );

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <div>
      {/* Sort Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value as "duration" | "calories" | "rating"
            )
          }
          className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white outline-none focus:border-[#ccff00]"
        >
          <option value="duration">Sort By: Duration</option>
          <option value="calories">Sort By: Calories</option>
          <option value="rating">Sort By: Rating</option>
        </select>
      </div>

      {/* Workout Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </div>
  );
}