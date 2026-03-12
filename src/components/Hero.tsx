import { useState, useEffect } from "react";

/**
 * Hero Section — bold, centered, tech-forward.
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
      {/* Faint grid pattern background for tech feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6B2A3D 1px, transparent 1px), linear-gradient(to bottom, #6B2A3D 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-20 text-center md:pb-28 md:pt-28 lg:px-8">
        <p className="mb-5 inline-block rounded-md border border-bloom-200 bg-bloom-50/60 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-bloom-600">
          Open infrastructure for public problem-solving
        </p>

        <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-maroon-700 sm:text-6xl lg:text-7xl">
          From common ground
          <br />
          <span className="text-bloom-500">
            to shared{" "}
            <span
              className={`inline-block transition-all duration-300 ${
                fading
                  ? "translate-y-2 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl">
          BLOOM equips communities to learn together, deliberate across
          differences, find durable common ground, and coordinate
          action&nbsp;&mdash; locally and across places.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#conversations"
            className="rounded-lg bg-bloom-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-bloom-600 hover:shadow-md"
          >
            Join a conversation
          </a>
          <a
            href="#for-civic-hosts"
            className="rounded-lg border border-bloom-300 bg-white px-7 py-3 text-base font-semibold text-bloom-600 transition-all hover:bg-bloom-50"
          >
            Become a Civic Host
          </a>
          <a
            href="#how-it-works"
            className="rounded-lg border border-gray-200 bg-white px-7 py-3 text-base font-semibold text-maroon-700 transition-all hover:border-bloom-300 hover:bg-gray-50"
          >
            Learn how it works
          </a>
        </div>

        <p className="mt-5 font-mono text-xs text-gray-400">
          Now live in Central Oregon &amp; Utah&nbsp;&mdash; more regions coming soon.
        </p>
      </div>
    </section>
  );
}
