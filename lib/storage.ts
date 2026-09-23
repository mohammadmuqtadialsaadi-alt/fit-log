import { Workout } from "./types";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function getPlan(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(PLAN_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getSaved(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(SAVED_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToPlan(workout: Workout): boolean {
  const plan = getPlan();

  if (plan.some((item) => item.id === workout.id)) {
    return false;
  }

  if (plan.length >= 5) {
    return false;
  }

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify([...plan, workout])
  );

  return true;
}

export function removeFromPlan(id: number) {
  const plan = getPlan();

  const updatedPlan = plan.filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(updatedPlan)
  );
}

export function saveWorkout(workout: Workout): boolean {
  const saved = getSaved();

  if (saved.some((item) => item.id === workout.id)) {
    return false;
  }

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify([...saved, workout])
  );

  return true;
}

export function removeSaved(id: number) {
  const saved = getSaved();

  const updatedSaved = saved.filter(
    (workout) => workout.id !== id
  );

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(updatedSaved)
  );
}