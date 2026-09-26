/**
 * Hero: headline top-left, pitch bottom-right, a large soft glow between them
 * (layout from Humphrey's site sketch).
 */
import { Glow } from "./ui";
import { sectionHref } from "../utils/href";
import { FormButton } from "./CohortForm";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] overflow-hidden bg-cream">
      <Glow className="left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2" />
      <Glow tone="blush" className="-right-40 -top-40 h-[50vmin] w-[50vmin] opacity-70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-between gap-16 px-5 pb-16 pt-32 sm:pt-36 lg:px-10 lg:pb-20">
        <h1 className="max-w-3xl font-display tracking-tight">
          <span className="block text-2xl font-normal text-maroon-900 sm:text-3xl">
            Decisions about AI are changing our lives.
          </span>
          <span className="mt-2 block text-5xl font-medium leading-[1.02] text-bloom-500 sm:text-6xl lg:text-7xl">
            Our communities should have a say in how.
          </span>
        </h1>

        <div className="max-w-md self-end text-[15px] leading-relaxed text-maroon-900 sm:text-base md:mr-[4%]">
          <p>
            BLOOM helps communities stand up <strong className="font-semibold">Public Assemblies on AI</strong>:
            structured, unusually hopeful online and in-person spaces where neighbors can learn about AI, hear
            different perspectives, work through difficult choices, and{" "}
            <em className="text-bloom-500">turn their concerns into concrete proposals decision makers can&rsquo;t ignore.</em>
          </p>
          <p className="mt-4 text-maroon-900/75">
            Communities act on what they decide locally. Questions they can&rsquo;t solve alone become the agenda
            for state and national citizens&rsquo; assemblies.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <FormButton kind="notify">Get notified about the 2027 Cohort</FormButton>
            <a href={sectionHref("work")} className="text-sm text-bloom-600 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-700">
              See the results from Utah
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
