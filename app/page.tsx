'use client';
import Image from 'next/image';
import { ArrowDown, Dumbbell } from 'lucide-react';
import { useEffect, useState } from 'react';
import WorkoutCard from './components/WorkoutCard';
import Loading from './components/Loading';
import type { Workout } from './contexts/AppContext';
const API='https://api.api-store.workers.dev/api/fitlog';
export default function Home(){ const [data,setData]=useState<Workout[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
 useEffect(()=>{fetch(API).then(r=>{if(!r.ok)throw new Error('Failed');return r.json()}).then(setData).catch(()=>setError('Could not load workouts right now.')).finally(()=>setLoading(false))},[]);
 return <main><section className="container py-7 sm:py-9"><div className="card relative min-h-[310px] overflow-hidden p-7 sm:p-10"><div className="relative z-10 max-w-[630px]"><p className="mb-3 text-[10px] font-black tracking-[.18em] text-[var(--lime)]">WORKOUT LIBRARY</p><h1 className="display max-w-[650px] text-4xl font-black uppercase leading-[.94] sm:text-6xl">TRAIN WITH INTENT. LOG EVERY SET.</h1><p className="mt-5 max-w-[600px] text-sm leading-6 text-[#9da5b0]">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p><a href="#library" className="lime-btn mt-6 inline-flex items-center gap-2 px-5 py-3 text-xs"><Dumbbell size={15}/> BROWSE WORKOUTS <ArrowDown size={14}/></a></div><Image src="/assets/banner.png" alt="Workout illustration" width={334} height={334} className="pointer-events-none absolute -right-2 bottom-[-34px] w-[230px] opacity-95 sm:right-7 sm:w-[280px]"/></div></section>
 <section id="library" className="container pb-12"><div className="mb-6"><h2 className="display text-3xl font-black uppercase sm:text-4xl">THE LIBRARY</h2><p className="mt-1 text-xs text-[#858e9a]">Twelve lifts covering every major muscle group.</p></div>{loading?<Loading/>:error?<div className="card p-8 text-center text-sm text-red-300">{error}</div>:<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.map(w=><WorkoutCard key={w.id} w={w}/>)}</div>}</section></main>;
}
