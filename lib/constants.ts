import { i, image } from "framer-motion/client";
import { SERVICE_INTEGRITY, SERVICE_RBI, SERVICE_FAILURE, SERVICE_CORROSION, SERVICE_INSPECTION, SERVICE_PROCEDURES, SERVICE_CORROSION2, SERVICE_FAILURE2, SERVICE_INSPECTION2, SERVICE_INTEGRITY2, SERVICE_PROCEDURES2, SERVICE_RBI2 } from "./images/index";

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
    description:"Desarrollamos e implementamos Planes de Gestión de Integridad alineados con normativas globales (API, ASME, ISO). Nuestro proceso abarca desde el diagnóstico situacional y el análisis de mecanismos de daño hasta la definición de Estrategias de Inspección Basada en Riesgo (RBI).",
    alcance: [
      "Refinerías",
      "Plantas de procesamiento de gas",
      "Terminales petroquímicas",
      "Ductos de transporte",
    ],
    valorAgregado: [
      "Transformamos datos técnicos en decisiones estratégicas",
      "Prevenimos fallas catastróficas",
      "Aseguramos la confiabilidad mecánica",
      "Extendemos la operatividad de sus activos críticos con total respaldo técnico",
    ],
    icon: "Shield",
    slug: "integridad-activos",
    features: [
      "Evaluación de estado de activos",
      "Planes de mantenimiento basados en riesgo",
      "Gestión de vida útil remanente",
      "Análisis de integridad estructural",
    ],
    imageSrc: SERVICE_INTEGRITY,
    imageSrc2: SERVICE_INTEGRITY2,
    imageAlt: "Integridad de Activos",

  },
  {
    id: "integridad-riesgos-rbi",
    title: "Integridad de Riesgos (RBI)",
    shortDescription:
      "Metodología API 580/581 para inspección basada en riesgo, optimizando recursos y maximizando seguridad.",
    description:
      "Implementamos programas de Inspección Basada en Riesgo (RBI) bajo los estándares API 580 y API 581, transformando la gestión reactiva en una estrategia de mantenimiento predictivo de alta precisión. Al cuantificar la Probabilidad de Falla (POF) y la Consecuencia de Falla (COF), jerarquizamos sus activos críticos para concentrar los recursos donde el riesgo es mayor. Este enfoque técnico no solo garantiza el cumplimiento normativo, sino que optimiza los intervalos de inspección, reduciendo costos operativos y minimizando la exposición al riesgo del personal y el medio ambiente.",
    icon: "BarChart3",
    slug: "integridad-riesgos-rbi",
    features: [
      "Evaluación de riesgo API 580/581",
      "Matrices de riesgo personalizadas",
      "Planes de inspección optimizados",
      "Software especializado RBI",
    ],
    imageSrc: SERVICE_RBI,
    imageAlt: "Integridad de Riesgos (RBI)",
    imageSrc2: SERVICE_RBI2,
  
  },
  {
    id: "analisis-falla",
    title: "Análisis de Falla",
    shortDescription:
      "Investigación forense de fallas en equipos y estructuras con metodologías RCA para prevenir recurrencias.",
    description:
      "Nuestra metodología de RBI permite una gestión dinámica de la integridad mecánica. Al aplicar los modelos probabilísticos de los estándares API, logramos:",
    alcance: [
      "Jerarquización de Activos: Identificación de equipos con altos mecanismos de daño latentes.",
      "Eficiencia en Paradas de Planta (Turnarounds): Reducción de alcances de inspección innecesarios en equipos de bajo riesgo.",
      "Seguridad Basada en Datos: Sustituimos los cronogramas fijos por frecuencias basadas en el estado real y el riesgo calculado, asegurando la continuidad operativa sin comprometer la integridad estructural.",
    ],
    icon: "Search",
    slug: "analisis-falla",
    features: [
      "Análisis de causa raíz (RCA)",
      "Análisis de fractografía",
      "Metalografía y caracterización",
      "Informes técnicos periciales",
    ],
    imageSrc: SERVICE_FAILURE,
    imageAlt: "Análisis de Falla",
    imageSrc2: SERVICE_FAILURE2,

  },
  {
    id: "control-corrosion",
    title: "Control de Corrosión",
    shortDescription:
      "Soluciones avanzadas de protección catódica, recubrimientos y monitoreo para combatir la corrosión.",
    description:
      "Ofrecemos soluciones de ingeniería especializada para el control de la corrosión interna y externa en infraestructura crítica (pipelines, tanques de almacenamiento y estructuras offshore):",
    alcance: [
      "Protección Catódica (CP): Diseño de sistemas por corriente impresa (ICCP) y ánodos de sacrificio (GACP), incluyendo estudios de resistividad y auditorías de potencial.",
      "Recubrimientos de Alto Desempeño: Selección y especificación técnica de esquemas de pintura y revestimientos basados en condiciones de servicio severas.",
      "Monitoreo y Diagnóstico: Implementación de cupones de corrosión, sondas de resistencia eléctrica y sistemas de monitoreo remoto para la toma de decisiones basada en datos en tiempo real.",
    ],
    icon: "Layers",
    slug: "control-corrosion",
    features: [
      "Protección catódica (CP)",
      "Evaluación de recubrimientos",
      "Monitoreo de corrosión",
      "Inhibidores y tratamientos",
    ],
    imageSrc: SERVICE_CORROSION,
    imageAlt: "Control de Corrosión",
    imageSrc2: SERVICE_CORROSION2,



  },
  {
    id: "inspeccion-monitoreo",
    title: "Monitoreo de Corrosión Interna y Electroquímica Industrial",
    shortDescription:
      "Evaluación dinámica y en tiempo real de la cinética de corrosión en condiciones de operación.",
    description:
      "Implementamos sistemas de monitoreo avanzado diseñados para capturar el comportamiento electroquímico de los activos en sus condiciones reales de servicio (presión, temperatura y fluido). A diferencia de los métodos convencionales, utilizamos celdas de 3 y 5 electrodos que actúan como sensores críticos en bocas de pozo, tubulares de producción y facilidades de planta, permitiendo una visión profunda del fenómeno corrosivo sin interrumpir el proceso. ",
    valorAgregado: [
      "Permiten la determinación de velocidades de corrosión instantáneas y el análisis de mecanismos corrosivos.",
      "Habilitan la evaluación de la performance de sistemas de mitigación en servicio (inhibidores de corrosión, secuestrantes químicos, bactericidas).",
      "Facilitan el estudio y la evaluación de películas superficiales (óxidos protectores, inhibidores fílmicos, películas orgánicas).",
    ],
    alcance: [
      "Instalación y Gestión de Sensores: Configuración de celdas electroquímicas en puntos críticos (Boca de Pozo, Pipelines, Separadores).",
      "Auditoría de Sistemas de Mitigación: Monitoreo de la eficiencia de la inyección de químicos y optimización de dosificación (OPEX).",
      "Análisis de Mecanismos de Corrosión: Estudios de corrosión por CO2/H2S, corrosión bajo flujo y regímenes microbiológicos (MIC).",
    ],
    icon: "Eye",
    slug: "inspeccion-monitoreo",
    features: [
      "Evaluación de bactericidas",
      "Estudio de comportamiento electroquímico",
      "Flexibilidad de aplicación",
      "Monitoreo en línea continuo",
    ],
    imageSrc: SERVICE_INSPECTION,
    imageAlt: "Inspección y Monitoreo",
    imageSrc2: SERVICE_INSPECTION2,


  },
  {
    id: "procedimientos-tecnicos",
    title: "Ingeniería de Procedimientos y Normatividad Técnica",
    shortDescription:
      "Elaboración de procedimientos, especificaciones técnicas y documentación para operaciones seguras.",
    description:
      "Transformamos los requisitos de las normas internacionales en guías ejecutables que garantizan la repetibilidad y seguridad de sus procesos. Desarrollamos un ecosistema documental sólido que sirve de base para la toma de decisiones técnicas, asegurando que cada intervención en plantas industriales, pozos o ductos esté alineada con las mejores prácticas de la industria (API, ASME, NACE/AMPP e ISO).",
      valorAgregado: [
      "Estandarización de Procesos: Reducción de la variabilidad operativa y errores humanos mediante protocolos claros y verificables.",
      "Garantía de Cumplimiento: Alineación total con marcos regulatorios y auditorías de integridad mecánica.",
      "Preservación del Conocimiento: Captura del ´know-how´ técnico para asegurar la continuidad operativa y la formación de personal calificado.",
    ],
    alcance: [
      "Manuales de Gestión de Integridad (PIM): Documentación integral para la gestión del ciclo de vida de ductos y recipientes a presión.",
      "Procedimientos de Reparación y Alteración: Desarrollo de metodologías de reparación según API 510, 570 y 653.",
      "Filosofías de Operación y Mantenimiento (O&M): Guías técnicas para la operación segura dentro de las Ventanas Operativas de Integridad (IOW).",
    ],
    icon: "FileText",
    slug: "procedimientos-tecnicos",
    features: [
      "Procedimientos de inspección",
      "Especificaciones técnicas",
      "Manuales de operación y mantenimiento",
      "Documentación conforme a normas API/ASME",
    ],
    imageSrc: SERVICE_PROCEDURES,
    imageAlt: "Ingeniería de Procedimientos",
    imageSrc2: SERVICE_PROCEDURES2,


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
  { /// MODIFICAR 
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
"Garantizamos precisión en cada diagnóstico mediante el rigor normativo y un equipo de ingeniería con basta experiencia.",
    icon: "Award",
    image: "/sintec/img/quienesSomos/excelenciaTecnica.jpeg",
  },
  {
    title: "Integridad Profesional",
    description:
"Base fundamental de nuestra consultoría; entregamos resultados imparciales y éticos que aseguran la trazabilidad en la toma de decisiones.",
    icon: "Shield",
    image: "/sintec/img/quienesSomos/integridadProfesional.jpeg",
  },
  {
    title: "Compromiso con la Seguridad",
    description:
    "La seguridad de procesos y la protección de las personas son innegociables. Diseñamos soluciones orientadas a la mitigación crítica de riesgos.",
    icon: "Heart",
    image: "/sintec/img/quienesSomos/compromisoSeguridad.jpeg",
  },
  {
    title: "Innovación Continua",
    description:
"Evolucionamos junto a la industria, integrando metodologías emergentes y digitalización para optimizar la gestión de activos de nuestros clientes.",
    icon: "Lightbulb",
    image: "/sintec/img/quienesSomos/innovacionContinua.png",
  },
];
