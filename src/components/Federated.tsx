/**
 * "Federated by Design" — explains cross-local coordination
 */

const EXAMPLES = [
  {
    issue: "Youth mental health",
    scope: "Families, schools, state budgets, tech platforms",
  },
  {
    issue: "Housing",
    scope: "Local \u2014 and state-level",
  },
  {
    issue: "AI policy",
    scope: "Global \u2014 and deeply local",
  },
];

const CAPABILITIES = [
  "Run local dialogues",
  "Surface shared priorities",
  "Federate insights across regions",
  "Coordinate where policy leverage actually exists",
];

export default function Federated() {
  return (
    <section className="relative bg-maroon-700 py-20 text-white md:py-28">
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Federated by design
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bloom-100">
            Many problems live at multiple scales. BLOOM is designed for
            coordinated, rooted action.
          </p>
        </div>

        {/* Multi-scale examples */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {EXAMPLES.map(({ issue, scope }) => (
            <div
              key={issue}
              className="rounded-lg border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-bloom-300">
                {issue}
              </p>
              <p className="mt-2 text-sm text-bloom-100">{scope}</p>
            </div>
          ))}
        </div>

        {/* What communities can do */}
        <div className="mx-auto mt-12 max-w-lg">
          <p className="mb-4 text-center text-sm font-medium text-bloom-200">
            Communities can:
          </p>
          <div className="flex flex-col gap-3">
            {CAPABILITIES.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-5 py-3"
              >
                <span className="font-mono text-bloom-300" aria-hidden="true">&#9654;</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-sm font-medium text-bloom-200">
            Trans-local power&nbsp;&mdash; without losing local identity.
          </p>
        </div>
      </div>
    </section>
  );
}
