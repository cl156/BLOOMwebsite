/**
 * "What BLOOM Is" — identity statement
 */
import MycelialCanvas from "./MycelialCanvas";

/* Light palette for mycelial network on dark maroon background */
const BLOOM_NET_COLORS = [
  "255,255,255",   // white
  "244,200,210",   // light pink
  "255,220,225",   // soft rose
  "230,180,190",   // dusty pink
  "200,160,170",   // muted mauve
];

const HOST_CAPABILITIES = [
  "Launch informed public conversations",
  "Surface shared priorities across differences",
  "Build durable common ground",
  "Coordinate across communities when the lever of change lives elsewhere",
];

export default function WhatBloomIs() {
  return (
    <section
      id="what-bloom-is"
      className="relative py-20 text-white md:py-28"
      style={{ background: "linear-gradient(180deg, #5e2636 0%, #6B2A3D 30%, #6B2A3D 70%, #4d1f2e 100%)" }}
    >
      {/* Mycelial network background */}
      <MycelialCanvas
        colors={BLOOM_NET_COLORS}
        seed={99}
        seedCount={22}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.8}
        fadeRyRatio={0.85}
        edgeAlpha={0.15}
        nodeAlpha={0.2}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            What BLOOM is
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-bloom-100">
            Bloom is building civic infrastructure for coordinated, community-rooted
            problem-solving. Our model is that of a library&nbsp;&mdash; open
            infrastructure communities use to identify and act on their own
            shared problems. We organize around shared problems, not political
            positions.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-bloom-200">
            We support Civic Hosts&nbsp;&mdash; organizers, community leaders,
            institutions&nbsp;&mdash; with tools that make it dramatically
            easier to:
          </p>

          <div className="mt-6 inline-flex flex-col items-start gap-2 text-left">
            {HOST_CAPABILITIES.map((item) => (
              <span key={item} className="flex items-start gap-2 text-base text-bloom-100">
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
                <p className="mt-2 text-base leading-relaxed text-bloom-100">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium text-bloom-200">
            We don&rsquo;t replace existing civic work. We strengthen it.
          </p>
        </div>
      </div>
    </section>
  );
}
