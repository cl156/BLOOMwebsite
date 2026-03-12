/**
 * "Zero to Conversation to Coherence to Action" — the BLOOM process
 */

const STEPS = [
  {
    step: "01",
    title: "Learn together",
    description:
      "Generate clear, accessible learning materials tailored to your issue and community.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Deliberate at scale",
    description:
      "Host structured dialogues that surface common ground across differences \u2014 not just the loudest voices.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Discover durable agreement",
    description:
      "Identify proposals that reach 70%+ support across demographic and political divides.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Coordinate for impact",
    description:
      "If your solution lives at the school board, city council, or state legislature \u2014 BLOOM helps federate shared insights upward. From hyperlocal to cross-local power.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
            Zero &rarr; Conversation &rarr; Coherence &rarr; Action
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            How BLOOM works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Most deliberative processes take months to launch. BLOOM helps you
            move from zero to meaningful public conversation&nbsp;&mdash; fast.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, title, description, icon }, i) => (
            <div
              key={step}
              className="relative rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              {/* Connector line between cards on large screens */}
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-px w-8 bg-bloom-200 lg:block" aria-hidden="true" />
              )}

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-bloom-50 text-bloom-600">
                {icon}
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-bloom-400">
                Step {step}
              </span>
              <h3 className="mt-1.5 text-lg font-bold text-maroon-700">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
