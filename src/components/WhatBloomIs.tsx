/**
 * "What BLOOM Is" — identity statement
 * Content is loaded from src/content/whatBloomIs.json and editable in dev mode.
 */
import MycelialCanvas from "./MycelialCanvas";
import Editable from "./Editable";
import content from "../content/whatBloomIs.json";

/* Light palette for mycelial network on dark maroon background */
const BLOOM_NET_COLORS = [
  "255,255,255",   // white
  "244,200,210",   // light pink
  "255,220,225",   // soft rose
  "230,180,190",   // dusty pink
  "200,160,170",   // muted mauve
];

const FILE = "whatBloomIs.json";

export default function WhatBloomIs() {
  return (
    <section
      id="what-bloom-is"
      className="relative py-20 text-white md:py-28"
      style={{ background: "linear-gradient(180deg, #5e2636 0%, #6B2A3D 30%, #6B2A3D 70%, #4d1f2e 100%)" }}
    >
      {/* Mycelial network background */}
      <MycelialCanvas
        colors={BLOOM_NET_COLORS}
        seed={99}
        seedCount={22}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.8}
        fadeRyRatio={0.85}
        edgeAlpha={0.15}
        nodeAlpha={0.2}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            <Editable file={FILE} path="heading">
              {content.heading}
            </Editable>
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-bloom-100">
            <Editable file={FILE} path="introParagraph">
              {content.introParagraph}
            </Editable>
          </p>
          <p className="mt-4 text-lg leading-relaxed text-bloom-200">
            <Editable file={FILE} path="supportLine">
              {content.supportLine}
            </Editable>
          </p>

          {content.capabilities.length > 0 && (
            <div className="mt-6 inline-flex flex-col items-start gap-2 text-left">
              {content.capabilities.map((item, i) => (
                <span key={i} className="flex items-start gap-2 text-base text-bloom-100">
                  <span className="mt-0.5 font-mono text-bloom-300">&#10003;</span>
                  <Editable file={FILE} path={`capabilities.${i}`}>
                    {item}
                  </Editable>
                </span>
              ))}
            </div>
          )}

          {/* Three-element structure */}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {content.cards.map(({ label, desc }, i) => (
              <div key={i} className="rounded-md border border-white/15 bg-white/5 px-4 py-4">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-bloom-300">
                  <Editable file={FILE} path={`cards.${i}.label`}>
                    {label}
                  </Editable>
                </p>
                <p className="mt-2 text-base leading-relaxed text-bloom-100">
                  <Editable file={FILE} path={`cards.${i}.desc`}>
                    {desc}
                  </Editable>
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium text-bloom-200">
            <Editable file={FILE} path="closingLine">
              {content.closingLine}
            </Editable>
          </p>
        </div>
      </div>
    </section>
  );
}
