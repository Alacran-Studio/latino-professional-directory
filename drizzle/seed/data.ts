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
  {
    name: "Chicago Innovation",
    logo_url: "/org-logos/chicago-innovation/CI_black_logo.png",
    description:
      "Chicago Innovation is in its 25th year of educating, connecting, and celebrating innovators across Chicago's diverse communities through a variety of events and initiatives.",
    short_description: "Educating, connecting, and celebrating innovators.",
    website_url: "https://chicagoinnovation.com/",
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
  {
    directoryName: "Chicago Innovation",
    directoryIndustries: ["Tech"],
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
  {
    directoryName: "Chicago Innovation",
    categories: ["Networking", "Entrepreneurship / Innovation"],
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
  {
    directoryName: "Chicago Innovation",
    directoryCities: ["Chicago"],
  },
];

export const directoryServices = [
  { name: "Mentorship" },
  { name: "Networking" },
  { name: "Leadership Development" },
  { name: "Career Advancement" },
  { name: "Professional Development" },
  { name: "Entrepreneurship" },
  { name: "Funding & Investment" },
  { name: "Community Building" },
];

export const orgServiceMappings = [
  { directoryName: "Techqueria", services: ["Mentorship", "Networking", "Career Advancement", "Professional Development", "Community Building"] },
  { directoryName: "ALPFA", services: ["Networking", "Leadership Development", "Career Advancement", "Professional Development"] },
  { directoryName: "Hispanic Alliance for Career Enhancement (HACE)", services: ["Mentorship", "Leadership Development", "Career Advancement", "Professional Development"] },
  { directoryName: "Angeles Investors", services: ["Mentorship", "Entrepreneurship", "Funding & Investment"] },
  { directoryName: "SHPE", services: ["Mentorship", "Networking", "Leadership Development", "Professional Development", "Community Building"] },
  { directoryName: "Latinas in Tech", services: ["Networking", "Career Advancement", "Professional Development", "Community Building"] },
  { directoryName: "Chicago Innovation", services: ["Networking", "Entrepreneurship", "Community Building"] },
  { directoryName: "1871", services: ["Mentorship", "Networking", "Professional Development", "Entrepreneurship", "Funding & Investment"] },
];

export const directoryEvents = [
  {
    name: "The Innovation Forecast: the Next 25 Years",
    description:
      "Join us for an insightful look into the future of innovation as we explore predictions and trends that will shape the next 25 years of technological advancement and entrepreneurship.",
    short_description:
      "An insightful look into the future of innovation and the next 25 years.",
    event_date: "2026-02-19",
    event_time: "",
    location: "The School of the Art Institute Ballroom",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "Health and Wellness Innovation",
    description:
      "Discover the latest breakthroughs in healthcare technology, wellness solutions, and medical innovations transforming how we approach health and wellbeing.",
    short_description:
      "Exploring breakthroughs in healthcare technology and wellness solutions.",
    event_date: "2026-03-31",
    event_time: "",
    location: "Illinois Tech (downtown campus)",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "AI + IQ",
    description:
      "A deep dive into artificial intelligence and its intersection with human intelligence, exploring how AI is augmenting human capabilities and reshaping industries.",
    short_description:
      "Exploring AI's intersection with human intelligence and industry transformation.",
    event_date: "2026-04-14",
    event_time: "",
    location: "CineCity",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "Innovation Elevates Us All",
    description:
      "Celebrating how innovation creates opportunities and positive impact across all communities, focusing on inclusive growth and accessible technology.",
    short_description:
      "Celebrating inclusive innovation and its positive impact across communities.",
    event_date: "2026-05-27",
    event_time: "",
    location: "Harold Washington Library",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "Celebrating Women in Innovation",
    description:
      "Honoring women leaders and innovators who are driving change and breaking barriers in technology, entrepreneurship, and innovation.",
    short_description:
      "Honoring women leaders driving change in technology and innovation.",
    event_date: "2026-06-16",
    event_time: "",
    location: "Venue TBD",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "Climate Innovation Summit",
    description:
      "Addressing climate challenges through innovative solutions, sustainable technologies, and collaborative approaches to environmental stewardship.",
    short_description:
      "Addressing climate challenges through innovative and sustainable solutions.",
    event_date: "2026-07-22",
    event_time: "",
    location: "Convene at Willis Tower",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "The In-Gala",
    description:
      "An elegant evening celebrating Chicago's innovation ecosystem, bringing together entrepreneurs, investors, and industry leaders for networking and recognition.",
    short_description:
      "An elegant celebration of Chicago's innovation ecosystem and leaders.",
    event_date: "2026-08-06",
    event_time: "",
    location: "Bridgeport Art Center",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "The Nominee Celebration",
    description:
      "Celebrating the nominees for the Chicago Innovation Awards and recognizing their outstanding contributions to innovation and entrepreneurship.",
    short_description:
      "Celebrating Chicago Innovation Awards nominees and their achievements.",
    event_date: "2026-09-16",
    event_time: "",
    location: "Venue TBD",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
  {
    name: "The Complete Innovator",
    description:
      "A comprehensive exploration of what it takes to be a successful innovator, covering mindset, skills, and strategies for creating lasting impact.",
    short_description:
      "Exploring the mindset, skills, and strategies of successful innovators.",
    event_date: "2026-10-21",
    event_time: "",
    location: "Venue TBD",
    city: "Chicago",
    registration_url: "https://chicagoinnovation.com/events",
    photo_url: "",
    video_url: "",
    is_virtual: "false",
  },
];

export const eventOrgMappings = [
  {
    eventName: "The Innovation Forecast: the Next 25 Years",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "Health and Wellness Innovation",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "AI + IQ",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "Innovation Elevates Us All",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "Celebrating Women in Innovation",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "Climate Innovation Summit",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "The In-Gala",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "The Nominee Celebration",
    organizationNames: ["Chicago Innovation"],
  },
  {
    eventName: "The Complete Innovator",
    organizationNames: ["Chicago Innovation"],
  },
];

export const eventIndustryMappings = [
  {
    eventName: "The Innovation Forecast: the Next 25 Years",
    industries: ["Tech"],
  },
  {
    eventName: "Health and Wellness Innovation",
    industries: ["Tech"],
  },
  {
    eventName: "AI + IQ",
    industries: ["Tech"],
  },
  {
    eventName: "Innovation Elevates Us All",
    industries: ["Tech"],
  },
  {
    eventName: "Celebrating Women in Innovation",
    industries: ["Tech"],
  },
  {
    eventName: "Climate Innovation Summit",
    industries: ["Tech"],
  },
  {
    eventName: "The In-Gala",
    industries: ["Tech"],
  },
  {
    eventName: "The Nominee Celebration",
    industries: ["Tech"],
  },
  {
    eventName: "The Complete Innovator",
    industries: ["Tech"],
  },
];
