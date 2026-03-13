import { useEffect, useRef } from "react";

/**
 * MouseGlow — soft radial glow that follows the cursor.
 *
 * A warm bloom-coral spotlight trails the mouse, gently
 * illuminating the page. Pairs with the cybernetic decode
 * hero without competing for attention.
 */

/* ── Tuning knobs ──────────────────────────────────────────────────────────── */
const GLOW_RADIUS = 220;       // px — radius of the soft glow
const PEAK_OPACITY = 0.12;     // max alpha at center of glow
const EASE = 0.12;             // cursor-follow smoothing (0→1, higher = tighter)

/* Gradient color stops — warm coral fading through peach to transparent */
const INNER_COLOR = [212, 87, 59];   // bloom-500 coral
const MID_COLOR = [244, 152, 128];   // bloom-300 peach
const OUTER_COLOR = [155, 69, 89];   // maroon-500 rose

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

      // Smooth follow
      drawX += (mouseX - drawX) * EASE;
      drawY += (mouseY - drawY) * EASE;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      // Skip if cursor is off-screen
      if (
        drawX < -GLOW_RADIUS * 2 || drawX > w + GLOW_RADIUS * 2 ||
        drawY < -GLOW_RADIUS * 2 || drawY > h + GLOW_RADIUS * 2
      ) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Multi-stop radial gradient for a rich, warm glow
      const grad = ctx!.createRadialGradient(
        drawX, drawY, 0,
        drawX, drawY, GLOW_RADIUS,
      );

      const [ir, ig, ib] = INNER_COLOR;
      const [mr, mg, mb] = MID_COLOR;
      const [or2, og, ob] = OUTER_COLOR;

      grad.addColorStop(0, `rgba(${ir}, ${ig}, ${ib}, ${PEAK_OPACITY})`);
      grad.addColorStop(0.3, `rgba(${mr}, ${mg}, ${mb}, ${PEAK_OPACITY * 0.6})`);
      grad.addColorStop(0.6, `rgba(${or2}, ${og}, ${ob}, ${PEAK_OPACITY * 0.25})`);
      grad.addColorStop(1, `rgba(${or2}, ${og}, ${ob}, 0)`);

      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(drawX, drawY, GLOW_RADIUS, 0, Math.PI * 2);
      ctx!.fill();

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
