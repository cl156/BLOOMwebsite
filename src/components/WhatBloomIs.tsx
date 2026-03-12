/**
 * "What BLOOM Is" — identity statement, dark band
 */

const TRAITS = [
  { icon: "\u25B8", label: "Collective intelligence infrastructure" },
  { icon: "\u25B8", label: "Locally rooted, cross-local when needed" },
  { icon: "\u25B8", label: "Action-oriented \u2014 not just discussion" },
  { icon: "\u25B8", label: "Nonpartisan and broadly accessible" },
  { icon: "\u25B8", label: "AI-enabled, human-led" },
];

const HOST_CAPABILITIES = [
  "Launch informed public conversations",
  "Surface shared priorities across differences",
  "Build durable common ground",
  "Coordinate across communities when the lever of change lives elsewhere",
];

export default function WhatBloomIs() {
  return (
    <section className="relative bg-maroon-700 py-20 text-white md:py-28">
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            What BLOOM is
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bloom-100">
            BLOOM is civic infrastructure for coordinated, community-rooted
            problem-solving. We support Civic Hosts&nbsp;&mdash; organizers,
            community leaders, institutions&nbsp;&mdash; with tools that make it
            dramatically easier to:
          </p>

          <div className="mt-6 inline-flex flex-col items-start gap-2 text-left">
            {HOST_CAPABILITIES.map((item) => (
              <span key={item} className="flex items-start gap-2 text-sm text-bloom-100">
                <span className="mt-0.5 font-mono text-bloom-300">&#10003;</span>
                {item}
              </span>
            ))}
          </div>

          <p className="mt-8 text-base font-medium text-bloom-200">
            We don't replace existing civic work. We strengthen it.
          </p>
        </div>

        {/* Trait chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {TRAITS.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium"
            >
              <span className="font-mono text-bloom-300" aria-hidden="true">
                {icon}
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
