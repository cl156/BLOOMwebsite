/**
 * One quote at a time, large enough to read, with arrows, dots, keyboard and swipe.
 * All quotes sit in the same grid cell, so the block keeps the height of the longest one
 * and nothing around it jumps when the quote changes.
 *
 * It advances on its own, gently:
 *   - each quote stays up for 7–12 seconds depending on its length
 *   - it holds while the pointer is over it, while it has keyboard focus, and while it's off-screen
 *   - the first click, swipe or arrow key stops it for good (the pause button can restart it)
 *   - it starts paused for people who've asked their device for reduced motion
 */
import { useEffect, useRef, useState } from "react";

export type CarouselQuote = { text: string; by: string };

const dwellMs = (text: string) => Math.min(12000, Math.max(7000, 5000 + text.length * 40));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function QuoteCarousel({ quotes, label }: { quotes: CarouselQuote[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setIndex((i + quotes.length) % quotes.length);
  /** Any deliberate navigation hands control to the reader. */
  const goByHand = (i: number) => {
    setPlaying(false);
    go(i);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return setInView(true);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const advancing = playing && !hovered && !focused && inView;
  useEffect(() => {
    if (!advancing) return;
    const t = window.setTimeout(() => go(index + 1), dwellMs(quotes[index].text));
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advancing, index]);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goByHand(index - 1);
        if (e.key === "ArrowRight") goByHand(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) goByHand(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Announce changes only when the reader caused them, not on every automatic turn. */}
      <div className="grid" aria-live={playing ? "off" : "polite"}>
        {quotes.map((q, i) => (
          <figure
            key={q.text}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 self-start transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <blockquote className="font-display text-2xl leading-snug text-bloom-500 sm:text-3xl">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-xs font-medium tracking-wide text-maroon-900/70">&mdash; {q.by}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          type="button"
          onClick={() => goByHand(index - 1)}
          aria-label="Previous quote"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-bloom-600 transition-colors hover:bg-blush-200"
        >
          &larr;
        </button>
        <div className="flex gap-2">
          {quotes.map((q, i) => (
            <button
              key={q.text}
              type="button"
              onClick={() => goByHand(i)}
              aria-label={`Quote ${i + 1} of ${quotes.length}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-bloom-500" : "w-2.5 bg-blush-200 hover:bg-bloom-300"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goByHand(index + 1)}
          aria-label="Next quote"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-bloom-600 transition-colors hover:bg-blush-200"
        >
          &rarr;
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause quotes" : "Play quotes"}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-maroon-900/50 transition-colors hover:bg-blush-100 hover:text-bloom-600"
        >
          {playing ? (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11a.75.75 0 0 0 1.14.64l9-5.5a.75.75 0 0 0 0-1.28l-9-5.5A.75.75 0 0 0 4 2.5z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
