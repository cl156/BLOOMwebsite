/**
 * "For Funders & Foundations" — partner audience
 */

const BLOOM_ENABLES = [
  "Multi-region synchronized dialogues",
  "Cross-local coherence on shared issues",
  "Rapid public input cycles",
  "Institutional integration",
];

export default function ForPartners() {
  return (
    <section id="for-partners" className="relative bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            For funders &amp; foundations
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Most of the democratic innovation field focuses on one-off
            assemblies. BLOOM builds the missing middle.
          </p>
        </div>

        {/* Value props */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Repeatable infrastructure",
              desc: "Not one-off events \u2014 durable civic capacity that compounds over time.",
            },
            {
              title: "Networked communities",
              desc: "Communities that coordinate across regions on shared issues.",
            },
            {
              title: "Durable public legitimacy",
              desc: "Broad-based agreement that holds up politically and builds trust.",
            },
            {
              title: "Civic capacity that compounds",
              desc: "Each cycle builds knowledge, trust, and infrastructure for the next one.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-bloom-300 hover:shadow-md"
            >
              <h3 className="text-base font-bold text-maroon-700">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* What BLOOM enables */}
        <div className="mx-auto mt-14 max-w-2xl rounded-lg border border-bloom-200 bg-white p-8 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
            BLOOM enables
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {BLOOM_ENABLES.map((item) => (
              <span
                key={item}
                className="rounded-md border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-medium text-maroon-700"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            If democratic innovation is going to matter in an era of AI and
            systemic disruption, it needs coordinated, repeatable
            infrastructure. We're building that.
          </p>
          <a
            href="#get-involved"
            className="mt-6 inline-block rounded-lg bg-bloom-500 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-bloom-600"
          >
            Partner with BLOOM
          </a>
        </div>
      </div>
    </section>
  );
}
