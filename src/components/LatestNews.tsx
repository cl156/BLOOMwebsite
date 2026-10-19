/**
 * Homepage news teasers, both driven by src/content/news.json so they update with the News page:
 *   - <FeaturedIn />: one quiet row of outlet names under the hero numbers
 *   - <LatestNews />: the newest press release plus the two most recent pieces of coverage
 */
import { Eyebrow } from "./ui";
import news from "../content/news.json";
import { LATEST_POST } from "../content/latestPost";
import { pageHref } from "../utils/href";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

/** One entry per press outlet, newest first, without labels like "(podcast)". Each links to that outlet's latest story.
 *  Items from partners (`fromPartner`) appear on the News page but not here, since they aren't press coverage. */
const OUTLETS = news.filter((a) => !("fromPartner" in a && a.fromPartner)).reduce<{ name: string; url: string; title: string }[]>((list, a) => {
  const name = a.outlet.replace(/\s*\(.*\)$/, "");
  if (!list.some((o) => o.name === name)) list.push({ name, url: a.url, title: a.title });
  return list;
}, []);

export function FeaturedIn() {
  return (
    <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
      <a
        href={pageHref("news")}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500 hover:text-bloom-600"
      >
        Featured in
      </a>
      {OUTLETS.map((o, i) => (
        <span key={o.name} className="font-display text-base text-maroon-900/70">
          <a
            href={o.url}
            target="_blank"
            rel="noopener noreferrer"
            title={o.title}
            className="underline decoration-transparent underline-offset-4 transition-colors hover:text-maroon-900 hover:decoration-bloom-300"
          >
            {o.name}
          </a>
          {i < OUTLETS.length - 1 && <span className="ml-3 text-bloom-300" aria-hidden="true">&middot;</span>}
        </span>
      ))}
      <a
        href={pageHref("news")}
        aria-label="All news"
        className="text-bloom-600 transition-transform hover:translate-x-0.5"
      >
        &rarr;
      </a>
    </div>
  );
}

type Card = { kicker: string; date: string; title: string; href: string; external: boolean; cta: string };

const CARDS: Card[] = [
  {
    kicker: LATEST_POST.source,
    date: LATEST_POST.date,
    title: LATEST_POST.title,
    href: LATEST_POST.url,
    external: true,
    cta: LATEST_POST.cta,
  },
  ...news.slice(0, 2).map((a) => ({
    kicker: a.outlet.replace(/\s*\(.*\)$/, ""),
    date: a.date,
    // A long headline can carry a "shortTitle" for this card; the News page always shows the full headline.
    title: "shortTitle" in a && a.shortTitle ? a.shortTitle : a.title,
    href: a.url,
    external: true,
    cta: "kind" in a && a.kind === "podcast" ? "Listen to the episode" : "kind" in a && a.kind === "video" ? "Watch the video" : "Read article",
  })),
];

export default function LatestNews() {
  return (
    <section id="latest-news" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>News</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">
              Latest news
            </h2>
          </div>
          <a
            href={pageHref("news")}
            className="text-sm text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700"
          >
            All news &rarr;
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CARDS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col rounded-2xl bg-white p-7 shadow-soft transition-transform hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloom-500">{c.kicker}</p>
              <p className="mt-1 text-xs text-maroon-900/60">{formatDate(c.date)}</p>
              <h3 className="mt-4 flex-1 font-display text-xl leading-snug text-maroon-900 group-hover:text-bloom-600">
                {c.title}
              </h3>
              <span className="mt-5 text-sm text-bloom-600">{c.cta} &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
