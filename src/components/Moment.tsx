/**
 * "The Moment We're In" — concise context-setting section
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

export default function Moment() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={51}
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
          The moment we&rsquo;re in
        </h2>

        <p className="mt-8 text-xl leading-relaxed text-gray-600">
          The pace of change is accelerating. Our institutions aren&rsquo;t keeping
          up. People feel overwhelmed, disconnected, and stuck in zero-sum
          politics.
        </p>

        <p className="mt-6 text-xl font-semibold text-maroon-700">
          We need something different.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          AI is at a turning point for democracy. It can either erode our
          ability to think and act together&nbsp;&mdash; or help rebuild it.
          BLOOM is building the tools, relationships and capacities communities
          need to make that second path real.
        </p>

      </div>
    </section>
  );
}
