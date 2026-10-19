# AiYO Design System

The AiYO Design System, "Minimalist Modern", is a shared set of tokens, React components, page blocks and motion helpers, plus documentation written for AI coding agents. It ships as a showcase site on GitHub Pages.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui conventions (cva, `cn`, radix-ui, lucide-react) · `motion`

## What's in the repo

| Path | Contents |
|---|---|
| `src/styles/aiyo.css` | All design tokens (colors, inverted/dark palette, radius, shadows, fonts, keyframes) and utilities (`bg-gradient-primary`, `text-gradient`, `texture-dots`, `focus-ring`) |
| `src/components/ui/` | Base components: Button, Badge, SectionLabel, GradientText, IconTile, Card, Input, Textarea, Label, Field, Select, Checkbox, RadioGroup, Switch, Tabs, Accordion, Dialog, Tooltip, DropdownMenu, Alert, Avatar, Progress, Table, Skeleton, Separator, Kbd, Spinner, Stat |
| `src/components/blocks/` | Page blocks: Container, Section, SectionHeader, Glow (all in `section.tsx`), HeroGraphic, Steps, PricingCard, TestimonialCard |
| `src/lib/utils.ts` | `cn()` (clsx + tailwind-merge) |
| `src/lib/motion.tsx` | `easeOut`, `fadeInUp`, `fadeIn`, `stagger`, `viewport`, `Reveal`, `RevealGroup`, `RevealItem` |
| `src/showcase/` | The showcase site |
| `DESIGN.md` | The canonical design spec |
| `AGENTS.md` | Short rules for AI coding agents |
| `tokens/aiyo.tokens.json` | W3C Design Tokens (DTCG) |
| `skills/aiyo-design/` | A Claude Code skill |
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

> **Naming:** the brand color is `primary` (Electric Blue `#0052FF → #4D7CFF`). `accent` keeps its shadcn meaning, a subtle hover surface. Never use `bg-accent` for brand.

## For AI agents

| File | Use |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Full spec: tokens, components, patterns, page recipes |
| [`AGENTS.md`](./AGENTS.md) | Install steps, hard rules, and a ready-to-paste snippet for a project's `CLAUDE.md` or `AGENTS.md` |
| [`tokens/aiyo.tokens.json`](./tokens/aiyo.tokens.json) | Machine-readable tokens (DTCG) |
| [`public/llms.txt`](./public/llms.txt) | llms.txt index, served at `<site>/llms.txt` (with `llms-full.txt`) |
| [`skills/aiyo-design/SKILL.md`](./skills/aiyo-design/SKILL.md) | Claude Code skill. Copy the folder to `~/.claude/skills/` or `<project>/.claude/skills/`. |
