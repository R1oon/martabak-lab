// ============================================================
// PreparingScreen — Animated cooking simulation
// ============================================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const COOKING_STEPS = [
  { label: 'Menyiapkan adonan...', icon: '🥣', duration: 900 },
  { label: 'Memanggang martabak...', icon: '🔥', duration: 1100 },
  { label: 'Menabur topping...', icon: '🍫', duration: 900 },
  { label: 'Memberikan sentuhan akhir...', icon: '✨', duration: 800 },
  { label: 'Martabak Siap Disajikan!', icon: '🎉', duration: 600 },
];

export default function PreparingScreen({ onDone }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalDuration = COOKING_STEPS.reduce((s, step) => s + step.duration, 0);

  useEffect(() => {
    let elapsed = 0;
    let stepIdx = 0;

    const runStep = () => {
      if (stepIdx >= COOKING_STEPS.length) {
        setTimeout(onDone, 400);
        return;
      }
      setStepIndex(stepIdx);
      const dur = COOKING_STEPS[stepIdx].duration;
      elapsed += dur;
      setProgress(Math.round((elapsed / totalDuration) * 100));

      const timer = setTimeout(() => {
        stepIdx++;
        runStep();
      }, dur);
      return timer;
    };

    const firstTimer = setTimeout(runStep, 100);
    return () => clearTimeout(firstTimer);
  }, [onDone, totalDuration]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 px-4 select-none">
      {/* Background blobs with strict containment and pointer-events-none */}
      <div className="absolute top-0 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-amber-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Central Content Box - Perfectly Centered & Compact to Avoid Any Scroll */}
      <div className="text-center w-full max-w-sm mx-auto z-10 flex flex-col items-center justify-center px-2">
        {/* Animated chef hat */}
        <motion.div
          animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block mb-3 sm:mb-4 text-amber-400"
        >
          <ChefHat size={52} strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">Sedang Dibuat!</h2>
        <p className="text-stone-400 text-xs sm:text-sm mb-4 sm:mb-5">Martabakmu sedang disiapkan dengan penuh cinta...</p>

        {/* Step display card */}
        <div className="w-full bg-stone-850/80 backdrop-blur-md border border-stone-750/70 rounded-2xl p-4 sm:p-5 mb-4 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 220 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl mb-2">{COOKING_STEPS[stepIndex]?.icon}</div>
              <p className="text-stone-100 font-bold text-sm sm:text-base tracking-wide">
                {COOKING_STEPS[stepIndex]?.label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-800/90 rounded-full h-2.5 overflow-hidden mb-2 border border-stone-700/40">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <p className="text-stone-400 text-xs font-medium">{progress}% selesai</p>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mt-3">
          {COOKING_STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: i <= stepIndex ? '#FBBF24' : '#44403C',
                scale: i === stepIndex ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
