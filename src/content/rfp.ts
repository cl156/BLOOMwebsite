/**
 * The 2027 Founding Civic Hosts call (RFP), in one place.
 *
 * Dates, dollar amounts and the application link live here so /cohort/ and the
 * homepage teasers stay in sync. Keep this matched to the RFP slide deck
 * (RFP_PDF) when either changes.
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

/** In local preview only (npm run dev), ?rfp=upcoming|open|closed shows the page as it will look on those dates. */
function previewOverride(): RfpStatus | null {
  if (!import.meta.env.DEV || typeof window === "undefined") return null;
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

export const FUNDING = {
  core: { short: "$10–30k", full: "$10,000–$30,000" },
  coDesign: { short: "$50–60k", full: "$50,000–$60,000" },
};

export const PILOT_STATS = [
  { value: "~1,000", label: "people engaged across our 2026 pilots" },
  { value: "6", label: "counties, in Utah and Central Oregon" },
  { value: "70+", label: "delegates across civic assemblies in Utah and Central Oregon" },
];

export const MODEL_LEGS = [
  { name: "Organizing", body: "Building relationships and coalitions for civic power." },
  { name: "Deliberation", body: "Good information, cross-difference dialogue, and supermajority priorities." },
  { name: "Tech", body: "Links public deliberations across places and creates scale." },
];

/** Local community assemblies vs. state and national civic assemblies. */
export const ASSEMBLY_TYPES = [
  {
    scope: "Local",
    name: "Community Assembly",
    rows: [
      ["Who takes part", "Anyone in the community, recruited across differences"],
      ["How long", "10–12 weeks (core arc) to six months (co-design)"],
      ["What it produces", "Public judgment for local decision-makers, and state asks"],
    ],
  },
  {
    scope: "State & national",
    name: "Civic Assembly",
    rows: [
      ["Who takes part", "Delegates chosen by civic lottery, paid for their time"],
      ["How long", "Multi-day, around a specific charge"],
      ["What it produces", "Recommendations to legislatures and governors"],
    ],
  },
];

export const HOST_SCOPES = [
  {
    id: "core",
    name: "Civic host, core",
    funding: FUNDING.core.full,
    length: "10–12 weeks",
    hours: "~120 hours, led by one to two people",
    summary:
      "You are rooted in a town, county, or constituency and can reach most of it. Over 10–12 weeks you bring your community’s voice into the state process, surfacing common-ground solutions you can act on locally and priorities that need state or national action.",
    stepsLabel: "The playbook",
    steps: [
      { name: "One-to-ones", body: "Conversations that bring local leaders into the inquiry on your chosen AI issue." },
      {
        name: "Community forums",
        body: "30–50 residents meet to sort out local priorities, name local actions, and flag what needs state action.",
      },
      {
        name: "Open poll",
        body: "Engage hundreds of residents to create a map of the opinion landscape on local questions, with reporting and analysis built in.",
      },
      {
        name: "Synthesis",
        body: "You report what your community concluded and what needs state action. Your hub and BLOOM synthesize across sites and bring it back to hosts, revealing shared challenges that could benefit from deliberation at the state or national level.",
      },
    ],
  },
  {
    id: "co-design",
    name: "Civic host, co-design",
    funding: FUNDING.coDesign.full,
    length: "February–July 2027",
    hours: "Up to three sites selected",
    summary:
      "You engage a larger-scale public with a live local decision and a named decision-maker. Over six months you run a full community assembly, from agenda setting to recommendations your community ratifies, with support to put them in front of decision-makers.",
    // The full five-phase arc is shown in CO_DESIGN_ARC below the cards.
    stepsLabel: "",
    steps: [],
  },
];

export const HOST_SCOPES_INTRO =
  "The 2027 cohort brings together two types of hosts. Most will be core hosts, running a 10–12 week arc. Up to three co-design hosts, each with a live local decision and a named decision-maker, will run a full six-month community assembly.";

/** The co-design arc: five phases, the layers that run across them, and what it produces. */
export const CO_DESIGN_ARC = {
  phases: [
    {
      name: "Agenda setting",
      sub: "The core arc",
      items: ["One-to-ones", "Grasstops cafe", "House meetings", "Open poll", "Sense-making"],
    },
    { name: "Goal setting", sub: "Values and goals", items: ["Cafe round", "Poll round", "Shared goals statement"] },
    { name: "Idea development", sub: "Draft options", items: ["Research inputs", "Working group drafts", "3–5 hour sessions"] },
    { name: "Tradeoffs", sub: "Explore and weigh", items: ["3–5 hour sessions", "Poll round", "Tradeoffs map"] },
    {
      name: "Decision making",
      sub: "Decide and ratify",
      items: ["Iterative drafting", "Convergent polls", "Supermajority tests", "Ratification poll"],
    },
  ],
  /** Phase numbers are 1-based and inclusive. */
  layers: [
    {
      from: 2,
      to: 5,
      style: "steering",
      label: "Local steering committee",
      body: "Chooses the issues and lends the process legitimacy",
    },
    {
      from: 3,
      to: 5,
      style: "pilot",
      label: "Topic working groups",
      body: "Draft between sessions (being piloted)",
    },
    {
      from: 1,
      to: 5,
      style: "organizing",
      label: "Organizing",
      body: "Turnout commitments, emerging leaders, an action team, ratification turnout",
    },
    {
      from: 1,
      to: 5,
      style: "hub",
      label: "Hub support",
      body: "Close in agenda setting, handed over phase by phase",
    },
  ],
  outputs: [
    { phase: 4, name: "Tradeoffs map", body: "Input to a state assembly" },
    { phase: 5, name: "Ratified decisions", body: "Local and state levers" },
  ],
  checkpoint: "Checkpoint between phases: have we learned enough to move on, or does another question need a different mode?",
};

export const FUNDING_NOTE =
  "Amounts are set in co-design by the scale of your public, the number of co-hosts, and travel. Grants cover staff time, venue and food, translation and interpretation, and local outreach. BLOOM makes host grants directly, including in hub states.";

export const HOSTS_RECEIVE = [
  { name: "Method", body: "A playbook built from our pilots in Utah and Oregon, refined with and for this cohort." },
  { name: "Platform", body: "CivicOS, BLOOM’s open-source deliberation suite, free to use. Your contact list stays yours." },
  { name: "Training", body: "Facilitation and organizing, plus coaching, through your hub or BLOOM." },
  {
    name: "Synthesis",
    body: "Tools to synthesize what people say across every level of discussion, and to present it clearly to the people you are trying to reach.",
  },
  { name: "A peer cohort", body: "A national network of hosts on the same timeline, plus a state cluster where there is a hub." },
];

export const HUB_PROVIDES = [
  { name: "Coaching", body: "Help shaping your arc in co-design, then coaching that tapers as you take the lead." },
  {
    name: "A shared question",
    body: "Set with you and the other hosts in your state, so your community’s voice connects to theirs.",
  },
  {
    name: "State synthesis",
    body: "Your findings combined with other hosts’ to show where people agree and what needs state action.",
  },
  { name: "Steering committee", body: "Cross-partisan state leaders who set the assembly’s charge, with seats for hosts." },
  {
    name: "Impact table",
    body: "Advocacy partners who carry what your community ratifies to state leaders, engaging only after ratification.",
  },
  {
    name: "Ecosystem table",
    body: "Practitioners, media, and allied networks that extend your reach and backfill facilitation.",
  },
];

export const HUB_NOTE =
  "State or regional civic hubs coach your team, set shared questions with hosts in their area, and support carrying what your community concludes to state decision-makers. Where a state or region has no hub yet, BLOOM plays this role.";

export const IMPACT = [
  {
    name: "Institutional & policy",
    body: "Every host identifies decision-makers and decisions on a timeline: a county commission vote, a district’s classroom policy, an employer’s deployment plan, a state bill. What the community concludes is delivered to that body publicly, carried by the organized constituency hosts build and by advocacy partners.",
  },
  {
    name: "Citizen and civil society action",
    body: "Much of what a community decides it wants needs no official’s permission: a union bargaining over workplace monitoring, a parent council adopting school guidance, a library running AI literacy sessions. We help you track and report this on equal footing with policy change.",
  },
  {
    name: "Self-efficacy and personal development",
    body: "Participants leave with the experience of being heard, practice in deliberation and facilitation, and relationships with neighbors they would not otherwise have met. The bench of hosts and co-hosts you build tends to outlast the arc and becomes lasting local civic capacity.",
  },
];

export const WHERE_HOSTS_WORK = [
  "A civic host is a local organization with the relationships to convene across divides in its community. Hosts have deep roots in a place and a community of people: a county, a town, or a constituency. We consider each of these communities a public.",
  "Ideal partners are rooted in publics where something clear is at stake: ideally a decision about AI that a nameable body will make on a nameable timeline.",
  "Central Oregon is a public. Southwestern Pennsylvania is a public. So is the Denver metropolitan area, or a coalition of faith communities spread across Utah. Statewide organizations can propose a single region as a host site.",
];

export const TOPICS = [
  "Data centers & AI infrastructure",
  "Jobs and workforce",
  "AI in K–12 and higher education",
  "Surveillance and privacy",
];

export const INFLUENCE =
  "We help you identify which decision-makers and which decisions your assembly can influence. Depending on location and issue, that could be a county commission or city council, a school board, a state legislature, a mayor or governor, or a major employer.";

export const CRITERIA = [
  {
    name: "Existing relationships and convening capacity",
    body: "Enough standing with enough different people to convene partners: faith, labor, youth and education, small business, neighborhood and civic, or whoever the real constituencies are where you are.",
  },
  {
    name: "A commitment to build collaborative politics",
    body: "Drawn to finding out what people think through deliberation, rather than confirming what you already believe.",
  },
  {
    name: "Organizing or policy capacity",
    body: "We bring what we can on synthesis and reporting, and help identify pathways to political impact. Hosts who know local decision-makers and can turn people out through their networks will likely be more successful.",
  },
  {
    name: "Willingness to share feedback openly",
    body: "We need both excitement about the possibilities and a willingness to point out what isn’t working.",
  },
];

export const CRITERIA_NOTE =
  "Relationships across difference matter most. Organizations and coalitions of any size are welcome, as are fiscally sponsored organizations.";

export const TIMELINE = [
  { when: "Oct 15, 2026", what: "Applications open" },
  { when: "Nov 20, 2026", what: "Applications close" },
  { when: "Dec 2026", what: "Interviews" },
  { when: "Jan 15, 2027", what: "Hosts notified" },
  { when: "Feb–Jul 2027", what: "Community assembly arc" },
  { when: "First half 2028", what: "National assembly on AI" },
];

export const SELECTION_NOTES = [
  {
    name: "Selection process",
    body: "The application takes about an hour. Short-listed finalists are invited to interviews in December. Being invited is not a guarantee of selection.",
  },
  {
    name: "The arc",
    body: "Hosts are notified by January 15. Core hosts run 10–12 week arcs between February and July 2027, with staggered starts; co-design hosts run across the full window. Together, this network will have the opportunity to commission state or national assemblies on AI in 2028.",
  },
];
