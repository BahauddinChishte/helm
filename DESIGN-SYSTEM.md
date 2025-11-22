# Design System Guide

This file explains how to customize the entire website's colors, fonts, spacing, and styles from one central location.

## Quick Color Changes

All colors are defined in `src/styles/global.css` at the top in the `:root` section. Simply change these values to update colors across the entire website:

```css
:root {
  /* Primary Colors - Change these to rebrand the entire site */
  --color-navy: #0A2540;           /* Main dark blue - used for headers, text */
  --color-navy-dark: #051729;      /* Darker blue - used for hover states */
  --color-orange: #FF6B35;         /* Main accent color - buttons, links */
  --color-orange-dark: #E65529;    /* Darker orange - used for hover states */

  /* Supporting Colors */
  --color-slate: #475569;          /* Body text, secondary text */
  --color-light: #F8FAFC;          /* Light backgrounds */
  --color-border: #E2E8F0;         /* Border colors */
}
```

### Example: Change to Green Theme

Replace the colors in `src/styles/global.css`:

```css
--color-navy: #1E4D2B;           /* Dark green instead of navy */
--color-navy-dark: #0F2614;      /* Darker green */
--color-orange: #10B981;         /* Bright green instead of orange */
--color-orange-dark: #059669;    /* Darker green for hover */
```

## Font Changes

Change fonts by updating these variables:

```css
--font-sans: 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-display: 'Mazius Display', serif;
```

Don't forget to update the font imports in `src/layouts/Layout.astro` if you change to different fonts.

## Spacing System

Consistent spacing throughout the site:

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

## Border Radius

Control roundness of corners:

```css
--radius-sm: 0.5rem;     /* Slightly rounded */
--radius-md: 0.75rem;    /* Medium rounded */
--radius-lg: 1rem;       /* More rounded */
--radius-xl: 1.5rem;     /* Very rounded */
--radius-2xl: 2rem;      /* Extra rounded */
```

## Shadows

Pre-defined shadow levels:

```css
--shadow-sm: ...;   /* Subtle shadow */
--shadow-md: ...;   /* Medium shadow */
--shadow-lg: ...;   /* Large shadow */
--shadow-xl: ...;   /* Extra large shadow */
--shadow-2xl: ...;  /* Maximum shadow */
```

## Using Colors in Your Code

### In Tailwind Classes

Use the brand colors with Tailwind:

```html
<div class="bg-brand-navy text-brand-orange">
  <button class="bg-brand-orange hover:bg-brand-orangeDark">
    Click me
  </button>
</div>
```

### In Custom CSS

Use the CSS variables directly:

```css
.my-custom-element {
  background-color: var(--color-navy);
  color: var(--color-orange);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
```

## Pre-built Component Classes

Use these classes for consistent styling:

### Buttons

```html
<button class="btn-primary">Primary Button</button>
<button class="btn-outline">Outline Button</button>
```

### Cards

```html
<div class="card">
  Card content with hover effect
</div>
```

### Sections

```html
<section class="section-padding">
  <div class="container-width">
    Content
  </div>
</section>
```

## Complete Theme Change Example

To completely rebrand the site, just change these 4 main colors in `src/styles/global.css`:

1. `--color-navy` - Your main brand color (headers, navigation)
2. `--color-navy-dark` - Darker version for hover states
3. `--color-orange` - Your accent color (buttons, CTAs)
4. `--color-orange-dark` - Darker version for button hovers

Everything else will automatically update!

## Files to Edit

- **Colors, Fonts, Spacing**: `src/styles/global.css` (lines 6-46)
- **Tailwind Config**: `tailwind.config.mjs` (already linked to CSS variables)
- **Font Imports**: `src/layouts/Layout.astro` (line 35)

After making changes, the build system will automatically apply them across all pages, components, and styles.
