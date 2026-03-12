/**
 * "The Invitation" — final CTA section
 *
 * Three tracks: Start a conversation (coming soon), Become a Civic Host, Partner.
 */
export default function GetInvolved() {
  return (
    <section id="get-involved" className="relative bg-bloom-50/50 py-20 md:py-28">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6B2A3D 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            The invitation
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Public life doesn't have to feel chaotic or adversarial. Communities
            can respond to change instead of being steamrolled by it, build
            agency instead of fragmentation, and create durable common ground
            instead of 51% wins.
          </p>
          <p className="mt-4 text-base font-medium text-maroon-700">
            Start where you are. Coordinate where it matters. Build what lasts.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {/* Start a conversation — coming soon */}
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-maroon-700">
                Start a conversation
              </h3>
              <span className="rounded-md bg-bloom-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Coming soon
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              We're currently piloting our process in Oregon and Utah, with
              broader access coming soon. Sign up to be notified when
              conversations open in your area.
            </p>
            {/* Email signup */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="rounded-md border border-gray-200 px-4 py-2.5 font-mono text-sm outline-none transition-colors focus:border-bloom-400 focus:ring-2 focus:ring-bloom-100"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-md bg-bloom-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bloom-600"
              >
                Get notified
              </button>
            </form>
          </div>

          {/* Become a Civic Host */}
          <div className="rounded-lg border border-bloom-200 bg-white p-8">
            <h3 className="text-lg font-bold text-maroon-700">
              Become a Civic Host
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              If you're an organizer, civic leader, institution, or coalition
              ready to host a BLOOM process in your community, let's connect.
            </p>
            <a
              href="mailto:hello@bloom-project.org"
              className="mt-6 inline-block rounded-md bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
            >
              Get in touch
            </a>
          </div>

          {/* Partner with BLOOM */}
          <div className="rounded-lg border border-gray-200 bg-white p-8">
            <h3 className="text-lg font-bold text-maroon-700">
              Partner with BLOOM
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Funders, foundations, and institutions building the future of
              democratic infrastructure&nbsp;&mdash; we'd love to talk.
            </p>
            <a
              href="mailto:hello@bloom-project.org"
              className="mt-6 inline-block rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-maroon-700 transition-colors hover:border-bloom-300 hover:bg-bloom-50"
            >
              Partner with us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
