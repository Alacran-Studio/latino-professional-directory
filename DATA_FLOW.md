# LPDD - Data Flow & Architecture Diagrams

## 1. APPLICATION ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER / CLIENT                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              NEXT.JS APPLICATION (SPA)                   │  │
│  │                                                          │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │          ROOT LAYOUT (layout.tsx)                 │  │  │
│  │  │    - Providers (AppSidebarProvider)              │  │  │
│  │  │    - NavBar & AppSidebar                         │  │  │
│  │  │    - Metadata & Global Styles                    │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  │                        │                                 │  │
│  │         ┌──────────────┴──────────────┐                 │  │
│  │         │                             │                 │  │
│  │  ┌──────▼──────┐            ┌─────────▼───────┐         │  │
│  │  │ PAGE ROUTES │            │   API ROUTES    │         │  │
│  │  │             │            │                 │         │  │
│  │  │ / (home)    │            │ /api/orgs       │         │  │
│  │  │ /about      │            │ /api/industries │         │  │
│  │  │ /join       │            │ /api/cities     │         │  │
│  │  │ /[org-id]   │            │                 │         │  │
│  │  └──────┬──────┘            └────────┬────────┘         │  │
│  │         │                           │                   │  │
│  │  ┌──────▼─────────────────────────▼──────┐             │  │
│  │  │     REACT COMPONENTS                   │             │  │
│  │  │  ┌────────────────────────────────┐   │             │  │
│  │  │  │ UI Components (shadcn/ui)      │   │             │  │
│  │  │  │ - Button, Sheet, Sidebar, etc. │   │             │  │
│  │  │  └────────────────────────────────┘   │             │  │
│  │  │  ┌────────────────────────────────┐   │             │  │
│  │  │  │ Common Components              │   │             │  │
│  │  │  │ - Header1, Input, FullBrand    │   │             │  │
│  │  │  └────────────────────────────────┘   │             │  │
│  │  │  ┌────────────────────────────────┐   │             │  │
│  │  │  │ Feature Components             │   │             │  │
│  │  │  │ - Directory, Home, About       │   │             │  │
│  │  │  └────────────────────────────────┘   │             │  │
│  │  └──────┬─────────────────────────────┬──┘             │  │
│  │         │                             │                 │  │
│  │  ┌──────▼──────┐            ┌────────▼────┐            │  │
│  │  │ HOOKS       │            │ UTILS       │            │  │
│  │  │             │            │             │            │  │
│  │  │ useIsMobile │            │ cn()        │            │  │
│  │  │ useState()  │            │ fonts()     │            │  │
│  │  │ useEffect() │            │ validation()│            │  │
│  │  └─────────────┘            └─────────────┘            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                   │
│                    ┌────────▼────────┐                          │
│                    │ FETCH REQUESTS  │                          │
│                    └────────┬────────┘                          │
└─────────────────────────────┼──────────────────────────────────┘
                              │
                    HTTP / REST API
                              │
┌─────────────────────────────▼──────────────────────────────────┐
│                        SERVER LAYER                            │
│                      (Node.js Runtime)                         │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │            NEXT.JS API ROUTES                            │ │
│  │                                                          │ │
│  │  /api/organizations/route.ts                            │ │
│  │    - Query parsing (page, limit)                        │ │
│  │    - Call dbOperations.fetchOrganizations()            │ │
│  │    - Return JSON response                              │ │
│  │                                                          │ │
│  │  /api/industries/route.ts                               │ │
│  │  /api/cities/route.ts                                   │ │
│  │                                                          │ │
│  └──────────┬────────────────────────────────────────────┘  │
│             │                                               │
│  ┌──────────▼────────────────────────────────────────────┐  │
│  │        DATABASE OPERATIONS LAYER                       │  │
│  │    (lib/dbOperations.ts)                              │  │
│  │                                                        │  │
│  │  fetchOrganizations(page, limit)                      │  │
│  │    │                                                   │  │
│  │    ├─ fetchOrganizationsData(offset, limit)          │  │
│  │    ├─ fetchOrgIndustryMappings()                      │  │
│  │    ├─ fetchIndustries(industryIds)                    │  │
│  │    ├─ fetchOrgCityMappings()                          │  │
│  │    ├─ fetchCities(cityIds)                            │  │
│  │    └─ mapDataToOrganizations() ─ RETURN              │  │
│  │                                                        │  │
│  │  Error handling (try-catch)                           │  │
│  │                                                        │  │
│  └──────────┬──────────────────────────────────────────┘  │
│             │                                             │
│  ┌──────────▼──────────────────────────────────────────┐  │
│  │        DRIZZLE ORM CLIENT                            │  │
│  │    (lib/drizzleClient.ts)                           │  │
│  │                                                      │  │
│  │  const db = drizzle(postgres(credentials))          │  │
│  │                                                      │  │
│  │  db.query.organizations.findMany({ limit })        │  │
│  │  db.query.organizations.findOne({ where })         │  │
│  │                                                      │  │
│  └──────────┬─────────────────────────────────────────┘  │
│             │                                           │
│             │      Raw SQL Queries                      │
│             │                                           │
└─────────────┼───────────────────────────────────────────┘
              │
    ┌─────────▼────────┐
    │  POSTGRESQL DB   │
    │                  │
    │ organizations    │
    │ industries       │
    │ organization_    │
    │  industries      │
    │ cities           │
    │ organization_    │
    │  cities          │
    │                  │
    └──────────────────┘
```

---

## 2. COMPONENT HIERARCHY & COMPOSITION

```
┌─────────────────────────────────────────────────────────────────┐
│                    src/app/layout.tsx                            │
│            (Root Layout - Server Component)                      │
│                                                                  │
│  - Metadata (title, description, OG, Twitter)                   │
│  - Global styles (globals.css)                                  │
│  - Font variables                                               │
│  - Navigation links config                                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        │                         │
┌───────▼──────┐        ┌────────▼────────┐
│  AppSidebar  │        │    NavBar       │
│ (Mobile)     │        │  (Desktop)      │
│              │        │                 │
│ - Logo       │        │ - Logo          │
│ - Menu items │        │ - Nav links     │
│ - Separator  │        │ - Menu button   │
└─────┬────────┘        └────────┬────────┘
      │                          │
      │    Both receive          │
      │  internalLinks prop      │
      │                          │
      └──────────┬───────────────┘
                 │
    ┌────────────▼────────────┐
    │    {children}           │
    │                         │
    ├─ src/app/page.tsx       │ (HomePage)
    │   └─ HomeHero           │
    │   └─ Directory          │
    │                         │
    ├─ src/app/about/page.tsx │ (About)
    │   └─ IntroSection       │
    │   └─ MeetOurTeam        │
    │   └─ OurValues          │
    │                         │
    ├─ src/app/join/page.tsx  │ (Join)
    │   └─ TallyEmbed         │
    │                         │
    └─ /organizations/[id]/   │ (OrgDetail)
        page.tsx              │
```

---

## 3. CLIENT-SIDE DATA FLOW (Directory Component)

```
┌──────────────────────────────────────────────┐
│  Directory Component (USE CLIENT)            │
│  src/components/Directory/index.tsx          │
└────────────┬─────────────────────────────────┘
             │
             │ useEffect() on mount
             │
    ┌────────▼─────────┐
    │ Parallel Fetch   │
    │ Promise.all()    │
    │                  │
    ├─ /api/orgs      │
    ├─ /api/industries│
    └─ /api/cities    │
             │
      ┌──────▼──────┐
      │ Parse JSON  │
      │ Error Check │
      └──────┬──────┘
             │
    ┌────────▼────────────────────┐
    │ setState (3 states)          │
    │                              │
    │ - organizations             │
    │ - industries                │
    │ - cities                    │
    │ - isLoading=false           │
    └────────┬────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │  Component Render                  │
    │                                    │
    │  if (isLoading) → <LoadingState/>  │
    │                                    │
    │  else →                            │
    │  ┌────────────────────────────┐   │
    │  │ <IndustryFilter />         │   │
    │  │ <LocationFilter />         │   │
    │  │ <Tags />                   │   │
    │  └────────┬───────────────────┘   │
    │           │                        │
    │  ┌────────▼──────────────────────┐│
    │  │ User selects filters          ││
    │  │                               ││
    │  │ setSelectedIndustries()       ││
    │  │ setSelectedCities()           ││
    │  └────────┬──────────────────────┘│
    │           │                       │
    │  ┌────────▼──────────────────────┐│
    │  │ Client-side filter (NO FETCH) ││
    │  │                               ││
    │  │ const filtered =              ││
    │  │   organizations.filter(org    ││
    │  │   => matches industry AND     ││
    │  │      matches city)            ││
    │  └────────┬──────────────────────┘│
    │           │                       │
    │  ┌────────▼──────────────────────┐│
    │  │ Render Results                ││
    │  │                               ││
    │  │ {filtered.map(org =>          ││
    │  │   <DirectoryOrg />            ││
    │  │ )}                            ││
    │  │                               ││
    │  │ or <NoResults />              ││
    │  └───────────────────────────────┘│
    │                                    │
    └────────────────────────────────────┘
```

---

## 4. STYLING & THEMING SYSTEM

```
┌────────────────────────────────────────────────────────┐
│           src/app/globals.css                          │
│                                                        │
│  :root {                                              │
│    --primary: hsl(222 60% 44%);                       │
│    --secondary: hsl(209deg 54% 72%);                  │
│    --accent: hsl(43deg 79% 72%);                      │
│    --background: hsl(0 0% 100%);                      │
│    ... (20+ more color variables)                     │
│  }                                                    │
│                                                        │
│  @media (prefers-color-scheme: dark) {               │
│    :root {                                            │
│      --primary: hsl(222 60% 24%);  /* Darker */      │
│      --background: hsl(0 0% 7%);   /* Darker */      │
│      ... (dark mode overrides)                        │
│    }                                                  │
│  }                                                    │
│                                                        │
│  @tailwind base;                                      │
│  @tailwind components;                                │
│  @tailwind utilities;                                 │
└────────────────────────────────────────────────────────┘
         │
         │  Referenced in tailwind.config.ts
         │
    ┌────▼────────────────────────────────────────┐
    │      tailwind.config.ts                      │
    │                                              │
    │  colors: {                                   │
    │    primary: {                                │
    │      DEFAULT: "var(--primary)",             │
    │      foreground: "var(--primary-foreground)"│
    │    },                                        │
    │    background: "var(--background)",         │
    │    ... (all CSS vars mapped)                │
    │  }                                           │
    │                                              │
    │  darkMode: "media"  (auto system dark mode) │
    └────┬─────────────────────────────────────────┘
         │
         ├─► Component Styling Path 1:
         │   ┌────────────────────────────────────────┐
         │   │ Inline Tailwind Classes                │
         │   │                                        │
         │   │ <button className=                     │
         │   │   "bg-primary text-primary-foreground" │
         │   │ >                                      │
         │   │ (automatic dark mode via @media)      │
         │   └────────────────────────────────────────┘
         │
         ├─► Component Styling Path 2:
         │   ┌────────────────────────────────────────┐
         │   │ Using cn() Utility                     │
         │   │                                        │
         │   │ import { cn } from "@/lib/utils"      │
         │   │                                        │
         │   │ className={cn(                        │
         │   │   "base-classes",                     │
         │   │   condition && "conditional"          │
         │   │ )}                                    │
         │   │ (merges with clsx + tailwind-merge)   │
         │   └────────────────────────────────────────┘
         │
         └─► Component Styling Path 3:
             ┌────────────────────────────────────────┐
             │ CVA (Class Variance Authority)         │
             │                                        │
             │ const buttonVariants = cva(           │
             │   "base-classes",                     │
             │   {                                   │
             │     variants: {                       │
             │       variant: {                      │
             │         default: "bg-primary ...",   │
             │         outline: "border ...",        │
             │       },                              │
             │       size: {                         │
             │         sm: "h-9 px-3",              │
             │         lg: "h-11 px-8",             │
             │       },                              │
             │     },                                │
             │   }                                   │
             │ )                                     │
             │ (type-safe variants)                  │
             └────────────────────────────────────────┘
```

---

## 5. DATABASE SCHEMA & RELATIONSHIPS

```
┌──────────────────────────────┐
│    organizations table       │
│                              │
│ id (PK)                      │
│ name (TEXT)                  │
│ logo_url (TEXT)              │
│ short_description (TEXT)     │
│ description (TEXT)           │
│ website_url (TEXT)           │
│ photo_url (TEXT)             │
│ video_url (TEXT)             │
│ created_at (TIMESTAMP)       │
└───────┬──────────────────────┘
        │
        │ (one-to-many)
        │
    ┌───┴─────────────────────────────────────┐
    │                                         │
    │                                         │
┌───▼─────────────────────┐    ┌─────────────▼──────┐
│organization_industries  │    │organization_cities  │
│                         │    │                     │
│organization_id (FK)     │    │organization_id (FK) │
│industry_id (FK)         │    │city_id (FK)         │
│created_at              │    │created_at          │
│                         │    │                     │
└───┬──────────┬──────────┘    └─────────────┬──────┘
    │          │                            │
    │          │                            │
    │      ┌───▼──────────────────┐         │
    │      │  industries table    │         │
    │      │                      │         │
    │      │ id (PK)             │         │
    │      │ name (TEXT)         │         │
    │      │ created_at          │         │
    │      └──────────────────────┘         │
    │                                      │
    └──────────────────────────────────────┘
                                            │
                                    ┌───────▼──────┐
                                    │ cities table │
                                    │              │
                                    │ id (PK)      │
                                    │ name (TEXT)  │
                                    │ created_at   │
                                    └──────────────┘
```

---

## 6. STATE MANAGEMENT FLOW

```
┌─────────────────────────────────────────────────────────┐
│  GLOBAL STATE (None - Props Drilling is sufficient)    │
│                                                         │
│  Navigation Links defined in layout.tsx                │
│  └─ Passed as props to NavBar & AppSidebar            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  LOCAL COMPONENT STATE (useState)                       │
│                                                         │
│  Directory Component:                                   │
│  ├─ organizations: DirectoryOrgType[]                  │
│  ├─ industries: IndustryType[]                         │
│  ├─ cities: CityType[]                                 │
│  ├─ selectedIndustries: IndustryType[]                 │
│  ├─ selectedCities: CityType[]                         │
│  └─ isLoading: boolean                                 │
│                                                         │
│  NavBar Component:                                      │
│  └─ pathname: string (via usePathname())               │
│                                                         │
│  AppSidebarProvider:                                    │
│  └─ open: boolean                                      │
│     └─ Wrapped by SidebarProvider (Radix UI)          │
│                                                         │
│  useIsMobile Hook:                                      │
│  └─ isMobile: boolean (via MediaQuery + useEffect)    │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SIDE EFFECTS (useEffect)                               │
│                                                         │
│  Directory Component:                                   │
│  └─ On mount: Fetch all data in parallel              │
│     - /api/organizations                              │
│     - /api/industries                                 │
│     - /api/cities                                     │
│                                                         │
│  useIsMobile Hook:                                      │
│  └─ On mount: Set up media query listener             │
│     - Watch for window resize events                  │
│     - Update state when breakpoint crossed            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  COMPUTED/DERIVED STATE (useMemo optional)             │
│                                                         │
│  Directory Component:                                   │
│  └─ filteredOrganizations = organizations.filter(     │
│       org => matchesIndustry && matchesCity            │
│     )                                                   │
│                                                         │
│  (No explicit useMemo - recalculates on render)       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 7. REQUEST FLOW FOR FETCHING ORGANIZATIONS

```
USER ACTION:
  └─ Page loads / Component mounts

BROWSER:
  └─ useEffect triggers on mount
      │
      ├─ fetch("/api/organizations?page=1&limit=10")
      ├─ fetch("/api/industries")
      ├─ fetch("/api/cities")
      │
      └─ Promise.all() waits for all three

HTTP Request to Server:
  GET /api/organizations?page=1&limit=10
      │
SERVER (Next.js):
  └─ /src/app/api/organizations/route.ts
      │
      ├─ Parse searchParams (page, limit)
      ├─ Call fetchOrganizations(page, limit)
      │
      └─ import from @/lib/dbOperations
           │
DATABASE OPERATIONS:
  └─ /src/lib/dbOperations.ts
      │
      ├─ offset = (1-1) * 10 = 0
      │
      ├─ fetchOrganizationsData(0, 10)
      │   └─ db.query.organizations
      │       .findMany({ limit: 10, offset: 0 })
      │
      ├─ fetchOrgIndustryMappings(orgs)
      │   └─ db.query.organization_industries
      │       .findMany({ where: org_id in [...] })
      │
      ├─ fetchIndustries(industryIds)
      │   └─ db.query.industries
      │       .findMany({ where: id in [...] })
      │
      ├─ fetchOrgCityMappings(orgs)
      │   └─ db.query.organization_cities
      │       .findMany({ where: org_id in [...] })
      │
      ├─ fetchCities(cityIds)
      │   └─ db.query.cities
      │       .findMany({ where: id in [...] })
      │
      ├─ mapDataToOrganizations(...)
      │   └─ Combine orgs with industries and cities
      │
      └─ RETURN: DirectoryOrgType[]

DATABASE:
  └─ PostgreSQL executes queries
      └─ Returns raw data rows

Back to API Route:
  └─ NextResponse.json({ organizations })
      │
HTTP Response:
  └─ 200 OK
      {
        "organizations": [
          {
            "id": 1,
            "name": "Org Name",
            "logo_url": "...",
            "industries": [...],
            "cities": [...]
          },
          ...
        ]
      }

BROWSER:
  └─ Receive response
      │
      ├─ res.json()
      ├─ setState(organizations)
      ├─ setState(isLoading=false)
      │
      └─ Component re-renders

RENDER:
  └─ Directory component displays:
      ├─ Filter dropdowns (industries, cities)
      └─ Organization cards from state

USER INTERACTION:
  └─ Click "Technology" filter
      │
      ├─ setSelectedIndustries([...])
      │
      ├─ const filtered = organizations.filter(...)
      │   (This is CLIENT-SIDE, no API call!)
      │
      └─ Component re-renders with filtered results
```

---

## 8. File Organization by Function

```
┌─────────────────────────────────────────────────────┐
│ ROUTING & PAGES                                     │
├─────────────────────────────────────────────────────┤
│ src/app/                    # Route segments        │
│ ├─ layout.tsx              # Root wrapper           │
│ ├─ page.tsx                # GET /                  │
│ ├─ not-found.tsx           # GET /non-existent      │
│ ├─ globals.css             # Global styles          │
│ ├─ types.ts                # App types              │
│ ├─ organizations/[id]/     # Dynamic route          │
│ │  ├─ page.tsx             # GET /organizations/:id │
│ │  └─ layout.tsx           # (optional)             │
│ ├─ about/page.tsx          # GET /about             │
│ ├─ join/page.tsx           # GET /join              │
│ ├─ login/page.tsx          # GET /login             │
│ └─ api/                    # API routes             │
│    ├─ organizations/route.ts
│    ├─ industries/route.ts
│    └─ cities/route.ts
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ COMPONENTS (UI + FEATURE)                           │
├─────────────────────────────────────────────────────┤
│ src/components/                                     │
│ ├─ ui/                     # shadcn/ui comps       │
│ │  ├─ button.tsx          # Variant-based button   │
│ │  ├─ sheet.tsx           # Mobile drawer          │
│ │  ├─ sidebar.tsx         # Sidebar container      │
│ │  └─ ...more             # Radix-based            │
│ ├─ common/                 # App reusables         │
│ │  ├─ Header1/            # H1 typography          │
│ │  ├─ Button/             # App-specific button    │
│ │  ├─ Input/              # Form input             │
│ │  ├─ FullBrand/          # Logo component         │
│ │  └─ ...more             # Text, links, etc.      │
│ ├─ NavBar/                 # Top nav               │
│ │  ├─ index.tsx           # Main nav component     │
│ │  ├─ NavLinks/           # Links list             │
│ │  └─ MenuButton/         # Mobile menu toggle     │
│ ├─ AppSidebar/             # Mobile sidebar        │
│ │  └─ index.tsx           # Sidebar with links     │
│ ├─ AppSidebarProvider/     # Sidebar state mgmt    │
│ │  └─ index.tsx           # Wraps app             │
│ ├─ Directory/              # Search & filter      │
│ │  ├─ index.tsx           # Main logic            │
│ │  ├─ SearchBar/          # Search input          │
│ │  ├─ IndustryFilter/     # Industry dropdown     │
│ │  ├─ LocationFilter/     # City dropdown         │
│ │  ├─ DirectoryOrg/       # Org card component    │
│ │  ├─ Tags/               # Selected filter tags  │
│ │  ├─ LoadingResults/     # Loading placeholder  │
│ │  └─ NoResults/          # No results message    │
│ ├─ Home/                   # Homepage comps        │
│ │  └─ HomeHero/           # Hero banner           │
│ ├─ About/                  # About page comps      │
│ │  ├─ IntroSection/       # Intro content         │
│ │  ├─ MeetOurTeam/        # Team section          │
│ │  ├─ OurValues/          # Values with cards     │
│ │  └─ icons/              # Local SVG icons       │
│ └─ StructuredData.tsx      # JSON-LD for SEO      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ HOOKS & UTILITIES                                   │
├─────────────────────────────────────────────────────┤
│ src/hooks/                                          │
│ └─ use-mobile.tsx          # Viewport detection    │
│                                                     │
│ src/lib/                                            │
│ ├─ utils.ts                # cn(), fonts, etc.     │
│ ├─ drizzleClient.ts        # DB connection        │
│ └─ dbOperations.ts         # DB queries           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ DATABASE                                            │
├─────────────────────────────────────────────────────┤
│ drizzle/                                            │
│ ├─ schema.ts               # Table definitions     │
│ ├─ config.ts               # Drizzle config        │
│ ├─ seed/                   # Seed scripts          │
│ │  ├─ seed.ts             # Seed runner           │
│ │  └─ data.ts             # Sample data           │
│ ├─ migrations/             # Auto migrations       │
│ └─ envConfig.ts            # Env loading           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CONFIG & BUILD                                      │
├─────────────────────────────────────────────────────┤
│ tsconfig.json              # TypeScript             │
│ tailwind.config.ts         # Tailwind config       │
│ next.config.mjs            # Next.js config        │
│ jest.config.ts             # Jest testing          │
│ drizzle.config.ts          # Drizzle config        │
│ components.json            # shadcn/ui config      │
│ .eslintrc.json            # ESLint rules          │
│ .prettierrc.json          # Prettier rules        │
│ package.json               # Dependencies          │
└─────────────────────────────────────────────────────┘
```

---

## 9. Tech Stack Dependency Graph

```
┌────────────────────────────────────────────────────────┐
│                   REACT 18.3.1                         │
│              (UI Component Framework)                  │
└────────────────────┬─────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        │                         │
┌───────▼──────────┐    ┌────────▼──────────┐
│  NEXT.JS 15.0.1  │    │ REACT-DOM 18.3.1  │
│  (Framework)     │    │ (DOM Rendering)   │
└───────┬──────────┘    └───────────────────┘
        │
    ┌───┴────────────────────────┬──────────┐
    │                            │          │
┌───▼────────┐    ┌─────────────▼──┐   ┌──▼──────────┐
│ TYPESCRIPT │    │ TAILWIND CSS    │   │RADIX UI     │
│ (Typing)   │    │ (Styling)       │   │(Primitives) │
└────────────┘    └────────┬────────┘   └─────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
     ┌──────▼──────────┐    ┌─────────────▼──┐
     │ CLSX            │    │CLASS-VARIANCE- │
     │TAILWIND-MERGE   │    │AUTHORITY       │
     │(Class Utils)    │    │(Variant System)│
     └─────────────────┘    └────────────────┘

┌──────────────────────────────────────────────────┐
│ DATABASE LAYER                                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────┐      ┌────────────────┐   │
│  │ DRIZZLE ORM     │      │ POSTGRES.JS    │   │
│  │ (ORM)           │      │ (DB Client)    │   │
│  └────────┬────────┘      └────────┬───────┘   │
│           │                        │            │
│           └────────────┬───────────┘            │
│                        │                        │
│                 ┌──────▼──────┐                 │
│                 │ POSTGRESQL  │                 │
│                 │ (Database)  │                 │
│                 └─────────────┘                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ TESTING                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐        ┌─────────────────────┐   │
│  │JEST      │        │REACT TESTING LIBRARY│   │
│  │(Runner)  │        │(Component Testing)  │   │
│  └─────┬────┘        └────────┬────────────┘   │
│        │                      │                 │
│        └──────────┬───────────┘                 │
│                   │                             │
│        ┌──────────▼────────────┐               │
│        │ JSDOM                 │               │
│        │ (DOM Simulation)      │               │
│        └───────────────────────┘               │
│                                                 │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ DEVELOPER TOOLS                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│ ┌──────────┐  ┌───────┐  ┌──────────────┐      │
│ │TYPESCRIPT│  │ESLINT │  │PRETTIER      │      │
│ │(Type Chk)│  │(Lint) │  │(Format)      │      │
│ └──────────┘  └───────┘  └──────────────┘      │
│                                                  │
│ ┌─────────────────┐      ┌──────────────┐      │
│ │DRIZZLE-KIT      │      │POSTCSS       │      │
│ │(DB Migrations)  │      │(CSS Pipeline)│      │
│ └─────────────────┘      └──────────────┘      │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 10. Performance Optimization Patterns

```
┌─────────────────────────────────────────────────┐
│ CODE SPLITTING                                  │
├─────────────────────────────────────────────────┤
│ • App Router automatically splits by route      │
│ • Each page gets own JS chunk                  │
│ • Dynamic routes are lazy-loaded               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SERVER VS CLIENT COMPONENTS                     │
├─────────────────────────────────────────────────┤
│                                                 │
│ SERVER (default):                               │
│ ✓ layout.tsx                                    │
│ ✓ page.tsx (unless interactive)                │
│ ✓ Direct DB access                             │
│ ✓ Secrets in code                              │
│ ✓ Reduced JS bundle                            │
│                                                 │
│ CLIENT ("use client"):                          │
│ ✓ Directory component (interactive filters)    │
│ ✓ NavBar (usePathname hook)                    │
│ ✓ Components with useState/useEffect           │
│ ✓ Event listeners/interactions                 │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ DATA FETCHING OPTIMIZATIONS                     │
├─────────────────────────────────────────────────┤
│                                                 │
│ • Promise.all() for parallel requests          │
│ • Pagination API (page=X&limit=Y)              │
│ • Client-side filtering (no extra requests)    │
│ • Error boundary patterns                      │
│ • Loading states (skeleton/placeholder)        │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ RENDERING OPTIMIZATIONS                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ • Static generation where possible             │
│ • Streaming with Suspense (ready for)         │
│ • Responsive images with next/Image           │
│ • Font subsetting                              │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ STYLING OPTIMIZATIONS                           │
├─────────────────────────────────────────────────┤
│                                                 │
│ • Tailwind purges unused CSS                   │
│ • CSS variables reduce duplicate values        │
│ • Dark mode via @media (no extra CSS)         │
│ • No CSS-in-JS runtime overhead               │
│                                                 │
└─────────────────────────────────────────────────┘
```

This comprehensive data flow documentation covers every major aspect of the LPDD architecture!
