import './globals.css';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastHost from './components/ToastHost';

export const metadata = { title: 'FitLog — Workout Library', description: 'A dark, no-nonsense workout library and daily plan.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><div className="app-shell"><AppProvider><Navbar />{children}<Footer /><ToastHost /></AppProvider></div></body></html>;
}
