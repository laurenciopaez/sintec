# SINTECSA Web — Plan de Mejora

> Estado actual: base técnica sólida, pero sin estrategia de adquisición (SEO), conversión (CRO) ni explotación comercial del tráfico.

---

## Diagnóstico rápido

| Área | Nivel |
|---|---|
| Arquitectura | Alto |
| Performance | Alto |
| SEO técnico | Medio |
| SEO de contenido | Bajo |
| Conversión (CRO) | Bajo |
| Backend / negocio | Bajo |

---

## FASE 1 — Fundaciones (impacto inmediato)

### 1. Backend real para el formulario de contacto
- [x] Crear `/api/contact` (Next.js Route Handler)
- [x] Envío de emails via Resend o Nodemailer
- [ ] Persistencia de leads (DB o Google Sheets)
- [x] Validación de inputs en el servidor
- [x] Rate limiting para prevenir spam
- [x] Sanitización de datos

### 2. Estrategia de keywords
- [x] Definir keywords principales: `integridad de activos`, `inspección industrial`, `API 579`, `RBI`
- [x] Definir long-tail: `inspección de ductos argentina`, `corrosion CO2 oil gas model`
- [ ] Mapear cada keyword a una URL específica
- [ ] Usar la lista para guiar TODO el contenido futuro

### 3. Reestructurar URLs de servicios
- [x] Reemplazar `/soluciones#rbi` → `/soluciones/rbi`
- [x] Reemplazar `/soluciones#api-579` → `/soluciones/api-579`
- [x] Crear una página dinámica por servicio (`app/soluciones/[slug]/page.tsx`)
- [x] Configurar redirects desde las URLs antiguas

### 4. SEO técnico base
- [ ] Generar `sitemap.xml` dinámico (`app/sitemap.ts`)
- [ ] Crear `robots.txt` (`app/robots.ts`)
- [ ] Agregar canonical URLs a todas las páginas
- [ ] Completar metadata por página (title, description, OG, Twitter cards)
- [ ] Implementar structured data (schema.org: `Organization`, `Service`)

---

## FASE 2 — Contenido y posicionamiento

### 5. Páginas SEO por servicio
- [ ] Crear página individual para cada servicio (mínimo 1000 palabras)
- [x] Cada página debe incluir: introducción técnica, metodología, casos de uso, beneficios, FAQs
- [ ] Optimizar H1/H2/H3 con keywords objetivo
- [ ] Agregar imágenes reales con alt text descriptivo

### 6. Blog técnico
- [ ] Crear estructura `/blog` y `/blog/[slug]`
- [ ] Publicar primeros artículos:
  - [ ] `api-579-explicacion`
  - [ ] `rbi-metodologia`
  - [ ] `corrosion-co2-modelos`
- [ ] Meta objetivo: 2–4 artículos por mes
- [ ] Integrar links internos entre blog y servicios

### 7. Contenido de autoridad
- [ ] Mostrar certificaciones (API, NACE, ISO)
- [x] Agregar logos de clientes (con permiso)
- [x] Publicar proyectos realizados / portfolio
- [ ] Crear casos de estudio con métricas reales

---

## FASE 3 — Conversión (CRO)

### 8. Optimizar CTAs
- [ ] Agregar CTA "Solicitar propuesta" en hero y servicios
- [ ] Agregar CTA "Hablar con un ingeniero" en páginas técnicas
- [ ] Agregar CTA "Descargar brochure" (requiere crear el PDF)
- [ ] Revisar jerarquía visual de botones

### 9. Multiplicar puntos de contacto
- [ ] Formulario de contacto en: Home, Servicios, Blog
- [ ] Chatbot con captura de email/teléfono antes de responder
- [ ] WhatsApp flotante como canal alternativo

### 10. Prueba social
- [ ] Logos de clientes en sección dedicada
- [ ] Testimonios reales (texto o video)
- [ ] Contador de proyectos / años de experiencia actualizados
- [ ] Casos de éxito con resultados cuantificables

---

## FASE 4 — Escalabilidad

### 11. Integrar CMS
- [ ] Evaluar opciones: Sanity, Contentlayer, o MDX local
- [ ] Migrar contenido de servicios y blog al CMS
- [ ] Permitir edición sin tocar código

### 12. Internacionalización (i18n)
- [ ] Configurar `next-intl` o i18n nativo de Next.js
- [ ] Crear rutas `/es` y `/en`
- [ ] Traducir contenido principal al inglés

### 13. Analítica avanzada
- [ ] Implementar Google Analytics 4 (GA4)
- [ ] Rastrear eventos: clicks en CTAs, envíos de formulario, scroll depth
- [ ] Tracking de conversiones
- [ ] Heatmaps (Hotjar o Microsoft Clarity, ambos gratuitos)

---

## Checklist técnico completo

### SEO
- [ ] Keywords principales y secundarias definidas
- [ ] Metadata avanzada por página
- [ ] Open Graph completo
- [ ] Twitter cards
- [ ] Sitemap dinámico
- [ ] robots.txt
- [ ] Canonical URLs
- [ ] Structured data (schema.org)
- [x] URLs limpias (sin hash)

### Contenido
- [ ] Páginas de servicios con profundidad (≥1000 palabras)
- [ ] Blog técnico activo
- [ ] FAQs por página de servicio
- [ ] Casos de estudio
- [ ] Certificaciones visibles
- [ ] Imágenes reales optimizadas

### Backend
- [ ] API de contacto funcional
- [x] Envío de emails
- [ ] Persistencia de leads
- [ ] Validación backend
- [x] Rate limiting
- [x] Sanitización de inputs

### Performance
- [ ] Lazy loading de componentes pesados
- [ ] Minimizar Client Components innecesarios
- [ ] Optimización de imágenes reales (next/image)
- [ ] Preload de fuentes críticas

### Arquitectura
- [ ] Separar capa de dominio (data / UI)
- [ ] Evitar centralización excesiva en `constants.ts`
- [ ] Preparar estructura para CMS

### Seguridad
- [ ] Validación backend obligatoria en formularios
- [ ] Protección XSS
- [ ] Protección CSRF
- [ ] Escape de todos los inputs
- [ ] Headers de seguridad (next.config.ts)

### Analítica
- [ ] Google Analytics 4
- [ ] Eventos personalizados
- [ ] Tracking de conversiones
- [ ] Heatmaps

### Conversión
- [ ] CTAs claros y repetidos en cada página
- [ ] Formularios accesibles y bien ubicados
- [ ] Chatbot con objetivo comercial (captura de datos)
- [ ] Prueba social visible
- [ ] Lead magnets (PDFs, guías técnicas)

---

## Objetivo final

> Hoy: "web institucional bien hecha"
> Objetivo: "máquina de generación de leads técnicos"

La estrategia es: **intención de búsqueda + contenido técnico profundo + conversión**.
