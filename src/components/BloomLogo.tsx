/**
 * BLOOM Logo — uses the official PNG brand mark with dynamic hover glow.
 *
 * The logo file lives at /public/bloom-logo.png.
 * To swap: replace that file or update the src path below.
 */
import { useState, useRef, useCallback } from "react";

export default function BloomLogo({ className = "" }: { className?: string }) {
  const [hovering, setHovering] = useState(false);
  const [hue, setHue] = useState(0);
  const raf = useRef<number>(0);
  const startTime = useRef(0);

  const animate = useCallback((ts: number) => {
    if (!startTime.current) startTime.current = ts;
    const elapsed = ts - startTime.current;
    // Cycle through hues over 2 seconds
    setHue((elapsed * 0.18) % 360);
    raf.current = requestAnimationFrame(animate);
  }, []);

  const onEnter = useCallback(() => {
    setHovering(true);
    startTime.current = 0;
    raf.current = requestAnimationFrame(animate);
  }, [animate]);

  const onLeave = useCallback(() => {
    setHovering(false);
    cancelAnimationFrame(raf.current);
    setHue(0);
  }, []);

  return (
    <a
      href="#"
      className={`flex items-center ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={`${import.meta.env.BASE_URL}bloom-logo.png`}
        alt="BLOOM Project"
        className="h-24 w-auto transition-[filter] duration-300"
        style={
          hovering
            ? {
                filter: `hue-rotate(${hue}deg) drop-shadow(0 0 8px hsl(${hue}, 70%, 55%)) drop-shadow(0 0 20px hsl(${hue}, 60%, 50%))`,
              }
            : { filter: "none" }
        }
      />
    </a>
  );
}
