/**
 * "AI as an Ally" — explains AI's role in BLOOM
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

export default function AIAlly() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={113}
        seedCount={14}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.15}
        nodeAlpha={0.18}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          AI as an ally
        </h2>

        <p className="mt-6 text-xl leading-relaxed text-gray-600">
          AI isn&rsquo;t the center of BLOOM. People are. But AI makes it
          possible to synthesize thousands of perspectives in real time, find
          where real agreement exists, and maintain quality at
          scale&nbsp;&mdash; things that weren&rsquo;t viable even 18 months
          ago.
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-2xl font-bold leading-snug text-maroon-700">
          The public steers the process.
          <br />
          AI supports the clarity.
        </p>

        <p className="mt-8 text-lg leading-relaxed text-gray-500">
          Every AI-generated synthesis is grounded in participant statements
          with drill-down to source. Civic hosts can adjust how themes are
          grouped. Human review is required at every point where it matters.
        </p>

        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-bloom-200 bg-white px-8 py-6">
          <p className="text-lg leading-relaxed text-gray-600">
            The most common failure mode in AI-for-democracy work is producing
            better summaries of public will without producing stronger
            publics.{" "}
            <span className="font-semibold text-maroon-700">
              BLOOM is designed against that failure.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
