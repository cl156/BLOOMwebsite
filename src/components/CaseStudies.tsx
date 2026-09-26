/**
 * The Work: case studies beside an interactive map of the western states.
 * Hover or tap Oregon / Utah (or their label chips) to swap the detail card.
 */
import { useState } from "react";
import { Eyebrow, Heading, Pill } from "./ui";
import { US_STATES, MAP_WIDTH, MAP_HEIGHT, MAP_FULL_WIDTH } from "../content/usStates";

/* The rest of the country continues east and fades out: the network is national. */
const FADE_START = Math.round(((MAP_WIDTH * 0.8) / MAP_FULL_WIDTH) * 100); // around the Colorado Rockies
const FADE = `linear-gradient(to right, #000 ${FADE_START}%, rgba(0,0,0,0.35) ${FADE_START + 6}%, transparent ${FADE_START + 13}%)`;
import { pageHref, assetHref } from "../utils/href";

const UTAH_REPORT_URL = "https://drive.google.com/file/d/1QngRN6wkkAcPDdhdFInZQn_qu0mmBWnl/view?usp=drive_link";
const UTAH_FORUM_URL = "https://forum.utahcommonground.org/";
const OREGON_REPORT_URL = "https://report.bloomproject.us/central-oregon-ai/";

type SiteId = "UT" | "OR";

const SITES: Record<SiteId, { place: string; chip: string; title: string; host: { name: string; url: string } }> = {
  UT: {
    place: "Utah",
    chip: "10 proposals, 80%+ support",
    title: "From conversation to public judgment",
    host: { name: "Utah Common Ground", url: "https://www.utahcommonground.org/" },
  },
  OR: {
    place: "Central Oregon",
    chip: "Assembly December 5\u20136",
    title: "Building public capacity from the ground up",
    host: { name: "the Central Oregon Civic Action Project (COCAP)", url: "https://cocap.us/" },
  },
};

function UtahDetail() {
  return (
    <>
      <p>
        Working with Utah Common Ground, BLOOM helped build a process that moved from community conversations to a
        representative civic assembly.
      </p>
      <p>
        Residents explored questions about AI in schools, work, data centers, transparency, and public participation.
      </p>
      <p>
        Over two days at the{" "}
        {UTAH_FORUM_URL ? (
          <a href={UTAH_FORUM_URL} target="_blank" rel="noopener noreferrer" className="text-bloom-600 underline decoration-bloom-300 underline-offset-4">
            Utah Solutions Forum
          </a>
        ) : (
          "Utah Solutions Forum"
        )}
        , 38 Utahns selected through civic lottery (a random, representative draw, much like a jury) heard evidence, considered competing perspectives, worked through
        trade-offs, and developed proposals together.
      </p>
      <p className="font-medium text-maroon-900">
        The result: 10 policy proposals, each backed by more than 80% of delegates, in a room of roughly 60% right-leaning and 40%
        left-leaning delegates.
      </p>
      <figure className="border-l border-bloom-200 pl-4">
        <blockquote className="font-display text-lg leading-snug text-bloom-500">
          &ldquo;Did you think yesterday you might get to 90% on something? &hellip; This is a pretty extraordinary
          accomplishment just in and of itself.&rdquo;
        </blockquote>
        <figcaption className="mt-2 text-xs text-maroon-900/60">&mdash; Paul Edwards, Wheatley Institute</figcaption>
      </figure>
    </>
  );
}

function OregonDetail() {
  return (
    <>
      <p>
        Across Deschutes, Crook, and Jefferson counties, local partners are engaging residents through digital
        participation, community conversations, and representative deliberation around the AI choices reaching
        Central Oregon.
      </p>
      <p>
        The process culminates in a representative civic assembly leaving behind something more important: local
        organizations and residents with greater capacity to work through future public problems together.
      </p>
      <p className="font-medium text-maroon-900">The Central Oregon assembly takes place December 5&ndash;6, 2026.</p>
    </>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState<SiteId>("UT");
  const site = SITES[active];

  return (
    <section id="work" className="relative overflow-x-clip bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-12 lg:px-10">
        {/* Left: heading + swapping card */}
        <div className="lg:col-span-6">
          <Eyebrow>The work</Eyebrow>
          <Heading className="mt-5 text-4xl sm:text-5xl">Explore what communities have built.</Heading>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-maroon-900/80">
            Local partners run the process. BLOOM brings the funding, methods and tools. Here&rsquo;s where it&rsquo;s
            happening so far.
          </p>

          <div className="mt-6 flex gap-2" role="tablist" aria-label="Case studies">
            {(Object.keys(SITES) as SiteId[]).map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={active === id}
                onClick={() => setActive(id)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === id ? "bg-bloom-500 text-white" : "bg-blush-100 text-bloom-600 hover:bg-blush-200"
                }`}
              >
                {SITES[id].place}
              </button>
            ))}
          </div>

          <article key={active} role="tabpanel" className="mt-6 animate-[fadeIn_.35s_ease] overflow-hidden rounded-2xl bg-white shadow-soft">
            {active === "UT" && (
              <img
                src={assetHref("photos/utah-forum-group.jpg")}
                alt="Delegates and organizers of the 2026 Utah Solutions Forum outside the venue in Draper"
                loading="lazy"
                className="aspect-[16/7] w-full bg-blush-100 object-cover"
              />
            )}
            <div className="p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">{site.place}</p>
            <h3 className="mt-2 font-display text-2xl text-maroon-900">{site.title}</h3>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
              {active === "UT" ? <UtahDetail /> : <OregonDetail />}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {active === "UT" ? (
                <>
                  <Pill href={pageHref("news", "utah-solutions-forum")}>Read the press release</Pill>
                  <Pill href={UTAH_REPORT_URL} external variant="soft">Read the report</Pill>
                </>
              ) : (
                <>
                  <Pill href={OREGON_REPORT_URL} external>Read the report</Pill>
                  <Pill href="https://oregon.bloomproject.us/landing?host=true" external variant="soft">
                    Explore Central Oregon
                  </Pill>
                </>
              )}
            </div>
            <div className="mt-5">
              <p className="text-xs text-maroon-900/60">
                Hosted by{" "}
                <a href={site.host.url} target="_blank" rel="noopener noreferrer" className="underline decoration-bloom-300 underline-offset-2 hover:text-bloom-600">
                  {site.host.name}
                </a>
              </p>
            </div>
            </div>
          </article>
        </div>

        {/* Right: the map. Starts level with the tabs, then stays in view while the card scrolls past. */}
        <div className="lg:sticky lg:top-28 lg:col-span-6 lg:mt-56">
          <div
            className="relative"
            style={{
              width: `min(100%, calc((100svh - 9rem) * ${MAP_WIDTH / MAP_HEIGHT}))`,
              aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`,
            }}
          >
          <svg
            viewBox={`0 0 ${MAP_FULL_WIDTH} ${MAP_HEIGHT}`}
            className="absolute left-0 top-0 h-full max-w-none"
            style={{
              width: `${(MAP_FULL_WIDTH / MAP_WIDTH) * 100}%`,
              maskImage: FADE,
              WebkitMaskImage: FADE,
            }}
            role="img"
            aria-label="Map of the United States highlighting Oregon and Utah"
          >
            {US_STATES.map((s) => {
              const siteId = s.id === "UT" || s.id === "OR" ? (s.id as SiteId) : null;
              const isActive = siteId === active;
              return (
                <path
                  key={s.id}
                  d={s.d}
                  onMouseEnter={siteId ? () => setActive(siteId) : undefined}
                  onClick={siteId ? () => setActive(siteId) : undefined}
                  className={`stroke-cream transition-colors duration-300 ${
                    siteId
                      ? `cursor-pointer ${isActive ? "fill-bloom-500" : "fill-bloom-400/80 hover:fill-bloom-500"}`
                      : "fill-blush-100"
                  }`}
                  strokeWidth={2}
                >
                  <title>{s.name}</title>
                </path>
              );
            })}
          </svg>

          {US_STATES.filter((s) => s.id === "UT" || s.id === "OR").map((s) => {
            const id = s.id as SiteId;
            const isActive = id === active;
            return (
              <button
                key={id}
                onMouseEnter={() => setActive(id)}
                onClick={() => setActive(id)}
                className={`absolute -translate-y-1/2 rounded-lg px-3 py-2 text-left shadow-soft transition-colors ${
                  isActive ? "bg-maroon-900 text-white" : "bg-white text-maroon-900"
                }`}
                style={{
                  left: `${((s.cx + (id === "OR" ? 10 : 24)) / MAP_WIDTH) * 100}%`,
                  top: `${((s.cy - (id === "OR" ? 20 : 0)) / MAP_HEIGHT) * 100}%`,
                }}
              >
                <span className="block text-sm font-medium">{SITES[id].place}</span>
                <span className={`block text-[10px] uppercase tracking-wider ${isActive ? "text-bloom-200" : "text-bloom-500"}`}>
                  {SITES[id].chip}
                </span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
