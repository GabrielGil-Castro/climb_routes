import heroImage from "../assets/images.png";
import {Link} from 'react-router-dom'
import About from "./Legacy";

export default function Home() {
  return (
    <div>

    <div
      className="pt-12 min-h-screen flex items-center justify-center"
      style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
          url(${heroImage}) center/cover no-repeat`,
        }}
        >
      <div className="text-center px-6 text-transparent bg-clip-text bg-linear-to-r from-teal-50 to-teal-100">
        <h1 className="text-6xl font-bold mb-6">
          Anchor Ledger
        </h1>

        <p className="text-lg text-teal-50/80 mb-8 max-w-xl">
          A centralized hub for information on every route. The living memory os the sport.
        </p>

        <Link
             to="/routes"
             className="inline-block bg-cyan-50 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-100 hover:text-slate-950/80 transition"
             >
         Explore Routes →
            </Link>
            </div>
        </div>
        <About/>
    </div>
  );
}
