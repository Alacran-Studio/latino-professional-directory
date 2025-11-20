# LPDD Documentation Index

This folder contains comprehensive documentation of the Latino Professional Directory (LPDD) Next.js application architecture. Use this index to navigate all documentation.

---

## Quick Start Navigation

**New to the project?** Start here:
1. Read `QUICK_REFERENCE.md` (5-10 min) - Stack overview, folder map, common patterns
2. Skim `ARCHITECTURE.md` (15-20 min) - Deep dive into each system
3. Reference `DATA_FLOW.md` (as needed) - Visual diagrams of data flows

**Need specific info?** Jump to:
- Component structure → `ARCHITECTURE.md` Section 3.2
- Styling approach → `ARCHITECTURE.md` Section 3.3, `QUICK_REFERENCE.md` Styling System
- Database layer → `ARCHITECTURE.md` Section 3.6, `DATA_FLOW.md` Section 5
- File organization → `DATA_FLOW.md` Section 8, `QUICK_REFERENCE.md` Directory Structure

---

## Documentation Files

### 1. QUICK_REFERENCE.md (10 KB)
**Purpose**: One-page cheat sheet for developers
**Length**: Quick reading (5-10 minutes)

**Contains**:
- Project stack overview
- Directory structure quick map
- Key file patterns (creating pages, components, API routes)
- Component organization hierarchy
- Import aliases reference
- Database operations flow
- Styling system guide
- Common patterns (filters, fetching, responsive design)
- Configuration quick reference table
- NPM scripts list
- Best practices checklist
- Common gotchas & tips

**Best for**: Getting started, quick lookups, copy-paste patterns

---

### 2. ARCHITECTURE.md (17 KB)
**Purpose**: Comprehensive architecture deep-dive
**Length**: Medium reading (20-30 minutes)

**Contains**:
- Project overview (stack, version, purpose)
- Overall folder structure with explanations
- Detailed best practices by category:
  - Routing architecture (App Router, routes, metadata)
  - Component organization (3-tier system: UI, Common, Feature)
  - Styling approach (Tailwind, CSS variables, dark mode)
  - TypeScript configuration (strict mode, type patterns)
  - API routes & data fetching (endpoints, patterns, error handling)
  - Database layer (Drizzle ORM, architecture, operations pattern)
  - Client components & hooks (use client, custom hooks)
- Testing strategy (Jest + React Testing Library)
- All configuration files explained (next.config, tsconfig, tailwind, etc.)
- Notable patterns & conventions (navigation, responsive design, fonts, metadata, filters)
- Dependency insights (core, UI/styling, dev tools)
- Standards to carry forward (checklist)
- Deployment & scripts
- Key takeaways (strengths, scalability)

**Best for**: Understanding the big picture, learning patterns, architecture decisions

---

### 3. DATA_FLOW.md (51 KB)
**Purpose**: Visual diagrams and data flow documentation
**Length**: Reference document (use as needed)

**Contains**:
1. Application Architecture Overview (ASCII diagram)
   - Browser to server layers
   - Component breakdown
   - Hook & utility organization
   
2. Component Hierarchy & Composition (tree diagram)
   - Root layout structure
   - Component nesting
   
3. Client-Side Data Flow (Directory component example)
   - useEffect lifecycle
   - Parallel fetching
   - Filter/search flow
   
4. Styling & Theming System (flow diagram)
   - CSS variables setup
   - Tailwind configuration mapping
   - Three styling approaches
   
5. Database Schema & Relationships (ER-style diagram)
   - Table definitions
   - Foreign key relationships
   - Junction tables
   
6. State Management Flow (component state breakdown)
   - Global state (none)
   - Local component state
   - Side effects
   - Computed state
   
7. Request Flow For Fetching (step-by-step)
   - User action through database and back to render
   - Complete end-to-end flow
   
8. File Organization by Function (tree structure)
   - Routing & pages
   - Components
   - Hooks & utilities
   - Database
   - Configuration
   
9. Tech Stack Dependency Graph (ASCII diagram)
   - Framework dependencies
   - UI/styling dependencies
   - Database dependencies
   - Testing dependencies
   - Developer tools
   
10. Performance Optimization Patterns (categorized tips)
    - Code splitting
    - Server vs client components
    - Data fetching optimizations
    - Rendering optimizations
    - Styling optimizations

**Best for**: Understanding relationships, visualizing flows, troubleshooting architecture issues

---

## How to Use These Documents

### For Code Reviews
1. Check QUICK_REFERENCE.md for best practices checklist
2. Verify component organization matches Architecture.md Section 3.2
3. Confirm styling follows patterns in QUICK_REFERENCE.md Styling System

### For Onboarding New Developers
1. Week 1: Read QUICK_REFERENCE.md + explore code with reference
2. Week 2: Study ARCHITECTURE.md sections relevant to their work
3. Ongoing: Use DATA_FLOW.md to understand complex interactions

### For Feature Development
1. Check QUICK_REFERENCE.md for relevant pattern
2. Review existing similar component in codebase
3. Follow established conventions from ARCHITECTURE.md
4. Reference DATA_FLOW.md if building complex flows

### For Troubleshooting
1. Check common gotchas in QUICK_REFERENCE.md
2. Review expected flows in DATA_FLOW.md
3. Consult configuration files explanations in ARCHITECTURE.md

### For Performance Optimization
1. Review Performance Optimization Patterns in DATA_FLOW.md
2. Check React best practices in ARCHITECTURE.md Section 3.7
3. Verify styling is optimal per QUICK_REFERENCE.md Styling System

---

## Key Concepts Summary

### Architecture Layers
- **Client Layer**: React components, hooks, state management
- **API Layer**: Next.js API routes with proper error handling
- **Database Layer**: Drizzle ORM, TypeScript-safe queries
- **Configuration**: Centralized via environment variables

### Component System
- **UI Components** (shadcn/ui): Radix primitives + Tailwind
- **Common Components**: App-specific reusables
- **Feature Components**: Complex business logic

### Data Flow
1. User interaction in component
2. Fetch from API route
3. API calls dbOperations
4. dbOperations queries database via Drizzle
5. Data returned and rendered

### Key Files to Know
- `src/app/types.ts` - All TypeScript types
- `src/lib/dbOperations.ts` - Database queries
- `src/components/*/index.tsx` - Component entry points
- `tailwind.config.ts` - Styling configuration
- `src/app/globals.css` - Theme variables

### Key Patterns to Remember
1. Always co-locate tests in `__tests__` folders
2. Use `@/` import aliases, never relative imports
3. Use `cn()` utility for conditional Tailwind classes
4. Keep components single-responsibility
5. Use TypeScript strict mode everywhere
6. Fetch data in useEffect for client components
7. Use `NextResponse.json()` for API responses
8. Define types in `src/app/types.ts`
9. Database queries in `lib/dbOperations.ts`
10. Client components only when needed

---

## Related Files in Project

These documentation files are complementary to:
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Styling theme
- `jest.config.ts` - Testing configuration
- `.prettierrc.json` - Code formatting rules
- `.eslintrc.json` - Linting rules
- `src/app/types.ts` - Application type definitions
- `drizzle/schema.ts` - Database schema

---

## Maintenance

These docs are reference material. When making architectural changes:
1. Update relevant section in ARCHITECTURE.md
2. Update corresponding pattern in QUICK_REFERENCE.md
3. Add visual diagram to DATA_FLOW.md if needed
4. Add new pattern to "Standards to carry forward" section

---

## Examples in Codebase

Real examples of documented patterns:
- **Component Org**: See `src/components/Directory/` (multiple sub-components)
- **Styling**: See `src/components/common/Header1/index.tsx` (Tailwind + cn utility)
- **API Route**: See `src/app/api/organizations/route.ts` (pattern example)
- **Client Component**: See `src/components/Directory/index.tsx` (useState, useEffect)
- **Types**: See `src/app/types.ts` (centralized types)
- **Database**: See `src/lib/dbOperations.ts` (query functions)
- **Testing**: See `src/app/__tests__/homepage.test.tsx` (jest pattern)

---

## Document Statistics

- **Total Pages**: ~80 pages of documentation
- **Total Words**: ~15,000 words
- **ASCII Diagrams**: 10
- **Code Examples**: 50+
- **Best Practices**: 100+ checklist items
- **Configuration Files Documented**: 8
- **Key Patterns Documented**: 20+

---

## Quick Links

Within this folder:
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - One-page cheat sheet
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Deep dive guide
- [DATA_FLOW.md](./DATA_FLOW.md) - Visual diagrams

In project:
- [ARCHITECTURE.md](./ARCHITECTURE.md) Section 2 - Folder structure
- [package.json](./package.json) - Dependencies
- [src/app/types.ts](./src/app/types.ts) - Type definitions
- [src/lib/dbOperations.ts](./src/lib/dbOperations.ts) - Database layer

---

Last Updated: November 19, 2024
Documentation Version: 1.0
Next.js Version: 15.0.1
React Version: 18.3.1

---

**Questions?** Check the relevant section in these docs, then review the actual code in the project!
