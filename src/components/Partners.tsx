/**
 * Partners: logo wall on the homepage.
 *
 * Staging only for now (partners are confirming they're happy to be listed): it shows in local dev and
 * on the fork's staging build, where the deploy sets VITE_SHOW_PARTNERS=true, and is hidden on
 * bloom-project.org. Remove the SHOW_PARTNERS check to publish.
 *
 * To add a logo: put the file in public/partners/ and set `logo` below. Partners without one show their name.
 */
import { Eyebrow } from "./ui";
import { INSTITUTION } from "../content/terms";
import { assetHref } from "../utils/href";

export const SHOW_PARTNERS = import.meta.env.DEV || import.meta.env.VITE_SHOW_PARTNERS === "true";

const PARTNERS: { name: string; logo?: string }[] = [
  { name: "Utah Common Ground", logo: "partners/utah-common-ground.png" },
  { name: "Mormon Women for Ethical Government" }, // logo file in Drive is corrupted; needs a re-upload
  { name: "Central Oregon Civic Action Project (COCAP)", logo: "partners/cocap.png" },
  { name: "Braver Angels", logo: "partners/braver-angels.png" },
  { name: "AEGIX AI Ethics & Governance Institute", logo: "partners/aegix.png" },
  { name: "Center for Anticipatory Intelligence, Utah State University", logo: "partners/center-anticipatory-intelligence.png" },
  { name: "Engage Forum", logo: "partners/engage-forum.png" },
  { name: "Child First Policy Center", logo: "partners/child-first-policy-center.png" },
  { name: "Oregon\u2019s Kitchen Table", logo: "partners/oregons-kitchen-table.png" },
  { name: "Central Oregon Community College", logo: "partners/central-oregon-community-college.png" },
  { name: "Central Oregon Intergovernmental Council", logo: "partners/coic.png" },
  { name: "Citizens4Community", logo: "partners/citizens4community.png" },
  { name: "Metagov", logo: "partners/metagov.png" },
  { name: "CrownShy", logo: "partners/crownshy.png" },
];

export default function Partners() {
  if (!SHOW_PARTNERS) return null;
  return (
    <section id="partners" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Partners</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl">
            Bigger than any one organization.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-maroon-900/80">
            The {INSTITUTION} is built by civic groups, coalitions and technology partners working together.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map(({ name, logo }) => (
            <li
              key={name}
              className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-blush-200 bg-white p-5 text-center"
            >
              {logo ? (
                <img src={assetHref(logo)} alt={name} loading="lazy" className="max-h-[72%] max-w-[88%] object-contain" />
              ) : (
                <span className="font-display text-base leading-snug text-maroon-900/80 sm:text-lg">{name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
