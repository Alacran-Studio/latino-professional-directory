# Latino Professional Directory - Backlog

**Last Updated:** February 13, 2026
**Owner:** Jorge Viramontes
**Status:** In Progress

**Repo:** https://github.com/Alacran-Studio/latino-professional-directory
**Production Site:** https://latinoprofessionaldirectory.com/

---

## Recent Wins 🎉

### Week of Feb 10

- ✅ Featured Organizations — foundation in place (`is_featured` flag, spotlight section)
- ✅ Onboarding form submissions working with email integrations (Resend)
- ✅ Admin UI implemented
- ✅ User auth and profiles
- ✅ Directory separation (dedicated `/directory` route)
- ✅ Font consistency — Lexend applied across directory components (Tags, FilterDropdown)
- ✅ UI redesign — Koulen display headings, Lexend subheadings, Be Vietnam Pro body text
- ✅ Org detail page redesign — cover photo, card layout, contact info, events section
- ✅ Collapsible admin sidebar — icon rail on mobile, expand/collapse toggle, slimmer width
- ✅ Mobile org cards — stacked card layout on mobile replacing table view

### Week of Feb 3

- ✅ Chicago Innovation fully integrated (logo, description, events live)
- ✅ Events listing page and event detail pages completed
- ✅ Events data model implemented and working in directory
- ✅ Design implementation completed with Natasha's designs (Claude Code)
- ✅ Partnership outreach initiated (Latino Professionals, ALPFA, Techqueria, 1871, Chicago Innovation)
- ✅ Fixed deployment issues (fetch/seed refactor, Netlify preview URLs)

---

## Active Sprint (Week of Feb 16)

### 0. Backlog Review & Detail Pass

**Priority:** High
**Status:** Not Started

- [ ] Manual walkthrough of the full app — flag visual inconsistencies, copy issues, rough edges
- [ ] Triage findings into quick fixes vs. larger items
- [ ] Update backlog with findings

### 1. Org Slugs

**Priority:** High
**Status:** Not Started

- [ ] Add `slug` column to organizations table in Supabase
- [ ] Generate slugs from org names (lowercase, hyphenated)
- [ ] Update routes to use `/organizations/[slug]` instead of `/organizations/[id]`
- [ ] Redirect or handle old ID-based URLs gracefully

### 2. Affinity Model — 1871 First Joint Event

**Priority:** High
**Status:** Not Started

- [ ] Design affinity table/relationship in Supabase
- [ ] Update org profile UI to display affiliated groups
- [ ] Seed 1871 data (LTNtech Voices affinity group)
- [ ] Prepare 1871 org profile for first joint event posting

### 2B. Send Org Confirmation Email

**Priority:** High
**Status:** Not Started

- [ ] Upon admin approval of an org, create an email that notifies the org admin.

### 3. Key Services Taxonomy

**Priority:** High
**Status:** Not Started

Services organizations might offer:

- Networking, Mentorship, In-Person Events, Webinars, Career Development, Scholarships, Leadership Programs, Job Board

- [ ] Add `key_services` field to org schema in Supabase
- [ ] Display services on org profile page
- [ ] Add selectable services list to onboarding flow
- [ ] Update initial org profiles with services data

### 4. Org Assets & Branding — High Priority Orgs

**Priority:** High
**Status:** In Progress

Focus orgs:

- Techqueria
- ALPFA
- LaFamilia
- 1871
- Chicago Innovation ✅

- [ ] Collect logos from focus orgs
- [ ] Implement custom font treatment for org/event cards (replace generic images with styled org titles)
- [ ] Ensure font consistency across all card types

### 5. Featured Organizations — Build Out

**Priority:** Medium
**Status:** In Progress (foundation shipped)

- [ ] Refine FeaturedOrgs component styling and layout
- [ ] Add featured org badges or visual distinction in main directory list
- [ ] Populate featured orgs with real partner data
- [ ] Review featured section responsiveness across breakpoints

### 6. Mobile Experience Audit

**Priority:** Medium
**Status:** In Progress

- [x] Admin sidebar — collapsible icon rail for mobile
- [x] Admin org list — stacked card layout on mobile
- [ ] Admin org detail/edit — redesign for mobile (card → detail page → edit flow)
- [ ] Full walkthrough on mobile (home, directory, org detail, events, join)
- [ ] Flag and fix layout/spacing/touch-target issues
- [ ] Test onboarding flow on mobile

---

## Events Pipeline

### Architecture

- Events data model: ✅ Created and working
- Integration with org profiles: ✅ Working (Chicago Innovation live)

### Backlog

- [ ] Calendar view option (hardening — later)
- [ ] RSVP/external link handling (hardening — later)

### Live Events Strategy (with Gustavo)

**Platform:** Luma
**Model:** Joint partnerships with organizations to build their profiles

Organizations in pipeline:

- Chicago Innovation ✅ (assets received)
- 1871 (next up — first joint event)
- Latino Professionals
- ALPFA
- Techqueria
- (collecting logos + data from each)

---

## Data Model Evolution: Affinity Relationships

### Concept

Non-explicitly Latino-serving organizations that provide Latino-serving groups, ERGs, or services.

### Schema Pattern

```
Organization HAS Affinity FOR [demographic]
  AND is Called: [group_name]
  AND is Type: [AFFINITY_GROUP | COMPANY_ERG | PROGRAM]
```

### Examples

| Parent Org        | Affinity For | Group Name     | Type           |
| ----------------- | ------------ | -------------- | -------------- |
| 1871              | Latina/o     | LTNtech Voices | AFFINITY_GROUP |
| HERE Technologies | Latina/o     | Vamos          | COMPANY_ERG    |

---

## Technical Backlog

### Infrastructure

- [ ] Set up staging environment (separate from production DB/Supabase project)
- [ ] Graph visualization of org/people/event relationships
- [ ] Automation pipelines (content updates, notifications)

### UX/Optimization

- [ ] Disable dark mode — force light mode site-wide (remove `prefers-color-scheme` overrides, set `color-scheme: light` on `<html>`)
- [ ] Desktop experience review
- [ ] Performance optimization

### Tech Stack

- **Current:** Next.js, Supabase
- **Exploring:** React Native (future mobile app)
- **Tooling:** Claude Code for planning + production pipeline

---

## Email & Engagement (Pivoted)

**Original Plan:** Buttondown + custom signup forms
**New Approach:** Luma for event-based email capture

- [ ] Set up Luma account
- [ ] Configure email list functionality post-first event
- [ ] Evaluate newsletter needs after event traction

---

## Revenue & Partnerships

### Pilot Partnership Outreach (In Progress)

- Latino Professionals
- ALPFA
- Techqueria
- LaFamilia
- 1871
- Chicago Innovation

### Revenue Model Validation

- [ ] BMC session to validate assumptions
- [ ] Identify 2-3 pilot revenue partnerships

---

## Notes

### Design

- Natasha designs implemented ✅
- Font consistency is priority for professional appearance
- Move away from generic placeholder images

### Content Strategy

- Events as engagement driver
- Luma for event management + email capture
- Joint partnerships build org profiles organically

---

_This backlog syncs with Notion roadmap and is the source of truth for code-related work._
