# Magnetic Memories — Magnet Panel component

A responsive React + TypeScript component for a modern, elegant travel-magnet collection.

## Add it to your project

1. Copy `MagnetPanel.tsx` and `MagnetPanel.css` into a component folder, for example `src/components/MagnetPanel/`.
2. Make sure your app loads DM Sans and Cormorant Garamond, or change the font-family declarations in the CSS.
3. Import and render the component:

```tsx
import MagnetPanel, { type TravelMagnet } from "./components/MagnetPanel/MagnetPanel";

const magnets: TravelMagnet[] = [
  {
    id: "lisbon",
    destination: "Lisbon",
    country: "Portugal",
    image: "/images/magnets/lisbon.webp",
    year: "2025",
    memory: "A little keepsake from a sunny afternoon wandering through Alfama.",
    rotation: -3,
  },
  {
    id: "paris",
    destination: "Paris",
    country: "France",
    image: "/images/magnets/paris.webp",
    year: "2024",
    memory: "A reminder of a long weekend exploring the city.",
  },
];

export default function HomePage() {
  return <MagnetPanel magnets={magnets} />;
}
```

## Image tips

Use one photograph per magnet, ideally with the background removed and exported as transparent PNG or WebP. Photograph each magnet straight-on with soft, even light. Keep a little transparent padding around the object so the hover enlargement does not crop it.

The component includes:
- A calm, textured sage/ivory display surface
- Slightly varied resting rotations and realistic layered shadows
- Hover/focus lift and enlargement on desktop
- Tap/click detail dialog on all devices
- Escape-key and backdrop dismissal
- Responsive layout and reduced-motion support

This is a frontend component only. The `image` values can later come from Supabase Storage and the magnet records can come from your database.
