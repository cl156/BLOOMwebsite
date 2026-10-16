import { assetHref } from "../utils/href";

/** From the Utah Solutions Forum preliminary report (updated Sept. 28, 2026), with the share of delegates who backed each. */
export const UTAH_RECOMMENDATIONS: { area: string; text: string; pct: number }[] = [
  { area: "Information and participation", text: "A dedicated statewide AI information hub", pct: 95 },
  { area: "Information and participation", text: "A centralized citizen engagement portal", pct: 84 },
  { area: "Information and participation", text: "AI literacy programs through community libraries", pct: 95 },
  { area: "Information and participation", text: "A public awareness campaign pointing people to these resources", pct: 82 },
  { area: "Data centers", text: "Hyperscale data centers voted on by city councils and county commissions", pct: 89 },
  { area: "Data centers", text: "State permits and independent environmental and economic impact analyses", pct: 92 },
  { area: "Data centers", text: "Consistent statewide standards for data centers and public AI tools", pct: 92 },
  { area: "Accountability", text: "Recusal for public officials with a conflict of interest", pct: 92 },
  { area: "Accountability", text: "Limits on nondisclosure agreements that shield public interest or safety", pct: 95 },
  { area: "Accountability", text: "An AI consumer complaint and transparency initiative", pct: 97 },
];

/** The preliminary recommendations report (PDF), hosted on the site. */
export const UTAH_REPORT_URL = assetHref("reports/utah-solutions-forum-preliminary-report.pdf");
export const UTAH_FORUM_URL = "https://forum.utahcommonground.org/";
