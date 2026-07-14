import { siteConfig } from "@/config/site";

export function JsonLd() {
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.assets.brandLogo}`,
      sameAs: [
        siteConfig.social.tassoInstagram,
        siteConfig.social.companyInstagram,
      ],
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      areaServed: "Brasil",
      sameAs: [siteConfig.social.companyInstagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "T. Thales",
      jobTitle: "CEO da Universo Marketing",
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      sameAs: [siteConfig.social.tassoInstagram],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
