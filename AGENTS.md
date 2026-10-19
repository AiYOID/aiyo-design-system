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

## Before you finish a UI task

- [ ] There are no hex colors, no `bg-accent` used as brand, and no second accent.
- [ ] Headline fonts and the section header pattern are correct.
- [ ] Every interactive element has a focus ring and a target of at least 44px.
- [ ] The layout works at 375px, 768px and 1280px.
- [ ] Reduced motion is respected.

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
```

Replace `https://aiyoid.github.io/aiyo-design-system` with the GitHub Pages URL of the showcase site.
