# AiYO Design System: "Minimalist Modern"

This is the full spec for the AiYO Design System. It is written for AI coding agents and for people. Where it disagrees with the code, the code wins: `src/styles/aiyo.css` holds the tokens, `src/components/ui/*` the components, `src/components/blocks/*` the page blocks and `src/lib/motion.tsx` the motion helpers.

- **Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui conventions (`cva`, `cn` from tailwind-merge, `radix-ui`, `lucide-react`) and `motion` (`motion/react`).
- **Distribution:** components are copied into your project, shadcn style, and imported via the alias `@/components/ui/*`.
- **Machine-readable tokens:** `tokens/aiyo.tokens.json` (W3C DTCG format).
- **Anti-slop filter:** this file gives direction; `skills/antislop/SKILL.md` is the filter applied on top of it. See §14 for the owner's decisions.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

---

## 1. Philosophy

> **Structure gives clarity. Bold details give character.** Use few elements and execute each with confidence.

- **One accent:** the Electric Blue gradient `#0052FF → #4D7CFF`. Everything else is slate and white.
- **Three typefaces, each with one job:** Calistoga for display headlines, Inter for all UI and body text, and JetBrains Mono for labels.
- **Generous space and asymmetric grids.** Every landing page needs at least one deep-slate *inverted* section.
- **Depth comes from contrast, not decoration.** Solid deep-slate sections, hairline borders and shadows used only as elevation markers. No dot grids, no blurred glows.
- **Motion is quiet and purposeful.** Content enters once on scroll and controls answer hover and press. Nothing loops for decoration. Every animation uses the ease `cubic-bezier(0.16, 1, 0.3, 1)` and respects `prefers-reduced-motion`.

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
| `rounded-full` | pill | Badges, avatars, switches |

### 2.6 Shadows

| Class | Value | Use |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgb(0 0 0/.06)` | Controls, resting buttons |
| `shadow-md` | `0 4px 6px rgb(0 0 0/.07)` | Default cards |
| `shadow-lg` | `0 10px 15px rgb(0 0 0/.08)` | Raised elements, tooltips |
| `shadow-xl` | `0 20px 25px rgb(0 0 0/.10)` | Hovered cards, dialogs, menus |
| `shadow-accent` | `0 4px 14px rgb(0 82 255/.25)` | Primary-tinted resting lift (gradient icon tiles, badges) |
| `shadow-accent-lg` | `0 8px 24px rgb(0 82 255/.35)` | Primary button hover, featured card |

Shadows mark elevation only: cards `shadow-md`, overlays (dialogs, menus) `shadow-xl`, and the accent shadow on the primary CTA. Everything else sits flat.

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
| App page title (H1) | Inter semibold | `text-2xl md:text-3xl font-semibold tracking-[-0.01em]` via `<PageHeader>`. Never Calistoga in app UI. |
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
| Inverted section | At least one per landing page: `<Section inverted>`, a solid deep slate section (no texture, no glows) |

---

## 5. Surfaces

| Surface | Recipe |
|---|---|
| Page | `bg-background` (#FAFAFA) |
| Card | `<Card>`: `rounded-2xl border bg-card shadow-md` |
| Interactive card | `<Card variant="interactive">`: lifts `-translate-y-1` with `shadow-xl` and a faint primary wash on hover |
| Featured card | `<Card featured>`: 2px gradient stroke and `shadow-accent-lg` |
| Inverted section | `.inverted` gives a solid slate-900 background. No texture layer, no glows. |
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

Primary hover adds `-translate-y-0.5`, `shadow-accent-lg` and `brightness-110`. Active adds `scale-[0.98]`. An icon with `data-arrow` slides right on hover. Use the arrow only on the ONE primary CTA per screen; every other button goes without it.
```tsx
import { ArrowRight } from "lucide-react"
<Button size="lg">Start free trial <ArrowRight data-arrow /></Button>
<Button variant="secondary" size="lg">Book a demo</Button>
<Button asChild variant="link"><a href="/docs">Read the docs</a></Button>
```

### Badge: `@/components/ui/badge`
`variant`: `neutral` · `primary` (gradient) · `soft` · `outline` · `success` · `warning` · `destructive`. `size`: `sm` · `md`. Also supports `asChild`.
```tsx
<Badge variant="soft">New</Badge>  <Badge variant="success">Active</Badge>
```

### SectionLabel: `@/components/ui/section-label`
A plain small label: JetBrains Mono, 12px (`text-xs`), uppercase, `tracking-[0.15em]`, `text-primary`. No border, no background, no dot. Opens every major section. There is no `pulse` prop: a dot is allowed only where it marks a real live state, and then it belongs in status UI, not in a section label.
```tsx
<SectionLabel>Pricing</SectionLabel>
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
**Vertical tabs** (`orientation="vertical"`): on md and up, `TabsList` becomes a sticky left nav column (~15rem) with left-aligned triggers. The active trigger is a white card with a gradient bar on its left edge. Below md it collapses into a horizontally scrollable tab row on top. Use it for settings and profile pages with 3+ sub-sections, one `Card` per tab (see §13).
```tsx
<Tabs defaultValue="password" orientation="vertical">
  <TabsList>
    <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
    <TabsTrigger value="password"><Lock /> Password</TabsTrigger>
    <TabsTrigger value="address"><MapPin /> Address</TabsTrigger>
  </TabsList>
  <TabsContent value="profile"><Card>…</Card></TabsContent>
  …
</Tabs>
```

### Accordion: `@/components/ui/accordion`
Exports `Accordion`, `AccordionItem`, `AccordionTrigger` (a plus icon that rotates 45° and fills with the gradient when open) and `AccordionContent`. Use it for FAQs.
```tsx
<Accordion type="single" collapsible><AccordionItem value="1">
  <AccordionTrigger>Is there a free plan?</AccordionTrigger><AccordionContent>Yes.</AccordionContent>
</AccordionItem></Accordion>
```

### Dialog: `@/components/ui/dialog`
Exports `Dialog`, `DialogTrigger`, `DialogContent` (`showClose` defaults to true), `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` and `DialogClose`. It uses a solid `foreground/40` overlay (no backdrop blur), `rounded-2xl` and the `pop-in` animation.
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

### Pagination: `@/components/ui/pagination`
Goes under every data table (see §13). It shows "Showing 11–20 of 248", a rows-per-page select, prev/next buttons (labelled for screen readers) and page numbers with ellipsis.
| Prop | Type | Notes |
|---|---|---|
| `page` | `number` | 1-based current page |
| `pageSize` | `number` | Rows per page. Default to 10. |
| `total` | `number` | Total row count (from the API on server-side lists) |
| `onPageChange` | `(page: number) => void` | Called with the new page |
| `onPageSizeChange` | `(size: number) => void` | Changing the size also calls `onPageChange(1)` |
| `pageSizeOptions` | `number[]` | Default `[10, 20, 50, 100]` |
```tsx
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)
<Pagination page={page} pageSize={pageSize} total={total}
  onPageChange={setPage} onPageSizeChange={setPageSize} pageSizeOptions={[10, 20, 50, 100]} />
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

The blocks are page-level compositions built from the UI components. `Container`, `Section` and `SectionHeader` all live in `section.tsx`.

| Block | Import | Props / purpose |
|---|---|---|
| `Container` | `@/components/blocks/section` | `mx-auto w-full max-w-6xl px-5 sm:px-8` content column |
| `Section` | `@/components/blocks/section` | `spacing`: `default` (`py-24 md:py-32`) · `lg` (`py-28 md:py-44`, for hero and showcase sections) · `sm` (`py-16 md:py-20`). Set `inverted` for a solid deep slate section. Base classes: `relative isolate overflow-hidden`. |
| `SectionHeader` | `@/components/blocks/section` | `label`, `title` (Calistoga H2), `description` (muted lede), `align` (`left` by default, or `center`) |
| `HeroGraphic` | `@/components/blocks/hero-graphic` | Static hero visual: a still composition of sample product cards. No loops, no rings, no dot grid. Its numbers are labelled example data for the showcase (see §14.3). Use `className="hidden lg:block"`. |
| `Steps` | `@/components/blocks/steps` | `steps: { title, description }[]`. A "how it works" list: stacked on mobile, a horizontal row with gradient arrow connectors on md and up. |
| `PricingCard` | `@/components/blocks/pricing-card` | `name`, `price`, `period?`, `description`, `features: string[]`, `cta`. Set `highlighted` for the gradient stroke, a lift and a primary CTA. |
| `TestimonialCard` | `@/components/blocks/testimonial-card` | `quote`, `name`, `role`. Has a gradient top bar, a large gradient quote mark and an initials avatar. |
| `PageHeader` | `@/components/blocks/page-header` | App page title. `title`, `description?`, `back?: { href: string; label: string }` (renders a "← label" link above the title), `actions?: ReactNode` (right-aligned on desktop, full width below). Uses **Inter semibold** `text-2xl md:text-3xl`, not Calistoga. |
| `FormSection` | `@/components/blocks/page-header` | `title`, `description?`, `children`. On lg it is two columns: title and description on the left (1/3), the fields in a `Card` on the right (2/3). Stacked on mobile. |
| `FormActions` | `@/components/blocks/page-header` | Sticky bottom bar (`sticky bottom-0`, solid background, top border) with right-aligned children: Cancel (`secondary`), then the primary Save. |

```tsx
<Steps steps={[{ title: "Connect", description: "Link your data." }, { title: "Automate", description: "Set rules once." }]} />
<PricingCard name="Pro" price="$29" period="/mo" description="For growing teams" features={["Unlimited projects"]} cta="Start trial" highlighted />
<TestimonialCard quote="It just works." name="Ana Putri" role="CTO, Acme" />
```

### App page blocks (PageHeader, FormSection, FormActions)
```tsx
import { PageHeader, FormSection, FormActions } from "@/components/blocks/page-header"

<PageHeader title="Customers" description="Everyone who has bought from you."
  actions={<Button><Plus /> Add customer</Button>} />

<PageHeader title="New customer" back={{ href: "/customers", label: "Customers" }} />
<FormSection title="Contact" description="How we reach this customer.">
  <div className="grid gap-5 md:grid-cols-2">
    <Field label="Name" htmlFor="name" required><Input id="name" /></Field>
    <Field label="Email" htmlFor="email"><Input id="email" type="email" /></Field>
  </div>
</FormSection>
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button>Save customer</Button>
</FormActions>
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
      <SectionLabel>Workflow automation</SectionLabel>
      <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]">
        Work that runs <GradientText underline>itself</GradientText>
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Lede…</p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg">Start free <ArrowRight data-arrow /></Button> {/* the screen's one arrow */}
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

That is the whole motion vocabulary (MOTION dial 2). There is no endless decorative motion: no floating cards, rotating rings, breathing orbs or pulsing dots. The tokens `animate-spin-slow`, `animate-float`, `animate-float-delayed`, `animate-pulse-dot` and `animate-breathe` no longer exist. The only loops left are loading indicators (`Spinner`, `Skeleton`), which mark a real state.

Rules:
- `aiyo.css` already shortens CSS animations to near zero under `prefers-reduced-motion`. For JS motion, use the helpers or `useReducedMotion()`.
- Animate only `transform` and `opacity`. Never animate layout properties in loops.
- Don't animate on every scroll. Entrances run once.

---

## 9. Responsive rules

- Design mobile first. The breakpoints are Tailwind's (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- Grids collapse to one column below `sm` or `md`. Asymmetric hero and benefit grids start at `lg`.
- **Hide decorative graphics below `lg`** (`hidden lg:block`). This covers HeroGraphic and other illustrative panels.
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
| Add a solid deep-slate inverted section for contrast and rhythm | Add dot-grid textures or blurred glows to make a section look designed |
| Use gradients on buttons, icons, accents and small fills | Put gradients on large body or page backgrounds |
| Use `rounded-xl` controls and `rounded-2xl` cards | Mix arbitrary radii |
| Use shadows as elevation markers: cards `md`, overlays `xl`, accent on the primary CTA | Shadow every element, or use colored shadows other than primary |
| Use ease `[0.16,1,0.3,1]` with 200 to 300ms hovers | Use bouncy springs or long hover transitions |
| Animate entrances (once) and hover/press feedback | Loop decorative motion: floating cards, rotating rings, pulsing dots |
| Use a plain mono `SectionLabel` | Wrap labels in a pill with a pulsing dot |
| Put the `data-arrow` icon on the one primary CTA per screen | Add arrows to every button |
| Keep backdrop blur on the sticky navbar only | Blur dialog overlays, cards, sidebars or form bars |
| Hide decorative graphics below `lg` | Squeeze hero illustrations onto phones |
| Use the status colors only for status | Use `success` green as a decorative color |
| Put 3+ settings sub-sections in vertical `Tabs`, one Card each | Stack many cards down one long settings page |
| End every list with `Pagination` (even with one page) | Ship a table without pagination, or with an infinite unbounded list |
| Use a Dialog for ≤6-field forms and a dedicated page for larger ones | Cram a multi-section or upload form into a modal |

---

## 12. Page recipes

### 12.1 Landing page (section order)
Build only the sections the product's content needs (antislop C-3). Every block that shows numbers, people or customers uses real data, or the section is left out.

1. **Nav**: sticky, `bg-background/80 backdrop-blur border-b` (the only backdrop blur in the system), logo left, ghost links to sections that exist, primary `md` CTA right.
2. **Hero**: asymmetric `1.1fr/0.9fr`, a plain SectionLabel that adds information the H1 does not, Calistoga H1 with a gradient last word and underline, lede, a primary `lg` button (the screen's one `data-arrow` CTA) and a secondary `lg` button, `HeroGraphic` (lg+).
3. **Logos / social proof**: only real, verifiable customers. If there are none, leave it out.
4. **Features**: SectionHeader plus a grid of `Card variant="interactive"` with `IconTile`s. Vary the treatment when one feature carries more weight.
5. **Benefits / deep dive**: asymmetric `1.2fr/0.8fr`, copy plus a real screenshot or Stat cluster.
6. **How it works**: `Steps` on a solid **inverted** section, with as many steps as the real process has.
7. **Stats / testimonials**: a `Stat` row, then `TestimonialCard`s, real data only.
8. **Pricing**: one `PricingCard` per real tier. Highlight a tier only with a written reason.
9. **FAQ**: `Accordion` with questions real users ask, in a narrow column with the SectionHeader on the left on lg.
10. **Final CTA**: an inverted or featured block with a short H2 and one primary `xl` button.
11. **Footer**: muted text, mono column labels, border-top. Group links by what the product actually has.

### 12.2 Admin / dashboard page (same tokens, denser)
- **Shell:** `bg-background`, a sidebar (`w-64 border-r bg-card`, ghost nav items `h-10 rounded-lg`, active item `bg-muted text-foreground` with a 2px primary indicator) and a top bar (`h-16 border-b`, search `Input size="sm"` with `Kbd`, Avatar menu).
- **Content:** `max-w-7xl` (or fluid) with `p-6 lg:p-8` and `gap-6` grids.
- **Page header:** always `<PageHeader title description actions>`: H1 in **Inter** semibold `text-2xl md:text-3xl` (Calistoga is for marketing H1/H2 only), muted description, actions on the right. Detail and form pages add `back`.
- **KPI row:** `grid gap-5 sm:grid-cols-2 xl:grid-cols-4` of `Card` > `CardContent` > `Stat`.
- **List pages:** PageHeader (primary "Add <Thing>" with a `Plus` icon) → toolbar (search `Input` with a `Search` icon, plus filters) → `Table` → `Pagination` (always present, default `pageSize` 10). See §13.2.
- **Data:** `Table` with mono heads, `Badge` status cells, a `DropdownMenu` row-actions trigger (`Button variant="ghost" size="icon-sm"` with `MoreHorizontal`) in the last column, an empty-state row when there are no results, and a `Skeleton` while loading.
- **Settings / profile:** 3+ sub-sections go in vertical `Tabs`, one `Card` per tab. See §13.1.
- **Forms:** small forms (≤6 fields) in a `Dialog`; large forms on a dedicated page built from `PageHeader back` → `FormSection`s → `FormActions`. See §13.3.
- **Feedback:** `Alert` for page-level messages, `Dialog` to confirm destructive actions (destructive button), `Progress` and `Spinner` for async work.
- **Dense sizing is allowed:** button `sm` (h-9), input `sm` (h-9) and tab triggers h-9, **on desktop only**.
- **Dark mode:** put `.dark` on `<html>`. Everything re-themes.
- **Motion:** keep it minimal. No scroll entrances on data views, only hover and overlay transitions.

---

## 13. App page rules (mandatory)

These rules apply to every app, admin and dashboard page. The showcase site demos all three patterns (a settings page, a list page and a create page) in its **App Patterns** section (`#app-patterns`).

### 13.1 Settings and profile pages
- When one page has **3 or more sub-sections** (for example profile, change password, change address, notifications), use **vertical `Tabs`** (`orientation="vertical"`) with **one `Card` per tab**.
- **Never stack many cards vertically on one long page.**
```tsx
<PageHeader title="Account settings" description="Manage your profile and security." />
<Tabs defaultValue="profile" orientation="vertical">
  <TabsList>
    <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
    <TabsTrigger value="password"><Lock /> Password</TabsTrigger>
    <TabsTrigger value="address"><MapPin /> Address</TabsTrigger>
  </TabsList>
  <TabsContent value="password">
    <Card><CardHeader><CardTitle>Change password</CardTitle></CardHeader>
      <CardContent className="grid gap-5">…Fields…</CardContent>
      <CardFooter className="justify-end"><Button>Update password</Button></CardFooter></Card>
  </TabsContent>
  …
</Tabs>
```

### 13.2 List and data pages
Every list page has this structure, in this order:
1. **`PageHeader`** with `title`, `description` and a primary **"Add <Thing>"** `Button` with a `Plus` icon in `actions`.
2. **Toolbar:** a search `Input` with a `Search` icon, plus filters (`Select`, etc.).
3. **`Table`.** Row actions go in a `DropdownMenu` (an icon button with `MoreHorizontal` and an `aria-label`) in the **last column**. When there are no results, show an empty-state row (or card) instead of an empty table.
4. **`Pagination`**, **always present, even with a single page.** Default `pageSize` is 10.

State rules:
- **Reset to page 1** whenever the search, a filter or the page size changes.
- When the data comes from an API, use **server-side pagination**: send `page` and `pageSize`, and read `total` from the response.
```tsx
const [query, setQuery] = useState("")
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)
// const { rows, total } = useCustomers({ query, page, pageSize })

<PageHeader title="Customers" description="Everyone who has bought from you."
  actions={<Button onClick={openCreate}><Plus /> Add customer</Button>} />
<div className="flex flex-wrap items-center gap-3">
  <div className="relative w-full sm:max-w-xs">
    <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <Input className="pl-9" placeholder="Search customers" aria-label="Search customers"
      value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} />
  </div>
  {/* filters: also setPage(1) on change */}
</div>
<Table>
  <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead className="w-12" /></TableRow></TableHeader>
  <TableBody>
    {rows.length === 0 ? (
      <TableRow><TableCell colSpan={3} className="py-12 text-center text-muted-foreground">No customers found.</TableCell></TableRow>
    ) : rows.map((r) => (
      <TableRow key={r.id}>
        <TableCell>{r.name}</TableCell>
        <TableCell><Badge variant="success">Active</Badge></TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.name}`}><MoreHorizontal /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Pencil />Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive"><Trash2 />Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
```

### 13.3 Add / edit data: Dialog or dedicated page
| Use a **Dialog (modal)** when the form is small | Use a **dedicated page** (`/things/new`, `/things/:id/edit`) when the form is large |
|---|---|
| ≤ 6 fields | > 6 fields |
| One section | Multiple sections |
| No file uploads | File uploads |
| No nested line items | Nested line items or tables |
| | The URL needs to be shareable |
| `DialogFooter` with Cancel (`secondary`) + Save (primary) | `PageHeader` with `back` → `FormSection` blocks → `FormActions` |

- The same rule applies to **edit**.
- **Delete always asks for confirmation** in a `Dialog` with a `destructive` button.
```tsx
// Small form: Dialog
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>Add tag</DialogTitle></DialogHeader>
    <div className="grid gap-5">…≤ 6 Fields…</div>
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Large form: /customers/new
<PageHeader title="New customer" description="…" back={{ href: "/customers", label: "Customers" }} />
<div className="grid gap-8">
  <FormSection title="Contact" description="…">…Fields…</FormSection>
  <FormSection title="Billing address" description="…">…Fields…</FormSection>
  <FormSection title="Documents">…file upload…</FormSection>
</div>
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button>Save customer</Button>
</FormActions>

// Delete confirmation
<DialogContent>
  <DialogHeader><DialogTitle>Delete customer?</DialogTitle>
    <DialogDescription>This cannot be undone.</DialogDescription></DialogHeader>
  <DialogFooter>
    <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
    <Button variant="destructive">Delete</Button>
  </DialogFooter>
</DialogContent>
```

---

## 14. Anti-slop filter and decisions

### 14.1 How the filter fits
AiYO vendors the antislop skills (MIT, release 3.2.21) in `skills/antislop*`. The model has three parts:

| File | Role |
|---|---|
| `DESIGN.md` (this file) | **Direction**: identity, palette, typography, mood, dials |
| `skills/antislop/SKILL.md` + the skill for the task | **Filter**: rejects technique without purpose, requires liveliness, ends with the Delivery Gate |
| `AGENTS.md` / `CLAUDE.md` | **Routing**: tells the agent to read this file first, then the filter |

Task skills: `antislop-ui` (visual), `antislop-copywriting` (copy), `antislop-human` (contrast, keyboard, focus, states; ships `contrast-check.py`), `antislop-layoutmobile` (breakpoints, tap targets) and `antislop-code` (code comments).

Dials for AiYO products: **ENERGY 2 / RHYTHM 2 / MOTION 2**. Balanced energy, consistent sections with a few breaks (asymmetric grids, one inverted section), scroll entrances plus hover feedback. Before building, declare a Design Read, for example: *"Reading this as: B2B SaaS landing for small-business owners, in the AiYO Minimalist Modern style, dial ENERGY 2 / RHYTHM 2 / MOTION 2."* Run the Delivery Gate before delivering.

### 14.2 Decision log (R-37)
Where this system used a pattern antislop names, the owner decided to keep it or drop it. The code matches these decisions.

**Dropped**

| Pattern | Rule | What changed |
|---|---|---|
| Pill `SectionLabel` with a pulsing dot | R-09, R-31 | `SectionLabel` is a plain label: JetBrains Mono 12px, uppercase, 0.15em tracking, `text-primary`, no border, background or dot. The `pulse` prop is gone from `SectionLabel` and `SectionHeader`. A dot only marks a real live state. |
| Endless decorative motion (floating cards, rotating ring, breathing orb, pulsing dots) | R-19 | `animate-spin-slow`, `animate-float`, `animate-float-delayed`, `animate-pulse-dot` and `animate-breathe` are deleted from `aiyo.css`. Motion is scroll entrance, hover/press feedback, overlay pop-in and accordion (MOTION 2). `HeroGraphic` is static. |
| Dot-grid texture and blurred glows on inverted sections | R-07, R-13 | `texture-dots`, `texture-dots-dark` and `<Glow>` are removed. `<Section inverted>` is solid deep slate. |
| Arrows on buttons by default | R-08 | `data-arrow` stays, for the ONE primary CTA per screen only. |

**Dose caps** (R-10): backdrop blur only on the sticky navbar. The Dialog overlay and `FormActions` are solid.

**Kept on purpose** (R-31 reasons)

| Pattern | Rule | Reason |
|---|---|---|
| Electric Blue gradient `#0052FF → #4D7CFF` | R-01 | It is the brand identity and marks the single primary action level. |
| Uppercase JetBrains Mono labels with wide tracking (section labels, table heads) | R-06 | A deliberate typographic voice and the system's identity motif, kept small at 12px. |
| Lucide icons | R-04 | Matches the shadcn/ui ecosystem used across AiYO projects. Pick each icon for relevance; never sparkle, magic, robot or lightning as feature icons. |
| Shadows | R-12 | Elevation markers only: cards `md`, overlays `xl`, accent shadow on the primary CTA. |

### 14.3 Exception: showcase sample content
The showcase site keeps sample content: the hero graphic numbers, sample testimonials, and the 3-tier pricing with a highlighted tier. It is clearly labelled as example data. This is an owner override of R-17, R-18 and R-38 **for the showcase only**. In real AiYO products these blocks use real data only; otherwise leave the section out.
