/**
 * "The Moment We're In" — concise context-setting section
 */

const ISSUE_PATHWAYS = [
  "Youth mental health & social tech",
  "Work & economic transitions",
  "Energy, data centers & environment",
  "Information integrity",
];

export default function Moment() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          The moment we're in
        </h2>

        <p className="mt-8 text-lg leading-relaxed text-gray-600">
          The pace of change is accelerating. Our institutions aren't keeping
          up. People feel overwhelmed, disconnected, and stuck in zero-sum
          politics where half the country loses.
        </p>

        <p className="mt-6 text-xl font-semibold text-maroon-700">
          We need something different.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-500">
          AI is at a turning point for democracy. It can either atrophy
          our collective capacity&nbsp;&mdash; or rebuild it. BLOOM is building
          infrastructure for the second possibility.
        </p>

        {/* 2026 issue pathways */}
        <p className="mt-8 font-mono text-xs font-medium tracking-wide text-bloom-600">
          {ISSUE_PATHWAYS.join(" \u00b7 ")}
        </p>
      </div>
    </section>
  );
}
