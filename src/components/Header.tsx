import { useState } from "react";
import BloomLogo from "./BloomLogo";

const NAV_LINKS = [
  { label: "Conversations", href: "#conversations" },
  { label: "About", href: "#how-it-works" },
  { label: "Team", href: "#team" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
        <BloomLogo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-lg font-medium text-gray-600 transition-colors hover:text-maroon-700"
            >
              {label}
            </a>
          ))}
          <a
            href="#get-in-touch"
            className="rounded-lg bg-bloom-500 px-7 py-3 text-lg font-semibold text-white transition-colors hover:bg-bloom-600"
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-maroon-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-base font-medium text-gray-700 hover:text-maroon-700"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#get-in-touch"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-block rounded-lg bg-bloom-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-bloom-600"
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
