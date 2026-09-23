import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Muscle groups */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-black/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00] backdrop-blur"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-black uppercase tracking-tight text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold text-white/50">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={14} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}