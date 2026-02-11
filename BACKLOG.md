# Latino Professional Directory - Backlog

**Last Updated:** February 6, 2026  
**Owner:** Jorge Viramontes  
**Status:** In Progress  

**Repo:** https://github.com/Alacran-Studio/latino-professional-directory
**Production Site:** https://latinoprofessionaldirectory.com/

---

## Recent Wins 🎉

- ✅ Chicago Innovation fully integrated (logo, description, events live)
- ✅ Events listing page and event detail pages completed
- ✅ Events data model implemented and working in directory
- ✅ Design implementation completed with Natasha's designs (Claude Code)
- ✅ Partnership outreach initiated (Latino Professionals, ALPFA, Techqueria, 1871, Chicago Innovation)
- ✅ Fixed deployment issues (fetch/seed refactor, Netlify preview URLs)

---

## Active Sprint

### 1. Featured Organizations
**Priority:** High
**Status:** Not Started

- [ ] Add `is_featured` boolean column to organizations table
- [ ] Create FeaturedOrgs component (horizontal row above directory)
- [ ] Update Directory page layout to include featured section
- [ ] Sort main directory alphabetically by name
- [ ] Featured orgs appear both in spotlight section AND in main directory list

### 2. Organization Assets & Branding
**Priority:** High
**Status:** In Progress

- [ ] Collect logos from partner organizations
- [ ] Implement custom font treatment for org/event cards (replace generic images with styled org titles)
- [ ] Ensure font consistency across all card types
- ✅ Chicago Innovation: Logo + description updated, events live

### ~~3. Bug Fixes - Recent Build~~ ✅
**Status:** Completed

- ✅ Fixed fetch/seed refactor issues
- ✅ Fixed self-fetch URL issues on Netlify preview deploys (using headers() for dynamic base URL)

### 3. Google Analytics Setup
**Priority:** High  
**Status:** Not Started  
**Estimate:** 2 hours with Claude Code

- [ ] Implement GA4 tracking
- [ ] Set up key events (page views, org clicks, event RSVPs)

---

## Events Pipeline

### Architecture
- Events data model: ✅ Created and working
- Integration with org profiles: ✅ Working (Chicago Innovation live)

### Backlog
- ✅ Build events listing page
- ✅ Event detail pages
- [ ] Calendar view option (hardening - later)
- [ ] RSVP/external link handling (hardening - later)

### Live Events Strategy (with Gustavo)
**Platform:** Luma  
**Model:** Joint partnerships with organizations to build their profiles

Organizations in pipeline:
- Chicago Innovation ✅ (assets received)
- 1871
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
| Parent Org | Affinity For | Group Name | Type |
|------------|--------------|------------|------|
| 1871 | Latina/o | LTNtech Voices | AFFINITY_GROUP |
| HERE Technologies | Latina/o | Vamos | COMPANY_ERG |

### Implementation Tasks
- [ ] Design affinity table/relationship in Supabase
- [ ] Update org profile UI to display affiliated groups
- [ ] Seed initial data (1871, HERE, etc.)

---

## Key Services Taxonomy

Services organizations might offer:
- Networking
- Mentorship
- In-Person Events
- Webinars
- Career Development
- Scholarships
- Leadership Programs
- Job Board

- [ ] Add key_services field to org schema
- [ ] Create selection UI for org profiles
- [ ] Update 10-20 org profiles with services

---

## Technical Backlog

### Infrastructure
- [ ] Graph visualization of org/people/event relationships
- [ ] Automation pipelines (content updates, notifications)

### UX/Optimization
- [ ] Disable dark mode — force light mode site-wide (remove `prefers-color-scheme` overrides, set `color-scheme: light` on `<html>`)
- [ ] Mobile experience audit and fixes
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

## Next Actions

### This Week
1. **Bug fixes** - Triage and fix recent build errors
2. **Google Analytics** - 2 hour setup session
3. **Org assets** - Implement custom font treatment for cards
4. **Chicago Innovation** - Finalize integration with new assets

### Next Week
4. **BMC Session** - 2-hour block to validate business model assumptions
5. **Affinity model** - Design and implement in Supabase
6. **Luma setup** - Create account, plan first event with Gustavo
7. **Continue partnership outreach** - Follow up with orgs, collect assets

---

## Revenue & Partnerships

### Pilot Partnership Outreach (In Progress)
- Latino Professionals
- ALPFA
- Techqueria
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

*This backlog syncs with Notion roadmap and is the source of truth for code-related work.*
