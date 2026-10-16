/**
 * /news/ — BLOOM announcements, the Utah press release (summary; full text at /news/utah-solutions-forum/) and coverage. Add articles in src/content/news.json.
 */
import { Eyebrow, Glow, Pill } from "../components/ui";
import { INSTITUTION } from "../content/terms";
import news from "../content/news.json";
import { LATEST_POST } from "../content/latestPost";
import { assetHref, pageHref } from "../utils/href";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function NewsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cream pb-12 pt-36 sm:pt-44">
        <Glow className="left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>News</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-bloom-500 sm:text-6xl">
            In the news
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-maroon-900/80">
            Announcements from BLOOM and coverage of the {INSTITUTION}.
          </p>
        </div>
      </section>

      {/* BLOOM's newest announcement */}
      <section className="bg-cream pb-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <article className="rounded-3xl bg-white p-7 shadow-soft sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
              {LATEST_POST.source} &middot; {formatDate(LATEST_POST.date)}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-medium leading-tight text-maroon-900 sm:text-4xl">
              {LATEST_POST.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-maroon-900/80">{LATEST_POST.dek}</p>
            <div className="mt-7">
              <Pill href={LATEST_POST.url} external>
                {LATEST_POST.cta}
              </Pill>
            </div>
          </article>
        </div>
      </section>

      {/* Utah press release: summary box, full text on its own page */}
      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <article id="utah-solutions-forum" className="grid overflow-hidden rounded-3xl bg-white shadow-soft md:grid-cols-12">
            <img
              src={assetHref("photos/utah-forum-group.jpg")}
              alt="Delegates and organizers of the 2026 Utah Solutions Forum outside the venue in Draper"
              className="aspect-[16/9] h-full w-full bg-blush-100 object-cover md:col-span-5 md:aspect-auto"
            />
            <div className="p-7 sm:p-10 md:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Press release &middot; September 25, 2026</p>
              <h2 className="mt-4 font-display text-2xl font-medium leading-tight text-maroon-900 sm:text-3xl">
                Utahns Move from Concerns to Solutions on AI and Data Centers
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-maroon-900/80">
                Thirty-eight Utahns developed 10 policy recommendations with greater than 80% agreement across the
                political spectrum at the state&rsquo;s first Solutions Forum.
              </p>
              <div className="mt-7">
                <Pill href={pageHref("news/utah-solutions-forum")}>Read the press release</Pill>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-cream pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="font-display text-3xl font-medium text-bloom-500">Coverage</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <a
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-soft transition-transform hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloom-500">{a.outlet}</p>
                <p className="mt-1 text-xs text-maroon-900/60">{formatDate(a.date)}</p>
                <h3 className="mt-4 font-display text-xl leading-snug text-maroon-900 group-hover:text-bloom-600">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-maroon-900/75">{a.blurb}</p>
                <span className="mt-5 text-sm text-bloom-600">
                  {"kind" in a && a.kind === "podcast" ? "Listen to the episode" : "kind" in a && a.kind === "video" ? "Watch the video" : "Read article"} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
