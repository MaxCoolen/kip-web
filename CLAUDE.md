# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Kip 'N Grill — a Dutch-language landing page for a rotisserie chicken food truck. Single-page React app.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # tsc + vite build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Stack

- **React 19** + **TypeScript** (strict mode, ES2023 target)
- **Vite 8** with `@vitejs/plugin-react` (Fast Refresh)
- **Tailwind CSS 3** with a custom theme (no component libraries)
- **lucide-react** for icons
- **PostCSS** with Autoprefixer

## Architecture

Single-page layout assembled in `src/pages/HomePage.tsx`, which composes all section components in order:

```
Navbar → Hero → AboutSection → GrillDivider → MenuSection →
GrillDivider → FoodGallery → GrillDivider → LocationSection →
GrillDivider → ContactSection → Footer
```

`src/App.tsx` renders only `<HomePage />`. Entry point is `src/main.tsx`.

## Design System

Defined in `tailwind.config.js` — do not use default Tailwind colors:

- **`soot`** (950–600): dark brown backgrounds
- **`ember`** (300–600): orange/red accents and fire effects
- **`cream`** (50–200): primary text
- **`smoke`** (400–600): secondary text

Custom fonts loaded via Google Fonts in `src/index.css`:
- `font-display` → Bebas Neue (headings)
- `font-serif` → Crimson Pro (body)
- `font-mono` → JetBrains Mono

Custom animations: `float`, `glow-pulse`, `rise`, `fade-up`, `slide-in-left`, `scale-in`. Staggered delays via `data-*` attributes.

`src/index.css` also defines: noise grain overlay, grill-stripe divider pattern, ember scrollbar, fire-glow and soft-shadow text utilities.

## Style Guidelines

This project uses the `/frontend-design` skill philosophy — distinctive, production-grade UI. Avoid generic aesthetics. The design direction is bold BBQ/grill maximalism with texture, asymmetry, and motion. Maintain the existing soot/ember/cream palette and Bebas Neue + Crimson Pro typography pairing.

The page language is **Dutch**.
