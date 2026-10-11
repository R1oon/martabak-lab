// ============================================================
// StudioBuilder — Main builder layout (Step 1–3)
// Desktop: Left panel | Center canvas | Right summary
// Mobile: Stacked + sticky bottom bar
// ============================================================
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ArrowLeft } from 'lucide-react';

import MartabakCanvas from './MartabakCanvas';
import OptionPanel from './OptionPanel';
import OrderSummary from './OrderSummary';
import StepProgress from './StepProgress';
import { SIZES, BASES, TOPPINGS, MAX_TOPPINGS, formatRupiah, calculateTotal } from '../data/martabakData';

// Stable ID counter outside component — won't reset on re-render
let _toppingIdCounter = 0;
const nextToppingId = () => `topping-${Date.now()}-${++_toppingIdCounter}`;

// Generate a random position in the safe zone
const randomPosInCircle = (radius) => {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * radius * 0.75;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
  };
};

export default function StudioBuilder({ customerName, onCheckout, addToast }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Medium default
  const [selectedBase, setSelectedBase] = useState(BASES[0]); // Original default
  const [placedToppings, setPlacedToppings] = useState([]);
  const [selectedFinishings, setSelectedFinishings] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const SAFE_RADIUS = 100; // matches canvas safe zone

  // ── Topping handlers ──────────────────────────────────────
  const handleAddTopping = useCallback((toppingId, x, y) => {
    if (placedToppings.length >= MAX_TOPPINGS) {
      addToast('Martabakmu sudah penuh! 😆', 'error');
      return;
    }
    const topping = TOPPINGS.find((t) => t.id === toppingId);
    if (!topping) return;

    const pos = (x !== undefined && y !== undefined)
      ? { x, y }
      : randomPosInCircle(SAFE_RADIUS);

    const rotation = Math.random() * 30 - 15;
    const scale = 0.85 + Math.random() * 0.35;

    setPlacedToppings((prev) => [
      ...prev,
      { id: nextToppingId(), toppingId, price: topping.price, x: pos.x, y: pos.y, rotation, scale },
    ]);
    addToast(`${topping.label} ditambahkan! 🎉`, 'success', 2000);
  }, [placedToppings.length, addToast]);

  const handleDropTopping = useCallback((toppingId, x, y) => {
    handleAddTopping(toppingId, x, y);
  }, [handleAddTopping]);

  const handleRemoveToppingById = useCallback((id) => {
    setPlacedToppings((prev) => {
      const removed = prev.find((p) => p.id === id);
      const next = prev.filter((p) => p.id !== id);
      if (removed) {
        const topping = TOPPINGS.find((t) => t.id === removed.toppingId);
        addToast(`${topping?.label ?? 'Topping'} dihapus`, 'info', 1800);
      }
      return next;
    });
  }, [addToast]);

  // Remove last occurrence of a toppingId (from panel minus button)
  const handleRemoveToppingLast = useCallback((toppingId) => {
    setPlacedToppings((prev) => {
      const idx = [...prev].reverse().findIndex((p) => p.toppingId === toppingId);
      if (idx === -1) return prev;
      const realIdx = prev.length - 1 - idx;
      return prev.filter((_, i) => i !== realIdx);
    });
  }, []);

  const handleAddToppingFromPanel = useCallback((toppingId) => {
    handleAddTopping(toppingId);
  }, [handleAddTopping]);

  // ── Finishing handler ──────────────────────────────────────
  const handleToggleFinishing = useCallback((finishing) => {
    setSelectedFinishings((prev) => {
      const exists = prev.some((f) => f.id === finishing.id);
      if (exists) return prev.filter((f) => f.id !== finishing.id);
      return [...prev, finishing];
    });
  }, []);

  // ── Step navigation ────────────────────────────────────────
  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleCheckout = () => {
    if (!selectedSize || !selectedBase) {
      addToast('Pilih ukuran dan rasa dulu ya!', 'error');
      return;
    }
    onCheckout({ selectedSize, selectedBase, placedToppings, selectedFinishings });
  };

  const total = calculateTotal(selectedSize, selectedBase, placedToppings, selectedFinishings);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 flex flex-col overflow-x-hidden">
      {/* ── Top Header ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/70 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Customer Name */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
              <ChefHat size={16} className="text-amber-950" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-black text-sm block leading-none">Martabak Lab</span>
              {customerName && (
                <span className="text-[11px] text-amber-400/90 font-medium leading-tight block mt-0.5">
                  Pemesan: {customerName}
                </span>
              )}
            </div>
          </div>

          {/* Step Progress */}
          <div className="flex-1 flex justify-center">
            <StepProgress currentStep={currentStep} onStepClick={handleStepClick} />
          </div>

          {/* Total price */}
          <div className="text-right flex-shrink-0">
            <p className="text-stone-500 text-[10px] uppercase tracking-wider">Total</p>
            <motion.p
              key={total}
              initial={{ scale: 1.15, color: '#FBBF24' }}
              animate={{ scale: 1, color: '#FCD34D' }}
              transition={{ duration: 0.3 }}
              className="font-black text-amber-400 text-sm"
            >
              {formatRupiah(total)}
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* ── Main Layout ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-6 items-start">

          {/* ─ Left: Option Panel ─ */}
          <motion.aside
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:sticky lg:top-24 bg-stone-900/70 backdrop-blur-sm border border-stone-800/60 rounded-2xl p-4 overflow-y-auto max-h-[calc(100vh-120px)]"
          >
            <OptionPanel
              currentStep={currentStep}
              selectedSize={selectedSize}
              selectedBase={selectedBase}
              placedToppings={placedToppings}
              selectedFinishings={selectedFinishings}
              onSelectSize={setSelectedSize}
              onSelectBase={setSelectedBase}
              onAddTopping={handleAddToppingFromPanel}
              onRemoveTopping={handleRemoveToppingLast}
              onToggleFinishing={handleToggleFinishing}
              totalToppingCount={placedToppings.length}
            />
          </motion.aside>

          {/* ─ Center: Martabak Canvas ─ */}
          <motion.main
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Canvas card */}
            <div className="w-full bg-stone-900/50 backdrop-blur-sm border border-stone-800/50 rounded-3xl p-6 flex flex-col items-center">
              {/* Canvas label */}
              <div className="flex items-center justify-between w-full mb-4">
                <div>
                  <h2 className="text-stone-200 font-bold text-sm">Kanvas Martabak</h2>
                  <p className="text-stone-500 text-xs">
                    {placedToppings.length === 0
                      ? 'Mulai racik martabak lezat impianmu'
                      : `${placedToppings.length} varian topping terpilih`}
                  </p>
                </div>
                {/* Base color indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 transition-all duration-500"
                    style={{ backgroundColor: selectedBase?.color }}
                  />
                  <span className="text-stone-400 text-xs">{selectedBase?.label}</span>
                </div>
              </div>

              {/* The SVG canvas */}
              <MartabakCanvas
                base={selectedBase}
                size={selectedSize}
                placedToppings={placedToppings}
                finishings={selectedFinishings}
                onDropTopping={handleDropTopping}
                onRemoveTopping={handleRemoveToppingById}
                isDragOver={isDragOver}
                setIsDragOver={setIsDragOver}
              />

              {/* Placed toppings chips */}
              {placedToppings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 w-full"
                >
                  <p className="text-stone-500 text-xs mb-2">Klik chip untuk hapus:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {placedToppings.map((pt) => {
                      const t = TOPPINGS.find((tp) => tp.id === (pt.toppingId || pt.id));
                      return (
                        <motion.button
                          key={pt.id}
                          onClick={() => handleRemoveToppingById(pt.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1.5 bg-stone-800/90 hover:bg-red-950/60 border border-stone-700 hover:border-red-600/50 rounded-full pl-1 pr-2.5 py-0.5 text-xs text-stone-200 hover:text-red-300 transition-all shadow-sm"
                          title="Klik untuk menghapus varian ini"
                        >
                          <div
                            className="w-3 h-3 rounded-full border border-white/20 flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: t?.color }}
                          />
                          <span>{t?.label}</span>
                          <span className="text-stone-400 hover:text-red-400 font-bold ml-0.5">×</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile step navigation */}
            <div className="lg:hidden flex gap-3 w-full">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="flex-1 flex items-center justify-center gap-2 bg-stone-700/60 text-stone-300 font-semibold py-3 rounded-xl text-sm"
                >
                  <ArrowLeft size={16} /> Kembali
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  Langkah Berikutnya →
                </button>
              ) : (
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-bold py-3 rounded-xl text-sm shadow-md transition-all"
                >
                  Tinjau Pesanan
                </button>
              )}
            </div>
          </motion.main>

          {/* ─ Right: Order Summary ─ */}
          <motion.aside
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:sticky lg:top-24 bg-stone-900/70 backdrop-blur-sm border border-stone-800/60 rounded-2xl p-4"
          >
            <OrderSummary
              selectedSize={selectedSize}
              selectedBase={selectedBase}
              placedToppings={placedToppings}
              selectedFinishings={selectedFinishings}
              onCheckout={handleCheckout}
              currentStep={currentStep}
              onNextStep={handleNextStep}
            />
          </motion.aside>
        </div>
      </div>

      {/* ── Mobile Sticky Bottom Bar (Akses Jempol 1 Tangan) ── */}
      <div className="lg:hidden sticky bottom-0 bg-stone-950/95 backdrop-blur-md border-t border-stone-800/80 px-4 py-2.5 z-40">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* Subtotal & Ringkasan Langkah */}
          <div className="flex-1 min-w-0">
            <p className="text-stone-400 text-[11px] truncate">
              {currentStep === 1
                ? 'Langkah 1: Ukuran & Adonan'
                : currentStep === 2
                ? `Langkah 2: ${placedToppings.length} Topping`
                : `Langkah 3: ${selectedFinishings.length} Olesan`}
            </p>
            <p className="text-amber-400 font-black text-base sm:text-lg leading-tight truncate">
              {formatRupiah(total)}
            </p>
          </div>

          {/* Action CTAs (Min 44px Touch Target) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 active:bg-stone-900 text-stone-300 transition-colors border border-stone-700/80 active:scale-95 touch-manipulation cursor-pointer"
                aria-label="Kembali ke langkah sebelumnya"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                className="h-11 min-h-[44px] px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:from-amber-600 active:to-yellow-500 text-amber-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 touch-manipulation cursor-pointer"
              >
                <span>{currentStep === 1 ? 'Pilih Topping' : 'Sentuhan Akhir'}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                className="h-11 min-h-[44px] px-5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:from-amber-600 active:to-yellow-500 text-amber-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 active:scale-95 touch-manipulation cursor-pointer"
              >
                <span>Tinjau Pesanan</span>
                <span>🛒</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
