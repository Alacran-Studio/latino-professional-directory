# LPDD Next.js App - Comprehensive Architecture Overview

## 1. PROJECT OVERVIEW
**Project**: Latino Professional Directory (LPDD)
**Version**: 0.1.0
**Next.js Version**: 15.0.1
**React Version**: 18.3.1
**Purpose**: Directory for organizations and events supporting professional development of Latino professionals

---

## 2. OVERALL ARCHITECTURE & FOLDER STRUCTURE

### High-Level Directory Structure
```
lpdd/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── api/               # API Routes
│   │   ├── organizations/      # Dynamic routes for individual organizations
│   │   ├── about/             # Static page
│   │   ├── join/              # Join page
│   │   ├── login/             # Login page
│   │   ├── __tests__/         # Tests alongside source
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── not-found.tsx      # 404 page
│   │   └── types.ts           # Shared TypeScript types
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (Button, Sheet, etc.)
│   │   ├── common/           # Reusable app-specific components (Header1, Button, Input, etc.)
│   │   ├── AppSidebar/       # Mobile sidebar navigation
│   │   ├── AppSidebarProvider/
│   │   ├── NavBar/           # Top navigation bar
│   │   ├── Home/             # Home page components
│   │   ├── Directory/        # Directory search & filter components
│   │   ├── About/            # About page components
│   ├── hooks/                # Custom React hooks (use-mobile.tsx)
│   ├── lib/                  # Utilities & helpers
│   │   ├── utils.ts         # Common utilities (cn, font loading)
│   │   ├── drizzleClient.ts # Database client
│   │   └── dbOperations.ts  # Database query functions
├── drizzle/                  # Database configuration
│   ├── schema.ts            # Database schema definition
│   ├── seed/                # Database seeding
│   └── migrations/          # Database migrations
├── public/                   # Static assets
├── Configuration files
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── jest.config.ts
│   ├── drizzle.config.ts
│   ├── components.json      # shadcn/ui config
│   ├── .eslintrc.json
│   └── .prettierrc.json
└── package.json
```

---

## 3. KEY PATTERNS & BEST PRACTICES

### 3.1 ROUTING ARCHITECTURE
**Router Type**: App Router (modern Next.js 13+)

**Routes Implemented**:
- `/` - Homepage with hero and directory
- `/about` - About page with team and values
- `/join` - Join/sign up page
- `/login` - Login page
- `/organizations/[id]` - Dynamic organization detail page
- `/api/organizations` - API endpoint for fetching organizations
- `/api/industries` - API endpoint for industries
- `/api/cities` - API endpoint for cities

**Key Features**:
- Dynamic routes using bracket notation `[id]`
- Proper metadata export from layout.tsx for SEO
- Not-found page for 404 handling
- Nested layouts for code organization

### 3.2 COMPONENT ORGANIZATION
**Three-Tier Component System**:

1. **UI Components** (`src/components/ui/`):
   - shadcn/ui components integrated directly
   - Includes: Button, Sheet, Sidebar, Tooltip, Input, Skeleton
   - Built with Radix UI primitives
   - Uses class-variance-authority (CVA) for variant management
   - Styled with Tailwind CSS

2. **Common Components** (`src/components/common/`):
   - Application-specific reusable components
   - Examples:
     - `Header1`, `Header2` - Typography components
     - `Button` - Custom app button with styling
     - `Input`, `TextArea` - Form inputs
     - `LinkButton` - Button that acts as a link
     - `FullBrand` - Brand logo/identity component
     - `OrganizationTitle`, `Paragraph`, `Subheading`
   - All components are focused, single-responsibility

3. **Feature/Page Components** (`src/components/`):
   - `NavBar/` - Main navigation with responsive menu
   - `AppSidebar/` - Mobile sidebar navigation
   - `Directory/` - Directory with search, filters, results
   - `Home/` - Hero section and homepage content
   - `About/` - Team section, values, icons

**Component Structure Pattern**:
```
ComponentName/
├── index.tsx       # Main component
├── icons/         # Local icons if needed
└── styles.css     # Component-specific styles (if needed)
```

### 3.3 STYLING APPROACH
**Framework**: Tailwind CSS 3.4.13
**CSS Utility Approach**: Utility-first

**Configuration**:
- CSS variables for theming (light/dark modes)
- Custom color palette with semantic naming
- Extended animations (strongerPulse)
- Responsive design with `sm:`, `md:`, `lg:` breakpoints
- Dark mode support via `@media (prefers-color-scheme: dark)`

**Color System** (via CSS variables):
- Brand colors (gold, dark blue)
- Semantic colors (primary, secondary, accent, destructive)
- Component-specific colors (sidebar, card, popover)
- Gradient variables for visual depth

**Tools Used**:
- `clsx` - Conditional class names
- `tailwind-merge` - Merge Tailwind classes intelligently
- `class-variance-authority` - Type-safe variant system for components
- `tailwindcss-animate` - Animation utilities
- `prettier-plugin-tailwindcss` - Automatic class sorting

**Example Custom Utility**:
```typescript
'.text-label': {
  fontSize: '15px',
  fontFamily: 'var(--font-lexend)',
}
```

### 3.4 TYPESCRIPT CONFIGURATION
**Version**: TypeScript 5
**Strict Mode**: Enabled

**Key Settings**:
- Module resolution: `bundler`
- Target: `ES2017`
- JSX: `preserve` (handled by Next.js)
- Path alias: `@/*` maps to `./src/*`
- Strict type checking enabled
- Isolated modules enabled

**Type File Pattern**:
- `src/app/types.ts` - Centralized application types
- Types include:
  - `DirectoryOrgType` - Organization data structure
  - `IndustryType`, `CityType` - Filter options
  - `InternalNavigationLinks` - Navigation configuration
  - Enums for affinity and category

**Type Safety**:
- Component props are strongly typed
- Interface-based prop definitions
- Proper use of `React.ReactNode`, `PropsWithChildren`
- Type narrowing in database queries

### 3.5 API ROUTES & DATA FETCHING

**API Endpoints** (app/api/):
- `GET /api/organizations?page=X&limit=Y` - Fetch paginated organizations
- `GET /api/industries` - Fetch available industries
- `GET /api/cities` - Fetch available cities

**Pattern**:
```typescript
// API Route Structure
import { NextResponse } from "next/server";
import { fetchOrganizations } from "@/lib/dbOperations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  
  try {
    const data = await fetchOrganizations(page, limit);
    return NextResponse.json({ organizations: data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

**Client-Side Data Fetching**:
- Uses native `fetch` API
- `useEffect` for data loading on mount
- Loading states with skeleton/placeholder components
- Error handling with try-catch
- Parallel requests with `Promise.all()`

**Example** (from Directory component):
```typescript
const [orgResponse, industryResponse, cityResponse] = await Promise.all([
  fetch("/api/organizations?page=1&limit=10"),
  fetch("/api/industries"),
  fetch("/api/cities"),
]);
```

### 3.6 DATABASE LAYER

**Technology**: 
- **ORM**: Drizzle ORM 0.33.0
- **Database**: PostgreSQL
- **Connection**: postgres (native client)

**Architecture**:

1. **Client** (`src/lib/drizzleClient.ts`):
```typescript
const db = drizzle(postgres(dbCredentials));
```

2. **Operations** (`src/lib/dbOperations.ts`):
   - Modular query functions
   - Separate queries for organizations, industries, cities
   - Data mapping and transformation
   - Proper error handling

3. **Schema** (`drizzle/schema.ts`):
   - Table definitions
   - Relationships between tables
   - Migration system with timestamp prefixes

4. **Seeding** (`drizzle/seed/`):
   - Seed data for development
   - Script-based population

**Configuration** (`drizzle.config.ts`):
- PostgreSQL dialect specified
- Migrations output directory
- Environment-based credentials

**Database Operations Pattern**:
```typescript
// Fetch main data
const organizations = await fetchOrganizationsData(offset, limit);

// Fetch relationships
const orgIndustryMappings = await fetchOrgIndustryMappings(organizations);
const industries = await fetchIndustries(industryIds);

// Map data together
const organizationsWithData = mapDataToOrganizations(
  organizations,
  orgIndustryMappings,
  industries,
  ...
);
```

### 3.7 CLIENT COMPONENTS & HOOKS

**Client Components**:
- `"use client"` directive used appropriately
- Example: Directory component (stateful, interactive)
- Filters and search functionality

**Custom Hooks**:
- `useIsMobile()` (`src/hooks/use-mobile.tsx`):
  - Detects mobile viewport using media query
  - Responds to window resize events
  - Returns boolean for responsive behavior

**Context & Providers**:
- `AppSidebarProvider` - Wraps app with sidebar state
- Uses Radix UI's `SidebarProvider` internally
- Manages sidebar open/close state

---

## 4. TESTING STRATEGY

**Framework**: Jest 29.7.0
**Testing Library**: React Testing Library 16.0.1
**Environment**: jsdom

**Configuration** (`jest.config.ts`):
- Coverage collection enabled
- Module name mapping for path aliases
- Setup files for testing utilities
- Test pattern: `**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)`

**Test Location**: Co-located with source
- Example: `src/app/__tests__/homepage.test.tsx`

**Example Test** (homepage.test.tsx):
```typescript
import { render, screen } from "@testing-library/react";
import HomePage from "../page";

describe("Homepage", () => {
  it("Renders headings and tagline", () => {
    render(<HomePage />);
    const heading = screen.getAllByRole("heading", { level: 1 })[0];
    expect(heading).toBeInTheDocument();
  });
});
```

---

## 5. CONFIGURATION FILES & PURPOSES

### 5.1 `next.config.mjs`
- Empty default configuration
- Ready for additional Next.js plugins if needed

### 5.2 `tsconfig.json`
- TypeScript 5 configuration
- Strict mode enabled
- Path aliases configured
- ES2017 target

### 5.3 `tailwind.config.ts`
- Tailwind CSS 3.4 configuration
- Custom color variables
- Custom animations
- Dark mode support via media query
- Content paths for purging unused styles

### 5.4 `jest.config.ts`
- Next.js Jest preset
- jsdom environment for DOM testing
- Module name mapping for `@/` alias
- Coverage directory: `coverage/`
- CSS mock handling

### 5.5 `drizzle.config.ts`
- PostgreSQL database configuration
- Schema location: `drizzle/schema.ts`
- Environment-based credentials
- Migration prefix: `timestamp`

### 5.6 `components.json` (shadcn/ui)
- Version: 1.0
- Tailwind configuration reference
- Component aliases for imports
- CSS variables enabled
- Import aliases:
  - `@/components` for components
  - `@/lib/utils` for utilities
  - `@/ui` for shadcn/ui components
  - `@/hooks` for custom hooks

### 5.7 `.eslintrc.json`
- Uses Next.js ESLint config
- Core web vitals focus

### 5.8 `.prettierrc.json`
- Trailing commas: es5 (Node 12 compatible)
- Tab width: 2 spaces
- Single quotes: disabled (use double)
- Semicolons: enabled
- Tailwind CSS class sorting plugin enabled

---

## 6. NOTABLE PATTERNS & CONVENTIONS

### 6.1 Navigation Configuration
Centralized link configuration passed through layout:
```typescript
const internalLinks: InternalNavigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Join", href: "/join" },
];

// Passed to NavBar and AppSidebar
<NavBar links={internalLinks} />
<AppSidebar links={internalLinks} />
```

### 6.2 Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Custom hook `useIsMobile()` for conditional rendering
- Sidebar on mobile, navigation on desktop

### 6.3 Font Loading
Optimized font loading from Google Fonts:
```typescript
const interFont = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexendFont = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

// CSS variables applied to HTML
<html className={getFontVariables()}>
```

### 6.4 Metadata & SEO
Comprehensive metadata in root layout:
```typescript
export const metadata: Metadata = {
  title: "Latino Professional Directory",
  description: "...",
  openGraph: { ... },
  twitter: { ... },
  keywords: [...],
};
```

### 6.5 Structured Data
`StructuredData` component for schema.org markup (SEO enhancement)

### 6.6 Filter/Search Pattern
Stateful component managing multiple filters:
```typescript
const [selectedIndustries, setSelectedIndustries] = useState<IndustryType[]>([]);
const [selectedCities, setSelectedCities] = useState<CityType[]>([]);

// Client-side filtering
const filteredOrganizations = organizations.filter((org) => {
  const matchesIndustry = selectedIndustries.length === 0 || ...
  const matchesCity = selectedCities.length === 0 || ...
  return matchesIndustry && matchesCity;
});
```

### 6.7 Error Boundary Patterns
- Try-catch in async operations
- Error states with fallback UI components
- User-friendly error messages

---

## 7. DEPENDENCY INSIGHTS

### Core Dependencies
- **React & DOM**: 18.3.1 - UI framework
- **Next.js**: 15.0.1 - Framework
- **Drizzle ORM**: 0.33.0 - Database
- **postgres**: 3.4.4 - DB connection

### UI & Styling
- **tailwindcss**: 3.4.13 - Styling
- **class-variance-authority**: 0.7.0 - Component variants
- **clsx**: 2.1.1 - Class conditional
- **tailwind-merge**: 2.5.4 - Merge utility
- **@radix-ui/***: Various - Unstyled accessible components
- **@heroicons/react**: 1.0.6 - Icon library

### Developer Tools
- **TypeScript**: 5 - Type safety
- **Jest**: 29.7.0 - Testing
- **React Testing Library**: 16.0.1 - Component tests
- **Prettier**: 3.3.3 - Code formatting
- **ESLint**: 8 - Linting
- **drizzle-kit**: 0.24.0 - Database toolkit

---

## 8. STANDARDS & CONVENTIONS TO CARRY FORWARD

### Code Organization
1. Keep components focused and single-responsibility
2. Organize by feature/feature-page in components directory
3. UI components separate from application components
4. Common/shared components in dedicated folder

### Styling
1. Utility-first Tailwind approach
2. CSS variables for theme consistency
3. Dark mode support via media query
4. Responsive classes for mobile-first design

### TypeScript
1. Strict mode enabled
2. Type definitions in dedicated types file
3. Interface-based component props
4. Proper generics usage

### Database
1. Modular query functions in `lib/dbOperations.ts`
2. Schema definitions in drizzle
3. Environment variables for credentials
4. Separation of concerns between DB and API

### Testing
1. Jest + React Testing Library
2. Co-locate tests with source (`__tests__` folder)
3. Test user interactions, not implementation
4. Use semantic queries (role, text)

### Performance
1. Client components only where needed
2. Server components by default
3. Parallel data fetching with Promise.all
4. Pagination support in API

### Accessibility
1. Use Radix UI for accessible primitives
2. Semantic HTML elements
3. ARIA attributes where needed
4. Mobile-responsive design

### Code Quality
1. Prettier for formatting
2. ESLint for linting
3. Path aliases for clean imports
4. Clear component naming

---

## 9. DEPLOYMENT & SCRIPTS

### Available Scripts
```json
{
  "dev": "next dev",                    // Development server
  "build": "next build",                // Production build
  "start": "next start",                // Production server
  "lint": "next lint",                  // Run ESLint
  "migration:generate": "drizzle-kit generate",  // Generate DB migrations
  "migration:apply": "drizzle-kit migrate",     // Apply migrations
  "db:seed": "npx tsx ./drizzle/seed/seed.ts", // Seed database
  "test": "jest",                       // Run tests
  "test:watch": "jest --watch"          // Watch mode tests
}
```

---

## 10. KEY TAKEAWAYS

### Strengths of This Architecture
✓ Modern App Router with proper code splitting
✓ Strong type safety with strict TypeScript
✓ Comprehensive component hierarchy (UI → Common → Feature)
✓ Clean separation of concerns (Components, Hooks, Lib)
✓ Consistent styling approach with Tailwind + CSS variables
✓ Database layer abstraction with Drizzle ORM
✓ Proper SEO setup with metadata and structured data
✓ Responsive design patterns with hooks and mobile detection
✓ Testing infrastructure in place (Jest + Testing Library)
✓ Code formatting and linting standards enforced
✓ Configuration management via environment variables
✓ DRY principle applied to navigation and shared components

### Scalability Considerations
- Component system allows easy growth
- Database abstractions prevent tight coupling
- API routes can be extended for new features
- Type definitions provide contracts for data
- Testing framework supports regression prevention
- Clear naming conventions aid future developers

This is a well-structured, modern Next.js application following current best practices!
