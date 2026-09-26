import { pageHref, sectionHref, assetHref } from "../utils/href";

export default function Footer() {
  return (
    <footer className="border-t border-blush-200 bg-cream pb-14">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <p className="font-display text-2xl leading-snug text-maroon-900 sm:text-3xl">
          Press, partnerships or funding?{" "}
          <a href="mailto:hello@bloom-project.org" className="text-bloom-500 underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600">
            hello@bloom-project.org
          </a>
        </p>
      </div>
      <div className="mx-auto flex max-w-7xl border-t border-blush-200 pt-12 flex-col gap-10 px-5 md:flex-row md:items-end md:justify-between lg:px-10">
        <div className="max-w-sm">
          <a href={sectionHref("top")} aria-label="BLOOM home">
            <img src={assetHref("bloom-logo-header.png")} alt="BLOOM Project" className="h-11 w-auto" />
          </a>
          <p className="mt-4 text-sm text-maroon-900/70">
            Helping communities stand up Public Assemblies on AI.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-maroon-900/70 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            <a href={pageHref("cohort")} className="hover:text-bloom-600">2027 Cohort</a>
            <a href={pageHref("news")} className="hover:text-bloom-600">News</a>
            <a href="mailto:hello@bloom-project.org" className="hover:text-bloom-600">Contact us</a>
            <a href="https://www.linkedin.com/company/bloom-project-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-bloom-600">
              LinkedIn
            </a>
            <a
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=ba402bb7-5499-4b37-860b-bbb507d3c3c1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bloom-600"
            >
              Privacy
            </a>
            <a
              href="https://app.termly.io/policy-viewer/policy.html?policyUUID=4f85478f-bc07-46b7-a67b-e9f11de4b279"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bloom-600"
            >
              Terms
            </a>
          </nav>
          <p className="text-xs text-maroon-900/50">&copy; {new Date().getFullYear()} BLOOM Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
