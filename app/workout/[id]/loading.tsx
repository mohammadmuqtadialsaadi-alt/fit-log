export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0c0d10] text-white">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#caff00]" />

        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#858892]">
          Loading workout...
        </p>
      </div>
    </main>
  );
}