# Local Asset Override Guide

Tempatkan file PNG di sini untuk mengganti visual procedural SVG:

## Struktur Folder

```
src/assets/
├── bases/
│   ├── original.png       → Martabak Original (top view, golden brown)
│   ├── pandan.png         → Martabak Pandan (top view, green)
│   ├── red_velvet.png     → Martabak Red Velvet (top view, dark red)
│   ├── chocolate.png      → Martabak Chocolate (top view, dark brown)
│   └── black_charcoal.png → Martabak Charcoal (top view, very dark)
│
└── toppings/
    ├── chocolate.png  → Taburan meises/choco chunks (pile, transparent BG)
    ├── cheese.png     → Parutan keju kuning (pile, transparent BG)
    ├── oreo.png       → Remahan oreo hitam (pile, transparent BG)
    ├── peanut.png     → Kacang cincang sangrai (pile, transparent BG)
    ├── banana.png     → Irisan pisang (top view, transparent BG)
    ├── strawberry.png → Irisan stroberi (top view, transparent BG)
    ├── corn.png       → Butiran jagung manis (pile, transparent BG)
    └── almond.png     → Irisan almond tipis (pile, transparent BG)
```

## Cara Override

1. Letakkan file PNG di folder yang sesuai
2. Buka `src/assets/images/index.js`
3. Import gambar dan set ke property `src`:

```js
import chocolateImg from '../toppings/chocolate.png';

export const TOPPING_IMAGES = {
  chocolate: {
    src: chocolateImg,  // ganti null dengan variable import ini
    ...
  }
};
```

## Tips Sumber Gambar Gratis

- **Wikimedia Commons**: commons.wikimedia.org (search martabak, sprinkles, dll)
- **Unsplash**: unsplash.com (foto berkualitas tinggi)
- **Pngtree / Freepik**: untuk PNG transparan bahan makanan
- **Remove.bg**: untuk menghapus background dari foto biasa

## Spesifikasi Ideal

- Format: PNG dengan transparent background
- Resolusi: minimal 400×400px
- Tampilan: top-view / birds-eye view
- Gaya: scattered/piled texture (bukan satu buah saja)
