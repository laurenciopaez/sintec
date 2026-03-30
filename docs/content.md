# Content Guide — SINTECSA Web

## Overview

All content is managed through TypeScript files in the `lib/` directory. This ensures type safety, easy updates, and no CMS dependency.

---

## `lib/constants.ts`

The central data source for the entire site.

### Company Information
```ts
COMPANY_NAME       // "SINTEC S.A."
COMPANY_SHORT_NAME // "SINTEC"
COMPANY_TAGLINE    // "Ingeniería de Integridad. Precisión. Confianza."
COMPANY_DESCRIPTION
COMPANY_EMAIL      // Update with real email
COMPANY_PHONE      // Update with real phone
COMPANY_ADDRESS    // "Buenos Aires, Argentina"
COMPANY_FOUNDED    // "2004"
```

### Navigation Links (`NAV_LINKS`)
```ts
[
  { label: "Inicio", href: "/" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Soluciones", href: "/soluciones" },
]
```
To add a page: add an entry here and create the corresponding `app/page-name/page.tsx`.

### Services (`SERVICES`)
Array of 6 service objects. Each service has:
```ts
{
  id: string           // unique identifier
  title: string        // Display name
  shortDescription: string  // Card description (1-2 sentences)
  description: string  // Full description (Soluciones page)
  icon: string         // Lucide icon name (must be in iconMap)
  slug: string         // URL anchor (#slug)
  features: string[]   // 4 bullet points
}
```

**Supported icons (must match `iconMap` in Services.tsx and soluciones/page.tsx):**
`Shield`, `BarChart3`, `Search`, `Layers`, `Eye`, `FileText`

### Stats (`STATS`)
```ts
{
  id: string
  value: number        // Final counter value
  prefix: string       // e.g. "+" or ""
  suffix: string       // e.g. "%" or ""
  label: string        // Main label
  description: string  // Sub-label
}
```

### FAQ Items (`FAQ_ITEMS`)
Used by the ChatBot widget:
```ts
{
  id: string
  question: string     // Displayed as button text
  answer: string       // Bot response text
  cta: {
    label: string      // CTA button text
    href: string       // Link destination
  }
}
```

### Company Values (`VALUES`)
```ts
{
  title: string
  description: string
  icon: string         // Lucide icon name
}
```

---

## `lib/content.ts`

Page-specific longer content strings, organized by page.

### `QUIENES_SOMOS_CONTENT`
```ts
{
  hero: { title, subtitle }
  story: { title, paragraphs: string[] }
  mission: { title, text }
  vision: { title, text }
  whyUs: {
    title, subtitle,
    reasons: Array<{ title, description, icon }>
  }
  certifications: {
    title, subtitle,
    items: string[]    // List of certification strings
  }
}
```

### `SOLUCIONES_CONTENT`
```ts
{
  hero: { title, subtitle }
  intro: { title, text }
  cta: { title, subtitle, button }
}
```

---

## `lib/images/index.ts`

Image path constants — all currently set to `""` (empty string placeholder).

```ts
HERO_BG          // Hero section background
ABOUT_IMAGE      // About us section image
TEAM_IMAGE       // Team photo
SERVICE_INTEGRITY, SERVICE_RBI, etc.  // Service images
CLIENT_1..CLIENT_6                     // Client logos
TEAM_MEMBER_1..TEAM_MEMBER_4           // Team member photos
CERT_API, CERT_NACE, CERT_ISO, CERT_ASME  // Certification logos
```

**To add an image:**
1. Place the file in `public/images/` (e.g., `public/images/hero-bg.jpg`)
2. Update the constant: `export const HERO_BG = "/images/hero-bg.jpg";`
3. Use in component:
```tsx
import { HERO_BG } from "@/lib/images";
import Image from "next/image";

<Image src={HERO_BG} alt="Hero background" fill className="object-cover" />
```

---

## Updating Content — Quick Reference

### Change company contact info
Edit `lib/constants.ts`:
```ts
export const COMPANY_EMAIL = "nuevo@email.com";
export const COMPANY_PHONE = "+54 11 XXXX-XXXX";
export const COMPANY_ADDRESS = "Nueva dirección, Argentina";
```

### Add a new FAQ
Add to `FAQ_ITEMS` in `lib/constants.ts`:
```ts
{
  id: "new-faq",
  question: "¿Nueva pregunta?",
  answer: "Respuesta completa aquí...",
  cta: { label: "Ver más", href: "/soluciones" }
}
```

### Add a new service
Add to `SERVICES` in `lib/constants.ts`:
```ts
{
  id: "nuevo-servicio",
  title: "Nuevo Servicio",
  shortDescription: "Descripción corta...",
  description: "Descripción completa...",
  icon: "Shield",  // must exist in iconMap
  slug: "nuevo-servicio",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
}
```
Then update `iconMap` in `components/home/Services.tsx` and `app/soluciones/page.tsx` if using a new icon.

### Update company stats
Edit `STATS` in `lib/constants.ts`. The `value` field is the final number the counter animates to.

### Update Quiénes Somos text
Edit `QUIENES_SOMOS_CONTENT` in `lib/content.ts`. The story paragraphs are an array — add/remove/edit as needed.

---

## SEO Metadata

Each page exports a `metadata` object for Next.js:

```ts
// app/page.tsx is handled in app/layout.tsx
export const metadata: Metadata = {
  title: "Page Title | SINTEC S.A.",
  description: "Page description for search engines.",
};
```

Update these per page for optimal SEO. The root layout (`app/layout.tsx`) contains the site-wide defaults.

---

## Contact Form

The form (`components/home/Contact.tsx`) currently simulates submission. To connect a real backend:

1. Create `app/api/contact/route.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  // Send email, save to DB, etc.
  return NextResponse.json({ success: true });
}
```

2. Update `handleSubmit` in `Contact.tsx`:
```ts
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form)
});

if (response.ok) {
  setStatus('success');
} else {
  setStatus('error');
}
```
