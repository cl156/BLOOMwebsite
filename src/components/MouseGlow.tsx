import { useEffect, useRef } from "react";

/**
 * MouseGlow — tiny blinking nodes that evoke AI pattern-matching.
 *
 * Instead of a smooth trailing glow, this renders a small cluster of dots
 * around the cursor that blink in and out at staggered intervals — like
 * neural activations or pattern-recognition pulses. Each node has its own
 * color, phase, and blink speed for an algorithmic, non-organic feel.
 *
 * Tuning knobs at the top control size, density, speed, and palette.
 */

/* ── Tuning knobs ──────────────────────────────────────────────────────────── */
const NODE_COUNT = 10; // number of blinking nodes
const ORBIT_MIN = 12; // px — closest a node can be to cursor
const ORBIT_MAX = 35; // px — farthest a node can be
const NODE_R_MIN = 1.5; // px — smallest node radius
const NODE_R_MAX = 3.5; // px — largest node radius
const PEAK_OPACITY = 0.35; // max alpha when fully "on"
const EASE = 0.15; // how quickly the cluster snaps to cursor (higher = tighter)

/* Multi-color palette — coral, maroon, warm peach, muted rose, soft slate */
const PALETTE: [number, number, number][] = [
  [212, 87, 59],   // bloom-500 coral
  [184, 67, 44],   // bloom-600 deeper coral
  [107, 42, 61],   // maroon-700
  [244, 152, 128], // bloom-300 peach
  [155, 69, 89],   // maroon-500 rose
  [185, 140, 155], // muted mauve
  [120, 100, 110], // warm gray
];

/** Each node has fixed geometry + its own blink phase/speed */
interface Node {
  angle: number;       // radians — position around cursor
  orbit: number;       // px — distance from cursor center
  r: number;           // px — dot radius
  color: [number, number, number];
  phase: number;       // 0–2π — blink cycle offset
  speed: number;       // radians per frame — blink frequency
}

function createNodes(): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    angle: Math.random() * Math.PI * 2,
    orbit: ORBIT_MIN + Math.random() * (ORBIT_MAX - ORBIT_MIN),
    r: NODE_R_MIN + Math.random() * (NODE_R_MAX - NODE_R_MIN),
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    phase: Math.random() * Math.PI * 2,
    speed: 0.03 + Math.random() * 0.04, // varied blink rates
  }));
}

export default function MouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let drawX = -1000;
    let drawY = -1000;
    let animId = 0;
    let dpr = 1;
    let frame = 0;

    const nodes = createNodes();

    function resize() {
      dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    }

    function onMouseLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      frame++;

      // Snap toward cursor (tighter than organic trailing)
      drawX += (mouseX - drawX) * EASE;
      drawY += (mouseY - drawY) * EASE;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      // Skip if off-screen
      if (drawX < -ORBIT_MAX * 2 || drawX > w + ORBIT_MAX * 2 ||
          drawY < -ORBIT_MAX * 2 || drawY > h + ORBIT_MAX * 2) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Draw each blinking node
      for (const node of nodes) {
        // Blink: sinusoidal alpha oscillation (0 → peak → 0)
        const blink = Math.sin(frame * node.speed + node.phase);
        // Only visible in the "on" half of the cycle (blink > 0)
        if (blink <= 0) continue;

        const alpha = blink * PEAK_OPACITY;
        const x = drawX + node.orbit * Math.cos(node.angle);
        const y = drawY + node.orbit * Math.sin(node.angle);

        const [r, g, b] = node.color;

        // Crisp dot with soft edge
        const grad = ctx!.createRadialGradient(x, y, 0, x, y, node.r);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        grad.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(x, y, node.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  );
}
