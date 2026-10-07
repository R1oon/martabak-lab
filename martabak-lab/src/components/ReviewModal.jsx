// ============================================================
// ReviewModal — Final order recap before checkout
// Pure Procedural Vector Architecture (Zero External URLs)
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ShoppingBag, User } from 'lucide-react';
import { formatRupiah, calculateTotal, TOPPINGS } from '../data/martabakData';
import MartabakCanvas from './MartabakCanvas';

export default function ReviewModal({
  isOpen,
  onClose,
  onConfirm,
  customerName,
  selectedSize,
  selectedBase,
  placedToppings = [],
  selectedFinishings = [],
}) {
  const total = calculateTotal(selectedSize, selectedBase, placedToppings, selectedFinishings);

  // Aggregate toppings
  const toppingGroups = placedToppings.reduce((acc, pt) => {
    const topping = TOPPINGS.find((t) => t.id === (pt.toppingId || pt.id));
    if (!topping) return acc;
    const key = topping.id;
    if (acc[key]) acc[key].count++;
    else acc[key] = { ...topping, count: 1 };
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-700/60 rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl pointer-events-auto relative overflow-hidden max-h-[90dvh] overflow-y-auto overscroll-contain">
              {/* Top decorative gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-t-3xl" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 text-stone-400 hover:text-white transition-colors p-2.5 rounded-xl hover:bg-stone-800/80 active:bg-stone-800 touch-manipulation cursor-pointer"
                title="Tutup modal"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="text-center mb-4">
                {/* Customer Name Callout */}
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-3.5 py-1 mb-2 shadow-sm">
                  <User size={13} className="text-amber-400" />
                  <span className="text-amber-200 text-xs font-semibold">
                    Pesanan untuk: <span className="text-white font-bold">{customerName || 'Sobat Martabak'}</span>
                  </span>
                </div>
                <h2 className="text-xl font-black text-white">Konfirmasi Kreasi Martabak</h2>
                <p className="text-stone-400 text-xs mt-0.5">Cek tampilan visual & rincian pesananmu</p>
              </div>

              {/* Pure Vector Visual Preview (100% Identik dengan Kanvas Utama) */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 1.5, -1.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[190px] h-[190px] flex items-center justify-center overflow-hidden rounded-full shadow-2xl bg-stone-950/60 border border-stone-800"
                >
                  <div style={{ transform: 'scale(0.55)', transformOrigin: 'center center' }} className="flex-shrink-0">
                    <MartabakCanvas
                      base={selectedBase}
                      size={selectedSize}
                      placedToppings={placedToppings}
                      finishings={selectedFinishings}
                      readOnly
                    />
                  </div>
                </motion.div>
              </div>

              {/* Order specifications card */}
              <div className="bg-stone-850/80 rounded-2xl p-4 border border-stone-800 mb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 pb-3 border-b border-stone-800">
                  <div>
                    <p className="text-stone-400 text-[11px] font-medium uppercase tracking-wider">Ukuran</p>
                    <p className="text-stone-100 font-bold text-sm mt-0.5">{selectedSize?.label ?? '—'}</p>
                    <p className="text-amber-400 text-xs font-semibold">{formatRupiah(selectedSize?.price ?? 0)}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-[11px] font-medium uppercase tracking-wider">Adonan</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: selectedBase?.color }}
                      />
                      <p className="text-stone-100 font-bold text-sm">{selectedBase?.label ?? '—'}</p>
                    </div>
                    <p className="text-stone-400 text-xs">
                      {selectedBase?.price === 0 ? 'Termasuk' : `+${formatRupiah(selectedBase?.price ?? 0)}`}
                    </p>
                  </div>
                </div>

                {/* Toppings */}
                {Object.values(toppingGroups).length > 0 && (
                  <div className="pb-3 border-b border-stone-800">
                    <p className="text-stone-400 text-[11px] font-medium uppercase tracking-wider mb-2">
                      Varian Topping ({placedToppings.length} taburan)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(toppingGroups).map((t) => (
                        <span
                          key={t.id}
                          className="inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-full pl-2 pr-2.5 py-1 text-xs text-stone-200"
                        >
                          <div
                            className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0 shadow-sm"
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
                  <div>
                    <p className="text-stone-400 text-[11px] font-medium uppercase tracking-wider mb-2">
                      Olesan & Taburan Akhir
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFinishings.map((f) => (
                        <span
                          key={f.id}
                          className="inline-flex items-center gap-1.5 bg-stone-800 border border-stone-700 rounded-full px-2.5 py-1 text-xs text-stone-300"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                          {f.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-2xl px-4 py-3 mb-5">
                <div>
                  <span className="text-stone-300 font-semibold text-xs block">Total Pembayaran</span>
                  <span className="text-stone-400 text-[11px]">Harga otomatis terhitung</span>
                </div>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="text-amber-400 font-black text-xl"
                >
                  {formatRupiah(total)}
                </motion.span>
              </div>

              {/* Action buttons (48px Touch Accessible) */}
              <div className="flex gap-3 pt-1">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-750 active:bg-stone-700 text-stone-300 font-semibold py-3 px-4 rounded-xl text-sm border border-stone-700 transition-colors touch-manipulation cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Kembali
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 min-h-[48px] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:from-amber-600 active:to-yellow-500 text-amber-950 font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-amber-500/25 transition-all touch-manipulation cursor-pointer"
                >
                  <ShoppingBag size={16} />
                  Pesan Sekarang!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
