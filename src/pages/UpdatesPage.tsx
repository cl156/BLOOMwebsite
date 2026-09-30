/**
 * /updates/ — where "Get updates" in the nav lands. One main action and one secondary one, each going
 * straight to the system that owns it, so nothing has to be synced by hand:
 *   - Quarterly updates → Airtable form (Website signups table in the CRM)
 *   - Between Doom and Boom → a link to Substack's own subscribe page
 *
 * The form's title and description are set in Airtable. If the form URL is ever cleared,
 * the card falls back to email.
 */
import { Eyebrow, Glow, Pill } from "../components/ui";

const AIRTABLE_UPDATES_URL: string = "https://airtable.com/appWfFclW2rKc7Ot1/pag0BttDW5T5XHy96/form"; // Website signups form
const SUBSTACK_URL = "https://bloomproject.substack.com";
const FALLBACK_EMAIL = "hello@bloom-project.org";

export default function UpdatesPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cream pb-24 pt-36 sm:pt-44 md:pb-32">
        <Glow className="left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-2xl px-5">
          <Eyebrow>Get updates</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-6xl">
            Stay in the loop.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-maroon-900/80">
            Follow the Public Assembly on AI as it grows: new assemblies, results, and chances to get involved.
          </p>

          <div className="mt-12 rounded-2xl bg-white p-3 shadow-soft sm:p-4">
            {AIRTABLE_UPDATES_URL ? (
              <iframe
                title="Sign up for updates"
                src={AIRTABLE_UPDATES_URL.replace("airtable.com/", "airtable.com/embed/")}
                className="h-[840px] w-full rounded-xl border-0"
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

          <div
            id="between-doom-and-boom"
            className="mt-8 flex flex-col gap-5 rounded-2xl bg-blush-100 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloom-500">Also from BLOOM</p>
              <h2 className="mt-2 font-display text-2xl italic text-maroon-900">Between Doom and Boom</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-maroon-900/80">
                Our biweekly publication tracking how people are building democratic power in the age of AI.
              </p>
            </div>
            <Pill href={`${SUBSTACK_URL}/subscribe`} external className="shrink-0 self-start sm:self-center">
              Subscribe on Substack
            </Pill>
          </div>
        </div>
      </section>
    </main>
  );
}
