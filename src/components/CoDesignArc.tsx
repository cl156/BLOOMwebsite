/**
 * The co-design arc on /cohort/: five phases (divergent agenda setting, then
 * convergent goal setting → decision making), checkpoints between them, the
 * layers that run across phases, and the two outputs. Content: CO_DESIGN_ARC
 * in content/rfp.ts.
 *
 * Wide screens get a five-column diagram; narrow screens get the phases as a
 * vertical list with each layer labelled by the phases it spans.
 */
import { CO_DESIGN_ARC } from "../content/rfp";

const { phases, layers, outputs, checkpoint } = CO_DESIGN_ARC;

/** Static class names so Tailwind keeps them. Index = 1-based phase number. */
const COL_START = ["", "lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4", "lg:col-start-5"];
const COL_SPAN = ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3", "lg:col-span-4", "lg:col-span-5"];

const LAYER_STYLE: Record<string, string> = {
  steering: "border border-maroon-200 bg-maroon-50",
  pilot: "border border-dashed border-maroon-300 bg-white",
  organizing: "border border-bloom-200 bg-bloom-50",
  hub: "",
};

function Checkpoint({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-3 w-3 rotate-45 border-[1.5px] border-bloom-500 bg-cream ${className}`}
    />
  );
}

function phaseRange(from: number, to: number) {
  if (from === 1 && to === phases.length) return "All phases";
  return `Phases ${from}–${to}`;
}

export default function CoDesignArc() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-10">
      {/* Divergent / convergent */}
      <div className="hidden grid-cols-5 gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-maroon-900/60 lg:grid">
        <p className="border-b border-dashed border-maroon-200 pb-2 text-center">Divergent</p>
        <p className="col-span-4 border-b border-dashed border-maroon-200 pb-2 text-center">Convergent</p>
      </div>

      {/* Phases */}
      <ol className="mt-0 grid gap-4 lg:mt-5 lg:grid-cols-5 lg:gap-6">
        {phases.map((p, i) => (
          <li key={p.name} className="relative">
            {i > 0 && <Checkpoint className="absolute -left-[18px] top-7 hidden lg:block" />}
            <div className={`rounded-2xl p-4 text-center ${i === 0 ? "bg-blush-100" : "bg-blush-50"}`}>
              <p className="text-xs text-maroon-900/60 lg:hidden">
                Phase {i + 1} &middot; {i === 0 ? "Divergent" : "Convergent"}
              </p>
              <p className="font-display text-lg leading-tight text-bloom-600">{p.name}</p>
              <p className="mt-1 text-sm text-maroon-900/75">{p.sub}</p>
            </div>
            <ul className="mt-3 space-y-1.5 px-1 text-sm text-maroon-900/85">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="text-bloom-400" aria-hidden="true">&bull;</span>
                  {it}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      {/* Layers that run across phases */}
      <ul className="mt-8 grid gap-3 lg:grid-cols-5 lg:gap-x-6">
        {layers.map((l) => {
          const place = `${COL_START[l.from]} ${COL_SPAN[l.to - l.from + 1]}`;
          const text = (
            <>
              <span className="font-medium text-maroon-900">{l.label}:</span>{" "}
              <span className="text-maroon-900/80">{l.body}</span>
              <span className="ml-2 text-xs text-maroon-900/55 lg:hidden">({phaseRange(l.from, l.to)})</span>
            </>
          );
          if (l.style === "hub") {
            // Support starts close and tapers as the host takes the lead.
            return (
              <li key={l.label} className={`relative rounded-xl bg-bloom-100 lg:rounded-none lg:bg-transparent ${place}`}>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 hidden bg-bloom-100 lg:block"
                  style={{ clipPath: "polygon(0 0, 100% 42%, 100% 58%, 0 100%)" }}
                />
                <p className="relative px-4 py-3 text-sm">{text}</p>
              </li>
            );
          }
          return (
            <li key={l.label} className={`rounded-xl px-4 py-3 text-sm ${LAYER_STYLE[l.style]} ${place}`}>
              {text}
            </li>
          );
        })}
      </ul>

      {/* Outputs */}
      <div className="mt-8 grid gap-3 lg:grid-cols-5 lg:gap-x-6">
        <p className="self-center text-xs font-semibold uppercase tracking-[0.18em] text-bloom-500 lg:col-span-3">
          Outputs
        </p>
        {outputs.map((o) => (
          <div key={o.name} className={`rounded-2xl border border-bloom-200 bg-white p-4 text-center ${COL_START[o.phase]}`}>
            <p className="font-display text-lg text-maroon-900">{o.name}</p>
            <p className="mt-1 text-sm text-maroon-900/75">{o.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 flex items-center gap-3 text-sm text-maroon-900/75">
        <Checkpoint className="shrink-0" />
        {checkpoint}
      </p>
    </div>
  );
}
