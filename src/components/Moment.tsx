/**
 * "The Moment We're In" — concise context-setting section
 */

const CHALLENGES = [
  "Climate shocks",
  "AI disruption",
  "Youth mental health",
  "School budgets",
  "Housing",
  "Immigration",
];

export default function Moment() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          The moment we're in
        </h2>

        {/* Challenge list — plain text, not clickable */}
        <p className="mt-8 font-mono text-xs font-medium tracking-wide text-bloom-600">
          {CHALLENGES.join(" \u00b7 ")}
        </p>

        <p className="mt-8 text-lg leading-relaxed text-gray-600">
          The pace of change is accelerating. Our institutions aren't keeping
          up. People feel overwhelmed, disconnected, and stuck in zero-sum
          politics where half the country loses.
        </p>

        <p className="mt-6 text-xl font-semibold text-maroon-700">
          We need something different.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-500">
          What if communities had tools to make sense of complex issues
          together, find real agreement across differences, and turn
          conversation into coordinated action?
        </p>
      </div>
    </section>
  );
}
