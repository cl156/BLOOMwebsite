/**
 * "We're Smarter Together" — bridging section
 */
export default function SmarterTogether() {
  return (
    <section className="relative bg-white py-20 md:py-28">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6B2A3D 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          We're smarter together
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          No one has the whole story. Complex problems require partial knowledge
          to be woven together.
        </p>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
          {[
            "People feel respected",
            "Differences are surfaced \u2014 not suppressed",
            "Shared ground becomes visible",
            "Nobody \u201Cwins\u201D by making others lose",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-md border border-gray-100 bg-gray-50 px-5 py-4 transition-colors hover:border-bloom-200"
            >
              <span className="mt-0.5 font-mono text-sm text-bloom-500" aria-hidden="true">
                &#10003;
              </span>
              <span className="text-sm font-medium text-maroon-700">
                {item}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-relaxed text-gray-600">
          We move from adversarial, zero-sum politics to coordinated
          problem-solving. Not by pretending divisions aren't real&nbsp;&mdash;
          but by refusing to let them define what's possible.
        </p>
      </div>
    </section>
  );
}
