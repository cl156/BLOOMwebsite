/**
 * One quote at a time, large enough to read, with arrows, dots, keyboard and swipe.
 * All quotes sit in the same grid cell, so the card keeps the height of the longest one
 * and nothing below it jumps when the quote changes. No autoplay: readers move at their own pace.
 */
import { useRef, useState } from "react";

export default function QuoteCarousel({ quotes, by }: { quotes: string[]; by: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (i: number) => setIndex((i + quotes.length) % quotes.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="What delegates said"
      className="rounded-3xl bg-white px-6 py-10 shadow-soft sm:px-14 sm:py-14"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="grid" aria-live="polite">
        {quotes.map((q, i) => (
          <figure
            key={q}
            aria-hidden={i !== index}
            className={`col-start-1 row-start-1 mx-auto max-w-3xl self-center text-center transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <blockquote className="font-display text-2xl leading-snug text-maroon-900 sm:text-3xl">
              &ldquo;{q}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-bloom-500">{by}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous quote"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-bloom-600 transition-colors hover:bg-blush-200"
        >
          &larr;
        </button>
        <div className="flex gap-2">
          {quotes.map((q, i) => (
            <button
              key={q}
              type="button"
              onClick={() => go(i)}
              aria-label={`Quote ${i + 1} of ${quotes.length}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-bloom-500" : "w-2.5 bg-blush-200 hover:bg-bloom-300"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next quote"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-100 text-bloom-600 transition-colors hover:bg-blush-200"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}
