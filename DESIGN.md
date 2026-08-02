---
name: Aether Portfolio System
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848483'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-columns: '12'
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 24px
  unit-xs: 4px
  unit-sm: 8px
  unit-md: 16px
  unit-lg: 32px
  unit-xl: 64px
---

## Brand & Style

This design system is built for high-end personal portfolios and technical showcases. It draws inspiration from Swiss Design principles and modern high-growth SaaS aesthetics (Apple, Linear, Vercel). The brand personality is professional, precise, and handcrafted, evoking an emotional response of high trust and technical expertise.

The style is characterized by:
- **Minimalism:** Aggressive use of whitespace to create focus and visual "breathing room."
- **Swiss Grid:** A rigid, mathematical approach to layout that ensures alignment and structural integrity.
- **Editorial Influence:** Large, bold typography with tight tracking reminiscent of high-end print magazines.
- **Modern SaaS Polish:** Subtle micro-interactions, crisp borders, and a refined "monotone-plus-accent" color strategy.

## Colors

The color palette is strictly curated to maintain a premium, understated aesthetic. 
- **Primary Text (#111111):** Used for headlines and critical information to provide maximum contrast.
- **Secondary Text (#555555):** Used for body copy and metadata to create a soft visual hierarchy.
- **Accent Blue (#2563EB):** Reserved for primary actions, active states, and small focal points. 
- **Surface (#F8F9FB):** Used for large section backgrounds or container fills to subtly distinguish content blocks from the main white background.
- **Borders (#E5E7EB):** Used for hairline dividers and container outlines.

## Typography

The typography utilizes **Inter** exclusively to achieve a systematic, utilitarian look. 
- **Headings:** Use tight negative letter-spacing and high weights to create a "blocky" editorial feel.
- **Body Copy:** Optimized for readability with a generous line height (1.6).
- **Labels:** Small caps/uppercase styling should be used for categories or eyebrow text to differentiate from body text without increasing font size.
- **Hierarchy:** Rely on size and weight contrast rather than color variation.

## Layout & Spacing

The design system employs a **12-column fluid grid** with a maximum container width of 1440px. 

- **Alignment:** All elements must snap to the grid. In asymmetric layouts, content should span specific column counts (e.g., a 4-column sidebar and an 8-column main content area).
- **Spacing Rhythm:** Use a base-8 scale for all padding and margins. 
- **Breakpoints:**
  - **Desktop (1024px+):** 64px page margins, 24px gutters.
  - **Tablet (768px - 1023px):** 40px page margins, 20px gutters.
  - **Mobile (Up to 767px):** 24px page margins, 16px gutters.
- **Vertical Spacing:** Use "unit-xl" (64px) or "unit-lg" (32px) to separate major sections, ensuring the layout feels open and intentional.

## Elevation & Depth

This design system avoids heavy shadows and skeuomorphism in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surfaces:** Use `#F8F9FB` for secondary sections or cards. Depth is communicated through color shifts rather than shadow.
- **Borders:** A 1px solid border (`#E5E7EB`) is the primary tool for defining containers. 
- **Interactions:** Subtle "lift" can be achieved using a very soft, high-diffusion shadow (0px 4px 20px rgba(0,0,0,0.04)) only on hover states to signal interactivity.
- **Glassmorphism:** The sticky navigation bar should use a backdrop blur (20px) with a semi-transparent white background (80% opacity) to maintain context while scrolling.

## Shapes

The shape language is "Soft" (0.25rem / 4px base radius) to maintain a precise, technical feel while avoiding the harshness of sharp corners.

- **Small elements (Buttons, Inputs):** 4px (0.25rem).
- **Medium elements (Cards):** 8px (0.5rem).
- **Large containers:** 12px (0.75rem).
- **Icons:** Use linear, 2px stroke icons with slightly rounded caps to match the UI's roundedness.

## Components

- **Sticky Navigation:** A slim top bar with a glassmorphism effect. Navigation links use `label-sm` typography with a subtle opacity shift on hover.
- **Buttons:**
  - **Primary:** Solid `#111111` with white text. 4px border-radius. No gradients.
  - **Secondary/Ghost:** Transparent background with a `#E5E7EB` border. Transitions to a light grey fill on hover.
- **Cards:** Crisp white backgrounds with a 1px `#E5E7EB` border. Use `unit-md` (16px) or `unit-lg` (32px) internal padding.
- **Chips:** Small, pill-shaped tags with `#F8F9FB` background and `#555555` text for category labels.
- **Input Fields:** 1px `#E5E7EB` border, focusing to a 1px `#2563EB` border. Use `body-md` for placeholder and input text.
- **Lists:** Clean, horizontal dividers between items. Use `headline-md` for list titles to maintain the editorial feel.
- **Section Headers:** Large `display-xl` type followed by a thin horizontal rule to anchor the grid.