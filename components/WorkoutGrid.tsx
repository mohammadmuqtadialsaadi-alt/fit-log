import type { Workout } from "@/lib/types";
import WorkoutCard from "./WorkoutCard";

type WorkoutGridProps = {
  workouts: Workout[];
};

export default function WorkoutGrid({
  workouts,
}: WorkoutGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
        />
      ))}
    </div>
  );
}