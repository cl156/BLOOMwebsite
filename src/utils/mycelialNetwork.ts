/**
 * Shared mycelial network generation and rendering utilities.
 * Used by Hero and WhatBloomIs sections.
 */

export interface NetNode { x: number; y: number; r: number; color: string }
export interface NetEdge { x1: number; y1: number; x2: number; y2: number; color: string; w: number }
interface Branch { x: number; y: number; angle: number; speed: number; life: number; color: string }

/** A small cluster of branches spawned at the mouse cursor */
export interface TrailCluster {
  nodes: NetNode[];
  edges: NetEdge[];
  birthTime: number;
}

/** Seeded PRNG for deterministic layout across renders */
export function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateNetwork(
  w: number,
  h: number,
  colors: string[],
  seed = 42,
  seedCount = 18,
) {
  const rand = mulberry32(seed);
  const nodes: NetNode[] = [];
  const edges: NetEdge[] = [];

  // Grow branches from seed points scattered around edges
  const seeds: Branch[] = [];
  for (let i = 0; i < seedCount; i++) {
    const side = Math.floor(rand() * 4);
    let sx: number, sy: number, angle: number;
    if (side === 0) { sx = rand() * w; sy = -10; angle = Math.PI / 2 + (rand() - 0.5) * 0.8; }
    else if (side === 1) { sx = rand() * w; sy = h + 10; angle = -Math.PI / 2 + (rand() - 0.5) * 0.8; }
    else if (side === 2) { sx = -10; sy = rand() * h; angle = (rand() - 0.5) * 0.8; }
    else { sx = w + 10; sy = rand() * h; angle = Math.PI + (rand() - 0.5) * 0.8; }
    seeds.push({
      x: sx, y: sy, angle, speed: 8 + rand() * 12,
      life: 12 + Math.floor(rand() * 20),
      color: colors[Math.floor(rand() * colors.length)],
    });
  }

  const allBranches = [...seeds];
  const maxIter = 600;
  let iter = 0;
  while (allBranches.length > 0 && iter < maxIter) {
    iter++;
    const br = allBranches.shift()!;
    if (br.life <= 0) continue;

    const nx = br.x + Math.cos(br.angle) * br.speed;
    const ny = br.y + Math.sin(br.angle) * br.speed;

    if (nx < -40 || nx > w + 40 || ny < -40 || ny > h + 40) continue;

    const lineW = 0.6 + rand() * 1.0;
    edges.push({ x1: br.x, y1: br.y, x2: nx, y2: ny, color: br.color, w: lineW });

    if (rand() < 0.35) {
      const nr = 1.5 + rand() * 3.5;
      nodes.push({ x: nx, y: ny, r: nr, color: br.color });
    }

    const nextAngle = br.angle + (rand() - 0.5) * 0.6;
    allBranches.push({
      x: nx, y: ny, angle: nextAngle,
      speed: br.speed * (0.85 + rand() * 0.2),
      life: br.life - 1,
      color: br.color,
    });

    if (rand() < 0.25 && br.life > 3) {
      const forkAngle = br.angle + (rand() > 0.5 ? 1 : -1) * (0.4 + rand() * 0.8);
      allBranches.push({
        x: nx, y: ny, angle: forkAngle,
        speed: br.speed * (0.6 + rand() * 0.3),
        life: Math.floor(br.life * (0.4 + rand() * 0.3)),
        color: colors[Math.floor(rand() * colors.length)],
      });
    }
  }

  return { nodes, edges };
}

/** Compute base alpha: 0 at center, ramps up toward edges. */
export function baseAlpha(x: number, y: number, cx: number, cy: number, fadeRx: number, fadeRy: number) {
  const dx = (x - cx) / fadeRx;
  const dy = (y - cy) / fadeRy;
  const t = Math.min(1, Math.sqrt(dx * dx + dy * dy));
  return t * t;
}

/** Mouse proximity boost: 0 when far, up to ~0.6 when cursor is right on it */
const MOUSE_RADIUS = 160;
export function mouseBoost(x: number, y: number, mx: number, my: number) {
  if (mx < -500) return 0;
  const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
  if (dist > MOUSE_RADIUS) return 0;
  const t = 1 - dist / MOUSE_RADIUS;
  return t * t * 0.6;
}

/** Draw the network with configurable alpha multipliers */
export function drawNetwork(
  ctx: CanvasRenderingContext2D,
  edges: NetEdge[],
  nodes: NetNode[],
  cx: number,
  cy: number,
  w: number,
  h: number,
  mouseX: number,
  mouseY: number,
  fadeRxRatio = 0.5,
  fadeRyRatio = 0.55,
  edgeAlphaMul = 0.3,
  nodeAlphaMul = 0.4,
) {
  const fadeRx = w * fadeRxRatio;
  const fadeRy = h * fadeRyRatio;

  ctx.lineCap = "round";
  for (const e of edges) {
    const mx = (e.x1 + e.x2) / 2;
    const my = (e.y1 + e.y2) / 2;
    const base = baseAlpha(mx, my, cx, cy, fadeRx, fadeRy) * edgeAlphaMul;
    const boost = mouseBoost(mx, my, mouseX, mouseY);
    const a = Math.min(0.7, base + boost);
    if (a < 0.01) continue;
    ctx.strokeStyle = `rgba(${e.color},${a})`;
    ctx.lineWidth = boost > 0.05 ? e.w * (1 + boost * 1.5) : e.w;
    ctx.beginPath();
    ctx.moveTo(e.x1, e.y1);
    ctx.lineTo(e.x2, e.y2);
    ctx.stroke();
  }

  for (const n of nodes) {
    const base = baseAlpha(n.x, n.y, cx, cy, fadeRx, fadeRy) * nodeAlphaMul;
    const boost = mouseBoost(n.x, n.y, mouseX, mouseY);
    const a = Math.min(0.85, base + boost);
    if (a < 0.01) continue;

    const glowR = boost > 0.05 ? n.r * (2.5 + boost * 3) : n.r * 2.5;

    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
    grad.addColorStop(0, `rgba(${n.color},${a})`);
    grad.addColorStop(0.4, `rgba(${n.color},${a * 0.35})`);
    grad.addColorStop(1, `rgba(${n.color},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
    ctx.fill();

    const coreA = Math.min(1, a * (boost > 0.05 ? 2 : 1.4));
    ctx.fillStyle = `rgba(${n.color},${coreA})`;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* ---- Mouse trail: small mycelial clusters spawned at cursor ---- */

let trailSeedCounter = 0;

/** Spawn a tiny cluster of 2-3 branch arms at (x, y) */
export function spawnTrailCluster(
  x: number,
  y: number,
  colors: string[],
  now: number,
): TrailCluster {
  const rand = mulberry32(++trailSeedCounter * 7919 + Math.round(x * 31 + y * 17));
  const nodes: NetNode[] = [];
  const edges: NetEdge[] = [];

  const armCount = 2 + Math.floor(rand() * 2); // 2-3 arms
  const baseAngle = rand() * Math.PI * 2;

  for (let a = 0; a < armCount; a++) {
    const armAngle = baseAngle + (a / armCount) * Math.PI * 2 + (rand() - 0.5) * 0.8;
    let bx = x;
    let by = y;
    let angle = armAngle;
    const segCount = 2 + Math.floor(rand() * 3); // 2-4 segments

    for (let s = 0; s < segCount; s++) {
      const segLen = 4 + rand() * 4; // 4-8px
      const nx = bx + Math.cos(angle) * segLen;
      const ny = by + Math.sin(angle) * segLen;
      const color = colors[Math.floor(rand() * colors.length)];
      edges.push({ x1: bx, y1: by, x2: nx, y2: ny, color, w: 0.3 + rand() * 0.3 });

      if (rand() < 0.35) {
        nodes.push({ x: nx, y: ny, r: 0.8 + rand() * 0.7, color });
      }

      bx = nx;
      by = ny;
      angle += (rand() - 0.5) * 0.7;
    }
  }

  return { nodes, edges, birthTime: now };
}

const TRAIL_EDGE_ALPHA = 0.18;
const TRAIL_NODE_ALPHA = 0.22;

/** Draw all trail clusters with age-based fade-out */
export function drawTrail(
  ctx: CanvasRenderingContext2D,
  trail: TrailCluster[],
  now: number,
  fadeDuration = 1500,
) {
  ctx.lineCap = "round";

  for (const cluster of trail) {
    const age = now - cluster.birthTime;
    const fade = Math.max(0, 1 - age / fadeDuration);
    if (fade <= 0) continue;

    // Ease out for smoother fade
    const f = fade * fade;

    for (const e of cluster.edges) {
      const a = TRAIL_EDGE_ALPHA * f;
      if (a < 0.005) continue;
      ctx.strokeStyle = `rgba(${e.color},${a})`;
      ctx.lineWidth = e.w;
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.stroke();
    }

    for (const n of cluster.nodes) {
      const a = TRAIL_NODE_ALPHA * f;
      if (a < 0.005) continue;

      const glowR = n.r * 2.5;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
      grad.addColorStop(0, `rgba(${n.color},${a})`);
      grad.addColorStop(0.4, `rgba(${n.color},${a * 0.35})`);
      grad.addColorStop(1, `rgba(${n.color},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${n.color},${Math.min(1, a * 1.4)})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
