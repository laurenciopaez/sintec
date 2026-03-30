# SINTECSA Web - Claude Code Guide

## Project Overview
Corporate website for **SINTEC S.A.**, an Argentine engineering consulting firm specializing in industrial asset integrity. Built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, and Framer Motion.

## Tech Stack
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## Commands
```bash
npm install        # Install dependencies
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Project Structure
```
sintecsa-web/
├── app/
│   ├── globals.css              # Tailwind v4 + custom CSS variables
│   ├── layout.tsx               # Root layout (Navbar, Footer, ChatBot)
│   ├── page.tsx                 # Landing page
│   ├── quienes-somos/page.tsx   # About us page
│   └── soluciones/page.tsx      # Solutions/services page
├── components/
│   ├── chatbot/ChatBot.tsx      # Floating chatbot widget
│   ├── home/
│   │   ├── Hero.tsx             # Full-screen hero section
│   │   ├── Services.tsx         # Services grid
│   │   ├── Stats.tsx            # Animated stats counters
│   │   ├── AboutTeaser.tsx      # About section teaser
│   │   └── Contact.tsx          # Contact form
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky navbar
│   │   └── Footer.tsx           # Site footer
│   └── ui/
│       ├── AnimatedSection.tsx  # Framer Motion scroll wrappers
│       └── Button.tsx           # Reusable button component
├── lib/
│   ├── constants.ts             # Company data, nav links, services, FAQs
│   ├── content.ts               # Page content strings
│   └── images/index.ts          # Image path constants (placeholders)
└── docs/                        # Documentation
```

## Key Design Decisions

### Tailwind v4
Using `@import "tailwindcss"` in `globals.css` (not the v3 config file approach). Custom design tokens defined with `@theme {}`. PostCSS configured with `@tailwindcss/postcss`.

### Color Palette
```
White:      #ffffff
Off-white:  #f5f5f7
Dark:       #1d1d1f
Gray:       #6e6e73
Blue:       #0066cc
Blue dark:  #004499
Blue light: #3399ff
Black:      #000000
```

### Animations
- `AnimatedSection` - Scroll-triggered fade/slide using `useInView`
- `StaggerContainer` + `StaggerItem` - Staggered card reveals
- Framer Motion `motion.*` for hover and tap interactions
- CSS keyframes for float, pulse-ring, shimmer effects

### Navbar Behavior
- Transparent over hero (home page only)
- White + shadow on scroll OR on non-home pages
- Mobile: full-screen overlay menu with animation

### ChatBot
- Floating bubble bottom-right
- FAQ list → answer flow
- Each answer includes a CTA link
- Uses `FAQ_ITEMS` from `lib/constants.ts`

## Content Management
All content lives in:
- `lib/constants.ts` — company info, nav, services, stats, FAQ
- `lib/content.ts` — page-specific longer text content
- `lib/images/index.ts` — image paths (all empty string placeholders)

To update contact info, edit `COMPANY_EMAIL`, `COMPANY_PHONE`, `COMPANY_ADDRESS` in `lib/constants.ts`.

## Adding Images
1. Add image files to `public/images/`
2. Update the corresponding constant in `lib/images/index.ts`
3. Use Next.js `<Image>` component with the imported path

## Adding a New Page
1. Create `app/new-page/page.tsx`
2. Export `metadata` for SEO
3. Add link to `NAV_LINKS` in `lib/constants.ts` if needed

## Deployment
Recommended: Vercel (zero-config for Next.js)
```bash
npm run build && npm run start
```
