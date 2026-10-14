/**
 * 2027 Cohort sign-up.
 *
 * Submissions go straight into BLOOM's Airtable CRM through Airtable's own
 * shared-form embeds, so no API key ever ships to the browser. Paste the
 * share URLs (Airtable → form view → Share form) below. Until they're set,
 * the buttons fall back to email.
 *
 * The application is an Airtable interface form (…/pag…/form), which can't be
 * embedded in the modal, so "apply" always opens it in a new tab. Its URL and
 * the open/close dates live in content/rfp.ts.
 */
import { useEffect, useState } from "react";
import { Pill } from "./ui";
import { pageHref } from "../utils/href";
import { APPLY_URL, CLOSES_LABEL, OPENS_LABEL, rfpStatus } from "../content/rfp";

const AIRTABLE_NOTIFY_URL = ""; // Leave empty: "Get notified" buttons go to the Get updates page, whose form has a Civic Host checkbox

export type FormKind = "apply" | "notify";

const FORMS: Record<FormKind, { url: string; title: string; mailto: string }> = {
  apply: {
    url: "",
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
  if (kind === "apply") {
    return (
      <Pill href={APPLY_URL} external variant={variant} className={className}>
        {children}
      </Pill>
    );
  }
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
  if (kind === "apply") {
    return (
      <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  if (!form.url) return <a href={form.mailto} className={cls}>{children}</a>;
  return (
    <button type="button" className={cls} onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: kind }))}>
      {children}
    </button>
  );
}

/**
 * The cohort call to action, switched by date: "Get notified" until applications
 * open, "Apply" while they're open, and "Get notified" again once they close.
 */
export function CohortCTA({ variant = "primary", className = "" }: { variant?: "primary" | "soft"; className?: string }) {
  const status = rfpStatus();
  if (status === "open") {
    return (
      <FormButton kind="apply" variant={variant} className={className}>
        Apply to be a Civic Host
      </FormButton>
    );
  }
  return (
    <FormButton kind="notify" variant={variant} className={className}>
      Get notified about the 2027 Cohort
    </FormButton>
  );
}

/** One line on where the call stands, e.g. "Applications open October 15, 2026". */
export function cohortStatusLine() {
  const status = rfpStatus();
  if (status === "upcoming") return `Applications open ${OPENS_LABEL}`;
  if (status === "open") return `Applications open · due ${CLOSES_LABEL}`;
  return "Applications for the 2027 Cohort are closed";
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
