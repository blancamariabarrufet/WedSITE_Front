"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Locale = "en" | "es";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale];
      return dict[key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.experience": "Experience",
    "nav.host": "Our Invisible Host",
    "nav.process": "Process",
    "nav.pricing": "Pricing",
    "nav.cta": "Begin Your Story",
    "nav.mobileTitle": "The Digital Heirloom.",

    // Hero
    "hero.eyebrow": "Introducing the Digital Heirloom",
    "hero.headline1": "Your Love Story,",
    "hero.headline2": "Elegantly Digital.",
    "hero.body":
      "Beyond a simple website, WedSITE Studio creates a bespoke digital experience. Featuring",
    "hero.hostName": "The Invisible Host",
    "hero.bodyEnd": "\u2014 an AI concierge crafted to assist your guests with grace.",
    "hero.cta": "Begin Your Story",
    "hero.secondary": "Explore Examples",
    "hero.quote": "\u201CA masterpiece of digital grace.\u201D",
    "hero.attribution": "Vogue Weddings",

    // Features
    "features.heading": "Modern Sophistication",
    "features.sub":
      "We combine timeless aesthetics with the convenience of tomorrow.",
    "features.hostLabel": "The Invisible Host",
    "features.aiTitle": "AI Concierge",
    "features.aiBody":
      "A personalized AI trained on your wedding details. Whether guests need directions, dress code advice, or gift registry links, your concierge responds instantly with the warmth of a human assistant.",
    "features.aiLink": "Discover the magic \u2192",
    "features.designTitle": "Bespoke Design",
    "features.designBody":
      "Curated typography and layouts that mirror high-end stationery. No templates, just digital craft.",
    "features.curatedTitle": "Curated Details",
    "features.curatedBody":
      "Every aspect is carefully tailored to reflect your unique style and wedding theme.",
    "features.rsvpTitle": "Seamless RSVPs",
    "features.rsvpBody":
      "Intelligently manage guest lists and dietary requirements with one-tap digital confirmation.",

    // Process section
    "process.heading": "The Process",
    "process.sub": "Your bespoke digital heirlooom, crafted step by step.",
    "process.step1.title": "Brief & vision",
    "process.step1.body": "Style, must-haves & event details",
    "process.step2.title": "Design & content",
    "process.step2.body": "Palette, fonts, photos & copy",
    "process.step3.title": "First draft",
    "process.step3.body": "Homepage & key sections for review",
    "process.step4.title": "Revisions & RSVP",
    "process.step4.body": "Feedback, polish & guest form setup",
    "process.step5.title": "Launch",
    "process.step5.body": "Go live, share & ongoing updates",

    // Chat mockup
    "chat.greeting":
      "Hello! I\u2019m your host for Sarah & James\u2019s wedding. How can I help you today?",
    "chat.question": "What\u2019s the dress code for the Friday welcome dinner?",
    "chat.answer":
      "The welcome dinner is Coastal Chic. Think light linens and soft summer tones.",
    "chat.placeholder": "Ask me anything\u2026",

    // Closing CTA
    "cta.eyebrow": "The digital companion your love story deserves.",
    "cta.headline1": "Ready to welcome",
    "cta.headline2": "your guests?",
    "cta.button": "Begin Your Story",
    "cta.subtext": "Takes less than 5 minutes to start your draft.",

    // Footer
    "footer.copyright":
      "\u00A9 2025, The Ethereal Concierge. Crafted for the Modern Heirloom.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.concierge": "Concierge Access",
    "footer.press": "Press",

    // Order form
    "order.step1": "What are your names?",
    "order.partner1": "Partner 1",
    "order.partner2": "Partner 2",
    "order.step2": "When is your wedding?",
    "order.dateLabel": "Wedding date",
    "order.step3": "Where is the ceremony?",
    "order.ceremonyLabel": "Ceremony venue",
    "order.step4": "And the reception?",
    "order.receptionLabel": "Reception venue",
    "order.step5": "How many guests?",
    "order.step6": "What would you like?",
    "order.featureHint":
      "Selected experiences become part of your tailored digital heirloom.",
    "order.step7": "Physical invitations?",
    "order.yesPlease": "Yes, please",
    "order.digitalOnly": "Digital only",
    "order.step8": "Describe your aesthetic.",
    "order.aestheticLabel": "Aesthetic note",
    "order.step9": "Your email.",
    "order.emailLabel": "Email address",
    "order.emailHint": "We\u2019ll be in touch within 24 hours.",
    "order.step10": "Review & send",
    "order.names": "Names",
    "order.weddingDate": "Wedding date",
    "order.ceremonyVenue": "Ceremony venue",
    "order.receptionVenue": "Reception venue",
    "order.guestCount": "Guest count",
    "order.selectedFeatures": "Selected features",
    "order.physicalInvitations": "Physical invitations",
    "order.aesthetic": "Aesthetic",
    "order.email": "Email",
    "order.notProvided": "Not provided",
    "order.noneSelected": "None selected",
    "order.yes": "Yes",
    "order.back": "Back",
    "order.continue": "Continue",
    "order.send": "Send My Request",
    "order.received": "Received",
    "order.confirmTitle": "We\u2019ll be in touch soon.",
    "order.confirmBody":
      "Your request is with our team. Expect a note from us within 24 hours.",
    "order.close": "Close",
  },
  es: {
    // Nav
    "nav.experience": "Experiencia",
    "nav.host": "Nuestro Anfitri\u00F3n",
    "nav.process": "Proceso",
    "nav.pricing": "Precios",
    "nav.cta": "Comienza Tu Historia",
    "nav.mobileTitle": "La Herencia Digital.",

    // Hero
    "hero.eyebrow": "Presentamos la Herencia Digital",
    "hero.headline1": "Tu Historia de Amor,",
    "hero.headline2": "Elegantemente Digital.",
    "hero.body":
      "M\u00E1s que un simple sitio web, WedSITE Studio crea una experiencia digital a medida. Con",
    "hero.hostName": "The Invisible Host",
    "hero.bodyEnd":
      "\u2014 un conserje con IA dise\u00F1ado para asistir a tus invitados con elegancia.",
    "hero.cta": "Comienza Tu Historia",
    "hero.secondary": "Explorar Ejemplos",
    "hero.quote": "\u201CUna obra maestra de elegancia digital.\u201D",
    "hero.attribution": "Vogue Weddings",

    // Features
    "features.heading": "Sofisticaci\u00F3n Moderna",
    "features.sub":
      "Combinamos est\u00E9tica atemporal con la comodidad del ma\u00F1ana.",
    "features.hostLabel": "El Anfitri\u00F3n Invisible",
    "features.aiTitle": "Conserje IA",
    "features.aiBody":
      "Una IA personalizada entrenada con los detalles de tu boda. Ya sea que los invitados necesiten indicaciones, consejos de vestimenta o enlaces al registro de regalos, tu conserje responde al instante con la calidez de un asistente humano.",
    "features.aiLink": "Descubre la magia \u2192",
    "features.designTitle": "Diseño a Medida",
    "features.designBody":
      "Tipografía y maquetación seleccionadas que reflejan papelería de alta gama. Sin plantillas, solo artesanía digital.",
    "features.curatedTitle": "Detalles Curados",
    "features.curatedBody":
      "Cada aspecto está cuidadosamente adaptado para reflejar tu estilo único y la temática de tu boda.",
    "features.rsvpTitle": "RSVPs Sin Esfuerzo",
    "features.rsvpBody":
      "Gestiona de forma inteligente la lista de invitados y requisitos diet\u00E9ticos con confirmaci\u00F3n digital en un toque.",

    // Process section
    "process.heading": "El Proceso",
    "process.sub": "Tu reliquia digital, creada paso a paso.",
    "process.step1.title": "Visión y brief",
    "process.step1.body": "Estilo, requisitos y detalles del evento",
    "process.step2.title": "Diseño y contenido",
    "process.step2.body": "Paleta, tipografía, fotos y textos",
    "process.step3.title": "Primer borrador",
    "process.step3.body": "Página principal y secciones clave para revisión",
    "process.step4.title": "Revisiones y RSVP",
    "process.step4.body": "Comentarios, pulido y configuración de invitados",
    "process.step5.title": "Lanzamiento",
    "process.step5.body": "Publicación, compartir y actualizaciones",

    // Chat mockup
    "chat.greeting":
      "\u00A1Hola! Soy tu anfitri\u00F3n para la boda de Sara y James. \u00BFEn qu\u00E9 puedo ayudarte?",
    "chat.question":
      "\u00BFCu\u00E1l es el c\u00F3digo de vestimenta para la cena de bienvenida del viernes?",
    "chat.answer":
      "La cena de bienvenida es Coastal Chic. Piensa en linos ligeros y tonos suaves de verano.",
    "chat.placeholder": "Preg\u00FAntame lo que quieras\u2026",

    // Closing CTA
    "cta.eyebrow": "El compa\u00F1ero digital que tu historia de amor merece.",
    "cta.headline1": "\u00BFListos para recibir",
    "cta.headline2": "a vuestros invitados?",
    "cta.button": "Comienza Tu Historia",
    "cta.subtext": "Tarda menos de 5 minutos en crear tu borrador.",

    // Footer
    "footer.copyright":
      "\u00A9 2025, The Ethereal Concierge. Creado para la Herencia Moderna.",
    "footer.privacy": "Privacidad",
    "footer.terms": "T\u00E9rminos",
    "footer.concierge": "Acceso Conserje",
    "footer.press": "Prensa",

    // Order form
    "order.step1": "\u00BFC\u00F3mo os llam\u00E1is?",
    "order.partner1": "Pareja 1",
    "order.partner2": "Pareja 2",
    "order.step2": "\u00BFCu\u00E1ndo es vuestra boda?",
    "order.dateLabel": "Fecha de la boda",
    "order.step3": "\u00BFD\u00F3nde es la ceremonia?",
    "order.ceremonyLabel": "Lugar de la ceremonia",
    "order.step4": "\u00BFY la recepci\u00F3n?",
    "order.receptionLabel": "Lugar de la recepci\u00F3n",
    "order.step5": "\u00BFCu\u00E1ntos invitados?",
    "order.step6": "\u00BFQu\u00E9 os gustar\u00EDa?",
    "order.featureHint":
      "Las experiencias seleccionadas formar\u00E1n parte de vuestra herencia digital a medida.",
    "order.step7": "\u00BFInvitaciones f\u00EDsicas?",
    "order.yesPlease": "S\u00ED, por favor",
    "order.digitalOnly": "Solo digital",
    "order.step8": "Describid vuestra est\u00E9tica.",
    "order.aestheticLabel": "Nota est\u00E9tica",
    "order.step9": "Vuestro email.",
    "order.emailLabel": "Direcci\u00F3n de email",
    "order.emailHint": "Nos pondremos en contacto en 24 horas.",
    "order.step10": "Revisar y enviar",
    "order.names": "Nombres",
    "order.weddingDate": "Fecha de la boda",
    "order.ceremonyVenue": "Lugar de la ceremonia",
    "order.receptionVenue": "Lugar de la recepci\u00F3n",
    "order.guestCount": "N\u00FAmero de invitados",
    "order.selectedFeatures": "Caracter\u00EDsticas seleccionadas",
    "order.physicalInvitations": "Invitaciones f\u00EDsicas",
    "order.aesthetic": "Est\u00E9tica",
    "order.email": "Email",
    "order.notProvided": "No proporcionado",
    "order.noneSelected": "Ninguna seleccionada",
    "order.yes": "S\u00ED",
    "order.back": "Atr\u00E1s",
    "order.continue": "Continuar",
    "order.send": "Enviar Mi Solicitud",
    "order.received": "Recibido",
    "order.confirmTitle": "Estaremos en contacto pronto.",
    "order.confirmBody":
      "Tu solicitud est\u00E1 con nuestro equipo. Espera noticias nuestras en 24 horas.",
    "order.close": "Cerrar",
  },
};
