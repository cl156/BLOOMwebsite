/**
 * One quote at a time, large enough to read, with arrows, dots, keyboard and swipe.
 * All quotes sit in the same grid cell, so the block keeps the height of the longest one
 * and nothing around it jumps when the quote changes. No autoplay: readers move at their own pace.
 */
import { useRef, useState } from "react";

export type CarouselQuote = { text: string; by: string };

export default function QuoteCarousel({ quotes, label }: { quotes: CarouselQuote[]; label: string }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (i: number) => setIndex((i + quotes.length) % quotes.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
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
          onClick={() => go(index - 1)}
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
