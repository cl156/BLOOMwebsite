/**
 * "End-to-End Deliberation" — the full cycle BLOOM is piloting
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

const PHASES = [
  {
    label: "Frame",
    title: "Define the questions that matter",
    description:
      "Civic Hosts identify the missing conversation in their community, set the agenda, and build trust before anyone is asked to deliberate.",
  },
  {
    label: "Listen",
    title: "Broad collective dialogue",
    description:
      "Digital and in-person forums map the issue landscape \u2014 surfacing where people agree, where they diverge, and what trade-offs feel real.",
  },
  {
    label: "Deliberate",
    title: "Weigh trade-offs together",
    description:
      "Smaller, representative groups \u2014 modeled on citizens\u2019 assemblies \u2014 dig deeper, developing shared recommendations grounded in real constraints, not just preferences.",
  },
  {
    label: "Synthesize",
    title: "Make common ground visible",
    description:
      "AI-assisted synthesis identifies durable agreement across groups and scales \u2014 the proposals that hold up across difference.",
  },
  {
    label: "Act",
    title: "Connect findings to decisions",
    description:
      "Local findings reach the institutions where decisions are made \u2014 school boards, city councils, state legislatures and beyond \u2014 while keeping authority where it belongs: in the community.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={61}
        seedCount={16}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.15}
        nodeAlpha={0.18}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
            What we&rsquo;re building &amp; testing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            End-to-end deliberation
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Most public engagement is episodic&nbsp;&mdash; a town hall here, a
            survey there, disconnected from decisions. Bloom pilots a complete
            cycle: from framing the right questions to connecting public
            reasoning to the institutions where change happens.
          </p>
        </div>

        {/* Phase flow */}
        <div className="mt-14 space-y-0">
          {PHASES.map(({ label, title, description }, i) => (
            <div key={label} className="relative flex gap-6 pb-10 last:pb-0">
              {/* Vertical connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-bloom-400 bg-white font-mono text-xs font-bold text-bloom-600">
                  {i + 1}
                </div>
                {i < PHASES.length - 1 && (
                  <div className="w-px flex-1 bg-bloom-200" />
                )}
              </div>

              {/* Content */}
              <div className="pb-2 pt-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-bloom-500">
                  {label}
                </p>
                <h3 className="mt-1 text-lg font-bold text-maroon-700">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-xl text-base leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
