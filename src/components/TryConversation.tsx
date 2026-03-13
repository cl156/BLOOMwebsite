/**
 * "Try a Bloom-style Conversation" — overflow Polis section
 *
 * Lets any visitor get a taste of the BLOOM process through
 * a sample conversation. Neutral, inclusive language.
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
];

export default function TryConversation() {
  return (
    <section
      id="try-it"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #fdf2f4 0%, #fce8ec 50%, #fdf2f4 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={109}
        seedCount={12}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.15}
        nodeAlpha={0.18}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
          Open to everyone
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          Try a Bloom-style conversation
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
          See what the opening of a structured public deliberation feels
          like. This sample conversation is open to anyone&nbsp;&mdash; no
          sign-up required.
        </p>

        <a
          href="#"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-bloom-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-bloom-600 hover:shadow-md"
        >
          Start the sample conversation
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>

        <p className="mt-4 text-sm text-gray-400">
          Takes about 5 minutes. Your responses help us improve the process.
        </p>
      </div>
    </section>
  );
}
