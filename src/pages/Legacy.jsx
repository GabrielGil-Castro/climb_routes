export default function Legacy() {
  return (
    <section className="min-h-screen bg-linear-to-t from-slate-700 to-slate-950 text-white px-6 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="border border-white/10 rounded-2xl p-10 bg-white/5">
          <h1 className="text-5xl font-bold mb-6">
            A Legacy <span className="text-white/40">at Risk</span>
          </h1>

          <p className="text-white/70 leading-relaxed text-lg">
            Climbing technology has evolved, but institutional management is still
            stuck in the past. We are losing technical history through leadership
            transitions, forcing volunteers to make complex safety decisions
            without expert tools.
            <br />
            <br />
            These aren’t just hurdles — they are systemic risks.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="border border-white/15 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition">
            <h2 className="text-xl font-semibold mb-3">
              Community Amnesia
            </h2>
            <p className="text-white/70 leading-relaxed">
              Critical safety data is lost during leadership changes.  
              We lack a global inventory.  
              <span className="font-semibold text-white">
                Our history is fading.
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-white/15 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition">
            <h2 className="text-xl font-semibold mb-3">
              Scientific Blindness
            </h2>
            <p className="text-white/70 leading-relaxed">
              Safety expertise is scarce and standards evolve.  
              Associations struggle with complex hardware decisions.  
              Our system automates updated expert guidance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-white/15 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition">
            <h2 className="text-xl font-semibold mb-3">
              The Communication Silo
            </h2>
            <p className="text-white/70 leading-relaxed">
              A massive gap exists between maintainers and climbers.  
              Users lack real-time safety info, while federations miss vital
              field feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Statement */}
      <div className="max-w-6xl mx-auto mt-20 border-t border-white/10 pt-10 text-center">
        <h3 className="text-xl font-semibold">
          Global Sports Intelligence
        </h3>
        <p className="text-white/60 mt-2">
          Real-time data on routes and federations worldwide.  
          Centralized control to drive safer sport management decisions.
        </p>
      </div>
    </section>
  );
}
