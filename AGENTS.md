# AGENTS.md: AiYO Design System

These are instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot…) building UI in **any AiYO project**. The full spec is in **[DESIGN.md](./DESIGN.md)**. Read it before you build a new screen or component.

## Install into a project

The target project needs React 19, Vite, TypeScript and Tailwind CSS v4 (`@tailwindcss/vite`), with the `@/*` path alias pointing at `src/*`.

1. Copy these files from this repo, keeping the same paths:
   - `src/styles/aiyo.css`: all tokens, fonts, utilities and keyframes. Import it **once** from the entry CSS or `main.tsx`, and remove any other `@import "tailwindcss"`.
   - `src/lib/utils.ts`: `cn()`.
   - `src/lib/motion.tsx`: `easeOut`, `fadeInUp`, `Reveal`, `RevealGroup`, `RevealItem`…
   - Only the components you need from `src/components/ui/*` and `src/components/blocks/*`. Some components import `./input` or `./label`, so copy those too.
2. Install the dependencies:
   ```bash
   npm i class-variance-authority clsx tailwind-merge radix-ui lucide-react motion
   npm i -D tailwindcss @tailwindcss/vite
   ```
3. Wrap the app in `<TooltipProvider>` if you use tooltips. Add `class="dark"` on `<html>` for dark mode.

## Hard rules

1. **The brand color is `primary`** (Electric Blue `#0052FF → #4D7CFF`, `bg-gradient-primary`). **`accent` is NOT the brand.** It is the shadcn hover surface (`#F1F5F9`). Never use `bg-accent` for brand.
2. **Use one accent color only.** Do not introduce purple, teal or any other second accent. `success`, `warning`, `destructive` and `info` are for status only.
3. **Use tokens, not raw values.** Write `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`. No hex codes in components and no pure black text.
4. **Fonts:** Calistoga (`font-display`, normal weight) only for H1/H2 and stat numerals. Inter for everything else. JetBrains Mono (`font-mono text-xs uppercase tracking-[0.15em]`) for section labels, badges and table heads.
5. **Section structure:** every major section opens with `SectionLabel` → Calistoga H2 → muted lede, using `<SectionHeader>`.
6. **Layout:** wrap content in `max-w-6xl` (`<Container>`) with section padding `py-24 md:py-32`. Use asymmetric grids (`lg:grid-cols-[1.1fr_0.9fr]`) and left-aligned copy rather than centering everything.
7. **Landing pages need at least one inverted section** (`<Section inverted>` or `.inverted`) with `texture-dots` and corner glows. Avoid flat, texture-less pages.
8. **Shapes:** controls `rounded-xl` (12px), cards and dialogs `rounded-2xl` (16px). Soft neutral shadows (`shadow-sm…xl`), plus `shadow-accent` or `shadow-accent-lg` for primary elements only.
9. **Buttons:** reuse `<Button>`. Don't hand-roll buttons. Primary is the gradient. Sizes: `md` h-11 by default, `lg` or `xl` for hero CTAs, `sm` h-9 only on dense desktop UIs. Arrow icons get `data-arrow`.
10. **Forms:** inputs are h-12 by default. Wrap each control in `<Field label hint error htmlFor>`.
11. **Gradients** go on buttons, icon tiles, small fills and one headline word (`<GradientText>`). Never on large body or page backgrounds.
12. **Motion:** ease `[0.16,1,0.3,1]`. Entrances use `<Reveal>` / `<RevealGroup>` (0.7s, 28px, stagger 0.1s, once). Hovers take 200–300ms. Always respect `prefers-reduced-motion`.
13. **Responsive:** design mobile first. Hide decorative graphics below `lg` (`hidden lg:block`). Touch targets must be at least 44px.
14. **Accessibility:** meet WCAG AA. Keep the `focus-visible:focus-ring` on everything interactive, give icon-only buttons an `aria-label`, and put `aria-hidden` on decoration.
15. **Extend, don't fork.** Add variants with `cva` in the component file and merge classes with `cn()`. Don't override tokens per page.

### App pages (mandatory, see DESIGN.md §13)

16. **App page titles** use `<PageHeader title description back actions>` (`@/components/blocks/page-header`): Inter semibold 2xl/3xl. Calistoga stays for marketing H1/H2.
17. **Settings / profile pages** with 3+ sub-sections (password, address, notifications…) use **vertical `Tabs`** (`orientation="vertical"`) with **one `Card` per tab**. Never stack many cards down one long page.
18. **Every list / data page:** `PageHeader` (primary "Add <Thing>" button with a `Plus` icon in `actions`) → toolbar (search `Input` with a `Search` icon, plus filters) → `Table` → `Pagination` (`@/components/ui/pagination`).
    - Pagination is **always present**, even with a single page. Default `pageSize` is 10. Pages are 1-based.
    - Reset to page 1 when the search, a filter or the page size changes.
    - Data from an API uses **server-side pagination**: send `page` and `pageSize`, read `total`.
    - Show an empty-state row or card when there are no results.
    - Row actions go in a `DropdownMenu` (icon button with `MoreHorizontal` and an `aria-label`) in the last column.
19. **Add / edit data:**
    - **Dialog** when the form is small: ≤6 fields, one section, no file uploads, no nested line items. `DialogFooter` with Cancel (`secondary`) + Save (primary).
    - **Dedicated page** (`/things/new`, `/things/:id/edit`) when it is large: >6 fields, multiple sections, file uploads, nested line items or tables, or a shareable URL. Build it with `PageHeader` with `back` → `FormSection` blocks → `FormActions`.
    - The same rule applies to edit. **Delete always confirms** in a `Dialog` with a `destructive` button.

The showcase site demos a settings page, a list page and a create page in its **App Patterns** section (`#app-patterns`).

## Before you finish a UI task

- [ ] There are no hex colors, no `bg-accent` used as brand, and no second accent.
- [ ] Headline fonts and the section header pattern are correct.
- [ ] Every interactive element has a focus ring and a target of at least 44px.
- [ ] The layout works at 375px, 768px and 1280px.
- [ ] Reduced motion is respected.
- [ ] App pages: `PageHeader`; settings with 3+ sections use vertical Tabs; every list has search, Table, empty state and `Pagination`; small forms in a Dialog, large forms on their own page; delete is confirmed.

---

## Snippet for your project's `CLAUDE.md` / `AGENTS.md`

Paste this into any AiYO project:

```md
## UI / Design system
This project uses the **AiYO Design System** ("Minimalist Modern"). Spec: https://aiyoid.github.io/aiyo-design-system/DESIGN.md
(LLM index: https://aiyoid.github.io/aiyo-design-system/llms.txt, tokens: https://aiyoid.github.io/aiyo-design-system/aiyo.tokens.json).

- Tokens live in `src/styles/aiyo.css`; components in `src/components/ui/*` (shadcn-style, `cn()` from `@/lib/utils`);
  motion helpers in `src/lib/motion.tsx`. Reuse these before writing new UI.
- Brand = `primary` (Electric Blue gradient `bg-gradient-primary`). `accent` is only the hover surface — never brand.
- One accent color only. No raw hex, no pure black; use `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`.
- Calistoga (`font-display`) only for H1/H2; Inter for UI/body; JetBrains Mono uppercase 0.15em for labels.
- Every section: SectionLabel → Calistoga H2 → muted lede. Container `max-w-6xl`, sections `py-24 md:py-32`, asymmetric grids.
- Controls `rounded-xl`, cards `rounded-2xl`; inputs h-12; buttons h-11+ (h-9 only dense desktop); touch targets ≥ 44px.
- Motion: ease [0.16,1,0.3,1], `<Reveal>`/`<RevealGroup>` entrances, 200–300ms hovers, respect prefers-reduced-motion.
- WCAG AA, visible `focus-visible:focus-ring`, hide decorative graphics below `lg`.
- App pages: `<PageHeader>` (Inter titles, not Calistoga). Settings with 3+ sub-sections → vertical `Tabs`, one Card per tab.
- Every list page: PageHeader + "Add <Thing>" → search/filters → Table (row actions in a `DropdownMenu`, empty state) → `Pagination`
  (always shown, pageSize 10, reset to page 1 on search/filter/size change, server-side when data comes from an API).
- Add/edit: Dialog for ≤6 fields in one section; otherwise a dedicated page (PageHeader `back` → FormSection → FormActions).
  Delete always confirms in a Dialog with a `destructive` button.
```

