/**
 * Arriving from another page with a link like "/#team" or "/news/#utah-solutions-forum":
 * the browser tries to jump before React has rendered the section, finds nothing, and
 * stays at the top. Call this right after rendering to jump once the section exists,
 * then re-align after fonts and images settle, unless the visitor has started scrolling.
 */
export function scrollToHashAfterRender() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;

  let userMoved = false;
  const stop = () => (userMoved = true);
  const events = ["wheel", "touchstart", "keydown"] as const;
  events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));

  const jump = () => {
    if (userMoved) return;
    // "instant" overrides the site-wide smooth scrolling, so arrival is a jump, not a long glide
    document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  };

  requestAnimationFrame(() => requestAnimationFrame(jump));
  document.fonts?.ready.then(jump);
  window.addEventListener("load", jump, { once: true });
}
