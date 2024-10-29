export const directoryOrgs = [
  {
    name: "Techqueria",
    logo_url: "/org-logos/techqueria/techqueria-logo.png",
    description:
      "Techqueria is the largest global community of Latinx professionals in tech.",
    website_url: "https://techqueria.org/",
  },
  {
    name: "ALPFA",
    logo_url: "/org-logos/alpfa/alpfa-logo.png",
    description:
      "ALPFA provides leadership development and career opportunities for Latinx professionals.",
    website_url: "https://alpfa.org/",
  },
  {
    name: "1871",
    logo_url: "/org-logos/1871/1871-logo.png",
    description:
      "1871 is a tech hub providing resources to help entrepreneurs build successful businesses.",
    website_url: "https://1871.com/",
  },
  {
    name: "SHPE",
    logo_url: "/org-logos/shpe/shpe-logo.png",
    description:
      "The Society of Hispanic Professional Engineers empowers the Hispanic community to realize its fullest potential in STEM careers.",
    website_url: "https://www.shpe.org/",
  },
  {
    name: "Latinas in Nursing",
    logo_url: "/org-logos/latinas-in-nursing/latinas-in-nursing-logo.png",
    description:
      "Latinas in Nursing aims to increase representation and provide support, mentorship, and professional growth opportunities for Latina nurses.",
    website_url: "https://www.latinasinnursing.org/",
  },
  {
    name: "Latinas in Tech",
    logo_url: "/org-logos/latinas-in-tech/latinas-in-tech-logo.png",
    description:
      "Latinas in Tech is a non-profit organization with the mission to connect, support, and empower Latina women working in technology.",
    website_url: "https://www.latinasintech.org/",
  },
];

export const directoryIndustries = [
  {
    name: "Tech",
  },
  {
    name: "Healthcare",
  },
  {
    name: "Finance",
  },
  {
    name: "Professional Services",
  },
  {
    name: "Venture Capital",
  },
  {
    name: "Education",
  },
  {
    name: "Engineering",
  },
  {
    name: "Real Estate",
  },
  {
    name: "Law",
  },
];

export const orgIndustryMappings = [
  { directoryName: "Techqueria", directoryIndustries: ["Tech"] },
  {
    directoryName: "ALPFA",
    directoryIndustries: ["Finance", "Professional Services"],
  },
  { directoryName: "1871", directoryIndustries: ["Tech", "Venture Capital"] },
  { directoryName: "SHPE", directoryIndustries: ["Engineering", "Tech"] },
  { directoryName: "Latinas in Nursing", directoryIndustries: ["Healthcare"] },
  { directoryName: "Latinas in Tech", directoryIndustries: ["Tech"] },
];
