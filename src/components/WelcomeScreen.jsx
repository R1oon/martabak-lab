// ============================================================
// WelcomeScreen — Hero landing page of Martabak Lab
// 1. High-Res Procedural Vector Showcase + Dice Randomizer
// 2. Cinematic Full-View Bite Transition (Fixed Inset-0, Massive 440px Native View)
//    - Zero Blurry: Native 440px Physical Dimensions + geometricPrecision
//    - Zero Lag: Static SVG Mask Opacity Toggle + GPU Hardware Acceleration
//    - Durasi Sinematik 2.5 Detik:
//      * 0.0 - 0.6s: Dramatic Full-View Zoom In & Spotlight Focus
//      * 0.6 - 1.8s: Rhythmic Bites (1, 2, 3, 4) + Unobstructed Comic Popups
//      * 1.8 - 2.2s: Subtle Pop & Dispersing Crumbs
//      * 2.2 - 2.5s: Cinematic Soft Fade-Out to Studio Builder
// ============================================================
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Sparkles, Star, User, Dices } from 'lucide-react';
import MartabakCanvas from './MartabakCanvas';
import { generateRandomShowcase } from '../data/martabakData';

// Easing cubic-bezier(0.25, 1, 0.5, 1) untuk animasi ultra-halus 60 FPS
const SMOOTH_EASE = [0.25, 1, 0.5, 1];

export default function WelcomeScreen({ onStart }) {
  const [name, setName] = useState('');

  // ── 1. RANDOM SHOWCASE STATE ──────────────────────────────
  // Otomatis acak setiap kali komponen dimuat / halaman dibuka
  const [showcase, setShowcase] = useState(() => generateRandomShowcase());
  const [showcaseKey, setShowcaseKey] = useState(0);
  const [isRollingDice, setIsRollingDice] = useState(false);

  // ── 2. ANIMASI GIGIT (BITE-EAT TRANSITION) STATE ──────────
  const [isBiting, setIsBiting] = useState(false);
  const [biteStep, setBiteStep] = useState(0); // 0: utuh, 1: gigitan 1, 2: gigitan 2, 3: gigitan 3, 4: habis
  const [crumbs, setCrumbs] = useState([]);
  const [biteText, setBiteText] = useState(null);
  const [isTransitioningToBuilder, setIsTransitioningToBuilder] = useState(false);

  // Freeze / memoize visual martabak saat transisi dimulai agar 0 re-render
  const frozenShowcase = useMemo(
    () => showcase,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isBiting ? 'locked' : showcaseKey]
  );

  // Track timeouts untuk cleanup
  const timeoutsRef = useRef([]);
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Handler acak kreasi martabak
  const handleRandomize = useCallback(() => {
    if (isBiting) return;
    setIsRollingDice(true);
    setTimeout(() => setIsRollingDice(false), 550);
    setShowcase(generateRandomShowcase());
    setShowcaseKey((k) => k + 1);
  }, [isBiting]);

  // Helper partikel remahan bertebaran keluar (Hardware Accelerated)
  const spawnCrumbs = useCallback((originX, originY, count = 16, baseColor = '#D97706') => {
    const newCrumbs = [];
    const crumbPalette = [
      baseColor,
      '#92400E', // kerak cokelat
      '#78350F', // pinggiran renyah
      '#3E2723', // meises cokelat
      '#FDE047', // keju cheddar
      '#EC4899', // sprinkles pink
      '#10B981', // sprinkles hijau
      '#FFFFFF', // gula / krim
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 120;
      const targetX = originX + Math.cos(angle) * distance;
      const targetY = originY + Math.sin(angle) * distance + (Math.random() * 50); // gravitasi lembut
      newCrumbs.push({
        id: `crumb-${Date.now()}-${i}-${Math.random()}`,
        startX: originX,
        startY: originY,
        targetX,
        targetY,
        size: 5 + Math.random() * 7.5,
        color: crumbPalette[Math.floor(Math.random() * crumbPalette.length)],
        rotate: Math.random() * 360,
      });
    }
    setCrumbs((prev) => [...prev, ...newCrumbs]);
  }, []);

  // ── SEKUENS TRANSISI SINEMATIK MASIF (Total 2.5 Detik) ────
  const startBiteEatSequence = useCallback(() => {
    if (isBiting) return;
    setIsBiting(true);

    const customerName = name.trim() || 'Sobat Martabak';
    const baseColor = frozenShowcase.base.color;

    // Detik 0.0 - 0.6s: Dramatic Zoom In ke Full-View Overlay
    // Detik 0.6s: GIGITAN 1 (Sudut Kanan Atas) -> Teks di Kiri Atas (Tidak Menutupi Gigitan)
    const t1 = setTimeout(() => {
      setBiteStep(1);
      spawnCrumbs(110, -100, 16, baseColor);
      setBiteText({
        text: 'HAP! 😋',
        style: { top: '-52px', left: '8%' },
        rot: -5,
        key: 1,
      });
    }, 600);

    // Detik 1.0s: GIGITAN 2 (Sisi Kiri) -> Teks di Kanan Atas
    const t2 = setTimeout(() => {
      setBiteStep(2);
      spawnCrumbs(-135, 10, 18, baseColor);
      setBiteText({
        text: 'KRUNCH! 🥞',
        style: { top: '-52px', right: '8%' },
        rot: 5,
        key: 2,
      });
    }, 1000);

    // Detik 1.4s: GIGITAN 3 (Bawah & Tengah) -> Teks di Atas Tengah
    const t3 = setTimeout(() => {
      setBiteStep(3);
      spawnCrumbs(10, 125, 20, baseColor);
      setBiteText({
        text: 'NYAM NYAM! ✨',
        style: { top: '-52px', left: '50%', transform: 'translateX(-50%)' },
        rot: 0,
        key: 3,
      });
    }, 1400);

    // Detik 1.8s: GIGITAN 4 (Habis Terlahap Sempurna + Subtle Pop)
    const t4 = setTimeout(() => {
      setBiteStep(4);
      spawnCrumbs(0, 0, 32, baseColor);
      setBiteText({
        text: 'HABIS TERLAHAP! 🎉',
        style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        rot: 0,
        key: 4,
      });
    }, 1800);

    // Detik 2.2s: Fade-out Lembut Dimulai
    const t5 = setTimeout(() => {
      setIsTransitioningToBuilder(true);
    }, 2200);

    // Detik 2.5s: Masuk ke Studio Builder
    const t6 = setTimeout(() => {
      onStart(customerName);
    }, 2500);

    timeoutsRef.current = [t1, t2, t3, t4, t5, t6];
  }, [isBiting, name, frozenShowcase.base.color, spawnCrumbs, onStart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    startBiteEatSequence();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-yellow-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Floating star decorations */}
      {[
        { top: '12%', left: '8%', size: 16, delay: 0 },
        { top: '20%', right: '10%', size: 12, delay: 1 },
        { top: '70%', left: '5%', size: 10, delay: 2 },
        { bottom: '15%', right: '8%', size: 14, delay: 0.5 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/50 pointer-events-none"
          style={pos}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: pos.delay }}
        >
          <Star size={pos.size} fill="currentColor" />
        </motion.div>
      ))}

      <div className="text-center max-w-lg mx-auto w-full relative z-10">
        {/* ── SHOWCASE MARTABAK (TAMPILAN NORMAL HERO SEBELUM TRANSISI) ── */}
        <div className="flex flex-col items-center justify-center mb-5 relative select-none">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-orange-500/25 rounded-full blur-3xl pointer-events-none scale-95 opacity-70" />

          {/* Canvas Wrapper Normal View (260px Native) */}
          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[260px] h-[260px] flex items-center justify-center overflow-visible relative will-change-transform transform-gpu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`martabak-hero-${showcaseKey}`}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1.0, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="flex-shrink-0 drop-shadow-2xl"
              >
                <MartabakCanvas
                  base={showcase.base}
                  size={showcase.size}
                  placedToppings={showcase.placedToppings}
                  finishings={showcase.finishings}
                  readOnly
                  showSubInfo={false}
                  sizePx={260}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Tombol Acak Kreasi 🎲 & Detail Kombinasi */}
          <div className="flex flex-col items-center gap-2 mt-4 z-20">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomize}
              className="group inline-flex items-center gap-2 bg-stone-900/90 hover:bg-stone-850 text-amber-300 hover:text-amber-200 border border-amber-500/35 hover:border-amber-400/70 rounded-full px-4 py-1.5 text-xs font-bold shadow-lg shadow-amber-950/40 transition-all cursor-pointer backdrop-blur-md"
              title="Klik untuk acak kombinasi rasa martabak"
            >
              <motion.div
                animate={{ rotate: isRollingDice ? 360 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <Dices size={15} className="text-amber-400 group-hover:rotate-45 transition-transform" />
              </motion.div>
              <span>Acak Kreasi 🎲</span>
            </motion.button>

            {/* Label Kombinasi Terpilih */}
            <motion.div
              key={`label-${showcaseKey}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 text-[11px] text-stone-300 bg-stone-900/75 border border-stone-800 rounded-full px-3.5 py-1 shadow-sm max-w-sm flex-wrap justify-center text-center backdrop-blur-sm"
            >
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                  style={{ backgroundColor: showcase.base.color }}
                />
                {showcase.base.label}
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-300 font-medium">{showcase.spreadLabel}</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-400">{showcase.toppingsLabel}</span>
            </motion.div>
          </div>
        </div>

        {/* ── BAGIAN FORM & KONTEN HERO ── */}
        <div className="relative">
          {/* Badge Studio */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-3 shadow-sm">
            <ChefHat size={14} className="text-amber-400" />
            <span className="text-amber-300 text-sm font-medium tracking-wide">Studio Peracik Martabak Interaktif</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
            Martabak
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Lab ✦
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-sm sm:text-base mb-5 leading-relaxed">
            Rancang martabak impianmu sendiri — pilih ukuran, pilih rasa,<br />
            <span className="text-amber-300 font-semibold">taburkan topping sesukamu!</span>
          </p>

          {/* Form Input Nama Pemesan */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto mb-5 text-left"
          >
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 pl-1">
              Nama Pemesan
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-amber-400/80">
                <User size={18} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth. Budi si Pencinta Manis"
                className="w-full bg-stone-900/90 border border-stone-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-white placeholder-stone-500 text-sm rounded-xl pl-11 pr-4 py-3 transition-all outline-none shadow-inner"
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1.5 pl-1">
              Nama akan dicetak di tiket pesanan dan nota akhir
            </p>
          </form>

          {/* CTA Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={startBiteEatSequence}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-extrabold text-base sm:text-lg px-9 py-3.5 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform text-amber-950" />
            Mulai Merakit
            <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-7">
            {['8 Topping Pilihan', 'Visual Realtime', 'Harga Otomatis', '5 Rasa Adonan'].map((feat) => (
              <span
                key={feat}
                className="text-xs bg-white/5 border border-white/10 text-stone-400 rounded-full px-3 py-1"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. FULL VIEW IMMERSIVE BITE TRANSITION OVERLAY (FIXED INSET-0 Z-50) ── */}
      <AnimatePresence>
        {isBiting && (
          <motion.div
            key="bite-fullview-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: SMOOTH_EASE }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950/90 backdrop-blur-2xl px-4 select-none will-change-transform transform-gpu"
          >
            {/* Ambient Massive Spotlight Glow */}
            <div className="absolute w-[min(92vw,540px)] h-[min(92vw,540px)] bg-gradient-to-r from-amber-500/35 via-yellow-400/25 to-orange-500/30 rounded-full blur-3xl pointer-events-none scale-125 opacity-90" />

            {/* Container Martabak Skala Masif (min(85vw, 440px) Fisik Native Tajam) */}
            <motion.div
              initial={{ scale: 0.72, opacity: 0, y: 20 }}
              animate={{
                scale:
                  biteStep === 4
                    ? [1.0, 1.08, 0] // subtle pop lalu lenyap
                    : 1.0,
                opacity: biteStep === 4 ? [1, 1, 0] : 1,
                y: 0,
                rotate:
                  biteStep === 1
                    ? [-3.5, 4, -2, 0]
                    : biteStep === 2
                    ? [4, -4, 2, 0]
                    : biteStep === 3
                    ? [-3, 3, 0]
                    : biteStep === 4
                    ? [0, 2, -2, 0]
                    : 0,
              }}
              transition={{
                scale:
                  biteStep === 4
                    ? { duration: 0.45, ease: 'easeOut' }
                    : { duration: 0.6, ease: SMOOTH_EASE },
                opacity: { duration: biteStep === 4 ? 0.45 : 0.4 },
                y: { duration: 0.6, ease: SMOOTH_EASE },
                rotate: { duration: 0.35, ease: 'easeOut' },
              }}
              className="w-[min(85vw,440px)] h-[min(85vw,440px)] relative flex items-center justify-center will-change-transform transform-gpu flex-shrink-0"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Martabak Canvas Full Resolution Native */}
              <div className="w-full h-full flex items-center justify-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                <MartabakCanvas
                  base={frozenShowcase.base}
                  size={frozenShowcase.size}
                  placedToppings={frozenShowcase.placedToppings}
                  finishings={frozenShowcase.finishings}
                  readOnly
                  showSubInfo={false}
                  biteStep={biteStep}
                  sizePx="100%"
                />
              </div>

              {/* Partikel Remahan (Crumbs Burst Masif) */}
              {crumbs.map((crumb) => (
                <motion.div
                  key={crumb.id}
                  initial={{
                    x: crumb.startX,
                    y: crumb.startY,
                    scale: 0.8,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: crumb.targetX,
                    y: crumb.targetY,
                    scale: [0.8, 1.35, 0.2],
                    opacity: [1, 1, 0],
                    rotate: crumb.rotate,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: 'easeOut',
                  }}
                  className="absolute rounded-sm pointer-events-none z-30"
                  style={{
                    width: `${crumb.size}px`,
                    height: `${crumb.size}px`,
                    backgroundColor: crumb.color,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                  }}
                />
              ))}

              {/* Comic Floating Text Callout (Posisi Proporsional di Luar Area Gigitan) */}
              <AnimatePresence>
                {biteText && (
                  <motion.div
                    key={biteText.key}
                    initial={{ opacity: 0, scale: 0.35, y: 15 }}
                    animate={{ opacity: 1, scale: [0.35, 1.25, 1.05], y: 0, rotate: biteText.rot }}
                    exit={{ opacity: 0, scale: 0.7, y: -20 }}
                    transition={{ duration: 0.32, ease: SMOOTH_EASE }}
                    className="absolute z-50 pointer-events-none font-black text-amber-300 drop-shadow-[0_6px_20px_rgba(0,0,0,0.95)] text-xl sm:text-2xl tracking-wider select-none bg-stone-900/95 border-2 border-amber-400 rounded-full px-6 py-2 shadow-2xl whitespace-nowrap"
                    style={{
                      ...biteText.style,
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)',
                    }}
                  >
                    {biteText.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Sub-indikator status teks sinematik */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-amber-200/80 text-xs sm:text-sm font-semibold tracking-wide mt-8 text-center"
            >
              🥞 Sedang mencicipi kreasi martabak spesial...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CINEMATIC SOFT FADE-OUT OVERLAY (DETIK 2.2 - 2.5) ── */}
      <motion.div
        initial={false}
        animate={{ opacity: isTransitioningToBuilder ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 bg-stone-950 pointer-events-none z-[60]"
      />
    </div>
  );
}
