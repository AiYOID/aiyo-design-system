# AiYO Design System

The AiYO Design System v2, "Minimalist Modern", is the AiYO brand theme for [HeroUI v3](https://heroui.com), plus the page blocks and app patterns every AiYO product shares, and documentation written for AI coding agents. It ships as a showcase site on GitHub Pages.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · HeroUI v3 (`@heroui/react`, `@heroui/styles`, built on React Aria) · Geist Sans and Geist Mono (Fontsource) · `@gravity-ui/icons`

## What's in the repo

| Path | Contents |
|---|---|
| `src/styles/aiyo.css` | The AiYO theme for HeroUI: palette (light, dark, inverted sections) on HeroUI's variables, Geist, utilities (`bg-gradient-accent`, `text-gradient`, `heading-hero`, `heading-section`, `label-caps`), the touch layer and the scroll-entrance styles |
| `src/components/aiyo/` | AiYO blocks on HeroUI: Container, Section, SectionHeader (`section.tsx`), SectionLabel, GradientText, IconTile, Stat, PageHeader, FormSection, FormActions (`page-header.tsx`), DataPagination, Steps, PricingCard, TestimonialCard, HeroGraphic, ThemeToggle |
| `src/lib/motion.tsx` | `Reveal`, `RevealGroup`, `RevealItem`, `easeOut` |
| `src/showcase/` | The showcase site (component gallery and app patterns) |
| `DESIGN.md` | The canonical design spec |
| `AGENTS.md` | Short rules for AI coding agents |
| `CLAUDE.md` | Imports `AGENTS.md` for Claude Code |
| `tokens/aiyo.tokens.json` | W3C Design Tokens (DTCG) |
| `skills/aiyo-design/` | A Claude Code skill |
| `skills/antislop*` | The vendored antislop filter: core plus the ui, human, layoutmobile, copywriting and code skills |
| `public/llms.txt` | llms.txt index of the docs |

There is no `src/components/ui/` any more: components come straight from `@heroui/react`.

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

During the build, the docs (`DESIGN.md`, `AGENTS.md`, `aiyo.css`, `aiyo.tokens.json`, `llms.txt`, `llms-full.txt`) are copied into the site root. Agents can then fetch them at `<site>/DESIGN.md`, `<site>/llms.txt` and so on.

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`. You can also run it manually from the **Actions** tab.
4. The site is published at `https://<org>.github.io/<repo>/`. Put that URL into the CLAUDE.md snippet in `AGENTS.md`.

## Adopt it in a project

1. Set up the project with Tailwind CSS v4 (`@tailwindcss/vite`) and the `@/*` → `src/*` path alias.
2. Install HeroUI, Geist and the icons:
   ```bash
   npm i @heroui/react @heroui/styles @fontsource-variable/geist @fontsource-variable/geist-mono @gravity-ui/icons
   ```
3. Copy `src/styles/aiyo.css` and import it once from your entry file, in place of any other `@import "tailwindcss"`.
4. Copy `src/lib/motion.tsx` and the files you need from `src/components/aiyo/`.
5. Build screens from `@heroui/react` components and the AiYO blocks, following `DESIGN.md`.
6. For dark mode, use HeroUI's `useTheme` (or `ThemeToggle`), and copy the inline theme script from `index.html`. To flip one section, add `inverted` to it (`<Section inverted>`).

Upgrading a v1 project (Radix and shadcn-style components)? See DESIGN.md §15 for the step-by-step mapping.

> **Naming:** the brand colour is `accent` (Electric Blue `#0052FF`), following HeroUI. `muted` is secondary text and `default` is the neutral fill. There is no `primary` token.

## For AI agents

| File | Use |
|---|---|
| [`DESIGN.md`](./DESIGN.md) | Full spec: tokens, HeroUI usage rules and recipes, AiYO blocks, page recipes, mandatory app patterns, decisions, v1 migration |
| [`AGENTS.md`](./AGENTS.md) | Install steps, hard rules, and a ready-to-paste snippet for a project's `CLAUDE.md` or `AGENTS.md` |
| [`tokens/aiyo.tokens.json`](./tokens/aiyo.tokens.json) | Machine-readable tokens (DTCG) |
| [`public/llms.txt`](./public/llms.txt) | llms.txt index, served at `<site>/llms.txt` (with `llms-full.txt`) |
| [`skills/aiyo-design/SKILL.md`](./skills/aiyo-design/SKILL.md) | Claude Code skill. Copy the folder to `~/.claude/skills/` or `<project>/.claude/skills/`. |
| [`skills/antislop/SKILL.md`](./skills/antislop/SKILL.md) | The anti-slop filter, applied on top of DESIGN.md |

For HeroUI's own API, agents can read [heroui.com/react/llms.txt](https://heroui.com/react/llms.txt).

## Anti-slop

`DESIGN.md` gives direction, antislop is the filter, and `AGENTS.md` / `CLAUDE.md` route the agent to both. For UI work an agent reads DESIGN.md, then `skills/antislop/SKILL.md` plus the skill for the task, and runs the antislop Delivery Gate before delivering. The owner's keep/drop decisions are logged in DESIGN.md §14.

The `skills/antislop*` folders are a vendored copy of [anti-slop](https://github.com/miqdadbadjuber/anti-slop) by Miqdad Badjuber, release 3.2.21, under the MIT License (see `skills/antislop/LICENSE`). The release is recorded in `skills/antislop/VERSION`.

To update the vendored copy:
1. Download the new release from https://github.com/miqdadbadjuber/anti-slop/releases.
2. Replace every `skills/antislop*` folder with the matching folder from that release, so the core and its skills stay on the same version. Keep `LICENSE` and `VERSION`.
3. Compare the pointer block in the core's "First-Run Install Wizard" (step 5) with the `## antislop` block at the end of `AGENTS.md`, and copy over any wording changes (keep the `skills/antislop/SKILL.md` core path).
4. Check DESIGN.md §14 against any new or renumbered rules.
