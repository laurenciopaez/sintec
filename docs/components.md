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
3. Services links (to `/soluciones/[slug]`)
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
- Cards link to `/soluciones/[slug]` (dynamic service pages)
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

### `components/home/Clients.tsx`

Infinite horizontal marquee displaying client company logos.

**Features:**
- Logo array duplicated 6× for seamless loop
- Framer Motion `animate` with `x: ["0%", "-50%"]`, `repeat: Infinity`
- Fade edges via gradient overlays on left/right sides
- Logos are grayscale by default, full color on hover
- Section heading: "Empresas que confían en nosotros"

**Data source:** `CLIENT_1`–`CLIENT_7` image constants from `lib/images/index.ts`

**No props.**

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

Full contact form with validation, dual submission (email + Google Sheets), and submission states.

**Form fields:**
- Name (required)
- Email (required, format validated)
- Company (optional)
- Phone (optional)
- Service of interest (select): Integridad de Activos, RBI, Análisis de Falla, Control de Corrosión, Inspección y Monitoreo, Procedimientos Técnicos, Análisis de datos y Machine Learning, Otro
- Message (required)

**States:** `idle` | `loading` | `success` | `error`

**Validation:** Uses `validateForm` and `sanitizeText` from `lib/contactFormUtils.ts`. Includes profanity filter, sensitive data detection, and a honeypot field for bot protection. On success, shows thank-you state with reset option.

**Submission flow (on valid submit):**
1. **Google Sheets** (fire-and-forget) — `fetch` con `Content-Type: text/plain` al Apps Script Web App. Fallo silencioso, no bloquea el flujo.
2. **Web3Forms** (awaited) — envía el email. La `access_key` viene de `NEXT_PUBLIC_WEB3FORMS_KEY` en `.env.local`. El email de destino se configura en la cuenta de web3forms.com, no en el código.

Si Sheets falla, el email se envía igual. Si Web3Forms falla, el usuario ve el error.

**Rate limiting:** debounce de 3 segundos entre envíos consecutivos.

**Analytics:** Calls `analytics.contactFormSubmit()` on success and `analytics.contactFormError(field)` on validation failure.

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
- Tracks opens and FAQ clicks via `analytics.chatbotOpen()` and `analytics.chatbotFaqClick(question)`

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

---

## Soluciones Components

These components are used exclusively in the `/soluciones/[slug]` and `/soluciones/[slug]/faq` routes.

---

### `components/soluciones/ServiceSidebarLayout.tsx`

Shared layout wrapper for service detail and FAQ pages. Renders a dark sidebar with all services listed and a content panel for children.

**Props:**
```tsx
{ children: React.ReactNode }
```

**Behavior:**
- Reads current pathname via `usePathname` to determine the active service slug
- Handles both `/soluciones/[slug]` and `/soluciones/[slug]/faq` paths correctly
- Mobile: horizontal scrolling tab row
- Desktop: vertical sidebar (272–320px wide) with service list and "Consultar ahora" CTA
- Active service highlighted with teal background and orange left-bar indicator

**Data source:** `SERVICES` from `lib/constants.ts`

---

### `components/soluciones/ServiceDetail.tsx`

Full service detail content panel, rendered inside `ServiceSidebarLayout`.

**Props:**
```tsx
{
  service: (typeof SERVICES)[0]
  serviceIndex: number
}
```

**Features:**
- Badge row with service number and applicable technical standards (API, ASME, NACE, etc.)
- Large icon + title + short description header
- Long description text
- Optional `alcance` list (bullet points, teal dots) — read from `service.alcance`
- Optional `valorAgregado` list (bullet points, orange dots) — read from `service.valorAgregado`
- Features grid (CheckCircle cards, 2-col on desktop)
- `ServiceImageCarousel` — auto-advances every 6s, manual prev/next, dot indicators
- FAQ tab shortcut button (links to `/soluciones/[slug]/faq`)
- CTAs: "Consultar sobre este servicio" → `/#contacto`, "Ver todos los servicios" → `/soluciones`

**Internal component:** `ServiceImageCarousel`
- Images type: `{ src: string; description: string }[]`
- Auto-resets to slide 0 when `images` prop changes
- Shows caption below carousel with animated fade

---

### `components/soluciones/ServiceFAQ.tsx`

Per-service FAQ accordion, rendered inside `ServiceSidebarLayout` on the `/faq` route.

**Props:**
```tsx
{
  service: (typeof SERVICES)[0]
  serviceIndex: number
}
```

**Features:**
- Reads `service.faq` array (type `{ id, question, answer }[]`)
- Each `FaqCard` is an animated accordion (expand/collapse with height animation)
- Tracks FAQ clicks via `analytics.chatbotFaqClick(question)`
- Numbered badges per question
- Bottom CTA card for unanswered questions → `/#contacto`

---

### `components/soluciones/ServiceTabs.tsx`

Standalone tab-based service viewer, not used in the current page routing but available as an alternative presentation. Manages its own active service state and syncs with URL hash.

**Props:**
```tsx
{ initialSlug?: string }
```

**Features:**
- Reads/writes `window.location.hash` via `hashchange` event
- Same sidebar structure as `ServiceSidebarLayout` (self-contained)
- Same content panel as `ServiceDetail` (self-contained copy)
- Includes `ServiceImageCarousel`

**Note:** Use `ServiceSidebarLayout` + `ServiceDetail` for routed pages. `ServiceTabs` is better suited for embedding in a single page without routing.
