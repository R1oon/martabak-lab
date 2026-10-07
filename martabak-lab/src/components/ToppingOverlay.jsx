// ============================================================
// src/components/ToppingOverlay.jsx
// Pure Procedural Vector SVG Topping Engine (Top-Down View)
// Sebaran Acak Alami (True Uniform Random Rejection Sampling)
// Zero Spiral / Zero Obat Nyamuk Artifacts
// ============================================================
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOPPINGS } from '../data/martabakData';

// Deterministic pseudo-random number generator (LCG)
function createRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── Uniform 2D Circular Rejection Sampling ──────────────────
// Menghasilkan koordinat acak murni dalam lingkaran tanpa pola spiral
function sampleUniformCircle(count, radius, rng) {
  const points = [];
  while (points.length < count) {
    const x = (rng() * 2 - 1) * radius;
    const y = (rng() * 2 - 1) * radius;
    if (x * x + y * y <= radius * radius) {
      points.push({ x, y });
    }
  }
  return points;
}

// ── 1. CHEESE PARTICLES (48 garis parutan acak menyilang) ───
function generateCheeseParticles(safeRadius = 112) {
  const rng = createRng(101);
  const count = 48;
  const points = sampleUniformCircle(count, safeRadius * 0.96, rng);

  return points.map((p, i) => {
    const length = 22 + rng() * 16; // 22px - 38px
    const width = 2.4 + rng() * 0.8;
    const angle = rng() * 180 - 90; // Menyilang bebas
    const isPale = rng() > 0.45;
    const color = isPale ? '#FEF08A' : '#FDE047';
    return { id: `ch-${i}`, x: p.x, y: p.y, length, width, angle, color };
  });
}

// ── 2. CHOCOLATE PARTICLES (85 butir meises cokelat acak) ───
function generateChocolateParticles(safeRadius = 112) {
  const rng = createRng(202);
  const count = 85; // 80-100 butir sesuai permintaan
  const points = sampleUniformCircle(count, safeRadius * 0.96, rng);

  return points.map((p, i) => {
    const length = 8 + rng() * 4.5; // 8px - 12.5px silinder mini
    const width = 2.8 + rng() * 0.6;
    const angle = rng() * 360; // Rotasi bebas
    const isDark = rng() > 0.3;
    const color = isDark ? '#3E2723' : '#27140B';
    const highlight = isDark ? '#5D4037' : '#3E2723';
    return { id: `ms-${i}`, x: p.x, y: p.y, length, width, angle, color, highlight };
  });
}

// ── 3. PEANUT PARTICLES (38 cincangan kacang tanah acak) ────
function generatePeanutParticles(safeRadius = 112) {
  const rng = createRng(303);
  const count = 38;
  const points = sampleUniformCircle(count, safeRadius * 0.94, rng);

  return points.map((p, i) => {
    const rx = 3.6 + rng() * 2.8;
    const ry = 2.8 + rng() * 2.2;
    const angle = rng() * 180;
    const color = rng() > 0.4 ? '#D97706' : '#B45309';
    return { id: `pn-${i}`, x: p.x, y: p.y, rx, ry, angle, color };
  });
}

// ── 4. OREO PARTICLES (14 keping biskuit & 28 remahan krim) ─
function generateOreoParticles(safeRadius = 112) {
  const rng = createRng(404);
  const cookieCount = 14;
  const points = sampleUniformCircle(cookieCount, safeRadius * 0.9, rng);
  const cookies = [];
  const crumbs = [];

  points.forEach((p, i) => {
    const radius = 9 + rng() * 4.5;
    const angle = rng() * 360;
    cookies.push({ id: `or-${i}`, x: p.x, y: p.y, radius, angle });

    // 2 remahan krim per keping
    crumbs.push({
      id: `cr-${i}-1`,
      x: p.x + (rng() * 2 - 1) * radius * 0.8,
      y: p.y + (rng() * 2 - 1) * radius * 0.8,
      r: 1.8 + rng() * 1.4,
    });
    crumbs.push({
      id: `cr-${i}-2`,
      x: p.x + (rng() * 2 - 1) * radius * 1.3,
      y: p.y + (rng() * 2 - 1) * radius * 1.3,
      r: 1.2 + rng() * 1.0,
    });
  });
  return { cookies, crumbs };
}

// ── 5. BANANA PARTICLES (9 irisan pisang melingkar rapi) ────
function generateBananaParticles(safeRadius = 112) {
  const slices = [];
  const outerCount = 6;
  const innerCount = 3;

  for (let i = 0; i < outerCount; i++) {
    const angle = (i / outerCount) * Math.PI * 2 + 0.15;
    const r = safeRadius * 0.62;
    slices.push({
      id: `bn-out-${i}`,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      radius: 14,
      rotation: i * 35,
    });
  }

  for (let i = 0; i < innerCount; i++) {
    const angle = (i / innerCount) * Math.PI * 2 + 0.65;
    const r = safeRadius * 0.26;
    slices.push({
      id: `bn-in-${i}`,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      radius: 13,
      rotation: i * 55,
    });
  }
  return slices;
}

// ── 6. STRAWBERRY PARTICLES (8 potongan stroberi segar) ─────
function generateStrawberryParticles(safeRadius = 112) {
  const slices = [];
  const count = 8;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.35;
    const r = safeRadius * 0.55;
    slices.push({
      id: `sb-${i}`,
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      scale: 1.15,
      angle: (angle * 180) / Math.PI + 90,
    });
  }
  return slices;
}

// ── 7. CORN PARTICLES (34 butir jagung manis pipil acak) ────
function generateCornParticles(safeRadius = 112) {
  const rng = createRng(707);
  const count = 34;
  const points = sampleUniformCircle(count, safeRadius * 0.94, rng);

  return points.map((p, i) => ({
    id: `cn-${i}`,
    x: p.x,
    y: p.y,
    rx: 3.8 + rng() * 0.8,
    ry: 5.2 + rng() * 1.0,
    angle: rng() * 360,
  }));
}

// ── 8. ALMOND PARTICLES (18 irisan tipis almond acak) ───────
function generateAlmondParticles(safeRadius = 112) {
  const rng = createRng(808);
  const count = 18;
  const points = sampleUniformCircle(count, safeRadius * 0.9, rng);

  return points.map((p, i) => ({
    id: `al-${i}`,
    x: p.x,
    y: p.y,
    rx: 3.5 + rng() * 1.2,
    ry: 9.5 + rng() * 2.5,
    angle: rng() * 180,
  }));
}


// ─── MAIN TOPPING OVERLAY COMPONENT ─────────────────────────
export default function ToppingOverlay({ activeToppings = [], safeRadius = 112 }) {
  // Precompute static particle sets with pure uniform random distribution
  const cheeseStrands = useMemo(() => generateCheeseParticles(safeRadius), [safeRadius]);
  const chocolateSprinkles = useMemo(() => generateChocolateParticles(safeRadius), [safeRadius]);
  const peanutChunks = useMemo(() => generatePeanutParticles(safeRadius), [safeRadius]);
  const oreoData = useMemo(() => generateOreoParticles(safeRadius), [safeRadius]);
  const bananaSlices = useMemo(() => generateBananaParticles(safeRadius), [safeRadius]);
  const strawberrySlices = useMemo(() => generateStrawberryParticles(safeRadius), [safeRadius]);
  const cornKernels = useMemo(() => generateCornParticles(safeRadius), [safeRadius]);
  const almondFlakes = useMemo(() => generateAlmondParticles(safeRadius), [safeRadius]);

  // Extract unique active topping types
  const uniqueActiveIds = useMemo(() => {
    const set = new Set();
    activeToppings.forEach((t) => {
      const id = t.toppingId || t.id;
      if (id) set.add(id);
    });
    return Array.from(set);
  }, [activeToppings]);

  // Layer Priority: Granular/Shreds on bottom (Keju/Meises), Chunks in mid (Oreo), Fruits on top (Pisang/Stroberi)
  const sortedToppingTypes = useMemo(() => {
    return uniqueActiveIds
      .map((id) => TOPPINGS.find((item) => item.id === id) || { id, layerPriority: 1 })
      .sort((a, b) => a.layerPriority - b.layerPriority);
  }, [uniqueActiveIds]);

  return (
    <g className="pointer-events-none select-none">
      <AnimatePresence>
        {sortedToppingTypes.map((topping) => (
          <motion.g
            key={topping.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 24,
            }}
          >
            {topping.id === 'cheese' && <CheeseLayer strands={cheeseStrands} />}
            {topping.id === 'chocolate' && <ChocolateLayer sprinkles={chocolateSprinkles} />}
            {topping.id === 'peanut' && <PeanutLayer chunks={peanutChunks} />}
            {topping.id === 'corn' && <CornLayer kernels={cornKernels} />}
            {topping.id === 'almond' && <AlmondLayer flakes={almondFlakes} />}
            {topping.id === 'oreo' && <OreoLayer data={oreoData} />}
            {topping.id === 'banana' && <BananaLayer slices={bananaSlices} />}
            {topping.id === 'strawberry' && <StrawberryLayer slices={strawberrySlices} />}
          </motion.g>
        ))}
      </AnimatePresence>
    </g>
  );
}

// ── CHEESE SVG LAYER ────────────────────────────────────────
function CheeseLayer({ strands }) {
  return (
    <g id="layer-cheese">
      {strands.map((st) => (
        <g key={st.id} transform={`translate(${st.x}, ${st.y}) rotate(${st.angle})`}>
          <rect
            x={-st.length / 2}
            y={-st.width / 2 + 1}
            width={st.length}
            height={st.width}
            rx={st.width / 2}
            fill="#CA8A04"
            opacity="0.4"
          />
          <rect
            x={-st.length / 2}
            y={-st.width / 2}
            width={st.length}
            height={st.width}
            rx={st.width / 2}
            fill={st.color}
          />
          <rect
            x={-st.length / 2 + 3}
            y={-st.width / 2 + 0.4}
            width={st.length - 6}
            height={st.width * 0.4}
            rx="0.5"
            fill="#FEFCE8"
            opacity="0.6"
          />
        </g>
      ))}
    </g>
  );
}

// ── CHOCOLATE SVG LAYER ─────────────────────────────────────
function ChocolateLayer({ sprinkles }) {
  return (
    <g id="layer-chocolate">
      {sprinkles.map((sp) => (
        <g key={sp.id} transform={`translate(${sp.x}, ${sp.y}) rotate(${sp.angle})`}>
          <rect
            x={-sp.length / 2 + 0.5}
            y={-sp.width / 2 + 1}
            width={sp.length}
            height={sp.width}
            rx={sp.width / 2}
            fill="#1A0C08"
            opacity="0.6"
          />
          <rect
            x={-sp.length / 2}
            y={-sp.width / 2}
            width={sp.length}
            height={sp.width}
            rx={sp.width / 2}
            fill={sp.color}
          />
          <rect
            x={-sp.length / 2 + 2}
            y={-sp.width / 2 + 0.5}
            width={sp.length - 4}
            height={sp.width * 0.4}
            rx="0.5"
            fill={sp.highlight}
          />
        </g>
      ))}
    </g>
  );
}

// ── PEANUT SVG LAYER ────────────────────────────────────────
function PeanutLayer({ chunks }) {
  return (
    <g id="layer-peanut">
      {chunks.map((pn) => (
        <g key={pn.id} transform={`translate(${pn.x}, ${pn.y}) rotate(${pn.angle})`}>
          <ellipse cx={0.5} cy={1} rx={pn.rx} ry={pn.ry} fill="#78350F" opacity="0.4" />
          <ellipse cx={0} cy={0} rx={pn.rx} ry={pn.ry} fill={pn.color} />
          <ellipse cx={-pn.rx * 0.2} cy={-pn.ry * 0.2} rx={pn.rx * 0.55} ry={pn.ry * 0.45} fill="#FDE68A" opacity="0.75" />
        </g>
      ))}
    </g>
  );
}

// ── OREO SVG LAYER ──────────────────────────────────────────
function OreoLayer({ data }) {
  const { cookies, crumbs } = data;
  return (
    <g id="layer-oreo">
      {cookies.map((ck) => (
        <g key={ck.id} transform={`translate(${ck.x}, ${ck.y}) rotate(${ck.angle})`}>
          <circle cx={1} cy={2} r={ck.radius} fill="#09090B" opacity="0.55" />
          <circle cx={0} cy={0} r={ck.radius} fill="#18181B" />
          <circle cx={0} cy={0} r={ck.radius * 0.72} fill="none" stroke="#27272A" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx={0} cy={0} r={ck.radius * 0.38} fill="#27272A" />
        </g>
      ))}
      {crumbs.map((cr) => (
        <circle key={cr.id} cx={cr.x} cy={cr.y} r={cr.r} fill="#F4F4F5" />
      ))}
    </g>
  );
}

// ── BANANA SVG LAYER ────────────────────────────────────────
function BananaLayer({ slices }) {
  return (
    <g id="layer-banana">
      {slices.map((sl) => (
        <g key={sl.id} transform={`translate(${sl.x}, ${sl.y}) rotate(${sl.rotation})`}>
          <circle cx={1.5} cy={2.5} r={sl.radius} fill="#78350F" opacity="0.35" />
          <circle cx={0} cy={0} r={sl.radius} fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
          <circle cx={0} cy={0} r={sl.radius * 0.8} fill="#FEFCE8" />
          <circle cx={-2.2} cy={-1} r="1" fill="#CA8A04" opacity="0.75" />
          <circle cx={2.2} cy={-1} r="1" fill="#CA8A04" opacity="0.75" />
          <circle cx={0} cy={2} r="1" fill="#CA8A04" opacity="0.75" />
        </g>
      ))}
    </g>
  );
}

// ── STRAWBERRY SVG LAYER ────────────────────────────────────
function StrawberryLayer({ slices }) {
  return (
    <g id="layer-strawberry">
      {slices.map((sl) => (
        <g key={sl.id} transform={`translate(${sl.x}, ${sl.y}) rotate(${sl.angle}) scale(${sl.scale})`}>
          <path
            d="M 0,-14 C 10,-14 14,0 0,16 C -14,0 -10,-14 0,-14 Z"
            fill="#450A0A"
            opacity="0.35"
            transform="translate(1, 2)"
          />
          <path d="M 0,-14 C 10,-14 14,0 0,16 C -14,0 -10,-14 0,-14 Z" fill="#DC2626" />
          <path d="M 0,-11 C 6.5,-11 9,0 0,11 C -9,0 -6.5,-11 0,-11 Z" fill="#F87171" />
          <path d="M 0,-8 C 3,-8 4,0 0,7 C -4,0 -3,-8 0,-8 Z" fill="#FEF2F2" opacity="0.8" />
          <circle cx="-5" cy="-2" r="0.7" fill="#FDE047" />
          <circle cx="5" cy="-2" r="0.7" fill="#FDE047" />
          <circle cx="-3" cy="5" r="0.7" fill="#FDE047" />
          <circle cx="3" cy="5" r="0.7" fill="#FDE047" />
          <circle cx="0" cy="1" r="0.7" fill="#FDE047" />
          <path d="M 0,-14 L -3,-18 L 0,-16 L 3,-18 Z" fill="#16A34A" />
        </g>
      ))}
    </g>
  );
}

// ── CORN SVG LAYER ──────────────────────────────────────────
function CornLayer({ kernels }) {
  return (
    <g id="layer-corn">
      {kernels.map((cn) => (
        <g key={cn.id} transform={`translate(${cn.x}, ${cn.y}) rotate(${cn.angle})`}>
          <ellipse cx={0.5} cy={1} rx={cn.rx} ry={cn.ry} fill="#B45309" opacity="0.35" />
          <ellipse cx={0} cy={0} rx={cn.rx} ry={cn.ry} fill="#FBBF24" />
          <ellipse cx={-1} cy={-1.5} rx={cn.rx * 0.45} ry={cn.ry * 0.45} fill="#FEF08A" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

// ── ALMOND SVG LAYER ────────────────────────────────────────
function AlmondLayer({ flakes }) {
  return (
    <g id="layer-almond">
      {flakes.map((al) => (
        <g key={al.id} transform={`translate(${al.x}, ${al.y}) rotate(${al.angle})`}>
          <ellipse cx={0.8} cy={1.2} rx={al.rx} ry={al.ry} fill="#78350F" opacity="0.3" />
          <ellipse cx={0} cy={0} rx={al.rx} ry={al.ry} fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />
          <ellipse cx={0} cy={0} rx={al.rx * 0.65} ry={al.ry * 0.75} fill="#FEF3C7" />
        </g>
      ))}
    </g>
  );
}
