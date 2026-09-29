import { useEffect, useState } from "react";
import { FormButton } from "./CohortForm";
import { Pill } from "./ui";
import { SHOW_PARTNERS } from "./Partners";
import { sectionHref, pageHref, assetHref } from "../utils/href";

const LINKEDIN_URL = "https://www.linkedin.com/company/bloom-project-ai/";

const NAV_LINKS = [
  { label: "Vision", href: sectionHref("vision") },
  { label: "Our work", href: sectionHref("work") },
  { label: "What we do", href: sectionHref("what-we-do") },
  { label: "Approach", href: sectionHref("approach") },
  // Partners appears in the nav wherever the section is shown (staging only for now)
  ...(SHOW_PARTNERS ? [{ label: "Partners", href: sectionHref("partners") }] : []),
  { label: "People", href: pageHref("people") },
  { label: "2027 Cohort", href: pageHref("cohort") },
  { label: "News", href: pageHref("news") },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-cream/85 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <a href={sectionHref("top")} className="shrink-0" aria-label="BLOOM Project home">
          <img src={assetHref("bloom-logo-header.png")} alt="BLOOM Project" className="h-10 w-auto sm:h-12" />
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="whitespace-nowrap text-sm text-maroon-900/75 transition-colors hover:text-bloom-600">
              {label}
            </a>
          ))}
          <Pill href={LINKEDIN_URL} external className="!px-5 !py-2">
            Get updates
          </Pill>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full p-2 text-maroon-900 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            {menuOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="mx-auto max-w-7xl px-5 pb-6 lg:px-10 xl:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4 border-t border-blush-200 pt-5">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} onClick={() => setMenuOpen(false)} className="font-display text-xl text-maroon-900 hover:text-bloom-600">
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <FormButton kind="notify">Get notified about the 2027 Cohort</FormButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Thin arrow fixed bottom-left that fills as the page scrolls. */
export function ScrollArrow() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 left-5 z-40 hidden flex-col items-center min-[1440px]:flex"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="relative h-16 w-px bg-bloom-200">
        <div className="absolute inset-x-0 top-0 bg-bloom-500" style={{ height: `${progress * 100}%` }} />
      </div>
      <svg viewBox="0 0 10 6" className="-mt-px h-2 w-3 text-bloom-300">
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
