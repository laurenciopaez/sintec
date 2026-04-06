/**
 * constants-en.ts — English version of constants.ts
 *
 * HOW TO TRANSLATE:
 * 1. For re-exported large objects (SERVICES, STATS, etc.), copy the original
 *    from constants.ts, paste it below, comment out the re-export, and
 *    replace all Spanish text strings with English.
 * 2. Simple strings below are already translated — review and adjust as needed.
 */

import { SERVICE_INTEGRITY, SERVICE_RBI, SERVICE_FAILURE, SERVICE_CORROSION, SERVICE_INSPECTION, SERVICE_PROCEDURES, SERVICE_CORROSION2, SERVICE_FAILURE2, SERVICE_INSPECTION2, SERVICE_INTEGRITY2, SERVICE_PROCEDURES2, SERVICE_RBI2, SERVICE_DATA_ANALYSIS, SERVICE_DATA_ANALYSIS2} from "./images/index";

// ── Non-translatable (same in all languages) ──────────────────────────────────
export {
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
  COMPANY_FOUNDED,
} from "./constants";

// ── Translatable strings ──────────────────────────────────────────────────────

export const COMPANY_TAGLINE =
  "Engineering Integrity. Precision. Trust.";

export const COMPANY_DESCRIPTION =
  "Argentine consultancy specializing in integrity engineering, risk management and industrial asset reliability.";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/quienes-somos" },
  { label: "Solutions", href: "/soluciones" },
];

export const SERVICES = [
  {
    id: "integridad-activos",
    title: "Asset Integrity",
    shortDescription:
      "Integral management of the industrial assets lifecycle to maximize reliability and operational safety.",
    description:"We develop and implement Integrity Management Plans aligned with global standards (API, ASME, ISO). Our process covers from situational diagnosis and damage mechanisms analysis to the definition of Risk-Based Inspection Strategies (RBI).",
    alcance: [
      "Refineries",
      "Gas Processing Plants",
      "Petrochemical Terminals",
      "Transportation Pipelines",
    ],
    valorAgregado: [
      "We transform technical data into strategic decisions",
      "We prevent catastrophic failures",
      "We ensure mechanical reliability",
      "We extend the operability of your critical assets with full technical support",
    ],
    icon: "Shield",
    slug: "integridad-activos",
    features: [
      "Asset Status Evaluation",
      "Risk-Based Maintenance Plans",
      "Remaining Useful Life Management",
      "Structural Integrity Analysis",
    ],
    imageSrc: SERVICE_INTEGRITY,
    imageSrc2: SERVICE_INTEGRITY2,
    imageAlt: "Asset Integrity",
    faq: [
      {
        id: "faq-ia-1",
        question: "What is asset integrity?",
        answer: "Technical management that ensures equipment and installations operate safely, reliably and within design conditions. It evaluates the actual state of the equipment, its lifecycle and associated risks to prevent failures before they occur, guaranteeing continuous, predictable and safe operation.",
      },
      {
        id: "faq-ia-2",
        question: "How is the remaining useful life of an asset determined?",
        answer: "The remaining useful life is calculated by combining current inspection data (measured thicknesses, actual corrosion rates) with validated degradation models. We use the ASME MAWP methodology and the criteria of API 570/571 to compare the measured thickness against the required minimum thickness, obtaining the projected retirement date or the remaining useful life expressed in years.",
      },
      {
        id: "faq-ia-3",
        question: "What international regulations apply to integrity management?",
        answer: "The main standards that govern our work are: API 510 (pressure vessels), API 570 (process piping), API 653 (storage tanks), API 571 (damage mechanisms), ASME B31.3/B31.8, ISO 31000 (risk management) and NACE SP0169/SP0177 (corrosion control). The specific regulation depends on the type of asset and the industry.",
      },
      {
        id: "faq-ia-4",
        question: "How often should an Integrity Management Plan be updated?",
        answer: "An Integrity Management Plan should be reviewed at least once a year under normal conditions, and must be updated following changes in the process (pressure, temperature, fluid), significant inspection findings, modifications to the asset or operational incidents. For high-risk assets with active damage mechanisms, the review may be conducted semi-annually.",
      },
      {
        id: "faq-ia-5",
        question: "What equipment is covered?",
        answer: "Our coverage includes pressure vessels, heat exchangers and storage tanks, up to complete piping systems and loading infrastructure."
      },
      {
        id: "faq-ia-6",
        question: "What value does it provide?",
        answer: "Reduce failures, optimize maintenance and improve operational availability. By knowing the real state of the equipment, preventive maintenance intervals are optimized and the safe lifespan of critical infrastructure is extended, maximizing return on investment.",
      }
    ],
  },
  {
    id: "integridad-riesgos-rbi",
    title: "Risk Integrity (RBI)",
    shortDescription:
      "API 580/581 methodology for risk-based inspection, optimizing resources and maximizing safety.",
    description:
      "We implement Risk-Based Inspection (RBI) programs under API 580 and API 581 standards, transforming reactive management into a high-precision predictive maintenance strategy. By quantifying Failure Probability (POF) and Failure Consequence (COF), we prioritize our critical assets to focus resources where risk is highest. This technical approach not only ensures regulatory compliance but also optimizes inspection intervals, reducing operational costs and minimizing exposure to risk for personnel and the environment.",
    icon: "BarChart3",
    slug: "integridad-riesgos-rbi",
    features: [
      "API 580/581 Risk Assessment",
      "Custom Risk Matrices",
      "Optimized Inspection Plans",
      "Specialized RBI Software",
    ],
    imageSrc: SERVICE_RBI,
    imageAlt: "Integridad de Riesgos (RBI)",
    imageSrc2: SERVICE_RBI2,
    faq: [
      {
        id: "faq-rbi-1",
        question: "What is RBI?",
        answer: "Methodology that prioritizes inspections based on risk (failure probability + consequence). It allows safely extending inspection intervals for low-risk equipment and focusing efforts and budgets where it really matters.",
      },
      {
        id: "faq-rbi-2",
        question: "What is the purpose of RBI?",
        answer: "RBI serves to optimize inspection and maintenance resources, prioritizing those equipment items that present a higher risk. This allows for cost reduction and improved safety.",
      },
      {
        id: "faq-rbi-3",
        question: "What is the failure consequence (COF) and how is it calculated?",
        answer: "The failure consequence (COF) is the severity of the impact if an equipment fails, considering aspects such as safety, environment, production, and costs. It is evaluated through impact matrices that assign values to each category of consequence."
      },
      {
        id: "faq-rbi-4",
        question: "What is the failure probability (POF) and how is it calculated?",
        answer: "The failure probability (POF) is the probability that an equipment will fail within a given period, based on its current condition, active damage mechanisms, and operating conditions. It is calculated using validated probabilistic models from API 581, which integrate inspection data, corrosion rates, and equipment characteristics.",
      },
      {
        id: "faq-rbi-5",
        question: "What are the most common damage mechanisms in RBI evaluation?",
        answer: "According to API 571, the most relevant mechanisms in Oil & Gas and petrochemical industries include: wall thickness reduction due to corrosion (local and general), hydrogen embrittlement (HIC/SOHIC/SSC), corrosion under insulation (CUI), stress corrosion cracking (SCC), mechanical fatigue, and erosion. The RBI study identifies which mechanisms are active in each piece of equipment based on service conditions and construction materials.",
      },
      {
        id: "faq-rbi-6",
        question: "How does RBI optimize inspection intervals?",
        answer: "RBI replaces fixed intervals with frequencies based on the calculated risk. An equipment with low risk can extend its inspection period, while one with high risk requires more frequent oversight. This avoids both under-inspection and over-inspection. Studies demonstrate cost reductions of up to 30-40% with equal or greater operational safety.",
      },
      {
        id: "faq-rbi-7",
        question: "How often should an RBI study be updated?",
        answer: "The RBI study should be updated at least every 3-5 years, or when: inspection results significantly differ from predictions, process conditions change, equipment modifications occur, or company risk criteria are updated. Partial recalibration can be performed more frequently without needing to restructure the entire study."
      },
      {
        id: "faq-rbi-8",
        question: "What information is needed to develop an RBI study?",
        answer: "Process information (fluids, temperature, pressure, flow rates), construction data (materials, nominal thicknesses, manufacturing year), inspection history and measured thicknesses, failure and repair history, and company consequence criteria are required. If no inspection history exists, we start with a conservative assessment that is refined with the first obtained data.",
      },
    ],
  },
  {
    id: "analisis-falla",
    title: "Failure Analysis",
    shortDescription:
      "Forensic investigation of failures in equipment and structures with RCA methodologies to prevent recurrences.",
    description:
      "Our RBI methodology allows for dynamic management of mechanical integrity. By applying the probabilistic models from API standards, we achieve:",
    alcance: [
      "Asset Hierarchy: Identification of equipment with high latent damage mechanisms.",
      "Efficiency in Plant Shutdowns (Turnarounds): Reduction of unnecessary inspection scopes in low-risk equipment.",
      "Data-Based Safety: We replace fixed schedules with frequencies based on the real state and calculated risk, ensuring operational continuity without compromising structural integrity.",
    ],
    icon: "Search",
    slug: "analisis-falla",
    features: [
      "Root Cause Analysis (RCA)",
      "Fractography Analysis",
      "Metallography and characterization",
      "Technical Expert Reports",
    ],
    imageSrc: SERVICE_FAILURE,
    imageAlt: "Failure Analysis",
    imageSrc2: SERVICE_FAILURE2,
    faq: [
      {
        id: "faq-af-1",
        question: "When is it essential to conduct a failure analysis?",
        answer: "A formal failure analysis is essential when: failures cause unplanned production shutdowns, events have potential for personal or environmental harm, recurrent failures occur in the same equipment or asset type, unexpected findings are discovered during scheduled inspections, and situations require technical-legal justification (insurance, warranties, contractual liabilities).",
      },
      {
        id: "faq-af-2",
        question: "What does failure analysis involve?",
        answer: "It is a technical investigation that aims to identify the root cause of a failure in equipment or components, evaluating mechanical, operational, metallurgical and environmental factors. The process includes: data collection (operational history, process conditions, maintenance), visual and dimensional inspection of the failed component, metallographic analysis, fractography analysis, study of mechanical properties for material characterization, evaluation of active damage mechanisms, simulation and modeling to validate hypotheses, and preparation of a technical report with conclusions and recommendations to prevent recurrences.",
      },
      {
        id: "faq-af-3",
        question: "What laboratory analyses are performed in a failure study?",
        answer: "We perform: visual and macroscopic examination of the failed component, optical metallography to evaluate the microstructure and degradation mechanisms, chemical analysis by EDX/EDS to identify deposits or specific corrosion, hardness tests and comparison with original specifications, among others.",
      },
      {
        id: "faq-af-4",
        question: "How should evidence be preserved before analysts arrive?",
        answer: "Correct preservation is critical for the validity of the analysis. It is recommended: not to clean or alter the fracture surfaces; to photograph in-situ before any manipulation; to label and package the pieces in dry bags or with silica gel; to record the process conditions prior to the event; and to document the recent operational history. Poor preservation can prevent the determination of the failure mechanism.",
      },
      {
        id: "faq-af-5",
        question: "What deliverables does the failure analysis report include?",
        answer: "The technical report includes: description of the event and operational context, detailed results of all performed analyses (with images and data), identification of the failure mechanism and root causes (physical, human and systemic), conclusions based on international standards, and specific recommendations to prevent recurrence. The report is usable as a technical-legal document.",
      },
    { id: "faq-af-6",
      question: "What damage mechanisms can be identified?",
      answer: "The damage mechanisms we can identify include: general and localized corrosion, hydrogen embrittlement (HIC/SOHIC/SSC), corrosion under insulation (CUI), stress corrosion cracking (SCC), mechanical fatigue, erosion, overloading, manufacturing defects, installation defects, unacceptable operating conditions, among others. Precise identification of the mechanism is fundamental to implement effective corrective measures and prevent recurrences.",
    }
    ],
  },
  {
    id: "control-corrosion",
    title: "Corrosion Control",
    shortDescription:
      "Advanced solutions for cathodic protection, coatings, and monitoring to combat corrosion.",
    description:
      "We offer specialized engineering solutions for the control of internal and external corrosion in critical infrastructure (pipelines, storage tanks, and offshore structures):",
    alcance: [
      "Cathodic Protection (CP): Design of impressed current systems (ICCP) and sacrificial anodes (GACP), including resistivity studies and potential audits.",
      "High-Performance Coatings: Selection and technical specification of painting and lining schemes based on severe service conditions.",
      "Monitoring and Diagnosis: Implementation of corrosion coupons, electrical resistance probes, and remote monitoring systems for data-driven decision-making in real-time.",
    ],
    icon: "Layers",
    slug: "control-corrosion",
    features: [
      "Cathodic Protection (CP)",
      "Coating Evaluation",
      "Corrosion Monitoring",
      "Inhibitors and Treatments",
    ],
    imageSrc: SERVICE_CORROSION,
    imageAlt: "Corrosion Control",
    imageSrc2: SERVICE_CORROSION2,
    faq: [
      {
        id: "faq-cc-1",
        question: "Why is corrosion control important?",
        answer: "Corrosion is one of the main causes of deterioration in industrial assets, representing a significant risk to safety, the environment, and operational continuity. Effective corrosion control prevents catastrophic failures, reduces maintenance and repair costs, and extends the service life of critical assets. In industries such as Oil & Gas, petrochemicals, and energy, proactive corrosion management is essential to ensure safe and profitable operations.",
      },
      {
        id: "faq-cc-2",
        question: "What criteria define the selection of a corrosion-resistant coating?",
        answer: "The selection is based on service conditions: operating temperature, fluid type and contaminants, exposure conditions (buried, submerged, atmospheric), and accessibility for maintenance. Typical schemes for pipelines include epoxy primers + intermediate layers + polyurethane or epoxy finishes, following SSPC/NACE specifications for surface preparation (SSPC-SP10 Near White or SP6 Commercial).",
      },
      {
        id: "faq-cc-3",
        question: "What is corrosion under insulation (CUI) and why is it so problematic?",
        answer: "Corrosion Under Insulation (CUI) occurs when moisture penetrates the thermal insulation system and becomes trapped on the metallic surface. It is particularly dangerous because it progresses covertly, without visible external signs. The temperature ranges most susceptible are -4°C to 175°C according to API 571. Detection requires special techniques: pulsed eddy current (PEC), computed radiography or infrared thermography.",
      },
      {
        id: "faq-cc-4",
        question: "How do corrosion coupons work and what are their limitations?",
        answer: "Corrosion coupons are metal specimens exposed to the process fluid for defined periods (30-90 days) to measure mass loss and calculate average corrosion rate (mm/year). Their main limitation is that they only provide an average value for the period and do not detect localized accelerated corrosion events. Therefore, we complement them with in-line electrochemical techniques that provide real-time data."
      },
      {
        id: "faq-cc-5",
        question: "What solutions are applied?",
        answer: "We design customized mitigation strategies, including the use of protective coatings, cathodic protection systems, the implementation of preventive maintenance practices, and the appropriate selection of materials. These practices allow us to reduce the corrosion rate, prevent failures, and extend the service life of industrial assets.",
      },
    ],
  },
  {
    id: "inspeccion-monitoreo",
    title: "Internal Corrosion and Industrial Electrochemistry Monitoring",
    shortDescription:
      "Dynamic and real-time evaluation of corrosion kinetics under operational conditions.",
    description:
      "We implement advanced monitoring systems designed to capture the electrochemical behavior of assets under their actual service conditions (pressure, temperature and fluid). Unlike conventional methods, we use 3 and 5 electrode cells that act as critical sensors in wellheads, production tubulars and plant facilities, allowing a deep insight into the corrosive phenomenon without interrupting the process. ",
    valorAgregado: [
      "They enable the determination of instantaneous corrosion rates and the analysis of corrosive mechanisms.",
      "They facilitate the evaluation of the performance of mitigation systems in service (corrosion inhibitors, chemical sequestering agents, biocides).",
      "They support the study and evaluation of surface films (protective oxides, film inhibitors, organic films).",
    ],
    alcance: [
      "Installation and Management of Sensors: Configuration of electrochemical cells at critical points (Wellhead, Pipelines, Separators).",
      "Mitigation Systems Audit: Monitoring the efficiency of chemical injection and dosage optimization (OPEX).",
      "Corrosion Mechanism Analysis: Studies of CO2/H2S corrosion, corrosion under flow and microbiological regimes (MIC).",
    ],
    icon: "Eye",
    slug: "inspeccion-monitoreo",
    features: [
      "Evaluation of Biocides",
      "Study of Electrochemical Behavior",
      "Application Flexibility",
      "Continuous Online Monitoring",
    ],
    imageSrc: SERVICE_INSPECTION,
    imageAlt: "Inspection and Monitoring",
    imageSrc2: SERVICE_INSPECTION2,
    faq: [
      {
        id: "faq-im-1",
        question: "What are the advantages of electrochemical cells over conventional corrosion coupons?",
        answer: "The 3 and 5 electrode cells allow for real-time measurements of instantaneous corrosion rates, identification of active corrosive mechanisms, and evaluation of inhibitor efficiency at the time of injection. This enables responses within hours to changes in corrosive conditions, rather than waiting 30-90 days as with conventional coupons, which average results and may hide accelerated corrosion events.",
      },
      {
        id: "faq-im-2",
        question: "What is the mobile electrochemical measurement service in the field?",
        answer: "Our mobile field service is designed to determine instantaneous corrosion rates in systems with circulating fluids, under real operating conditions. Through the collection of fluid samples and in situ electrochemical analysis, we can evaluate corrosion kinetics, identify active mechanisms, and optimize inhibitor dosing in real-time, without the need to interrupt operations or wait for long-term results.",
      },
      {
        id: "faq-im-3",
        question: "How is the efficiency of a corrosion inhibitor measured with electrochemistry?",
        answer: "The efficiency of the inhibitor is evaluated using the Linear Polarization Resistance (LPR) technique, which measures the instantaneous corrosion rate before and after chemical injection. The efficiency is expressed as: IE% = [(Vcorr without inhibitor - Vcorr with inhibitor) / Vcorr without inhibitor] × 100. A good performing inhibitor achieves efficiencies above 85-90%.",
      },
      {
        id: "faq-im-4",
        question: "What is microbiologically influenced corrosion (MIC) and how is it detected with electrochemistry?",
        answer: "MIC is a type of accelerated corrosion caused by the metabolic activity of microorganisms (mainly sulfate-reducing bacteria, SRB, and acid-producing bacteria, APB) that create aggressive microenvironments on the metallic surface. It is detected through electrochemical noise analysis (EN), which shows characteristic patterns of potential and current fluctuations distinguishable from other corrosion mechanisms.",
      },
      {
        id: "faq-im-5",
        question: "Is it necessary to stop the production of the plant or production well to measure internal corrosion?",
        answer: "No. We use monitoring techniques and online access tools that allow us to collect fluid samples and perform measurements without the need to stop production or interrupt the process. This is especially valuable for critical assets where unplanned shutdowns can generate significant losses. Our approach is based on the integration of sensors and sampling techniques that ensure safety and operational continuity during internal corrosion assessment.",
      },
      {
        id: "faq-im-6",
        question: "Is it necessary to stop the production of the plant or production well to measure internal corrosion?",
        answer: "No. We use monitoring techniques and online access tools that allow us to collect fluid samples and perform measurements without the need to stop production or interrupt the process. This is especially valuable for critical assets where unplanned shutdowns can generate significant losses. Our approach is based on the integration of sensors and sampling techniques that ensure safety and operational continuity during internal corrosion assessment."
      },
      {
        id: "faq-im-7",
        question: "Is it necessary to stop the production of the plant or production well to measure internal corrosion?",
        answer: "Since it is a completely mobile system, our specialists can quickly travel to different critical points of your plant (cooling systems, ducts, separators) to perform electrochemical mapping on-site."
      },
    ],
  },
  {
    id: "procedimientos-tecnicos",
    title: "Procedure Engineering and Technical Standards",
    shortDescription:
      "Elaboration of procedures, technical specifications and documentation for safe operations.",
    description:
      "We transform the requirements of international standards into executable guidelines that ensure the repeatability and safety of your processes. We develop a solid documentation ecosystem that serves as a foundation for technical decision-making, ensuring that each intervention in industrial plants, wells or ducts is aligned with the best practices of the industry (API, ASME, NACE/AMPP and ISO).",
      valorAgregado: [
      "Process Standardization: Reduction of operational variability and human errors through clear and verifiable protocols.",
      "Compliance Guarantee: Total alignment with regulatory frameworks and mechanical integrity audits.",
      "Knowledge Preservation: Capture of technical 'know-how' to ensure operational continuity and training of qualified personnel.",
    ],
    alcance: [
      "Integrity Management Manuals (PIM): Comprehensive documentation for the management of the lifecycle of pipelines and pressure vessels.",
      "Repair and Alteration Procedures: Development of repair methodologies according to API 510, 570 and 653.",
      "Operation and Maintenance (O&M) Philosophies: Technical guidelines for safe operation within Operational Integrity Windows (IOW).",
    ],
    icon: "FileText",
    slug: "procedimientos-tecnicos",
    features: [
      "Inspection Procedures",
      "Technical Specifications",
      "Operation and Maintenance Manuals",
      "Documentation in Compliance with API/ASME Standards",
    ],
    imageSrc: SERVICE_PROCEDURES,
    imageAlt: "Procedure Engineering",
    imageSrc2: SERVICE_PROCEDURES2,
    faq: [
      {
        id: "faq-pt-1",
        question: "What standards are the basis for the development of technical procedures?",
        answer: "The procedures we develop are based on: API 510 (pressure vessels), API 570 (piping systems), API 653 (storage tanks), API 580/581 (risk-based inspection), ASME B31.3/B31.8/B31.4, ASME PCC-2 (repairs), NACE/AMPP SP0169 and SP0177, and ISO 9001/45001. The specific standard depends on the type of installation and the regulatory jurisdiction.",
      },
      {
        id: "faq-pt-2",
        question: "What is a Pipeline Integrity Management Manual (PIM) and what must it include?",
        answer: "The Pipeline Integrity Management Manual (PIM) is the governing document for the management of pipeline integrity. It must include: system description and risk characterization, identification of high-consequence segments (HCA), integrity evaluation methodology (ILI, ECDA/ICDA/SCCDA), response and remediation criteria, preventive monitoring program, and emergency response procedures. Its regulatory framework is API 1160.",
      },
      {
        id: "faq-pt-3",
        question: "What are Operational Integrity Windows (IOW) and how are they established?",
        answer: "The Integrity Operating Windows (IOW) are the limits of process variables (temperature, pressure, contaminant concentration, pH, fluid velocity) within which the asset operates safely. They are established through the analysis of active damage mechanisms and their activation thresholds: for example, the corrosion rate due to CO2 increases exponentially above a certain temperature. The reference framework is API RP 584.",
      },
      {
        id: "faq-pt-4",
        question: "How do you ensure that procedures are executable by operational staff?",
        answer: "Executable quality is ensured through: technical review by process engineers and inspection, field review with operators who will execute them, verification of equipment and tool availability, pilot testing when possible, and training sessions before implementation. Procedures are drafted with clear step-by-step instructions, decision points, quantifiable acceptance criteria, and contingency actions.",
      },
      {
        id: "faq-pt-5",
        question: "With what frequency should technical procedures be reviewed and updated?",
        answer: "Inspection and maintenance procedures must be reviewed at least every 3 years, or upon changes in reference regulations, equipment or process modifications, audit results or incidents. Emergency response procedures require annual review and periodic drills. We implement a MOC (Management of Change) system to ensure that any modification goes through a documented approval process."
      },
    ],
  },
  {
    id: "analisis-de-datos",
    title: "Data Analysis and Asset Intelligence",
    shortDescription:
      "We transform technical data into actionable insights for industrial asset optimization.",
    description:
      "In an increasingly digital industrial environment, advanced data analysis and machine learning have become indispensable tools for asset management. Our consulting services integrate statistical analysis, machine learning, and data visualization techniques to convert technical information into practical insights that optimize decision-making. From identifying failure patterns to predicting degradation trends, our data-driven approach enables clients to anticipate problems, optimize maintenance plans, and maximize the lifespan of their critical assets.",
    icon: "BarChart3",
    slug: "analisis-de-datos",
    features: [
      "Advanced statistical analysis",
      "Predictive models based on machine learning",
      "Interactive data visualization",
      "Integration of inspection and operational data",
    ],
    imageSrc: SERVICE_DATA_ANALYSIS,
    imageAlt: "Data Analysis",
    imageSrc2: SERVICE_DATA_ANALYSIS2,
    faq: [
      {
        id: "faq-ad-1",
        question: "What are the models that you use the most?",
        answer: "We use linear and non-linear regression models to identify relationships between variables, classification models (Random Forest, SVM) to categorize asset states, and time series models (ARIMA, LSTM) to predict degradation trends. The model selection depends on the type of available data and the specific objective of the analysis."
      },
      {
        id: "faq-ad-2",
        question: "How are predictive models used in asset management?",
        answer: "Predictive models based on machine learning identify complex patterns in the data that may indicate an imminent failure or accelerated degradation. This allows for anticipating problems before they occur, optimizing maintenance plans, and extending the useful life of assets.",
      },
      {
        id: "faq-ad-3",
        question: "What type of data is needed for advanced analysis?",
        answer: "We require inspection data (measured thicknesses, non-destructive testing results), operational data (temperature, pressure, flow rate, fluid composition), maintenance and repair history, and previous failure data. The quality and quantity of available data directly influences the accuracy of predictive models.",
      },
      {
        id: "faq-ad-4",
        question: "How are the results of data analysis visualized?",
        answer: "We use visualization tools with Matplotlib to present the results in a clear and interactive manner. This includes trend charts, heat maps, scatter plots, and dynamic tables that allow users to explore the data and obtain actionable insights.",
      }
    ],
  },
];


export const STATS = [
  {
    id: "experience",
    value: 20,
    prefix: "+",
    suffix: "",
    label: "Years of Experience",
    description: "Proven track record in the industry",
  },
  {
    id: "projects",
    value: 1000,
    prefix: "+",
    suffix: "",
    label: "Projects Completed",
    description: "Across the country and region",
  },
  {
    id: "clients",
    value: 10,
    prefix: "+",
    suffix: "",
    label: "Active Clients",
    description: "Leading companies in the industry",
  },
  {
    id: "quality",
    value: 100,
    prefix: "",
    suffix: "%",
    label: "Commitment to Quality",
    description: "In every project and deliverable",
  },
];

export interface FaqTreeNode {
  id: string;
  /** Text shown on the button at this level */
  label: string;
  // Leaf-only (answer view)
  question?: string;
  answer?: string;
  cta?: { label: string; href: string };
  // Branch-only (sub-menu)
  children?: FaqTreeNode[];
}


export const FAQ_TREE: FaqTreeNode[] = [
  {
    id: "servicios",
    label: "What services do we offer?",
    children: [
      {
        id: "integridad-activos",
        label: "Asset Integrity",
        question: "What is Asset Integrity?",
        answer:
          "It is the technical management of the lifecycle of industrial assets to ensure they operate safely and reliably. We develop Integrity Management Plans (PGI) aligned with API, ASME and ISO, evaluating the real state of equipment, active damage mechanisms and remaining useful life.",
        cta: { label: "View the service", href: "/soluciones/integridad-activos" },
      },
      {
        id: "rbi",
        label: "Risk-Based Inspection (RBI)",
        question: "What is RBI and what is it for?",
        answer:
          "RBI (Risk-Based Inspection, API 580/581) evaluates the Probability and Consequence of Failure of each piece of equipment to prioritize inspections where the risk is higher. It allows optimizing inspection intervals, reducing costs by up to 40% without compromising operational safety.",
        cta: { label: "Learn more about RBI", href: "/soluciones/integridad-riesgos-rbi" },
      },
      {
        id: "analisis-falla",
        label: "Failure Analysis",
        question: "What is Failure Analysis?",
        answer:
          "It is a forensic investigation that identifies the root cause of a failure through metallography, fractography, chemical analysis and modeling. The result is a technical-expert report with root causes (physical, human and systemic) and recommendations to prevent recurrences.",
        cta: { label: "View the service", href: "/soluciones/analisis-falla" },
      },
      {
        id: "control-corrosion",
        label: "Corrosion Control",
        question: "What corrosion control solutions do you offer?",
        answer:
          "We design and implement cathodic protection (ICCP and sacrificial anodes), specification of anticorrosive coatings (SSPC/NACE), monitoring with coupons and electrical resistance probes, and treatment with inhibitors. We cover internal, external, atmospheric and CUI corrosion.",
        cta: { label: "View the service", href: "/soluciones/control-corrosion" },
      },
      {
        id: "monitoreo",
        label: "Industrial Electrochemical Monitoring",
        question: "What is Industrial Electrochemical Monitoring?",
        answer:
          "We use 3 and 5 electrode cells installed under real operating conditions (pressure, temperature and fluid) to measure instantaneous corrosion rates without interrupting the process. Applications in wellheads, pipelines and separators, with evaluation of inhibitors and biocides.",
        cta: { label: "View the service", href: "/soluciones/inspeccion-monitoreo" },
      },
      {
        id: "procedimientos",
        label: "Technical Procedures",
        question: "What technical procedures do you develop?",
        answer:
          "We develop inspection, repair and operation procedures under API, ASME and NACE standards. The documentation is suitable for audits, certifications and as technical-legal support before regulatory bodies.",
        cta: { label: "View the service", href: "/soluciones/procedimientos-tecnicos" },
      },
    ],
  },
  {
    id: "sobre-sintec",
    label: "About SINTEC S.A.",
    children: [
      {
        id: "quienes-somos",
        label: "Who are we?",
        question: "Who are SINTEC S.A.?",
        answer:
          "We are an Argentine consulting firm founded in 2004, specialized in industrial asset integrity engineering. We have certified engineers in API, ASME and NACE standards, with extensive experience in Oil & Gas, petrochemical and energy sectors across the national territory.",
        cta: { label: "Learn more about us", href: "/quienes-somos" },
      },
      {
        id: "industries",
        label: "In which industries do you work?",
        question: "In which industries do you work?",
        answer:
          "We specialize in industries with high integrity demand: Oil & Gas (upstream, midstream, downstream), petrochemical, refining, energy generation, chemical industry and water/wastewater treatment.",
        cta: { label: "View who we are", href: "/quienes-somos" },
      },
      {
        id: "coverage",
        label: "Do you work throughout Argentina?",
        question: "Do you work throughout Argentina?",
        answer:
          "Yes, we operate throughout the Argentine territory. We have developed projects in Buenos Aires, Neuquén (Vaca Muerta), Mendoza, Chubut and Santa Cruz, with certified personnel and own equipment.",
        cta: { label: "Contact a specialist", href: "/#contacto" },
      },
      {
        id: "horarios-atencion",
        label: "What is the customer service hours?",
        question: "What is the customer service hours?",
        answer:
          "We work from Monday to Friday from 9 to 18 hours. Outside this schedule, you can contact us by email or complete the contact form on our website, and we will get back to you within 24 business hours.",
        cta: { label: "Contact a specialist", href: "/#contacto" },
      },
      {
        id: "ubicación-operacional",
        label: "Where are we located?",
        question: "Where are we located?",
        answer:
          "Our offices are located in the city of Mar del Plata, but we operate throughout the Argentine territory. We have certified personnel and own equipment to develop projects in any region of the country.",
        cta: { label: "Contact a specialist", href: "/#contacto" },
      },
      {
        id: "hablar-personalmente",
        label: "How can I speak with a specialist?",
        question: "How can I speak with a specialist?",
        answer:
          "You can contact us by email at jprossi@sintecsa.com.ar or by phone at +54 223 373-0283. You can also complete the contact form on our website and we will get back to you within 24 business hours.",
        cta: { label: "Go to the contact form", href: "/#contacto" },
      },
    ],
  },
  {
    id: "contacto",
    label: "Contacto y consultas",
    children: [
      {
        id: "como-contactar",
        label: "How can I contact them?",
        question: "How can I contact them?",
        answer:
          "You can contact us by email at jprossi@sintecsa.com.ar or by phone at +54 223 373-0283. You can also complete the contact form on our website and we will get back to you within 24 business hours.",
        cta: { label: "Go to the contact form", href: "/#contacto" },
      },
      {
        id: "cotizacion",
        label: "How do I get a quote?",
        question: "How do I get a quote?",
        answer:
          "Quotes are prepared according to the scope of the project (type of assets, quantity of equipment, applicable regulations and location). Contact us with a description of your need and a specialist will send you an technical-economical proposal without commitment.",
        cta: { label: "Request a quote", href: "/#contacto" },
      },
    ],
  },
];

// Flat list of leaf nodes — retrocompatibilidad con analytics y cache
export const FAQ_ITEMS = FAQ_TREE.flatMap((branch) =>
  (branch.children ?? []).filter((n) => !n.children).map((n) => ({
    id:       n.id,
    question: n.question ?? n.label,
    answer:   n.answer ?? "",
    cta:      n.cta ?? { label: "Contactar", href: "/#contacto" },
  }))
);

export const VALUES = [
  {
    title: "Technical Excellence",
    description:
"We guarantee accuracy in every diagnosis through regulatory rigor and an engineering team with extensive experience.",
    icon: "Award",
    image: "/sintec/img/quienesSomos/excelenciaTecnica.jpeg",
  },
  {
    title: "Professional Integrity",
    description:
"Fundamental basis of our consulting; we deliver impartial and ethical results that ensure traceability in decision-making.",
    icon: "Shield",
    image: "/sintec/img/quienesSomos/integridadProfesional.jpeg",
  },
  {
    title: "Commitment to Safety",
    description:
    "Process safety and the protection of people are non-negotiable. We design solutions focused on critical risk mitigation.",
    icon: "Heart",
    image: "/sintec/img/quienesSomos/compromisoSeguridad.jpeg",
  },
  {
    title: "Continuous Innovation",
    description:
"We evolve alongside the industry, integrating emerging methodologies and digitalization to optimize our clients' asset management.",
    icon: "Lightbulb",
    image: "/sintec/img/quienesSomos/innovacionContinua.png",
  },
];


export const HERO = {
  subtitle: "Industrial Integrity Engineering",
  ctaSolutions: "Explore Solutions",
  ctaContact: "Contact Us",
  stats: [
    { value: "+20",   label: "Years of experience" },
    { value: "+1000", label: "Completed projects" },
    { value: "+10",   label: "Active clients" },
  ],
};

export const FOOTER = {
  tagline: "Argentine consultancy specializing in industrial integrity engineering. Over 20 years of experience at your service.",
  navHeading: "Navigation",
  navAriaLabel: "Site pages",
  servicesHeading: "Services",
  servicesAriaLabel: "Services",
  contactHeading: "Contact",
  contactLabelPhone: "Phone",
  contactLabelAddress: "Location",
  contactLabelHR: "HR",
  contactHRLink: "Work with us",
  contactNavLink: "Contact",
  copyright: "All rights reserved.",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
};

export const CLIENTS_SECTION = {
  label: "Companies that trust us",
};

export const ABOUT_TEASER = {
  tagAbove: "About us",
  cardTag: "Who we are",
  cardTitle: "Industrial Integrity Experts",
  cardDescription: "Founded in 2004, SINTEC S.A. is a leading Argentine consultancy in integrity engineering. We work with the main oil & gas, petrochemical and energy companies in the country.",
  cardStats: [
    { value: "2004", label: "Founded" },
    { value: "+20", label: "Years" },
    { value: "+150", label: "Projects" },
  ],
  highlights: [
    { title: "International Certifications", description: "API, NACE, ASME and more world-class standards" },
    { title: "Interdisciplinary Team", description: "Chemical, Mechanical and Electromechanical Engineers." },
    { title: "National Coverage", description: "Projects throughout Argentina and abroad" },
  ],
  heading: "Engineering with purpose and precision",
  description: "At SINTEC S.A. we combine technical expertise, international methodologies and a team of passionate engineers to deliver integrity solutions that protect people, assets and investments.",
  keyPoints: [
    "Over 20 years of industry experience",
    "International methodologies API, ASME and NACE",
    "Team certified in NDT and RBI",
    "Comprehensive approach from assessment to solution",
  ],
  cta: "Learn more about us",
};

export const CONTACT_SECTION = {
  tag: "Contact",
  heading: "Let's talk about your project",
  subheading: "Tell us your needs and our specialists will respond within 24 business hours.",
  labelPhone: "Phone",
  labelAddress: "Location",
  responseNote: "We respond to all inquiries within 24 business hours. For emergencies, contact us directly by phone.",
  labelName: "Full name",
  labelEmail: "Corporate email",
  labelCompany: "Company",
  labelTel: "Phone",
  labelService: "Service of interest",
  selectDefault: "Select a service...",
  labelMessage: "Message",
  messagePlaceholder: "Briefly describe your inquiry or project...",
  submit: "Send message",
  sending: "Sending...",
  successTitle: "Message sent!",
  successBody: "We have received your inquiry. A SINTEC S.A. specialist will be in touch shortly.",
  successReset: "Send another inquiry",
  privacy: "Your data is confidential and will never be shared with third parties.",
  errorDefault: "Error sending. Please try again.",
  errorNetwork: "Connection error. Check your internet and try again.",
  serviceOptions: [
    "Asset Integrity",
    "Risk-Based Inspection (RBI)",
    "Failure Analysis",
    "Corrosion Control",
    "Inspection and Monitoring",
    "Technical Procedures",
    "Data Analytics and Machine Learning",
    "Other / General Inquiry",
  ],
  solucionesTag: "Specialized services",
  solucionesViewDetail: "View detail",
  solucionesCatalog: "Download our complete Solutions catalog",
};

export const SERVICES_SECTION = {
  tag: "What we do",
  heading: "Our Services",
  subheading: "Specialized solutions in industrial integrity, designed to maximize the reliability and safety of your assets.",
  viewAll: "View all solutions in detail",
  learnMore: "Learn more",
};

export const STATS_SECTION = {
  tag: "Our track record",
  heading: "More than two decades of experience",
  subheading: "Numbers that reflect our commitment to excellence and the trust of our clients.",
};

export const TRABAJA_CON_NOSOTROS = {
  tag: "Human Resources",
  title: "Work With Us",
  subtitle:
    "We are looking for professionals passionate about industrial engineering. Send us your CV and we will contact you when an opportunity arises that matches your profile.",
  valueProps: [
    { title: "+20 years", desc: "of track record in the Argentine and international market" },
    { title: "Technical team", desc: "specialized in industrial integrity and reliability" },
    { title: "Real projects", desc: "with impact in leading companies in the energy sector" },
  ],
  footerNote:
    "Applications are reviewed by our HR team. We will contact you when positions become available.",
  areas: [
    "Industrial Integrity Engineering",
    "Inspection and Monitoring",
    "Data Analysis / Machine Learning",
    "Corrosion Control",
    "Failure Analysis",
    "Administration and Management",
    "Other",
  ],
  form: {
    labelNombre: "Full name",
    placeholderNombre: "John Smith",
    labelEmail: "Email",
    placeholderEmail: "john@example.com",
    labelEdad: "Age",
    placeholderEdad: "30",
    labelArea: "Area of interest",
    placeholderArea: "Select an area...",
    labelEstudios: "Education",
    placeholderEstudios: "E.g.: Mechanical Engineering — National University",
    labelCv: "Curriculum Vitae",
    cvHint: "(PDF, DOC or DOCX — max. 5 MB)",
    cvUploadText: "Click to select your CV",
    cvRemoveLabel: "Remove file",
    labelPresentacion: "Cover letter",
    presentacionOptional: "(optional)",
    placeholderPresentacion:
      "Tell us briefly about yourself and why you are interested in working at SINTEC S.A.",
    submit: "Submit application",
    sending: "Sending...",
    privacy:
      "Your data is confidential and will be used solely for the selection process.",
    successTitle: "Application sent!",
    successBody:
      "We received your CV. Our HR team will review it and will contact you if your profile matches our needs.",
    successReset: "Send another application",
    errNombreRequired: "Name is required",
    errNombreMin: "Minimum 2 characters",
    errNombreMax: "Maximum 100 characters",
    errBlocked: "This field contains inappropriate language",
    errEmailRequired: "Email is required",
    errEmailInvalid: "Invalid email format",
    errEmailMax: "Email is too long",
    errEdadRequired: "Age is required",
    errEdadInvalid: "Enter a valid age (16–80)",
    errEstudiosRequired: "Education is required",
    errEstudiosMin: "Minimum 5 characters",
    errEstudiosMax: "Maximum 200 characters",
    errAreaRequired: "Please select an area of interest",
    errCvRequired: "CV is required",
    errCvExt: "Only PDF, DOC or DOCX files are accepted",
    errCvSize: "File cannot exceed 5 MB",
    errPresentacionMax: "Maximum 1000 characters",
    errDefault: "Error sending. Please try again.",
    errNetwork: "Connection error. Check your internet and try again.",
    subjectPrefix: "CV Application",
    msgEdadSuffix: "years old",
    msgPresentacionLabel: "Cover letter:",
  },
};

export const SOLUTIONS_UI = {
  imageNotAvailable: "Image not available",
  imagePrev: "Previous image",
  imageNext: "Next image",
  imageViewN: "View image",
  serviceBadge: "Service",
  sidebarHeading: "Services",
  alcanceLabel: "Scope",
  valorAgregadoLabel: "Added Value",
  featuresHeading: "Service scope",
  consultService: "Inquire about this service",
  viewAllServices: "View all services",
  meetTheTeam: "Meet the team",
  consultNow: "Consult now",
  backToService: "Back to service",
  backToSolutions: "Back to Solutions",
  solucionesHeroTag: "Specialized services",
  faqHeading: "Frequently Asked Questions",
  faqNotFound: "Didn't find what you were looking for?",
  faqContact: "Contact us and a specialist will reply shortly.",
  faqConsult: "Consult a specialist",
};
