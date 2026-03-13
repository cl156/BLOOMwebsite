/**
 * "Stay in the Loop" — newsletter / updates section
 *
 * Simple email capture for learning-in-public updates.
 * Placeholder form ready to wire to Substack or similar.
 */
export default function StayInTheLoop() {
  return (
    <section id="get-in-touch" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
          Stay in the loop
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We share what we're learning as we build&nbsp;&mdash; pilot results,
          process updates, and what's working in communities. No spam, just
          the real stuff.
        </p>

        {/* Email capture form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-bloom-400 focus:ring-2 focus:ring-bloom-100"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="rounded-lg bg-bloom-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-bloom-600"
          >
            Subscribe
          </button>
        </form>

        {/* Secondary contact options */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <a
            href="mailto:hello@bloom-project.org"
            className="flex items-center gap-2 text-sm font-medium text-maroon-700 transition-colors hover:text-bloom-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            hello@bloom-project.org
          </a>
          <span className="hidden text-gray-300 sm:inline">|</span>
          <p className="text-sm text-gray-500">
            Want to host or partner?{" "}
            <a href="mailto:hello@bloom-project.org" className="font-medium text-bloom-600 underline underline-offset-2 hover:text-bloom-700">
              Let's talk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
