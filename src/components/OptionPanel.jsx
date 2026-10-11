// ============================================================
// OptionPanel — Left panel for selecting Size, Base, Toppings, Finishing
// Pure Procedural Vector Preview Icons (Zero External URLs)
// ============================================================
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, GripVertical, Check } from 'lucide-react';
import { SIZES, BASES, TOPPINGS, FINISHINGS, formatRupiah, MAX_TOPPINGS } from '../data/martabakData';

// ─── Size Card ────────────────────────────────────────────
const SizeCard = ({ size, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative w-full text-left rounded-xl p-3 border-2 transition-all ${
      isSelected
        ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/20'
        : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-stone-200'}`}>
            {size.label}
          </p>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-700 text-stone-300">
            {size.diameter}
          </span>
        </div>
        <p className="text-stone-400 text-xs mt-0.5">{size.description}</p>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${isSelected ? 'text-amber-400' : 'text-stone-300'}`}>
          {formatRupiah(size.price)}
        </p>
        <span className="text-[10px] text-amber-500 font-medium">
          {size.badge}
        </span>
      </div>
    </div>
    {isSelected && (
      <motion.div
        layoutId="size-selected"
        className="absolute inset-0 rounded-xl border-2 border-amber-400 pointer-events-none"
      />
    )}
  </motion.button>
);

// ─── Procedural Vector Base Preview (Mini Martabak with Crust) ──
const BaseMiniSvg = ({ color, colorDark }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" className="rounded-lg shadow-sm flex-shrink-0">
    {/* Hotplate ring */}
    <circle cx="20" cy="20" r="19" fill="#1C1917" stroke="#292524" strokeWidth="1" />
    {/* Crunchy baked crust (12px proportional) */}
    <circle cx="20" cy="20" r="17" fill="#92400E" />
    {/* Inner dough surface */}
    <circle cx="20" cy="20" r="14.5" fill={color} />
    {/* Pori-pori dots */}
    <circle cx="16" cy="16" r="1" fill={colorDark || '#000000'} opacity="0.4" />
    <circle cx="23" cy="17" r="1.2" fill={colorDark || '#000000'} opacity="0.4" />
    <circle cx="19" cy="23" r="1" fill={colorDark || '#000000'} opacity="0.4" />
    <circle cx="23" cy="22" r="0.8" fill={colorDark || '#000000'} opacity="0.35" />
    <circle cx="16" cy="21" r="0.8" fill={colorDark || '#000000'} opacity="0.35" />
    {/* Subtle butter shine */}
    <circle cx="18" cy="17" r="6" fill="#FFFFFF" opacity="0.15" />
  </svg>
);

// ─── Base Card ────────────────────────────────────────────
const BaseCard = ({ base, isSelected, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative w-full text-left rounded-xl p-3 border-2 transition-all ${
      isSelected
        ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/20'
        : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
    }`}
  >
    <div className="flex items-center gap-3">
      {/* Pure Vector Base Preview */}
      <BaseMiniSvg color={base.color} colorDark={base.colorDark} />

      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-stone-200'}`}>
          {base.label}
        </p>
        <p className="text-stone-400 text-xs truncate">{base.flavorNotes || base.description}</p>
      </div>

      <p className={`font-semibold text-xs flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-400'}`}>
        {base.price === 0 ? 'Termasuk' : `+${formatRupiah(base.price)}`}
      </p>
    </div>

    {isSelected && (
      <motion.div
        layoutId="base-selected"
        className="absolute inset-0 rounded-xl border-2 border-amber-400 pointer-events-none"
      />
    )}
  </motion.button>
);

// ─── Procedural Vector Topping Icon Preview ───────────────
const ToppingMiniSvg = ({ id }) => {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="rounded-lg bg-stone-900 border border-white/10 flex-shrink-0 shadow-sm">
      {id === 'cheese' && (
        <g>
          {/* Crossing shredded cheddar cheese strands */}
          <rect x="6" y="14" width="28" height="3" rx="1.5" fill="#FDE047" transform="rotate(-15 20 20)" />
          <rect x="8" y="22" width="24" height="2.8" rx="1.4" fill="#FEF08A" transform="rotate(25 20 20)" />
          <rect x="10" y="10" width="22" height="2.6" rx="1.3" fill="#FDE047" transform="rotate(5 20 20)" />
          <rect x="7" y="26" width="26" height="2.8" rx="1.4" fill="#FCD34D" transform="rotate(-8 20 20)" />
        </g>
      )}

      {id === 'chocolate' && (
        <g>
          {/* Meises chocolate sprinkles */}
          <rect x="8" y="12" width="10" height="3" rx="1.5" fill="#3E2723" transform="rotate(20 13 13)" />
          <rect x="22" y="10" width="11" height="3" rx="1.5" fill="#27140B" transform="rotate(-30 27 11)" />
          <rect x="14" y="20" width="12" height="3" rx="1.5" fill="#3E2723" transform="rotate(10 20 21)" />
          <rect x="8" y="26" width="10" height="3" rx="1.5" fill="#27140B" transform="rotate(-15 13 27)" />
          <rect x="22" y="24" width="11" height="3" rx="1.5" fill="#3E2723" transform="rotate(40 27 25)" />
        </g>
      )}

      {id === 'peanut' && (
        <g>
          {/* Roasted peanut chunks */}
          <ellipse cx="14" cy="14" rx="5" ry="3.8" fill="#D97706" transform="rotate(25 14 14)" />
          <ellipse cx="26" cy="16" rx="4.5" ry="3.5" fill="#B45309" transform="rotate(-15 26 16)" />
          <ellipse cx="17" cy="26" rx="5.5" ry="4" fill="#D97706" transform="rotate(40 17 26)" />
          <ellipse cx="27" cy="27" rx="4" ry="3" fill="#F59E0B" transform="rotate(-30 27 27)" />
          <ellipse cx="14" cy="14" rx="2.5" ry="1.8" fill="#FDE68A" opacity="0.6" />
        </g>
      )}

      {id === 'oreo' && (
        <g>
          {/* Oreo biscuit chunk + white cream */}
          <circle cx="18" cy="20" r="10" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="6" fill="none" stroke="#27272A" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="28" cy="14" r="3.2" fill="#18181B" />
          {/* White cream crumbs */}
          <circle cx="18" cy="20" r="2.2" fill="#F4F4F5" />
          <circle cx="27" cy="26" r="2" fill="#F4F4F5" />
          <circle cx="10" cy="12" r="1.5" fill="#F4F4F5" />
        </g>
      )}

      {id === 'banana' && (
        <g>
          {/* Sliced banana round */}
          <circle cx="20" cy="20" r="11" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="8.5" fill="#FEFCE8" />
          <circle cx="18" cy="19" r="1" fill="#CA8A04" />
          <circle cx="22" cy="19" r="1" fill="#CA8A04" />
          <circle cx="20" cy="22" r="1" fill="#CA8A04" />
        </g>
      )}

      {id === 'strawberry' && (
        <g>
          {/* Red strawberry wedge */}
          <path d="M 20,8 C 28,8 31,18 20,31 C 9,18 12,8 20,8 Z" fill="#DC2626" />
          <path d="M 20,10 C 25,10 27,18 20,27 C 13,18 15,10 20,10 Z" fill="#F87171" />
          <circle cx="17" cy="15" r="0.8" fill="#FDE047" />
          <circle cx="23" cy="15" r="0.8" fill="#FDE047" />
          <circle cx="20" cy="20" r="0.8" fill="#FDE047" />
          <path d="M 20,8 L 17,5 L 20,7 L 23,5 Z" fill="#16A34A" />
        </g>
      )}

      {id === 'corn' && (
        <g>
          {/* Sweet corn kernels */}
          <ellipse cx="14" cy="18" rx="4" ry="5.5" fill="#FBBF24" transform="rotate(-15 14 18)" />
          <ellipse cx="23" cy="16" rx="4" ry="5.5" fill="#F59E0B" transform="rotate(20 23 16)" />
          <ellipse cx="19" cy="26" rx="4" ry="5.5" fill="#FBBF24" transform="rotate(5 19 26)" />
          <ellipse cx="13" cy="16" rx="1.5" ry="2" fill="#FEF08A" opacity="0.6" />
        </g>
      )}

      {id === 'almond' && (
        <g>
          {/* Almond flake */}
          <ellipse cx="16" cy="20" rx="3.8" ry="9" fill="#FDE68A" stroke="#B45309" strokeWidth="1" transform="rotate(-25 16 20)" />
          <ellipse cx="25" cy="18" rx="3.5" ry="8.5" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" transform="rotate(30 25 18)" />
        </g>
      )}
    </svg>
  );
};

// ─── Topping Card (Draggable + Pure Vector) ────────────────
const ToppingCard = ({ topping, count, onAdd, onRemove, isMaxed }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('toppingId', topping.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-2.5 border-2 transition-all ${
        count > 0
          ? 'border-amber-400/70 bg-amber-500/10 shadow-md shadow-amber-500/10'
          : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {/* Drag handle */}
        <div
          draggable
          onDragStart={handleDragStart}
          className="cursor-grab active:cursor-grabbing text-stone-500 hover:text-amber-400 transition-colors p-1"
          title="Tarik dan lepaskan ke canvas martabak"
        >
          <GripVertical size={16} />
        </div>

        {/* Pure Vector Topping Icon Preview */}
        <ToppingMiniSvg id={topping.id} />

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-stone-200 text-xs leading-tight">{topping.label}</p>
          <p className="text-stone-400 text-[11px] truncate mt-0.5">{topping.description}</p>
          <p className="text-amber-400 text-xs font-bold mt-0.5">{formatRupiah(topping.price)}</p>
        </div>

        {/* Qty Controls — Touch Friendly (min 44px x 44px touch target) */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {count > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-stone-700/80 hover:bg-red-500/80 active:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors shadow-sm touch-manipulation cursor-pointer"
              title="Hapus varian ini"
              aria-label={`Kurangi ${topping.label}`}
            >
              <Minus size={18} strokeWidth={2.5} />
            </motion.button>
          )}

          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              className="text-amber-400 font-black text-sm w-6 text-center select-none"
            >
              {count}
            </motion.span>
          )}

          <motion.button
            onClick={onAdd}
            disabled={isMaxed}
            whileTap={{ scale: 0.9 }}
            className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-colors shadow-sm touch-manipulation cursor-pointer ${
              isMaxed
                ? 'bg-stone-700/50 text-stone-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:from-amber-600 active:to-yellow-500 text-amber-950 font-bold shadow-amber-500/20'
            }`}
            title={isMaxed ? 'Maksimal 6 topping' : 'Tambahkan varian ini'}
            aria-label={`Tambah ${topping.label}`}
          >
            <Plus size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Finishing Toggle Card ────────────────────────────────
const FinishingToggle = ({ finishing, isSelected, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full text-left rounded-xl p-2.5 border-2 transition-all ${
      isSelected
        ? 'border-amber-400/80 bg-amber-500/15 shadow-md shadow-amber-500/10'
        : 'border-stone-700 bg-stone-800/50 hover:border-stone-600'
    }`}
  >
    <div className="flex items-center gap-2.5">
      <div
        className="w-5 h-5 rounded-full flex-shrink-0 border border-white/20 shadow-inner"
        style={{ backgroundColor: finishing.color }}
      />
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold truncate ${isSelected ? 'text-amber-300' : 'text-stone-300'}`}>
          {finishing.label}
        </p>
        <p className="text-stone-400 text-[10px] truncate">{finishing.description}</p>
      </div>
      <p className="text-xs font-medium text-stone-400 flex-shrink-0">+{formatRupiah(finishing.price)}</p>
      <div
        className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-colors ${
          isSelected ? 'bg-amber-400 text-amber-950' : 'bg-stone-700 text-transparent'
        }`}
      >
        <Check size={11} strokeWidth={3} />
      </div>
    </div>
  </motion.button>
);

// ─── Main Option Panel ────────────────────────────────────
export default function OptionPanel({
  currentStep,
  selectedSize,
  selectedBase,
  placedToppings = [],
  selectedFinishings = [],
  onSelectSize,
  onSelectBase,
  onAddTopping,
  onRemoveTopping,
  onToggleFinishing,
  totalToppingCount,
}) {
  const isMaxed = totalToppingCount >= MAX_TOPPINGS;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* ── Step 1: Size & Base Flavor ── */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-stone-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>📏</span> Ukuran Martabak
                </h3>
                <span className="text-stone-400 text-xs">Wajib dipilih</span>
              </div>
              <div className="flex flex-col gap-2">
                {SIZES.map((size) => (
                  <SizeCard
                    key={size.id}
                    size={size}
                    isSelected={selectedSize?.id === size.id}
                    onClick={() => onSelectSize(size)}
                  />
                ))}
              </div>
            </div>

            {/* Base/Flavor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-stone-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span>🥞</span> Rasa Adonan Bersarang
                </h3>
                <span className="text-stone-400 text-xs">Pilih 1 rasa</span>
              </div>
              <div className="flex flex-col gap-2">
                {BASES.map((base) => (
                  <BaseCard
                    key={base.id}
                    base={base}
                    isSelected={selectedBase?.id === base.id}
                    onClick={() => onSelectBase(base)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Toppings (Pure Procedural Multi-Topping) ── */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-stone-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span>🍫</span> Varian Topping Martabak
              </h3>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isMaxed
                    ? 'bg-red-500/25 text-red-400 border border-red-500/30'
                    : 'bg-stone-700/60 text-stone-300'
                }`}
              >
                {totalToppingCount}/{MAX_TOPPINGS} Terpilih
              </span>
            </div>

            {isMaxed && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-xs bg-red-950/60 border border-red-700/50 rounded-xl px-3 py-2 mb-3"
              >
                Martabakmu sudah penuh! 😆 Hapus topping untuk menambah varian lain.
              </motion.p>
            )}

            <p className="text-stone-400 text-xs mb-3 italic">
              💡 Tarik card ke canvas atau klik (+) untuk menaburkan layer lebat
            </p>

            <div className="flex flex-col gap-2">
              {TOPPINGS.map((topping) => {
                const count = placedToppings.filter(
                  (p) => (p.toppingId || p.id) === topping.id
                ).length;
                return (
                  <ToppingCard
                    key={topping.id}
                    topping={topping}
                    count={count}
                    onAdd={() => onAddTopping(topping.id)}
                    onRemove={() => onRemoveTopping(topping.id, 'last')}
                    isMaxed={isMaxed}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Olesan & Taburan Akhir ── */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-stone-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span>✨</span> Olesan & Taburan Akhir
              </h3>
              <span className="text-stone-400 text-xs">Opsional</span>
            </div>
            <p className="text-stone-400 text-xs mb-3 italic">
              Olesan saus merata & taburan renyah pemanis martabakmu
            </p>

            {/* Olesan Saus Merata & Susu */}
            <div className="mb-3">
              <p className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                Olesan Saus Merata & Susu
              </p>
              <div className="flex flex-col gap-1.5">
                {FINISHINGS.filter((f) => f.type === 'spread' || f.type === 'sauce' || f.id === 'condensed_milk').map((f) => (
                  <FinishingToggle
                    key={f.id}
                    finishing={f}
                    isSelected={selectedFinishings.some((sf) => sf.id === f.id)}
                    onToggle={() => onToggleFinishing(f)}
                  />
                ))}
              </div>
            </div>

            {/* Taburan Sprinkles & Flakes */}
            <div>
              <p className="text-stone-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                Taburan Sprinkles & Kacang
              </p>
              <div className="flex flex-col gap-1.5">
                {FINISHINGS.filter((f) => f.type === 'flakes' || f.type === 'sprinkles').map((f) => (
                  <FinishingToggle
                    key={f.id}
                    finishing={f}
                    isSelected={selectedFinishings.some((sf) => sf.id === f.id)}
                    onToggle={() => onToggleFinishing(f)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
