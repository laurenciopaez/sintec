type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

export const trackEvent = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window === "undefined" || !(window as any).gtag) return;

  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
};

// Eventos predefinidos del sitio
export const analytics = {
  contactFormSubmit: () =>
    trackEvent({ action: "generate_lead", category: "contact_form" }),

  contactFormError: (field: string) =>
    trackEvent({ action: "form_error", category: "contact_form", label: field }),

  ctaClick: (label: string) =>
    trackEvent({ action: "cta_click", category: "engagement", label }),

  whatsappClick: () =>
    trackEvent({ action: "contact_click", category: "engagement", label: "whatsapp" }),

  emailClick: () =>
    trackEvent({ action: "contact_click", category: "engagement", label: "email" }),

  chatbotOpen: () =>
    trackEvent({ action: "chatbot_open", category: "engagement" }),

  chatbotFaqClick: (question: string) =>
    trackEvent({ action: "chatbot_faq_click", category: "chatbot", label: question }),

  solutionView: (slug: string) =>
    trackEvent({ action: "solution_view", category: "content", label: slug }),
};
