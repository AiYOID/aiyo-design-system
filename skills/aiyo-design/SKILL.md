---
name: aiyo-design
description: Apply the AiYO Design System ("Minimalist Modern") when building, styling or reviewing UI in AiYO projects. Use it for any React/Tailwind page, component, landing page, dashboard, form or layout for AiYO, or when the user mentions AiYO UI, the AiYO design system, aiyo.css, the Electric Blue gradient or Calistoga headlines.
---

# AiYO Design System

The full spec is in `DESIGN.md` in the aiyo-design-system repo, also served at `<site>/DESIGN.md`. The LLM index is at `<site>/llms.txt`. Read DESIGN.md when you need exact component props or page recipes. The rules below are the condensed version.

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
   - Labels: `font-mono text-xs uppercase tracking-[0.15em]`.
   - Calistoga is never used for body or UI.
4. Every major section uses `<SectionHeader label title description>` (SectionLabel → H2 → muted lede).
5. Layout: `<Container>` (max-w-6xl) and `<Section>` (`py-24 md:py-32`). Use asymmetric grids (hero `lg:grid-cols-[1.1fr_0.9fr]`, benefits `1.2fr/0.8fr`), gaps `gap-5`–`gap-8`, and left-aligned copy.
6. Landing pages need at least one `<Section inverted>` (deep slate, `texture-dots` and corner glows). No flat, sterile pages. No gradients on large backgrounds.
7. Surfaces: controls `rounded-xl`, cards `rounded-2xl`. Shadows `shadow-sm…xl`, plus `shadow-accent` or `shadow-accent-lg` on primary elements.
8. Buttons: `<Button variant="primary|secondary|ghost|inverted|destructive|link" size="sm|md|lg|xl|icon">`. Arrow icons get `data-arrow`. `sm` (h-9) is for dense desktop only.
9. Forms: `<Field label hint error htmlFor>` wrapping `<Input>` (h-12), `<Select>` or `<Textarea>`.
10. Motion:
    - Entrances: `<Reveal>` or `<RevealGroup>`/`<RevealItem>` (0.7s, 28px, stagger 0.1s, once).
    - Ease `[0.16,1,0.3,1]`, hovers 200–300ms.
    - Continuous: `animate-spin-slow`, `animate-float`, `animate-pulse-dot`.
    - Always respect reduced motion.
11. Responsive: mobile first, hide decorative graphics below `lg`, touch targets at least 44px.
12. Accessibility: WCAG AA, keep `focus-visible:focus-ring`, `aria-label` on icon-only buttons, `aria-hidden` on decoration.

## Page recipes
- **Landing:** Nav → Hero (asymmetric, HeroGraphic lg+) → Logos → Features (interactive cards with IconTile) → Benefits (1.2fr/0.8fr) → How it works (`Steps`, inverted) → Stats + `TestimonialCard` → Pricing (`PricingCard`, middle one `highlighted`) → FAQ (`Accordion`) → Final CTA → Footer.
- **Dashboard:** sidebar and top bar shell, Inter `text-2xl font-semibold` page titles, a KPI row of `Stat` in Cards, a `Table` with `Badge` statuses and row `DropdownMenu`, `Field` forms in Cards, and `Alert`/`Dialog`/`Progress` for feedback. Dense `sm` sizes are allowed on desktop. Use `.dark` on `<html>` for dark mode.

## Before finishing
Check that there are no hex colors, no `bg-accent` used as brand, and no second accent. Confirm the section header pattern, focus rings, 44px targets, layout at 375, 768 and 1280px, and reduced motion.

## Installing this skill
Copy the `skills/aiyo-design/` folder to `~/.claude/skills/aiyo-design/` (all projects) or `<project>/.claude/skills/aiyo-design/` (one project). Claude Code then loads it automatically whenever you build AiYO UI.
