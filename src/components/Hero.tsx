import { useState, useEffect } from "react";

/**
 * Hero Section — bold, centered, clean background.
 *
 * The second line rotates through words every 3 seconds
 * with a fade transition.
 */

const ROTATING_WORDS = ["futures", "prosperity", "understandings", "ideas", "solutions"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-white">
      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:pb-20 sm:pt-20 md:pb-28 md:pt-28 lg:px-8">
        <p className="mb-5 inline-block rounded-md border border-bloom-200 bg-bloom-50/60 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-bloom-600 sm:text-xs">
          Open infrastructure for public problem-solving
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-maroon-700 sm:text-5xl md:text-6xl lg:text-7xl">
          From common ground
          <br />
          <span className="text-bloom-500">
            to shared{" "}
            <span className="relative inline-block w-[5.5em] text-left align-baseline">
              <span
                className={`inline-block transition-all duration-300 ${
                  fading
                    ? "translate-y-2 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {ROTATING_WORDS[wordIndex]}.
              </span>
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg md:text-xl">
          BLOOM equips communities to learn together, deliberate across
          differences, find durable common ground, and coordinate
          action&nbsp;&mdash; locally and across places.
        </p>

        {/* CTAs — two prominent buttons, stack on mobile */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="#conversations"
            className="w-full rounded-lg bg-bloom-500 px-8 py-3.5 text-center text-base font-semibold text-white shadow-sm transition-all hover:bg-bloom-600 hover:shadow-md sm:w-auto"
          >
            Join a conversation
          </a>
          <a
            href="#for-civic-hosts"
            className="w-full rounded-lg bg-maroon-700 px-8 py-3.5 text-center text-base font-semibold text-white shadow-sm transition-all hover:bg-maroon-800 hover:shadow-md sm:w-auto"
          >
            Host a conversation
          </a>
        </div>

        <p className="mt-4 font-mono text-[10px] text-gray-400 sm:mt-5 sm:text-xs">
          Now live in Central Oregon &amp; Utah&nbsp;&mdash; more regions coming soon.
        </p>
      </div>
    </section>
  );
}
