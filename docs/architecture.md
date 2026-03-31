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
| `app/soluciones/[slug]/page.tsx` | Server (SSG) | Static params from `SERVICES`, SEO |
| `app/soluciones/[slug]/faq/page.tsx` | Server (SSG) | Static params from `SERVICES`, SEO |
| `components/layout/Navbar.tsx` | Client | Scroll listener, router |
| `components/layout/Footer.tsx` | Server | Static links |
| `components/home/Hero.tsx` | Client | Mount check, animations |
| `components/home/Services.tsx` | Client | Framer Motion |
| `components/home/Stats.tsx` | Client | Counter animation, InView |
| `components/home/Clients.tsx` | Client | Framer Motion marquee |
| `components/home/AboutTeaser.tsx` | Client | Framer Motion |
| `components/home/Contact.tsx` | Client | Form state, submission |
| `components/chatbot/ChatBot.tsx` | Client | State, interactions |
| `components/ui/AnimatedSection.tsx` | Client | useInView hook |
| `components/ui/Button.tsx` | Client | Motion wrapper |
| `components/soluciones/ServiceSidebarLayout.tsx` | Client | usePathname for active state |
| `components/soluciones/ServiceDetail.tsx` | Client | Image carousel state |
| `components/soluciones/ServiceFAQ.tsx` | Client | Accordion state |
| `components/soluciones/ServiceTabs.tsx` | Client | Tab state, hash routing |

---

## Data Flow

```
lib/constants.ts         ──► All components (company data, services, FAQ)
lib/content.ts           ──► Page components (long-form text)
lib/images/index.ts      ──► Components (image paths — service arrays, client logos)
lib/analytics.ts         ──► Client components (gtag event tracking)
lib/contactFormUtils.ts  ──► Contact.tsx (sanitization, validation, profanity filter)
lib/contact-validation.ts──► Shared validation (client + future API route)
```

No database. All data is static and co-located in `lib/`.

---

## Directory Structure

```
sintecsa-web/
├── app/                              # Next.js App Router
│   ├── globals.css                   # Global styles + Tailwind v4
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # / (Landing)
│   ├── quienes-somos/
│   │   └── page.tsx                  # /quienes-somos
│   └── soluciones/
│       ├── page.tsx                  # /soluciones (service grid)
│       └── [slug]/
│           ├── page.tsx              # /soluciones/[slug] (service detail)
│           └── faq/
│               └── page.tsx          # /soluciones/[slug]/faq (service FAQ)
│
├── components/
│   ├── chatbot/
│   │   └── ChatBot.tsx               # Floating FAQ chatbot
│   ├── home/
│   │   ├── Hero.tsx                  # Full-screen hero
│   │   ├── Services.tsx              # 6-card services grid
│   │   ├── Stats.tsx                 # Animated counter stats
│   │   ├── Clients.tsx               # Client logo marquee
│   │   ├── AboutTeaser.tsx           # About preview section
│   │   └── Contact.tsx              # Contact form
│   ├── layout/
│   │   ├── Navbar.tsx                # Navigation bar
│   │   └── Footer.tsx               # Site footer
│   ├── soluciones/
│   │   ├── ServiceSidebarLayout.tsx  # Sidebar + content panel wrapper
│   │   ├── ServiceDetail.tsx         # Service content with image carousel
│   │   ├── ServiceFAQ.tsx            # Per-service FAQ accordion
│   │   └── ServiceTabs.tsx           # Tab-based service viewer (standalone)
│   └── ui/
│       ├── AnimatedSection.tsx       # Scroll animation primitives
│       └── Button.tsx               # Button component
│
├── lib/
│   ├── constants.ts                  # Core data constants (services, nav, FAQ, stats)
│   ├── content.ts                    # Page content strings
│   ├── analytics.ts                  # Google Analytics / gtag event helpers
│   ├── contactFormUtils.ts           # Form sanitization, validation, profanity filter
│   ├── contact-validation.ts         # Shared validation types (client + server safe)
│   └── images/
│       └── index.ts                  # Image path constants (service arrays, client logos)
│
├── docs/                             # Documentation
│   ├── architecture.md              # This file
│   ├── components.md                # Component reference
│   └── content.md                   # Content guide
│
├── public/                           # Static assets
├── CLAUDE.md                         # Claude Code guide
├── next.config.ts                    # Next.js config
├── postcss.config.mjs                # PostCSS config (Tailwind v4)
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

---

## Routing

```
/                          → app/page.tsx
/quienes-somos             → app/quienes-somos/page.tsx
/soluciones                → app/soluciones/page.tsx
/soluciones/[slug]         → app/soluciones/[slug]/page.tsx
/soluciones/[slug]/faq     → app/soluciones/[slug]/faq/page.tsx
```

The `[slug]` dynamic segments are statically pre-rendered at build time via `generateStaticParams()`, which maps over `SERVICES` from `lib/constants.ts`.

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

### Marquee (Clients)
Infinite horizontal scroll using Framer Motion's `animate` prop with `x: ["0%", "-50%"]` and `repeat: Infinity`. The logo array is duplicated 6× to ensure seamless looping.

### Image Carousel (ServiceDetail, ServiceTabs)
Auto-advances every 6 seconds using `setInterval`. Manual prev/next buttons and dot indicators. Transitions use `AnimatePresence` with opacity fade (1.2s ease).

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

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| White | `#ffffff` | Backgrounds, text on dark |
| Off-white | `#f5f5f7` | Section backgrounds, cards |
| Dark | `#1d1d1f` | Body text |
| Gray | `#6e6e73` | Secondary text |
| Blue | `#0066cc` | Primary brand (legacy) |
| Blue dark | `#004499` | Hover states |
| Blue light | `#3399ff` | Accents |
| Dark teal | `#001514` | Hero backgrounds, sidebar |
| Teal | `#297373` | Primary interactive color |
| Orange | `#A33400` | Active indicators, accents |
| Navy | `#0A1045` | Gradient end color |

### Responsive Breakpoints
Standard Tailwind breakpoints used throughout:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Mobile-first approach: base styles for mobile, modifiers for larger screens.

---

## Analytics

`lib/analytics.ts` wraps `window.gtag` with typed event helpers:

```ts
analytics.contactFormSubmit()         // generate_lead
analytics.ctaClick(label)             // cta_click
analytics.chatbotOpen()               // chatbot_open
analytics.chatbotFaqClick(question)   // chatbot_faq_click
analytics.solutionView(slug)          // solution_view
analytics.whatsappClick()             // contact_click / whatsapp
analytics.emailClick()                // contact_click / email
```

All helpers are no-ops when `window.gtag` is not defined (dev / SSR).

---

## Form Security

Contact form input goes through two layers in `lib/contactFormUtils.ts`:

1. **Sanitization** (`sanitizeText`) — strips HTML tags, `javascript:` URIs, inline event handlers
2. **Validation** (`validateForm`) — field length limits, email regex, phone regex, profanity filter, sensitive data detection (credit cards, passwords)

A separate `lib/contact-validation.ts` provides `validateContactForm` and `sanitizeString` for use in a future API route (`app/api/contact/route.ts`).

---

## Performance Considerations

1. **Server Components** used by default — zero JS for static content
2. **`"use client"` only** where interactivity is required
3. **SSG for dynamic routes** — `generateStaticParams()` pre-renders all service pages at build time
4. **`Inter` font** loaded via `next/font/google` with `display: swap`
5. **Image optimization** via Next.js `<Image>` (configured in `next.config.ts`)
6. **Framer Motion** animations are hardware-accelerated (transform/opacity only)
7. **Scroll listener** in Navbar uses `{ passive: true }` for performance

---

## SEO

- `metadata` export on each page (title, description, keywords, OG tags)
- `generateMetadata` on dynamic routes derives title/description from `SERVICES`
- `lang="es"` on `<html>` element
- Semantic HTML throughout (sections, nav, footer, headings hierarchy)
- Smooth scroll behavior for anchor links

---

## Future Enhancements

- [ ] Add `app/api/contact/route.ts` for real form submission (validation scaffold in `lib/contact-validation.ts` is ready)
- [ ] Integrate CMS (e.g., Sanity, Contentful) for content management
- [ ] Add `app/blog/` section for technical articles
- [ ] Add sitemap.xml generation
- [x] Add Google Analytics tracking (`lib/analytics.ts`)
- [x] Implement real image assets in `public/` (`lib/images/index.ts` populated)
