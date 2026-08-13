export const siteConfig = {
  name: "Universo Marketing",
  title: "Universo Marketing | Estratégia, Mídia e Tecnologia",
  description:
    "Agência de estratégia, mídia e tecnologia para marcas que querem ampliar sua presença, conectar canais e crescer com direção.",
  url: "https://seudominio.com.br",
  positionStatement: "Sua marca precisa de um universo maior.",
  whatsapp: {
    number: "+55 (81) 98602-0710",
    message:
      "Olá! Conheci a Universo Marketing pela landing page e gostaria de conversar sobre o crescimento da minha marca.",
  },
  scheduling: {
    url: "https://calendar.app.google/T5TXss758TKzPRRV9",
  },
  intro: {
    enabled: true,
    sessionStorageKey: "universo-intro-completed",
  },
  social: {
    companyInstagram: "https://instagram.com/universomrktg",
  },
  email: "",
  assets: {
    brandLogo: "/images/brand/logo-universo-dourada.png",
    brandIcon: "/images/brand/icone-universo-dourado.png",
    brandIconWhite: "/images/brand/icone-universo-branco.png",
    brandLogoSecondary: "/images/brand/logo-universo-grafite.png",
    tassoBadge: "/images/tasso/logo-gestor-trafego.png",
    portrait: "/images/tasso/portrait-placeholder.svg",
    tassoSuit: "/images/tasso/tasso-terno.webp",
    tassoNinja: "/images/tasso/tasso-ninja.webp",
    tassoMobile: "/images/tasso/tasso-mobile.webp",
    tassoPortrait: "/images/tasso/tasso-retrato.webp",
    tassoNotebook: "/images/tasso/tasso-notebook.webp",
    tassoBanner: "/images/tasso/banner.png",
    heroBanner: "/images/tasso/bannersolido.webp",
    heroBannerMobile: "/images/tasso/mobile.webp",
    ogImage: "/images/brand/social-cover-placeholder.svg",
  },
  seo: {
    keywords: [
      "universo marketing",
      "tráfego pago",
      "marketing digital",
      "automação",
      "crm",
      "seo",
      "atendimento com ia",
    ],
    ogImage: "/images/brand/social-cover-placeholder.svg",
  },
} as const;

export function getWhatsAppUrl(
  customMessage: string = siteConfig.whatsapp.message,
) {
  const number = siteConfig.whatsapp.number.replace(/\D/g, "");
  const message = encodeURIComponent(customMessage);

  if (!number) {
    return `https://api.whatsapp.com/send?text=${message}`;
  }

  return `https://wa.me/${number}?text=${message}`;
}
