/**
 * 2027 Cohort sign-up.
 *
 * Submissions go straight into BLOOM's Airtable CRM through Airtable's own
 * shared-form embeds, so no API key ever ships to the browser. Paste the
 * share URLs (Airtable → form view → Share form) below. Until they're set,
 * the buttons fall back to email.
 */
import { useEffect, useState } from "react";
import { Pill } from "./ui";
import { pageHref } from "../utils/href";

const AIRTABLE_APPLY_URL = ""; // e.g. "https://airtable.com/appXXXX/shrXXXX"
const AIRTABLE_NOTIFY_URL = ""; // Leave empty: "Get notified" buttons go to the Get updates page, whose form has a Civic Host checkbox

export type FormKind = "apply" | "notify";

const FORMS: Record<FormKind, { url: string; title: string; mailto: string }> = {
  apply: {
    url: AIRTABLE_APPLY_URL,
    title: "Apply for the 2027 Cohort",
    mailto: "mailto:hello@bloom-project.org?subject=2027%20Cohort%20application",
  },
  notify: {
    url: AIRTABLE_NOTIFY_URL,
    title: "Get notified about the 2027 Cohort",
    mailto: pageHref("updates"),
  },
};

const OPEN_EVENT = "bloom:open-form";

/** Button or link that opens the right form (or email, if Airtable isn't wired up yet). */
export function FormButton({
  kind,
  variant = "primary",
  className = "",
  children,
}: {
  kind: FormKind;
  variant?: "primary" | "soft";
  className?: string;
  children: React.ReactNode;
}) {
  const form = FORMS[kind];
  if (!form.url) {
    return (
      <Pill href={form.mailto} variant={variant} className={className}>
        {children}
      </Pill>
    );
  }
  return (
    <Pill
      variant={variant}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: kind }))}
    >
      {children}
    </Pill>
  );
}

/** Plain text-link version, for "Or, join the BLOOM network…" lines. */
export function FormLink({ kind, className = "", children }: { kind: FormKind; className?: string; children: React.ReactNode }) {
  const form = FORMS[kind];
  const cls = `underline decoration-bloom-300 underline-offset-4 hover:text-bloom-600 ${className}`;
  if (!form.url) return <a href={form.mailto} className={cls}>{children}</a>;
  return (
    <button type="button" className={cls} onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: kind }))}>
      {children}
    </button>
  );
}

/** Mount once per page. Shows the Airtable form in a modal when a FormButton is clicked. */
export function CohortFormModal() {
  const [kind, setKind] = useState<FormKind | null>(null);

  useEffect(() => {
    const open = (e: Event) => setKind((e as CustomEvent<FormKind>).detail);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setKind(null);
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  if (!kind) return null;
  const form = FORMS[kind];
  const src = `${form.url.replace("/shr", "/embed/shr")}?backgroundColor=orange`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-maroon-900/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={form.title}
      onClick={() => setKind(null)}
    >
      <div className="relative h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-soft" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setKind(null)}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm text-maroon-900 shadow hover:bg-blush-100"
          aria-label="Close"
        >
          Close
        </button>
        <iframe title={form.title} src={src} className="h-full w-full border-0" />
      </div>
    </div>
  );
}
