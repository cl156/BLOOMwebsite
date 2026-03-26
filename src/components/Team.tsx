/**
 * "Meet the Team" — team members grid
 *
 * Update TEAM array as the team evolves.
 */
import MycelialCanvas from "./MycelialCanvas";

const LIGHT_NET_COLORS = [
  "107,42,61",
  "155,69,89",
  "180,100,120",
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
    photo: "/team/lauren.jpg",
  },
  {
    name: "Clara Long",
    role: "Co-Lead",
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
    role: "Co-Lead",
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
    <section
      id="team"
      className="relative py-20 md:py-28"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf8f9 50%, #ffffff 100%)" }}
    >
      <MycelialCanvas
        colors={LIGHT_NET_COLORS}
        seed={151}
        seedCount={18}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.85}
        fadeRyRatio={0.9}
        edgeAlpha={0.12}
        nodeAlpha={0.15}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            Meet the team
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            A cross-disciplinary team working at the intersection of civic
            infrastructure, technology, and democratic innovation.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {TEAM.map(({ name, role, org, photo }) => (
            <div
              key={name}
              className="group rounded-lg border border-gray-200 bg-white p-5 text-center transition-all hover:border-bloom-300 hover:shadow-md"
            >
              <img
                src={`${import.meta.env.BASE_URL}${photo.slice(1)}`}
                alt={name}
                className="mx-auto h-28 w-28 rounded-lg object-cover grayscale transition-all group-hover:grayscale-0"
              />
              <h3 className="mt-4 text-base font-bold text-maroon-700">
                {name}
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-bloom-600">
                {role}
              </p>
              {org && (
                <p className="mt-0.5 text-xs text-gray-400">{org}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
