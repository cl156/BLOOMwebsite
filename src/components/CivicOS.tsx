/**
 * "Powered by CivicOS" — the platform introduction
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

const CIVIC_OS_FEATURES = [
  "Multiple ways to participate \u2014 surveys, online forums, in-person assemblies, live dialogue",
  "AI that surfaces patterns and areas of agreement across contributions",
  "Reporting that scales from a single neighborhood to a statewide coalition",
  "One login across all tools, so participants stay connected across sessions",
];

const TRAITS = [
  { icon: "\u25B8", label: "Action-oriented \u2014 not just discussion" },
  { icon: "\u25B8", label: "Nonpartisan and broadly accessible" },
  { icon: "\u25B8", label: "AI-enabled, human-led" },
];

export default function CivicOS() {
  return (
    <section
      id="civic-os"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={73}
        seedCount={16}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.14}
        nodeAlpha={0.17}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
          The platform
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          Powered by CivicOS
        </h2>
        <p className="mt-5 text-xl leading-relaxed text-gray-600">
          CivicOS is a free, open-source platform that supports full public
          problem-solving processes&nbsp;&mdash; from framing the right questions
          to reporting what was heard and what happens next.
        </p>

        <div className="mt-8 inline-flex flex-col items-start gap-2 text-left">
          {CIVIC_OS_FEATURES.map((item) => (
            <span key={item} className="flex items-start gap-2 text-base text-gray-600">
              <span className="mt-0.5 font-mono text-bloom-500">&#9670;</span>
              {item}
            </span>
          ))}
        </div>

        {/* Trait chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {TRAITS.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700"
            >
              <span className="font-mono text-bloom-500" aria-hidden="true">
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
