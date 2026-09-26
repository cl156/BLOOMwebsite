/**
 * /news/ — BLOOM press release(s) and coverage. Add articles in src/content/news.json.
 */
import { Eyebrow, Glow, Pill } from "../components/ui";
import news from "../content/news.json";
import { assetHref } from "../utils/href";

const REPORT_URL = "https://drive.google.com/file/d/1QngRN6wkkAcPDdhdFInZQn_qu0mmBWnl/view?usp=drive_link";

const RECOMMENDATIONS = [
  "Creating a dedicated statewide AI information hub and citizen engagement portal to help Utahns understand proposed projects and policies and participate in decisions.",
  "Limiting the use of nondisclosure agreements in government decisions to allow some confidentiality for business negotiation while requiring full transparency around public safety, environmental impacts and the use of public funds.",
  "Requiring hyperscale data center developers to obtain state permits and provide environmental and economic impact analyses, including projected water use and power generation, with opportunities for public comment.",
  "Requiring hyperscale data centers to be subject to a vote by city councils or county commissions, triggering public notice and hearing requirements.",
  "Creating an AI-specific category in Utah’s existing consumer complaint system, publishing aggregated complaint and enforcement information and using complaints as an early-warning system for recurring AI-related harms.",
];

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function PressQuote({ children, by }: { children: React.ReactNode; by: string }) {
  return (
    <figure className="my-8 border-l-2 border-bloom-300 pl-5">
      <blockquote className="font-display text-xl leading-snug text-bloom-500">&ldquo;{children}&rdquo;</blockquote>
      <figcaption className="mt-2 text-sm text-maroon-900/70">&mdash; {by}</figcaption>
    </figure>
  );
}

export default function NewsPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-cream pb-12 pt-36 sm:pt-44">
        <Glow className="left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <Eyebrow>News</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-bloom-500 sm:text-6xl">
            In the news
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-maroon-900/80">
            Announcements from BLOOM and coverage of Public Assemblies on AI.
          </p>
        </div>
      </section>

      {/* Featured press release */}
      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <article id="utah-solutions-forum" className="overflow-hidden rounded-3xl bg-white shadow-soft">
            <img
              src={assetHref("photos/utah-forum-group.jpg")}
              alt="Delegates and organizers of the 2026 Utah Solutions Forum outside the venue in Draper"
              className="aspect-[21/9] w-full bg-blush-100 object-cover"
            />
            <div className="mx-auto max-w-2xl p-7 sm:p-12 lg:px-0 lg:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500">Press release &middot; September 25, 2026</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-maroon-900 sm:text-4xl">
                Utahns Move from Concerns to Solutions on AI and Data Centers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-bloom-600">
                Thirty-eight Utahns developed 10 policy recommendations with greater than 80% agreement across the
                political spectrum at the state&rsquo;s first Solutions Forum
              </p>

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-maroon-900/90">
                <p>
                  <strong className="font-semibold">DRAPER, Utah, September 25, 2026</strong> &mdash; A civic assembly of 38
                  Utahns has drafted a set of recommendations for improving transparency and accountability related to AI
                  and data centers, calling for improving access to information the public can trust, better
                  opportunities for citizen engagement, stricter permitting processes, and limits on nondisclosure
                  agreements.
                </p>
                <p>
                  Delegates to the Utah Solutions Forum held on Sept. 18&ndash;19 worked over two days to develop
                  proposals that garnered supermajority crosspartisan support in the room. They broadly concluded that
                  decisions about AI and data centers should be more transparent, that residents should have a greater
                  voice in those decisions, and that large technology projects should face greater scrutiny of their
                  environmental and economic impacts.
                </p>
                <p>
                  The forum brought together residents of Cache, Salt Lake and Utah Counties, selected by civic lottery in
                  order to produce a group that was demographically representative of the area. After hearing from
                  experts and practitioners, delegates explored the question of what the public&rsquo;s role should be in
                  shaping decisions related to artificial intelligence and the infrastructure that underpins it. They are
                  expected to present their recommendations to Utah policymakers in November.
                </p>
                <p>
                  The assembly was organized by the nonprofit coalition Utah Common Ground in partnership with the BLOOM
                  Project, a civic participation nonprofit. Every proposal received support from more than 80% of
                  delegates, in a group that was approximately 60/40 Republican-leaning to Democrat-leaning delegates,
                  showing substantial common ground across partisan lines on how Utah should approach AI and data center
                  policy.
                </p>
              </div>

              <PressQuote by="Catherine Eslinger, Director of Civic Engagement, Mormon Women for Ethical Government (a member of Utah Common Ground)">
                These delegates listened to one another, worked through difficult questions and developed specific
                proposals that people with very different political perspectives could support. We are committed to
                helping carry their work forward.
              </PressQuote>

              <h3 className="font-display text-xl text-maroon-900">The recommendations included:</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-maroon-900/90">
                {RECOMMENDATIONS.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bloom-500" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>

              <PressQuote by="Rahmin Sarabi, co-executive director, the BLOOM Project">
                Poll after poll shows Americans are worried about AI across political lines. What we rarely hear is what
                people actually want done about it. In Utah, we saw that when you give ordinary people access to good
                information and space for honest conversations, they turn that concern into pragmatic, specific
                recommendations with remarkably high levels of agreement.
              </PressQuote>

              <PressQuote by="JoAnna Gale, Utah County, forum delegate">
                I also really enjoyed the diversity of people that participated. There were people from all backgrounds
                and expertise levels. But we realized that we all have some things in common: our concern for our fellow
                humans, how AI is going to impact everyone from our children to our neighbors to people across our
                communities. So we all need to be aware and involved.
              </PressQuote>

              <p className="text-[15px] leading-relaxed text-maroon-900/90">
                The original 40-person panel was selected by civic lottery from 376 eligible registrants, using
                demographic targets for geography, age, race and ethnicity, and political leaning. Two delegates withdrew
                shortly before the forum for health reasons, leaving 38 participants.
              </p>

              <div className="mt-10">
                <Pill href={REPORT_URL} external>Read the full preliminary recommendations report</Pill>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-cream pb-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="font-display text-3xl font-medium text-bloom-500">Coverage</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((a) => (
              <a
                key={a.url}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-soft transition-transform hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bloom-500">{a.outlet}</p>
                <p className="mt-1 text-xs text-maroon-900/60">{formatDate(a.date)}</p>
                <h3 className="mt-4 font-display text-xl leading-snug text-maroon-900 group-hover:text-bloom-600">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-maroon-900/75">{a.blurb}</p>
                <span className="mt-5 text-sm text-bloom-600">Read article &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
