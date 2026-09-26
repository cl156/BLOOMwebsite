/**
 * Hero: headline top-left, photo and pitch below, a large soft glow behind
 * (layout from Humphrey's site sketch, plus an inset photo).
 * Edges line up with the header; height follows the content.
 */
import { sectionHref, assetHref } from "../utils/href";
import { FormLink } from "./CohortForm";
import { Glow, Pill } from "./ui";

/* Pilot results, from the Cohort page intro and the Utah press release */
const STATS = [
  { value: "~1,000", label: "residents engaged across six counties in Utah and Oregon" },
  { value: "38", label: "Utahns selected by civic lottery for the Solutions Forum" },
  { value: "10", label: "policy proposals, each backed by more than 80% of delegates" },
  { value: "60% / 40%", label: "right- and left-leaning delegates in Utah, who still agreed on every proposal" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      <Glow className="left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" />
      <Glow tone="blush" className="-right-40 -top-40 h-[50vmin] w-[50vmin] opacity-70" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:pt-32 lg:px-10 lg:pb-24">
        <h1 className="max-w-3xl font-display tracking-tight">
          <span className="block text-2xl font-normal text-maroon-900 sm:text-3xl">
            Decisions about AI are changing our lives.
          </span>
          <span className="mt-2 block text-5xl font-medium leading-[1.02] text-bloom-500 sm:text-6xl lg:text-7xl">
            Our communities should have a say in how.
          </span>
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

          <div className="text-[15px] leading-relaxed text-maroon-900 sm:text-base md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p>
              BLOOM helps communities stand up <strong className="font-semibold">Public Assemblies on AI</strong>:
              in-person and online spaces where neighbors can make sense of the challenges they face and{" "}
              <em className="text-bloom-500">develop actionable proposals that decision makers can&rsquo;t ignore.</em>
            </p>
            <p className="mt-4 text-maroon-900/75">
              Communities act on what they decide locally. Questions they can&rsquo;t solve alone become the agenda
              for state and national citizens&rsquo; assemblies.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Pill href={sectionHref("work")}>See the results from Utah</Pill>
            </div>
            <p className="mt-4 text-sm text-maroon-900/70">
              Want to host an assembly in your community?{" "}
              <FormLink kind="notify">Get notified about the 2027 Cohort</FormLink>
            </p>
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
      </div>
    </section>
  );
}
