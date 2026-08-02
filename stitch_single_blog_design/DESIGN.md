---
name: Midnight Kinetic
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0d0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d9c3ad'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#a18e79'
  outline-variant: '#534433'
  surface-tint: '#ffb95f'
  primary: '#ffc887'
  on-primary: '#472a00'
  primary-container: '#fca311'
  on-primary-container: '#663f00'
  inverse-primary: '#855300'
  secondary: '#b9c6ea'
  on-secondary: '#23304d'
  secondary-container: '#3c4967'
  on-secondary-container: '#abb8db'
  tertiary: '#d2d2d2'
  on-tertiary: '#303030'
  tertiary-container: '#b6b6b6'
  on-tertiary-container: '#474747'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#b9c6ea'
  on-secondary-fixed: '#0d1b36'
  on-secondary-fixed-variant: '#3a4664'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built for high-end digital portfolios and creative showcases. It employs a **High-Contrast / Modern** aesthetic that leans into deep blacks and vibrant amber accents to create a sense of prestige and technical precision. 

The personality is authoritative yet energetic. By utilizing a "Void" background strategy (pure black), the interface recedes to let content—photography, case studies, and cinematic media—take center stage. The style incorporates subtle elements of **Minimalism** with sharp, purposeful typography and generous whitespace to ensure the user feels a sense of curated luxury rather than clutter. The emotional goal is to evoke confidence, professional expertise, and a forward-thinking technical edge.

## Colors

The palette is engineered for a premium dark-mode experience. 

*   **Primary (#FCA311):** Reserved strictly for high-priority actions, progress indicators, and focal points. It provides a striking contrast against the dark base.
*   **Secondary/Surface (#14213D):** Used for structural elements like cards, navigation bars, and section dividers to provide depth without breaking the dark aesthetic.
*   **Background (#000000):** The foundation of the design system. It ensures maximum contrast and saves power on OLED displays.
*   **Neutral (#E5E5E5 & #FFFFFF):** Used for typography and iconography to maintain AA/AAA accessibility standards. Pure white is reserved for headers, while Platinum is used for long-form body text to reduce eye strain.

## Typography

The typography system balances geometric modernity with technical precision. 

**Sora** is utilized for headlines to provide a bold, futuristic look. The tight letter-spacing on larger sizes creates a cohesive, high-fashion editorial feel. **Inter** serves as the workhorse for body copy, chosen for its exceptional legibility in dark mode. **JetBrains Mono** is introduced for labels, metadata, and captions to reinforce the "Kinetic" and technical nature of the design system. 

Text hierarchy is strictly enforced through color: Headers are always #FFFFFF, while body text uses #E5E5E5 to soften the reading experience.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high-margin boundaries to create a "letterboxed" cinematic feel on wide displays. 

A 12-column system is used for desktop (breakpoint: 1024px+), while a 4-column system is used for mobile (breakpoint: <768px). Spacing is derived from a base-8 rhythm. Section vertical padding should be aggressive (80px - 120px) to maintain the minimalist, premium atmosphere. Elements should feel intentionally spaced to avoid a crowded interface.

## Elevation & Depth

In this dark-mode environment, shadows are avoided in favor of **Tonal Layers** and **Low-Contrast Outlines**. 

Depth is achieved by stacking #14213D (Oxford Blue) surfaces on top of #000000 backgrounds. To define boundaries between components, use 1px solid borders in a semi-transparent white (opacity 10%) or a muted version of the secondary color. When an element requires a "hover" state, a subtle inner-glow using the Accent color (#FCA311) at 5% opacity can be used to indicate interactivity without disrupting the flat aesthetic.

## Shapes

The design system uses **Soft** geometry. Small corner radii (4px to 8px) are applied to cards, buttons, and input fields to take the "edge" off the high-contrast colors while maintaining a professional, structured appearance. 

Image containers and main action buttons follow the `rounded-lg` (8px) standard. Iconography should be "Line" style with a 2px stroke width to match the precision of the JetBrains Mono typography.

## Components

*   **Buttons:** Primary buttons use the #FCA311 background with #000000 text for maximum "pop." Secondary buttons should be #14213D with #FFFFFF text.
*   **Cards:** Use #14213D for card backgrounds with no shadow. Use 1px borders (#FFFFFF at 10% opacity) for definition.
*   **Chips:** Utilized for categories or tags. Background: #14213D; Text: #FCA311; Font: JetBrains Mono (Label-sm).
*   **Input Fields:** Ghost-style inputs with 1px #E5E5E5 borders. On focus, the border transitions to #FCA311.
*   **Navigation:** Sticky header with a background of #000000 at 80% opacity with a heavy backdrop-blur (20px) to create a glass effect over content.
*   **Project Lists:** Large-scale list items with #FFFFFF titles that transition to #FCA311 on hover, accompanied by a thumbnail preview.