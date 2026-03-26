import { useState, useEffect, useCallback, useRef } from "react";
import MycelialCanvas from "./MycelialCanvas";

/**
 * Hero Section — bold, centered, clean background.
 *
 * The rotating word phases in from the background:
 * characters start invisible, emerge as scrambled glyphs
 * at low opacity, then resolve left-to-right into the
 * target word at full opacity — like pattern-matching.
 */

const ROTATING_WORDS = ["futures", "prosperity", "ideas", "solutions", "action"];

const GLYPHS = "abcdefghijklmnopqrstuvwxyz";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

interface CharState {
  char: string;
  opacity: number;
  resolved: boolean;
}

/**
 * Hook returning per-character state with opacity phasing.
 * Unresolved chars start near-invisible and gradually brighten
 * as the decode wave approaches. Resolved chars snap to full opacity.
 */
function usePhaseText(words: string[], intervalMs = 4500) {
  const [chars, setChars] = useState<CharState[]>(
    () => words[0].split("").map((c) => ({ char: c, opacity: 1, resolved: true }))
  );
  const [wordIndex, setWordIndex] = useState(0);
  const frameRef = useRef<number>(0);
  const resolvedRef = useRef(words[0].length);

  const scramble = useCallback((target: string, idx: number) => {
    resolvedRef.current = 0;
    setWordIndex(idx);
    const totalChars = target.length;
    const RESOLVE_EVERY = 10; // ~300ms per char at 30fps
    let tick = 0;

    const run = () => {
      tick++;
      if (tick % RESOLVE_EVERY === 0 && resolvedRef.current < totalChars) {
        resolvedRef.current++;
      }

      const resolved = resolvedRef.current;
      const progress = resolved / totalChars; // 0→1 overall progress

      const next: CharState[] = [];
      for (let i = 0; i < totalChars; i++) {
        if (i < resolved) {
          // Resolved: full opacity, real character
          next.push({ char: target[i], opacity: 1, resolved: true });
        } else {
          // Unresolved: opacity ramps up as decode wave approaches
          // Characters closer to the resolve frontier are brighter
          const distFromFrontier = i - resolved;
          const proximityFade = Math.max(0.05, 1 - distFromFrontier * 0.12);
          // Also fade in globally over time
          const globalFade = Math.min(1, progress * 1.5 + 0.15);
          const opacity = Math.min(proximityFade, globalFade);
          next.push({ char: randomGlyph(), opacity, resolved: false });
        }
      }
      setChars(next);

      if (resolved < totalChars) {
        frameRef.current = window.requestAnimationFrame(run);
      } else {
        setChars(target.split("").map((c) => ({ char: c, opacity: 1, resolved: true })));
      }
    };

    // Start: all characters invisible scrambled
    setChars(
      Array.from({ length: totalChars }, () => ({
        char: randomGlyph(),
        opacity: 0.06,
        resolved: false,
      }))
    );

    frameRef.current = window.requestAnimationFrame(run);
  }, []);

  useEffect(() => {
    setChars(words[0].split("").map((c) => ({ char: c, opacity: 1, resolved: true })));
    resolvedRef.current = words[0].length;
    setWordIndex(0);

    const wordIndexRef = { current: 0 };

    const wordInterval = setInterval(() => {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
      scramble(words[wordIndexRef.current], wordIndexRef.current);
    }, intervalMs);

    return () => {
      clearInterval(wordInterval);
      cancelAnimationFrame(frameRef.current);
    };
  }, [words, intervalMs, scramble]);

  return { chars, wordIndex };
}

/* ── Palette for the mycelial network ── */
const HERO_NET_COLORS = [
  "212,87,59",   // bloom-500 coral
  "244,152,128", // bloom-300 peach
  "155,69,89",   // maroon-500 rose
  "184,67,44",   // bloom-600
  "107,42,61",   // maroon-700
];

export default function Hero() {
  const { chars, wordIndex } = usePhaseText(ROTATING_WORDS, 4500);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [wordWidths, setWordWidths] = useState<number[]>([]);

  useEffect(() => {
    function measure() {
      const widths = measureRefs.current.map(
        (el) => (el ? Math.ceil(el.getBoundingClientRect().width) + 4 : 0)
      );
      setWordWidths(widths);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const containerWidth = wordWidths[wordIndex] || 0;

  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-white">
      {/* Mycelial network background */}
      <MycelialCanvas colors={HERO_NET_COLORS} seed={42} seedCount={18} fadeCenterY={0.55} fadeRyRatio={0.45} />

      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:pb-20 sm:pt-20 md:pb-28 md:pt-28 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-maroon-700 sm:text-5xl md:text-6xl lg:text-7xl">
          From common ground
          <br />
          <span className="whitespace-nowrap text-bloom-500">
            to shared{" "}
            <span
              className="inline-block text-left"
              style={{
                width: containerWidth > 0 ? containerWidth : "auto",
                verticalAlign: "bottom",
                lineHeight: "inherit",
                transition: "width 0.35s ease",
              }}
            >
              {chars.map((c, i) => (
                <span
                  key={i}
                  style={{
                    opacity: c.opacity,
                    transition: c.resolved ? "opacity 0.15s ease-in" : "none",
                  }}
                >
                  {c.char}
                </span>
              ))}
            </span>
          </span>
        </h1>
        {/* Hidden measurers — one per word, outside h1 to avoid layout impact */}
        {ROTATING_WORDS.map((word, i) => (
          <span
            key={word}
            ref={(el) => { measureRefs.current[i] = el; }}
            className="pointer-events-none invisible absolute whitespace-nowrap font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            aria-hidden="true"
          >
            {word}
          </span>
        ))}

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 sm:text-xl md:text-2xl">
          BLOOM is public infrastructure for organizers and civic leaders.
          Run structured deliberations, surface what your community agrees on,
          and make sure this shapes what happens next.
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

        <p className="relative z-10 mt-4 font-mono text-xs text-gray-500 sm:mt-5 sm:text-xs">
          Now open in Central Oregon &amp; Utah&nbsp;&mdash; more regions coming soon.
        </p>
      </div>
    </section>
  );
}
