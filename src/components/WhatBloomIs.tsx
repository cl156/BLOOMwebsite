/**
 * "What BLOOM Is" — identity statement + CivicOS product introduction
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

const CIVIC_OS_FEATURES = [
  "Multi-format participation \u2014 surveys, deliberation, live dialogue",
  "AI-assisted synthesis and pattern visualization",
  "Federated reporting from local to cross-state scale",
  "Shared identity layer across integrated tools",
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
        {/* BLOOM — the org/mission */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            What BLOOM is
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bloom-100">
            BLOOM is civic infrastructure for coordinated, community-rooted
            problem-solving. Our model is that of a library&nbsp;&mdash; open
            infrastructure communities use to identify and act on their own
            shared problems. We organize around shared problems, not political
            positions.
          </p>
          <p className="mt-4 text-base leading-relaxed text-bloom-200">
            We support Civic Hosts&nbsp;&mdash; organizers, community leaders,
            institutions&nbsp;&mdash; with tools that make it dramatically
            easier to:
          </p>

          <div className="mt-6 inline-flex flex-col items-start gap-2 text-left">
            {HOST_CAPABILITIES.map((item) => (
              <span key={item} className="flex items-start gap-2 text-sm text-bloom-100">
                <span className="mt-0.5 font-mono text-bloom-300">&#10003;</span>
                {item}
              </span>
            ))}
          </div>

          {/* Three-element structure */}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {[
              { label: "CivicOS", desc: "A modular open-source platform for the full deliberation workflow" },
              { label: "Civic Hosts", desc: "A network of trained community leaders who commission and steward local processes" },
              { label: "Headline Deliberations", desc: "Flagship cycles that demonstrate impact, advance R&D, and build the field" },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-md border border-white/15 bg-white/5 px-4 py-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-bloom-300">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bloom-100">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-base font-medium text-bloom-200">
            We don't replace existing civic work. We strengthen it.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto my-14 h-px max-w-md bg-white/15" />

        {/* CivicOS — the product */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-300">
            The platform
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Powered by CivicOS
          </h3>
          <p className="mt-5 text-lg leading-relaxed text-bloom-100">
            CivicOS is a modular, open-source platform that weaves multiple
            participation methods into a single end-to-end
            workflow&nbsp;&mdash; so communities can learn together, contribute
            in multiple formats, and receive clear reporting on what was heard
            and what happens next.
          </p>
          <p className="mt-4 text-base leading-relaxed text-bloom-200">
            Not a new tool&nbsp;&mdash; a switchboard. CivicOS integrates
            existing leading tools&nbsp;&mdash; Polis for large-group opinion
            mapping, Talk to the City for AI-assisted synthesis, facilitated
            dialogue on Jitsi, and others&nbsp;&mdash; under a shared identity
            layer, a workflow engine, and a federated data ontology that lets
            outputs be read at the local, regional, and cross-state level
            simultaneously.
          </p>

          <div className="mt-8 inline-flex flex-col items-start gap-2 text-left">
            {CIVIC_OS_FEATURES.map((item) => (
              <span key={item} className="flex items-start gap-2 text-sm text-bloom-100">
                <span className="mt-0.5 font-mono text-bloom-300">&#9670;</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Trait chips */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
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
