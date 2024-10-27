import { DirectoryOrgType, Industry } from "../types";

const mockDirectoryData: DirectoryOrgType[] = [
  {
    id: 1,
    name: "Techqueria",
    logo_url: "/org-logos/techqueria/techqueria-logo.png",
    description:
      "Techqueria is the largest global community of Latinx professionals in tech.",
    industry_tags: [Industry.Tech],
    locations: ["Chicago", "New York", "Los Angeles", "+4 more"],
    affinities: ["Latino"],
  },
  {
    id: 2,
    name: "ALPFA",
    logo_url: "/org-logos/alpfa/alpfa-logo.png",
    description:
      "ALPFA provides leadership development and career opportunities for Latinx professionals.",
    industry_tags: [Industry.ProfessionalServices, Industry.Finance],
    locations: ["Chicago", "New York", "+2 more"],
    affinities: ["Latino", "Professional Services"],
  },
  {
    id: 6,
    name: "1871",
    logo_url: "/org-logos/1871/1871-logo.png",
    description:
      "1871 is a tech hub providing resources to help entrepreneurs build successful businesses.",
    industry_tags: [Industry.Tech, Industry.VentureCapital],
    locations: ["Chicago"],
    latino_serving: false,
    affinities: ["Tech", "Women-serving", "Latino Programming"],
  },
];

export default mockDirectoryData;
