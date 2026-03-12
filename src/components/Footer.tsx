import BloomLogo from "./BloomLogo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center lg:px-8">
        <BloomLogo />

        <p className="max-w-md text-sm text-gray-500">
          Public infrastructure for democratic co-governance.
        </p>
        <p className="text-sm text-gray-400">
          BLOOM is a project of{" "}
          <a
            href="https://www.americanpublictrust.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-700 underline decoration-maroon-200 underline-offset-2 transition-colors hover:text-bloom-600"
          >
            American Public Trust
          </a>
          .
        </p>

        <nav className="flex gap-6 font-mono text-xs text-gray-400">
          <a href="mailto:hello@bloom-project.org" className="transition-colors hover:text-maroon-700">
            Contact
          </a>
          <a href="#" className="transition-colors hover:text-maroon-700">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-maroon-700">
            Terms
          </a>
        </nav>

        <p className="font-mono text-xs text-gray-300">
          &copy; {new Date().getFullYear()} BLOOM Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
