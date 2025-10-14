export const directoryOrgs = [
  {
    name: "Techqueria",
    logo_url: "/org-logos/techqueria/techqueria-logo.png",
    description:
      "Their mission is to empower Latiné professionals and support their advancement in the tech industry. By providing resources and support, Techqueria makes a positive impact on the careers and leadership potential of Latiné professionals in the technology sector. Their foundation revolves around educational initiatives, networking opportunities, and other forms of assistance to help the community succeed in the industry.",
    short_description:
      "Techqueria is a 501(c)(3) nonprofit that serves the largest global community of Latiné professionals in the tech industry.",
    website_url: "https://techqueria.org/",
    photo_url: "/photos/techqueria/photo.jpg",
    video_url: "https://youtu.be/KV2LSEK-ABk?si=_RjGAt_RUsw4iZdx",
  },
  {
    name: "ALPFA",
    logo_url: "/org-logos/alpfa/alpfa-logo.png",
    description:
      "ALPFA's mission is to empower and develop Latiné leaders for the nation, providing leadership development and career opportunities for Latiné professionals in finance, accounting, and other business-related fields. Their commitment to professional excellence, service, and leadership development is evident through their extensive events and programs.",
    short_description:
      "ALPFA provides leadership development and career opportunities for Latiné professionals.",
    website_url: "https://alpfa.org/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "1871",
    logo_url: "/org-logos/1871/1871-logo.png",
    description:
      "1871 is a tech hub dedicated to providing resources, mentorship, and support for entrepreneurs and startups. Their goal is to help businesses grow and thrive by connecting founders to a network of industry experts, venture capital, and development opportunities.",
    short_description:
      "1871 is a tech hub providing resources to help entrepreneurs build successful businesses.",
    website_url: "https://1871.com/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "SHPE",
    logo_url: "",
    description:
      "The Society of Hispanic Professional Engineers (SHPE) empowers the Hispanic community to achieve its fullest potential in STEM fields. Through mentorship, educational support, and networking, SHPE focuses on cultivating leadership and advancing Hispanic inclusion in engineering and technology.",
    short_description:
      "The Society of Hispanic Professional Engineers empowers the Hispanic community to realize its fullest potential in STEM careers.",
    website_url: "https://www.shpe.org/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "Latinas in Nursing",
    logo_url: "",
    description:
      "Latinas in Nursing strives to increase representation and provide support, mentorship, and professional development for Latina nurses. Their work ensures greater inclusivity and advancement in healthcare through advocacy, training, and community-building initiatives.",
    short_description:
      "Latinas in Nursing aims to increase representation and provide support, mentorship, and professional growth opportunities for Latina nurses.",
    website_url: "https://www.latinasinnursing.org/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "Latinas in Tech",
    logo_url: "",
    description:
      "Latinas in Tech is a nonprofit organization connecting and empowering Latina women working in the technology sector. By fostering connections and providing professional development opportunities, they aim to elevate Latina leaders and innovators in tech.",
    short_description:
      "Latinas in Tech connects, supports, and empowers Latina women working in technology.",
    website_url: "https://www.latinasintech.org/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "Angeles Investors",
    logo_url: "",
    description:
      "Angeles Investors is dedicated to finding, funding, and growing the most promising Hispanic and Latinx ventures. Through capital investment and mentorship, they empower Latiné entrepreneurs to achieve greater success and impact.",
    short_description:
      "Angeles Investors supports and funds promising Hispanic and Latinx ventures.",
    website_url: "https://angelesinvestors.com/",
    photo_url: "",
    video_url: "",
  },
  {
    name: "Hispanic Alliance for Career Enhancement (HACE)",
    logo_url: "",
    description:
      "HACE works to provide Latiné professionals with meaningful career advancement through mentorship, leadership programs, and corporate partnerships. They strive to create a pipeline of Latiné leaders and ensure diverse representation across industries.",
    short_description:
      "HACE is dedicated to career advancement for Latiné professionals through mentorship and leadership development.",
    website_url: "https://haceonline.org/",
    photo_url: "",
    video_url: "",
  },
];

export const directoryIndustries = [
  { name: "Tech" },
  { name: "Healthcare" },
  { name: "Finance" },
  { name: "Professional Services" },
  { name: "Venture Capital" },
  { name: "Education" },
  { name: "Engineering" },
  { name: "Real Estate" },
  { name: "Law" },
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
  {
    directoryName: "Angeles Investors",
    directoryIndustries: ["Venture Capital", "Tech"],
  },
  {
    directoryName: "Hispanic Alliance for Career Enhancement (HACE)",
    directoryIndustries: ["Professional Services", "Education"],
  },
];

export const directoryCategories = [
  "Networking",
  "Mentorship",
  "Community Impact",
  "Entrepreneurship / Innovation",
];

export const orgCategoryMappings = [
  {
    directoryName: "Techqueria",
    categories: ["Networking", "Mentorship", "Community Impact"],
  },
  {
    directoryName: "ALPFA",
    categories: ["Networking", "Mentorship", "Community Impact"],
  },
  {
    directoryName: "1871",
    categories: ["Entrepreneurship / Innovation", "Networking", "Mentorship"],
  },
  {
    directoryName: "SHPE",
    categories: ["Mentorship", "Networking", "Community Impact"],
  },
  {
    directoryName: "Latinas in Nursing",
    categories: ["Mentorship", "Community Impact", "Networking"],
  },
  {
    directoryName: "Latinas in Tech",
    categories: ["Networking", "Mentorship", "Entrepreneurship / Innovation"],
  },
  {
    directoryName: "Angeles Investors",
    categories: [
      "Entrepreneurship / Innovation",
      "Mentorship",
      "Community Impact",
    ],
  },
  {
    directoryName: "Hispanic Alliance for Career Enhancement (HACE)",
    categories: ["Mentorship", "Community Impact", "Networking"],
  },
];

export const directoryAffinities = [
  "Latiné Professionals",
  "Women in Leadership",
  "LGBTQ+",
  "First-Generation Professionals",
  "Immigrant & Refugee",
  "Afro-Latiné",
  "Indigenous Latiné",
  "Young Professionals",
  "Experienced Professionals",
  "Bilingual/Bicultural",
  "Veterans & Military",
  "Parents & Caregivers",
  "Disability Inclusion",
];

export const orgAffinityMappings = [
  {
    directoryName: "Techqueria",
    affinities: [
      "Latiné Professionals",
      "LGBTQ+",
      "First-Generation Professionals",
    ],
  },
  {
    directoryName: "ALPFA",
    affinities: [
      "Latiné Professionals",
      "Women in Leadership",
      "Bilingual/Bicultural",
    ],
  },
  {
    directoryName: "1871",
    affinities: [
      "Women in Leadership",
      "Young Professionals",
      "Experienced Professionals",
      "Latiné Professionals",
    ],
  },
  {
    directoryName: "SHPE",
    affinities: ["Latiné Professionals", "Afro-Latiné", "Young Professionals"],
  },
  {
    directoryName: "Latinas in Nursing",
    affinities: ["Latiné Professionals", "Women in Leadership"],
  },
  {
    directoryName: "Latinas in Tech",
    affinities: ["Latiné Professionals", "Women in Leadership"],
  },
  {
    directoryName: "Angeles Investors",
    affinities: ["Latiné Professionals"],
  },
  {
    directoryName: "Hispanic Alliance for Career Enhancement (HACE)",
    affinities: ["Latiné Professionals"],
  },
];

export const directoryCities = [{ name: "Chicago" }];

export const orgCityMappings = [
  { directoryName: "Techqueria", directoryCities: ["Chicago"] },
  { directoryName: "ALPFA", directoryCities: ["Chicago"] },
  { directoryName: "1871", directoryCities: ["Chicago"] },
  { directoryName: "SHPE", directoryCities: ["Chicago"] },
  { directoryName: "Latinas in Nursing", directoryCities: ["Chicago"] },
  { directoryName: "Latinas in Tech", directoryCities: ["Chicago"] },
  { directoryName: "Angeles Investors", directoryCities: ["Chicago"] },
  {
    directoryName: "Hispanic Alliance for Career Enhancement (HACE)",
    directoryCities: ["Chicago"],
  },
];
