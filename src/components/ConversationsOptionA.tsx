/**
 * Active Conversations — Option A: Minimal Cards
 *
 * Clean two-card layout with location pins, status badges, and topic info.
 * Easy to scale by adding more cards as new regions come online.
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

const CONVERSATIONS = [
  {
    region: "Central Oregon",
    state: "OR",
    topic: "AI & the Future of Our Communities",
    subtopics: "Youth mental health \u00b7 Work transitions \u00b7 Energy & environment \u00b7 Information integrity",
    status: "Open" as const,
    link: "#",
  },
  {
    region: "Utah",
    state: "UT",
    topic: "AI & the Future of Our Communities",
    subtopics: "Youth mental health \u00b7 Work transitions \u00b7 Energy & environment \u00b7 Information integrity",
    status: "Open" as const,
    link: "#",
  },
];

export default function ConversationsOptionA() {
  return (
    <section
      id="conversations"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={83}
        seedCount={14}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.05}
        nodeAlpha={0.07}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
            Happening now
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            Active deliberations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            Our 2026 headline deliberation asks one question across communities:
            how can we build a future where the benefits of AI are widely shared
            and the risks responsibly managed? Explore an open deliberation or bring BLOOM to
            your community.
          </p>
        </div>

        {/* Conversation cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {CONVERSATIONS.map(({ region, state, topic, subtopics, status, link }) => (
            <a
              key={region}
              href={link}
              className="group relative rounded-lg border border-gray-200 bg-white p-7 transition-all hover:border-bloom-300 hover:shadow-lg"
            >
              {/* Status badge */}
              <div className="absolute right-5 top-5 flex items-center gap-1.5">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-600">
                  {status}
                </span>
              </div>

              {/* Location icon + region */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-bloom-50 text-bloom-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-maroon-700 group-hover:text-bloom-600 transition-colors">
                    {region}
                  </h3>
                  <p className="font-mono text-xs text-gray-400">{state}</p>
                </div>
              </div>

              {/* Topic */}
              <p className="mt-4 text-base font-medium leading-relaxed text-maroon-600">
                {topic}
              </p>
              {subtopics && (
                <p className="mt-1.5 font-mono text-[10px] tracking-wide text-gray-400">
                  {subtopics}
                </p>
              )}

              {/* Join link */}
              <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-bloom-500 transition-colors group-hover:text-bloom-600">
                Explore this conversation
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Coming soon teaser */}
        <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
          <p className="text-base text-gray-500">
            <span className="font-medium text-maroon-700">More regions coming soon.</span>{" "}
            BLOOM is expanding to new communities across the country.
          </p>
          <a
            href="#get-involved"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bloom-500 transition-colors hover:text-bloom-600"
          >
            Bring BLOOM to your community
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
