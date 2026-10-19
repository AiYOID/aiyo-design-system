# AiYO Design System

The AiYO Design System, "Minimalist Modern", is a shared set of tokens, React components, page blocks and motion helpers, plus documentation written for AI coding agents. It ships as a showcase site on GitHub Pages.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui conventions (cva, `cn`, radix-ui, lucide-react) · `motion`

## What's in the repo

| Path | Contents |
|---|---|
| `src/styles/aiyo.css` | All design tokens (colors, inverted/dark palette, radius, shadows, fonts, keyframes) and utilities (`bg-gradient-primary`, `text-gradient`, `focus-ring`) |
| `src/components/ui/` | Base components: Button, Badge, SectionLabel, GradientText, IconTile, Card, Input, Textarea, Label, Field, Select, Checkbox, RadioGroup, Switch, Tabs, Accordion, Dialog, Tooltip, DropdownMenu, Alert, Avatar, Progress, Table, Pagination, Skeleton, Separator, Kbd, Spinner, Stat |
| `src/components/blocks/` | Page blocks: Container, Section, SectionHeader (all in `section.tsx`), HeroGraphic, Steps, PricingCard, TestimonialCard, PageHeader, FormSection, FormActions (all in `page-header.tsx`) |
| `src/lib/utils.ts` | `cn()` (clsx + tailwind-merge) |
| `src/lib/motion.tsx` | `easeOut`, `fadeInUp`, `fadeIn`, `stagger`, `viewport`, `Reveal`, `RevealGroup`, `RevealItem` |
| `src/showcase/` | The showcase site |
| `DESIGN.md` | The canonical design spec |
| `AGENTS.md` | Short rules for AI coding agents |
| `CLAUDE.md` | Imports `AGENTS.md` for Claude Code |
| `tokens/aiyo.tokens.json` | W3C Design Tokens (DTCG) |
| `skills/aiyo-design/` | A Claude Code skill |
| `skills/antislop*` | The vendored antislop filter: core plus the ui, human, layoutmobile, copywriting and code skills |
| `public/llms.txt` | llms.txt index of the docs |

## Run locally

```bash
npm install
npm run dev        # start the showcase at http://localhost:5173
npm run typecheck  # tsc -b
```

## Build

```bash
npm run build      # tsc -b && vite build → dist/
npm run preview    # serve the production build
```

During the build, the docs (`DESIGN.md`, `AGENTS.md`, `aiyo.tokens.json`, `llms.txt`, `llms-full.txt`) are copied into the site root. Agents can then fetch them at `<site>/DESIGN.md`, `<site>/llms.txt` and so on.

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`. You can also run it manually from the **Actions** tab.
4. The site is published at `https://<org>.github.io/<repo>/`. Put that URL into the CLAUDE.md snippet in `AGENTS.md`.

## Adopt it in a project

1. Set up the project with Tailwind CSS v4 (`@tailwindcss/vite`) and the `@/*` → `src/*` path alias.
2. Copy `src/styles/aiyo.css`, `src/lib/utils.ts` and `src/lib/motion.tsx`. Import `aiyo.css` once from your entry file.
3. Copy the components you need from `src/components/ui/` and `src/components/blocks/`. Some import `./input` or `./label`, so copy those too.
4. Install the dependencies:
   ```bash
   npm i class-variance-authority clsx tailwind-merge radix-ui lucide-react motion
   ```
5. For dark mode, add `class="dark"` to `<html>`. To flip a single section, add `class="inverted"` to it.

> **Naming:** the brand color is `primary` (Electric Blue `#0052FF → #3366FF`). `accent` keeps its shadcn meaning, a subtle hover surface. Never use `bg-accent` for brand.

## For AI agents

| File | Use |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Full spec: tokens, components, patterns, page recipes |
| [`AGENTS.md`](./AGENTS.md) | Install steps, hard rules, and a ready-to-paste snippet for a project's `CLAUDE.md` or `AGENTS.md` |
| [`tokens/aiyo.tokens.json`](./tokens/aiyo.tokens.json) | Machine-readable tokens (DTCG) |
| [`public/llms.txt`](./public/llms.txt) | llms.txt index, served at `<site>/llms.txt` (with `llms-full.txt`) |
| [`skills/aiyo-design/SKILL.md`](./skills/aiyo-design/SKILL.md) | Claude Code skill. Copy the folder to `~/.claude/skills/` or `<project>/.claude/skills/`. |
| [`skills/antislop/SKILL.md`](./skills/antislop/SKILL.md) | The anti-slop filter, applied on top of DESIGN.md |

## Anti-slop

`DESIGN.md` gives direction, antislop is the filter, and `AGENTS.md` / `CLAUDE.md` route the agent to both. For UI work an agent reads DESIGN.md, then `skills/antislop/SKILL.md` plus the skill for the task, and runs the antislop Delivery Gate before delivering. The owner's keep/drop decisions are logged in DESIGN.md §14.

The `skills/antislop*` folders are a vendored copy of [anti-slop](https://github.com/miqdadbadjuber/anti-slop) by Miqdad Badjuber, release 3.2.21, under the MIT License (see `skills/antislop/LICENSE`). The release is recorded in `skills/antislop/VERSION`.

To update the vendored copy:
1. Download the new release from https://github.com/miqdadbadjuber/anti-slop/releases.
2. Replace every `skills/antislop*` folder with the matching folder from that release, so the core and its skills stay on the same version. Keep `LICENSE` and `VERSION`.
3. Compare the pointer block in the core's "First-Run Install Wizard" (step 5) with the block between `<!-- antislop:start -->` and `<!-- antislop:end -->` in `AGENTS.md`, and copy over any wording changes (keep the `skills/antislop/SKILL.md` core path).
4. Check DESIGN.md §14 against any new or renumbered rules.
