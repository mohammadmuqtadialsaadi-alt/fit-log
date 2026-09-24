'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Dumbbell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useApp } from '../contexts/AppContext';

export default function Navbar(){
 const path=usePathname(); const {plan,saved}=useApp();
 return <header className="border-b border-[#191e25] bg-[#090b0e]">
  <div className="container flex min-h-[76px] items-center justify-between gap-5">
   <Link href="/" className="flex items-center gap-2 font-black tracking-wide"><Image src="/assets/logo.png" alt="FitLog" width={28} height={28}/><span>FITLOG</span></Link>
   <nav className="hidden items-center gap-2 sm:flex">
    <Link href="/" className={`rounded-full px-5 py-2 text-xs font-semibold ${path==='/'?'bg-[#172400] text-[var(--lime)]':'text-[#b5bbc4]'}`}>Workouts</Link>
    <Link href="/my-plan" className={`rounded-full px-5 py-2 text-xs font-semibold ${path.startsWith('/my-plan')?'bg-[#172400] text-[var(--lime)]':'text-[#b5bbc4]'}`}>My Plan</Link>
   </nav>
   <div className="flex items-center gap-4 text-xs"><Link href="/my-plan" className="flex items-center gap-2 text-[#c5cad1]">Plan <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[var(--lime)] px-1 font-black text-[#0a0d0f]">{plan.length}</span></Link><Link href="/my-plan?tab=saved" className="flex items-center gap-2 text-[#c5cad1]">Saved <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#39414c] px-1 text-[#d7dbe1]">{saved.length}</span></Link></div>
  </div>
  <div className="border-t border-[#171b21] sm:hidden"><div className="container flex justify-center gap-2 py-2"><Link href="/" className={`rounded-full px-4 py-1.5 text-xs ${path==='/'?'bg-[#172400] text-[var(--lime)]':'text-[#aeb5bf]'}`}>Workouts</Link><Link href="/my-plan" className={`rounded-full px-4 py-1.5 text-xs ${path.startsWith('/my-plan')?'bg-[#172400] text-[var(--lime)]':'text-[#aeb5bf]'}`}>My Plan</Link></div></div>
 </header>
}
