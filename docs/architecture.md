# Architecture Documentation — SINTECSA Web

## Overview

The SINTECSA website is a **Next.js 15 App Router** application with Server Components by default and Client Components where interactivity is needed. It follows a clean, modular architecture designed for maintainability and performance.

---

## Rendering Strategy

| Component | Rendering | Reason |
|---|---|---|
| `app/layout.tsx` | Server | Root layout, metadata |
| `app/page.tsx` | Server | Landing page shell |
| `app/quienes-somos/page.tsx` | Server | Static content, SEO |
| `app/soluciones/page.tsx` | Server | Static content, SEO |
| `components/layout/Navbar.tsx` | Client | Scroll listener, router |
| `components/layout/Footer.tsx` | Server | Static links |
| `components/home/Hero.tsx` | Client | Mount check, animations |
| `components/home/Services.tsx` | Client | Framer Motion |
| `components/home/Stats.tsx` | Client | Counter animation, InView |
| `components/home/AboutTeaser.tsx` | Client | Framer Motion |
| `components/home/Contact.tsx` | Client | Form state, submission |
| `components/chatbot/ChatBot.tsx` | Client | State, interactions |
| `components/ui/AnimatedSection.tsx` | Client | useInView hook |
| `components/ui/Button.tsx` | Client | Motion wrapper |

---

## Data Flow

```
lib/constants.ts     ──► All components (company data, services, FAQ)
lib/content.ts       ──► Page components (long-form text)
lib/images/index.ts  ──► Components (image paths — currently placeholders)
```

No API routes or database. All data is static and co-located in `lib/`.

---

## Directory Structure

```
sintecsa-web/
├── app/                         # Next.js App Router
│   ├── globals.css              # Global styles + Tailwind v4
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # / (Landing)
│   ├── quienes-somos/
│   │   └── page.tsx             # /quienes-somos
│   └── soluciones/
│       └── page.tsx             # /soluciones
│
├── components/
│   ├── chatbot/
│   │   └── ChatBot.tsx          # Floating FAQ chatbot
│   ├── home/
│   │   ├── Hero.tsx             # Full-screen hero
│   │   ├── Services.tsx         # 6-card services grid
│   │   ├── Stats.tsx            # Animated counter stats
│   │   ├── AboutTeaser.tsx      # About preview section
│   │   └── Contact.tsx          # Contact form
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Footer.tsx           # Site footer
│   └── ui/
│       ├── AnimatedSection.tsx  # Scroll animation primitives
│       └── Button.tsx           # Button component
│
├── lib/
│   ├── constants.ts             # Core data constants
│   ├── content.ts               # Page content
│   └── images/
│       └── index.ts             # Image path constants
│
├── docs/                        # Documentation
│   ├── architecture.md          # This file
│   ├── components.md            # Component reference
│   └── content.md               # Content guide
│
├── public/                      # Static assets
├── CLAUDE.md                    # Claude Code guide
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS config (Tailwind v4)
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

---

## Animation Architecture

### Scroll-Triggered Animations
Using Framer Motion's `useInView` hook via `AnimatedSection` wrapper:

```tsx
// Single element animation
<AnimatedSection variant="slideUp" delay={0.1}>
  <Content />
</AnimatedSection>

// Staggered list animation
<StaggerContainer staggerDelay={0.08}>
  <StaggerItem><Card1 /></StaggerItem>
  <StaggerItem><Card2 /></StaggerItem>
</StaggerContainer>
```

### Available Variants
- `fadeIn` — opacity 0→1
- `slideUp` — opacity + translateY(40px→0)
- `slideDown` — opacity + translateY(-30px→0)
- `slideLeft` — opacity + translateX(40px→0)
- `slideRight` — opacity + translateX(-40px→0)
- `scaleIn` — opacity + scale(0.92→1)
- `none` — no animation

### Counter Animation (Stats)
Custom `useCountUp` hook using `requestAnimationFrame` and an easeOutQuart easing function. Triggers when the stats section enters the viewport.

---

## Styling Architecture

### Tailwind v4 Setup
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-blue: #0066cc;
  /* ... custom tokens */
}
```

PostCSS plugin: `@tailwindcss/postcss`

### CSS Custom Properties
All brand colors are defined as `@theme` variables in `globals.css`, making them available as Tailwind utilities (e.g., `bg-[#0066cc]` or `text-blue`).

### Responsive Breakpoints
Standard Tailwind breakpoints used throughout:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Mobile-first approach: base styles for mobile, modifiers for larger screens.

---

## Performance Considerations

1. **Server Components** used by default — zero JS for static content
2. **`"use client"` only** where interactivity is required
3. **`Inter` font** loaded via `next/font/google` with `display: swap`
4. **Image optimization** via Next.js `<Image>` (configured in `next.config.ts`)
5. **Framer Motion** animations are hardware-accelerated (transform/opacity only)
6. **Scroll listener** in Navbar uses `{ passive: true }` for performance

---

## SEO

- `metadata` export on each page (title, description, keywords, OG tags)
- `lang="es"` on `<html>` element
- Semantic HTML throughout (sections, nav, footer, headings hierarchy)
- Smooth scroll behavior for anchor links

---

## Future Enhancements

- [ ] Add `app/api/contact/route.ts` for real form submission
- [ ] Integrate CMS (e.g., Sanity, Contentful) for content management
- [ ] Add `app/blog/` section for technical articles
- [ ] Implement real image assets in `public/images/`
- [ ] Add Google Analytics or Plausible tracking
- [ ] Add sitemap.xml generation
