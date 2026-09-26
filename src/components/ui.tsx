/**
 * Small shared pieces for the light, airy design (Humphrey's sketch):
 * pill buttons, soft radial glows, section eyebrows and the brandmark.
 */
import type { ReactNode, MouseEventHandler } from "react";

type PillProps = {
  href?: string;
  onClick?: MouseEventHandler;
  variant?: "primary" | "soft";
  arrow?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

/** Coral (primary) or blush (soft) rounded pill, rendered as a link or a button. */
export function Pill({ href, onClick, variant = "primary", arrow = true, external, className = "", children }: PillProps) {
  const styles =
    variant === "primary"
      ? "bg-bloom-500 text-white shadow-[0_10px_30px_-10px_rgba(212,87,59,0.7)] hover:bg-bloom-600"
      : "bg-blush-100 text-bloom-600 hover:bg-blush-200";
  const cls = `group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Very soft radial glow used as section atmosphere. Place inside a `relative` parent. */
export function Glow({ className = "", tone = "white" }: { className?: string; tone?: "white" | "blush" }) {
  const color = tone === "white" ? "rgba(255,255,255,1)" : "rgba(251,214,207,0.55)";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-2xl ${className}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, ${color} 45%, transparent 70%)` }}
    />
  );
}

/** Small uppercase label above a section heading. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500 ${className}`}>{children}</p>
  );
}

/** Section heading in the coral display face. */
export function Heading({ children, className = "", as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={`font-display font-medium leading-[1.05] tracking-tight text-bloom-500 ${className}`}>{children}</Tag>
  );
}

/** The BLOOM brandmark: central ring, six outer rings, six dots. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  const outer = [
    [32, 10], [51, 21], [51, 43], [32, 54], [13, 43], [13, 21],
  ];
  const dots = [
    [43, 13], [53, 32], [43, 51], [21, 51], [11, 32], [21, 13],
  ];
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="4.5" />
      {outer.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5.5" stroke="currentColor" strokeWidth="3" />
      ))}
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Pull-quote with small-caps attribution. */
export function Quote({ children, by, className = "", size = "md" }: { children: ReactNode; by?: string; className?: string; size?: "md" | "lg" }) {
  return (
    <figure className={className}>
      <blockquote
        className={`font-display leading-snug text-bloom-500 ${size === "lg" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}
      >
        &ldquo;{children}&rdquo;
      </blockquote>
      {by && <figcaption className="mt-3 text-xs font-medium tracking-wide text-maroon-900/70">&mdash; {by}</figcaption>}
    </figure>
  );
}
