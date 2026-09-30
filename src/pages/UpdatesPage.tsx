/**
 * /updates/ — where "Get updates" in the nav lands. Two separate signups, each going straight to the
 * system that owns it, so nothing has to be synced by hand:
 *   - Stay connected with BLOOM → Airtable form (the CRM)
 *   - Between Doom and Boom → Substack's own signup box (the publication list)
 *
 * Paste the Airtable share URL below (Airtable → form view → Share form). Until it's set,
 * the left card falls back to email.
 */
import { Eyebrow, Glow } from "../components/ui";

const AIRTABLE_UPDATES_URL: string = "https://airtable.com/appWfFclW2rKc7Ot1/pag0BttDW5T5XHy96/form"; // Website signups form
const SUBSTACK_URL = "https://bloomproject.substack.com";
const FALLBACK_EMAIL = "hello@bloom-project.org";

export default function UpdatesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cream pb-24 pt-36 sm:pt-44 md:pb-32">
        <Glow className="left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-2xl">
            <Eyebrow>Get updates</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-6xl">
              Stay in the loop.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-maroon-900/80">
              Follow the Public Assembly on AI as it grows: new assemblies, results, and chances to get involved.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
            {/* The form's own title and description (set in Airtable) serve as this card's heading. */}
            <div className="rounded-2xl bg-white p-3 shadow-soft sm:p-4">
              {AIRTABLE_UPDATES_URL ? (
                <iframe
                  title="Stay connected with BLOOM"
                  src={AIRTABLE_UPDATES_URL.replace("airtable.com/", "airtable.com/embed/")}
                  className="h-[920px] w-full rounded-xl border-0"
                />
              ) : (
                <p className="rounded-xl bg-blush-100 p-5 text-[15px] text-maroon-900/80">
                  Sign-up form coming soon. In the meantime, email us at{" "}
                  <a
                    href={`mailto:${FALLBACK_EMAIL}?subject=Keep%20me%20posted`}
                    className="text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700"
                  >
                    {FALLBACK_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>

            <div id="between-doom-and-boom" className="rounded-2xl bg-white p-7 shadow-soft sm:p-9">
              <h2 className="font-display text-2xl text-maroon-900">
                Read <em>Between Doom and Boom</em>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-maroon-900/80">
                Our biweekly publication tracking how people are building democratic power in the age of AI.
              </p>
              <iframe
                title="Subscribe to Between Doom and Boom"
                src={`${SUBSTACK_URL}/embed`}
                className="mt-6 h-[320px] w-full rounded-xl border-0 bg-white"
                scrolling="no"
              />
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700"
              >
                Browse past editions &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
