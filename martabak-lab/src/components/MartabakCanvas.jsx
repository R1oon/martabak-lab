// ============================================================
// src/components/MartabakCanvas.jsx
// Pure Procedural Vector SVG Martabak Canvas (Top-Down View)
// Olesan Saus Merata, Taburan Sprinkles Acak, Bersih & Full Bahasa Indonesia
// ============================================================
import { useRef, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToppingOverlay from './ToppingOverlay';
import { generateRainbowSprinkles } from '../data/martabakData';

function MartabakCanvas({
  base,
  size,
  placedToppings = [],
  finishings = [],
  onDropTopping,
  onRemoveTopping: _onRemoveTopping,
  isDragOver = false,
  setIsDragOver,
  readOnly = false,
  showSubInfo = true,
  biteStep = 0,
  sizePx = null,
}) {
  const containerRef = useRef(null);

  // SVG ID prefix to prevent clashes when multiple instances are rendered simultaneously
  const idPrefix = readOnly ? 'preview' : 'canvas';

  // Canvas geometry constants (Top-Down Circular View)
  const CANVAS_SIZE = 340;
  const CENTER = CANVAS_SIZE / 2; // 170
  const CRUST_THICKNESS = 12; // 12px crunchy baked crust as requested
  const BASE_RADIUS = 138;
  const DOUGH_RADIUS = BASE_RADIUS - CRUST_THICKNESS; // 126px
  const SPREAD_RADIUS = DOUGH_RADIUS - 8; // 118px olesan saus merata
  const SAFE_TOPPING_RADIUS = DOUGH_RADIUS - 12; // 114px safe radius taburan

  // Reactive base color
  const baseColor = base?.color || '#D97706';
  const baseColorDark = base?.colorDark || '#92400E';
  const scale = size?.scale ?? 1.0;

  // Cek apakah martabak sudah mulai diisi (topping atau saus/olesan)
  const hasItems = placedToppings.length > 0 || finishings.length > 0;

  // Pisahkan jenis finishing: spread (olesan saus) vs flakes/sprinkles (taburan)
  const spreads = useMemo(
    () => finishings.filter((f) => f.type === 'spread' || f.type === 'sauce' || f.id === 'condensed_milk'),
    [finishings]
  );
  const sprinklesAndFlakes = useMemo(
    () => finishings.filter((f) => f.type === 'flakes' || f.type === 'sprinkles'),
    [finishings]
  );

  // Precompute rainbow sprinkles dengan sebaran acak alami murni (rejection sampling)
  const rainbowSprinkles = useMemo(
    () => generateRainbowSprinkles(SAFE_TOPPING_RADIUS),
    [SAFE_TOPPING_RADIUS]
  );

  // Precompute serpihan keju & kacang halus acak
  const cheeseFlakes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 42; i++) {
      const angle = (i * 137.5 * Math.PI) / 180 + (i % 5) * 0.3;
      const r = Math.sqrt((i + 0.5) / 42) * SAFE_TOPPING_RADIUS * 0.92;
      arr.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        rot: (i * 47) % 180,
      });
    }
    return arr;
  }, [SAFE_TOPPING_RADIUS]);

  // HTML5 Drag & Drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!isDragOver && setIsDragOver) setIsDragOver(true);
  }, [isDragOver, setIsDragOver]);

  const handleDragLeave = useCallback((e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      if (setIsDragOver) setIsDragOver(false);
    }
  }, [setIsDragOver]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (setIsDragOver) setIsDragOver(false);
    const toppingId = e.dataTransfer.getData('toppingId');
    if (toppingId && onDropTopping) {
      onDropTopping(toppingId);
    }
  }, [onDropTopping, setIsDragOver]);

  // Generate varied organic honeycomb pore clusters
  const honeycombPores = useMemo(() => {
    const pores = [];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const r = 24 + ((i * 7) % 20);
      pores.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, r: 1.8 + (i % 3) * 0.7 });
    }
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2 + 0.1;
      const r = 52 + ((i * 11) % 28);
      pores.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, r: 1.5 + (i % 4) * 0.8 });
    }
    for (let i = 0; i < 44; i++) {
      const angle = (i / 44) * Math.PI * 2 + 0.2;
      const r = 84 + ((i * 13) % 24);
      pores.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, r: 1.4 + (i % 3) * 0.6 });
    }
    return pores;
  }, []);

  return (
    <div className={readOnly ? "relative flex items-center justify-center select-none flex-shrink-0" : "flex flex-col items-center gap-4 w-full"}>
      {/* ── Loyang Panggangan / Hotplate ── */}
      <motion.div
        ref={readOnly ? null : containerRef}
        onDragOver={readOnly ? undefined : handleDragOver}
        onDragLeave={readOnly ? undefined : handleDragLeave}
        onDrop={readOnly ? undefined : handleDrop}
        animate={{ scale: (!readOnly && isDragOver) ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative flex items-center justify-center rounded-full select-none max-w-full aspect-square"
        style={{
          width: sizePx ? (typeof sizePx === 'number' ? `${sizePx}px` : sizePx) : 'min(100%, 340px)',
          height: sizePx ? (typeof sizePx === 'number' ? `${sizePx}px` : sizePx) : 'min(100%, 340px)',
        }}
      >
        {/* Drop zone highlight ring (interactive only) */}
        {!readOnly && (
          <AnimatePresence>
            {isDragOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400 pointer-events-none z-30"
                style={{
                  boxShadow: '0 0 25px rgba(251, 191, 36, 0.45)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-stone-900/90 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400 shadow-md">
                    ✨ Lepaskan Topping di Sini!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* ── Kanvas Utama SVG Murni Resolusi Tinggi ── */}
        <motion.svg
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          width="100%"
          height="100%"
          viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          className="drop-shadow-2xl overflow-visible w-full h-full"
        >
          <defs>
            {/* 1. Hotplate Cast-Iron Gradient */}
            <radialGradient id={`${idPrefix}-pan-plate`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="70%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#0C0A09" />
            </radialGradient>

            {/* 2. Pinggiran Luar Renyah (Crust 12px) */}
            <radialGradient id={`${idPrefix}-crust-gradient`} cx="42%" cy="38%" r="60%">
              <stop offset="70%" stopColor="#B45309" />
              <stop offset="88%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#78350F" />
            </radialGradient>

            {/* 3. Permukaan Adonan (Reaktif ke Base Pilihan) */}
            <radialGradient id={`${idPrefix}-dough-gradient`} cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor={baseColor} stopOpacity="1" />
              <stop offset="75%" stopColor={baseColor} stopOpacity="0.96" />
              <stop offset="100%" stopColor={baseColorDark} stopOpacity="1" />
            </radialGradient>

            {/* 4. Tekstur Pori-Pori Sarang Semut Mikro */}
            <pattern
              id={`${idPrefix}-micro-honeycomb-pattern`}
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2.5" cy="2.5" r="1.1" fill="#000000" opacity="0.22" />
              <circle cx="7" cy="7" r="1.3" fill="#000000" opacity="0.28" />
              <circle cx="7.2" cy="7.2" r="0.5" fill="#FFFFFF" opacity="0.1" />
              <circle cx="2.5" cy="7" r="0.9" fill="#000000" opacity="0.18" />
              <circle cx="7" cy="2.5" r="0.9" fill="#000000" opacity="0.18" />
            </pattern>

            {/* 5. Kilau Mentega Wisman (Subtle Butter Sheen) */}
            <radialGradient id={`${idPrefix}-butter-gloss`} cx="36%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.26" />
              <stop offset="45%" stopColor="#FEF08A" stopOpacity="0.12" />
              <stop offset="80%" stopColor="#FEF08A" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* 6. Crust Shadow Filter */}
            <filter id={`${idPrefix}-crust-depth`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="rgba(0,0,0,0.45)" />
            </filter>

            {/* 7. Inner Dough Crease Shadow */}
            <radialGradient id={`${idPrefix}-inner-rim-shadow`} cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
            </radialGradient>

            {/* 8. Kilau Basah Olesan Saus (Glossy Wet Specular Highlight) */}
            <radialGradient id={`${idPrefix}-sauce-gloss`} cx="38%" cy="32%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Clip path permukaan lingkaran adonan */}
            <clipPath id={`${idPrefix}-dough-clip`}>
              <circle cx="0" cy="0" r={DOUGH_RADIUS} />
            </clipPath>

            {/* ── BITE MARKS MASK (Statis & 60 FPS Optimized dengan Toggle Opasitas) ── */}
            {biteStep > 0 && (
              <mask id={`${idPrefix}-bite-mask`}>
                {/* Latar putih: seluruh martabak awalnya utuh terlihat */}
                <rect x="-100" y="-100" width="540" height="540" fill="#FFFFFF" />

                {/* GIGITAN 1: Sudut kanan atas */}
                <g fill="#000000" opacity={biteStep >= 1 ? 1 : 0}>
                  <circle cx="265" cy="80" r="66" />
                  <circle cx="220" cy="60" r="50" />
                  <circle cx="290" cy="125" r="54" />
                  <circle cx="215" cy="105" r="44" />
                  {/* Lengkungan bekas gigi tajam */}
                  <circle cx="190" cy="85" r="16" />
                  <circle cx="205" cy="118" r="16" />
                  <circle cx="228" cy="150" r="16" />
                  <circle cx="258" cy="172" r="16" />
                </g>

                {/* GIGITAN 2: Sisi kiri */}
                <g fill="#000000" opacity={biteStep >= 2 ? 1 : 0}>
                  <circle cx="70" cy="175" r="70" />
                  <circle cx="105" cy="230" r="58" />
                  <circle cx="95" cy="115" r="54" />
                  <circle cx="145" cy="170" r="50" />
                  {/* Lengkungan bekas gigi tajam */}
                  <circle cx="152" cy="134" r="16" />
                  <circle cx="168" cy="170" r="16" />
                  <circle cx="150" cy="208" r="15" />
                  <circle cx="125" cy="242" r="15" />
                </g>

                {/* GIGITAN 3: Bawah dan tengah */}
                <g fill="#000000" opacity={biteStep >= 3 ? 1 : 0}>
                  <circle cx="170" cy="245" r="82" />
                  <circle cx="170" cy="165" r="72" />
                  <circle cx="220" cy="205" r="60" />
                  <circle cx="125" cy="115" r="55" />
                  {/* Lengkungan bekas gigi tajam */}
                  <circle cx="170" cy="110" r="20" />
                  <circle cx="132" cy="125" r="16" />
                  <circle cx="208" cy="125" r="16" />
                </g>

                {/* GIGITAN 4: Lenyap total sampai habis */}
                <rect x="-100" y="-100" width="540" height="540" fill="#000000" opacity={biteStep >= 4 ? 1 : 0} />
              </mask>
            )}
          </defs>

          {/* ── Lapisan Visual Terbuka / Ter-Masking Gigitan ── */}
          <g mask={biteStep > 0 ? `url(#${idPrefix}-bite-mask)` : undefined}>
            {/* ── Layer 0: Hotplate Wajan Martabak ── */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={BASE_RADIUS + 15}
              fill={`url(#${idPrefix}-pan-plate)`}
              stroke="#44403C"
              strokeWidth="3"
              filter="drop-shadow(0 14px 24px rgba(0,0,0,0.65))"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={BASE_RADIUS + 13}
              fill="none"
              stroke="#292524"
              strokeWidth="1.5"
            />

            <g transform={`translate(${CENTER}, ${CENTER})`}>
            {/* ── Layer 1: Pinggiran Luar Renyah (Crust 12px) ── */}
            <circle
              cx="0"
              cy="0"
              r={BASE_RADIUS}
              fill={`url(#${idPrefix}-crust-gradient)`}
              stroke="#5C2607"
              strokeWidth="1"
              filter={`url(#${idPrefix}-crust-depth)`}
            />
            <circle
              cx="0"
              cy="0"
              r={BASE_RADIUS - 2}
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              opacity="0.35"
            />

            {/* ── Layer 2: Area Tengah Adonan (Solid Color Reaktif) ── */}
            <motion.circle
              key={base?.id}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              cx="0"
              cy="0"
              r={DOUGH_RADIUS}
              fill={`url(#${idPrefix}-dough-gradient)`}
            />

            {/* ── Layer 3: Tekstur Pori-pori Sarang Semut & Kilau Mentega ── */}
            <g clipPath={`url(#${idPrefix}-dough-clip)`}>
              <rect
                x={-DOUGH_RADIUS}
                y={-DOUGH_RADIUS}
                width={DOUGH_RADIUS * 2}
                height={DOUGH_RADIUS * 2}
                fill={`url(#${idPrefix}-micro-honeycomb-pattern)`}
              />

              {honeycombPores.map((p, i) => (
                <g key={`pore-${i}`}>
                  <circle cx={p.x} cy={p.y} r={p.r} fill={baseColorDark} opacity="0.55" />
                  <circle cx={p.x - 0.3} cy={p.y - 0.4} r={p.r * 0.4} fill="#FFFFFF" opacity="0.12" />
                </g>
              ))}

              <circle cx="0" cy="0" r={DOUGH_RADIUS} fill={`url(#${idPrefix}-inner-rim-shadow)`} />
              <circle cx="0" cy="0" r={DOUGH_RADIUS} fill={`url(#${idPrefix}-butter-gloss)`} />

              {/* ── Layer 4: OLESAN SAUS MERATA (Sauce Spread seperti saus pizza) ── */}
              <AnimatePresence>
                {spreads.map((spread) => (
                  <motion.g
                    key={spread.id}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  >
                    <SauceSpreadLayer spread={spread} radius={SPREAD_RADIUS} idPrefix={idPrefix} />
                  </motion.g>
                ))}
              </AnimatePresence>

              {/* ── Layer 5: TOPPING PROCEDURAL (Menempel di atas olesan) ── */}
              <ToppingOverlay
                activeToppings={placedToppings}
                safeRadius={SAFE_TOPPING_RADIUS}
              />

              {/* ── Layer 6: TABURAN AKHIR (Sprinkles Warna-warni & Flakes) ── */}
              <AnimatePresence>
                {sprinklesAndFlakes.map((f) => (
                  <motion.g
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  >
                    {f.id === 'sprinkles' && (
                      <RainbowSprinklesLayer sprinkles={rainbowSprinkles} />
                    )}
                    {f.id === 'cheese_flakes' && (
                      <CheeseFlakesLayer flakes={cheeseFlakes} />
                    )}
                    {f.id === 'crushed_peanut' && (
                      <CrushedPeanutLayer flakes={cheeseFlakes} />
                    )}
                  </motion.g>
                ))}
              </AnimatePresence>
            </g>
          </g>
        </g>
      </motion.svg>

        {/* ── Layer 7: Badge Panduan Melayang (HANYA MUNCUL SAAT KOSONG) ── */}
        {!readOnly && !hasItems && !isDragOver && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-stone-900/85 backdrop-blur-md border border-stone-700/80 text-amber-200 text-[11px] font-medium px-4 py-1.5 rounded-full shadow-lg pointer-events-none flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="text-amber-400">✨</span>
            <span>Tarik topping ke martabak atau klik (+) untuk mulai meracik</span>
          </motion.div>
        )}
      </motion.div>

      {/* ── Sub-info: Ukuran & Adonan Terpilih ── */}
      {!readOnly && showSubInfo && (
        <div className="flex items-center gap-3 text-xs bg-stone-900/90 border border-stone-800 rounded-full px-4 py-1.5 shadow-md">
          <span className="flex items-center gap-1.5 text-stone-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {size?.label} ({size?.diameter || '26 cm'})
          </span>
          <span className="text-stone-600">•</span>
          <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/20"
              style={{ backgroundColor: baseColor }}
            />
            {base?.label}
          </span>
          {placedToppings.length > 0 && (
            <>
              <span className="text-stone-600">•</span>
              <span className="text-stone-400 font-medium">
                {placedToppings.length} Topping Terpilih
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── OLESAN SAUS MERATA (Sauce Spread Layer) ─────────────────
function SauceSpreadLayer({ spread, radius, idPrefix = 'canvas' }) {
  // Warna gradasi saus olesan
  const isSKM = spread.id === 'condensed_milk';
  const isChoco = spread.id === 'chocolate_sauce';
  const isCaramel = spread.id === 'caramel_sauce';
  const isStrawberry = spread.id === 'strawberry_sauce';
  const isMatcha = spread.id === 'matcha_sauce';

  const fillColor = isSKM
    ? '#FFFBEB'
    : isChoco
    ? '#381608'
    : isCaramel
    ? '#B45309'
    : isStrawberry
    ? '#BE123C'
    : isMatcha
    ? '#15803D'
    : spread.color;

  const edgeColor = isSKM
    ? '#FEF08A'
    : isChoco
    ? '#200C04'
    : isCaramel
    ? '#78350F'
    : isStrawberry
    ? '#881337'
    : isMatcha
    ? '#14532D'
    : spread.colorDeep || spread.color;

  const gradId = `${idPrefix}-spread-grad-${spread.id}`;

  return (
    <g id={`sauce-${spread.id}`}>
      <defs>
        <radialGradient id={gradId} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor={fillColor} stopOpacity={isSKM ? 0.72 : 0.8} />
          <stop offset="78%" stopColor={fillColor} stopOpacity={isSKM ? 0.68 : 0.76} />
          <stop offset="93%" stopColor={edgeColor} stopOpacity={isSKM ? 0.5 : 0.65} />
          <stop offset="100%" stopColor={edgeColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Lapisan olesan saus melingkar merata */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill={`url(#${gradId})`}
      />

      {/* Tekstur tepian olesan organik/sendok perata */}
      <circle
        cx="0"
        cy="0"
        r={radius * 0.94}
        fill="none"
        stroke={edgeColor}
        strokeWidth="3.5"
        strokeDasharray="18 10 24 12"
        opacity="0.32"
      />

      {/* Efek kilau basah mengilap (Glossy Specular Sheen) */}
      <circle
        cx="0"
        cy="0"
        r={radius * 0.96}
        fill={`url(#${idPrefix}-sauce-gloss)`}
      />
    </g>
  );
}

// ── TABURAN SPRINKLES WARNA-WARNI (80-120 Butir Acak Murni) 
function RainbowSprinklesLayer({ sprinkles }) {
  return (
    <g id="layer-rainbow-sprinkles">
      {sprinkles.map((sp) => (
        <g key={sp.id} transform={`translate(${sp.x}, ${sp.y}) rotate(${sp.angle})`}>
          {/* Bayangan halus taburan */}
          <rect
            x={-sp.length / 2 + 0.4}
            y={-sp.width / 2 + 0.8}
            width={sp.length}
            height={sp.width}
            rx={sp.width / 2}
            fill="#000000"
            opacity="0.35"
          />
          {/* Silinder mini warna-warni */}
          <rect
            x={-sp.length / 2}
            y={-sp.width / 2}
            width={sp.length}
            height={sp.width}
            rx={sp.width / 2}
            fill={sp.color}
          />
          {/* Kilau putih atas */}
          <rect
            x={-sp.length / 2 + 1.2}
            y={-sp.width / 2 + 0.3}
            width={sp.length - 2.4}
            height={sp.width * 0.4}
            rx="0.4"
            fill="#FFFFFF"
            opacity="0.55"
          />
        </g>
      ))}
    </g>
  );
}

// ── SERPIHAN KEJU KERING (Cheese Flakes Scatter) ────────────
function CheeseFlakesLayer({ flakes }) {
  return (
    <g id="layer-cheese-flakes">
      {flakes.map((fl, i) => (
        <rect
          key={i}
          x={fl.x - 3}
          y={fl.y - 1.2}
          width="6"
          height="2.4"
          rx="1.2"
          fill="#FCD34D"
          transform={`rotate(${fl.rot} ${fl.x} ${fl.y})`}
          opacity="0.8"
        />
      ))}
    </g>
  );
}

// ── KACANG HALUS (Crushed Peanut Flakes Scatter) ─────────────
function CrushedPeanutLayer({ flakes }) {
  return (
    <g id="layer-crushed-peanut">
      {flakes.map((fl, i) => (
        <ellipse
          key={i}
          cx={fl.x}
          cy={fl.y}
          rx="2.6"
          ry="1.8"
          fill="#B45309"
          transform={`rotate(${fl.rot} ${fl.x} ${fl.y})`}
          opacity="0.8"
        />
      ))}
    </g>
  );
}

export default memo(MartabakCanvas);
