/**
 * The Vision (why): quotes on the left, narrative on the right,
 * then a photo from the Utah Solutions Forum. All participant quotes rotate in one carousel.
 */
import { Eyebrow } from "./ui";
import { ATTRIBUTION, UTAH_FORUM } from "../content/terms";
import { assetHref } from "../utils/href";
import QuoteCarousel from "./QuoteCarousel";

/** Participant voices, in the order the carousel shows them. */
const QUOTES = [
  { text: "I want to use AI. I don’t want AI to use me.", by: ATTRIBUTION.cacheForum },
  { text: "I’ve left with a better understanding of the common ground we share.", by: ATTRIBUTION.utahForum },
  {
    text: "I have a better outlook on my fellow citizens. Seems like they are not as crazy and radical as online makes them seem.",
    by: ATTRIBUTION.utahForum,
  },
  {
    text: "I’ve never enjoyed politics, but this kind of moderated discussion and deliberation was very productive and gave me hope that citizens could engage in politics in an effective way.",
    by: ATTRIBUTION.utahForum,
  },
  {
    text: "I want to see an elected official on TV parroting back the ideas we talked about and then actions following through.",
    by: ATTRIBUTION.cacheForum,
  },
];

export default function Vision() {
  return (
    <section id="vision" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 lg:px-10">
        {/* Left: the voice that frames everything */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow>The vision</Eyebrow>
            <div className="mt-6">
              <QuoteCarousel quotes={QUOTES} label="What participants said" />
            </div>
          </div>
        </div>

        {/* Right: the argument */}
        <div className="space-y-5 text-base leading-relaxed text-maroon-900 md:col-span-7 md:pt-2">
          <p className="text-lg">
            <span className="text-bloom-500">
              Changes linked to artificial intelligence (AI) are arriving faster than communities&rsquo; ability to
              respond.
            </span>
          </p>
          <p>
            The decisions that will reshape classrooms, workplaces, and land are being made behind closed doors.
            Corporations and politicians alike often believe that a future defined by the AI industry is inevitable, and
            fail to proactively and meaningfully engage the people who are affected the most.
          </p>
          <p className="!mt-10 font-display text-2xl leading-snug text-bloom-500 sm:text-3xl">
            BLOOM&rsquo;s work starts from a different premise: give people a chance to learn, listen, work through
            options and decide together what happens next.
          </p>
          <p>
            Our partners, local organizations committed to the wellbeing of their communities, bring people together
            across differences to learn the real considerations behind these decisions, discuss the trade-offs, and
            develop actionable policies aligned with the public interest.
          </p>
        </div>
      </div>

      {/* What participants took away */}
      <div className="mx-auto mt-24 max-w-7xl px-5 lg:px-10">
        <figure>
          <img
            src={assetHref("photos/small-group.jpg")}
            alt="Two delegates in conversation at the Utah Solutions Forum"
            loading="lazy"
            className="aspect-[21/9] w-full rounded-3xl bg-blush-100 object-cover object-[50%_30%]"
          />
          <figcaption className="mt-3 text-xs text-maroon-900/60">Delegates at the {UTAH_FORUM}, September 2026.</figcaption>
        </figure>
      </div>
    </section>
  );
}
