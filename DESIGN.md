# AiYO Design System v2: "Minimalist Modern" on HeroUI v3

This is the full spec for the AiYO Design System. It is written for AI coding agents and for people. Where it disagrees with the code, the code wins: `src/styles/aiyo.css` holds the theme, `src/components/aiyo/*` the AiYO blocks and `src/lib/motion.tsx` the scroll entrance.

- **Components:** [HeroUI v3](https://heroui.com) (`@heroui/react` 3.2, built on React Aria), used directly. AiYO does not wrap or fork HeroUI components.
- **Theme:** one CSS file, `aiyo.css`, writes the AiYO palette into the CSS variables HeroUI already reads.
- **AiYO blocks:** page-level pieces HeroUI does not have (Section, PageHeader, DataPagination, Stat…), in `src/components/aiyo/*`.
- **Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, `@heroui/react` + `@heroui/styles`, Geist via `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`, icons from `@gravity-ui/icons`.
- **Machine-readable tokens:** `tokens/aiyo.tokens.json` (W3C DTCG format).
- **Anti-slop filter:** this file gives direction; `skills/antislop/SKILL.md` is the filter applied on top of it. See §14 for the owner's decisions.
- **HeroUI API lookups:** for props and parts not covered here, read HeroUI's own docs ([llms.txt](https://heroui.com/react/llms.txt), or a component page with `.mdx` appended, e.g. `https://heroui.com/en/docs/react/components/select.mdx`). The installed package's types are the final word.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

---

## 1. Philosophy

> **HeroUI builds it, AiYO brands it.** Use few elements and execute each with confidence.

- **HeroUI owns component behaviour and shape.** Buttons, fields, overlays, tables and their sizes, radii, states and motion come from HeroUI as they ship. AiYO changes colour and type through variables, never by restyling a component per page.
- **One accent:** Electric Blue `#0052FF`, named `accent` (HeroUI's name for the brand colour). The gradient `#0052FF → #3366FF` is kept for a few brand moments only.
- **One type family, two voices:** Geist Sans for headlines and interface text, Geist Mono, small and uppercase, for labels.
- **Generous space and asymmetric grids.** Every landing page has at least one deep-slate *inverted* section.
- **Depth comes from contrast, not decoration.** Solid surfaces, hairline separators and HeroUI's three elevation levels. No dot grids, no blurred glows.
- **Motion is quiet and purposeful.** Content rises in once on scroll; controls use HeroUI's own feedback. Nothing loops for decoration, and `prefers-reduced-motion` is always respected.

---

## 2. Tokens

### 2.1 Naming: read this first

AiYO v2 uses HeroUI's token names. They differ from shadcn/ui and from AiYO v1.

| Concept | Token / Tailwind | Notes |
|---|---|---|
| Brand colour (Electric Blue) | **`accent`**, `accent-foreground`, `accent-end` | `bg-accent`, `text-accent`. HeroUI's primary Button, focus ring, selection and Switch all read it. |
| Soft brand tint | `accent-soft`, `accent-soft-foreground` | Soft chips, icon tiles, secondary button text. |
| Page | `background`, `foreground` | `bg-background`, `text-foreground`. |
| Non-overlay surfaces (cards, tables, accordions) | `surface`, `surface-secondary`, `surface-tertiary` | `bg-surface`. |
| Floating surfaces (modals, popovers, menus, tooltips) | `overlay` | `bg-overlay`. |
| Secondary **text** | **`muted`** | `text-muted`. In HeroUI `muted` is a text colour, not a fill. |
| Neutral fill | `default`, `default-foreground` | Secondary buttons, chips, tracks. |
| Status | `success`, `warning`, `danger` (+ `-foreground`, `-soft`, `-soft-foreground`) | `danger`, not `destructive`. Status text uses `text-*-soft-foreground`. |
| Lines | `border` (component edges), `separator` (dividers) | `border-border`, `border-separator`, `divide-separator`. |
| Form fields | `field`, `field-border`, `field-placeholder` | Read by every HeroUI field. |
| Focus | `focus` | Equals `accent`. |

There is no `primary`, `card`, `popover`, `muted-foreground`, `destructive` or `ring` token any more (see §15 for the v1 mapping).

### 2.2 Colours: light (default, `:root`, `.light`, `[data-theme="light"]`)

| Token | Value | Use and checked contrast |
|---|---|---|
| `--background` | `#FAFAFA` | Page canvas |
| `--foreground` | `#0F172A` | Text; never pure black (17.1:1 on background) |
| `--surface` | `#FFFFFF` | Cards, tables, accordions |
| `--surface-secondary` | `#F1F5F9` | Grouped or secondary cards |
| `--surface-tertiary` | `#E8EDF3` | Third level, skeletons |
| `--overlay` | `#FFFFFF` | Modals, popovers, menus |
| `--muted` | `#5B6B80` | Secondary text: 5.21:1 on background, 4.97:1 on default |
| `--default` | `#F1F5F9` | Neutral fills |
| `--accent` | `#0052FF` | Brand. White text on it 5.75:1 |
| `--accent-end` | `#3366FF` | Gradient endpoint. White text on it 4.68:1 |
| `--accent-foreground` | `#FFFFFF` | Text on accent |
| `--accent-soft-foreground` | `#0047E0` | Text on accent tints: 5.58:1 on accent-soft, 6.44:1 on default |
| `--success` / `--success-foreground` | `#059669` / `#0F172A` | 4.74:1 |
| `--success-soft-foreground` | `#047857` | Success text on tints |
| `--warning` / `--warning-foreground` | `#D97706` / `#0F172A` | 5.60:1 |
| `--warning-soft-foreground` | `#92400E` | Warning text on tints |
| `--danger` / `--danger-foreground` | `#DC2626` / `#FFFFFF` | 4.83:1 |
| `--danger-soft-foreground` | `#B91C1C` | Error text on tints |
| `--field-background` | `#FFFFFF` | Inputs, selects, checkboxes |
| `--field-border` | `#7C8BA1` | 1px field edge, 3.46:1 on white (WCAG 1.4.11) |
| `--border` | `#E2E8F0` | Component hairlines |
| `--separator` | `#E9EEF4` | Dividers |
| `--backdrop` | `rgb(15 23 42 / 0.5)` | Modal backdrop |

HeroUI derives the hover, soft and field-state colours (`--accent-hover`, `--accent-soft`, `--field-border-hover`…) from these with `color-mix`, so they follow automatically.

### 2.3 Colours: dark (`.dark` / `[data-theme="dark"]` on `<html>`) and inverted (`.inverted` on a section)

`.inverted` flips one section to the dark palette; HeroUI components inside it re-theme too. `.dark` is the same palette for the whole app. The Tailwind `dark:` variant matches `.dark`, `[data-theme="dark"]` and `.inverted`, and does **not** follow the OS setting by itself (use `useTheme("system")` for that).

| Token | Value |
|---|---|
| `--background` | `#0F172A` |
| `--foreground` | `#F8FAFC` |
| `--surface` / `--overlay` | `#1E293B` |
| `--surface-secondary` / `--surface-tertiary` | `#273449` / `#334155` |
| `--muted` | `#A8B5C8` (4.98:1 on default, 8.5:1 on background) |
| `--default` | `#334155` |
| `--accent` / `--accent-end` | `#7AA0FF` / `#9DB8FF` |
| `--accent-foreground` | `#0F172A` (on slate no blue passes AA against both white text and the background, so the accent turns light and its text dark: 7.06:1 both ways) |
| `--accent-soft-foreground` | `#9DB8FF` |
| `--success` / `--warning` / `--danger` | `#34D399` / `#FBBF24` / `#F87171`, all with `#0F172A` text |
| `--success-soft-foreground` / `--warning-soft-foreground` / `--danger-soft-foreground` | `#6EE7B7` / `#FCD34D` / `#FCA5A5` |
| `--field-background` / `--field-border` | `#0F172A` / `#718096` (3.64:1 on surface) |
| `--border` / `--separator` | `rgb(255 255 255 / 0.10)` / `rgb(255 255 255 / 0.08)` |
| Shadows | Surface and field shadows off; overlays get a 1px inset hairline |

Portaled overlays (Modal, AlertDialog, Popover, Dropdown, Select, Tooltip, Toast) render into `document.body`, so they follow the `<html>` theme, not an `.inverted` section they were opened from.

### 2.4 Gradients and signature utilities

| Utility | What it does |
|---|---|
| `bg-gradient-accent` | `linear-gradient(to right, accent, accent-end)` |
| `bg-gradient-accent-diagonal` | Same at 135° |
| `text-gradient` | Paints text with the gradient. Use `<GradientText>`. |
| `heading-hero`, `heading-section` | The marketing type scale (§3) |
| `label-caps` | Geist Mono 12px, 500, uppercase, 0.12em tracking: the label voice |
| `ease-aiyo` | `cubic-bezier(0.16, 1, 0.3, 1)` |

The gradient appears in three places only: one headline word (`GradientText`, text 24px or larger, because its light end is 4.48:1 on the canvas), the one leading `IconTile` in a group, and a single data highlight (for example the latest bar in a chart). Never on buttons, cards or backgrounds; HeroUI's solid accent carries actions.

### 2.5 Radius (HeroUI scale, `--radius: 0.5rem`)

| Class | Value | Where HeroUI uses it |
|---|---|---|
| `rounded-lg` | 8px | Kbd, small parts |
| `rounded-xl` / `rounded-field` | 12px | Inputs, selects, text areas, menu items |
| `rounded-2xl` | 16px | Icon tiles, toasts |
| `rounded-3xl` | 24px | Cards, alerts, modals, tables |
| Pill | | Buttons (`rounded-3xl` on a 36 to 44px control), chips, tabs |

Do not change component radii per page. Radius marks the kind of thing: pill means "press me", 12px means "type here", 24px means "a surface".

### 2.6 Elevation

| Utility | Use |
|---|---|
| `shadow-field` | Field controls |
| `shadow-surface` | Cards, alerts, tables: just above the canvas |
| `shadow-overlay` | Modals, popovers, menus, toasts: clearly floating |

Three levels, all from HeroUI. Do not add other shadows, glows or coloured shadows.

### 2.7 Fonts

| Token | Stack | Tailwind |
|---|---|---|
| `--font-sans` | `"Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif` | `font-sans` (body default) |
| `--font-mono` | `"Geist Mono Variable", "Geist Mono", ui-monospace, SFMono-Regular, monospace` | `font-mono`, `label-caps` |

`aiyo.css` imports both variable fonts from Fontsource, so they are self-hosted and bundled; no Google Fonts request. Weights 100 to 900 are available; AiYO uses 400, 500 and 600.

### 2.8 AiYO adjustments to HeroUI (all in `aiyo.css`, `@layer components`)

Each one exists for a stated reason. Do not add more per project; propose them here.

| Adjustment | Reason |
|---|---|
| Fields get a 1px `--field-border` (HeroUI ships borderless fields) | Field edges at 3:1 (WCAG 1.4.11). Checkboxes and radios share the token. |
| Switch off-track uses `--field-border` | Off switches were 1.1:1 against white. |
| Touch layer: below 768px or on coarse pointers, buttons, pagination links, tabs, close buttons and tab scroll arrows get an invisible 44 × 44px hit area; fields, menu items, list items and the checkbox, radio and switch rows grow to 44px | HeroUI's default controls are 32 to 40px; AiYO requires 44px touch targets. Desktop keeps HeroUI's sizes. |
| `.search-field__input::placeholder` uses `--field-placeholder` | HeroUI leaves it to the browser default (3.4:1). |
| `.tabs__panel` gets a focus outline when it takes focus | A panel with nothing focusable inside is a tab stop; HeroUI draws no indicator for it. |
| `--color-field-border-invalid: var(--danger)` | HeroUI's InputGroup reads this variable but never defines it. |
| `.link.button` keeps `gap: 0.5rem`; `[data-arrow]` slides on hover | Link-as-button with an icon; the one primary CTA arrow. |
| `dark:` variant redefined | Class-based only, and `.inverted` counts as dark. |

---

## 3. Typography

| Role | Classes |
|---|---|
| **Hero H1** | `heading-hero` (44 → 60 → 80px, 600, line-height 1.02, tracking -0.045em, balanced). Put one word in `<GradientText underline>`. |
| **Section H2** | `heading-section` (32 → 48px, 600, line-height 1.1, tracking -0.035em), via `<SectionHeader>` |
| App page title (H1) | `text-2xl md:text-3xl font-semibold tracking-[-0.03em]`, via `<PageHeader>` |
| Card or block title | `text-lg font-semibold tracking-[-0.02em]` (pass it to `Card.Title`, whose HeroUI default is 14px medium) |
| Lede | `text-lg leading-relaxed text-muted`, `max-w-2xl` |
| Body | `text-base leading-relaxed` (body line-height 1.6) |
| Small / helper | `text-sm text-muted` |
| **Label** (section labels, stat labels, meta) | `label-caps` (Geist Mono 12px, uppercase, 0.12em) |
| Stat numeral | `text-4xl md:text-5xl font-semibold tracking-[-0.04em] tabular-nums` |
| Code, IDs, file names | `font-mono` |

Rules:
- Hierarchy comes from size, weight (400 / 500 / 600) and tight tracking at display sizes. No serif, no second family.
- One gradient word per screen, in a heading of 24px or more.
- Keep body lines near 65 characters (`max-w-2xl` for ledes).
- Minimum text size is 12px.

---

## 4. Layout

| Rule | Value |
|---|---|
| Container | `mx-auto w-full max-w-6xl px-5 sm:px-8` (`<Container>`) |
| Section padding | `py-16 md:py-32` default; `py-20 md:py-44` hero and showcase (`spacing="lg"`); `py-12 md:py-20` compact (`spacing="sm"`) |
| Section header to content | `mt-12 md:mt-16` |
| Grid gaps | `gap-5` (dense cards) to `gap-8` (feature columns) |
| Hero grid | `lg:grid-cols-[1.1fr_0.9fr]`: copy left, graphic right |
| Benefits grid | `lg:grid-cols-[1.2fr_0.8fr]` |
| Alignment | Left-aligned by default. Center only short CTA blocks. |
| Inverted section | At least one per landing page: `<Section inverted>`, solid deep slate |

---

## 5. Surfaces

| Surface | Recipe |
|---|---|
| Page | `bg-background` |
| Card | HeroUI `<Card>`: `bg-surface`, 24px radius, `shadow-surface`. Add padding with `className="p-6 md:p-8"` for content-heavy cards. |
| Secondary card | `<Card variant="secondary">` (`bg-surface-secondary`) for grouped or supporting content |
| Overlay | HeroUI Modal, Popover, Dropdown, Tooltip: `bg-overlay`, `shadow-overlay` |
| Inverted section | `<Section inverted>`: solid slate-900. No texture, no glows. |
| Code sample | Deep slate in both themes: put `inverted` on the block |

---

## 6. Components: HeroUI v3

### 6.1 Rules

1. **Import components from `@heroui/react`.** No local copies, no wrappers. If a project needs a variant, compose it from HeroUI parts plus utility classes in that project, or propose it as an AiYO block.
2. **Compound parts:** `Card.Header`, `Modal.Dialog`, `Tabs.Tab`… Every part takes `className`; utilities win over HeroUI's styles because HeroUI's CSS sits in `@layer components`. Use `cn()` from `@heroui/react` to merge class names, and `tv()` for your own variants.
3. **Events:** use `onPress` (React Aria), not `onClick`. Menus and lists use `onAction`. Selection uses `value` / `onChange` (Select, RadioGroup) or `isSelected` / `onChange` (Checkbox, Switch); `selectedKey` is deprecated on Select.
4. **Collections need ids.** Every `Tabs.Tab` / `Tabs.Panel`, `ListBox.Item`, `Dropdown.Item` and `Table.Row` gets an `id`; every `ListBox.Item` and `Dropdown.Item` also gets a `textValue`. A `Table` needs one `Table.Column isRowHeader` and the same number of cells in every row.
5. **No provider is needed.** Mount `<Toast.Provider />` once if the app uses toasts. Use `RouterProvider` from `@heroui/react` to route `href`s through your router.
6. **Icons:** `@gravity-ui/icons` (the set HeroUI's docs use). Give icon-only buttons an `aria-label` and decorative icons `aria-hidden`.

### 6.2 Which component for which job

| Need | HeroUI | AiYO notes |
|---|---|---|
| Action | `Button` | Variants: `primary` (accent fill, the main action), `secondary` (soft fill, accent text), `tertiary` (neutral fill), `outline`, `ghost`, `danger`, `danger-soft`. Sizes `sm` / `md` (default) / `lg`. `isIconOnly`, `isPending`, `fullWidth`. |
| Link that looks like a button | `Link` + `buttonVariants()` | `<Link href="/x" className={buttonVariants({ variant: "outline" })}>`. The `render` prop cannot turn a Button into `<a>`. |
| Text link | `Link` | Accent colour, underline on hover |
| Inline status / metadata | `Chip` | `variant="soft"` with `color="success" \| "warning" \| "danger" \| "accent"`. Always with a word. |
| Counter or dot on another element | `Badge` | Not an inline label |
| Text input | `TextField` + `Label` + `Input` + `Description` + `FieldError` | `TextArea` for multi-line, `InputGroup` for prefix/suffix, `SearchField` for search, `NumberField` for numbers |
| Choice from a list | `Select` + `ListBox` | `ComboBox` / `Autocomplete` when the list is long |
| Booleans and options | `Checkbox`, `RadioGroup` + `Radio`, `Switch` | The `.Content` part is required: it holds the native input |
| Container | `Card` | `variant="secondary"` for grouped content |
| Dialog | `Modal` | Backdrop `variant="opaque"` (the default). Never `blur`. |
| Destructive confirmation | `AlertDialog` | `AlertDialog.Icon status="danger"` + a `danger` Button |
| Side panel | `Drawer` | Filters, details |
| Sections in one page | `Tabs` | `variant="secondary"` for page navigation and settings side tabs |
| FAQ / disclosure | `Accordion`, `Disclosure` | |
| Menu | `Dropdown` | Pass a `Button` as the direct child; `Dropdown.Item variant="danger"` with a `<Label>` inside |
| Page message | `Alert` | `status="accent" \| "success" \| "warning" \| "danger"`; add `role="status"` when it appears after an action |
| Confirmation after an action | `toast()` | `toast.success(...)`, `toast.danger(...)` |
| Progress | `ProgressBar`, `Meter`, `Spinner`, `Skeleton` | |
| Data | `Table` | Plus `DataPagination` (AiYO) under it |
| Name an icon button | `Tooltip` | The button still needs `aria-label` |
| Keyboard shortcut | `Kbd` | |
| Person | `Avatar`, `AvatarGroup` | Initials (`Avatar.Fallback`) until an approved photo exists |
| No results | `EmptyState` | With a cause and one next action |

### 6.3 Recipes

**Button**
```tsx
import { Button, Link, Spinner, buttonVariants } from "@heroui/react"
import { ArrowRight, Plus } from "@gravity-ui/icons"

<Button onPress={create}>Create invoice <ArrowRight data-arrow /></Button>  {/* the one primary CTA on the screen */}
<Button variant="secondary">Export CSV</Button>
<Button variant="outline">Preview</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button isIconOnly variant="ghost" aria-label="Add"><Plus /></Button>
<Button isPending={saving}>
  {({ isPending }) => (isPending ? <><Spinner color="current" size="sm" /> Saving</> : "Save")}
</Button>
<Link href="/docs" className={buttonVariants({ variant: "outline" })}>Read the API docs</Link>
```

**Text field and form**
```tsx
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react"

<Form validationBehavior="aria" validationErrors={errors} onSubmit={save}>
  <TextField name="email" type="email" isRequired fullWidth>
    <Label>Email</Label>
    <Input placeholder="email@example.com" />
    <Description>We only use it for receipts.</Description>
    <FieldError />
  </TextField>
  <Button type="submit">Save</Button>
</Form>
```
- `FieldError` renders only when the field is invalid. Server or cross-field errors go in `Form validationErrors={{ [name]: "message" }}`; they show immediately and clear when the value changes.
- With `isInvalid` on a field, put the message inside: `<FieldError>Enter the merchant ID.</FieldError>`.
- The Label must be a direct child of the field for the required asterisk to appear.

**Select**
```tsx
import { Label, ListBox, Select } from "@heroui/react"

<Select value={bank} onChange={setBank} placeholder="Choose a bank">
  <Label>Settlement bank</Label>
  <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
  <Select.Popover>
    <ListBox>
      <ListBox.Item id="bca" textValue="BCA">BCA<ListBox.ItemIndicator /></ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>
```

**Checkbox, Radio, Switch**
```tsx
<Checkbox name="receipts" defaultSelected>
  <Checkbox.Content>
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    Email receipts
  </Checkbox.Content>
</Checkbox>

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Label>Plan</Label>
  <Radio value="pro"><Radio.Content><Radio.Control><Radio.Indicator /></Radio.Control>Pro</Radio.Content></Radio>
</RadioGroup>

<Switch defaultSelected>
  <Switch.Content><Switch.Control><Switch.Thumb /></Switch.Control>Auto settlement</Switch.Content>
</Switch>
```

**Modal (trigger inside) and controlled Modal (opened from code)**
```tsx
<Modal>
  <Button>Confirm payout</Button>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.CloseTrigger />
        <Modal.Header><Modal.Heading>Confirm payout</Modal.Heading></Modal.Header>
        <Modal.Body>…</Modal.Body>
        <Modal.Footer>
          <Button slot="close" variant="secondary">Cancel</Button>
          <Button slot="close" onPress={confirm}>Confirm payout</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>

// Opened from a row action: no <Modal> root, the Backdrop owns the state.
const editor = useOverlayState()
<Modal.Backdrop isOpen={editor.isOpen} onOpenChange={editor.setOpen}>
  <Modal.Container>
    <Modal.Dialog>{({ close }) => <>…<Button onPress={() => { save(); close() }}>Save</Button></>}</Modal.Dialog>
  </Modal.Container>
</Modal.Backdrop>
```

**Tabs**
```tsx
<Tabs defaultSelectedKey="overview">
  <Tabs.ListContainer>
    <Tabs.List aria-label="Invoice">
      <Tabs.Tab id="overview">Overview<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="activity">Activity<Tabs.Indicator /></Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="overview">…</Tabs.Panel>
  <Tabs.Panel id="activity">…</Tabs.Panel>
</Tabs>
```
`Tabs.Indicator` goes inside every tab. `variant="primary"` (default) is a segmented control; `variant="secondary"` is an underline, and a left rail when `orientation="vertical"`.

**Accordion**
```tsx
<Accordion defaultExpandedKeys={["billing"]}>
  <Accordion.Item id="billing">
    <Accordion.Heading><Accordion.Trigger>How does billing work?<Accordion.Indicator /></Accordion.Trigger></Accordion.Heading>
    <Accordion.Panel><Accordion.Body>…</Accordion.Body></Accordion.Panel>
  </Accordion.Item>
</Accordion>
```

**Dropdown**
```tsx
<Dropdown>
  <Button isIconOnly variant="ghost" aria-label={`Actions for ${row.name}`}><Ellipsis /></Button>
  <Dropdown.Popover placement="bottom end">
    <Dropdown.Menu onAction={(key) => handle(key)}>
      <Dropdown.Item id="edit" textValue="Edit"><Pencil /><Label>Edit</Label></Dropdown.Item>
      <Dropdown.Item id="delete" textValue="Delete" variant="danger"><TrashBin /><Label>Delete</Label></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>
```
`variant="danger"` colours only the `<Label>`, so always wrap item text in `Label`.

**Alert, Chip, Toast**
```tsx
<Alert status="success" role="status">
  <Alert.Indicator />
  <Alert.Content><Alert.Title>Payment received</Alert.Title><Alert.Description>Invoice INV-0042 is paid.</Alert.Description></Alert.Content>
</Alert>

<Chip color="warning" variant="soft">Pending</Chip>

// once, at the app root:  <Toast.Provider placement="bottom end" />
toast.success("Invoice sent", { description: "The customer gets an email with the PDF." })
```

**Table** (see §13.2 for the full list page)
```tsx
<Table>
  <Table.ScrollContainer>
    <Table.Content aria-label="Invoices">
      <Table.Header>
        <Table.Column isRowHeader>Invoice</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body renderEmptyState={() => <EmptyState>…</EmptyState>}>
        {rows.map((r) => (
          <Table.Row key={r.id} id={r.id}>
            <Table.Cell>{r.number}</Table.Cell>
            <Table.Cell><Chip color="success" variant="soft" size="sm">Paid</Chip></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>
```

**Progress, Spinner, Skeleton, Tooltip, Kbd**
```tsx
<ProgressBar value={64}><Label>Onboarding</Label><ProgressBar.Output /><ProgressBar.Track><ProgressBar.Fill /></ProgressBar.Track></ProgressBar>
<Spinner size="sm" aria-label="Syncing transactions" />
<Skeleton aria-hidden className="h-4 w-48 rounded-lg" />
<Tooltip>
  <Button isIconOnly variant="secondary" aria-label="Inbox"><Envelope /></Button>
  <Tooltip.Content showArrow><Tooltip.Arrow />Inbox, 3 unread</Tooltip.Content>
</Tooltip>
<Kbd><Kbd.Abbr keyValue="command" /><Kbd.Content>K</Kbd.Content></Kbd>
```

### 6.4 HeroUI behaviours to know

- **Sizes:** HeroUI controls are 32 to 40px on desktop and a step larger below 768px. `aiyo.css` brings every touch target to 44px on phones and touch screens (§2.8); do not hand-size controls for touch.
- **Inputs inside cards** keep the primary (white) variant: the AiYO field border separates them from the card.
- **Focus rings** are drawn by HeroUI with `--focus` (accent) on keyboard focus. Text inputs show the ring on any focus. Never remove it.
- **Tooltip delay** is HeroUI's 1500ms (from `--tooltip-delay` on `:root`, read once).
- **Skeleton** animates with a shimmer; the global reduced-motion rule in `aiyo.css` stops it.
- **Table rows** are cached per item when you pass `items`; list handlers used inside rows in `dependencies`, or map children yourself as the examples do.
- **SearchField.ClearButton** names itself "Close"; pass `aria-label="Clear search"`.

---

## 7. AiYO components (`@/components/aiyo/*`)

Page-level pieces HeroUI does not have. Copy the files you use; each depends only on `@heroui/react` and `@gravity-ui/icons`.

| Component | File | Props / purpose |
|---|---|---|
| `Container` | `section.tsx` | `max-w-6xl` content column with responsive gutters |
| `Section` | `section.tsx` | `spacing`: `default` · `lg` · `sm`. `inverted` for a solid deep-slate section. |
| `SectionHeader` | `section.tsx` | `label`, `title` (H2, `heading-section`), `description` (muted lede), `align` (`left` default, or `center`) |
| `SectionLabel` | `section-label.tsx` | Plain `label-caps` in `text-accent`. No pill, no border, no dot, no `pulse` prop. |
| `GradientText` | `gradient-text.tsx` | One headline word in the gradient. `underline` adds a soft accent bar, for the hero only. |
| `IconTile` | `icon-tile.tsx` | `variant`: `soft` (default) · `gradient` (the one item that leads a group) · `default`. `size`: `sm` 36px · `md` 48px · `lg` 56px. Decorative (`aria-hidden`). |
| `Stat` | `stat.tsx` | `label`, `value`, `trend`, `trendDirection` (`up`/`down`), `trendTone` (`positive`/`negative`), `hint`. Trend only with a real, named comparison period. |
| `PageHeader` | `page-header.tsx` | App page title: `title`, `description?`, `back?: { href, label }`, `actions?` |
| `FormSection` | `page-header.tsx` | `title`, `description?`, children. Title left (1/3), fields in a Card right (2/3) on lg. |
| `FormActions` | `page-header.tsx` | Sticky bottom bar on a full-page form: status text, Cancel (`secondary`), Save (primary) |
| `DataPagination` | `data-pagination.tsx` | `page` (1-based), `pageSize`, `total`, `onPageChange`, `onPageSizeChange?`, `pageSizeOptions?` (default `[10, 20, 50, 100]`). Built on HeroUI `Pagination` + `Select`. |
| `Steps` | `steps.tsx` | `steps: { title, description }[]`. Mono numbers on hairlines. As many steps as the real process has. |
| `PricingCard` | `pricing-card.tsx` | `name`, `price`, `period?`, `description`, `features`, `cta`, `highlighted?`, `highlightLabel?` (a reason, never "Most popular"), `selected?`, `onSelect?` |
| `TestimonialCard` | `testimonial-card.tsx` | `quote`, `name`, `role`. Real customers only. |
| `HeroGraphic` | `hero-graphic.tsx` | Static, decorative hero composition with labelled sample numbers. `className="hidden lg:block"`. |
| `ThemeToggle` | `theme-toggle.tsx` | Light/dark icon button on HeroUI's `useTheme`. Render it once per page. |

Motion helpers live in `@/lib/motion` (§8).

### 7.1 Section header pattern (every major marketing section)
```tsx
import { Container, Section, SectionHeader } from "@/components/aiyo/section"
import { GradientText } from "@/components/aiyo/gradient-text"
import { Reveal, RevealGroup, RevealItem } from "@/lib/motion"

<Section id="features">
  <Container>
    <Reveal>
      <SectionHeader
        label="Features"
        title={<>Settlement in <GradientText>one tap</GradientText></>}
        description="One sentence on why this matters."
      />
    </Reveal>
    <RevealGroup className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
      {features.map((f, i) => (
        <RevealItem key={f.title} className={i === 0 ? "md:col-span-3" : undefined}>
          <Card className="h-full gap-5 p-6 md:p-8">
            <IconTile variant={i === 0 ? "gradient" : "soft"}><f.icon /></IconTile>
            <Card.Header className="gap-2">
              <Card.Title className="text-lg font-semibold">{f.title}</Card.Title>
              <Card.Description>{f.body}</Card.Description>
            </Card.Header>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  </Container>
</Section>
```
Vary the treatment by weight: the feature that leads gets the wide card and the gradient tile; the rest stay soft.

### 7.2 Hero pattern
```tsx
<section className="pt-28 pb-16 md:pt-44 md:pb-32">
  <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
    <RevealGroup className="flex flex-col items-start gap-8">
      <RevealItem><SectionLabel>{/* information the H1 does not already give */}</SectionLabel></RevealItem>
      <RevealItem><h1 className="heading-hero">Work that runs <GradientText underline>itself</GradientText></h1></RevealItem>
      <RevealItem><p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">Lede…</p></RevealItem>
      <RevealItem className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/signup" className={buttonVariants({ size: "lg" })}>Start a free trial <ArrowRight data-arrow /></Link>
        <Link href="#demo" className={buttonVariants({ size: "lg", variant: "outline" })}>Watch the demo</Link>
      </RevealItem>
    </RevealGroup>
    <HeroGraphic className="hidden lg:block" />
  </Container>
</section>
```

### 7.3 Inverted section
```tsx
<Section inverted>
  <Container>
    <SectionHeader label="How it works" title="Three steps to live" description="…" />
    <Steps className="mt-12 md:mt-16" steps={steps} />
  </Container>
</Section>
```

---

## 8. Motion

| Kind | Source | Values |
|---|---|---|
| Scroll entrance (marketing pages) | `Reveal`, `RevealGroup` + `RevealItem` from `@/lib/motion` | 0.7s, 28px rise, `ease-aiyo`, stagger 0.1s, once |
| Hover, press, focus | HeroUI | Button press `scale(0.97)`, 100 to 250ms colour transitions |
| Overlays, accordion, tabs indicator | HeroUI | Built in |
| Primary CTA arrow | `data-arrow` on the icon | Slides 4px right on hover, 200ms |

`Reveal` keeps content visible by default. It hides an element only when it starts below the fold and JavaScript is running, then shows it once as it scrolls in. Reduced-motion users, print and screenshots always see everything. `RevealGroup` staggers its direct `RevealItem` children.

That is the whole vocabulary (MOTION dial 2). No endless decorative motion: no floating cards, rotating rings, breathing orbs or pulsing dots. The only loops are loading indicators (Spinner, Skeleton, indeterminate ProgressBar), which mark a real state. No scroll entrances on app and data screens.

`aiyo.css` shortens all animations and transitions to near zero under `prefers-reduced-motion`.

---

## 9. Responsive rules

- Mobile first, Tailwind breakpoints (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- Grids collapse to one column below `sm` or `md`. Asymmetric hero and benefit grids start at `lg`.
- Hide decorative graphics below `lg` (`hidden lg:block`).
- Every touch target is at least 44 × 44px; `aiyo.css` handles HeroUI controls (§2.8). Custom tappable elements get `min-h-11`.
- Inputs use 16px text on mobile (HeroUI does this) to avoid iOS zoom.
- Button rows wrap (`flex flex-wrap gap-3`) and stack full width on phones where needed (`w-full sm:w-auto`).
- Settings side tabs become a scrollable tab row below 768px (§13.1).

---

## 10. Accessibility

- WCAG AA for text in both themes: every token pair is checked (§2.2, §2.3). Status text uses the `-soft-foreground` tokens. Gradient text only at 24px or larger.
- Non-text contrast: field edges, checkbox and radio borders and the off switch track are 3:1 or more.
- Every interactive element shows a visible focus indicator: HeroUI's ring on its components, and `aiyo.css`'s 2px `--focus` outline on everything else (`:focus-visible`). Never remove one without an equally visible replacement.
- Touch targets 44 × 44px (§2.8).
- Icon-only buttons need an `aria-label`. Decorative icons and graphics get `aria-hidden`.
- Fields go inside `TextField` (or Select, RadioGroup…), which wires the label, description, error and `aria-invalid`.
- Never convey status by colour alone: Chip and Alert always carry a word.
- Dialogs close with Escape and trap focus (HeroUI does both).
- One `h1` per page; headings in order.
- Respect `prefers-reduced-motion` (built in).

---

## 11. Do / Don't

| Do | Don't |
|---|---|
| Use HeroUI components from `@heroui/react` | Copy, wrap or fork them into the project |
| Theme through `aiyo.css` variables | Override a component's colours or radius per page |
| Use `accent` for the brand (`bg-accent`, `text-accent`) | Look for a `primary` token; it no longer exists |
| Keep a single Electric Blue accent | Add a second accent colour |
| Use `text-foreground`, `text-muted`, `bg-surface`, `border-separator` | Use raw hex values or pure black |
| Use Geist for everything, `label-caps` for labels | Bring in a display serif or a third family |
| Open each marketing section with SectionLabel → H2 → lede | Drop headlines in without a label or lede |
| Use asymmetric grids and left-aligned copy | Center everything |
| Add one solid inverted section per landing page | Add dot-grid textures or blurred glows |
| Keep the gradient to one headline word, the leading icon tile, one data highlight | Put gradients on buttons, cards or backgrounds |
| Use HeroUI's three elevation levels | Add glows or coloured shadows |
| Use `Modal` with the opaque backdrop | Use `variant="blur"`; backdrop blur is for the sticky navbar only |
| Put the `data-arrow` icon on the one primary CTA per screen | Add arrows to every button |
| Use `onPress` | Use `onClick` on HeroUI components |
| Use Chip with a word for status | Use colour alone, or `success` green as decoration |
| Put 3+ settings sub-sections in vertical secondary `Tabs`, one Card each | Stack many cards down one long settings page |
| End every list with `DataPagination` | Ship a table without pagination |
| Confirm deletes in an `AlertDialog` | Delete on one click |

---

## 12. Page recipes

### 12.1 Landing page (section order)
Build only the sections the product's content needs (antislop C-3). Every block that shows numbers, people or customers uses real data, or the section is left out.

1. **Nav:** sticky, `bg-background/80 backdrop-blur-xl` once scrolled (the only backdrop blur), text wordmark left (no symbol until an approved logo file exists), links to sections that exist, `ThemeToggle`, a primary `sm` CTA.
2. **Hero:** §7.2. A label only if it adds information the H1 does not.
3. **Logos / social proof:** only real, verifiable customers; otherwise leave it out.
4. **Features:** `SectionHeader` plus cards weighted by importance (§7.1).
5. **Benefits / deep dive:** `1.2fr / 0.8fr`, copy plus a real screenshot or a `Stat` cluster.
6. **How it works:** `Steps` on an inverted section, as many steps as the real process has.
7. **Stats / testimonials:** real data only.
8. **Pricing:** one `PricingCard` per real tier. Highlight a tier only with a written reason in `highlightLabel`.
9. **FAQ:** `Accordion` with questions real users ask.
10. **Final CTA:** an inverted block with a short H2 and one primary `lg` button.
11. **Footer:** muted text, grouped by what the product actually links to.

### 12.2 Admin / dashboard page
- **Shell:** `bg-background`; a sidebar (`w-64 border-r border-separator bg-surface`) with `Link`s or a vertical secondary `Tabs`/`Menu`; a top bar (`h-16 border-b border-separator`) with a `SearchField`, `ThemeToggle` and an `Avatar` in a `Dropdown`.
- **Content:** `max-w-7xl` (or fluid), `p-6 lg:p-8`, `gap-6` grids.
- **Page header:** always `<PageHeader>`. Detail and form pages add `back`.
- **Metrics:** only metrics that matter, real data, `Stat` inside `Card`.
- **List pages:** §13.2. **Settings:** §13.1. **Forms:** §13.3.
- **Feedback:** `Alert` for page-level messages, `toast()` after actions, `AlertDialog` for destructive confirmation, `ProgressBar` / `Spinner` for async work.
- **Density:** HeroUI's desktop sizes are already compact (`sm` buttons for table rows and toolbars).
- **Dark mode:** `useTheme` (or `ThemeToggle`); everything re-themes.
- **Motion:** no scroll entrances on data views.

---

## 13. App page rules (mandatory)

These rules apply to every app, admin and dashboard page. The showcase's **App patterns** section (`#app-patterns`) runs all three: a settings page, a list page and a create page.

### 13.1 Settings and profile pages
- With **3 or more sub-sections** (profile, password, address, notifications…), use **`Tabs variant="secondary"`**, vertical from 768px up and horizontal below, with **one `Card` per tab**, each with its own Save button.
- **Never stack many cards down one long page.**
```tsx
import { Card, Tabs, useMediaQuery } from "@heroui/react"
import { Lock, MapPin, Person } from "@gravity-ui/icons"

const wide = useMediaQuery("(min-width: 768px)", { defaultValue: true })

<PageHeader title="Settings" description="Manage your account and security." />
<Tabs variant="secondary" align="start" orientation={wide ? "vertical" : "horizontal"} defaultSelectedKey="profile" className="gap-6">
  <Tabs.ListContainer className={wide ? "w-56 shrink-0 self-start" : undefined}>
    <Tabs.List aria-label="Settings sections" className="w-full">
      <Tabs.Tab id="profile" className="h-11 justify-start gap-2.5 px-4"><Person /> Profile<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="password" className="h-11 justify-start gap-2.5 px-4"><Lock /> Password<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="address" className="h-11 justify-start gap-2.5 px-4"><MapPin /> Address<Tabs.Indicator /></Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="password" className="min-w-0 p-0">
    <Card className="p-0">
      <Form validationBehavior="aria" validationErrors={errors} onSubmit={save}>
        <Card.Header className="p-6 pb-0 md:p-8 md:pb-0"><Card.Title className="text-lg font-semibold">Change password</Card.Title></Card.Header>
        <Card.Content className="grid gap-5 p-6 md:p-8">…TextFields…</Card.Content>
        <Card.Footer className="justify-end border-t border-separator px-6 py-4 md:px-8"><Button type="submit">Update password</Button></Card.Footer>
      </Form>
    </Card>
  </Tabs.Panel>
  …
</Tabs>
```

### 13.2 List and data pages
Every list page has this structure, in this order:
1. **`PageHeader`** with `title`, `description` and a primary **"Add <Thing>"** `Button` with a `Plus` icon in `actions`.
2. **Toolbar:** a `SearchField`, plus filters (`Select`…).
3. **`Table`.** Row actions go in a `Dropdown` (an icon-only ghost `Button` with `Ellipsis` and an `aria-label`) in the **last column**. Only list actions that work.
   Every list handles **four states**, each with a cause and one next action, rendered through `Table.Body renderEmptyState` or as skeleton rows:
   - **Loading:** skeleton rows shaped like the real rows, `aria-busy` on the table and screen-reader text ("Loading merchants…").
   - **Error:** what failed and a "Try again" button.
   - **Empty (first run):** why it is empty and the action that fills it ("Add the first merchant").
   - **Filtered to nothing:** what was searched and a "Clear search and filter" button.
4. **`DataPagination`**, **always present, even with a single page.** Default `pageSize` is 10.

State rules:
- **Reset to page 1** whenever the search, a filter or the page size changes.
- Data from an API uses **server-side pagination**: send `page` and `pageSize`, read `total`.
```tsx
const [query, setQuery] = useState("")
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)
// const { rows, total, status } = useMerchants({ query, page, pageSize })

<PageHeader title="Merchants" description="Every merchant registered on AiYO."
  actions={<Button onPress={openAdd}><Plus /> Add merchant</Button>} />

<SearchField aria-label="Search merchants" value={query} onChange={(v) => { setQuery(v); setPage(1) }}>
  <SearchField.Group>
    <SearchField.SearchIcon />
    <SearchField.Input placeholder="Search name or ID" />
    <SearchField.ClearButton aria-label="Clear search" />
  </SearchField.Group>
</SearchField>

<Table aria-busy={status === "loading"}>
  <Table.ScrollContainer>
    <Table.Content aria-label="Merchants" className="min-w-[640px]">
      <Table.Header>
        <Table.Column isRowHeader>Merchant</Table.Column>
        <Table.Column>Status</Table.Column>
        <Table.Column className="w-16"><span className="sr-only">Actions</span></Table.Column>
      </Table.Header>
      <Table.Body renderEmptyState={() => (
        <EmptyState className="flex flex-col items-center gap-3 py-14 text-center">…cause and one next action…</EmptyState>
      )}>
        {rows.map((m) => (
          <Table.Row key={m.id} id={m.id}>
            <Table.Cell>{m.name}</Table.Cell>
            <Table.Cell><Chip size="sm" variant="soft" color="success">Active</Chip></Table.Cell>
            <Table.Cell>
              <Dropdown>
                <Button isIconOnly size="sm" variant="ghost" aria-label={`Actions for ${m.name}`}><Ellipsis /></Button>
                <Dropdown.Popover placement="bottom end">
                  <Dropdown.Menu onAction={(key) => (key === "edit" ? openEdit(m) : askDelete(m))}>
                    <Dropdown.Item id="edit" textValue="Edit"><Pencil /><Label>Edit</Label></Dropdown.Item>
                    <Dropdown.Item id="delete" textValue="Delete" variant="danger"><TrashBin /><Label>Delete</Label></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>

<DataPagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} onPageSizeChange={setPageSize} />
```

### 13.3 Add / edit data: Modal or dedicated page
| Use a **Modal** when the form is small | Use a **dedicated page** (`/things/new`, `/things/:id/edit`) when it is large |
|---|---|
| 6 fields or fewer | More than 6 fields |
| One section | Several sections |
| No file uploads | File uploads |
| No nested line items | Nested line items or tables |
| | The URL should be shareable |
| `Modal.Footer` with Cancel (`slot="close"`, `secondary`) + Save (primary) | `PageHeader back` → `FormSection` blocks → `FormActions` |

- The same rule applies to **edit**.
- **Delete always asks for confirmation** in an `AlertDialog` with a `danger` button.
```tsx
// Small form, opened from a button or a row action
<Modal.Backdrop isOpen={editor.isOpen} onOpenChange={editor.setOpen}>
  <Modal.Container>
    <Modal.Dialog>
      {({ close }) => (
        <Form className="contents" onSubmit={(e) => { e.preventDefault(); save(new FormData(e.currentTarget)); close() }}>
          <Modal.CloseTrigger />
          <Modal.Header><Modal.Heading>Add merchant</Modal.Heading></Modal.Header>
          <Modal.Body className="grid gap-5">…6 fields or fewer…</Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">Cancel</Button>
            <Button type="submit">Save merchant</Button>
          </Modal.Footer>
        </Form>
      )}
    </Modal.Dialog>
  </Modal.Container>
</Modal.Backdrop>

// Large form: /invoices/new
<Form validationBehavior="aria" validationErrors={errors} onSubmit={save} className="flex flex-col gap-10">
  <PageHeader back={{ href: "/invoices", label: "Invoices" }} title="New invoice" />
  <FormSection title="Customer" description="Who receives this invoice.">…TextFields…</FormSection>
  <FormSection title="Line items">…</FormSection>
  <FormActions>
    <Button variant="secondary" onPress={cancel}>Cancel</Button>
    <Button type="submit">Create invoice</Button>
  </FormActions>
</Form>

// Delete confirmation
<AlertDialog.Backdrop isOpen={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
  <AlertDialog.Container size="sm">
    <AlertDialog.Dialog>
      <AlertDialog.Header>
        <AlertDialog.Icon status="danger" />
        <AlertDialog.Heading>Delete {toDelete?.name}?</AlertDialog.Heading>
      </AlertDialog.Header>
      <AlertDialog.Body>This removes the merchant and its outlets. You can't undo this.</AlertDialog.Body>
      <AlertDialog.Footer>
        <Button slot="close" variant="secondary">Cancel</Button>
        <Button variant="danger" onPress={confirmDelete}>Delete</Button>
      </AlertDialog.Footer>
    </AlertDialog.Dialog>
  </AlertDialog.Container>
</AlertDialog.Backdrop>
```

---

## 14. Anti-slop filter and decisions

### 14.1 How the filter fits
AiYO vendors the antislop skills (MIT, release 3.2.21) in `skills/antislop*`.

| File | Role |
|---|---|
| `DESIGN.md` (this file) | **Direction**: identity, palette, typography, mood, dials |
| `skills/antislop/SKILL.md` + the skill for the task | **Filter**: rejects technique without purpose, requires liveliness, ends with the Delivery Gate |
| `AGENTS.md` / `CLAUDE.md` | **Routing**: tells the agent to read this file first, then the filter |

Task skills: `antislop-ui` (visual), `antislop-copywriting` (copy), `antislop-human` (contrast, keyboard, focus, states; ships `contrast-check.py`), `antislop-layoutmobile` (breakpoints, tap targets) and `antislop-code` (code comments).

Dials for AiYO products: **ENERGY 2 / RHYTHM 2 / MOTION 2**. Before building, declare a Design Read, for example: *"Reading this as: B2B SaaS landing for small-business owners, in the AiYO Minimalist Modern style on HeroUI, dial ENERGY 2 / RHYTHM 2 / MOTION 2."* Run the Delivery Gate before delivering.

### 14.2 Decision log (R-37)

**Owner decisions, v2 (2026-10-20)**

| Decision | Rule | Reason |
|---|---|---|
| HeroUI v3 replaces Radix UI and the shadcn-style copies; projects use `@heroui/react` directly with HeroUI's default component style | R-20 | One maintained component library for every AiYO product, with React Aria behaviour. AiYO keeps colour, branding and page blocks. |
| Geist Sans and Geist Mono replace Calistoga, Inter and JetBrains Mono | R-06 | Owner choice. One superfamily, so the mono label voice shares the sans skeleton, and it sits quietly next to HeroUI's chrome. Geist is on antislop's default roster; it stays as an owner decision with this reason. |
| AiYO docs and rules may be rewritten to fit HeroUI | R-37 | Owner instruction, so v1 rules that fought HeroUI (`accent` as a hover surface, 48px inputs, local `<Button>`) were replaced. |

**Applied under that direction (each with its reason)**

| Change | Rule | Reason |
|---|---|---|
| Icons: `@gravity-ui/icons` instead of Lucide | R-04 | The set HeroUI's docs and examples use, so copied examples work unchanged. v1's reason for Lucide (matching shadcn/ui) no longer applies. Pick each icon for relevance; no sparkle, magic, robot or lightning as feature icons. |
| Gradient reduced to one headline word, the leading icon tile and one data highlight; buttons, checkboxes, switches, progress and pagination use HeroUI's solid accent | R-01, R-13 | An accent everywhere stops being an accent (audit 001 items 16 and 17). |
| Elevation from HeroUI's three shadow levels; no accent glow shadows | R-12 | Shadows mark elevation only (audit 001 item 18). |
| Field edges, checkbox/radio borders and off switch tracks at 3:1 | antislop-human | Non-text contrast (audit 001 item 19). |
| Touch layer for HeroUI controls | R-03 | HeroUI's default controls are under 44px. |
| `Reveal` keeps content visible until JS hides below-the-fold elements | C-4 | v1 content was invisible until the animation ran (audit 001 item 28). |
| Light/dark `ThemeToggle` in the showcase | R-21 | The dark palette shipped without a toggle (audit 001 item 30). |
| `PricingCard` shows a reason (`highlightLabel`), never "Most popular" | R-09, R-31 | A highlighted tier needs a written reason. |

**Still dropped (v1 owner decisions, unchanged)**

| Pattern | Rule | Status |
|---|---|---|
| Pill `SectionLabel` with a pulsing dot | R-09, R-31 | `SectionLabel` is a plain mono label. A dot only marks a real live state. |
| Endless decorative motion | R-19 | Only loading indicators loop. `HeroGraphic` is static. |
| Dot-grid texture and blurred glows | R-07, R-13 | Inverted sections are solid deep slate. |
| Arrows on buttons by default | R-08 | `data-arrow` on the ONE primary CTA per screen only. |

**Dose caps** (R-10): backdrop blur only on the sticky navbar. Modal and AlertDialog backdrops are opaque; `FormActions` is solid.

**Kept on purpose** (R-31 reasons)

| Pattern | Rule | Reason |
|---|---|---|
| Electric Blue `#0052FF` (gradient to `#3366FF`) | R-01 | The brand identity; it marks the single primary action level. |
| Uppercase Geist Mono labels with wide tracking (section labels, stat labels, meta) | R-06 | The system's typographic motif, always small at 12px. |
| HeroUI's elevation shadows | R-12 | Cards sit just above the canvas; overlays float. |

### 14.3 Exception: showcase sample content
The showcase keeps sample content: hero graphic numbers, sample testimonials, sample stats and three sample pricing tiers. All of it is labelled as sample data. This is an owner override of R-17, R-18 and R-38 **for the showcase only**. In real AiYO products these blocks use real data only; otherwise leave the section out.

---

## 15. Migrating a v1 project (Radix / shadcn-style) to v2

1. Install: `npm i @heroui/react @heroui/styles @fontsource-variable/geist @fontsource-variable/geist-mono @gravity-ui/icons` (npm 7+ also installs HeroUI's React Aria peers; if your package manager does not install peers, add `react-aria-components react-aria @react-aria/utils @react-aria/ssr @internationalized/date`). Remove `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` and `motion` once nothing imports them.
2. Replace `aiyo.css` and remove any other `@import "tailwindcss"`.
3. Replace `src/components/ui/*` and `src/components/blocks/*` with HeroUI imports and `src/components/aiyo/*`; replace `src/lib/motion.tsx`; delete `src/lib/utils.ts` (`cn` now comes from `@heroui/react`).

| v1 | v2 |
|---|---|
| `bg-primary`, `text-primary`, `bg-gradient-primary` | `bg-accent`, `text-accent`, `bg-gradient-accent` (gradient only where §2.4 allows) |
| `text-muted-foreground` | `text-muted` |
| `bg-muted` (fill) | `bg-default` or `bg-surface-secondary` |
| `bg-card`, `bg-popover` | `bg-surface`, `bg-overlay` |
| `destructive`, `text-destructive-text` | `danger`, `text-danger-soft-foreground` |
| `text-success-text`, `text-warning-text` | `text-success-soft-foreground`, `text-warning-soft-foreground` |
| `border-input`, `ring` | `border-field-border`, `focus` |
| `font-display` (Calistoga) | `heading-hero`, `heading-section` (Geist 600) |
| `font-mono text-xs uppercase tracking-[0.15em]` | `label-caps` |
| `<Button variant="primary\|secondary\|ghost\|destructive\|link">` | `variant="primary\|outline\|ghost\|danger"`; links: `<Link>` |
| `<Button asChild><a/></Button>` | `<Link className={buttonVariants()}>` |
| `onClick` | `onPress` |
| `<Badge>` | `<Chip>` |
| `<Field label hint error><Input/></Field>` | `<TextField><Label/><Input/><Description/><FieldError/></TextField>` |
| `<Select><SelectTrigger><SelectValue/>…<SelectItem value>` | `<Select><Select.Trigger><Select.Value/>…<ListBox.Item id textValue>` |
| `<Dialog>`, `DialogContent`, `DialogClose` | `<Modal>`, `Modal.Dialog`, `<Button slot="close">` |
| Delete confirmation in `Dialog` | `AlertDialog` |
| `<DropdownMenu>` | `<Dropdown>` |
| `<Tabs value>` / `TabsTrigger value` / `TabsContent value` | `<Tabs selectedKey>` / `Tabs.Tab id` + `Tabs.Indicator` / `Tabs.Panel id` |
| `<Accordion type="single">` | `<Accordion>` (single by default) |
| `<Progress value>` | `<ProgressBar value>` with Track and Fill |
| `<Pagination>` (AiYO v1) | `<DataPagination>` from `@/components/aiyo/data-pagination` |
| `<TooltipProvider>` | Not needed |
| `<Card variant="interactive">`, `featured` | HeroUI `<Card>`; emphasis through layout and the gradient icon tile |
| `MoreHorizontal`, `Trash2`, `Search` (Lucide) | `Ellipsis`, `TrashBin`, `Magnifier` (Gravity UI) |
