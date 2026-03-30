# Component Reference — SINTECSA Web

## UI Primitives

---

### `components/ui/Button.tsx`

Reusable button component with multiple variants, sizes, and motion feedback.

**Props:**
```tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'  // default: 'primary'
  size?: 'sm' | 'md' | 'lg'                                // default: 'md'
  href?: string                   // Renders as <Link> or <a>
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  external?: boolean              // Opens in new tab
  icon?: React.ReactNode          // Optional icon
  iconPosition?: 'left' | 'right' // default: 'right'
}
```

**Variants:**
| Variant | Appearance |
|---|---|
| `primary` | Blue bg, white text |
| `secondary` | Dark bg, white text |
| `ghost` | Transparent, blue text, hover bg |
| `outline` | Border blue, fills on hover |

**Usage:**
```tsx
<Button variant="primary" size="lg" href="/soluciones">
  Ver soluciones
</Button>

<Button variant="outline" onClick={handleClick} icon={<ArrowRight />}>
  Más información
</Button>
```

---

### `components/ui/AnimatedSection.tsx`

Scroll-triggered animation wrappers using Framer Motion's `useInView`.

**`AnimatedSection` Props:**
```tsx
interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'none'
  delay?: number      // seconds, default: 0
  duration?: number   // seconds, default: 0.6
  once?: boolean      // animate only once, default: true
  threshold?: number  // 0-1, default: 0.1
  as?: React.ElementType  // HTML element to render, default: 'div'
}
```

**`StaggerContainer` Props:**
```tsx
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number   // seconds between children, default: 0.1
  initialDelay?: number   // initial delay, default: 0
  once?: boolean
  threshold?: number
}
```

**Usage:**
```tsx
// Single element
<AnimatedSection variant="slideUp" delay={0.2}>
  <h2>Title</h2>
</AnimatedSection>

// Staggered list
<StaggerContainer staggerDelay={0.08}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## Layout Components

---

### `components/layout/Navbar.tsx`

Sticky navigation bar with scroll-aware styling and mobile hamburger menu.

**Behavior:**
- On home page (`/`): starts transparent, transitions to white on scroll > 20px
- On other pages: always white with shadow
- Logo: "SINTEC" (bold dark) + "S.A." (blue)
- Mobile: full-screen overlay with animated slide-in

**Constants used:**
- `NAV_LINKS` from `lib/constants.ts`
- `COMPANY_SHORT_NAME` from `lib/constants.ts`

**No props** — reads from router and scroll position.

---

### `components/layout/Footer.tsx`

Four-column responsive footer with brand info, navigation, services, and contact.

**Columns:**
1. Brand + tagline + LinkedIn link
2. Navigation links
3. Services links (to `/soluciones#slug`)
4. Contact info (email, phone, location)

**Constants used:**
- `NAV_LINKS`, `SERVICES`, `COMPANY_*` from `lib/constants.ts`

**No props** — all data from constants.

---

## Home Sections

---

### `components/home/Hero.tsx`

Full-viewport hero section with animated headline and CTAs.

**Features:**
- Dark gradient background with grid pattern overlay
- Blue glow accents (CSS radial gradients)
- Word-by-word animated headline (`SINTEC` | `S.A.`)
- Tagline word-by-word fade in
- Two CTA buttons: "Conocer Soluciones" and "Contactar"
- Mini stats strip (experience, projects, clients)
- Animated scroll indicator

**No props** — all content from `lib/constants.ts`.

---

### `components/home/Services.tsx`

6-card services grid with scroll-triggered stagger animation.

**Features:**
- Section header with animated intro
- `StaggerContainer` with `StaggerItem` for cards
- Each card: icon (color change on hover), title, description, "Conocer más" link
- Cards link to `/soluciones#slug`
- Bottom CTA to `/soluciones`

**Data source:** `SERVICES` from `lib/constants.ts`

---

### `components/home/Stats.tsx`

Dark-background section with four animated counter statistics.

**Features:**
- Scroll-triggered counter animation (`requestAnimationFrame` + easeOutQuart)
- Grid layout (2-col mobile, 4-col desktop)
- Divider lines between cards on desktop
- Section enters viewport → counters start

**Custom hook:** `useCountUp(target, duration, active)`
- `target`: final number
- `duration`: animation duration in ms (default 2000)
- `active`: boolean — starts when section is in view

**Data source:** `STATS` from `lib/constants.ts`

---

### `components/home/AboutTeaser.tsx`

Two-column section introducing the company with a visual card and floating highlights.

**Features:**
- Left: Visual block with dark card, timeline mini-stats, and 3 floating "highlight" cards
- Right: Text content with key points (CheckCircle list), CTA button
- Floating cards animate with `whileInView` + float motion

**No props** — content hardcoded + from constants.

---

### `components/home/Contact.tsx`

Full contact form with validation and submission states.

**Form fields:**
- Name (required)
- Email (required, format validated)
- Company (optional)
- Phone (optional)
- Service of interest (select)
- Message (required)

**States:** `idle` | `loading` | `success` | `error`

**Validation:** Client-side only. On success, shows thank-you state with reset option.

**Note:** Currently simulates submission with `setTimeout`. Replace with actual API call in `handleSubmit`.

---

## Chatbot

---

### `components/chatbot/ChatBot.tsx`

Floating FAQ chatbot widget in the bottom-right corner.

**Views:**
1. `faq-list` — Greeting + list of FAQ question buttons
2. `faq-answer` — User question bubble + bot answer + CTA link + Back button

**Features:**
- Pulse ring animation on bubble (until first open)
- Notification dot (disappears after opening)
- Smooth open/close with `AnimatePresence`
- View transitions with slide animations
- Footer with direct link to contact form

**Data source:** `FAQ_ITEMS` from `lib/constants.ts`

**FAQ item structure:**
```ts
{
  id: string
  question: string
  answer: string
  cta: {
    label: string
    href: string
  }
}
```

To add FAQ items, append to the `FAQ_ITEMS` array in `lib/constants.ts`.
