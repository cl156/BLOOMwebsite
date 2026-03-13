/**
 * "Not Another Platform" — differentiation section
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

const WE_ARE_NOT = [
  "A social media replacement",
  "A partisan campaign tool",
  "A VC-backed tech play",
  "A one-off civic experiment",
];

const WE_ARE = [
  "Public infrastructure",
  "Service-oriented",
  "Action-oriented",
  "Designed for cultural resonance",
  "Built to last",
];

export default function Principles() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={127}
        seedCount={14}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.05}
        nodeAlpha={0.07}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          Not another platform
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* We are not */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-400">
              We are not
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {WE_ARE_NOT.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="font-mono text-sm text-gray-300" aria-hidden="true">&times;</span>
                  <span className="text-base text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* We are */}
          <div className="rounded-lg border border-bloom-200 bg-bloom-50/40 p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
              We are
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {WE_ARE.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="font-mono text-sm text-bloom-500" aria-hidden="true">&#10003;</span>
                  <span className="text-base font-medium text-maroon-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-md text-center text-xl leading-relaxed text-gray-600">
          This is serious work for serious times.
          <br />
          <span className="font-medium text-maroon-700">
            But it can also be delightful, engaging, and human.
          </span>
        </p>
      </div>
    </section>
  );
}
