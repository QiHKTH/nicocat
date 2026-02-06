
# Fixed Background with Parallax Effect

## Overview
Create a fixed background effect where Nico's photo remains visible at all times as you scroll, with the content cards floating above it.

## Changes Required

### 1. Index.tsx - Add Fixed Background Container
- Add a fixed-position background layer with the hero image that covers the entire viewport
- This layer will stay in place as the page scrolls
- All content will scroll on top of this fixed background

### 2. HeroSection.tsx - Simplify to Overlay Content Only
- Remove the background image from HeroSection (since it's now in the fixed layer)
- Keep the title "NICO", milestones, and scroll indicator
- Maintain the gradient overlay for text readability

### 3. index.css - Adjust Overlay Styling
- Remove or reduce the bottom fade in `.hero-overlay` so the image remains visible throughout
- Add semi-transparent background to main content area for readability

### 4. Card Styling Adjustments
- Ensure `.glass-card` has sufficient opacity/blur to remain readable over the photo background
- May slightly increase background opacity from 0.85 to ensure text contrast

## Visual Result
```text
+---------------------------+
|                           |
|   [Fixed Background]      |  <-- Nico's photo stays fixed
|   NICO                    |
|   Weight Journey          |
|                           |
+---------------------------+
         |
         v  (scroll down)
+---------------------------+
|   [Fixed Background]      |  <-- Same photo, still visible
|   +-------------------+   |
|   | Weight Chart Card |   |  <-- Cards float over photo
|   +-------------------+   |
|   +-------------------+   |
|   | Cat Profile Card  |   |
|   +-------------------+   |
+---------------------------+
```

## Technical Details
- Use CSS `position: fixed` with `inset-0` for the background layer
- Set `z-index: 0` for background, `z-index: 10` for scrolling content
- Apply `bg-fixed` or equivalent for parallax behavior
- Adjust gradient overlay to be more subtle so the cat remains visible
