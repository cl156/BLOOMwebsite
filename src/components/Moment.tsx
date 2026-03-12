/**
 * "The Moment We're In" — context-setting section
 *
 * Establishes urgency without being alarmist.
 */

const CHALLENGES = [
  "Climate shocks",
  "AI disruption",
  "Youth mental health",
  "School budgets",
  "Housing",
  "Immigration",
];

const PAIN_POINTS = [
  "Overwhelmed",
  "Disconnected",
  "Talked at, not listened to",
  "Stuck in 51% politics where half the country loses",
];

export default function Moment() {
  return (
    <section className="relative bg-white py-20 md:py-28">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6B2A3D 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          The moment we're in
        </h2>

        {/* Challenge tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CHALLENGES.map((c) => (
            <span
              key={c}
              className="rounded-md border border-bloom-200 bg-bloom-50/60 px-3.5 py-1.5 font-mono text-xs font-medium text-bloom-700"
            >
              {c}
            </span>
          ))}
        </div>

        <p className="mt-8 text-lg leading-relaxed text-gray-600">
          The pace of change is accelerating. Our institutions aren't keeping up.
          And most online "public conversation" makes things worse.
        </p>

        {/* Pain points */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PAIN_POINTS.map((p) => (
            <span
              key={p}
              className="rounded-md border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm text-gray-500"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-md border border-bloom-200 bg-bloom-50/40 p-6">
          <p className="text-base font-medium text-maroon-700">
            What if communities had tools to make sense of complex issues
            together, find 70%+ durable agreement, coordinate across local and
            state levels, and turn conversation into action?
          </p>
        </div>
      </div>
    </section>
  );
}
