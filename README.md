# FitLog

FitLog is a responsive dark workout library built with Next.js App Router and Tailwind CSS. It lets users browse twelve lifts, open detailed workout pages, build a five-exercise daily plan, save workouts for later, mark planned workouts as done, and sort plan items by duration, calories, or rating.

## Technologies
- Next.js + App Router
- React + TypeScript
- Tailwind CSS
- Lucide React icons
- FitLog REST API
- Browser localStorage for plan/saved/done persistence

## Features
1. Responsive navbar with live Plan/Saved counters.
2. Hero section with same-page library anchor CTA.
3. Twelve-workout responsive library loaded from the provided API.
4. Dynamic workout detail pages with specs and instructions.
5. Add-to-plan and save-for-later actions with toast feedback.
6. My Plan metrics, tabs, sorting, mark-as-done, remove, and empty states.
7. Responsive layouts for mobile, tablet, and desktop.
8. Custom 404 page and route-safe App Router navigation.
9. Loading states while workout data is fetched.
10. Local persistence so a page reload keeps the user's plan.

## API
- All workouts: https://api.abcz.workers.dev/api/fitlog
- Single workout: https://api.abcz.workers.dev/api/fitlog/:id

## Run locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Production
```bash
npm run build
npm start
```

## Git commits
The supplied project archive includes a clean Git history with eight meaningful commits demonstrating the implementation stages.
