// ============================================================
// Toast — Notification component for user feedback
// ============================================================
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration ?? 3500);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-xl min-w-[240px] max-w-[300px] backdrop-blur-sm ${
        isError
          ? 'bg-red-950/90 border-red-700/60 text-red-200'
          : isSuccess
          ? 'bg-green-950/90 border-green-700/60 text-green-200'
          : 'bg-stone-900/90 border-amber-600/40 text-amber-200'
      }`}
    >
      {isError ? (
        <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
      ) : isSuccess ? (
        <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
      ) : (
        <span className="text-lg leading-none flex-shrink-0">ℹ️</span>
      )}
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-current opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
