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
/** The same form, embedded at the bottom of /cohort/ while applications are open. */
export const APPLY_EMBED_URL = "https://airtable.com/embed/appWfFclW2rKc7Ot1/pagikLlEpAcW0r6ZY/form";

export const CONTACT_EMAIL = "hello@bloom-project.org";

/** The RFP slide deck as a PDF in public/, e.g. "rfp/founding-civic-hosts-rfp.pdf". The download link shows once this is set and applications have opened. */
export const RFP_PDF = "rfp/founding-civic-hosts-rfp.pdf";

/** Pacific time (Oct 15 is daylight time, UTC−7). Before OPENS the site shows "Get notified"; after CLOSES it says applications are closed. Applications open at 2:00 PM PT. */
export const OPENS = new Date("2026-10-15T14:00:00-07:00");
export const CLOSES = new Date("2026-11-20T23:59:59-08:00");
export const OPENS_LABEL = "October 15, 2026, at 2:00 PM PT";
/** Used on the day applications open, e.g. "today, October 15, at 2:00 PM PT". */
export const OPENS_TODAY_LABEL = "today, October 15, at 2:00 PM PT";
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

/** Zoom registration for the "Call for Civic Hosts Info Session | Public Assembly on AI". */
export const INFO_SESSION_URL = "https://us02web.zoom.us/meeting/register/E6q9UVGJQx-UnN02WG5wuA";
/**
 * When the info session ends (Oct 22, 2026, 10:00 AM PT, allowing an hour). Registration links hide
 * after this. The date shown on the page is infoSession.when in content/cohort.json.
 */
export const INFO_SESSION_ENDS = new Date("2026-10-22T11:00:00-07:00");

export function infoSessionUpcoming(now = new Date()) {
  return Boolean(INFO_SESSION_URL) && now < INFO_SESSION_ENDS && rfpStatus(now) !== "closed";
}

/**
 * Draft sections that stay hidden unless the link asks for them, e.g. /cohort/?preview=moment.
 * Several can be combined: ?preview=moment,other
 */
export function previewEnabled(name: string) {
  if (typeof window === "undefined") return false;
  const v = new URLSearchParams(window.location.search).get("preview");
  return Boolean(v && v.split(",").includes(name));
}
