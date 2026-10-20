---
name: aiyo-design
description: Apply the AiYO Design System v2 (HeroUI v3 with the AiYO theme, "Minimalist Modern") when building, styling or reviewing UI in AiYO projects. Use it for any React/Tailwind page, component, landing page, dashboard, form or layout for AiYO, or when the user mentions AiYO UI, the AiYO design system, aiyo.css, HeroUI in an AiYO project, Electric Blue or Geist.
---

# AiYO Design System v2

The full spec is in `DESIGN.md` in the aiyo-design-system repo, also served at `<site>/DESIGN.md`. The LLM index is at `<site>/llms.txt`. Read DESIGN.md when you need recipes, block props or page rules. The rules below are the condensed version. For HeroUI props not covered there, read `https://heroui.com/react/llms.txt` or the types in `node_modules/@heroui/react`.

## Anti-slop filter
This skill gives direction. antislop is the filter on top of it: read `skills/antislop/SKILL.md` (core) plus the skill for the task (`skills/antislop-ui/SKILL.md` for visual work, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`), and run its Delivery Gate before delivering. Dials for AiYO products: ENERGY 2 / RHYTHM 2 / MOTION 2. The owner's keep/drop decisions (R-37 log) are in DESIGN.md §14; the showcase's sample numbers, testimonials and pricing are an exception for the showcase only.

## Setup check
- Dependencies: `@heroui/react @heroui/styles @fontsource-variable/geist @fontsource-variable/geist-mono @gravity-ui/icons`, Tailwind CSS v4.
- `src/styles/aiyo.css` is imported once and is the only `@import "tailwindcss"` (it loads Tailwind and HeroUI itself).
- AiYO blocks live in `src/components/aiyo/*`; scroll entrances in `src/lib/motion.tsx`. If one is missing, copy it from the design-system repo.
- Components come from `@heroui/react` directly. **Do not create `components/ui/*` copies or wrappers.**

## Rules
1. **Brand = `accent`** (Electric Blue `#0052FF`, HeroUI naming; no `primary` token). One accent colour only. `success`, `warning`, `danger` are for status.
2. Tokens only: `bg-background`, `text-foreground`, `text-muted` (secondary text), `bg-surface`, `bg-default` (neutral fill), `border-separator`, `text-accent`; status text `text-*-soft-foreground`. No hex, no pure black.
3. Never restyle HeroUI colours or radii per page. Theme changes go in `aiyo.css` with a written reason (DESIGN.md §2.8). Layout utilities in `className` are fine; merge with `cn()` from `@heroui/react`.
4. Typography: Geist only. Hero H1 `heading-hero`, section H2 `heading-section`, app page titles via `<PageHeader>`, card titles `text-lg font-semibold`, labels `label-caps` (Geist Mono 12px uppercase, the identity motif). Text ≥ 12px.
5. Every major marketing section uses `<SectionHeader label title description>`. `SectionLabel` is a plain mono label: no pill, no border, no dot.
6. Layout: `<Container>` (max-w-6xl) inside `<Section>`. Asymmetric grids (hero `lg:grid-cols-[1.1fr_0.9fr]`), left-aligned copy. At least one `<Section inverted>` (solid deep slate) per landing page. No dot grids, no glows.
7. HeroUI usage: `onPress` not `onClick`; menus `onAction`; Select and RadioGroup `value`/`onChange`; ids on `Tabs.Tab`/`Tabs.Panel`, `ListBox.Item`, `Dropdown.Item`, `Table.Row`, plus `textValue` on list and menu items; one `Table.Column isRowHeader`; Checkbox, Radio and Switch always include `.Content`; `Tabs.Indicator` inside each tab.
8. Buttons: HeroUI `<Button variant="primary|secondary|tertiary|outline|ghost|danger|danger-soft" size="sm|md|lg">`. Link styled as a button: `<Link className={buttonVariants({...})}>`. `data-arrow` on the ONE primary CTA per screen only.
9. Forms: `<TextField><Label/><Input/><Description/><FieldError/></TextField>`; server or cross-field errors via `<Form validationErrors>`.
10. Overlays: `Modal` with the default opaque backdrop (never `blur`); `AlertDialog` for destructive confirmation; `toast()` after actions (mount `<Toast.Provider />` once).
11. Gradient only on one headline word (`<GradientText>`, ≥ 24px), the one leading `IconTile`, one data highlight.
12. Motion (MOTION 2): `<Reveal>` / `<RevealGroup>` for marketing entrances (0.7s, 28px, once); HeroUI motion for controls; no endless decorative motion; reduced motion respected.
13. Responsive and accessible: mobile first, decorative graphics `hidden lg:block`, 44px touch targets (aiyo.css covers HeroUI controls), WCAG AA in light and dark, visible focus everywhere, `aria-label` on icon-only buttons, status never by colour alone.
14. Icons: `@gravity-ui/icons`, chosen for relevance.

## App page rules (mandatory, DESIGN.md §13)
15. App page titles use `<PageHeader title description back actions>` from `@/components/aiyo/page-header`.
16. Settings / profile with 3+ sub-sections: `<Tabs variant="secondary">`, vertical from 768px (`useMediaQuery`), horizontal below, one `Card` per tab.
17. Every list / data page: `PageHeader` ("Add <Thing>" with `Plus`) → `SearchField` + filters → `Table` → `<DataPagination page pageSize total onPageChange onPageSizeChange>` from `@/components/aiyo/data-pagination`.
    - Pagination always shown, default `pageSize` 10, 1-based, reset to page 1 on search, filter or size change, server-side for API data.
    - Loading, error, first-run and filtered-to-nothing states, each with a cause and one next action. Row actions in a `Dropdown` (`Ellipsis` icon button with `aria-label`) in the last column.
18. Add / edit: a `Modal` for ≤6 fields in one section (Cancel `slot="close"` + Save); otherwise a dedicated page (`PageHeader back` → `FormSection`s → `FormActions`). Delete always confirms in an `AlertDialog` with a `danger` button.

## Page recipes
- **Landing:** Nav (blur only here, ThemeToggle) → Hero (asymmetric, HeroGraphic lg+) → Features (cards weighted by importance, one gradient IconTile) → Benefits → How it works (`Steps`, inverted) → Final CTA → Footer. Logos, stats, `TestimonialCard`, `PricingCard` and FAQ (`Accordion`) only with real data.
- **Dashboard:** sidebar and top bar, `PageHeader` titles, real metrics only (`Stat` in `Card`), list pages per rule 17, forms per rule 18, settings per rule 16.
- The showcase's **App patterns** section (`#app-patterns`) runs a settings page, a list page and a create page.

## Before finishing
No hex colours, no `primary` token, no second accent, no copied or wrapped HeroUI components. Section header pattern, focus indicators, 44px targets, layout at 375, 768 and 1280px in light and dark, reduced motion. No pill labels, pulsing dots, looping decoration, dot grids or glows; at most one `data-arrow` per screen. App pages follow rules 15 to 18. Then run the antislop Delivery Gate.

## Installing this skill
Copy the `skills/aiyo-design/` folder to `~/.claude/skills/aiyo-design/` (all projects) or `<project>/.claude/skills/aiyo-design/` (one project). Claude Code then loads it whenever you build AiYO UI. Copy the `skills/antislop*` folders the same way (or run `npx skills add miqdadbadjuber/anti-slop`) so the filter is available too.
