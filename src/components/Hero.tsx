/**
 * Hero: headline top-left, photo and pitch below, a large soft glow behind
 * (layout from Humphrey's site sketch, plus an inset photo).
 * Edges line up with the header; height follows the content.
 */
import { pageHref, assetHref } from "../utils/href";
import { INSTITUTION } from "../content/terms";
import { Eyebrow, Glow, Pill } from "./ui";
import { FeaturedIn } from "./LatestNews";

/* Pilot results, from the Cohort page intro and the Utah press release */
const STATS = [
  { value: "~1,000", label: "residents engaged across six counties in Utah and Oregon" },
  { value: "38", label: "Utahns chosen by civic lottery to reflect the state\u2019s mix of political views" },
  { value: "10", label: "policy recommendations, each backed by at least 82% of delegates" },
  { value: "92%", label: "of delegates supported the full package of recommendations" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <Glow className="left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" />
      <Glow tone="blush" className="-right-40 -top-40 h-[50vmin] w-[50vmin] opacity-70" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:pt-32 lg:px-10 lg:pb-24">
        {/* Headline across the top; photo and supporting line with the button below. */}
        <Eyebrow className="text-sm sm:text-base">The {INSTITUTION}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-balance font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-6xl lg:text-7xl">
          Communities deciding AI&rsquo;s role in their&nbsp;future.
        </h1>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-12 lg:mt-14">
          <figure className="md:col-span-6 lg:col-span-5">
            <img
              src={assetHref("photos/delegates-listening.jpg")}
              alt="Delegates listening and smiling during a discussion at the Utah Solutions Forum"
              className="aspect-[3/2] w-full rounded-3xl bg-blush-100 object-cover shadow-soft"
            />
            <figcaption className="mt-3 text-xs text-maroon-900/60">Utah Solutions Forum, September 2026</figcaption>
          </figure>

          <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
            <p className="text-pretty font-display text-2xl leading-snug text-maroon-900 sm:text-3xl lg:text-4xl lg:leading-tight">
              Decisions about AI are changing lives. Everyone deserves a say in&nbsp;how.
            </p>
            <div className="mt-8">
              <Pill href={pageHref("cohort")}>Bring it to your community</Pill>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-blush-200 pt-10 lg:mt-20 lg:grid-cols-4">
          {STATS.map((s) => (
            <li key={s.value}>
              <p className="font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">{s.value}</p>
              <p className="mt-2 max-w-[16rem] text-sm leading-snug text-maroon-900/75">{s.label}</p>
            </li>
          ))}
        </ul>
        <FeaturedIn />
      </div>
    </section>
  );
}
