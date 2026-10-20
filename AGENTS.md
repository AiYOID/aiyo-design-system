# AGENTS.md: AiYO Design System

These are instructions for AI coding agents (Claude Code, Codex, Cursor, Copilot…) building UI in **any AiYO project**. AiYO v2 is a brand theme and a set of page blocks on top of **HeroUI v3**. The full spec is in **[DESIGN.md](./DESIGN.md)**. Read it before you build a new screen or component.

## How to work on UI

For UI work: read `DESIGN.md` for direction, then `skills/antislop/SKILL.md` as the filter plus the skill for the task (`skills/antislop-ui/SKILL.md` for visual work), and run its Delivery Gate before delivering. The owner's keep/drop decisions are in DESIGN.md §14. Dials: ENERGY 2 / RHYTHM 2 / MOTION 2.

For HeroUI props and parts that DESIGN.md does not cover, read HeroUI's docs ([llms.txt](https://heroui.com/react/llms.txt); a component page with `.mdx` appended, e.g. `https://heroui.com/en/docs/react/components/table.mdx`) or the types in `node_modules/@heroui/react`. The installed package wins over the docs when they disagree.

## Install into a project

The target project needs React 19, Vite (or another bundler), TypeScript and Tailwind CSS v4 (`@tailwindcss/vite`), with the `@/*` path alias pointing at `src/*`.

1. Install the dependencies:
   ```bash
   npm i @heroui/react @heroui/styles @fontsource-variable/geist @fontsource-variable/geist-mono @gravity-ui/icons
   npm i -D tailwindcss @tailwindcss/vite
   ```
   npm 7+ installs HeroUI's React Aria peers too. If your package manager does not install peers, add `react-aria-components react-aria @react-aria/utils @react-aria/ssr @internationalized/date`.
2. Copy these files from this repo, keeping the same paths:
   - `src/styles/aiyo.css`: the HeroUI theme, Geist, utilities and the touch layer. Import it **once** from the entry CSS or `main.tsx`, and remove any other `@import "tailwindcss"` (it loads Tailwind and HeroUI itself).
   - `src/lib/motion.tsx`: `Reveal`, `RevealGroup`, `RevealItem` (scroll entrances for marketing pages).
   - Only the AiYO blocks you need from `src/components/aiyo/*`. `section.tsx` imports `section-label.tsx`.
   - The `skills/antislop*` folders (the filter), or install them with `npx skills add miqdadbadjuber/anti-slop`.
3. No provider is needed. Mount `<Toast.Provider />` from `@heroui/react` once if you use toasts. For dark mode use HeroUI's `useTheme` (or the AiYO `ThemeToggle`), and copy the inline theme script from this repo's `index.html` so the saved theme applies before first paint.

## Hard rules

1. **Components come from `@heroui/react` (v3).** Do not copy, wrap or fork them, and do not hand-roll a button, field, dialog, menu, tabs or table. Page-level pieces come from `@/components/aiyo/*`.
2. **The brand colour is `accent`** (Electric Blue `#0052FF`; `bg-accent`, `text-accent`). This is HeroUI's naming: there is no `primary` token. Use **one accent colour only**; `success`, `warning` and `danger` are for status only.
3. **Use tokens, not raw values:** `bg-background`, `text-foreground`, `text-muted` (secondary text), `bg-surface`, `bg-default`, `border-separator`, `text-accent`, `text-*-soft-foreground` for status text. No hex codes in components and no pure black.
4. **Theme only through `aiyo.css`.** Never override a HeroUI component's colours or radius on a page. Layout utilities (`className="p-6"`, `w-full`, `gap-3`) are fine. A global HeroUI adjustment goes in `aiyo.css` with a written reason (DESIGN.md §2.8).
5. **Fonts:** Geist Sans for everything; marketing H1/H2 use `heading-hero` / `heading-section`. Labels, stat labels and meta use `label-caps` (Geist Mono 12px uppercase). No other families. Text is at least 12px.
6. **Section structure:** every major marketing section opens with `<SectionHeader label title description>` (SectionLabel → H2 → muted lede).
7. **Layout:** wrap content in `<Container>` (`max-w-6xl`) inside `<Section>` (`py-16 md:py-32`). Use asymmetric grids (`lg:grid-cols-[1.1fr_0.9fr]`) and left-aligned copy rather than centering everything.
8. **Landing pages need at least one inverted section** (`<Section inverted>`): solid deep slate.
9. **Shapes and elevation are HeroUI's:** pill buttons, 12px fields, 24px cards; `shadow-field`, `shadow-surface`, `shadow-overlay`. No other shadows or glows.
10. **Buttons:** HeroUI `<Button>` with `onPress` (not `onClick`). `primary` for the main action, `secondary` / `outline` / `ghost` for the rest, `danger` for destructive. A link that looks like a button is `<Link className={buttonVariants({...})}>`.
11. **Forms:** every control sits in its field: `<TextField><Label/><Input/><Description/><FieldError/></TextField>`, `Select`, `RadioGroup`… Server or cross-field errors go in `<Form validationErrors>`. Checkbox, Radio and Switch always include their `.Content` part.
12. **Collections need ids:** `Tabs.Tab`/`Tabs.Panel`, `ListBox.Item`, `Dropdown.Item` and `Table.Row` get an `id`; list and menu items also get a `textValue`. A Table needs one `isRowHeader` column.
13. **Gradients** only on one headline word (`<GradientText>`, 24px or larger), the one leading `IconTile` in a group, and one data highlight. Never on buttons, cards or page backgrounds.
14. **Motion:** `<Reveal>` / `<RevealGroup>` for marketing entrances (0.7s, 28px, once); HeroUI's built-in motion for everything else. No scroll entrances on app screens. Always respect `prefers-reduced-motion`.
15. **Responsive:** design mobile first. Hide decorative graphics below `lg` (`hidden lg:block`). Touch targets are at least 44px; `aiyo.css` handles HeroUI controls, and custom tappable elements get `min-h-11`.
16. **Accessibility:** meet WCAG AA in light and dark. Keep every focus indicator (HeroUI's ring, the global `:focus-visible` outline). Give icon-only buttons an `aria-label`, put `aria-hidden` on decoration, and never show status by colour alone (Chip and Alert carry a word).
17. **Icons** come from `@gravity-ui/icons`, chosen for relevance. No sparkle, magic, robot or lightning as feature icons.

### Dropped patterns (owner decision, DESIGN.md §14)

18. **No pill section labels and no pulsing dots.** `SectionLabel` is a plain mono label with no border, background or dot. A dot only marks a real live state.
19. **No endless decorative motion.** No floating cards, rotating rings, breathing orbs or pulsing dots. Only loading indicators loop.
20. **No dot-grid textures or blurred glows.** Backdrop blur only on the sticky navbar; Modal and AlertDialog backdrops stay opaque (never `variant="blur"`).
21. **No arrows on buttons by default.** `data-arrow` goes on the ONE primary CTA per screen only.

### App pages (mandatory, see DESIGN.md §13)

22. **App page titles** use `<PageHeader title description back actions>` (`@/components/aiyo/page-header`).
23. **Settings / profile pages** with 3+ sub-sections use **`Tabs variant="secondary"`**, vertical from 768px up (horizontal below), with **one `Card` per tab**. Never stack many cards down one long page.
24. **Every list / data page:** `PageHeader` (primary "Add <Thing>" `Button` with a `Plus` icon in `actions`) → toolbar (`SearchField`, plus filters) → `Table` → `DataPagination` (`@/components/aiyo/data-pagination`).
    - Pagination is **always present**, even with a single page. Default `pageSize` is 10. Pages are 1-based.
    - Reset to page 1 when the search, a filter or the page size changes.
    - Data from an API uses **server-side pagination**: send `page` and `pageSize`, read `total`.
    - Loading, error, first-run and filtered-to-nothing states each show a cause and one next action (`Table.Body renderEmptyState`, skeleton rows, `aria-busy`).
    - Row actions go in a `Dropdown` (an icon-only ghost `Button` with `Ellipsis` and an `aria-label`) in the last column.
25. **Add / edit data:**
    - **Modal** when the form is small: ≤6 fields, one section, no file uploads, no nested line items. `Modal.Footer` with Cancel (`slot="close"`, `secondary`) + Save (primary).
    - **Dedicated page** (`/things/new`, `/things/:id/edit`) when it is large: >6 fields, several sections, file uploads, nested line items or tables, or a shareable URL. Build it with `PageHeader` with `back` → `FormSection` blocks → `FormActions`.
    - The same rule applies to edit. **Delete always confirms** in an `AlertDialog` with a `danger` button.

The showcase site runs a settings page, a list page and a create page in its **App patterns** section (`#app-patterns`).

## Before you finish a UI task

- [ ] Every component comes from `@heroui/react` or `@/components/aiyo`; nothing is copied, wrapped or hand-rolled.
- [ ] No hex colours, no `primary` token, no second accent; status text uses `-soft-foreground`.
- [ ] Geist only; marketing headings use `heading-hero` / `heading-section`; labels use `label-caps`; no text under 12px.
- [ ] No pill labels, pulsing dots, looping decoration, dot grids or glows; at most one `data-arrow` button per screen; blur only on the navbar.
- [ ] HeroUI events (`onPress`, `onAction`) and ids on every collection item.
- [ ] Every interactive element has a visible focus indicator and a 44px touch target.
- [ ] The layout works at 375px, 768px and 1280px, in light and dark.
- [ ] Reduced motion is respected.
- [ ] App pages: `PageHeader`; settings with 3+ sections use secondary Tabs; every list has search, Table, loading / error / empty states and `DataPagination`; small forms in a Modal, large forms on their own page; delete is confirmed in an AlertDialog.
- [ ] The antislop Delivery Gate passes, with evidence.

---

## Snippet for your project's `CLAUDE.md` / `AGENTS.md`

Copy the `skills/antislop*` folders from this repo into your project too (or install them with `npx skills add miqdadbadjuber/anti-slop`), then paste this into any AiYO project:

```md
## UI / Design system
This project uses the **AiYO Design System v2**: HeroUI v3 components with the AiYO theme.
Spec: https://aiyoid.github.io/aiyo-design-system/DESIGN.md
(LLM index: https://aiyoid.github.io/aiyo-design-system/llms.txt, tokens: https://aiyoid.github.io/aiyo-design-system/aiyo.tokens.json).
HeroUI API: https://heroui.com/react/llms.txt (component pages: https://heroui.com/en/docs/react/components/<name>.mdx).

- For UI work: read DESIGN.md for direction, then `skills/antislop/SKILL.md` as the filter plus the skill for the task,
  and run its Delivery Gate before delivering. Dials: ENERGY 2 / RHYTHM 2 / MOTION 2.
- Components come from `@heroui/react` (v3), used directly: no copies, no wrappers, no hand-rolled controls.
  AiYO blocks come from `src/components/aiyo/*`; scroll entrances from `src/lib/motion.tsx`; the theme is `src/styles/aiyo.css`.
- Brand = `accent` (Electric Blue #0052FF, HeroUI naming; there is no `primary` token). One accent colour only.
- Tokens only: `bg-background`, `text-foreground`, `text-muted`, `bg-surface`, `bg-default`, `border-separator`, `text-accent`;
  status text uses `text-success-soft-foreground` / `text-warning-soft-foreground` / `text-danger-soft-foreground`. No raw hex.
- Never restyle HeroUI colours or radii per page; theme changes go in aiyo.css with a reason.
- Geist only: `heading-hero` / `heading-section` for marketing H1/H2, `label-caps` (Geist Mono) for labels. Text ≥ 12px.
- Every section: SectionHeader (plain mono label, no pill, no dot) → H2 → lede. Container `max-w-6xl`, asymmetric grids,
  at least one solid inverted section per landing page. No dot grids, no glows, blur only on the navbar.
- HeroUI events: `onPress` / `onAction`; ids (and `textValue`) on Tabs, ListBox, Dropdown and Table items.
- Gradient only on one headline word, the leading IconTile and one data highlight. Icons from `@gravity-ui/icons`.
- Motion: `<Reveal>` for marketing entrances, HeroUI motion for controls, no loops, respect prefers-reduced-motion.
  `data-arrow` only on the one primary CTA per screen.
- WCAG AA in light and dark, visible focus everywhere, 44px touch targets (aiyo.css handles HeroUI controls).
- App pages: `<PageHeader>`. Settings with 3+ sub-sections → `Tabs variant="secondary"`, vertical on md+, one Card per tab.
- Every list page: PageHeader + "Add <Thing>" → SearchField/filters → Table (row actions in a Dropdown, loading / error / empty states)
  → `DataPagination` (always shown, pageSize 10, reset to page 1 on search/filter/size change, server-side for API data).
- Add/edit: Modal for ≤6 fields in one section; otherwise a dedicated page (PageHeader `back` → FormSection → FormActions).
  Delete always confirms in an AlertDialog with a `danger` button.
```

## antislop
For UI, copy, people, mobile layout, or code comments work, read `skills/antislop/SKILL.md` (core) and then the skill for the task:
- UI / visual: `skills/antislop-ui/SKILL.md`
- Copy & text: `skills/antislop-copywriting/SKILL.md`
- People: `skills/antislop-human/SKILL.md`
- Mobile / responsive: `skills/antislop-layoutmobile/SKILL.md`
- Code comments: `skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: download `skills/antislop/SKILL.md` again, or run `npx antislop-ai --update` if it was installed as skill folders.
