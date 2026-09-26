/**
 * Homepage teaser for the 2027 Cohort: the centered card from Humphrey's sketch.
 * The full theory of change lives on /cohort/.
 */
import { Glow, Pill } from "./ui";
import { FormButton } from "./CohortForm";
import { pageHref } from "../utils/href";

export default function CohortCard() {
  return (
    <section id="cohort" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <Glow tone="blush" className="left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-2xl px-5">
        <div className="rounded-3xl bg-white p-8 shadow-soft sm:p-12">
          <h2 className="font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">
            Join our 2027 Cohort
          </h2>
          <p className="mt-2 font-display text-xl text-maroon-900">Many places. A growing civic institution.</p>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-maroon-900/85">
            <p>
              BLOOM is looking for locally rooted organizations to become founding Civic Hosts, running Public
              Assemblies on AI in their communities in 2027. Our request for proposals comes out in October 2026.
            </p>
            <p>
              Selected hosts will receive funding, training, methods, CivicOS, coaching, communications support, and a
              peer network of communities doing this work across the country.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <FormButton kind="notify">Get notified about the 2027 Cohort</FormButton>
            <Pill href={pageHref("cohort")} variant="soft" arrow={false}>
              Learn more
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}
