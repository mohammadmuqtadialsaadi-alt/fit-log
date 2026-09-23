"use client";

import { useState } from "react";

export default function WorkoutActions() {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setAdded(true)}
        disabled={added}
        className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-xs font-bold uppercase transition ${
          added
            ? "cursor-not-allowed bg-[#24272d] text-[#858892]"
            : "bg-[#caff00] text-black hover:bg-[#d8ff45]"
        }`}
      >
        {added
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => setSaved(true)}
        disabled={saved}
        className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-xs font-bold uppercase transition ${
          saved
            ? "cursor-not-allowed border-[#caff00]/30 text-[#caff00]"
            : "border-[#343740] bg-transparent text-white hover:bg-[#1b1d23]"
        }`}
      >
        {saved
          ? "Saved for later"
          : "Save for later"}
      </button>
    </div>
  );
}