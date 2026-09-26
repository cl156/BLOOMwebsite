/**
 * Our Approach: how BLOOM works with partners.
 */
import { Eyebrow } from "./ui";

const PRINCIPLES = [
  {
    title: "Start local.",
    body: "Trust starts close to home. Communities take on the questions they can act on locally; questions that require more scale become the agenda for state and national assemblies.",
  },
  {
    title: "Work through real differences.",
    body: "We don’t ask people to agree on everything. We bring different experiences and perspectives into the room, give people the information and time to wrestle with real trade-offs, and find where there is enough common ground to act.",
  },
  {
    title: "Use technology in service of human judgment.",
    body: "We use technology to help more people participate, make sense of what we’re hearing, and connect work across communities without replacing human deliberation. We build openly, show our work, and keep learning as we go.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>How we work</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl">
              Civic power with public judgment.
            </h2>
          </div>
          <p className="self-end text-base leading-relaxed text-maroon-900/85 md:col-span-6 md:col-start-7">
            People should have a real say in the decisions shaping their lives. With our partners, we design assemblies
            around a path to action connecting what communities decide to the people and institutions that can act on
            it.
          </p>
        </div>

        <div className="mt-16 grid gap-10 border-t border-blush-200 pt-12 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title}>
              <span className="font-display text-sm text-bloom-300">0{i + 1}</span>
              <h3 className="mt-3 font-display text-2xl leading-snug text-maroon-900">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-maroon-900/80">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
