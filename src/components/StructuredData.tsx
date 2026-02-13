import { APP_NAME, APP_SHORT_NAME, APP_DESCRIPTION, APP_DESCRIPTION_LONG } from "@/lib/constants";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    alternateName: APP_SHORT_NAME,
    url: typeof window !== "undefined" ? window.location.origin : "",
    description: APP_DESCRIPTION,
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: typeof window !== "undefined" ? window.location.origin : "",
    description: APP_DESCRIPTION_LONG,
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
