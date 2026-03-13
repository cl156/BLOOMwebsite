/**
 * BLOOM Logo — uses the official PNG brand mark.
 *
 * The logo file lives at /public/bloom-logo.png.
 * To swap: replace that file or update the src path below.
 */
export default function BloomLogo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center ${className}`}>
      <img
        src="/bloom-logo.png"
        alt="BLOOM Project"
        className="h-24 w-auto"
      />
    </a>
  );
}
