import { Mountain } from "lucide-react";

export default function Header() {
  return (
    <header className="
      bg-linear-to-br 
      from-zinc-800 via-zinc-500 to-zinc-700
      text-white
      shadow-lg
      border-b border-white/10
    ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Mountain className="w-8 h-8 text-emerald-700" />
          <h1 className="text-3xl font-bold text-zinc-100">
            San Vito Lo Capo
          </h1>
        </div>

        <p className="text-zinc-200/80 text-sm tracking-wide">
          Climbing Guide & Route Finder
        </p>
      </div>
    </header>
  );
}
