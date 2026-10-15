/**
 * What people come up with: the Utah Solutions Forum's 10 recommendations as a slowly rolling row,
 * each with the share of delegates who backed it. Sits right after "Where we work", under the Utah card.
 *
 * The row scrolls on its own, holds while the pointer is over it, and has a pause button.
 * For people who've asked for reduced motion it stays still and scrolls sideways by hand.
 */
import { useState } from "react";
import { Eyebrow } from "./ui";
import { UTAH_RECOMMENDATIONS, UTAH_REPORT_URL } from "../content/utahRecommendations";
import { UTAH_FORUM } from "../content/terms";

function Card({ area, text, pct }: { area: string; text: string; pct: number }) {
  return (
    <li className="flex w-72 shrink-0 flex-col rounded-2xl bg-white p-6 shadow-soft">
      <p className="font-display text-5xl leading-none text-bloom-500">
        {pct}%
        <span className="ml-2 align-middle font-sans text-xs font-medium uppercase tracking-[0.14em] text-maroon-900/50">
          support
        </span>
      </p>
      <p className="mt-4 flex-1 text-[15px] leading-snug text-maroon-900">{text}</p>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-bloom-500/80">{area}</p>
    </li>
  );
}

export default function Recommendations() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="recommendations" className="relative overflow-x-clip bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <Eyebrow>What people decided</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl">
              Ten proposals, each backed by at least 82% of delegates.
            </h2>
          </div>
          <p className="self-end text-base leading-relaxed text-maroon-900/85 md:col-span-5 md:col-start-8">
            At the {UTAH_FORUM}, 38 Utahns chosen by civic lottery to reflect the state&rsquo;s political makeup worked
            through questions about AI and data centers. These are the proposals they agreed on. 92% supported the full
            package.
          </p>
        </div>
      </div>

      <div
        className="group relative mt-14 overflow-hidden motion-reduce:overflow-x-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div
          className={`flex w-max animate-[marquee_70s_linear_infinite] py-4 group-hover:[animation-play-state:paused] ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {/* The list twice, so the row loops without a gap; the copy is hidden from screen readers. */}
          <ul className="flex gap-5 pl-5 pr-0 motion-safe:pl-0 motion-safe:pr-5" aria-label={`${UTAH_FORUM} recommendations`}>
            {UTAH_RECOMMENDATIONS.map((r) => (
              <Card key={r.text} {...r} />
            ))}
          </ul>
          <ul className="flex gap-5 pr-5 motion-reduce:hidden" aria-hidden="true">
            {UTAH_RECOMMENDATIONS.map((r) => (
              <Card key={r.text} {...r} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 lg:px-10">
        <a
          href={UTAH_REPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700"
        >
          Read the full report &rarr;
        </a>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="text-sm text-maroon-900/60 underline decoration-blush-200 underline-offset-4 hover:text-bloom-600 motion-reduce:hidden"
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>
    </section>
  );
}
