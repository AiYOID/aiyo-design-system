# AiYO Design System: "Minimalist Modern"

This is the full spec for the AiYO Design System. It is written for AI coding agents and for people. Where it disagrees with the code, the code wins: `src/styles/aiyo.css` holds the tokens, `src/components/ui/*` the components, `src/components/blocks/*` the page blocks and `src/lib/motion.tsx` the motion helpers.

- **Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui conventions (`cva`, `cn` from tailwind-merge, `radix-ui`, `lucide-react`) and `motion` (`motion/react`).
- **Distribution:** components are copied into your project, shadcn style, and imported via the alias `@/components/ui/*`.
- **Machine-readable tokens:** `tokens/aiyo.tokens.json` (W3C DTCG format).

---

## 1. Philosophy

> **Structure gives clarity. Bold details give character.** Use few elements and execute each with confidence.

- **One accent:** the Electric Blue gradient `#0052FF → #4D7CFF`. Everything else is slate and white.
- **Three typefaces, each with one job:** Calistoga for display headlines, Inter for all UI and body text, and JetBrains Mono for labels.
- **Generous space and asymmetric grids.** Every landing page needs at least one deep-slate *inverted* section.
- **Surfaces are never flat.** Add subtle texture (dot grids, corner glows) and soft layered shadows.
- **Motion is quiet and purposeful.** Every animation uses the ease `cubic-bezier(0.16, 1, 0.3, 1)` and respects `prefers-reduced-motion`.

---

## 2. Tokens

### 2.1 Naming: read this first

| Concept in the design language | Token / Tailwind name | Notes |
|---|---|---|
| Brand accent (Electric Blue) | **`primary`**, `primary-end` | shadcn naming. Use `bg-primary`, `text-primary`, `bg-gradient-primary`. |
| Subtle hover surface | `accent` | shadcn meaning (`#F1F5F9`). **Never use `bg-accent` for brand.** |
| Status colors | `success`, `warning`, `destructive`, `info` | AiYO extension for app UIs. |

### 2.2 Colors: light (default, `:root`)

| Token | Value | Tailwind | Use |
|---|---|---|---|
| `--background` | `#FAFAFA` | `bg-background` | Page background |
| `--foreground` | `#0F172A` | `text-foreground` | Body and headline text (never pure black) |
| `--card` / `--popover` | `#FFFFFF` | `bg-card`, `bg-popover` | Cards, menus, dialogs |
| `--card-foreground` / `--popover-foreground` | `#0F172A` | `text-card-foreground` | |
| `--primary` | `#0052FF` | `bg-primary`, `text-primary`, `border-primary` | Brand, links, focus |
| `--primary-end` | `#4D7CFF` | `to-primary-end` | Gradient endpoint |
| `--primary-foreground` | `#FFFFFF` | `text-primary-foreground` | Text on primary |
| `--secondary` | `#F1F5F9` | `bg-secondary` | Secondary fills |
| `--muted` | `#F1F5F9` | `bg-muted` | Quiet fills, tracks, table head |
| `--muted-foreground` | `#64748B` | `text-muted-foreground` | Ledes, helper text, captions |
| `--accent` | `#F1F5F9` | `bg-accent` | Hover surface only |
| `--border` | `#E2E8F0` | `border-border` | All hairlines (the default border color) |
| `--input` | `#E2E8F0` | `border-input` | Control borders |
| `--ring` | `#0052FF` | `ring-ring` / `focus-ring` | Focus indicator |
| `--success` | `#059669` | `bg-success`, `text-success` | Positive status |
| `--warning` | `#D97706` | `text-warning` | Caution |
| `--destructive` | `#DC2626` | `bg-destructive`, `text-destructive` | Errors, delete |
| `--info` | `#0052FF` | `text-info` | Informational |
| `*-foreground` (status) | `#FFFFFF` | `text-success-foreground`, … | Text on solid status fills |

### 2.3 Colors: inverted / dark (`.inverted`, `.dark`)

Put `.inverted` on a section, or use `<Section inverted>`, to flip that subtree to deep slate. `.dark` uses the same palette for apps that want a full dark mode. Components only read the variables, so they re-theme automatically. The Tailwind `dark:` variant matches both `.dark` and `.inverted`.

| Token | Value |
|---|---|
| `--background` | `#0F172A` |
| `--foreground` | `#F8FAFC` |
| `--card` / `--popover` / `--secondary` / `--muted` / `--accent` | `#1E293B` |
| `--muted-foreground` | `#94A3B8` |
| `--primary` | `#3B72FF` (lighter, for AA on slate) |
| `--primary-end` / `--ring` / `--info` | `#6B93FF` |
| `--border` | `rgb(255 255 255 / 0.10)` |
| `--input` | `rgb(255 255 255 / 0.14)` |
| `--success` / `--warning` / `--destructive` | `#10B981` / `#F59E0B` / `#EF4444` |

### 2.4 Gradients and signature utilities

| Utility | What it does |
|---|---|
| `bg-gradient-primary` | `linear-gradient(to right, primary, primary-end)`: buttons, switches, progress, badges |
| `bg-gradient-primary-diagonal` | Same gradient at 135°: icon tiles, avatars, checkboxes |
| `text-gradient` | Paints text with the gradient. Prefer the `<GradientText>` component. |
| `texture-dots` | White 1px dot grid, 32px spacing, 3% opacity. For inverted sections. |
| `texture-dots-dark` | Slate dot grid, 24px spacing, 6% opacity. For light sections. |
| `focus-ring` | `0 0 0 2px background, 0 0 0 4px ring`. Use it as `focus-visible:focus-ring`. |

### 2.5 Radius (`--radius: 0.75rem`)

| Class | Value | Use |
|---|---|---|
| `rounded-sm` | 6px | Tiny chips |
| `rounded-md` | 8px | Checkbox, kbd |
| `rounded-lg` | 10px | Small controls (`sm` size), menu items, tab triggers |
| **`rounded-xl`** | **12px** | **Default for buttons, inputs, selects, alerts and popovers** |
| **`rounded-2xl`** | **16px** | **Cards, dialogs, tables** |
| `rounded-3xl` | 24px | Large showcase panels, hero graphics |
| `rounded-full` | pill | Badges, section labels, avatars, switches |

### 2.6 Shadows

| Class | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgb(0 0 0/.06)` | Controls, resting buttons |
| `shadow-md` | `0 4px 6px rgb(0 0 0/.07)` | Default cards |
| `shadow-lg` | `0 10px 15px rgb(0 0 0/.08)` | Raised elements, tooltips |
| `shadow-xl` | `0 20px 25px rgb(0 0 0/.10)` | Hovered cards, dialogs, menus |
| `shadow-accent` | `0 4px 14px rgb(0 82 255/.25)` | Primary-tinted resting lift (gradient icon tiles, badges) |
| `shadow-accent-lg` | `0 8px 24px rgb(0 82 255/.35)` | Primary button hover, featured card |

### 2.7 Fonts

| Token | Stack | Tailwind |
|---|---|---|
| `--font-display` | `"Calistoga", Georgia, serif` | `font-display` |
| `--font-sans` | `"Inter", ui-sans-serif, system-ui, sans-serif` | `font-sans` (body default) |
| `--font-mono` | `"JetBrains Mono", ui-monospace, monospace` | `font-mono` |

`aiyo.css` loads all three from Google Fonts: Calistoga, Inter 400/500/600/700, and JetBrains Mono 400/500.

---

## 3. Typography

| Role | Font | Classes |
|---|---|---|
| **Hero H1** | Calistoga, normal weight | `font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]`. Put the last word in `<GradientText underline>`. |
| **Section H2** | Calistoga | `font-display text-[2.25rem] leading-[1.15] tracking-[-0.02em] md:text-[3.25rem]` |
| H3 / card title | Inter semibold | `text-lg md:text-xl font-semibold tracking-[-0.01em] leading-snug` |
| Lede | Inter | `text-base md:text-lg leading-relaxed text-muted-foreground` (1.625 to 1.75) |
| Body | Inter | `text-base leading-relaxed` |
| Small / helper | Inter | `text-sm text-muted-foreground` |
| **Section label / badge / table head** | JetBrains Mono | `font-mono text-xs uppercase tracking-[0.15em]` (11px inside menus and tables) |
| Stat numeral | Calistoga | `font-display text-4xl md:text-5xl leading-none tracking-[-0.02em]` (the only display use outside h1/h2) |

Rules:
- Use Calistoga only for H1, H2 and big stat numerals. Always at normal weight, never bold, never in body text or UI controls.
- Limit gradient text to one word or short phrase per headline.
- Keep line length to about 65ch for body text (`max-w-2xl` for ledes).

---

## 4. Layout

| Rule | Value |
|---|---|
| Container | `mx-auto w-full max-w-6xl px-5 sm:px-8` (`<Container>`) |
| Section padding | `py-24 md:py-32` by default. `py-28 md:py-44` for hero and showcase sections (`<Section spacing="lg">`). `py-16 md:py-20` when compact (`spacing="sm"`). |
| Section header to content | `mb-12 md:mb-16` |
| Grid gaps | `gap-5` (dense cards) to `gap-8` (feature columns) |
| Hero grid | `lg:grid-cols-[1.1fr_0.9fr]`: copy left, graphic right |
| Benefits grid | `lg:grid-cols-[1.2fr_0.8fr]` |
| Feature grid | `sm:grid-cols-2 lg:grid-cols-3` |
| Alignment | Left-aligned by default. Center only short CTA blocks or pricing headers. |
| Inverted section | At least one per landing page: `<Section inverted>` with `texture-dots` and two corner `<Glow>`s |

---

## 5. Surfaces

| Surface | Recipe |
|---|---|
| Page | `bg-background` (#FAFAFA) |
| Card | `<Card>`: `rounded-2xl border bg-card shadow-md` |
| Interactive card | `<Card variant="interactive">`: lifts `-translate-y-1` with `shadow-xl` and a faint primary wash on hover |
| Featured card | `<Card featured>`: 2px gradient stroke and `shadow-accent-lg` |
| Inverted section | `.inverted` gives slate-900 bg plus an `absolute inset-0 texture-dots` layer plus corner glows (`<Glow>`) |
| Light texture | Optionally put `texture-dots-dark` behind hero graphics |
| Glow | `<Glow className="-left-40 -top-40 opacity-[0.18]" />`: a 480px primary orb blurred 150px, placed in a corner. Decorative and `aria-hidden`. |
| Testimonial | `<TestimonialCard>`: card with a gradient top bar and a large gradient quote mark |

---

## 6. Components (`@/components/ui/*`)

All components set `data-slot`, accept `className` (merged with `cn`) and forward native props.

### Button: `@/components/ui/button`
| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` (gradient) · `secondary` (outline) · `ghost` · `inverted` (foreground fill) · `destructive` · `link` | `primary` |
| `size` | `sm` h-9 (dense desktop only) · `md` h-11 · `lg` h-12 · `xl` h-14 · `icon` 44px · `icon-sm` 36px | `md` |
| `asChild` | Renders the child (for example `<a>`) through Radix Slot | `false` |

Primary hover adds `-translate-y-0.5`, `shadow-accent-lg` and `brightness-110`. Active adds `scale-[0.98]`. An icon with `data-arrow` slides right on hover.
```tsx
import { ArrowRight } from "lucide-react"
<Button size="lg">Get started <ArrowRight data-arrow /></Button>
<Button variant="secondary" size="lg">Book a demo</Button>
<Button asChild variant="link"><a href="/docs">Read the docs</a></Button>
```

### Badge: `@/components/ui/badge`
`variant`: `neutral` · `primary` (gradient) · `soft` · `outline` · `success` · `warning` · `destructive`. `size`: `sm` · `md`. Also supports `asChild`.
```tsx
<Badge variant="soft">New</Badge>  <Badge variant="success">Active</Badge>
```

### SectionLabel: `@/components/ui/section-label`
A pill with a primary dot and uppercase mono text. Opens every major section. Set `pulse` for "live" or "new".
```tsx
<SectionLabel pulse>Now in beta</SectionLabel>
```

### GradientText: `@/components/ui/gradient-text`
Paints text with the gradient. Set `underline` to add the soft gradient bar, which is reserved for the hero.
```tsx
<h1 className="font-display …">Ship faster with <GradientText underline>AiYO</GradientText></h1>
```

### IconTile: `@/components/ui/icon-tile`
`variant`: `gradient` (default) · `soft` · `muted`. `size`: `sm` 36px · `md` 48px · `lg` 56px. It scales up 110% on `group-hover`.
```tsx
<IconTile><Zap /></IconTile>
```

### Card: `@/components/ui/card`
Exports `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter`. `variant`: `default` · `elevated` · `flat` · `interactive`. Set `featured` for the gradient stroke.
```tsx
<Card variant="interactive">
  <CardHeader><IconTile><Zap /></IconTile><CardTitle>Fast</CardTitle>
    <CardDescription>Under 50ms p95.</CardDescription></CardHeader>
</Card>
```

### Input / Textarea: `@/components/ui/input`, `@/components/ui/textarea`
Input `size`: `sm` h-9 · `md` h-12 (default) · `lg` h-14. Both share `fieldControl`: `rounded-xl`, a primary border on focus plus `focus-ring`, and a destructive style under `aria-invalid`. `inputVariants` and `fieldControl` are also exported.
```tsx
<Input type="email" placeholder="you@company.com" />
<Textarea rows={4} />
```

### Label / Field: `@/components/ui/label`, `@/components/ui/field`
`Field` stacks a label, the control and a hint or error, and wires up `aria-describedby` and `aria-invalid`. Props: `label`, `hint`, `error`, `htmlFor`, `required`.
```tsx
<Field label="Email" htmlFor="email" hint="We never share it." required>
  <Input id="email" type="email" />
</Field>
```

### Select: `@/components/ui/select`
Exports `Select`, `SelectTrigger` (`size` `sm|md|lg`), `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel` and `SelectItem`.
```tsx
<Select defaultValue="pro">
  <SelectTrigger><SelectValue placeholder="Plan" /></SelectTrigger>
  <SelectContent><SelectItem value="free">Free</SelectItem><SelectItem value="pro">Pro</SelectItem></SelectContent>
</Select>
```

### Checkbox / RadioGroup / Switch
Import paths: `@/components/ui/checkbox`, `@/components/ui/radio-group` (`RadioGroup`, `RadioGroupItem`) and `@/components/ui/switch`. When checked they fill with the gradient. Pair each with a `Label` and give the row `min-h-11` for touch.
```tsx
<div className="flex items-center gap-3"><Checkbox id="t" /><Label htmlFor="t">Accept terms</Label></div>
<RadioGroup defaultValue="m"><div className="flex items-center gap-3"><RadioGroupItem value="m" id="m" /><Label htmlFor="m">Monthly</Label></div></RadioGroup>
<Switch defaultChecked aria-label="Notifications" />
```

### Tabs: `@/components/ui/tabs`
Exports `Tabs`, `TabsList` (muted pill track), `TabsTrigger` (the active one gets a card fill with `shadow-sm`) and `TabsContent`.
```tsx
<Tabs defaultValue="a"><TabsList><TabsTrigger value="a">Overview</TabsTrigger><TabsTrigger value="b">API</TabsTrigger></TabsList>
<TabsContent value="a">…</TabsContent></Tabs>
```

### Accordion: `@/components/ui/accordion`
Exports `Accordion`, `AccordionItem`, `AccordionTrigger` (a plus icon that rotates 45° and fills with the gradient when open) and `AccordionContent`. Use it for FAQs.
```tsx
<Accordion type="single" collapsible><AccordionItem value="1">
  <AccordionTrigger>Is there a free plan?</AccordionTrigger><AccordionContent>Yes.</AccordionContent>
</AccordionItem></Accordion>
```

### Dialog: `@/components/ui/dialog`
Exports `Dialog`, `DialogTrigger`, `DialogContent` (`showClose` defaults to true), `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` and `DialogClose`. It uses a blurred `foreground/40` overlay, `rounded-2xl` and the `pop-in` animation.
```tsx
<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent><DialogHeader><DialogTitle>Invite</DialogTitle><DialogDescription>…</DialogDescription></DialogHeader>
  <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button>Send</Button></DialogFooter></DialogContent>
</Dialog>
```

### Tooltip: `@/components/ui/tooltip`
Exports `TooltipProvider` (150ms delay; wrap the app in it once), `Tooltip`, `TooltipTrigger` and `TooltipContent`. The tooltip is always slate-900.
```tsx
<Tooltip><TooltipTrigger asChild><Button size="icon" variant="ghost" aria-label="Copy"><Copy /></Button></TooltipTrigger>
<TooltipContent>Copy</TooltipContent></Tooltip>
```

### DropdownMenu: `@/components/ui/dropdown-menu`
Exports `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` (`variant` `default|destructive`), `DropdownMenuLabel` (mono), `DropdownMenuSeparator`, `DropdownMenuShortcut` and `DropdownMenuGroup`.
```tsx
<DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
<DropdownMenuContent><DropdownMenuItem><Pencil />Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
<DropdownMenuSeparator /><DropdownMenuItem variant="destructive"><Trash2 />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
```

### Alert: `@/components/ui/alert`
Exports `Alert`, `AlertTitle` and `AlertDescription`. `variant`: `info` (gradient bar) · `success` · `warning` · `destructive`. It is a card with a 3px colored bar on the left, and an optional leading icon.
```tsx
<Alert variant="success"><CircleCheck /><AlertTitle>Saved</AlertTitle><AlertDescription>Changes are live.</AlertDescription></Alert>
```

### Avatar: `@/components/ui/avatar`
Exports `Avatar` (size-10 by default), `AvatarImage`, `AvatarFallback` (initials on the gradient) and `AvatarGroup` (overlapping `-space-x-3`).
```tsx
<AvatarGroup><Avatar><AvatarImage src={url} alt="Ana" /><AvatarFallback>AN</AvatarFallback></Avatar></AvatarGroup>
```

### Progress: `@/components/ui/progress`
A gradient bar on a muted track, h-2. Takes `value` from 0 to 100.
```tsx
<Progress value={64} aria-label="Upload progress" />
```

### Table: `@/components/ui/table`
Exports `Table` (wrapped in a `rounded-2xl` card), `TableHeader`, `TableBody`, `TableRow` (primary tint on hover, `data-state=selected`), `TableHead` (mono uppercase), `TableCell` and `TableCaption`.
```tsx
<Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
<TableBody><TableRow><TableCell>Acme</TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow></TableBody></Table>
```

### Skeleton / Separator / Kbd / Spinner
| Component | Import | Notes |
|---|---|---|
| `Skeleton` | `@/components/ui/skeleton` | `animate-pulse rounded-lg bg-muted`. You set the size. |
| `Separator` | `@/components/ui/separator` | `orientation` `horizontal|vertical`, `decorative` |
| `Kbd` | `@/components/ui/kbd` | Mono key cap with a 2px bottom border |
| `Spinner` | `@/components/ui/spinner` | Lucide `LoaderCircle` with `role="status"`. Size it with `className="size-5"`. |
```tsx
<Skeleton className="h-4 w-40" /> <Separator /> <Kbd>⌘</Kbd><Kbd>K</Kbd> <Button disabled><Spinner />Saving</Button>
```

### Stat: `@/components/ui/stat`
Props: `label`, `value`, `trend` (for example `"+12.4%"`), `trendDirection` `up|down`, `hint`. It shows a mono label, a Calistoga numeral and a trend pill (gradient when up, destructive when down).
```tsx
<Stat label="Monthly revenue" value="$48.2k" trend="+12.4%" hint="vs. last month" />
```

---

## 7. Blocks and patterns (`@/components/blocks/*`)

The blocks are page-level compositions built from the UI components. `Container`, `Section`, `SectionHeader` and `Glow` all live in `section.tsx`.

| Block | Import | Props / purpose |
|---|---|---|
| `Container` | `@/components/blocks/section` | `mx-auto w-full max-w-6xl px-5 sm:px-8` content column |
| `Section` | `@/components/blocks/section` | `spacing`: `default` (`py-24 md:py-32`) · `lg` (`py-28 md:py-44`, for hero and showcase sections) · `sm` (`py-16 md:py-20`). Set `inverted` for deep slate with `texture-dots` and two corner Glows. Base classes: `relative isolate overflow-hidden`. |
| `SectionHeader` | `@/components/blocks/section` | `label`, `pulse`, `title` (Calistoga H2), `description` (muted lede), `align` (`left` by default, or `center`) |
| `Glow` | `@/components/blocks/section` | A 480px primary orb (`bg-primary opacity-[0.06] blur-[150px]`, absolute, `aria-hidden`). Position and strength go in `className`. |
| `HeroGraphic` | `@/components/blocks/hero-graphic` | Animated hero visual: 60s ring, floating cards (4–5s, ±10px) and a pulse dot. Use `className="hidden lg:block"`. |
| `Steps` | `@/components/blocks/steps` | `steps: { title, description }[]`. A "how it works" list: stacked on mobile, a horizontal row with gradient arrow connectors on md and up. |
| `PricingCard` | `@/components/blocks/pricing-card` | `name`, `price`, `period?`, `description`, `features: string[]`, `cta`. Set `highlighted` for the gradient stroke, a lift and a primary CTA. |
| `TestimonialCard` | `@/components/blocks/testimonial-card` | `quote`, `name`, `role`. Has a gradient top bar, a large gradient quote mark and an initials avatar. |

```tsx
<Steps steps={[{ title: "Connect", description: "Link your data." }, { title: "Automate", description: "Set rules once." }]} />
<PricingCard name="Pro" price="$29" period="/mo" description="For growing teams" features={["Unlimited projects"]} cta="Start trial" highlighted />
<TestimonialCard quote="It just works." name="Ana Putri" role="CTO, Acme" />
```

### Section header pattern (required for every major section)
```tsx
<Section id="features">
  <Container>
    <SectionHeader
      label="Features"
      title={<>Everything you need to <GradientText>ship</GradientText></>}
      description="One sentence on why this matters, in muted text."
    />
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map(f => (
        <RevealItem key={f.title}>
          <Card variant="interactive"><CardHeader><IconTile>{f.icon}</IconTile>
            <CardTitle>{f.title}</CardTitle><CardDescription>{f.body}</CardDescription></CardHeader></Card>
        </RevealItem>
      ))}
    </RevealGroup>
  </Container>
</Section>
```

### Hero pattern
```tsx
<Section spacing="lg">
  <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
    <Reveal className="flex flex-col items-start gap-8">
      <SectionLabel pulse>Now available</SectionLabel>
      <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]">
        Work that runs <GradientText underline>itself</GradientText>
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Lede…</p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg">Start free <ArrowRight data-arrow /></Button>
        <Button size="lg" variant="secondary">Book a demo</Button>
      </div>
    </Reveal>
    <HeroGraphic className="hidden lg:block" />
  </Container>
</Section>
```

### Inverted section
```tsx
<Section inverted>
  <Container>
    <SectionHeader label="How it works" title="Three steps to live" description="…" />
    <Steps className="mt-12 md:mt-16" steps={steps} />
  </Container>
</Section>
```
This is the manual equivalent of `<Section inverted>`:
```tsx
<section className="inverted relative isolate overflow-hidden py-24 md:py-32">
  <div aria-hidden className="texture-dots pointer-events-none absolute inset-0 -z-10" />
  <Glow className="-left-40 -top-40 -z-10 opacity-[0.18]" />
  <Glow className="-bottom-48 -right-40 -z-10 opacity-[0.12]" />
  <Container>…</Container>
</section>
```

---

## 8. Motion (`@/lib/motion`)

| Export | Value |
|---|---|
| `easeOut` | `[0.16, 1, 0.3, 1]` (also the CSS `ease-out-expo`) |
| `fadeInUp` | `y: 28 → 0`, opacity `0 → 1`, 0.7s |
| `fadeIn` | Opacity only, 0.7s |
| `stagger` | `staggerChildren: 0.1`, `delayChildren: 0.1` |
| `viewport` | `{ once: true, amount: 0.15, margin: "-60px" }` |
| `<Reveal>` | One element fades up when it enters the viewport. Accepts `variants`. |
| `<RevealGroup>` + `<RevealItem>` | Staggered children |

All three render a plain `<div>` when the user prefers reduced motion.

| Kind | Duration | Implementation |
|---|---|---|
| Entrance | 0.7s, 28px, stagger 0.1s, once | `Reveal`, `RevealGroup`, or `animate-fade-in-up` in CSS |
| Hover / press | 200–300ms | `transition-all duration-200` (buttons), `duration-300` (cards) |
| Overlays | 0.2s | `animate-pop-in`, `animate-fade-in` |
| Accordion | 0.3s / 0.2s | `animate-accordion-down` / `-up` |
| Ring | 60s linear infinite | `animate-spin-slow` |
| Float | 5s, or 4s with a 1s delay, ±10px | `animate-float`, `animate-float-delayed` |
| Pulse dot | 2s | `animate-pulse-dot` |
| Breathe | 3s | `animate-breathe` |

Rules:
- `aiyo.css` already shortens CSS animations to near zero under `prefers-reduced-motion`. For JS motion, use the helpers or `useReducedMotion()`.
- Animate only `transform` and `opacity`. Never animate layout properties in loops.
- Don't animate on every scroll. Entrances run once.

---

## 9. Responsive rules

- Design mobile first. The breakpoints are Tailwind's (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- Grids collapse to one column below `sm` or `md`. Asymmetric hero and benefit grids start at `lg`.
- **Hide decorative graphics below `lg`** (`hidden lg:block`). This covers HeroGraphic, floating cards and large glows.
- Headline scale: the hero goes 2.75rem → 5.25rem and the H2 2.25rem → 3.25rem.
- Every touch target is at least 44px. Use button `md` (h-11) or larger on touch. `sm` (h-9) is for dense desktop tooling only.
- Inputs use `text-base` on mobile (which avoids iOS zoom) and `md:text-sm` on desktop.
- Button rows wrap: `flex flex-wrap gap-3`. Stack full-width on mobile if needed (`w-full sm:w-auto`).

---

## 10. Accessibility

- Meet WCAG AA. Primary on white is about 5.7:1. Primary on slate uses the lighter `#3B72FF`. Muted-foreground `#64748B` passes on `#FAFAFA` and white for body sizes.
- Every interactive element shows a focus ring: `focus-visible:focus-ring` (2px primary with a 2px offset). Never remove it.
- Touch targets must be at least 44 × 44px.
- Icon-only buttons need an `aria-label`. Decorative icons and graphics get `aria-hidden`.
- Use `Field` for forms. It wires the label, `aria-describedby` and `aria-invalid` for you.
- Never convey status by color alone. Pair it with an icon or text (Badge, Alert).
- Respect `prefers-reduced-motion`. This is built in, so don't bypass it.
- Use one `h1` per page and keep the heading order without skipping levels.

---

## 11. Do / Don't

| Do | Don't |
|---|---|
| Use `primary` / `bg-gradient-primary` for brand | Use `bg-accent` for brand: `accent` is the hover surface |
| Keep a single Electric Blue accent | Add a second accent color (purple, teal…) |
| Use `text-foreground` (#0F172A) | Use pure black `#000` text |
| Use Calistoga for H1/H2 (and stat numerals) | Use Calistoga for body, buttons, labels or UI |
| Open each section with SectionLabel → H2 → lede | Drop headlines in without a label or lede |
| Use asymmetric grids and left-aligned copy | Center everything |
| Add an inverted section with dot texture and glows | Ship flat, sterile pages without texture |
| Use gradients on buttons, icons, accents and small fills | Put gradients on large body or page backgrounds |
| Use `rounded-xl` controls and `rounded-2xl` cards | Mix arbitrary radii |
| Use soft neutral shadows plus `shadow-accent` on primary | Use heavy black shadows or colored shadows other than primary |
| Use ease `[0.16,1,0.3,1]` with 200–300ms hovers | Use bouncy springs or long hover transitions |
| Hide decorative graphics below `lg` | Squeeze hero illustrations onto phones |
| Use the status colors only for status | Use `success` green as a decorative color |

---

## 12. Page recipes

### 12.1 Landing page (section order)
1. **Nav**: sticky, `bg-background/80 backdrop-blur border-b`, logo left, ghost links, primary `md` CTA right.
2. **Hero**: asymmetric `1.1fr/0.9fr`, SectionLabel (pulse), Calistoga H1 with a gradient last word and underline, lede, primary and secondary `lg` buttons, `HeroGraphic` (lg+).
3. **Logos / social proof**: a mono label ("Trusted by") and a muted logo row.
4. **Features**: SectionHeader plus a 3-column grid of `Card variant="interactive"` with `IconTile`s.
5. **Benefits / deep dive**: asymmetric `1.2fr/0.8fr`, copy plus a screenshot or Stat cluster.
6. **How it works**: `Steps`, on an **inverted** section with dot texture and corner glows.
7. **Stats / testimonials**: a `Stat` row, then a grid of `TestimonialCard`s.
8. **Pricing**: 3 `PricingCard`s. The middle one is `highlighted`.
9. **FAQ**: `Accordion` in a narrow column, with the SectionHeader on the left on lg.
10. **Final CTA**: an inverted or featured block with a short H2 and one primary `xl` button.
11. **Footer**: muted text, mono column labels, border-top.

### 12.2 Admin / dashboard page (same tokens, denser)
- **Shell:** `bg-background`, a sidebar (`w-64 border-r bg-card`, ghost nav items `h-10 rounded-lg`, active item `bg-muted text-foreground` with a 2px primary indicator) and a top bar (`h-16 border-b`, search `Input size="sm"` with `Kbd`, Avatar menu).
- **Content:** `max-w-7xl` (or fluid) with `p-6 lg:p-8` and `gap-6` grids.
- **Page header:** H1 in **Inter** `text-2xl font-semibold tracking-[-0.01em]` (Calistoga is for marketing heroes and sections; an optional small mono SectionLabel goes above), muted description, actions on the right (`Button size="sm"|"md"`).
- **KPI row:** `grid gap-5 sm:grid-cols-2 xl:grid-cols-4` of `Card` > `CardContent` > `Stat`.
- **Data:** `Table` with mono heads, `Badge` status cells, a `DropdownMenu` row-actions trigger (`Button variant="ghost" size="icon-sm"`) and a `Skeleton` while loading.
- **Forms:** `Card` sections with `Field`s in a `grid gap-5 md:grid-cols-2`, and a footer with secondary and primary buttons.
- **Feedback:** `Alert` for page-level messages, `Dialog` to confirm destructive actions (destructive button), `Progress` and `Spinner` for async work.
- **Dense sizing is allowed:** button `sm` (h-9), input `sm` (h-9) and tab triggers h-9, **on desktop only**.
- **Dark mode:** put `.dark` on `<html>`. Everything re-themes.
- **Motion:** keep it minimal. No scroll entrances on data views, only hover and overlay transitions.
