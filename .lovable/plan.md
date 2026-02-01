

# Edit Feature, Profile Optimization & Typography Enhancement

This plan covers three improvements: adding an Edit feature for historical data, streamlining the cat profile display, and enhancing typography with premium fonts.

---

## 1. Edit Data Feature

Add an "Edit" button to the toolbar that opens a dialog/sheet for managing weight records.

### Implementation Approach

**New Component: DataEditor**
- A Sheet (slide-out panel) containing:
  - A form to add records for any date (past or future)
  - A list of existing records with inline edit capability
  - Delete option for each record

**ToolBar Enhancement**
- Add "Edit" button between "Export CSV" and "Clear Data"
- Opens the DataEditor sheet when clicked

**WeightInput Enhancement**
- Add optional date picker to allow recording past dates
- The existing "Record" flow remains for quick today's entries

### UI Flow

```text
ToolBar: [Export CSV] [Edit Data] [Clear Data]
                         |
                         v
              +-------------------+
              |   Edit Records    |
              +-------------------+
              | + Add New Record  |
              | [Date] [Weight]   |
              +-------------------+
              | Existing Records  |
              | Jan 28: 4.8 kg [x]|
              | Jan 26: 4.7 kg [x]|
              | ...               |
              +-------------------+
```

---

## 2. Cat Profile Optimization

Simplify the main profile card and move detailed dates to a hover tooltip on the hero image.

### Current State
6 items displayed: Name, Breed (Tabby Cat Li Hua), Sex, Birthday, Arrived Home, Neutered

### New Design

**Main Profile Card (4 items only):**
| NAME | BREED | SEX | AGE |
|------|-------|-----|-----|
| Nico | Tabby | Male | 8 months |

- Breed simplified to just "Tabby" (cleaner)
- Age calculated dynamically from birthday
- Horizontal layout on all screen sizes

**Hero Section Hover Overlay:**
When hovering over the hero image, display the three milestone dates:
- Birthday: May 6, 2025
- Arrived Home: December 20, 2025
- Neutered: January 14, 2026

This creates an elegant "discover more" interaction.

### Age Calculation Logic
```typescript
const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const now = new Date();
  const months = (now.getFullYear() - birthDate.getFullYear()) * 12 
               + (now.getMonth() - birthDate.getMonth());
  
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths > 0 
    ? `${years} yr ${remainingMonths} mo` 
    : `${years} year${years > 1 ? 's' : ''}`;
};
```

---

## 3. Typography Enhancement

Upgrade to more premium, Nordic-inspired fonts.

### Font Selection

**Headlines (Hero, Titles):**
- **Cormorant Garamond** - Elegant, high-end editorial feel
- Alternative: Keep Playfair Display but use lighter weights

**Body & Labels:**
- **DM Sans** - Modern, geometric, excellent readability
- Cleaner than Source Sans Pro

**Data Values:**
- **Tabular Lining Figures** from DM Sans for aligned numbers

### CSS Updates

```css
/* Premium Font Stack */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'DM Sans', sans-serif;
}

/* Hero title - more elegant spacing */
.hero-title {
  font-family: var(--font-display);
  font-weight: 300;
  letter-spacing: 0.35em;
}

/* Labels - refined tracking */
.label-premium {
  font-family: var(--font-body);
  font-weight: 500;
  letter-spacing: 0.12em;
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Update Google Fonts import |
| `src/index.css` | New font variables, refined typography classes |
| `tailwind.config.ts` | Update font family definitions |
| `src/components/ToolBar.tsx` | Add "Edit Data" button |
| `src/components/DataEditor.tsx` | **NEW** - Edit/add records panel |
| `src/components/CatProfile.tsx` | Simplified 4-item layout with age |
| `src/components/HeroSection.tsx` | Add hover overlay for dates |
| `src/pages/Index.tsx` | Pass edit handlers to ToolBar |
| `src/hooks/useWeightData.ts` | Add updateRecord function |

---

## Technical Details

### DataEditor Component Structure

```typescript
interface DataEditorProps {
  records: WeightRecord[];
  onAdd: (weight: number, date: string) => void;
  onUpdate: (date: string, weight: number) => void;
  onDelete: (date: string) => void;
}
```

Uses:
- Sheet component for slide-out panel
- Calendar component for date selection
- Input for weight entry
- ScrollArea for record list

### Hero Hover Implementation

```tsx
<div className="group relative">
  {/* Background Image */}
  <div className="absolute inset-0 bg-cover ..." />
  
  {/* Hover Info - Appears on hover */}
  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500">
    <div className="flex gap-8 text-foreground/80">
      <div>
        <span className="label-premium">Birthday</span>
        <span>May 6, 2025</span>
      </div>
      <div>
        <span className="label-premium">Arrived</span>
        <span>Dec 20, 2025</span>
      </div>
      <div>
        <span className="label-premium">Neutered</span>
        <span>Jan 14, 2026</span>
      </div>
    </div>
  </div>
</div>
```

---

## Visual Summary

### Before
```text
Profile Card:
[Name] [Breed: Tabby Cat (Li Hua)] [Sex] [Birthday] [Arrived] [Neutered]
       ^^^ 6 items, feels crowded
```

### After
```text
Hero Section:
+------------------------------------------+
|          [Hover to see dates]            |
|    NICO                                  |
|    Weight Journey                        |
|                                          |
|  Birthday: May 6 | Arrived: Dec 20 | ... |  <- appears on hover
+------------------------------------------+

Profile Card:
[NAME: Nico] [BREED: Tabby] [SEX: Male] [AGE: 8 months]
             ^^^ Clean, 4 essential items
```

---

## Summary

1. **Edit Feature**: New DataEditor sheet component with date picker for adding/editing any record, accessible via toolbar
2. **Profile Optimization**: Simplified to 4 key items (Name, Breed=Tabby, Sex, Age), milestone dates moved to hero hover overlay
3. **Typography**: Upgrade to Cormorant Garamond (display) + DM Sans (body) for a more premium Nordic aesthetic

