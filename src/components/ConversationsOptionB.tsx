/**
 * Active Conversations — Option B: Lightweight Map
 *
 * Stylized US map with pins for active regions + card details below.
 * More visual impact, signals geographic ambition.
 */

const CONVERSATIONS = [
  {
    region: "Central Oregon",
    state: "OR",
    topic: "Community priorities & local governance",
    status: "Live" as const,
    link: "#",
    // Approximate pin positions on the simplified US map (% from left, % from top)
    pinX: 14,
    pinY: 28,
  },
  {
    region: "Utah",
    state: "UT",
    topic: "Public problem-solving across divides",
    status: "Live" as const,
    link: "#",
    pinX: 26,
    pinY: 42,
  },
];

function USMapSVG() {
  return (
    <svg
      viewBox="0 0 960 600"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified US continental outline */}
      <path
        d="M 120 140 L 180 100 L 220 95 L 260 100 L 280 110 L 320 105 L 380 100 L 420 95 L 480 90 L 520 85 L 560 80 L 600 85 L 640 90 L 680 100 L 720 110 L 760 120 L 800 130 L 830 145 L 845 160 L 855 180 L 860 200 L 870 220 L 880 250 L 885 280 L 880 310 L 870 330 L 855 350 L 840 365 L 820 375 L 800 380 L 770 385 L 750 395 L 730 410 L 710 430 L 690 440 L 660 445 L 630 440 L 610 435 L 590 440 L 570 450 L 550 460 L 520 465 L 490 460 L 460 450 L 430 445 L 400 450 L 370 460 L 340 465 L 310 460 L 280 450 L 250 445 L 220 450 L 190 455 L 160 450 L 130 440 L 110 420 L 95 395 L 85 370 L 80 340 L 75 310 L 70 280 L 72 250 L 78 220 L 85 195 L 95 170 L 108 155 Z"
        className="fill-gray-50 stroke-gray-200"
        strokeWidth="2"
      />

      {/* State-ish boundary hints — very subtle */}
      <path
        d="M 200 100 L 200 450 M 300 95 L 290 460 M 400 92 L 400 455 M 500 88 L 500 462 M 600 85 L 600 442 M 700 100 L 700 435 M 800 130 L 800 382"
        className="stroke-gray-100"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Oregon area highlight */}
      <ellipse cx="170" cy="200" rx="55" ry="45" className="fill-bloom-50/60 stroke-bloom-200" strokeWidth="1.5" />

      {/* Utah area highlight */}
      <ellipse cx="310" cy="290" rx="45" ry="50" className="fill-bloom-50/60 stroke-bloom-200" strokeWidth="1.5" />
    </svg>
  );
}

export default function ConversationsOptionB() {
  return (
    <section id="conversations" className="relative bg-white py-20 md:py-28">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #6B2A3D 1px, transparent 1px), linear-gradient(to bottom, #6B2A3D 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-bloom-500">
            Happening now
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-maroon-700 sm:text-4xl">
            Active conversations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
            BLOOM organizes public problem-solving by geography. Join a live
            deliberation or bring BLOOM to your community.
          </p>
        </div>

        {/* Map + pins */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative aspect-[960/600] w-full">
            <USMapSVG />

            {/* Animated pins */}
            {CONVERSATIONS.map(({ region, state, pinX, pinY }) => (
              <div
                key={region}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pinX}%`, top: `${pinY}%` }}
              >
                {/* Ping animation */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute h-8 w-8 animate-ping rounded-full bg-bloom-400/30" />
                </span>
                {/* Pin dot */}
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-bloom-500 shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
                {/* Label */}
                <div className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-2.5 py-1 shadow-sm">
                  <p className="text-xs font-bold text-maroon-700">{region}</p>
                  <p className="font-mono text-[10px] text-gray-400">{state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail cards below map */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {CONVERSATIONS.map(({ region, topic, status, link }) => (
            <a
              key={region}
              href={link}
              className="group flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-bloom-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bloom-50 text-bloom-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-maroon-700 group-hover:text-bloom-600 transition-colors">
                    {region}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-600">
                      {status}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-600">{topic}</p>
              </div>
              <svg className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:text-bloom-500 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          ))}
        </div>

        {/* Coming soon teaser */}
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-maroon-700">More regions coming soon.</span>{" "}
            BLOOM is expanding to new communities across the country.
          </p>
          <a
            href="#get-involved"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bloom-500 transition-colors hover:text-bloom-600"
          >
            Bring BLOOM to your community
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
