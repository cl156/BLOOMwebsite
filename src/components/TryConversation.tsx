/**
 * "Try a Bloom-style Conversation" — overflow Polis section
 *
 * Lets any visitor get a taste of the BLOOM process through
 * a sample conversation. Neutral, inclusive language.
 */
export default function TryConversation() {
  return (
    <section id="try-it" className="bg-bloom-50/30 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
          Open to everyone
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          Try a Bloom-style conversation
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          See what structured public deliberation feels like. This sample
          conversation is open to anyone&nbsp;&mdash; no sign-up required.
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
