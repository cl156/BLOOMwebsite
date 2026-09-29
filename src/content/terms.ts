/**
 * BLOOM naming, in one place. Change a term here and it changes across the site,
 * including the page titles and link-preview text (vite.config.ts passes these to the HTML).
 *
 * The rule:
 *   - "the Public Assembly on AI" (singular, capitalized) is the institution BLOOM is building.
 *   - Individual convenings are lowercase "assemblies", or go by their proper names below.
 *   - "Civic Hosts" is always capitalized.
 */

/** The institution. Write "the {INSTITUTION}" in running text. */
export const INSTITUTION = "Public Assembly on AI";

/** Local partner organizations that run assemblies. */
export const HOST = "Civic Host";
export const HOSTS = "Civic Hosts";

/** Proper names of individual convenings. */
export const UTAH_FORUM = "Utah Solutions Forum";
export const OREGON_ASSEMBLY = "Central Oregon Assembly";
export const CACHE_FORUM = "Cache County community forum";

/** The national goal, lowercase as a description rather than a proper name. */
export const NATIONAL_GOAL = "a national civic assembly on AI in 2028";

/** Quote attributions, by where the quote was gathered. */
export const ATTRIBUTION = {
  cacheForum: `${CACHE_FORUM} participant, Utah`,
  utahForum: `${UTAH_FORUM} delegate`,
};

/** Browser titles (used in the HTML pages via vite.config.ts). */
export const SITE_TITLE = `BLOOM | Building the ${INSTITUTION}`;
