/**
 * "Not Another Platform" — differentiation section
 */

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
                  <span className="text-sm text-gray-500">{item}</span>
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
                  <span className="text-sm font-medium text-maroon-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-md text-center text-lg leading-relaxed text-gray-600">
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
