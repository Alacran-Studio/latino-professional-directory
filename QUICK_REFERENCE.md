# LPDD Architecture - Quick Reference Guide

## Project Stack
- **Framework**: Next.js 15.0.1 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4.13 + CSS Variables
- **Database**: PostgreSQL + Drizzle ORM 0.33.0
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Testing**: Jest + React Testing Library
- **Code Quality**: Prettier + ESLint

---

## Directory Structure Quick Map

```
src/
├── app/                         # Pages & Routing (App Router)
│   ├── api/                     # API endpoints (GET/POST routes)
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles & CSS variables
│   ├── types.ts                 # All TypeScript types
│   └── [page]/                  # Dynamic routes
│
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components (Button, Sheet, etc.)
│   ├── common/                  # App-specific reusable (Header1, FullBrand, etc.)
│   ├── [Feature]/               # Feature components (NavBar, Directory, About, etc.)
│   └── [Feature]/[Sub]/         # Sub-components with index.tsx
│
├── hooks/                       # Custom React hooks
│   └── use-mobile.tsx           # Mobile detection hook
│
└── lib/                         # Utilities & helpers
    ├── utils.ts                 # Shared utils (cn, fonts, validation)
    ├── drizzleClient.ts         # DB connection
    └── dbOperations.ts          # Database queries

drizzle/                        # Database layer
├── schema.ts                    # Table definitions
├── seed/                        # Seeding scripts
├── migrations/                  # Auto-generated migrations
└── envConfig.ts                 # Environment setup
```

---

## Key File Patterns

### Creating a New Page
```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return <main>Content</main>
}
```

### Creating a Component
```typescript
// src/components/ComponentName/index.tsx
interface ComponentNameProps {
  title: string;
}

export default function ComponentName({ title }: ComponentNameProps) {
  return <div>{title}</div>
}
```

### Creating a Client Component
```typescript
"use client"  // Add this at top for interactivity

import { useState, useEffect } from "react"

export default function InteractiveComponent() {
  const [state, setState] = useState(false)
  return <button onClick={() => setState(!state)}>Toggle</button>
}
```

### API Route Pattern
```typescript
// src/app/api/resource/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const param = searchParams.get("key")
  
  try {
    const data = await fetchData(param)
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
```

### Styling Components
```typescript
// Inline Tailwind (preferred)
<div className="flex items-center justify-between px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">

// Using cn() utility
import { cn } from "@/lib/utils"
className={cn("base-classes", condition && "conditional-classes")}

// Using CVA (shadcn style)
import { cva } from "class-variance-authority"
const buttonVariants = cva("base", { variants: {...} })
```

---

## Component Organization Hierarchy

```
UI Components (src/components/ui/)
├── Base primitives from Radix UI
├── Styled with Tailwind + CVA
└── Used everywhere in the app

    ↓

Common Components (src/components/common/)
├── App-specific reusables
├── Header1, Button, Input, etc.
└── Standardize design system

    ↓

Feature Components (src/components/)
├── NavBar, Directory, About
├── Use common + ui components
└── Handle business logic
```

---

## Import Aliases

```typescript
// All available aliases (configured in tsconfig.json & components.json)
import Component from "@/components/..."
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import type { DirectoryOrgType } from "@/app/types"

// Preferred over relative imports
// ✓ @/components/Directory
// ✗ ../../../components/Directory
```

---

## Database Operations Flow

```
API Route (app/api/*/route.ts)
    ↓
    → NextResponse.json()
    
    ↑
    ↓ calls

dbOperations.ts (lib/dbOperations.ts)
    ↓
    → fetchOrganizations()
    → fetchIndustries()
    → mapData()
    
    ↑
    ↓ uses

drizzleClient.ts (lib/drizzleClient.ts)
    ↓
    → db.query.table.findMany()
    → db.query.table.findOne()
    
    ↑
    ↓ connects to

PostgreSQL Database
    ↓
    Schema (drizzle/schema.ts)
    ├── organizations table
    ├── industries table
    └── cities table
```

---

## Styling System

### CSS Variables (defined in globals.css)
```css
:root {
  /* Colors */
  --primary: hsl(222 60% 44%);
  --secondary: hsl(209deg 54% 72%);
  --accent: hsl(43deg 79% 72%);
  --background: hsl(0 0% 100%);
  --foreground: hsl(0 0% 0%);
  
  /* Dark mode overrides */
  @media (prefers-color-scheme: dark) {
    --background: hsl(0 0% 7%);
    --foreground: hsl(0 0% 100%);
  }
}
```

### Responsive Breakpoints
```
sm: 640px   (md:flex = flex on screens 640px+)
md: 768px   (custom mobile breakpoint)
lg: 1024px
xl: 1280px
```

### Dark Mode
- Automatic via `@media (prefers-color-scheme: dark)`
- Set in tailwind.config.ts: `darkMode: "media"`
- No need to manually add `dark:` classes (system handles it)

---

## Common Patterns

### Filter/Search Component
```typescript
"use client"

const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([])
const filtered = items.filter(item => 
  selectedFilters.length === 0 || 
  selectedFilters.some(f => f.id === item.id)
)
```

### Data Fetching with Loading State
```typescript
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/endpoint")
      setData(await res.json())
    } finally {
      setIsLoading(false)
    }
  }
  fetchData()
}, [])

return isLoading ? <LoadingState /> : <DataView data={data} />
```

### Responsive Navigation
```typescript
// Mobile detection
const isMobile = useIsMobile()

return (
  <>
    {isMobile ? <AppSidebar /> : <NavBar />}
    {children}
  </>
)
```

### Centralized Type Definitions
```typescript
// src/app/types.ts
export interface DirectoryOrgType {
  id: number
  name: string
  industries: IndustryType[]
  cities: CityType[]
}

export type InternalNavigationLinks = Array<{
  name: string
  href: string
}>
```

---

## Configuration Quick Reference

| File | Purpose | Key Setting |
|------|---------|-------------|
| `tsconfig.json` | TypeScript config | `strict: true`, `@/*` alias |
| `tailwind.config.ts` | Tailwind config | CSS vars, custom colors, animations |
| `next.config.mjs` | Next.js config | Currently empty (ready for plugins) |
| `jest.config.ts` | Testing config | `jsdom`, path aliases |
| `drizzle.config.ts` | DB migrations | PostgreSQL, migrations path |
| `components.json` | shadcn/ui | Tailwind & import aliases |
| `.prettierrc.json` | Code formatting | Tab width: 2, single quote: false |
| `.eslintrc.json` | Linting | Next.js core web vitals |

---

## NPM Scripts

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Jest in watch mode
npm run migration:generate  # Create new DB migration
npm run migration:apply     # Apply migrations
npm run db:seed            # Seed test data
```

---

## Best Practices Checklist

- [x] Use App Router (not Pages Router)
- [x] TypeScript strict mode enabled
- [x] Components in `src/components/`
- [x] API routes in `src/app/api/`
- [x] Types in `src/app/types.ts`
- [x] Utilities in `src/lib/`
- [x] Hooks in `src/hooks/`
- [x] Tailwind CSS for styling
- [x] Radix UI for accessible primitives
- [x] Server components by default
- [x] "use client" only when needed
- [x] Testing with Jest + Testing Library
- [x] Database layer abstraction
- [x] Environment variables for secrets
- [x] Metadata/SEO in root layout
- [x] Proper error handling in API routes
- [x] Responsive design (mobile-first)
- [x] Code formatting with Prettier
- [x] Linting with ESLint
- [x] Import aliases for clean imports

---

## Common Gotchas & Tips

### File Naming
- Use `index.tsx` for component entry points
- Use `PascalCase` for components
- Use `camelCase` for utilities and hooks
- Use `kebab-case` for file names (except components)

### State Management
- No Redux/Context needed for simple state
- Use `useState` for local component state
- Use custom hooks for shared logic
- Pass props for simple data sharing

### Styling
- Don't use CSS modules (Tailwind handles scoping)
- Use `cn()` utility for conditional classes
- CSS variables are already scoped to `:root`
- Dark mode classes NOT needed (automatic)

### Database
- Always use parameterized queries (Drizzle handles this)
- Fetch related data separately (not with joins initially)
- Map data in `dbOperations.ts`
- Error handling in try-catch blocks

### Testing
- Test behavior, not implementation
- Use semantic queries (`role`, `text`)
- Co-locate tests in `__tests__` folder
- Mock fetch in tests if needed

### Performance
- Use `next/Image` for images (not `<img>`)
- Use dynamic imports for large components
- Implement pagination for large lists
- Use `Promise.all()` for parallel requests

---

## Resources Within Project

- `ARCHITECTURE.md` - Detailed architecture breakdown
- `src/app/types.ts` - All type definitions
- `tailwind.config.ts` - Styling customization
- `package.json` - Dependencies and scripts
- `drizzle/schema.ts` - Database structure

---

## Getting Help

1. Check existing component patterns in `src/components/`
2. Review types in `src/app/types.ts`
3. Look at API examples in `src/app/api/`
4. Check Tailwind docs for styling
5. Review shadcn/ui component examples
6. Check TypeScript errors for type hints

Happy coding! This structure is designed to scale and maintain quality.
