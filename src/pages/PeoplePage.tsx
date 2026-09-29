/**
 * /people/ — the BLOOM team and advisory board. Update TEAM and ADVISORS as they change.
 * Team members without a photo yet show their initials; add a file in public/team/ and set `photo`.
 */
import { Eyebrow, Glow } from "../components/ui";
import { assetHref } from "../utils/href";

type Member = { name: string; role: string; org?: string; photo?: string };

const TEAM: Member[] = [
  { name: "Wren Elhai", role: "Strategy & Partnerships", photo: "/team/wren.jpg" },
  { name: "Mike Grafton", role: "Engineering Lead" },
  { name: "Lauren Higgins", role: "Senior Advisor", org: "New Pluralist", photo: "/team/lauren.jpg" },
  { name: "Clara Long", role: "Co-Executive Director", photo: "/team/clara.jpeg" },
  { name: "Humphrey Obuobi", role: "Design", photo: "/team/humphrey.png" },
  { name: "Rahmin Sarabi", role: "Co-Executive Director", photo: "/team/rahmin.jpg" },
  { name: "Audrey Tang", role: "Senior Advisor", photo: "/team/audrey.jpeg" },
  { name: "Zabrae Valentine", role: "Deliberation & Policy Impact", photo: "/team/zabrae.jpeg" },
];

/* Listed without photos. Lauren Higgins and Audrey Tang appear in the team grid above. */
const ADVISORS = [
  { name: "Liz Barry", org: "Metagov" },
  { name: "Andrew Means", org: "Stand Together" },
  { name: "Maria McFarland Sánchez-Moreno", org: "RepresentUs" },
  { name: "Becca Kearl", org: "Mormon Women for Ethical Government" },
  { name: "Maury Giles", org: "Braver Angels" },
  { name: "Carolyn Lukensmeyer", org: "AmericaSpeaks" },
  { name: "Scott Warren", org: "SNF Agora" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export default function PeoplePage() {
  return (
    <main>
      <section id="team" className="relative overflow-hidden bg-cream pb-24 pt-36 sm:pt-44 md:pb-32">
        <Glow className="left-1/2 top-0 h-[70vmin] w-[70vmin] -translate-x-1/2" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
          <div className="max-w-2xl">
            <Eyebrow>People</Eyebrow>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-6xl">
              Builders, civic leaders and practitioners.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-maroon-900/80">
              Brought together by the belief that democracy can work better.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {TEAM.map(({ name, role, org, photo }) => (
              <div key={name} className="group">
                {photo ? (
                  <img
                    src={assetHref(photo)}
                    alt={name}
                    loading="lazy"
                    className="aspect-square w-full rounded-2xl object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-square w-full items-center justify-center rounded-2xl bg-blush-100 font-display text-5xl text-bloom-400"
                  >
                    {initials(name)}
                  </div>
                )}
                <h2 className="mt-4 font-display text-lg text-maroon-900">{name}</h2>
                <p className="text-sm text-bloom-600">{role}</p>
                {org && <p className="text-xs text-maroon-900/50">{org}</p>}
              </div>
            ))}
          </div>

          <div id="advisors" className="mt-20 border-t border-blush-200 pt-12">
            <h2 className="font-display text-2xl text-maroon-900">Advisory board</h2>
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
    </main>
  );
}
