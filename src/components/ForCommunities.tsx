/**
 * "For Civic Hosts" — speaks to organizers, civic leaders, institutions
 */

const CAPABILITIES = [
  "Rapid learning material generation",
  "Structured deliberation workflows",
  "Common-ground detection tools",
  "Public legitimacy metrics",
  "Cross-community coordination pathways",
  "Implementation playbooks",
];

export default function ForCommunities() {
  return (
    <section id="for-civic-hosts" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            For Civic Hosts
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If you're an organizer, civic leader, institution, or
            coalition&nbsp;&mdash; BLOOM increases your capacity, coherence, and
            impact.
          </p>
        </div>

        {/* Capabilities grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 transition-all hover:border-bloom-300 hover:shadow-md"
            >
              <span className="mt-0.5 font-mono text-sm text-bloom-500" aria-hidden="true">
                &#10003;
              </span>
              <span className="text-sm font-medium text-maroon-700">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* "We don't replace" emphasis + tagline */}
        <div className="mx-auto mt-14 max-w-lg text-center">
          <div className="rounded-lg border border-bloom-200 bg-bloom-50/40 p-5">
            <p className="text-base leading-relaxed text-gray-700">
              BLOOM doesn't replace existing civic work&nbsp;&mdash; we strengthen it.
              We build on the organizers, institutions, and local efforts already
              doing the hard work in your community.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest text-maroon-600">
            <span className="rounded-md border border-bloom-200 bg-bloom-50/60 px-3 py-1.5">
              Locally rooted
            </span>
            <span className="rounded-md border border-bloom-200 bg-bloom-50/60 px-3 py-1.5">
              Coordinated across communities
            </span>
            <span className="rounded-md border border-bloom-200 bg-bloom-50/60 px-3 py-1.5">
              Built for multi-level action
            </span>
          </div>
          <a
            href="#get-in-touch"
            className="mt-8 inline-block rounded-lg bg-bloom-500 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-bloom-600"
          >
            Become a Civic Host
          </a>
        </div>
      </div>
    </section>
  );
}
