/**
 * "Rooted locally. Connected across communities." — explains cross-local coordination
 */
import MycelialCanvas from "./MycelialCanvas";

/* Light palette for mycelial network on dark maroon background */
const FED_NET_COLORS = [
  "255,255,255",   // white
  "244,200,210",   // light pink
  "255,220,225",   // soft rose
  "230,180,190",   // dusty pink
  "200,160,170",   // muted mauve
];

export default function Federated() {
  return (
    <section
      className="relative py-20 text-white md:py-28"
      style={{ background: "linear-gradient(180deg, #5e2636 0%, #6B2A3D 30%, #6B2A3D 70%, #4d1f2e 100%)" }}
    >
      {/* Mycelial network background */}
      <MycelialCanvas
        colors={FED_NET_COLORS}
        seed={137}
        seedCount={20}
        fadeCenterX={0.5}
        fadeCenterY={0.5}
        fadeRxRatio={0.8}
        fadeRyRatio={0.85}
        edgeAlpha={0.15}
        nodeAlpha={0.2}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Rooted locally. Connected across communities.
        </h2>

        <p className="mt-6 text-xl leading-relaxed text-bloom-100">
          Most online civic tools are built for scale, not for trust. They can
          amplify a conversation&nbsp;&mdash; but they can&rsquo;t make it
          matter to the people in the room where decisions get made. BLOOM
          takes a fundamentally different approach.
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-2xl font-bold leading-snug">
          Many small, locally rooted conversations&nbsp;&mdash;
          <br className="hidden sm:inline" />
          finding common ground with one another.
        </p>

        <p className="mt-8 text-lg leading-relaxed text-bloom-200">
          Every BLOOM conversation is locally hosted. Authority flows from
          trusted local conveners and relationships, not from platform scale.
          But those conversations connect&nbsp;&mdash; sharing what&rsquo;s
          learned, surfacing shared priorities, and coordinating action where
          decisions actually get made.
        </p>

        <p className="mt-6 text-lg leading-relaxed text-bloom-200">
          This isn&rsquo;t an add-on feature. It&rsquo;s a core design
          principle that shapes every product decision&nbsp;&mdash; from how
          data is stored to how findings flow across local, regional, and
          cross-state scales.
        </p>

        <div className="mx-auto mt-10 max-w-xl rounded-lg border border-white/15 bg-white/5 px-8 py-6 backdrop-blur-sm">
          <p className="text-lg leading-relaxed text-bloom-100">
            Local roots. Broader reach. Neither sacrificed for the other.
          </p>
        </div>
      </div>
    </section>
  );
}
