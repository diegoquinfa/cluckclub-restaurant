# Skill Registry — Cluck Club

Indexed map of every skill available to agents in this project, grouped by trigger context. Use this as the first lookup before reading a SKILL.md.

Last updated: 2026-06-23
Source: `skills-lock.json` (v1) — 18 skills registered.

---

## Project Conventions (local files)

| Trigger / Context | File | Purpose |
|---|---|---|
| All work | `AGENTS.md` (not present — global only) | Global persona + Engram protocol |
| Shadcn component install | `.cursorrules` | `pnpm dlx shadcn@latest add <name>` |
| VS Code formatting | `.vscode/settings.json` | Biome default formatter + organizeImports on save |
| Brand / design system | `DESIGN.md` | Brutalism + fire palette, GSAP motion map, voice |

---

## Frontend / UI (React 19 + TanStack Start + Tailwind v4 + shadcn)

| Trigger | Skill | Local Path |
|---|---|---|
| Build React component, page, web UI, polish styling | `frontend-design` | `.agents/skills/frontend-design/SKILL.md` |
| React composition, compound components, render props, React 19 APIs | `composition-patterns` | `.agents/skills/composition-patterns/SKILL.md` |
| React/Next.js performance, data fetching, bundle optimization | `react-best-practices` | `.agents/skills/react-best-practices/SKILL.md` |
| TanStack Router/Start, file-based routing, server functions, SSR | `tanstack-start` | `.agents/skills/tanstack-start/SKILL.md` |
| Add/configure shadcn/ui components, registry, presets, dark mode | `shadcn` | `.agents/skills/shadcn/SKILL.md` |
| Tailwind v4 setup with shadcn + Vite, `@theme inline`, dark mode, migrations | `tailwind-v4-shadcn` | `.agents/skills/tailwind-v4-shadcn/SKILL.md` |
| Tailwind utility patterns, responsive, layout, typography, colors | `tailwind-css-patterns` | `.agents/skills/tailwind-css-patterns/SKILL.md` |
| Accessibility audit, WCAG 2.2, screen reader, keyboard nav, a11y | `accessibility` | `.agents/skills/accessibility/SKILL.md` |
| SEO meta tags, structured data, sitemap, search ranking | `seo` | `.agents/skills/seo/SKILL.md` |

## Animation (GSAP — core stack)

| Trigger | Skill | Local Path |
|---|---|---|
| `gsap.to/from/fromTo`, easing, duration, stagger, `matchMedia` | `gsap-core` | `.agents/skills/gsap-core/SKILL.md` |
| GSAP in React, `useGSAP`, refs, `gsap.context()`, cleanup | `gsap-react` | `.agents/skills/gsap-react/SKILL.md` |
| ScrollTrigger, scroll-linked animation, pinning, scrub | `gsap-scrolltrigger` | `.agents/skills/gsap-scrolltrigger/SKILL.md` |
| GSAP performance, transforms, will-change, batching, 60fps | `gsap-performance` | `.agents/skills/gsap-performance/SKILL.md` |
| `gsap.utils`, clamp, mapRange, interpolate, snap, wrap, pipe | `gsap-utils` | `.agents/skills/gsap-utils/SKILL.md` |

## TypeScript & Build

| Trigger | Skill | Local Path |
|---|---|---|
| Advanced TS types, generics, conditional, mapped, template literal | `typescript-advanced-types` | `.agents/skills/typescript-advanced-types/SKILL.md` |
| Vite config, plugins, SSR, Vite 8 Rolldown migration | `vite` | `.claude/skills/vite/SKILL.md` |

## Testing (Vitest 4)

| Trigger | Skill | Local Path |
|---|---|---|
| Vitest config, mocks, coverage, fixtures, filtering | `vitest` | `.claude/skills/vitest/SKILL.md` |

## Node.js Backend (Nitro / server functions)

| Trigger | Skill | Local Path |
|---|---|---|
| Node.js backend, Express/Fastify, middleware, error handling, auth | `nodejs-backend-patterns` | `.agents/skills/nodejs-backend-patterns/SKILL.md` |
| Node.js principles, framework selection, async, security, architecture | `nodejs-best-practices` | `.agents/skills/nodejs-best-practices/SKILL.md` |

## Workflow / Process Skills (system-level, not project-specific)

Installed via opencode at `C:/Users/diego/.config/opencode/skills/`:

| Trigger | Skill |
|---|---|
| `sdd init`, `iniciar sdd`, `openspec init` | `sdd-init` |
| SDD explore | `sdd-explore` |
| `sdd new` | `sdd-propose` |
| SDD design | `sdd-design` |
| SDD spec | `sdd-spec` |
| SDD tasks | `sdd-tasks` |
| SDD apply | `sdd-apply` |
| SDD verify | `sdd-verify` |
| SDD archive | `sdd-archive` |
| SDD onboard | `sdd-onboard` |
| Brainstorming before creative work | `brainstorming` |
| Update skill registry | `skill-registry` |
| Create new skill | `skill-creator` |
| Improve/audit skill | `skill-improver` |
| Find skills to install | `find-skills` |
| PR creation | `branch-pr`, `chained-pr` |
| PR comments / reviews | `comment-writer` |
| GitHub issue creation | `issue-creation` |
| Commit planning | `work-unit-commits` |
| Dual review / adversarial | `judgment-day` |
| Doc design (cognitive load) | `cognitive-doc-design` |
| opencode self-config | `customize-opencode` |
| Shared SDD references | `_shared` |

---

## Quick Lookup — "What skill do I read for…?"

- **"Build a new React component for this section"** → `frontend-design` + `composition-patterns` + `react-best-practices`
- **"Add a shadcn button"** → `shadcn` + `tailwind-v4-shadcn`
- **"Animate the hero timeline"** → `gsap-core` + `gsap-react` (this project uses React) + `gsap-performance`
- **"Add scroll-driven animation"** → `gsap-scrolltrigger` + `gsap-performance`
- **"Write tests for X"** → `vitest`
- **"Wire a server function / API route"** → `tanstack-start` + `nodejs-backend-patterns`
- **"Audit this for a11y / SEO"** → `accessibility` / `seo`
- **"Type this prop / API correctly"** → `typescript-advanced-types`
- **"Speed up build / dev server"** → `vite`
- **"Start a new feature properly"** → `brainstorming` → `sdd-explore` → `sdd-propose`

## Maintenance

When skills are added/removed/updated, run `/skill-registry` to regenerate this file. Do NOT edit by hand unless adding new categories.
