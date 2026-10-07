// ============================================================
// StepProgress — Step indicator bar (01 Base → 02 Toppings → 03 Finishing)
// ============================================================
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { num: '01', label: 'Ukuran & Adonan' },
  { num: '02', label: 'Varian Topping' },
  { num: '03', label: 'Olesan & Taburan' },
];

export default function StepProgress({ currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-sm mx-auto">
      {steps.map((step, i) => {
        const stepIdx = i + 1;
        const isActive = stepIdx === currentStep;
        const isDone = stepIdx < currentStep;

        return (
          <div key={step.num} className="flex items-center">
            <button
              onClick={() => onStepClick(stepIdx)}
              className="flex flex-col items-center gap-1 group"
            >
              <motion.div
                animate={{
                  backgroundColor: isDone
                    ? '#F59E0B'
                    : isActive
                    ? '#FBBF24'
                    : '#44403C',
                  scale: isActive ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 border-transparent"
                style={{
                  borderColor: isActive ? '#FCD34D' : 'transparent',
                  boxShadow: isActive ? '0 0 0 3px rgba(251,191,36,0.2)' : 'none',
                }}
              >
                {isDone ? (
                  <Check size={14} className="text-amber-950" />
                ) : (
                  <span className={isActive ? 'text-amber-950' : 'text-stone-500'}>
                    {step.num}
                  </span>
                )}
              </motion.div>
              <span
                className={`text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-300' : isDone ? 'text-amber-500' : 'text-stone-500'
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="w-12 h-0.5 mx-2 mb-4 relative overflow-hidden rounded-full bg-stone-700">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-amber-500 rounded-full"
                  animate={{ width: currentStep > stepIdx ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
