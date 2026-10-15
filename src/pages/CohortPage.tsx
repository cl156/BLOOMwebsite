/**
 * /cohort/ — the 2027 Cohort: BLOOM's theory of change (a national network,
 * questions travelling from communities to the country) and the full call for
 * Civic Hosts.
 *
 * All wording lives in content/cohort.json. In local dev (npm run dev), click any
 * text on the page to edit it; it saves back to that file when you click away.
 * Dates, links and the open/close logic live in content/rfp.ts.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import copy from "../content/cohort.json";
import { APPLY_EMBED_URL, APPLY_URL, HUB_INQUIRY_MAILTO, INFO_SESSION_URL, RFP_PDF, infoSessionUpcoming, rfpStatus } from "../content/rfp";
import Editable from "../components/Editable";
import { Eyebrow, Glow, Pill } from "../components/ui";
import { CohortCTA, cohortStatusLine } from "../components/CohortForm";
import { assetHref, sectionHref } from "../utils/href";

const SECTIONS = ["paths", "who", "host-roles", "support", "tools", "impact", "timeline", "apply"] as const;

const FILE = "cohort.json";

/** Split text so the first occurrence of each listed word becomes a link. */
function linkWords(text: string, links: Record<string, string>) {
  const words = Object.keys(links).filter((w) => text.includes(w));
  if (!words.length) return text;
  const pattern = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  const used = new Set<string>();
  return text.split(pattern).map((part, i) => {
    if (links[part] && !used.has(part)) {
      used.add(part);
      return (
        // Not editable, so the link still works inside click-to-edit text in local dev.
        <a key={i} href={links[part]} contentEditable={false} className="underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
          {part}
        </a>
      );
    }
    return part;
  });
}

/**
 * Text that's click-to-edit in local dev and plain text on the live site.
 * Empty text renders nothing, so deleting a line on the page also removes its spacing.
 */
function E({
  path,
  as,
  className,
  children,
  links,
}: {
  path: string;
  as?: "span" | "p" | "div";
  className?: string;
  children: string;
  /** Words to link, e.g. { Utah: "/#work" }. The first occurrence of each becomes a link. */
  links?: Record<string, string>;
}) {
  if (!children.trim()) return null;
  // Show line breaks typed into the text (Enter) as breaks on the page.
  const cls = children.includes("\n") ? `${className ?? ""} whitespace-pre-line` : className;
  return (
    <Editable file={FILE} path={path} as={as} className={cls}>
      {links ? linkWords(children, links) : children}
    </Editable>
  );
}

/** Numbered card used for criteria, impact and similar short lists. */
function NumberedItem({ n, name, body, path }: { n: number; name: string; body: string; path: string }) {
  return (
    <li className="flex gap-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush-100 font-display text-base text-bloom-600">
        {n}
      </span>
      <div>
        <E as="p" path={`${path}.name`} className="font-display text-xl text-maroon-900">{name}</E>
        <E as="p" path={`${path}.body`} className="mt-2 text-[15px] leading-relaxed text-maroon-900/85">{body}</E>
      </div>
    </li>
  );
}

const sectionHeading = "mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl";

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

/** Which section is currently in view, for highlighting the section bar. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

export default function CohortPage() {
  const { ref: ladderRef, progress } = useScrollProgress<HTMLOListElement>();
  const statusLine = cohortStatusLine();
  // The RFP PDF download appears once applications open (preview early with ?rfp=open).
  const showPdf = Boolean(RFP_PDF) && rfpStatus() !== "upcoming";
  const c = copy;
  const tiers = c.ladder.tiers;
  const scopes = [
    { key: "core", s: c.work.core },
    { key: "coDesign", s: c.work.coDesign },
  ] as const;
  // The application form is embedded at the bottom while applications are open; Apply buttons jump to it.
  const showForm = rfpStatus() === "open";
  const navIds = useMemo(() => SECTIONS.filter((id) => id !== "apply" || showForm), [showForm]);
  const active = useActiveSection(navIds);
  const formAnchor = "#apply";
  // Info session registration shows until the session is over.
  const showInfoSession = infoSessionUpcoming();
  const infoButton = showInfoSession && (
    <Pill href={INFO_SESSION_URL} external variant="soft">
      {c.infoSession.button}
    </Pill>
  );
  const infoWhen = showInfoSession && (
    <E as="p" path="infoSession.when" className="mt-2 text-[15px] text-maroon-900/80">
      {c.infoSession.when}
    </E>
  );
  const pdfButton = showPdf && (
    <Pill href={assetHref(RFP_PDF)} external variant="soft" arrow={false}>
      {c.hero.pdfLabel}
    </Pill>
  );

  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-cream pb-16 pt-36 sm:pt-44">
        <Glow className="left-1/2 top-0 h-[80vmin] w-[80vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="hero.eyebrow">{c.hero.eyebrow}</E>
          </Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-bloom-500 sm:text-6xl lg:text-7xl">
            <E path="hero.heading">{c.hero.heading}</E>
          </h1>
          <E
            as="p"
            path="hero.intro"
            links={{ Utah: sectionHref("work"), Oregon: sectionHref("work") }}
            className="mt-6 block max-w-xl text-base leading-relaxed text-maroon-900/85"
          >
            {c.hero.intro}
          </E>
          <p className="mt-8 text-sm font-semibold text-maroon-900">{statusLine}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CohortCTA formAnchor={formAnchor} />
            {infoButton}
            {pdfButton}
          </div>
          {showInfoSession && c.infoSession.when.trim() && (
            <p className="mt-3 text-sm text-maroon-900/75">
              <E path="infoSession.heroPrefix" className="font-medium text-maroon-900">{c.infoSession.heroPrefix}</E>:{" "}
              <E path="infoSession.when">{c.infoSession.when}</E>
            </p>
          )}

        </div>
      </section>

      {/* Section bar: sticks under the site header while scrolling, highlights the current section */}
      <nav aria-label="On this page" className="sticky top-20 z-40 border-y border-blush-200 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 lg:px-10">
          <p className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500 md:block">{c.navLabel}</p>
          <div className="-mx-2 flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
            {navIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? "bg-blush-100 text-bloom-600" : "text-maroon-900 hover:text-bloom-600"
                }`}
              >
                {c.nav[id]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* The ambition */}
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-10">
          <E as="p" path="ambition.lead" className="text-lg leading-relaxed text-maroon-900/80 sm:text-xl">
            {c.ambition.lead}
          </E>
          <E as="p" path="ambition.statement" className="mt-8 font-display text-3xl leading-snug text-bloom-500 sm:text-4xl">
            {c.ambition.statement}
          </E>
        </div>
      </section>

      {/* From communities to the country */}
      <section className="relative overflow-hidden bg-cream py-14 md:py-20">
        <Glow tone="blush" className="-right-1/4 top-1/3 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-40">
              <Eyebrow>
                <E path="ladder.eyebrow">{c.ladder.eyebrow}</E>
              </Eyebrow>
              <p className="mt-6 font-display text-3xl leading-tight text-maroon-900 sm:text-4xl">
                <E path="ladder.heading">{c.ladder.heading}</E>
                <E path="ladder.headingAccent" className="mt-2 block text-bloom-500">
                  {c.ladder.headingAccent}
                </E>
              </p>
              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
                <E as="p" path="ladder.body">{c.ladder.body}</E>
                <E as="p" path="network.body">{c.network.body}</E>
                <E as="p" path="ladder.emphasis" className="font-medium text-maroon-900">
                  {c.ladder.emphasis}
                </E>
              </div>
            </div>
          </div>

          {/* The ladder */}
          <ol ref={ladderRef} className="relative md:col-span-6 md:col-start-7" aria-label="How questions travel">
            <div aria-hidden="true" className="absolute bottom-10 left-7 top-10 w-px bg-blush-200">
              <div className="w-px bg-bloom-500 transition-[height] duration-150" style={{ height: `${progress * 100}%` }} />
            </div>
            {tiers.map((t, i) => {
              const reached = progress >= i / tiers.length;
              return (
                <li key={i} className="relative flex gap-6 pb-14 last:pb-0">
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
                    <E as="p" path={`ladder.tiers.${i}.level`} className="text-xs font-semibold uppercase tracking-[0.2em] text-bloom-500">
                      {t.level}
                    </E>
                    <E as="p" path={`ladder.tiers.${i}.body`} className="mt-2 text-[15px] leading-relaxed text-maroon-900">
                      {t.body}
                    </E>
                  </div>
                </li>
              );
            })}
          </ol>

          <img
            src={assetHref("photos/delegates-conversation.jpg")}
            alt={c.network.imageAlt}
            loading="lazy"
            className="aspect-[21/9] w-full rounded-3xl bg-blush-100 object-cover object-[50%_30%] md:col-span-12"
          />
        </div>
      </section>

      {/* How to apply: the host application, plus a separate inquiry for state or regional civic hubs */}
      <section id="paths" className="relative scroll-mt-40 overflow-hidden bg-cream py-14 md:py-20">
        <Glow tone="blush" className="-right-1/4 top-1/4 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>
                <E path="paths.eyebrow">{c.paths.eyebrow}</E>
              </Eyebrow>
              <h2 className={`${sectionHeading} max-w-3xl`}>
                <E path="paths.heading">{c.paths.heading}</E>
              </h2>
              <E as="p" path="paths.intro" className="mt-6 block max-w-2xl text-lg leading-relaxed text-maroon-900/85">
                {c.paths.intro}
              </E>
              {c.paths.host.points.map((pt, i) => (
                <E key={i} as="p" path={`paths.host.points.${i}`} className="mt-4 max-w-2xl text-[15px] leading-relaxed text-maroon-900/75">
                  {pt}
                </E>
              ))}
              <div className="mt-8">
                <CohortCTA formAnchor={formAnchor} />
              </div>
            </div>

            <aside id="hubs" className="scroll-mt-40 rounded-3xl border border-blush-200 bg-blush-50 p-8 sm:p-10 lg:col-span-5 lg:mt-10">
              <Eyebrow>
                <E path="paths.hub.eyebrow">{c.paths.hub.eyebrow}</E>
              </Eyebrow>
              <E as="p" path="paths.hub.heading" className="mt-4 font-display text-2xl leading-snug text-maroon-900">
                {c.paths.hub.heading}
              </E>
              <E as="p" path="paths.hub.body" className="mt-4 text-[15px] leading-relaxed text-maroon-900/85">
                {c.paths.hub.body}
              </E>
              <div className="mt-8">
                <Pill href={HUB_INQUIRY_MAILTO} variant="soft">
                  {c.paths.hub.button}
                </Pill>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section id="who" className="relative scroll-mt-40 overflow-hidden bg-cream py-14 md:py-20">
        <Glow tone="blush" className="-right-1/4 top-0 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="who.eyebrow">{c.who.eyebrow}</E>
          </Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>
            <E path="who.heading">{c.who.heading}</E>
          </h2>
          {/* One column: the "what's at stake" paragraph, then topics wrapping across the full width */}
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-maroon-900/85">
            <E as="p" path="who.whereLabel" className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
              {c.who.whereLabel}
            </E>
            {c.who.where.map((p, i) => (
              <E key={i} as="p" path={`who.where.${i}`}>{p}</E>
            ))}
          </div>

          <div className="mt-10">
            <E as="p" path="who.topicsLabel" className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
              {c.who.topicsLabel}
            </E>
            <E as="p" path="who.topicsIntro" className="mt-2 text-[15px] leading-relaxed text-maroon-900/85">
              {c.who.topicsIntro}
            </E>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.who.topics.map((t, i) => (
                <li key={i} className="rounded-full bg-blush-100 px-4 py-2 text-sm text-bloom-600">
                  <E path={`who.topics.${i}`}>{t}</E>
                </li>
              ))}
            </ul>
            <E as="p" path="who.influenceLabel" className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
              {c.who.influenceLabel}
            </E>
            <E as="p" path="who.influence" className="mt-2 max-w-3xl text-[15px] leading-relaxed text-maroon-900/85">
              {c.who.influence}
            </E>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-8 shadow-soft sm:p-12">
            <E as="p" path="who.assessHeading" className="font-display text-3xl text-maroon-900">{c.who.assessHeading}</E>
            <E as="p" path="who.assessIntro" className="mt-3 max-w-3xl text-[15px] leading-relaxed text-maroon-900/85">
              {c.who.assessIntro}
            </E>
            <ol className="mt-10 grid gap-10 md:grid-cols-2">
              {c.who.criteria.map((cr, i) => (
                <NumberedItem key={i} n={i + 1} name={cr.name} body={cr.body} path={`who.criteria.${i}`} />
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The work: core and co-design community assemblies */}
      <section id="host-roles" className="relative scroll-mt-40 overflow-hidden bg-cream py-14 md:py-20">
        <Glow tone="blush" className="-left-1/4 top-1/4 h-[60vmin] w-[60vmin]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="work.eyebrow">{c.work.eyebrow}</E>
          </Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>
            <E path="work.heading">{c.work.heading}</E>
          </h2>
          <E as="p" path="work.intro" className="mt-6 block max-w-2xl text-lg leading-relaxed text-maroon-900/85">
            {c.work.intro}
          </E>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {scopes.map(({ key, s: h }) => (
              <article key={key} className="flex flex-col rounded-3xl bg-white p-8 shadow-soft sm:p-10">
                <E as="p" path={`work.${key}.name`} className="font-display text-3xl text-maroon-900">{h.name}</E>
                <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-blush-50 p-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
                      <E path="work.fundingLabel">{c.work.fundingLabel}</E>
                    </dt>
                    <dd className="mt-1 font-display text-xl text-maroon-900">
                      <E path={`work.${key}.funding`}>{h.funding}</E>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
                      <E path="work.lengthLabel">{c.work.lengthLabel}</E>
                    </dt>
                    <dd className="mt-1 font-display text-xl text-maroon-900">
                      <E path={`work.${key}.length`}>{h.length}</E>
                    </dd>
                  </div>
                  <E as="p" path={`work.${key}.hours`} className="col-span-2 text-sm text-maroon-900/75">{h.hours}</E>
                </dl>
                <E as="p" path={`work.${key}.summary`} className="mt-6 text-[15px] leading-relaxed text-maroon-900/85">{h.summary}</E>
                <E as="p" path={`work.${key}.stepsLabel`} className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
                  {h.stepsLabel}
                </E>
                <ol className="mt-4 space-y-5">
                  {h.steps.map((st, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush-100 text-sm text-bloom-600">
                        {i + 1}
                      </span>
                      <div>
                        <E as="p" path={`work.${key}.steps.${i}.name`} className="font-medium text-maroon-900">{st.name}</E>
                        <E as="p" path={`work.${key}.steps.${i}.body`} className="mt-1 text-[15px] leading-relaxed text-maroon-900/80">
                          {st.body}
                        </E>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-40 bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <Eyebrow>
              <E path="support.eyebrow">{c.support.eyebrow}</E>
            </Eyebrow>
            <h2 className={sectionHeading}>
              <E path="support.heading">{c.support.heading}</E>
            </h2>
            <E as="p" path="support.fundingNote" className="mt-6 text-[15px] leading-relaxed text-maroon-900/85">
              {c.support.fundingNote}
            </E>
          </div>
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 md:col-span-7">
            {c.support.receive.map((r, i) => (
              <li key={i}>
                <p className="flex gap-2 font-display text-xl text-maroon-900">
                  <span className="text-bloom-500" aria-hidden="true">&#10003;</span>
                  <E path={`support.receive.${i}.name`}>{r.name}</E>
                </p>
                <E as="p" path={`support.receive.${i}.body`} className="mt-2 text-[15px] leading-relaxed text-maroon-900/80">
                  {r.body}
                </E>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The tools: CivicOS, one card per tool, tied to the playbook step it supports */}
      <section id="tools" className="scroll-mt-40 bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="tools.eyebrow">{c.tools.eyebrow}</E>
          </Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>
            <E path="tools.heading">{c.tools.heading}</E>
          </h2>
          <E as="p" path="tools.intro" className="mt-6 block max-w-2xl text-lg leading-relaxed text-maroon-900/85">
            {c.tools.intro}
          </E>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {c.tools.items.map((t, i) => (
              <li key={i} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft">
                <img
                  src={assetHref(t.image)}
                  alt={t.imageAlt}
                  loading="lazy"
                  className="aspect-[16/10] w-full bg-blush-50 object-cover object-top"
                />
                <div className="flex flex-1 flex-col p-7">
                  <E as="p" path={`tools.items.${i}.label`} className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">
                    {t.label}
                  </E>
                  <E as="p" path={`tools.items.${i}.name`} className="mt-2 font-display text-2xl text-maroon-900">
                    {t.name}
                  </E>
                  <E as="p" path={`tools.items.${i}.body`} className="mt-3 flex-1 text-[15px] leading-relaxed text-maroon-900/85">
                    {t.body}
                  </E>
                  {t.link && t.linkLabel.trim() && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700"
                    >
                      {t.linkLabel}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="scroll-mt-40 bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="impact.eyebrow">{c.impact.eyebrow}</E>
          </Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>
            <E path="impact.heading">{c.impact.heading}</E>
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {c.impact.items.map((it, i) => (
              <NumberedItem key={i} n={i + 1} name={it.name} body={it.body} path={`impact.items.${i}`} />
            ))}
          </ol>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="scroll-mt-40 bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>
            <E path="timeline.eyebrow">{c.timeline.eyebrow}</E>
          </Eyebrow>
          <h2 className={`${sectionHeading} max-w-3xl`}>
            <E path="timeline.heading">{c.timeline.heading}</E>
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {c.timeline.items.map((t, i) => (
              <li key={i} className="relative border-t-2 border-blush-200 pt-5">
                <span
                  aria-hidden="true"
                  className={`absolute -top-[7px] left-0 h-3 w-3 rounded-full ${i < 2 ? "bg-bloom-500" : "bg-blush-200"}`}
                />
                <E as="p" path={`timeline.items.${i}.when`} className="font-display text-lg text-bloom-500">{t.when}</E>
                <E as="p" path={`timeline.items.${i}.what`} className="mt-1 text-[15px] text-maroon-900">{t.what}</E>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {c.timeline.notes.map((n, i) => (
              <div key={i}>
                <E as="p" path={`timeline.notes.${i}.name`} className="font-display text-xl text-maroon-900">{n.name}</E>
                <E as="p" path={`timeline.notes.${i}.body`} className="mt-2 text-[15px] leading-relaxed text-maroon-900/85">{n.body}</E>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form (embedded Airtable), only while applications are open */}
      {showForm && (
        <section id="apply" className="scroll-mt-40 bg-cream pb-16 md:pb-24">
          <div className="mx-auto max-w-4xl px-5">
            <Eyebrow>
              <E path="applicationForm.eyebrow">{c.applicationForm.eyebrow}</E>
            </Eyebrow>
            <h2 className={`${sectionHeading} max-w-3xl`}>
              <E path="applicationForm.heading">{c.applicationForm.heading}</E>
            </h2>
            <E as="p" path="applicationForm.intro" className="mt-4 text-[15px] leading-relaxed text-maroon-900/85">
              {c.applicationForm.intro}
            </E>
            <iframe
              title="Civic Host application form"
              src={APPLY_EMBED_URL}
              className="mt-8 h-[80vh] min-h-[640px] w-full rounded-3xl border border-blush-200 bg-white shadow-soft"
            />
            <p className="mt-4 text-sm text-maroon-900/75">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
                {c.applicationForm.newTab}
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Info session registration, last on the page until applications close */}
      {showInfoSession && (
        <section className="bg-cream pb-16 md:pb-24">
          <div className="mx-auto max-w-4xl px-5">
            <div className="flex flex-col items-start gap-5 rounded-3xl bg-blush-50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <E as="p" path="infoSession.prompt" className="font-display text-2xl text-maroon-900">
                  {c.infoSession.prompt}
                </E>
                {infoWhen}
              </div>
              {infoButton}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
