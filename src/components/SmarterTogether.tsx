/**
 * "We're Smarter Together" — bridging section
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

export default function SmarterTogether() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={47}
        seedCount={14}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.14}
        nodeAlpha={0.17}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          &ldquo;We&rsquo;re smarter together.&rdquo;
        </h2>
        <p className="mt-6 text-xl leading-relaxed text-gray-600">
          No one has the whole story. The best answers come from putting pieces together.
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
              className="flex items-start gap-3 rounded-md border border-gray-100 bg-white px-5 py-4 transition-colors hover:border-bloom-200"
            >
              <span className="mt-0.5 font-mono text-sm text-bloom-500" aria-hidden="true">
                &#10003;
              </span>
              <span className="text-base font-medium text-maroon-700">
                {item}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg leading-relaxed text-gray-600">
          We move from adversarial, zero-sum politics to coordinated
          problem-solving. Not by pretending divisions aren&rsquo;t real&nbsp;&mdash;
          but by refusing to let them define what&rsquo;s possible.
        </p>
      </div>
    </section>
  );
}
