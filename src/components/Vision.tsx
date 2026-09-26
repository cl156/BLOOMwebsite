/**
 * The Vision (why): quotes on the left, narrative on the right,
 * then what participants took away (layout from Humphrey's sketch).
 */
import { Eyebrow, Quote } from "./ui";
import { assetHref } from "../utils/href";

const TAKEAWAYS = [
  "I’ve left with a better understanding of the common ground we share.",
  "I have a better outlook on my fellow citizens. Seems like they are not as crazy and radical as online makes them seem.",
  "I’ve never enjoyed politics, but this kind of moderated discussion and deliberation was very productive and gave me hope that citizens could engage in politics in an effective way.",
];

export default function Vision() {
  return (
    <section id="vision" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 lg:px-10">
        {/* Left: the voice that frames everything */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow>The vision</Eyebrow>
            <Quote by="Participant, Cache County, Utah" size="lg" className="mt-6">
              I want to use AI. I don&rsquo;t want AI to use me.
            </Quote>
            <Quote by="BLOOM participant" className="mt-12 border-l border-bloom-200 pl-5">
              You&rsquo;re not really talking to other people, you&rsquo;re just going to the podium and giving your rant.
            </Quote>
          </div>
        </div>

        {/* Right: the argument */}
        <div className="space-y-5 text-base leading-relaxed text-maroon-900 md:col-span-7 md:pt-2">
          <p className="text-lg">
            <span className="text-bloom-500">AI choices are arriving faster than our ability to make them together.</span>
          </p>
          <p>
            Some people vote, call, email, show up, and comment and still see no real follow through. Many don&rsquo;t
            participate at all. They&rsquo;re busy, isolated, overwhelmed, don&rsquo;t know where to start, or simply
            don&rsquo;t believe their effort will matter.
          </p>
          <p>And the ways we do invite people in don&rsquo;t tend to serve wise decision-making.</p>
          <p>
            Meanwhile, decisions on AI get made in Silicon Valley or behind closed doors. Good information is
            increasingly hard to access. Powerful interests and conflict entrepreneurs shape what happens in ways
            neighbors cannot.
          </p>
          <p className="!mt-10 font-display text-2xl leading-snug text-bloom-500 sm:text-3xl">
            Public Assemblies start from a different premise: given a real chance to learn, listen, and work through
            the choices, we can decide together what happens next.
          </p>
        </div>
      </div>

      {/* What participants took away */}
      <div className="mx-auto mt-24 max-w-7xl px-5 lg:px-10">
        <figure className="mb-16">
          <img
            src={assetHref("photos/small-group.jpg")}
            alt="Two delegates in conversation at the Utah Solutions Forum"
            loading="lazy"
            className="aspect-[21/9] w-full rounded-3xl bg-blush-100 object-cover object-[50%_30%]"
          />
          <figcaption className="mt-3 text-xs text-maroon-900/60">Delegates at the Utah Solutions Forum, September 2026.</figcaption>
        </figure>
        <div className="grid gap-6 md:grid-cols-3">
          {TAKEAWAYS.map((q) => (
            <figure key={q} className="rounded-2xl bg-white p-7 shadow-soft">
              <blockquote className="text-[15px] leading-relaxed text-maroon-900">&ldquo;{q}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs tracking-wide text-maroon-900/60">&mdash; Public Assembly participant</figcaption>
            </figure>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-base text-maroon-900/80">
            And people don&rsquo;t just want to be heard. They want what they decide together to matter.
          </p>
          <Quote size="lg" className="mt-6">
            I want to see an elected official on TV parroting back the ideas we talked about and then actions
            following through.
          </Quote>
        </div>
      </div>
    </section>
  );
}
