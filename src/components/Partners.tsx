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
import { assetHref } from "../utils/href";

export const SHOW_PARTNERS = import.meta.env.DEV || import.meta.env.VITE_SHOW_PARTNERS === "true";

const PARTNERS: { name: string; logo?: string }[] = [
  { name: "Utah Common Ground" },
  { name: "Mormon Women for Ethical Government" },
  { name: "Central Oregon Civic Action Project (COCAP)" },
  { name: "Braver Angels" },
  { name: "AEGIX AI Ethics & Governance Institute" },
  { name: "Center for Anticipatory Intelligence, Utah State University" },
  { name: "Engage Utah" },
  { name: "Child First Policy Center" },
  { name: "Oregon’s Kitchen Table" },
  { name: "Central Oregon Community College" },
  { name: "Central Oregon Intergovernmental Council" },
  { name: "Citizens for Community" },
  { name: "Citizens Track on AI" },
  { name: "ISWE" },
  { name: "Metagov" },
  { name: "CrownShy" },
];

export default function Partners() {
  if (!SHOW_PARTNERS) return null;
  return (
    <section id="partners" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="max-w-2xl">
          <Eyebrow>Partners</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-bloom-500 sm:text-5xl">
            Built with partners in every community.
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-maroon-900/80">
            Local organizations, coalitions and technology partners we work alongside.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map(({ name, logo }) => (
            <li
              key={name}
              className="flex aspect-[3/2] items-center justify-center rounded-2xl border border-blush-200 bg-white p-5 text-center"
            >
              {logo ? (
                <img src={assetHref(logo)} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
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
