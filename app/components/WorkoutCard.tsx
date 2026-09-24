import Image from 'next/image';
import Link from 'next/link';
import { Workout } from '../contexts/AppContext';
import { WorkoutStats } from './Stats';
export default function WorkoutCard({w}:{w:Workout}){return <Link href={`/workouts/${w.id}`} className="card block overflow-hidden transition hover:-translate-y-1 hover:border-[#3a424d]"><div className="relative aspect-[1.7] overflow-hidden bg-[#20252c]"><Image src={w.image} alt={w.name} fill sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 33vw" className="object-cover"/></div><div className="p-4"><div className="mb-2 flex flex-wrap gap-1.5">{w.muscleGroups.slice(0,2).map(m=><span key={m} className="tag">{m}</span>)}</div><h3 className="display text-lg font-black uppercase">{w.name}</h3><p className="mt-1 text-[11px] text-[#8e96a3]">{w.equipment}</p><div className="mt-3"><WorkoutStats duration={w.duration} calories={w.caloriesBurned} rating={w.rating}/></div></div></Link>}
