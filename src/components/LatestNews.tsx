/**
 * Homepage news teasers, both driven by src/content/news.json so they update with the News page:
 *   - <FeaturedIn />: one quiet row of outlet names under the hero numbers
 *   - <LatestNews />: the newest press release plus the two most recent pieces of coverage
 */
import { Eyebrow } from "./ui";
import news from "../content/news.json";
import { pageHref } from "../utils/href";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

/** Unique outlet names, newest first, without labels like "(podcast)". */
const OUTLETS = [...new Set(news.map((a) => a.outlet.replace(/\s*\(.*\)$/, "")))];

export function FeaturedIn() {
  return (
    <a
      href={pageHref("news")}
      className="group mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-maroon-900/60 hover:text-maroon-900"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Featured in</span>
      {OUTLETS.map((o, i) => (
        <span key={o} className="font-display text-base text-maroon-900/70 group-hover:text-maroon-900">
          {o}
          {i < OUTLETS.length - 1 && <span className="ml-3 text-bloom-300" aria-hidden="true">&middot;</span>}
        </span>
      ))}
      <span className="text-bloom-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true">&rarr;</span>
    </a>
  );
}

type Card = { kicker: string; date: string; title: string; href: string; external: boolean; cta: string };

const CARDS: Card[] = [
  {
    kicker: "Press release",
    date: "2026-09-25",
    title: "Utahns Move from Concerns to Solutions on AI and Data Centers",
    href: pageHref("news", "utah-solutions-forum"),
    external: false,
    cta: "Read the press release",
  },
  ...news.slice(0, 2).map((a) => ({
    kicker: a.outlet,
    date: a.date,
    title: a.title,
    href: a.url,
    external: true,
    cta: "kind" in a && a.kind === "podcast" ? "Listen to the episode" : "Read article",
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
