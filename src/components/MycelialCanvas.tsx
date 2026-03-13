import { useEffect, useRef } from "react";
import { generateNetwork, drawNetwork, spawnTrailCluster, drawTrail, type TrailCluster } from "../utils/mycelialNetwork";

interface MycelialCanvasProps {
  /** RGB color strings, e.g. ["212,87,59", "244,152,128"] */
  colors: string[];
  /** PRNG seed — use different values for unique patterns */
  seed?: number;
  /** Number of branch origins along edges */
  seedCount?: number;
  /** Where the clear-zone centers as ratios of width/height */
  fadeCenterX?: number;
  fadeCenterY?: number;
  /** Fade radii as fractions of canvas width/height */
  fadeRxRatio?: number;
  fadeRyRatio?: number;
  /** Alpha multipliers for edges and nodes */
  edgeAlpha?: number;
  nodeAlpha?: number;
}

export default function MycelialCanvas({
  colors,
  seed = 42,
  seedCount = 18,
  fadeCenterX = 0.5,
  fadeCenterY = 0.46,
  fadeRxRatio = 0.5,
  fadeRyRatio = 0.55,
  edgeAlpha = 0.3,
  nodeAlpha = 0.4,
}: MycelialCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let drawMX = -1000;
    let drawMY = -1000;
    let animId = 0;
    let currentW = 0;
    let currentH = 0;
    let net: ReturnType<typeof generateNetwork> = { nodes: [], edges: [] };

    // Mouse trail state
    let trail: TrailCluster[] = [];
    let lastSpawnX = -1000;
    let lastSpawnY = -1000;
    const SPAWN_DISTANCE = 50; // px of movement before spawning a new cluster
    const TRAIL_FADE_MS = 1500;

    const dpr = window.devicePixelRatio || 1;

    function setup() {
      currentW = parent!.clientWidth;
      currentH = parent!.clientHeight;
      canvas!.width = currentW * dpr;
      canvas!.height = currentH * dpr;
      canvas!.style.width = `${currentW}px`;
      canvas!.style.height = `${currentH}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      net = generateNetwork(currentW, currentH, colors, seed, seedCount);
    }

    setup();

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function draw() {
      drawMX += (mouseX - drawMX) * 0.15;
      drawMY += (mouseY - drawMY) * 0.15;

      const now = performance.now();

      // Spawn new trail cluster when cursor moves enough
      if (drawMX > -500) {
        const dx = drawMX - lastSpawnX;
        const dy = drawMY - lastSpawnY;
        if (dx * dx + dy * dy > SPAWN_DISTANCE * SPAWN_DISTANCE) {
          trail.push(spawnTrailCluster(drawMX, drawMY, colors, now));
          lastSpawnX = drawMX;
          lastSpawnY = drawMY;
        }
      }

      // Garbage-collect expired clusters
      trail = trail.filter(c => now - c.birthTime < TRAIL_FADE_MS);

      ctx!.clearRect(0, 0, currentW, currentH);
      const cx = currentW * fadeCenterX;
      const cy = currentH * fadeCenterY;

      // Static network — no mouse boost (pass -1000)
      drawNetwork(ctx!, net.edges, net.nodes, cx, cy, currentW, currentH, -1000, -1000, fadeRxRatio, fadeRyRatio, edgeAlpha, nodeAlpha);

      // Mouse trail on top
      drawTrail(ctx!, trail, now, TRAIL_FADE_MS);

      animId = requestAnimationFrame(draw);
    }

    let isAnimating = false;
    function startAnim() {
      if (!isAnimating) { isAnimating = true; draw(); }
    }
    function stopAnim() {
      isAnimating = false;
      cancelAnimationFrame(animId);
      mouseX = -1000; mouseY = -1000;
      drawMX = -1000; drawMY = -1000;
      trail = []; lastSpawnX = -1000; lastSpawnY = -1000;
      ctx!.clearRect(0, 0, currentW, currentH);
      const cx = currentW * fadeCenterX;
      const cy = currentH * fadeCenterY;
      drawNetwork(ctx!, net.edges, net.nodes, cx, cy, currentW, currentH, -1000, -1000, fadeRxRatio, fadeRyRatio, edgeAlpha, nodeAlpha);
    }

    // Initial static draw
    stopAnim();

    const section = parent!;
    section.addEventListener("mouseenter", startAnim);
    section.addEventListener("mouseleave", stopAnim);
    window.addEventListener("mousemove", onMouse);

    const onResize = () => { setup(); stopAnim(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      section.removeEventListener("mouseenter", startAnim);
      section.removeEventListener("mouseleave", stopAnim);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, [colors, seed, seedCount, fadeCenterX, fadeCenterY, fadeRxRatio, fadeRyRatio, edgeAlpha, nodeAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}
