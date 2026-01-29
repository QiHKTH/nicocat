

# Nico Weight Tracker - Nordic Luxury Redesign

A complete visual transformation inspired by Swedish fine dining websites and high-end photography portfolios. The design will feature Nico's photo as an immersive hero background with the weight chart as the centerpiece.

---

## Design Philosophy

**Inspiration Sources:**
- Swedish Michelin-starred restaurant websites (Noma, Faviken aesthetic)
- Nordic photography portfolios with cinematic compositions
- Scandinavian minimalism with warm, organic tones

**Key Visual Elements:**
- Full-bleed hero image with gradient fade
- Premium serif typography for headings (Playfair Display)
- Clean sans-serif for data (Inter)
- Muted earth tones: warm grays, soft creams, subtle sage accents
- Generous whitespace and elegant spacing

---

## Page Structure

```text
+--------------------------------------------------+
|                                                  |
|     [Hero Section - Full Screen]                 |
|     Cat photo background with gradient overlay   |
|                                                  |
|              "NICO"                              |
|         Weight Journey                           |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [Weight Chart - Hero Element]                |
|     Large, prominent chart floating above        |
|     Semi-transparent glassmorphism card          |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [Cat Profile Section]                        |
|     Name, Breed, Birthday, Adoption, Neutered    |
|     Elegant card with subtle border              |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [Stats Grid]                                 |
|     Current | Average | Max | Min                |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [Weight Input]                               |
|     Minimal, elegant input bar                   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [History + Tools]                            |
|     Collapsible history, Export/Clear            |
|                                                  |
+--------------------------------------------------+
|                                                  |
|     [Footer]                                     |
|     "Data stored locally in your browser"        |
|                                                  |
+--------------------------------------------------+
```

---

## Color Palette

**Primary Colors:**
- Background: `#F8F6F3` (warm off-white)
- Foreground: `#2C2C2C` (charcoal)
- Accent: `#7D8471` (sage green, Nordic nature)

**Supporting Colors:**
- Card Background: `rgba(255, 255, 255, 0.85)` (glassmorphism)
- Muted Text: `#8B8B8B` (warm gray)
- Border: `#E8E4DF` (subtle warm gray)
- Chart Line: `#2C2C2C` with sage gradient fill

---

## Typography

**Headings:** Playfair Display (Google Fonts) - Elegant serif
- Hero title: 4rem, letter-spacing 0.3em, uppercase
- Section titles: 1.25rem, weight 500

**Body:** Inter (already available) - Clean sans-serif
- Data values: 2rem, semibold, tracking tight
- Labels: 0.75rem, uppercase, letter-spacing 0.1em

---

## Components to Create/Modify

### 1. New: HeroSection Component
- Full viewport height hero with cat photo background
- Gradient overlay (transparent to warm off-white)
- "NICO" title with elegant typography
- "Weight Journey" subtitle
- Smooth scroll indicator

### 2. New: CatProfile Component
Cat's basic information displayed elegantly:
- **Name:** Nico
- **Breed:** Tabby Cat (Li Hua)
- **Sex:** Male
- **Birthday:** May 6, 2025
- **Arrived Home:** December 20, 2025
- **Neutered:** January 14, 2026

Layout: Horizontal on desktop, vertical grid on mobile

### 3. Enhanced: WeightChart Component
- Larger chart height (350px)
- Glassmorphism card with backdrop blur
- Chart line in charcoal with sage green gradient fill
- English labels (Jan, Feb, etc.)
- Floating above hero with negative margin effect

### 4. Updated: WeightStats Component
- English labels: "Current", "Average", "High", "Low"
- Refined typography with uppercase labels
- Subtle card borders

### 5. Updated: WeightInput Component
- English placeholder: "Enter weight"
- Button text: "Record"
- Date display: "Today, January 29"

### 6. Updated: WeightHistory Component
- English: "History", "records"
- Date format: "January 28, 2026"

### 7. Updated: ToolBar Component
- English: "Export CSV", "Clear Data"
- Confirmation dialogs in English

### 8. Updated: Index Page
- New layout with hero section
- Reordered sections for visual hierarchy
- Chart positioned prominently after hero

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | New color palette, custom fonts import, glassmorphism utilities |
| `tailwind.config.ts` | Add Playfair Display font family, custom colors |
| `src/pages/Index.tsx` | New layout structure with hero, profile section |
| `src/components/HeroSection.tsx` | **NEW** - Hero with photo background |
| `src/components/CatProfile.tsx` | **NEW** - Cat info card |
| `src/components/WeightChart.tsx` | Enhanced styling, English labels |
| `src/components/WeightStats.tsx` | English labels, refined design |
| `src/components/WeightInput.tsx` | English text, refined styling |
| `src/components/WeightHistory.tsx` | English text |
| `src/components/ToolBar.tsx` | English text |

---

## Technical Implementation Details

### Google Fonts Integration
Add to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
```

### CSS Variables (New Palette)
```css
:root {
  --background: 30 20% 97%;      /* #F8F6F3 */
  --foreground: 0 0% 17%;        /* #2C2C2C */
  --accent: 90 8% 48%;           /* #7D8471 sage */
  --card: 0 0% 100%;
  --muted-foreground: 0 0% 55%;  /* #8B8B8B */
  --border: 30 15% 90%;          /* #E8E4DF */
}
```

### Glassmorphism Card Style
```css
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
```

### Hero Background with Gradient Fade
```css
.hero-overlay {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 40%,
    hsl(var(--background)) 100%
  );
}
```

---

## Cat Profile Data Structure

```typescript
const catProfile = {
  name: "Nico",
  breed: "Tabby Cat (Li Hua)",
  sex: "Male",
  birthday: "2025-05-06",
  arrivedHome: "2025-12-20",
  neuteredDate: "2026-01-14",
};
```

---

## Responsive Considerations

- **Desktop:** Full hero experience, horizontal profile layout
- **Tablet:** Scaled hero, 2-column profile grid
- **Mobile:** Compact hero (70vh), vertical profile stack, full-width cards

---

## Summary

This redesign transforms the app from a simple tracker into an elegant, photography-inspired showcase of Nico's health journey. The weight chart becomes the visual centerpiece, floating above a beautiful cat photo with a seamless gradient transition. Premium typography and a warm Nordic color palette create a sophisticated, gallery-like experience while maintaining full functionality.

