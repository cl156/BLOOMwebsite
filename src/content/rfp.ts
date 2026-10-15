/**
 * The 2027 Civic Hosts call (RFP): dates, links and the open/close logic, shared by
 * /cohort/ and the homepage teasers.
 *
 * The cohort page's wording (including the timeline dates and funding amounts shown on
 * the page) lives in content/cohort.json. If you change OPENS or CLOSES here, update the
 * timeline there too, and keep both matched to the RFP slide deck (RFP_PDF).
 */

/** Airtable application form. Opens in a new tab. */
export const APPLY_URL = "https://airtable.com/appWfFclW2rKc7Ot1/pagikLlEpAcW0r6ZY/form";

export const CONTACT_EMAIL = "hello@bloom-project.org";

/** The RFP slide deck as a PDF in public/, e.g. "rfp/founding-civic-hosts-rfp.pdf". The download link shows once this is set and applications have opened. */
export const RFP_PDF = "rfp/founding-civic-hosts-rfp.pdf";

/** Pacific time. Before OPENS the site shows "Get notified"; after CLOSES it says applications are closed. */
export const OPENS = new Date("2026-10-15T00:00:00-07:00");
export const CLOSES = new Date("2026-11-20T23:59:59-08:00");
export const OPENS_LABEL = "October 15, 2026";
export const CLOSES_LABEL = "November 20, 2026";

export type RfpStatus = "upcoming" | "open" | "closed";

/**
 * ?rfp=upcoming|open|closed shows the page as it will look on those dates, locally and on the live
 * site (for sharing previews with the team). It only changes which buttons show; the form and PDF are public anyway.
 */
function previewOverride(): RfpStatus | null {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("rfp");
  return v === "upcoming" || v === "open" || v === "closed" ? v : null;
}

export function rfpStatus(now = new Date()): RfpStatus {
  const override = previewOverride();
  if (override) return override;
  if (now < OPENS) return "upcoming";
  if (now > CLOSES) return "closed";
  return "open";
}

/** State or regional civic hubs inquire by email rather than applying. */
export const HUB_INQUIRY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=State%20or%20regional%20civic%20hub%20(2027%20Cohort)`;

/** Zoom registration for the "Call for Civic Hosts Info Session | Public Assembly on AI". Hidden once applications close. */
export const INFO_SESSION_URL = "https://us02web.zoom.us/meeting/register/E6q9UVGJQx-UnN02WG5wuA";
