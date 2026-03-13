/**
 * "AI as an Ally" — explains AI's role in BLOOM
 */

const AI_CAPABILITIES = [
  "Faster synthesis of thousands of perspectives",
  "Real-time identification of bridging consensus",
  "High-quality learning material generation",
  "Scalable evaluation of public support",
];

const RESPONSIBLE_AI = [
  "Synthesis grounded in participant statements with drill-down to source",
  "Editable thematic clusters that communities can refine",
  "Human validation at every legitimacy-critical point",
  "Opinion auditing to ensure no voice is misrepresented",
];

export default function AIAlly() {
  return (
    <section className="relative bg-gray-50 py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
              AI as an ally
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              AI isn't the center of BLOOM. People are. But AI makes possible
              things that weren't viable 12&ndash;18 months ago:
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {AI_CAPABILITIES.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-md border border-gray-200 bg-white px-5 py-3 transition-colors hover:border-bloom-200"
                >
                  <span className="mt-0.5 font-mono text-sm text-bloom-500" aria-hidden="true">
                    &#9670;
                  </span>
                  <span className="text-sm font-medium text-maroon-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Responsible AI details */}
            <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
              Built-in accountability
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {RESPONSIBLE_AI.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bloom-400" />
                  <span className="text-sm leading-relaxed text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — principle card */}
          <div className="rounded-lg border border-bloom-200 bg-white p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
              The principle
            </p>
            <p className="mt-4 text-xl font-bold leading-snug text-maroon-700">
              The public steers the process.
              <br />
              AI supports the clarity.
            </p>
            <div className="mt-8 space-y-4">
              {["Move faster", "Surface patterns clearly", "Maintain quality at scale"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-bloom-400" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* Anti-failure-mode framing */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-sm leading-relaxed text-gray-500">
                The most common failure mode in AI-for-democracy work is
                producing better summaries of public will without producing
                stronger publics.{" "}
                <span className="font-semibold text-maroon-700">
                  BLOOM is designed against that failure.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
