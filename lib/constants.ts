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
    faq: [
      {
        id: "faq-ia-1",
        question: "¿Qué incluye un Plan de Gestión de Integridad (PGI)?",
        answer: "Un PGI es el documento maestro que establece la estrategia de mantenimiento y supervisión de activos para todo su ciclo de vida. Incluye la identificación de mecanismos de daño potenciales, la definición de Estrategias de Inspección Basada en Riesgo (RBI), los umbrales de aceptabilidad, los procedimientos de respuesta ante anomalías y los registros históricos de inspección. Su estructura sigue los lineamientos de API 510, API 570, API 653 y ASME PCC-3.",
      },
      {
        id: "faq-ia-2",
        question: "¿Cómo se determina la vida útil remanente de un activo?",
        answer: "La vida útil remanente se calcula combinando datos de inspección actuales (espesores medidos, tasas de corrosión reales) con modelos de degradación validados. Utilizamos la metodología MAWP de ASME y los criterios de API 570/571 para comparar el espesor medido contra el espesor mínimo requerido, obteniendo la fecha proyectada de retiro de servicio o la vida útil remanente expresada en años.",
      },
      {
        id: "faq-ia-3",
        question: "¿Qué normativas internacionales aplican a la gestión de integridad?",
        answer: "Los principales estándares que rigen nuestros trabajos son: API 510 (recipientes a presión), API 570 (tuberías de proceso), API 653 (tanques de almacenamiento), API 571 (mecanismos de daño), ASME B31.3/B31.8, ISO 31000 (gestión de riesgos) y NACE SP0169/SP0177 (control de corrosión). La normativa específica depende del tipo de activo y la industria.",
      },
      {
        id: "faq-ia-4",
        question: "¿Con qué frecuencia debe actualizarse un Plan de Gestión de Integridad?",
        answer: "Un PGI debe revisarse al menos una vez al año en condiciones normales, y de forma obligatoria tras cambios en el proceso (presión, temperatura, fluido), hallazgos significativos de inspección, modificaciones en el activo o incidentes operacionales. En activos de alto riesgo con mecanismos de daño activos, la revisión puede ser semestral.",
      },
      {
        id: "faq-ia-5",
        question: "¿Qué diferencia hay entre mantenimiento preventivo y mantenimiento basado en integridad?",
        answer: "El mantenimiento preventivo opera bajo cronogramas fijos (tiempo o ciclos), mientras que el mantenimiento basado en integridad es dinámico: se ajusta según el estado real del activo, los mecanismos de daño activos y el nivel de riesgo calculado. Esto permite concentrar recursos donde el riesgo es mayor, reducir intervenciones innecesarias en equipos de bajo riesgo y extender la vida útil con fundamento técnico sólido.",
      },
    ],
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
    faq: [
      {
        id: "faq-rbi-1",
        question: "¿Cuál es la diferencia entre RBI cuantitativo (API 581) y semicuantitativo (API 580)?",
        answer: "API 580 define el marco conceptual del RBI (proceso, documentación, jerarquización), mientras que API 581 provee los modelos matemáticos para cuantificar la Probabilidad de Falla (POF) y la Consecuencia de Falla (COF) con base en datos de proceso reales. El RBI cuantitativo produce resultados en unidades de riesgo (US$/año), permitiendo comparaciones objetivas entre activos. El semicuantitativo usa matrices de riesgo (Bajo/Medio/Alto) y es adecuado para evaluaciones iniciales.",
      },
      {
        id: "faq-rbi-2",
        question: "¿Qué mecanismos de daño son los más frecuentes en la evaluación RBI?",
        answer: "Según API 571, los mecanismos más relevantes en Oil & Gas y petroquímica incluyen: adelgazamiento por corrosión (localizado y generalizado), fragilización por hidrógeno (HIC/SOHIC/SSC), corrosión bajo aislación (CUI), agrietamiento por corrosión bajo tensión (SCC), fatiga mecánica y erosión. El estudio RBI identifica cuáles están activos en cada equipo según las condiciones de servicio y los materiales de construcción.",
      },
      {
        id: "faq-rbi-3",
        question: "¿Cómo optimiza el RBI los intervalos de inspección?",
        answer: "El RBI reemplaza los intervalos fijos por frecuencias basadas en el riesgo calculado. Un equipo con bajo riesgo puede ampliar su período de inspección, mientras que uno de alto riesgo requiere supervisión más frecuente. Esto evita tanto la sub-inspección como la sobre-inspección. Los estudios demuestran reducciones de costo de hasta un 30-40% con igual o mayor seguridad operativa.",
      },
      {
        id: "faq-rbi-4",
        question: "¿Cada cuánto tiempo debe actualizarse un estudio RBI?",
        answer: "El estudio RBI debe actualizarse al menos cada 3-5 años, o ante: resultados de inspección significativamente distintos a lo predicho, cambios en las condiciones de proceso, modificaciones de equipos, y cambios en los criterios de riesgo de la empresa. La recalibración parcial puede realizarse con mayor frecuencia sin necesidad de replantear el estudio completo.",
      },
      {
        id: "faq-rbi-5",
        question: "¿Qué información se necesita para desarrollar un estudio RBI?",
        answer: "Se requiere información de proceso (fluidos, temperatura, presión, caudales), datos de construcción (materiales, espesores nominales, año de fabricación), historial de inspección y espesores medidos, historial de fallas y reparaciones, y criterios de consecuencia de la empresa. Si no existe historial de inspección, comenzamos con una evaluación conservadora que se refina con los primeros datos obtenidos.",
      },
    ],
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
    faq: [
      {
        id: "faq-af-1",
        question: "¿Cuándo es imprescindible realizar un análisis de falla?",
        answer: "Un análisis de falla formal es imprescindible ante: fallas que causaron paradas no programadas de producción, eventos con potencial de daño personal o ambiental, fallas recurrentes en el mismo equipo o tipo de activo, hallazgos inesperados durante inspecciones programadas, y situaciones que requieren fundamento técnico-legal (seguros, garantías, responsabilidades contractuales).",
      },
      {
        id: "faq-af-2",
        question: "¿Qué metodologías de análisis de causa raíz (RCA) utilizan?",
        answer: "Aplicamos metodologías estandarizadas según la complejidad del evento: FMEA (Failure Mode and Effects Analysis) para análisis sistemáticos de modos de falla, Árbol de Falla (FTA) para evaluar combinaciones de eventos, Diagrama de Ishikawa para análisis participativos, y los '5 Por Qué' para fallas con cadena causal directa. El resultado es siempre una cadena causal completa: Causa Raíz Física → Humana → Latente (sistémica).",
      },
      {
        id: "faq-af-3",
        question: "¿Qué análisis de laboratorio se realizan en un estudio de falla?",
        answer: "Realizamos: examen visual y macroscópico del componente fallado, análisis fractográfico por microscopía electrónica de barrido (SEM), metalografía óptica para evaluar la microestructura y mecanismos de degradación, análisis químico por EDX/EDS para identificar depósitos o corrosión específica, ensayos de dureza y comparación con especificaciones originales.",
      },
      {
        id: "faq-af-4",
        question: "¿Cómo se debe preservar la evidencia antes de que lleguen los analistas?",
        answer: "La preservación correcta es crítica para la validez del análisis. Se recomienda: no limpiar ni alterar las superficies de fractura; fotografiar in-situ antes de cualquier manipulación; etiquetar y embalar las piezas en bolsas secas o con sílica gel; registrar las condiciones de proceso previas al evento; y documentar el historial de operación reciente. Una mala preservación puede imposibilitar la determinación del mecanismo de falla.",
      },
      {
        id: "faq-af-5",
        question: "¿Qué entregables incluye el informe de análisis de falla?",
        answer: "El informe técnico incluye: descripción del evento y contexto operacional, resultados detallados de todos los análisis realizados (con imágenes y datos), identificación del mecanismo de falla y las causas raíz (física, humana y sistémica), conclusiones con fundamento en normativas internacionales, y recomendaciones concretas para prevenir la recurrencia. El informe es utilizable como documento técnico-legal.",
      },
    ],
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
    faq: [
      {
        id: "faq-cc-1",
        question: "¿Cómo se diseña un sistema de protección catódica para ductos enterrados?",
        answer: "El diseño de un sistema de PC por corriente impresa (ICCP) comienza con estudios de suelo: medición de resistividad eléctrica, gradientes de tensión, presencia de corrientes vagabundas y potenciales naturales del ducto. Con estos datos se dimensionan los rectificadores, el lecho de ánodos y los cables de conexión. El criterio de protección según NACE SP0169 es alcanzar un potencial más negativo que -850 mV Cu/CuSO4 en todos los puntos del ducto.",
      },
      {
        id: "faq-cc-2",
        question: "¿Qué criterios definen la selección de un recubrimiento anticorrosivo?",
        answer: "La selección se basa en las condiciones de servicio: temperatura de operación, tipo de fluido y contaminantes, condiciones de exposición (enterrado, sumergido, atmosférico), y accesibilidad para mantenimiento. Los esquemas típicos para tuberías incluyen primers epoxi + capas intermedias + terminación poliuretano o epoxi, siguiendo especificaciones SSPC/NACE para preparación de superficie (SSPC-SP10 Near White o SP6 Commercial).",
      },
      {
        id: "faq-cc-3",
        question: "¿Qué es la corrosión bajo aislación (CUI) y por qué es tan problemática?",
        answer: "La Corrosión Bajo Aislación (CUI) ocurre cuando la humedad penetra en el sistema de aislación térmica y queda atrapada sobre la superficie metálica. Es especialmente peligrosa porque progresa de forma oculta, sin señales externas visibles. Los rangos de temperatura más susceptibles son -4°C a 175°C según API 571. La detección requiere técnicas especiales: pulsed eddy current (PEC), radiografía computarizada o termografía infrarroja.",
      },
      {
        id: "faq-cc-4",
        question: "¿Cómo funcionan los cupones de corrosión y cuáles son sus limitaciones?",
        answer: "Los cupones de corrosión son probetas de material expuestas al fluido de proceso por períodos definidos (30-90 días) para medir la pérdida de masa y calcular la velocidad de corrosión promedio (mm/año). Su principal limitación es que solo proveen un valor promedio del período y no detectan eventos de corrosión acelerada puntual. Por eso los complementamos con técnicas electroquímicas en línea que proveen datos en tiempo real.",
      },
      {
        id: "faq-cc-5",
        question: "¿Con qué frecuencia se deben realizar auditorías de un sistema de protección catódica?",
        answer: "Según NACE SP0169, los sistemas de PC deben tener mediciones de potencial al menos una vez al año en todos los puntos de prueba. Se recomienda una inspección close-interval survey (CIS) cada 3-5 años en ductos enterrados, y una auditoría completa del sistema (rectificadores, lecho de ánodos, drenajes) cada 2-3 años. Ante cambios en el entorno se deben realizar mediciones extraordinarias.",
      },
    ],
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
    faq: [
      {
        id: "faq-im-1",
        question: "¿Qué ventajas tienen las celdas electroquímicas frente a los cupones de corrosión convencionales?",
        answer: "Las celdas electroquímicas de 3 y 5 electrodos permiten mediciones en tiempo real de la velocidad de corrosión instantánea, identificar mecanismos corrosivos activos, y evaluar la eficiencia de inhibidores en el momento de la inyección. Esto permite responder en horas a cambios en las condiciones corrosivas, en lugar de esperar 30-90 días como con los cupones, que promedian y pueden ocultar eventos de corrosión acelerada.",
      },
      {
        id: "faq-im-2",
        question: "¿En qué condiciones operativas pueden instalarse los sensores electroquímicos?",
        answer: "Nuestros sensores están diseñados para condiciones industriales severas: presiones de hasta 10,000 PSI, temperaturas de -20°C a 150°C, fluidos multifásicos (gas-líquido), presencia de H2S y CO2, y fluidos con alto contenido de sólidos o arena. La instalación se realiza mediante accesorios retrieval con presión viva, sin necesidad de parada de planta, utilizando equipos certificados y procedimientos API.",
      },
      {
        id: "faq-im-3",
        question: "¿Cómo se mide la eficiencia de un inhibidor de corrosión con electroquímica?",
        answer: "La eficiencia del inhibidor se evalúa mediante la técnica de Resistencia de Polarización Lineal (LPR), que mide la velocidad de corrosión instantánea antes y después de la inyección química. La eficiencia se expresa como: IE% = [(Vcorr sin inhibidor - Vcorr con inhibidor) / Vcorr sin inhibidor] × 100. Un inhibidor de buena performance alcanza eficiencias superiores al 85-90%.",
      },
      {
        id: "faq-im-4",
        question: "¿Qué es la corrosión microbiológica (MIC) y cómo se detecta con electroquímica?",
        answer: "La MIC es un tipo de corrosión acelerada por la actividad metabólica de microorganismos (principalmente bacterias sulfatorreductoras, SRB, y bacterias productoras de ácido, APB) que crean microambientes agresivos sobre la superficie metálica. Se detecta mediante análisis de ruido electroquímico (EN), que muestra patrones característicos de fluctuaciones de potencial y corriente diferenciables de otros mecanismos de corrosión.",
      },
      {
        id: "faq-im-5",
        question: "¿Cómo se optimiza la dosificación de inhibidores de corrosión para reducir OPEX?",
        answer: "La optimización parte del análisis de la curva dosis-respuesta: medimos la velocidad de corrosión en tiempo real para diferentes concentraciones del inhibidor y determinamos la Concentración Mínima Efectiva (CME). El monitoreo electroquímico continuo detecta cuando las condiciones del fluido cambian y el inhibidor pierde eficiencia, ajustando la dosis y evitando tanto el sobreconsumo de químicos como la sub-protección del activo.",
      },
    ],
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
    faq: [
      {
        id: "faq-pt-1",
        question: "¿Qué normativas son la base para el desarrollo de procedimientos técnicos?",
        answer: "Los procedimientos que desarrollamos se fundamentan en: API 510 (recipientes a presión), API 570 (sistemas de tuberías), API 653 (tanques de almacenamiento), API 580/581 (inspección basada en riesgo), ASME B31.3/B31.8/B31.4, ASME PCC-2 (reparaciones), NACE/AMPP SP0169 y SP0177, e ISO 9001/45001. La normativa específica depende del tipo de instalación y la jurisdicción regulatoria.",
      },
      {
        id: "faq-pt-2",
        question: "¿Qué es un Manual de Gestión de Integridad de Ductos (PIM) y qué debe incluir?",
        answer: "El Pipeline Integrity Management Manual (PIM) es el documento rector para la gestión de integridad de un sistema de ductos. Debe incluir: descripción del sistema y caracterización de riesgos, identificación de segmentos de alto consecuencia (HCA), metodología de evaluación de integridad (ILI, ECDA/ICDA/SCCDA), criterios de respuesta y remediación, programa de monitoreo preventivo, y procedimientos de respuesta ante emergencias. Su marco regulatorio es API 1160.",
      },
      {
        id: "faq-pt-3",
        question: "¿Qué son las Ventanas Operativas de Integridad (IOW) y cómo se establecen?",
        answer: "Las Integrity Operating Windows (IOW) son los límites de las variables de proceso (temperatura, presión, concentración de contaminantes, pH, velocidad de fluido) dentro de los cuales el activo opera de manera segura. Se establecen mediante el análisis de los mecanismos de daño activos y sus umbrales de activación: por ejemplo, la velocidad de corrosión por CO2 aumenta exponencialmente por encima de cierta temperatura. El marco de referencia es API RP 584.",
      },
      {
        id: "faq-pt-4",
        question: "¿Cómo garantizan que los procedimientos sean ejecutables por el personal operativo?",
        answer: "La calidad ejecutable se asegura mediante: revisión técnica por ingenieros de proceso e inspección, revisión de campo con los operadores que los ejecutarán, verificación de disponibilidad de equipos y herramientas, prueba piloto cuando es posible, y sesiones de capacitación antes de la implementación. Los procedimientos se redactan con paso a paso claro, puntos de decisión, criterios de aceptación cuantificables y acciones de contingencia.",
      },
      {
        id: "faq-pt-5",
        question: "¿Con qué periodicidad deben revisarse y actualizarse los procedimientos técnicos?",
        answer: "Los procedimientos de inspección y mantenimiento deben revisarse al menos cada 3 años, o ante cambios en normativas de referencia, modificaciones de equipos o proceso, resultados de auditorías o incidentes. Los procedimientos de respuesta a emergencias requieren revisión anual y simulacros periódicos. Implementamos un sistema MOC (Management of Change) para asegurar que cualquier modificación pase por un proceso de aprobación documentado.",
      },
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
      "Ofrecemos servicios especializados en ingeniería de integridad industrial: Integridad de Activos, Inspección Basada en Riesgo (RBI), Análisis de Falla, Control de Corrosión, Inspección y Monitoreo con electroquimicas in-situ, y elaboración de Procedimientos Técnicos.",
    cta: { label: "Ver nuestras soluciones", href: "/soluciones" },
  },
  {
    id: "rbi",
    question: "¿Qué es RBI?",
    answer:
      "RBI (Risk-Based Inspection) es una metodología según API 580/581 que evalúa el riesgo de falla de equipos industriales. Permite priorizar y optimizar los planes de inspección, reduciendo costos hasta un 40% mientras se mejora la seguridad operativa.",
    cta: {
      label: "Conocer más sobre RBI",
      href: "/soluciones/integridad-riesgos-rbi",
    },
  },
  {
    id: "contact",
    question: "¿Cómo puedo contactarlos?",
    answer:
      "Puede contactarnos por email a jprossi@sintecsa.com.ar o por teléfono al +54 223 464-4322/23. También puede completar el formulario de contacto en nuestra web y nos comunicaremos dentro de las 24 horas hábiles.",
    cta: { label: "Ir al formulario de contacto", href: "/#contacto" },
  },
  {
    id: "coverage",
    question: "¿Trabajan en toda Argentina?",
    answer:
      "Sí, contamos con capacidad de operar en todo el territorio argentino. Hemos desarrollado proyectos en Buenos Aires, Neuquén (Vaca Muerta), Mendoza, Chubut y Santa Cruz, con personal certificado y equipamiento propio.",
    cta: { label: "Contactar a un especialista", href: "/#contacto" },
  },
  {
    id: "industries",
    question: "¿En qué industrias trabajan?",
    answer:
      "Nos especializamos en industrias con alta demanda de integridad: Oil & Gas (upstream, midstream, downstream), petroquímica, refinación, generación de energía, industria química y agua/saneamiento.",
    cta: { label: "Ver quiénes somos", href: "/quienes-somos" },
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
