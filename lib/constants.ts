export const COMPANY_NAME = "SINTEC S.A.";
export const COMPANY_SHORT_NAME = "SINTEC";
export const COMPANY_TAGLINE =
  "Ingeniería de Integridad. Precisión. Confianza.";
export const COMPANY_DESCRIPTION =
  "Consultora argentina especializada en ingeniería de integridad, gestión de riesgos y confiabilidad de activos industriales.";
export const COMPANY_EMAIL = "lpaez@sintecsa.com.ar";
export const COMPANY_PHONE = "+54 223 464-4322/23";
export const COMPANY_ADDRESS = "Mar del Plata, Buenos Aires, Argentina";
export const COMPANY_FOUNDED = "2004";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Soluciones", href: "/soluciones" },
];

export const SERVICES = [
  {
    id: "integridad-activos",
    title: "Integridad de Activos",
    shortDescription:
      "Gestión integral del ciclo de vida de activos industriales para maximizar confiabilidad y seguridad operativa.",
    description:
      "Desarrollamos planes de gestión de integridad para plantas industriales, refineries, plantas petroquímicas y de gas. Evaluamos el estado actual de sus activos y definimos estrategias óptimas para extender su vida útil con total seguridad.",
    icon: "Shield",
    slug: "integridad-activos",
    features: [
      "Evaluación de estado de activos",
      "Planes de mantenimiento basados en riesgo",
      "Gestión de vida útil remanente",
      "Análisis de integridad estructural",
    ],
  },
  {
    id: "integridad-riesgos-rbi",
    title: "Integridad de Riesgos (RBI)",
    shortDescription:
      "Metodología API 580/581 para inspección basada en riesgo, optimizando recursos y maximizando seguridad.",
    description:
      "Implementamos la metodología de Inspección Basada en Riesgo (RBI) conforme a estándares API 580 y API 581. Priorizamos los esfuerzos de inspección según el riesgo real de cada equipo, optimizando costos sin comprometer la seguridad.",
    icon: "BarChart3",
    slug: "integridad-riesgos-rbi",
    features: [
      "Evaluación de riesgo API 580/581",
      "Matrices de riesgo personalizadas",
      "Planes de inspección optimizados",
      "Software especializado RBI",
    ],
  },
  {
    id: "analisis-falla",
    title: "Análisis de Falla",
    shortDescription:
      "Investigación forense de fallas en equipos y estructuras con metodologías RCA para prevenir recurrencias.",
    description:
      "Realizamos análisis de causa raíz (RCA) de fallas en equipos de proceso, tuberías y estructuras. Identificamos los mecanismos de daño, determinamos causas raíces y emitimos recomendaciones para prevenir recurrencias.",
    icon: "Search",
    slug: "analisis-falla",
    features: [
      "Análisis de causa raíz (RCA)",
      "Análisis de fractografía",
      "Metalografía y caracterización",
      "Informes técnicos periciales",
    ],
  },
  {
    id: "control-corrosion",
    title: "Control de Corrosión",
    shortDescription:
      "Soluciones avanzadas de protección catódica, recubrimientos y monitoreo para combatir la corrosión.",
    description:
      "Diseñamos e implementamos sistemas de protección contra corrosión para infraestructura industrial. Desde la evaluación de mecanismos de corrosión hasta el diseño de sistemas de protección catódica y selección de recubrimientos.",
    icon: "Layers",
    slug: "control-corrosion",
    features: [
      "Protección catódica (CP)",
      "Evaluación de recubrimientos",
      "Monitoreo de corrosión",
      "Inhibidores y tratamientos",
    ],
  },
  {
    id: "inspeccion-monitoreo",
    title: "Inspección y Monitoreo",
    shortDescription:
      "Técnicas avanzadas de END/NDT para inspección de equipos, tuberías y estructuras industriales.",
    description:
      "Aplicamos técnicas avanzadas de ensayos no destructivos (END/NDT) para evaluar el estado de integridad de sus equipos sin detener la producción. Contamos con personal certificado en múltiples técnicas de inspección.",
    icon: "Eye",
    slug: "inspeccion-monitoreo",
    features: [
      "Ultrasonido (UT) avanzado",
      "Phased Array y TOFD",
      "Inspección visual y dimensional",
      "Monitoreo en línea continuo",
    ],
  },
  {
    id: "procedimientos-tecnicos",
    title: "Procedimientos Técnicos",
    shortDescription:
      "Elaboración de procedimientos, especificaciones técnicas y documentación para operaciones seguras.",
    description:
      "Desarrollamos la documentación técnica necesaria para asegurar operaciones seguras y conformes a estándares internacionales. Procedimientos de inspección, mantenimiento, reparación y operación basados en normas API, ASME y NACE.",
    icon: "FileText",
    slug: "procedimientos-tecnicos",
    features: [
      "Procedimientos de inspección",
      "Especificaciones técnicas",
      "Manuales de operación y mantenimiento",
      "Documentación conforme a normas API/ASME",
    ],
  },
];

export const STATS = [
  {
    id: "experience",
    value: 20,
    prefix: "+",
    suffix: "",
    label: "Años de Experiencia",
    description: "Trayectoria comprobada en la industria",
  },
  {
    id: "projects",
    value: 150,
    prefix: "+",
    suffix: "",
    label: "Proyectos Completados",
    description: "En todo el país y región",
  },
  {
    id: "clients",
    value: 50,
    prefix: "+",
    suffix: "",
    label: "Clientes Activos",
    description: "Empresas líderes de la industria",
  },
  {
    id: "quality",
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Compromiso con la Calidad",
    description: "En cada proyecto y entregable",
  },
];

export const FAQ_ITEMS = [
  {
    id: "services",
    question: "¿Qué servicios ofrecen?",
    answer:
      "Ofrecemos servicios especializados en ingeniería de integridad industrial: Integridad de Activos, Inspección Basada en Riesgo (RBI), Análisis de Falla, Control de Corrosión, Inspección y Monitoreo con técnicas END/NDT, y elaboración de Procedimientos Técnicos.",
    cta: { label: "Ver nuestras soluciones", href: "/soluciones" },
  },
  {
    id: "rbi",
    question: "¿Qué es RBI?",
    answer:
      "RBI (Risk-Based Inspection) es una metodología según API 580/581 que evalúa el riesgo de falla de equipos industriales. Permite priorizar y optimizar los planes de inspección, reduciendo costos hasta un 40% mientras se mejora la seguridad operativa.",
    cta: {
      label: "Conocer más sobre RBI",
      href: "/soluciones#integridad-riesgos-rbi",
    },
  },
  {
    id: "contact",
    question: "¿Cómo puedo contactarlos?",
    answer:
      "Puede contactarnos por email a contacto@sintecsa.com.ar o por teléfono al +54 11 4000-0000. También puede completar el formulario de contacto en nuestra web y nos comunicaremos dentro de las 24 horas hábiles.",
    cta: { label: "Ir al formulario de contacto", href: "/#contacto" },
  },
  {
    id: "coverage",
    question: "¿Trabajan en toda Argentina?",
    answer:
      "Sí, contamos con capacidad de operar en todo el territorio argentino. Hemos desarrollado proyectos en Buenos Aires, Neuquén (Vaca Muerta), Santa Fe, Córdoba, Mendoza y Patagonia, con personal certificado y equipamiento propio.",
    cta: { label: "Contactar a un especialista", href: "/#contacto" },
  },
  {
    id: "industries",
    question: "¿En qué industrias trabajan?",
    answer:
      "Nos especializamos en industrias con alta demanda de integridad: Oil & Gas (upstream, midstream, downstream), petroquímica, refinación, generación de energía, industria química y agua/saneamiento.",
    cta: { label: "Ver quiénes somos", href: "/quienes-somos" },
  },
  {
    id: "certifications",
    question: "¿Tienen certificaciones?",
    answer:
      "Nuestro equipo cuenta con certificaciones internacionales en técnicas END (UT, PA, MT, PT, VT), certificaciones API 510, API 570, API 653, NACE CIP y formación continua en normas API, ASME, NORSOK y estándares internacionales.",
    cta: { label: "Conocer nuestro equipo", href: "/quienes-somos" },
  },
];

export const VALUES = [
  {
    title: "Excelencia Técnica",
    description:
      "Aplicamos los más altos estándares de ingeniería en cada proyecto, con profesionales certificados y actualizados.",
    icon: "Award",
  },
  {
    title: "Integridad Profesional",
    description:
      "Actuamos con transparencia, honestidad y ética en cada relación con nuestros clientes y equipos.",
    icon: "Shield",
  },
  {
    title: "Compromiso con la Seguridad",
    description:
      "La seguridad industrial es nuestra razón de ser. Cada decisión técnica está orientada a proteger personas y activos.",
    icon: "Heart",
  },
  {
    title: "Innovación Continua",
    description:
      "Incorporamos permanentemente nuevas tecnologías y metodologías para ofrecer soluciones más eficientes.",
    icon: "Lightbulb",
  },
];
