'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Workout = { id:number; name:string; image:string; muscleGroups:string[]; equipment:string; difficulty:string; duration:number; caloriesBurned:number; sets:number; reps:string; rating:number; description:string; instructions:string[] };

type ContextValue = {
  plan:number[]; saved:number[]; done:number[]; addToPlan:(id:number)=>void; saveForLater:(id:number)=>void; removeFromPlan:(id:number)=>void; removeSaved:(id:number)=>void; markDone:(id:number)=>void; isInPlan:(id:number)=>boolean; isSaved:(id:number)=>boolean; toast:(message:string)=>void;
};
const Ctx = createContext<ContextValue | null>(null);
const read = (key:string):number[] => { if(typeof window==='undefined') return []; try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };

export function AppProvider({children}:{children:React.ReactNode}) {
  const [plan,setPlan]=useState<number[]>([]), [saved,setSaved]=useState<number[]>([]), [done,setDone]=useState<number[]>([]), [hydrated,setHydrated]=useState(false);
  const [message,setMessage]=useState('');
  useEffect(()=>{ setPlan(read('fitlog-plan')); setSaved(read('fitlog-saved')); setDone(read('fitlog-done')); setHydrated(true); },[]);
  useEffect(()=>{ if(hydrated) localStorage.setItem('fitlog-plan',JSON.stringify(plan)); },[plan,hydrated]);
  useEffect(()=>{ if(hydrated) localStorage.setItem('fitlog-saved',JSON.stringify(saved)); },[saved,hydrated]);
  useEffect(()=>{ if(hydrated) localStorage.setItem('fitlog-done',JSON.stringify(done)); },[done,hydrated]);
  const toast=(m:string)=>{ setMessage(m); window.setTimeout(()=>setMessage(''),2400); };
  const addToPlan=(id:number)=>{ if(plan.includes(id)){ toast('Already in today\'s plan'); return; } if(plan.length>=5){ toast('Today\'s plan is capped at five lifts'); return; } setPlan(p=>[...p,id]); toast('Added to today\'s plan'); };
  const saveForLater=(id:number)=>{ if(saved.includes(id)){ toast('Already saved'); return; } setSaved(s=>[...s,id]); toast('Saved for later'); };
  const removeFromPlan=(id:number)=>{ setPlan(p=>p.filter(x=>x!==id)); setDone(d=>d.filter(x=>x!==id)); toast('Removed from today\'s plan'); };
  const removeSaved=(id:number)=>{ setSaved(s=>s.filter(x=>x!==id)); toast('Removed from saved'); };
  const markDone=(id:number)=>{ setDone(d=>d.includes(id)?d:[...d,id]); toast('Workout marked as done'); };
  const value=useMemo(()=>({plan,saved,done,addToPlan,saveForLater,removeFromPlan,removeSaved,markDone,isInPlan:(id:number)=>plan.includes(id),isSaved:(id:number)=>saved.includes(id),toast}),[plan,saved,done]);
  return <Ctx.Provider value={value}>{children}{message && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#3b4652] bg-[#171c23] px-5 py-3 text-sm font-bold shadow-2xl fade-in">{message}</div>}</Ctx.Provider>;
}
export const useApp=()=>{ const c=useContext(Ctx); if(!c) throw new Error('useApp must be used inside AppProvider'); return c; };
