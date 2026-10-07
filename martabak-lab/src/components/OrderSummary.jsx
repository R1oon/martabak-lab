// ============================================================
// OrderSummary — Sticky right panel with realtime pricing
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { formatRupiah, calculateTotal, TOPPINGS } from '../data/martabakData';

const PriceLine = ({ label, amount, highlight = false, isTotal = false }) => (
  <div className={`flex items-center justify-between ${isTotal ? 'pt-2 mt-2 border-t border-stone-700' : ''}`}>
    <span className={`text-xs ${isTotal ? 'font-bold text-stone-200' : 'text-stone-400'}`}>
      {label}
    </span>
    <motion.span
      key={amount}
      initial={{ scale: 1.2, color: '#FBBF24' }}
      animate={{ scale: 1, color: highlight || isTotal ? '#FCD34D' : '#A8A29E' }}
      transition={{ duration: 0.4 }}
      className={`text-xs font-bold ${isTotal ? 'text-base text-amber-400' : ''}`}
    >
      {formatRupiah(amount)}
    </motion.span>
  </div>
);

export default function OrderSummary({
  selectedSize,
  selectedBase,
  placedToppings,
  selectedFinishings,
  onCheckout,
  currentStep,
  onNextStep,
}) {
  const total = calculateTotal(selectedSize, selectedBase, placedToppings, selectedFinishings);

  // Aggregate toppings
  const toppingGroups = placedToppings.reduce((acc, pt) => {
    const topping = TOPPINGS.find((t) => t.id === pt.toppingId);
    if (!topping) return acc;
    if (acc[pt.toppingId]) {
      acc[pt.toppingId].count++;
    } else {
      acc[pt.toppingId] = { ...topping, count: 1 };
    }
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ShoppingBag size={16} className="text-amber-400" />
        <h2 className="text-stone-200 font-bold text-sm">Ringkasan Pesanan</h2>
      </div>

      {/* Selections */}
      <div className="bg-stone-800/60 rounded-xl p-3 border border-stone-700/50 flex flex-col gap-2.5">
        {/* Size */}
        <div className="flex items-center justify-between">
          <span className="text-stone-500 text-xs">Ukuran</span>
          <span className="text-stone-200 text-xs font-semibold">
            {selectedSize ? selectedSize.label : '—'}
          </span>
        </div>

        {/* Base */}
        <div className="flex items-center justify-between">
          <span className="text-stone-500 text-xs">Rasa Adonan</span>
          <div className="flex items-center gap-2">
            {selectedBase && (
              <div
                className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0 shadow-sm"
                style={{ backgroundColor: selectedBase.color }}
              />
            )}
            <span className="text-stone-200 text-xs font-semibold">
              {selectedBase ? selectedBase.label : '—'}
            </span>
          </div>
        </div>

        {/* Toppings */}
        {Object.values(toppingGroups).length > 0 && (
          <div>
            <span className="text-stone-500 text-xs block mb-1.5">Varian Topping</span>
            <div className="flex flex-col gap-1.5">
              <AnimatePresence>
                {Object.values(toppingGroups).map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between pl-1"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="text-stone-300 text-xs">{t.label} ×{t.count}</span>
                    </div>
                    <span className="text-stone-400 text-xs font-medium">{formatRupiah(t.price * t.count)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Finishings */}
        {selectedFinishings.length > 0 && (
          <div>
            <span className="text-stone-500 text-xs block mb-1.5">Olesan & Taburan</span>
            <div className="flex flex-col gap-1">
              <AnimatePresence>
                {selectedFinishings.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between pl-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                      <span className="text-stone-300 text-xs">{f.label}</span>
                    </div>
                    <span className="text-stone-400 text-xs">{formatRupiah(f.price)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-700/30 flex flex-col gap-1.5">
        <PriceLine label="Ukuran" amount={selectedSize?.price ?? 0} />
        {(selectedBase?.price ?? 0) > 0 && (
          <PriceLine label={`Adonan (${selectedBase?.label})`} amount={selectedBase.price} />
        )}
        {placedToppings.length > 0 && (
          <PriceLine
            label={`Topping (${placedToppings.length}x)`}
            amount={placedToppings.reduce((s, t) => {
              const top = TOPPINGS.find((tp) => tp.id === (t.toppingId || t.id));
              return s + (top?.price ?? 0);
            }, 0)}
          />
        )}
        {selectedFinishings.length > 0 && (
          <PriceLine
            label={`Olesan & Taburan (${selectedFinishings.length}x)`}
            amount={selectedFinishings.reduce((s, f) => s + f.price, 0)}
          />
        )}
        <PriceLine label="Total" amount={total} isTotal highlight />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        {currentStep < 3 ? (
          <motion.button
            onClick={onNextStep}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20"
          >
            Langkah Berikutnya
            <ChevronRight size={16} />
          </motion.button>
        ) : (
          <motion.button
            onClick={onCheckout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={!selectedSize || !selectedBase}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={16} />
            Tinjau Pesanan
          </motion.button>
        )}
      </div>

      {/* Empty state */}
      {!selectedSize && !selectedBase && (
        <p className="text-stone-600 text-xs text-center italic">
          Pilih ukuran dan rasa untuk memulai
        </p>
      )}
    </div>
  );
}
