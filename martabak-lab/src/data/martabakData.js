// ============================================================
// src/data/martabakData.js
// Martabak Lab — Data Layer (Pure Procedural Vector Model)
// Full Bahasa Indonesia — Bebas URL eksternal
// ============================================================

export const SIZES = [
  {
    id: 'small',
    label: 'Kecil',
    diameter: '20 cm',
    description: 'Porsi personal pas untuk sendiri',
    price: 20000,
    scale: 0.82,
    badge: '1 Orang',
  },
  {
    id: 'medium',
    label: 'Sedang',
    diameter: '26 cm',
    description: 'Porsi pas dinikmati berdua',
    price: 25000,
    scale: 1.0,
    badge: '2-3 Orang',
  },
  {
    id: 'large',
    label: 'Besar',
    diameter: '32 cm',
    description: 'Porsi puas buat kumpul rame-rame!',
    price: 30000,
    scale: 1.18,
    badge: '4-5 Orang',
  },
];

export const BASES = [
  {
    id: 'original',
    label: 'Original',
    flavorNotes: 'Gurih manis mentega Wisman, keemasan bersarang',
    description: 'Adonan klasik keemasan',
    price: 0,
    color: '#D97706',       // Golden amber hangat
    colorDark: '#92400E',
    shadowColor: 'rgba(217, 119, 6, 0.45)',
  },
  {
    id: 'pandan',
    label: 'Pandan',
    flavorNotes: 'Aroma daun pandan suji wangi segar alami',
    description: 'Aroma pandan wangi alami',
    price: 2000,
    color: '#2D6A4F',       // Hijau pandan suji pekat
    colorDark: '#1B4332',
    shadowColor: 'rgba(45, 106, 79, 0.45)',
  },
  {
    id: 'red_velvet',
    label: 'Red Velvet',
    flavorNotes: 'Rasa cokelat merah lembut khas buttermilk',
    description: 'Cokelat merah beludru kaya rasa',
    price: 5000,
    color: '#7F1D1D',       // Merah velvet pekat
    colorDark: '#450A0A',
    shadowColor: 'rgba(127, 29, 29, 0.45)',
  },
  {
    id: 'chocolate',
    label: 'Chocolate',
    flavorNotes: 'Dark cocoa Belgia pekat legit memikat',
    description: 'Adonan cokelat hitam kaya rasa',
    price: 3000,
    color: '#3E2723',       // Cokelat kakao tua pekat
    colorDark: '#1A0C08',
    shadowColor: 'rgba(62, 39, 35, 0.5)',
  },
  {
    id: 'black_charcoal',
    label: 'Black Charcoal',
    flavorNotes: 'Arang bambu aktif alami, eksotis & bergaya',
    description: 'Arang aktif unik dan stylish',
    price: 5000,
    color: '#1F2937',       // Arang abu-abu gelap
    colorDark: '#111827',
    shadowColor: 'rgba(31, 41, 55, 0.55)',
  },
];

export const TOPPINGS = [
  {
    id: 'cheese',
    label: 'Keju',
    description: '45-50 parutan keju cheddar memanjang menyilang',
    price: 5000,
    color: '#FDE047',
    colorSecondary: '#FEF08A',
    layerPriority: 1, // Lapisan dasar parutan
  },
  {
    id: 'chocolate',
    label: 'Cokelat',
    description: '80-100 butir meises cokelat padat tersebar acak',
    price: 5000,
    color: '#3E2723',
    colorSecondary: '#27140B',
    layerPriority: 1, // Lapisan dasar butiran
  },
  {
    id: 'peanut',
    label: 'Kacang Tanah',
    description: '35-40 butiran cincangan kacang tanah sangrai keemasan',
    price: 4000,
    color: '#D97706',
    colorSecondary: '#B45309',
    layerPriority: 2, // Lapisan cincangan kacang
  },
  {
    id: 'corn',
    label: 'Jagung',
    description: '30-36 butiran jagung manis pipil renyah',
    price: 4000,
    color: '#FBBF24',
    colorSecondary: '#F59E0B',
    layerPriority: 2,
  },
  {
    id: 'oreo',
    label: 'Oreo',
    description: '14 keping biskuit Oreo renyah & remahan krim putih',
    price: 6000,
    color: '#18181B',
    colorSecondary: '#F4F4F5',
    layerPriority: 3, // Lapisan biskuit kepingan
  },
  {
    id: 'almond',
    label: 'Almond',
    description: '18 irisan tipis kacang almond panggang renyah',
    price: 7000,
    color: '#FDE68A',
    colorSecondary: '#FEF3C7',
    layerPriority: 3,
  },
  {
    id: 'banana',
    label: 'Pisang',
    description: '8-10 irisan bulat buah pisang manis lembut',
    price: 5000,
    color: '#FEF08A',
    colorSecondary: '#CA8A04',
    layerPriority: 4, // Lapisan buah segar atas
  },
  {
    id: 'strawberry',
    label: 'Stroberi',
    description: '8 potongan buah stroberi segar asam-manis',
    price: 7000,
    color: '#DC2626',
    colorSecondary: '#F87171',
    layerPriority: 4, // Lapisan buah segar atas
  },
];

export const FINISHINGS = [
  // ── 1. Olesan Saus Merata (Sauce Spread) ──────────────────
  {
    id: 'condensed_milk',
    label: 'Susu Kental Manis',
    description: 'Olesan creamy susu kental manis klasik',
    price: 3000,
    type: 'spread',
    color: '#FFFBEB',
    colorDeep: '#FEF08A',
  },
  {
    id: 'chocolate_sauce',
    label: 'Saus Cokelat',
    description: 'Olesan cokelat pekat mengilap lezat',
    price: 3000,
    type: 'spread',
    color: '#3B1A08',
    colorDeep: '#230E03',
  },
  {
    id: 'caramel_sauce',
    label: 'Saus Karamel',
    description: 'Olesan karamel mentega amber keemasan',
    price: 3000,
    type: 'spread',
    color: '#D97706',
    colorDeep: '#92400E',
  },
  {
    id: 'strawberry_sauce',
    label: 'Saus Stroberi',
    description: 'Olesan sirup stroberi merah berkilau',
    price: 4000,
    type: 'spread',
    color: '#E11D48',
    colorDeep: '#9F1239',
  },
  {
    id: 'matcha_sauce',
    label: 'Saus Matcha',
    description: 'Olesan teh hijau matcha Uji creamy mengilap',
    price: 4000,
    type: 'spread',
    color: '#16A34A',
    colorDeep: '#14532D',
  },

  // ── 2. Taburan Acak Alami (Sprinkles & Flakes) ────────────
  {
    id: 'sprinkles',
    label: 'Meises Warna-warni',
    description: '80-100 butir meises mini silinder warna-warni ceria',
    price: 2000,
    type: 'sprinkles',
    color: '#EC4899',
  },
  {
    id: 'cheese_flakes',
    label: 'Serpihan Keju Kering',
    description: 'Taburan keju edam kering ekstra gurih',
    price: 3000,
    type: 'flakes',
    color: '#FCD34D',
  },
  {
    id: 'crushed_peanut',
    label: 'Taburan Kacang Halus',
    description: 'Remahan kacang tanah cincang halus gurih',
    price: 2000,
    type: 'flakes',
    color: '#B45309',
  },
];

export const MAX_TOPPINGS = 6;

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotal = (size, base, toppings, finishings) => {
  const sizePrice = size?.price ?? 0;
  const baseModifier = base?.price ?? 0;
  const toppingsTotal = (toppings || []).reduce((sum, t) => sum + (t.price ?? 0), 0);
  const finishingsTotal = (finishings || []).reduce((sum, f) => sum + (f.price ?? 0), 0);
  return sizePrice + baseModifier + toppingsTotal + finishingsTotal;
};

// Generator kombinasi martabak acak untuk Landing Page showcase
export const generateRandomShowcase = () => {
  const randomBase = BASES[Math.floor(Math.random() * BASES.length)];
  const spreads = FINISHINGS.filter((f) => f.type === 'spread' || f.type === 'sauce');
  const randomSpread = spreads[Math.floor(Math.random() * spreads.length)];
  const finishings = [randomSpread];

  // 70% kemungkinan ditambahkan Susu Kental Manis
  const skm = FINISHINGS.find((f) => f.id === 'condensed_milk');
  if (skm && randomSpread.id !== 'condensed_milk' && Math.random() > 0.3) {
    finishings.unshift(skm);
  }

  // 50% kemungkinan ditambah meises warna-warni / keju flakes
  if (Math.random() > 0.4) {
    const extra = Math.random() > 0.5
      ? FINISHINGS.find((f) => f.id === 'sprinkles')
      : FINISHINGS.find((f) => f.id === 'cheese_flakes');
    if (extra && !finishings.some((f) => f.id === extra.id)) {
      finishings.push(extra);
    }
  }

  // 2 - 3 Topping acak
  const shuffled = [...TOPPINGS].sort(() => 0.5 - Math.random());
  const count = Math.random() > 0.4 ? 3 : 2;
  const pickedToppings = shuffled.slice(0, count);
  const placedToppings = pickedToppings.map((t, idx) => ({
    id: `rand-${t.id}-${idx}-${Date.now()}`,
    toppingId: t.id,
  }));

  const spreadLabel = randomSpread?.label || 'Susu Kental Manis';
  const toppingsLabel = pickedToppings.map((t) => t.label).join(' & ');

  return {
    base: randomBase,
    size: SIZES[1], // Sedang
    placedToppings,
    finishings,
    spreadLabel,
    toppingsLabel,
  };
};

// Deterministic pseudo-random number generator (LCG)
function createRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function sampleUniformCircle(count, radius, rng) {
  const points = [];
  while (points.length < count) {
    const x = (rng() * 2 - 1) * radius;
    const y = (rng() * 2 - 1) * radius;
    if (x * x + y * y <= radius * radius) {
      points.push({ x, y });
    }
  }
  return points;
}

// 9. RAINBOW SPRINKLES (95 butir mini silinder acak warna)
export function generateRainbowSprinkles(safeRadius = 112) {
  const rng = createRng(909);
  const count = 95; // 80-120 butir sesuai permintaan
  const points = sampleUniformCircle(count, safeRadius * 0.95, rng);
  const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#FACC15', '#06B6D4'];

  return points.map((p, i) => ({
    id: `sp-${i}`,
    x: p.x,
    y: p.y,
    length: 6.5 + rng() * 3.5, // 6.5px - 10px silinder mini
    width: 2.2 + rng() * 0.5,
    angle: rng() * 360,
    color: colors[i % colors.length],
  }));
}
