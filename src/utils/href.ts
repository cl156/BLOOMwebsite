/**
 * Base-aware links, so the same URLs work on bloom-project.org ("/")
 * and on the fork's staging path ("/BLOOMwebsite/"), and from any page.
 */
const BASE = import.meta.env.BASE_URL;

/** A homepage section, e.g. sectionHref("work") → "/#work" */
export const sectionHref = (id: string) => `${BASE}#${id}`;

/** Another page, e.g. pageHref("news") → "/news/", pageHref("news", "utah") → "/news/#utah" */
export const pageHref = (page: string, anchor?: string) =>
  `${BASE}${page}/${anchor ? `#${anchor}` : ""}`;

/** A file in public/, e.g. assetHref("team/clara.jpeg") */
export const assetHref = (file: string) => `${BASE}${file.replace(/^\//, "")}`;
