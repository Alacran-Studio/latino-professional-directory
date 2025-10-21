export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Latino Professional Directory",
    alternateName: "LPD",
    url: typeof window !== "undefined" ? window.location.origin : "",
    description:
      "A directory for organizations and events to support the professional development of Latino professionals.",
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Latino Professional Directory",
    url: typeof window !== "undefined" ? window.location.origin : "",
    description:
      "Discover organizations and events for the professional development of Latinos & allies across industries to build connections and power your career.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          typeof window !== "undefined"
            ? `${window.location.origin}/?search={search_term_string}`
            : "/?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
