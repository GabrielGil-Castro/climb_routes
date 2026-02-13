import { Mountain } from "lucide-react";

export default function Header() {
  return (
    <header className="
      bg-linear-to-tl 
      from-green-400/80 via-teal-800  to-teal-900
      text-white
      shadow-lg
      border-b border-b-emerald-500
    ">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-end gap-3 mb-2">
          <Mountain className="w-8 h-8 text-teal-300" />
          <h1 className="text-3xl font-bold text-slate-200/95">
            Vertical Trust
          </h1>
        </div>

        <p className="text-zinc-200 text-sm tracking-wide">
          Climbing Guide & Route Finder
        </p>
      </div>
    </header>
  );
}
