/**
 * People — team members grid. Update TEAM as the team evolves.
 */
import { Eyebrow } from "./ui";
import { assetHref } from "../utils/href";

/* Advisory board, listed without photos. Lauren Higgins and Audrey Tang appear in the grid above. */
const ADVISORS = [
  { name: "Andrew Means", org: "Stand Together" },
  { name: "Maria McFarland S\u00e1nchez-Moreno", org: "RepresentUs" },
  { name: "Becca Kearl", org: "Mormon Women for Ethical Government" },
  { name: "Maury Giles", org: "Braver Angels" },
  { name: "Carolyn Lukensmeyer", org: "AmericaSpeaks" },
  { name: "Scott Warren", org: "SNF Agora" },
];

const TEAM = [
  {
    name: "Liz Barry",
    role: "Strategy & Ecosystem",
    org: "MetaGov",
    photo: "/team/liz.jpeg",
  },
  {
    name: "Lauren Higgins",
    role: "Senior Advisor",
    org: "New Pluralist",
    photo: "/team/lauren.jpg",
  },
  {
    name: "Clara Long",
    role: "Co-Executive Director",
    photo: "/team/clara.jpeg",
  },
  {
    name: "Stuart Lynn",
    role: "Technology & Product",
    org: "CrownShy",
    photo: "/team/stuart.png",
  },
  {
    name: "Humphrey Obuobi",
    role: "Design",
    photo: "/team/humphrey.png",
  },
  {
    name: "Rahmin Sarabi",
    role: "Co-Executive Director",
    photo: "/team/rahmin.jpg",
  },
  {
    name: "Audrey Tang",
    role: "Senior Advisor",
    photo: "/team/audrey.jpeg",
  },
  {
    name: "Zabrae Valentine",
    role: "Strategy & Partnerships",
    photo: "/team/zabrae.jpeg",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>People</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-bloom-500 sm:text-5xl">
            Builders, civic leaders and practitioners.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-maroon-900/80">
            Brought together by the belief that democracy can work better.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {TEAM.map(({ name, role, org, photo }) => (
            <div key={name} className="group">
              <img
                src={assetHref(photo)}
                alt={name}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              <h3 className="mt-4 font-display text-lg text-maroon-900">{name}</h3>
              <p className="text-sm text-bloom-600">{role}</p>
              {org && <p className="text-xs text-maroon-900/50">{org}</p>}
            </div>
          ))}
        </div>

        <div id="advisors" className="mt-20 border-t border-blush-200 pt-12">
          <h3 className="font-display text-2xl text-maroon-900">Advisory board</h3>
          <p className="mt-2 max-w-3xl text-pretty text-[15px] leading-relaxed text-maroon-900/80">
            Leaders from across the political spectrum who help keep our work credible to everyone.
          </p>
          <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {ADVISORS.map(({ name, org }) => (
              <li key={name}>
                <p className="font-display text-lg text-maroon-900">{name}</p>
                <p className="text-sm text-bloom-600">{org}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
