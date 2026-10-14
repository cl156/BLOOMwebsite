/**
 * /cohort/ — the 2027 Cohort: BLOOM's theory of change (a national network,
 * questions travelling from communities to the country) and the full call for
 * Founding Civic Hosts. The RFP text itself lives in content/rfp.ts.
 */
import { useEffect, useRef, useState } from "react";
import { HOSTS, INSTITUTION } from "../content/terms";
import {
  APPLY_PATHS,
  ASSEMBLY_TYPES,
  CO_DESIGN_ARC,
  CONTACT_EMAIL,
  CRITERIA,
  CRITERIA_NOTE,
  cohortVariant,
  FUNDING_NOTE,
  HOST_SCOPES,
  HOST_SCOPES_INTRO,
  HOSTS_RECEIVE,
  HUB_NOTE,
  HUB_PROVIDES,
  IMPACT,
  INFLUENCE,
  MODEL_LEGS,
  PILOT_STATS,
  RFP_PDF,
  rfpStatus,
  SELECTION_NOTES,
  TIMELINE,
  TOPICS,
  WHERE_HOSTS_WORK,
} from "../content/rfp";
import { Eyebrow, Glow, Pill } from "../components/ui";
import { CohortCTA, HubCTA, cohortStatusLine } from "../components/CohortForm";
import CoDesignArc from "../components/CoDesignArc";
import { assetHref } from "../utils/href";

const SECTIONS = [
  { id: "paths", label: "Ways to apply", hubsOnly: true },
  { id: "host-roles", label: "Host roles" },
  { id: "support", label: "Support" },
  { id: "impact", label: "Impact" },
  { id: "who", label: "Who we’re looking for" },
  { id: "timeline", label: "Timeline" },
  { id: "apply", label: "Apply" },
];

/** Numbered card used for criteria, impact and similar short lists. */
function NumberedItem({ n, name, body }: { n: number; name: string; body: string }) {
  return (
    <li className="flex gap-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 font-display text-base text-bloom-600">
        {n}
      </span>
      <div>
        <p className="font-display text-xl text-maroon-900">{name}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-maroon-900/85">{body}</p>
      </div>
    </li>
  );
}

const sectionHeading = "mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl";

const TIERS = [
  {
    level: "Local",
    body: "Communities identify priorities and act where they have authority.",
  },
  {
    level: "State",
    body: "Questions arising across communities can become the charge for state-level representative assemblies.",
  },
  {
    level: "National",
    body: "Questions requiring national action can ultimately become the agenda for a representative national civic assembly on AI.",
  },
];

/** Rings that grow with each tier: one community, several, the country. */
function TierMark({ tier }: { tier: number }) {
  const r = [0, 1, 2];
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 text-bloom-500" aria-hidden="true">
      {tier === 0 && <circle cx="32" cy="32" r="9" fill="none" stroke="currentColor" strokeWidth="3" />}
      {tier === 1 &&
        r.map((i) => {
          const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={32 + Math.cos(a) * 13} cy={32 + Math.sin(a) * 13} r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />;
        })}
      {tier === 2 && (
        <>
          <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="3.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
            return <circle key={i} cx={32 + Math.cos(a) * 24} cy={32 + Math.sin(a) * 24} r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5" />;
          })}
        </>
      )}
    </svg>
  );
}

/** The ladder's connecting line draws in as the reader scrolls through it. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.7 - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, progress };
}

export default function CohortPage() {
  const { ref: ladderRef, progress } = useScrollProgress<HTMLOListElement>();
  const [arcOpen, setArcOpen] = useState(() => typeof window !== "undefined" && window.location.hash === "#co-design-arc");
  const statusLine = cohortStatusLine();
  // ?call=hubs: the variant that also invites civic hubs to apply with a constellation of hosts.
  const hubs = cohortVariant() === "hubs";
  const hostLabel = hubs ? "Apply as a Civic Host" : "Apply to be a Civic Host";
  // The RFP PDF download appears once applications open (preview early with ?rfp=open).
  const showPdf = Boolean(RFP_PDF) && rfpStatus() !== "upcoming";

  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-cream pb-16 pt-36 sm:pt-44">
        <Glow className="left-1/2 top-0 h-[80vmin] w-[80vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            The 2027 Cohort &middot; Call for Founding {HOSTS}
            {hubs && " and Hubs"}
          </Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-bloom-500 sm:text-6xl lg:text-7xl">
            Many places. A growing civic institution.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-maroon-900/85">
            Over the past year, the BLOOM Project has developed a community assembly model that combines
            digital tools with deliberative public problem-solving. We tested it in two pilots in Utah and Oregon,
            engaging nearly 1,000 people across six counties on questions about AI. Now we&rsquo;re inviting a founding
            cohort of {HOSTS} to lead their communities in shaping their futures in the AI era.
          </p>
          <p className="mt-8 text-sm font-semibold text-maroon-900">{statusLine}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CohortCTA label={hostLabel} />
            {hubs && <HubCTA />}
            {showPdf && (
              <Pill href={assetHref(RFP_PDF)} external variant="soft" arrow={false}>
                Download the full RFP (PDF)
              </Pill>
            )}
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-blush-200 pt-10 sm:grid-cols-3">
            {PILOT_STATS.map((s) => (
              <li key={s.value}>
                <p className="font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">{s.value}</p>
                <p className="mt-2 max-w-[18rem] text-sm leading-snug text-maroon-900/75">{s.label}</p>
              </li>
            ))}
          </ul>

          <nav aria-label="On this page" className="mt-12 flex flex-wrap gap-2">
            {SECTIONS.filter((s) => hubs || !s.hubsOnly).map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-blush-200 bg-white px-4 py-2 text-sm text-maroon-900 transition-colors hover:border-bloom-300 hover:text-bloom-600"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* A national network */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <Eyebrow>A national network</Eyebrow>
            <h2 className={sectionHeading}>No community should have to solve the AI transition alone.</h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-maroon-900/85 md:col-span-6 md:col-start-7">
            Hosts learn alongside communities across the country, share what works, identify questions appearing in
            multiple places, and build collective capacity to act.
          </p>
          <img
            src={assetHref("photos/delegates-conversation.jpg")}
            alt="Delegates talking across a table at the Utah Solutions Forum"
            loading="lazy"
            className="aspect-[21/9] w-full rounded-3xl bg-blush-100 object-cover object-[50%_30%] md:col-span-12"
          />
        </div>
      </section>

      {/* From communities to the country */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        <Glow tone="blush" className="-right-1/4 top-1/3 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <Eyebrow>From communities to the country</Eyebrow>
              <p className="mt-6 font-display text-4xl leading-tight text-maroon-900 sm:text-5xl">
                Some questions can be resolved locally.
                <span className="block text-bloom-500">Others can&rsquo;t.</span>
              </p>
              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
                <p>
                  A community can decide how to govern a proposed data center project. But it cannot by itself
                  determine state or national protections for children, workers, privacy, or increasingly powerful AI
                  systems.
                </p>
                <p className="font-medium text-maroon-900">
                  BLOOM is building a federation through which questions can travel to the level where they can
                  actually be resolved.
                </p>
              </div>
            </div>
          </div>

          {/* The ladder */}
          <ol ref={ladderRef} className="relative md:col-span-6 md:col-start-7" aria-label="How questions travel">
            <div aria-hidden="true" className="absolute bottom-10 left-7 top-10 w-px bg-blush-200">
              <div className="w-px bg-bloom-500 transition-[height] duration-150" style={{ height: `${progress * 100}%` }} />
            </div>
            {TIERS.map((t, i) => {
              const reached = progress >= i / TIERS.length;
              return (
                <li key={t.level} className="relative flex gap-6 pb-14 last:pb-0">
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream transition-opacity duration-500 ${
                      reached ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <TierMark tier={i} />
                  </div>
                  <div
                    className={`flex-1 rounded-2xl bg-white p-6 shadow-soft transition-all duration-500 ${
                      reached ? "translate-y-0 opacity-100" : "translate-y-3 opacity-60"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bloom-500">{t.level}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-maroon-900">{t.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Two kinds of assembly */}
          <div className="grid gap-6 md:col-span-12 md:grid-cols-2">
            {ASSEMBLY_TYPES.map((a) => (
              <div key={a.name} className="rounded-3xl bg-white p-8 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bloom-500">{a.scope}</p>
                <p className="mt-2 font-display text-2xl text-maroon-900">{a.name}</p>
                <dl className="mt-6 space-y-4">
                  {a.rows.map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-t border-blush-100 pt-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                      <dt className="text-sm text-maroon-900/65">{k}</dt>
                      <dd className="text-[15px] text-maroon-900">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The model */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>The {INSTITUTION} model</Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>Three legs of a new civic institution.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-maroon-900/85">
            Public priorities from deliberation become civic power and action through broad-based organizing.
          </p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {MODEL_LEGS.map((l) => (
              <li key={l.name} className="rounded-3xl bg-white p-8 shadow-soft">
                <p className="font-display text-2xl text-bloom-500">{l.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-maroon-900/85">{l.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The ambition */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-10">
          <p className="text-lg leading-relaxed text-maroon-900/80 sm:text-xl">
            Polls tell us what people think in isolation. Social media rewards what divides us.
          </p>
          <p className="mt-8 font-display text-3xl leading-snug text-bloom-500 sm:text-4xl">
            The {INSTITUTION} shows what communities decide when they reason together: where they agree, where they
            differ, and what they need from their state and the country.
          </p>
        </div>
      </section>

      {/* Ways to apply (hubs variant only) */}
      {hubs && (
        <section id="paths" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
          <Glow tone="blush" className="-right-1/4 top-1/4 h-[60vmin] w-[60vmin]" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
            <Eyebrow>Ways to apply</Eyebrow>
            <h2 className={`${sectionHeading} max-w-3xl`}>Apply as a host, or as a hub with your hosts.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-maroon-900/85">{APPLY_PATHS.intro}</p>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {[
                { key: "host", path: APPLY_PATHS.host, cta: <CohortCTA label={hostLabel} /> },
                { key: "hub", path: APPLY_PATHS.hub, cta: <HubCTA variant="primary" /> },
              ].map(({ key, path, cta }) => (
                <article key={key} className="flex flex-col rounded-3xl bg-white p-8 shadow-soft sm:p-10">
                  <p className="font-display text-3xl text-maroon-900">{path.name}</p>
                  <p className="mt-4 rounded-2xl bg-blush-50 p-5 text-[15px] leading-relaxed text-maroon-900">
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Who it&rsquo;s for</span>
                    <span className="mt-2 block">{path.for}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-[15px] leading-relaxed text-maroon-900/85">
                    {path.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="text-bloom-500" aria-hidden="true">&#10003;</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">{cta}</div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Host roles */}
      <section id="host-roles" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
        <Glow tone="blush" className="-left-1/4 top-1/4 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>Host roles</Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>Two types of hosts in this cohort.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-maroon-900/85">
            {HOSTS} are the heart of the {INSTITUTION}. {HOST_SCOPES_INTRO}
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {HOST_SCOPES.map((h) => (
              <article key={h.id} className="flex flex-col rounded-3xl bg-white p-8 shadow-soft sm:p-10">
                <p className="font-display text-3xl text-maroon-900">{h.name}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-blush-50 p-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Funding</dt>
                    <dd className="mt-1 font-display text-xl text-maroon-900">{h.funding}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Length</dt>
                    <dd className="mt-1 font-display text-xl text-maroon-900">{h.length}</dd>
                  </div>
                  <p className="col-span-2 text-sm text-maroon-900/75">{h.hours}</p>
                </dl>
                <p className="mt-6 text-[15px] leading-relaxed text-maroon-900/85">{h.summary}</p>
                {h.steps.length === 0 && (
                  <>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">The phases</p>
                    <ol className="mt-4 space-y-5">
                      {CO_DESIGN_ARC.phases.map((ph, i) => (
                        <li key={ph.name} className="flex gap-4">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-100 text-sm text-bloom-600">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-medium text-maroon-900">{ph.name}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-maroon-900/80">{ph.sub}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {h.steps.length > 0 && (
                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">{h.stepsLabel}</p>
                )}
                <ol className="mt-4 space-y-5">
                  {h.steps.map((st, i) => (
                    <li key={st.name} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-100 text-sm text-bloom-600">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-maroon-900">{st.name}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-maroon-900/80">{st.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          {/* Full co-design arc, collapsed by default to keep the page focused on the core role. */}
          <div id="co-design-arc" className="mt-10 scroll-mt-24">
            <button
              type="button"
              onClick={() => setArcOpen((o) => !o)}
              aria-expanded={arcOpen}
              aria-controls="co-design-arc-panel"
              className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-6 py-3 text-sm font-medium text-bloom-600 transition-colors hover:bg-blush-200"
            >
              {arcOpen ? "Hide the full co-design arc" : "See the full co-design arc"}
              <span aria-hidden="true" className={`transition-transform ${arcOpen ? "rotate-180" : ""}`}>
                &darr;
              </span>
            </button>
            {arcOpen && (
              <div id="co-design-arc-panel" className="mt-8">
                <p className="max-w-3xl text-[15px] leading-relaxed text-maroon-900/85">
                  Co-design hosts begin with the same agenda-setting arc as core hosts, then carry their community
                  through four more phases to decisions it ratifies.
                </p>
                <div className="mt-6">
                  <CoDesignArc />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-24 bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <Eyebrow>What hosts receive</Eyebrow>
            <h2 className={sectionHeading}>Funding, tools, and a network behind you.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-maroon-900/85">{FUNDING_NOTE}</p>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:col-span-7">
            {HOSTS_RECEIVE.map((r) => (
              <li key={r.name}>
                <p className="flex gap-2 font-display text-xl text-maroon-900">
                  <span className="text-bloom-500" aria-hidden="true">&#10003;</span>
                  {r.name}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-maroon-900/80">{r.body}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-3xl bg-white p-8 shadow-soft sm:p-12 md:col-span-12">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <Eyebrow>Backed by civic hubs</Eyebrow>
                <p className="mt-4 font-display text-3xl leading-tight text-maroon-900">How hubs and BLOOM support hosts</p>
                <p className="mt-4 text-[15px] leading-relaxed text-maroon-900/85">{HUB_NOTE}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-maroon-900/85">
                  {hubs ? (
                    <a href="#paths" className="underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
                      See how hubs apply with their hosts
                    </a>
                  ) : (
                    <>
                      Work this way and want to serve as a hub?{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
                        Write to {CONTACT_EMAIL}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:col-span-8">
                {HUB_PROVIDES.map((h) => (
                  <li key={h.name} className="border-t border-blush-100 pt-4">
                    <p className="font-medium text-maroon-900">{h.name}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-maroon-900/80">{h.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="scroll-mt-24 bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>Impact</Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>What your community&rsquo;s work can change.</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {IMPACT.map((it, i) => (
              <NumberedItem key={it.name} n={i + 1} name={it.name} body={it.body} />
            ))}
          </ol>
        </div>
      </section>

      {/* Who we're looking for */}
      <section id="who" className="relative scroll-mt-24 overflow-hidden bg-cream py-20 md:py-28">
        <Glow tone="blush" className="-right-1/4 top-0 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>What we&rsquo;re looking for</Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>Locally rooted. Able to convene across divides.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="space-y-4 text-[15px] leading-relaxed text-maroon-900/85 md:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Where hosts work</p>
              {WHERE_HOSTS_WORK.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="space-y-8 md:col-span-5 md:col-start-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Potential topics</p>
                <p className="mt-3 text-[15px] leading-relaxed text-maroon-900/85">
                  Hosts choose the issues most relevant to their community, set with their hub where there is one.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <li key={t} className="rounded-full bg-blush-100 px-4 py-2 text-sm text-bloom-600">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Who this will influence</p>
                <p className="mt-3 text-[15px] leading-relaxed text-maroon-900/85">{INFLUENCE}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-white p-8 shadow-soft sm:p-12">
            <p className="font-display text-3xl text-maroon-900">How we will assess potential hosts</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-maroon-900/85">
              We are looking for hosts with four key attributes. {CRITERIA_NOTE}
            </p>
            <ol className="mt-10 grid gap-10 md:grid-cols-2">
              {CRITERIA.map((c, i) => (
                <NumberedItem key={c.name} n={i + 1} name={c.name} body={c.body} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="scroll-mt-24 bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>Timeline</Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>From application to a national assembly.</h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {TIMELINE.map((t, i) => (
              <li key={t.what} className="relative border-t-2 border-blush-200 pt-5">
                <span
                  aria-hidden="true"
                  className={`absolute -top-[7px] left-0 h-3 w-3 rounded-full ${i < 2 ? "bg-bloom-500" : "bg-blush-200"}`}
                />
                <p className="font-display text-lg text-bloom-500">{t.when}</p>
                <p className="mt-1 text-[15px] text-maroon-900">{t.what}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {SELECTION_NOTES.map((n) => (
              <div key={n.name}>
                <p className="font-display text-xl text-maroon-900">{n.name}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-maroon-900/85">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section id="apply" className="relative scroll-mt-24 overflow-hidden bg-cream py-24 md:py-32">
        <Glow tone="blush" className="left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto max-w-3xl px-5">
          <div className="rounded-3xl bg-white p-8 shadow-soft sm:p-12">
            <Eyebrow>{statusLine}</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">
              Join our 2027 Cohort.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
              <p>
                Build your community&rsquo;s civic power and agency over the AI decisions ahead. BLOOM is looking for
                locally rooted organizations to become founding {HOSTS} for the {INSTITUTION} in 2027.
              </p>
              <p>
                You need to know your community, be able to bring people across differences together, and believe that
                the people who will live with the future should have a meaningful role in shaping it.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <CohortCTA label={hostLabel} />
            {hubs && <HubCTA />}
              {showPdf && (
                <Pill href={assetHref(RFP_PDF)} external variant="soft" arrow={false}>
                  Download the full RFP (PDF)
                </Pill>
              )}
            </div>
            <p className="mt-8 text-sm text-maroon-900/75">
              Questions, or interested in serving as a state or regional civic hub?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
