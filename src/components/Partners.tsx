/**
 * Partners: logo wall on the homepage.
 *
 * Staging only for now (partners are confirming they're happy to be listed): it shows in local dev and
 * on the fork's staging build, where the deploy sets VITE_SHOW_PARTNERS=true, and is hidden on
 * bloom-project.org. Remove the SHOW_PARTNERS check to publish.
 *
 * To add a logo: put the file in public/partners/ and set `logo` below. Partners without one show their name.
 */
import { useState } from "react";
import { Eyebrow } from "./ui";
import { INSTITUTION } from "../content/terms";
import { assetHref } from "../utils/href";

export const SHOW_PARTNERS = import.meta.env.DEV || import.meta.env.VITE_SHOW_PARTNERS === "true";

const PARTNERS: { name: string; logo?: string }[] = [
  { name: "Utah Common Ground", logo: "partners/utah-common-ground.png" },
  { name: "Mormon Women for Ethical Government", logo: "partners/mweg.png" }, // small source (157px); swap for a larger file when available
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

/** Size each logo by area rather than width, so wide wordmarks and square marks carry similar weight. */
const LOGO_AREA = 8600;
const MAX_W = 220;
const MAX_H = 96;

function Logo({ src, name }: { src: string; name: string }) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  return (
    <img
      src={assetHref(src)}
      alt={name}
      loading="lazy"
      onLoad={(e) => {
        const ratio = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight;
        let width = Math.min(MAX_W, Math.sqrt(LOGO_AREA * ratio));
        let height = width / ratio;
        if (height > MAX_H) {
          height = MAX_H;
          width = height * ratio;
        }
        setSize({ width: Math.round(width), height: Math.round(height) });
      }}
      style={size ?? { maxHeight: MAX_H, maxWidth: MAX_W }}
      className="max-w-full object-contain"
    />
  );
}

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

        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 border-t border-blush-200 pt-14 sm:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map(({ name, logo }) => (
            <li key={name} className="flex h-24 items-center justify-center text-center">
              {logo ? (
                <Logo src={logo} name={name} />
              ) : (
                <span className="max-w-[14rem] font-display text-lg leading-snug text-maroon-900/80">{name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
