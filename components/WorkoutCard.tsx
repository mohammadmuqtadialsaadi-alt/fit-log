import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import { Workout } from "@/lib/types";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block"
    >
      <article className="overflow-hidden rounded-xl border border-[#26282e] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#caff00]/40">
        {/* IMAGE */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1b1d22]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#caff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* NAME */}
          <h2 className="mt-4 text-xl font-black uppercase leading-tight text-white">
            {workout.name}
          </h2>

          {/* EQUIPMENT */}
          <p className="mt-2 text-sm text-[#858892]">
            {workout.equipment}
          </p>

          {/* STATS */}
          <div className="mt-5 flex items-center gap-4 border-t border-[#282b32] pt-4 text-xs text-[#999ca5]">
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
      </article>
    </Link>
  );
}