# 400 Club — Design Language

> A comprehensive design system for the 400 Club NFT collection, capturing the essence of Victorian elegance and Gilded Age opulence.

---

## 🎨 Brand Identity

### Collection Essence
The 400 Club is a generative art collection of **9,400 unique anthropomorphic canine portraits** rendered in Victorian/Gilded Age oil painting style. Each piece depicts a dog breed as an aristocratic figure, dressed in period-appropriate attire, creating a whimsical yet sophisticated fusion of animal portraiture and historical fashion.

### Core Themes
- **Legacy & Heritage** — "Where Legacy Lives Forever"
- **Exclusivity** — Named after Mrs. Astor's "400" social elite
- **Timeless Elegance** — Victorian/Gilded Age aesthetic (1870-1910)
- **Individuality** — Every portrait is 1/1, no duplicates
- **Membership** — NFT as access pass to an exclusive club

### Art Direction
- **Style**: Oil on canvas, formal portrait composition
- **Influence**: John Singer Sargent, Victorian portraiture masters
- **Lighting**: Rich chiaroscuro, warm candlelit ambiance
- **Technique**: Layered glazing, subtle vignetting, fine detail

---

## 🎭 Color Palette

### Primary Brand Colors

```css
/* Gilded Age Brand Tokens */
--background:       #0D0C0A   /* Warm Black - Deep ebony with warm undertones */
--foreground:       #F5EDE0   /* Antique Ivory - Aged parchment tone */
--primary:          #D4AF37   /* Primary Gold - Rich museum gold */
--secondary:        #7A1F2B   /* Burgundy - Deep aristocratic wine */
--accent:           #0F5D4E   /* Emerald - Victorian parlor green */
--destructive:      #8B0000   /* Ruby - Deep crimson */
--muted:            #151311   /* Muted Surface - Soft ebony */
--muted-foreground: #CBBCA0   /* Aged Parchment - Weathered paper */
```

### Gilded Gradient
```css
--gilded-gradient: linear-gradient(90deg, 
  #9A6A28 0%,    /* Antique Bronze */
  #D4AF37 22%,   /* Primary Gold */
  #E6C87E 50%,   /* Polished Highlight */
  #B8860B 78%,   /* Dark Gold */
  #8C6E2E 100%   /* Aged Bronze */
);
```

### Semantic Usage
| Token | Usage |
|-------|-------|
| Primary Gold | CTAs, highlights, brand accents, active states |
| Burgundy | Secondary actions, rarity indicators (Epic tier) |
| Emerald | Success states, rare trait indicators |
| Ruby | Destructive actions, errors |
| Antique Ivory | Primary text, headlines |
| Aged Parchment | Secondary text, captions |

### Collection Palette (from NFT traits)
The 79 clothing colors in the collection draw from:

**Neutrals**: Slate, Beige, Ivory, Cream, Black, White, Gray
**Earth Tones**: Mahogany, Chocolate, Tan, Copper, Bronze, Rust
**Jewel Tones**: Sapphire, Emerald, Ruby, Burgundy, Wine, Teal
**Warm Hues**: Cranberry, Mulberry, Garnet (ultra-rare), Amber
**Cool Hues**: Dove, Steel, Moss, Forest, Navy

---

## 📝 Typography

### Font Stack
```css
--font-display: "Playfair Display", serif;  /* Headlines, titles */
--font-serif:   "Spectral", serif;          /* Body text, descriptions */
--font-sans:    "Inter", system-ui, sans-serif; /* UI elements, navigation */
```

### Hierarchy

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| H1 | Playfair Display | 600 | 3rem–5rem | -0.02em |
| H2 | Playfair Display | 600 | 1.5rem–2rem | -0.01em |
| H3 | Playfair Display | 500 | 1.25rem | -0.01em |
| Body | Spectral | 400 | 1rem | normal |
| Caption | Spectral | 400 | 0.875rem | 0.01em |
| UI/Nav | Inter | 500 | 0.875rem | 0.02em |
| Button | Inter | 600 | 0.875rem | 0.05em |

### Voice & Tone
- **Formal but Approachable** — Emulate Victorian parlor conversation
- **Confident** — Speak with authority about art and craftsmanship
- **Exclusive** — Imply membership in a distinguished circle
- **Whimsical** — Dogs as aristocrats allows playful undertones

---

## 🖼️ Visual Elements

### Card & Container Style
```css
/* Standard card */
border: 1px solid rgba(212, 175, 55, 0.3);  /* primary/30 */
border-radius: 0.5rem;
background: rgba(15, 14, 12, 0.8);  /* card with transparency */

/* Hover state */
border-color: rgba(212, 175, 55, 0.6);  /* primary/60 */
box-shadow: 0 4px 20px rgba(212, 175, 55, 0.1);

/* Featured/highlighted */
border-color: rgba(212, 175, 55, 0.8);
background: linear-gradient(135deg, rgba(15,14,12,0.95), rgba(26,24,20,0.95));
```

### Button Styles

**Primary Button**
```css
background: var(--primary);  /* #D4AF37 */
color: var(--primary-foreground);  /* near black */
&:hover { filter: brightness(1.1); }
```

**Secondary/Outline Button**
```css
background: transparent;
border: 1px solid rgba(212, 175, 55, 0.5);
color: var(--primary);
&:hover { 
  background: rgba(212, 175, 55, 0.1);
  border-color: rgba(212, 175, 55, 0.8);
}
```

### Image Treatment
- **Aspect Ratio**: 1:1 (square portraits)
- **Border Radius**: 0.5rem (8px)
- **Border**: 1px solid primary/40
- **Object Fit**: cover
- **Loading**: Lazy load with skeleton placeholder

### Rarity Tier Colors
| Tier | Color | Usage |
|------|-------|-------|
| Legendary | `#FFD700` Gold with glow | Top 1% (94 NFTs) |
| Epic | `#9B59B6` Purple | Top 5% (470 NFTs) |
| Rare | `#3498DB` Blue | Top 15% (1,410 NFTs) |
| Uncommon | `#2ECC71` Green | Top 40% (3,760 NFTs) |
| Common | `#95A5A6` Gray | Bottom 60% (5,640 NFTs) |

---

## 🏛️ Layout Principles

### Grid System
- **Max Width**: 1400px
- **Container Padding**: 2rem
- **Column Gap**: 1.5rem–2rem
- **Gallery Grid**: 2 cols (mobile) → 3 cols (tablet) → 4 cols (desktop)

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Section Rhythm
- Generous white space between sections
- Subtle vignette on page background
- Content reveals with gentle upward animation

---

## 🎭 NFT Trait System

### Categories (OpenSea Metadata)
| Trait | Unique Values | Rarity Impact |
|-------|---------------|---------------|
| **Breed** | 226 | Highest (extinct breeds score 3,000+ pts) |
| **Background** | 75 | Medium (rare settings score 150+ pts) |
| **Fabric** | 29 | High (mythical fabrics score 3,000+ pts) |
| **Color** | 79 | High (rare colors score 1,500+ pts) |
| **Accessory** | 83 | Very High (Fabergé items score 4,700 pts) |
| **Clothing** | 7,988 | Medium (combined garment types) |

### Breed Tiers (by appearance count)
- **Legendary** (≤5): Extinct breeds — Alaunt, Blue Paul Terrier, Molossus
- **Epic** (6-15): Ultra-rare — Akbash Dog, Lundehund, Castro Laboreiro Dog
- **Rare** (16-45): Uncommon — Azawakh, Catalburun, Dingo
- **Uncommon** (46-70): Less common — Basenji, Bearded Collie, Belgian breeds
- **Common** (71+): Popular — Golden Retriever, Beagle, Labrador

### Fabric Hierarchy
```
Mythical: Celestial Silk, Divine Tapestry (3-5 NFTs)
Luxury:   Platinum Thread, Royal Ermine (20-60 NFTs)
Premium:  Cashmere, Brocade, Damask (100-300 NFTs)
Standard: Silk, Velvet, Satin, Linen (1,000+ NFTs)
```

### Background Settings
```
Grand:    Palace Throne Room, Vatican Palace, Russian Imperial Palace
Elite:    Opera House Box, Grand Ballroom, Newport Mansion
Refined:  Library Bookshelf, Marble Fireplace, Victorian Parlor
Working:  Workshop Interior, Blacksmith Forge, Factory Workshop
Simple:   Dark Velvet Drape, Burgundy Wallpaper (most common)
```

---

## ✨ Animation & Interaction

### Timing Functions
```css
--ease-reveal: ease-in-out;
--ease-hover:  ease-out;
--duration-fast: 0.15s;
--duration-normal: 0.25s;
--duration-reveal: 0.35s;
```

### Reveal Animation
```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Hover States
- Buttons: brightness increase (110%)
- Cards: border glow + subtle shadow
- Images: slight scale (1.02) + shadow
- Links: color shift to primary gold

### Focus States
```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring));  /* Gold ring */
}
```

---

## 📱 Responsive Behavior

### Breakpoints
```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1400px  /* Max container */
```

### Adaptive Typography
| Element | Mobile | Desktop |
|---------|--------|---------|
| H1 | 2rem | 3rem–5rem |
| H2 | 1.25rem | 1.5rem–2rem |
| Body | 0.9rem | 1rem |

---

## 🔤 Iconography

### Style Guidelines
- Line weight: 1.5px–2px stroke
- Corner radius: Slightly rounded
- Size: 16px, 20px, 24px
- Color: Inherit from text or primary gold

### Recommended Icon Set
- **Lucide React** — Clean, consistent line icons
- Use sparingly — let the art speak

---

## 📜 Copywriting Guidelines

### Headlines
- Evoke grandeur and exclusivity
- Reference club membership
- Examples:
  - "Where Legacy Lives Forever"
  - "Your Portrait Awaits"
  - "Join the 400"

### Descriptions
- Reference the art historical context
- Mention the uniqueness (1/1)
- Highlight the craftsmanship

### Trait Descriptions
- Use period-appropriate language
- "Adorned in" not "Wearing"
- "Rendered against" not "Background is"
- "Crafted from" not "Made of"

---

## 🎯 Do's and Don'ts

### Do
✅ Use rich, warm tones — embrace the Gilded Age palette
✅ Maintain generous spacing — let content breathe
✅ Use serif fonts for content — reinforce the classical aesthetic
✅ Apply subtle animations — reveal, not distract
✅ Reference the art world — "portraits," "collection," "curator"

### Don't
❌ Use harsh, bright colors — avoid neon or pure white
❌ Overcrowd layouts — the art needs space to shine
❌ Use casual language — maintain the aristocratic tone
❌ Add excessive UI chrome — minimalism serves the art
❌ Forget accessibility — ensure contrast ratios meet WCAG AA

---

## 📊 Component Reference

### Standard Components
- **Container** — Max-width wrapper with padding
- **Section** — Vertical spacing unit
- **Card** — Bordered container with gold accents
- **Button** — Primary (gold) and Outline variants
- **Accordion** — Expandable content sections
- **Badge** — Small labels for traits/rarity
- **SafeImage** — Image with fallback handling

### Composite Patterns
- **Gallery Grid** — Responsive image grid
- **Trait Bar** — Horizontal bar with percentage fill
- **Rarity Badge** — Colored tier indicator
- **Wallet Connect** — Dropdown with wallet options

---

*Design Language v1.0 — November 2025*
*400 Club — A Generative Portrait Membership Collection*
