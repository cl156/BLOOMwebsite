/**
 * "For Civic Hosts" — speaks to organizers, civic leaders, institutions
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

const BACKBONE = [
  {
    label: "Run a process people trust",
    items: [
      "Convene around issues that genuinely matter to your community",
      "Build in the norms that make outcomes credible and hard to ignore",
      "Structured workflows from start to finish \u2014 so nothing falls through the cracks",
    ],
  },
  {
    label: "Connect findings to decisions",
    items: [
      "Identify who holds the decision before the conversation starts",
      "Secure commitments from decision-makers to respond",
      "Coordinate across communities when the decision lives beyond your local level",
    ],
  },
  {
    label: "Keep the momentum going",
    items: [
      "Recurring cycles, not one-off events",
      "Ways for participants to stay involved and see what happened",
      "Accountability checkpoints that track follow-through",
    ],
  },
];

export default function ForCommunities() {
  return (
    <section
      id="for-civic-hosts"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={91}
        seedCount={16}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.14}
        nodeAlpha={0.17}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            For Civic Hosts
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            If you&rsquo;re an organizer, civic leader, institution, or
            coalition&nbsp;&mdash; BLOOM gives you the structure, tools, and
            support to run public conversations that actually go somewhere.
          </p>
        </div>

        {/* Backbone responsibilities */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {BACKBONE.map(({ label, items }) => (
            <div
              key={label}
              className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-bloom-300 hover:shadow-md"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-bloom-500">
                {label}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 font-mono text-sm text-bloom-500" aria-hidden="true">
                      &#10003;
                    </span>
                    <span className="text-base font-medium text-maroon-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* "We don't replace" emphasis */}
        <div className="mx-auto mt-14 max-w-lg text-center">
          <div className="rounded-lg border border-bloom-200 bg-bloom-50/40 p-5">
            <p className="text-lg leading-relaxed text-gray-700">
              BLOOM doesn&rsquo;t replace existing civic work&nbsp;&mdash; we strengthen it.
              We build on the organizers, institutions, and local efforts already
              doing the hard work in your community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
