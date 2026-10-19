---
name: aiyo-design
description: Apply the AiYO Design System ("Minimalist Modern") when building, styling or reviewing UI in AiYO projects. Use it for any React/Tailwind page, component, landing page, dashboard, form or layout for AiYO, or when the user mentions AiYO UI, the AiYO design system, aiyo.css, the Electric Blue gradient or Calistoga headlines.
---

# AiYO Design System

The full spec is in `DESIGN.md` in the aiyo-design-system repo, also served at `<site>/DESIGN.md`. The LLM index is at `<site>/llms.txt`. Read DESIGN.md when you need exact component props or page recipes. The rules below are the condensed version.

## Anti-slop filter
This skill gives direction. antislop is the filter on top of it: read `skills/antislop/SKILL.md` (core) plus the skill for the task (`skills/antislop-ui/SKILL.md` for visual work, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code`), and run its Delivery Gate before delivering. Dials for AiYO products: ENERGY 2 / RHYTHM 2 / MOTION 2. The owner's keep/drop decisions (R-37 log) are in DESIGN.md §14; the showcase's sample numbers, testimonials and pricing are an exception for the showcase only.

## Setup check
- Tokens live in `src/styles/aiyo.css` (Tailwind v4, imported once). Helpers: `src/lib/utils.ts` (`cn`) and `src/lib/motion.tsx`.
- Components are shadcn style and imported from `@/components/ui/*` and `@/components/blocks/*`. **Reuse them before writing new markup.** If one is missing, copy it from the design-system repo.
- Dependencies: `class-variance-authority clsx tailwind-merge radix-ui lucide-react motion`.

## Rules
1. **The brand color is `primary`**: Electric Blue `#0052FF → #4D7CFF` (`bg-gradient-primary`, `text-primary`). `accent` is the shadcn hover surface (#F1F5F9), so **never use `bg-accent` for brand.** Use one accent color only.
2. Use tokens only: `bg-background` (#FAFAFA), `text-foreground` (#0F172A, never pure black), `text-muted-foreground` (#64748B), `bg-muted`, `border-border`, `bg-card`. Status colors (`success`, `warning`, `destructive`, `info`) are for status only.
3. Typography:
   - Hero H1: `font-display text-[2.75rem] lg:text-[5.25rem] leading-[1.05] tracking-[-0.02em]`, with the last word in `<GradientText underline>`.
   - H2: `font-display text-[2.25rem] md:text-[3.25rem] leading-[1.15]`.
   - Card titles: Inter semibold `tracking-[-0.01em]`.
   - Labels: `font-mono text-xs uppercase tracking-[0.15em]` (kept on purpose as the identity motif, always small).
   - Calistoga is never used for body or UI.
4. Every major section uses `<SectionHeader label title description>` (SectionLabel → H2 → muted lede). `SectionLabel` is a plain mono label in `text-primary`: no pill, no border, no background, no dot, no `pulse` prop. A dot only marks a real live state.
5. Layout: `<Container>` (max-w-6xl) and `<Section>` (`py-24 md:py-32`). Use asymmetric grids (hero `lg:grid-cols-[1.1fr_0.9fr]`, benefits `1.2fr/0.8fr`), gaps `gap-5`–`gap-8`, and left-aligned copy.
6. Landing pages need at least one `<Section inverted>`: solid deep slate. No dot-grid textures, no blurred glows (`texture-dots` and `<Glow>` are gone). No gradients on large backgrounds.
7. Surfaces: controls `rounded-xl`, cards `rounded-2xl`. Shadows mark elevation only: cards `shadow-md`, overlays `shadow-xl`, `shadow-accent` on the primary CTA. Backdrop blur only on the sticky navbar; Dialog overlays and `FormActions` are solid.
8. Buttons: `<Button variant="primary|secondary|ghost|inverted|destructive|link" size="sm|md|lg|xl|icon">`. `data-arrow` goes on the ONE primary CTA per screen only. `sm` (h-9) is for dense desktop only.
9. Forms: `<Field label hint error htmlFor>` wrapping `<Input>` (h-12), `<Select>` or `<Textarea>`.
10. Motion (MOTION 2):
    - Entrances: `<Reveal>` or `<RevealGroup>`/`<RevealItem>` (0.7s, 28px, stagger 0.1s, once).
    - Ease `[0.16,1,0.3,1]`, hover and press feedback 200 to 300ms, overlay pop-in, accordion.
    - No endless decorative motion: no floating cards, rotating rings, breathing orbs or pulsing dots. `HeroGraphic` is static.
    - Always respect reduced motion.
11. Responsive: mobile first, hide decorative graphics below `lg`, touch targets at least 44px.
12. Accessibility: WCAG AA, keep `focus-visible:focus-ring`, `aria-label` on icon-only buttons, `aria-hidden` on decoration.

## App page rules (mandatory, DESIGN.md §13)
13. App page titles use `<PageHeader title description back actions>` from `@/components/blocks/page-header` (Inter semibold 2xl/3xl, never Calistoga).
14. Settings / profile pages with 3+ sub-sections: vertical `<Tabs orientation="vertical">`, one `Card` per tab. Never stack many cards down one long page.
15. Every list / data page: `PageHeader` (primary "Add <Thing>" with a `Plus` icon in `actions`) → toolbar (search `Input` with a `Search` icon, plus filters) → `Table` → `<Pagination page pageSize total onPageChange onPageSizeChange>` from `@/components/ui/pagination`.
    - Pagination is always shown, even with one page. Default `pageSize` 10, pages 1-based.
    - Reset to page 1 on search, filter or page-size change. Use server-side pagination for API data (send `page`/`pageSize`, read `total`).
    - Empty-state row or card when there are no results. Row actions in a `DropdownMenu` (`MoreHorizontal` icon button) in the last column.
16. Add / edit: a `Dialog` for small forms (≤6 fields, one section, no uploads, no nested line items) with Cancel (`secondary`) + Save. Otherwise a dedicated page (`/things/new`, `/things/:id/edit`): `PageHeader` with `back` → `FormSection`s → `FormActions` (sticky bottom bar). Delete always confirms in a Dialog with a `destructive` button.

## Page recipes
- **Landing:** Nav → Hero (asymmetric, HeroGraphic lg+) → Features (interactive cards with IconTile) → Benefits (1.2fr/0.8fr) → How it works (`Steps`, inverted) → Final CTA → Footer. Add Logos, Stats, `TestimonialCard`s, `PricingCard`s (one per real tier) and FAQ (`Accordion`) only when there is real data for them; otherwise leave the section out.
- **Dashboard:** sidebar and top bar shell, `PageHeader` titles, a KPI row of `Stat` in Cards, list pages per rule 15, forms per rule 16, settings per rule 14, and `Alert`/`Dialog`/`Progress` for feedback. Dense `sm` sizes are allowed on desktop. Use `.dark` on `<html>` for dark mode.
- The showcase site's **App Patterns** section (`#app-patterns`) demos a settings page, a list page and a create page.

## Before finishing
Check that there are no hex colors, no `bg-accent` used as brand, and no second accent. Confirm the section header pattern, focus rings, 44px targets, layout at 375, 768 and 1280px, and reduced motion. Confirm there are no pill labels, pulsing dots, looping decoration, dot grids or glows, and at most one `data-arrow` button per screen. On app pages, confirm the rules 13–16 (PageHeader, vertical Tabs, Pagination on every list, Dialog vs dedicated page, delete confirmation). Then run the antislop Delivery Gate.

## Installing this skill
Copy the `skills/aiyo-design/` folder to `~/.claude/skills/aiyo-design/` (all projects) or `<project>/.claude/skills/aiyo-design/` (one project). Claude Code then loads it automatically whenever you build AiYO UI. Copy the `skills/antislop*` folders the same way (or run `npx skills add miqdadbadjuber/anti-slop`) so the filter is available too.
