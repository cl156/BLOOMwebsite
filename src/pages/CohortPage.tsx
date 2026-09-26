/**
 * /cohort/ — the 2027 Cohort: BLOOM's theory of change (a national network,
 * questions travelling from communities to the country) and the call for hosts.
 */
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Glow } from "../components/ui";
import { FormButton } from "../components/CohortForm";
import { assetHref } from "../utils/href";

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
    body: "Questions requiring national action can ultimately become the agenda for a representative National Civic Assembly on AI.",
  },
];

const QUESTIONS = [
  "Where do very different communities converge after actually working through the choices?",
  "Where do they differ?",
  "And what do they believe the country needs to resolve?",
];

const HOSTS_RECEIVE = [
  "Funding",
  "Training",
  "Methods",
  "CivicOS",
  "Coaching",
  "Communications support",
  "A peer network of communities doing this work across the country",
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

  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-cream pb-20 pt-36 sm:pt-44">
        <Glow className="left-1/2 top-0 h-[80vmin] w-[80vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>The 2027 Cohort</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-bloom-500 sm:text-6xl lg:text-7xl">
            Many places. A growing civic institution.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-maroon-900/85">
            BLOOM is looking for locally rooted organizations to become founding Civic Hosts for Public Assemblies on
            AI in 2027. Here&rsquo;s what we&rsquo;re building together, and why it matters beyond any one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <FormButton kind="notify">Get notified about the 2027 Cohort</FormButton>
          </div>
        </div>
      </section>

      {/* A national network */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 lg:px-10">
          <div className="md:col-span-5">
            <Eyebrow>A national network</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl">
              No community should have to solve the AI transition alone.
            </h2>
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
                Some questions can be answered locally.
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
                  actually be answered.
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
        </div>
      </section>

      {/* The ambition */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-10">
          <p className="text-base text-maroon-900/80">
            The ambition is to make something visible that our politics rarely lets us see:
          </p>
          <div className="mt-10 space-y-6">
            {QUESTIONS.map((q) => (
              <p key={q} className="font-display text-3xl leading-snug text-bloom-500 sm:text-4xl">
                {q}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section id="apply" className="relative overflow-hidden bg-cream py-24 md:py-32">
        <Glow tone="blush" className="left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2" />
        <div className="relative mx-auto max-w-3xl px-5">
          <div className="rounded-3xl bg-white p-8 shadow-soft sm:p-12">
            <h2 className="font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">
              Join our 2027 Cohort.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
              <p>
                BLOOM is looking for locally rooted organizations to become founding Civic Hosts for Public Assemblies
                on AI in 2027, with the potential to expand the network as resources allow.
              </p>
              <p>
                You need to know your community, be able to bring people across differences together, and believe that
                the people who will live with the future should have a meaningful role in shaping it.
              </p>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Selected hosts receive</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2 text-[15px] text-maroon-900 sm:grid-cols-2">
              {HOSTS_RECEIVE.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-bloom-500" aria-hidden="true">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <FormButton kind="notify">Get notified about the 2027 Cohort</FormButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
