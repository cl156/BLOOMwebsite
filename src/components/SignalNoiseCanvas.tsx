/**
 * Signal vs. Noise — scroll-driven particle animation.
 *
 * Particles start scattered and chaotic, then self-organize into
 * connected clusters as the section scrolls into view. Uses the
 * same color palette as the other mycelial backgrounds.
 */
import { useRef, useEffect, useCallback } from "react";
import { mulberry32 } from "../utils/mycelialNetwork";

interface Particle {
  /** Scattered (chaotic) position */
  sx: number;
  sy: number;
  /** Organized (connected) position */
  ox: number;
  oy: number;
  /** Current rendered position */
  x: number;
  y: number;
  r: number;
  color: string;
  /** Jitter offset for chaotic state */
  jitterAngle: number;
  jitterSpeed: number;
  /** Which cluster this particle belongs to */
  cluster: number;
}

interface Bond {
  a: number;
  b: number;
  color: string;
}

const COLORS = ["107,42,61", "155,69,89", "180,100,120", "200,140,155"];
const PARTICLE_COUNT = 80;
const CLUSTER_COUNT = 8;
const CONNECTION_DIST = 60;

export default function SignalNoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<{ particles: Particle[]; bonds: Bond[] } | null>(null);
  const progressRef = useRef(0);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((w: number, h: number) => {
    const rand = mulberry32(314);
    const particles: Particle[] = [];

    // Generate cluster centers
    const clusterCenters: { x: number; y: number }[] = [];
    for (let c = 0; c < CLUSTER_COUNT; c++) {
      clusterCenters.push({
        x: w * 0.15 + rand() * w * 0.7,
        y: h * 0.15 + rand() * h * 0.7,
      });
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const cluster = Math.floor(rand() * CLUSTER_COUNT);
      const center = clusterCenters[cluster];

      // Organized position: near cluster center
      const oAngle = rand() * Math.PI * 2;
      const oDist = 15 + rand() * 40;
      const ox = center.x + Math.cos(oAngle) * oDist;
      const oy = center.y + Math.sin(oAngle) * oDist;

      // Scattered position: random across entire canvas
      const sx = rand() * w;
      const sy = rand() * h;

      particles.push({
        sx, sy,
        ox, oy,
        x: sx, y: sy,
        r: 1.5 + rand() * 2,
        color: COLORS[Math.floor(rand() * COLORS.length)],
        jitterAngle: rand() * Math.PI * 2,
        jitterSpeed: 0.3 + rand() * 0.7,
        cluster,
      });
    }

    // Pre-compute bonds between nearby organized particles in the same cluster
    const bonds: Bond[] = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[i].cluster !== particles[j].cluster) continue;
        const dx = particles[i].ox - particles[j].ox;
        const dy = particles[i].oy - particles[j].oy;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) {
          bonds.push({ a: i, b: j, color: particles[i].color });
        }
      }
    }

    dataRef.current = { particles, bonds };
  }, []);

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    const data = dataRef.current;
    if (!canvas || !data) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const p = progressRef.current; // 0 = chaos, 1 = organized
    const time = now * 0.001;
    timeRef.current = time;

    // Ease the progress for smoother visual
    const ease = p * p * (3 - 2 * p); // smoothstep

    // Update particle positions
    for (const pt of data.particles) {
      // Interpolate between scattered and organized
      const baseX = pt.sx + (pt.ox - pt.sx) * ease;
      const baseY = pt.sy + (pt.oy - pt.sy) * ease;

      // Add jitter that decreases as we organize
      const jitterAmount = (1 - ease) * 8;
      const jx = Math.cos(pt.jitterAngle + time * pt.jitterSpeed) * jitterAmount;
      const jy = Math.sin(pt.jitterAngle * 1.3 + time * pt.jitterSpeed * 0.8) * jitterAmount;

      pt.x = baseX + jx;
      pt.y = baseY + jy;
    }

    // Draw bonds (fade in as we organize)
    if (ease > 0.1) {
      const bondAlpha = Math.max(0, (ease - 0.1) / 0.9); // 0 until 10%, then ramp
      ctx.lineCap = "round";
      for (const bond of data.bonds) {
        const pa = data.particles[bond.a];
        const pb = data.particles[bond.b];
        const a = bondAlpha * 0.15;
        if (a < 0.005) continue;
        ctx.strokeStyle = `rgba(${bond.color},${a})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
    }

    // Draw particles
    for (const pt of data.particles) {
      // Particles get brighter / more defined as they organize
      const coreAlpha = 0.12 + ease * 0.2;
      const glowAlpha = 0.06 + ease * 0.1;
      const glowR = pt.r * (3 - ease * 0.8); // glow shrinks slightly when organized

      // Glow
      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, glowR);
      grad.addColorStop(0, `rgba(${pt.color},${glowAlpha})`);
      grad.addColorStop(1, `rgba(${pt.color},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `rgba(${pt.color},${coreAlpha})`;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.r * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Scroll-driven progress
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when section top enters viewport, 1 when section bottom reaches mid-viewport
      const start = vh; // section top at bottom of viewport
      const end = -rect.height * 0.3; // section mostly scrolled past
      const raw = (start - rect.top) / (start - end);
      progressRef.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [initParticles, draw]);

  return (
    <div ref={sectionRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
    </div>
  );
}
