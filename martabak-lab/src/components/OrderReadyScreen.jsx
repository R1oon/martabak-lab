// ============================================================
// OrderReadyScreen — Final success screen with order number
// Pure Procedural Vector Architecture (Zero External URLs)
// ============================================================
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Star, CheckCircle2, User } from 'lucide-react';
import { formatRupiah, calculateTotal, TOPPINGS } from '../data/martabakData';
import MartabakCanvas from './MartabakCanvas';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } },
};

// Celebratory particle burst
const ConfettiPiece = ({ particle }) => (
  <motion.div
    className="absolute rounded-sm pointer-events-none"
    style={{
      left: particle.left,
      top: '-12px',
      backgroundColor: particle.color,
      width: particle.width,
      height: particle.height,
    }}
    animate={{
      y: '105vh',
      x: particle.xOffset,
      rotate: particle.rotation,
      opacity: [1, 1, 0],
    }}
    transition={{ duration: particle.duration, ease: 'easeOut', delay: particle.delay }}
  />
);

export default function OrderReadyScreen({
  orderNumber,
  customerName,
  selectedSize,
  selectedBase,
  placedToppings = [],
  selectedFinishings = [],
  onReset,
}) {
  const total = calculateTotal(selectedSize, selectedBase, placedToppings, selectedFinishings);

  const toppingGroups = placedToppings.reduce((acc, pt) => {
    const topping = TOPPINGS.find((t) => t.id === (pt.toppingId || pt.id));
    if (!topping) return acc;
    const key = topping.id;
    if (acc[key]) acc[key].count++;
    else acc[key] = { ...topping, count: 1 };
    return acc;
  }, {});

  const confettiParticles = useMemo(() => {
    const confettiColors = ['#FBBF24', '#F472B6', '#34D399', '#60A5FA', '#A78BFA', '#F87171'];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${4 + ((i * 17) % 92)}%`,
      color: confettiColors[i % confettiColors.length],
      width: 6 + ((i * 3) % 7),
      height: 6 + ((i * 5) % 8),
      xOffset: (i % 2 === 0 ? 1 : -1) * (20 + ((i * 13) % 120)),
      rotation: (i * 137) % 720,
      duration: 1.8 + ((i * 0.12) % 1.2),
      delay: (i * 0.04) % 0.6,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Confetti */}
      {confettiParticles.map((particle) => (
        <ConfettiPiece key={particle.id} particle={particle} />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="text-center max-w-sm mx-auto z-10 w-full"
      >
        {/* Success badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-4 py-1.5 shadow-sm">
            <CheckCircle2 size={14} className="text-green-400" />
            <span className="text-green-300 text-sm font-semibold">Pesanan Siap Disajikan!</span>
          </div>
        </motion.div>

        {/* Customer Name Callout */}
        <motion.div variants={itemVariants} className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 shadow-sm">
            <User size={14} className="text-amber-400" />
            <span className="text-amber-200 text-xs font-semibold">
              Pesanan untuk: <span className="text-white font-bold">{customerName || 'Sobat Martabak'}</span>
            </span>
          </div>
        </motion.div>

        {/* Order number */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-stone-400 text-xs uppercase tracking-widest mb-1 font-medium">Nomor Antrean Pesanan</p>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 drop-shadow-sm">
            {orderNumber}
          </h1>
        </motion.div>

        {/* Pure Vector Martabak Visual (100% Identik dengan Kanvas Utama) */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-[190px] h-[190px] flex items-center justify-center overflow-hidden rounded-full shadow-2xl bg-stone-950/60 border border-stone-800">
            <div style={{ transform: 'scale(0.55)', transformOrigin: 'center center' }} className="flex-shrink-0">
              <MartabakCanvas
                base={selectedBase}
                size={selectedSize}
                placedToppings={placedToppings}
                finishings={selectedFinishings}
                readOnly
              />
            </div>
          </div>
        </motion.div>

        {/* Order card */}
        <motion.div
          variants={itemVariants}
          className="bg-stone-850/80 border border-stone-800 rounded-2xl p-4 mb-4 text-left shadow-lg space-y-3"
        >
          {/* Pemesan info */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <p className="text-stone-400 text-xs">Pemesan</p>
              <p className="text-stone-100 font-bold">{customerName || 'Sobat Martabak'}</p>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-medium">
              Takeaway
            </span>
          </div>

          {/* Size & base */}
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <p className="text-stone-400 text-xs">Martabak Manis</p>
              <p className="text-stone-100 font-bold">{selectedSize?.label} — {selectedBase?.label}</p>
            </div>
            <div
              className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0 shadow-sm"
              style={{ backgroundColor: selectedBase?.color }}
            />
          </div>

          {/* Toppings */}
          {Object.values(toppingGroups).length > 0 && (
            <div className="pb-2 border-b border-stone-800">
              <p className="text-stone-400 text-xs mb-1.5">Varian Topping ({placedToppings.length} taburan)</p>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(toppingGroups).map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-full pl-2 pr-2 py-0.5 text-xs text-stone-200"
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0"
                      style={{ backgroundColor: t.color }}
                    />
                    <span>{t.label} ×{t.count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Finishings */}
          {selectedFinishings.length > 0 && (
            <div className="pb-2 border-b border-stone-800">
              <p className="text-stone-400 text-xs mb-1.5">Olesan & Taburan Akhir</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedFinishings.map((f) => (
                  <span
                    key={f.id}
                    className="inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-full px-2 py-0.5 text-xs text-stone-300"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-stone-400 text-sm font-semibold">Total Dibayar</span>
            <span className="text-amber-400 font-black text-xl">{formatRupiah(total)}</span>
          </div>
        </motion.div>

        {/* Stars rating decoration */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-1 mb-4"
        >
          {[1,2,3,4,5].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              <Star size={18} className="text-amber-400 fill-amber-400 drop-shadow-sm" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="text-stone-300 text-sm mb-6">
          Selamat menikmati martabak spesial racikanmu! 🥞✨
        </motion.p>

        {/* Reset button */}
        <motion.button
          variants={itemVariants}
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-bold py-3.5 rounded-2xl text-base shadow-lg shadow-amber-500/25 transition-all"
        >
          <RotateCcw size={18} />
          Rakit Martabak Baru
        </motion.button>
      </motion.div>
    </div>
  );
}
