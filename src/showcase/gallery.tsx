import * as React from "react"
import {
  ArrowRight,
  Bell,
  CircleCheck,
  Info,
  LogOut,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  TriangleAlert,
  User,
  Receipt,
  Store,
  Wallet,
} from "lucide-react"
import { Container, SectionHeader, Section } from "@/components/blocks/section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field } from "@/components/ui/field"
import { GradientText } from "@/components/ui/gradient-text"
import { IconTile } from "@/components/ui/icon-tile"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Pagination } from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SectionLabel } from "@/components/ui/section-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Stat } from "@/components/ui/stat"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Demo } from "./shared"

const GROUPS = [
  { label: "Actions", items: [["button", "Button"], ["icon-tile", "Icon Tile"]] },
  { label: "Labels", items: [["badge", "Badge"], ["section-label", "Section Label"], ["gradient-text", "Gradient Text"]] },
  { label: "Forms", items: [["input", "Input & Field"], ["select", "Select"], ["choices", "Checkbox · Radio · Switch"]] },
  { label: "Surfaces", items: [["card", "Card"], ["dialog", "Dialog"]] },
  { label: "Navigation", items: [["tabs", "Tabs"], ["accordion", "Accordion"], ["dropdown", "Dropdown Menu"]] },
  { label: "Feedback", items: [["alert", "Alert"], ["progress", "Progress · Spinner · Skeleton"], ["tooltip", "Tooltip · Kbd"]] },
  { label: "Data", items: [["stat", "Stat"], ["table", "Table"], ["pagination", "Pagination"], ["avatar", "Avatar"]] },
] as const

function useActiveId(ids: string[]) {
  const [active, setActive] = React.useState(ids[0])
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -65% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids])
  return active
}

const ALL_IDS = GROUPS.flatMap((g) => g.items.map(([id]) => id))

export function Gallery() {
  const active = useActiveId(ALL_IDS)
  const [plan, setPlan] = React.useState("pro")
  const [page, setPage] = React.useState(4)
  const [pageSize, setPageSize] = React.useState(10)

  return (
    <Section id="components">
      <Container>
        <SectionHeader
          label="Components"
          title={
            <>
              Thirty-odd pieces, <GradientText>one voice</GradientText>.
            </>
          }
          description="Built on Radix primitives and cva, following shadcn/ui file names and APIs, so they drop straight into any AiYO React project. Every preview below is the real component."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <nav aria-label="Components" className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              {GROUPS.map((g) => (
                <div key={g.label} className="flex flex-col gap-1">
                  <span className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{g.label}</span>
                  {g.items.map(([id, name]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={
                        "relative rounded-md py-1 pl-3 text-sm transition-colors before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full before:transition-colors " +
                        (active === id
                          ? "font-medium text-foreground before:bg-gradient-primary"
                          : "text-muted-foreground before:bg-border hover:text-foreground")
                      }
                    >
                      {name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </nav>

          <div className="flex min-w-0 flex-col gap-20">
            <Demo
              id="button"
              title="Button"
              description="Primary is the signature gradient and lifts on hover. An arrow marked data-arrow slides right, reserved for the one main CTA on a screen. Secondary is the outline partner. Ghost for low-emphasis, inverted for dark-on-light emphasis. Sizes sm (dense desktop only) to xl (hero CTA)."
              code={`import { Button } from "@/components/ui/button"

<Button>Create invoice <ArrowRight data-arrow /></Button> {/* arrow: main CTA only */}
<Button variant="secondary">Documentation</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="inverted">Talk to sales</Button>
<Button variant="destructive">Delete</Button>
<Button size="xl">Hero CTA</Button>
<Button size="icon" variant="secondary" aria-label="Add"><Plus /></Button>`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button>
                    Create invoice <ArrowRight data-arrow />
                  </Button>
                  <Button variant="secondary">Documentation</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="inverted">Talk to sales</Button>
                  <Button variant="destructive">Delete</Button>
                  <Button variant="link">Learn more</Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">
                    Extra large
                  </Button>
                  <Button size="icon" variant="secondary" aria-label="Add">
                    <Plus />
                  </Button>
                  <Button disabled>
                    <Spinner /> Saving
                  </Button>
                </div>
              </div>
            </Demo>

            <Demo
              id="icon-tile"
              title="Icon Tile"
              description="Feature icons sit on a full gradient, not a translucent wash. Scales up 10% when its group parent is hovered."
              code={`<IconTile><Receipt /></IconTile>
<IconTile variant="soft" size="lg"><Wallet /></IconTile>
<IconTile variant="muted" size="sm"><Settings /></IconTile>`}
            >
              <IconTile size="sm">
                <Receipt />
              </IconTile>
              <IconTile>
                <Receipt />
              </IconTile>
              <IconTile size="lg">
                <Receipt />
              </IconTile>
              <IconTile variant="soft" size="lg">
                <Wallet />
              </IconTile>
              <IconTile variant="muted" size="lg">
                <Settings />
              </IconTile>
            </Demo>

            <Demo
              id="badge"
              title="Badge"
              description="Pill-shaped status and metadata. Primary (gradient) is for the one thing that should shine, such as a trend or a featured tier."
              code={`<Badge>Draft</Badge>
<Badge variant="primary"><TrendingUp /> +24%</Badge>
<Badge variant="soft">New</Badge>
<Badge variant="success">Paid</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Failed</Badge>`}
            >
              <Badge>Draft</Badge>
              <Badge variant="primary">Featured</Badge>
              <Badge variant="soft">New</Badge>
              <Badge variant="outline">v1.0</Badge>
              <Badge variant="success">
                <CircleCheck /> Paid
              </Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="destructive">Failed</Badge>
            </Demo>

            <Demo
              id="section-label"
              title="Section Label"
              description="Names a marketing section above its headline: plain uppercase JetBrains Mono, 0.15em tracking. No pill and no dot; it marks no state."
              code={`<SectionLabel>Settlement</SectionLabel>`}
            >
              <SectionLabel>Settlement</SectionLabel>
            </Demo>

            <Demo
              id="gradient-text"
              title="Gradient Text"
              description="One key word per headline gets the gradient. The underline bar is reserved for the hero."
              code={`<h2 className="font-display text-5xl">
  Payments that feel <GradientText>effortless</GradientText>
</h2>
<h1 className="font-display text-6xl">
  Ship it <GradientText underline>today</GradientText>
</h1>`}
              previewClassName="flex-col"
            >
              <p className="text-center font-display text-4xl leading-tight md:text-5xl">
                Payments that feel <GradientText>effortless</GradientText>
              </p>
              <p className="text-center font-display text-4xl leading-tight md:text-5xl">
                Ship it <GradientText underline>today</GradientText>
              </p>
            </Demo>

            <Demo
              id="input"
              title="Input, Textarea & Field"
              description="h-12 by default, rounded-xl, focus ring in primary with an offset. Field wires up label, hint, error and aria attributes for you."
              code={`<Field label="Email" htmlFor="email" hint="We'll never share it." required>
  <Input id="email" type="email" placeholder="email@example.com" />
</Field>
<Field label="Merchant ID" htmlFor="mid" error="Merchant ID is required">
  <Input id="mid" />
</Field>
<Textarea placeholder="Notes" />`}
              previewClassName="block"
            >
              <div className="mx-auto grid w-full max-w-xl gap-6 sm:grid-cols-2">
                <Field label="Email" htmlFor="demo-email" hint="We'll never share it." required>
                  <Input id="demo-email" type="email" placeholder="email@example.com" />
                </Field>
                <Field label="Merchant ID" htmlFor="demo-mid" error="Merchant ID is required">
                  <Input id="demo-mid" placeholder="MID-0000" />
                </Field>
                <div className="relative sm:col-span-2">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-11" placeholder="Search transactions…" aria-label="Search" />
                </div>
                <Field label="Notes" htmlFor="demo-notes" className="sm:col-span-2">
                  <Textarea id="demo-notes" placeholder="Anything we should know?" />
                </Field>
              </div>
            </Demo>

            <Demo
              id="select"
              title="Select"
              description="Radix Select wearing the same field chrome as Input, so forms read as one system."
              code={`<Select defaultValue="bca">
  <SelectTrigger className="w-64"><SelectValue placeholder="Choose bank" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="bca">BCA</SelectItem>
    <SelectItem value="mandiri">Mandiri</SelectItem>
  </SelectContent>
</Select>`}
            >
              <Select defaultValue="bca">
                <SelectTrigger className="w-64" aria-label="Bank">
                  <SelectValue placeholder="Choose bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="mandiri">Mandiri</SelectItem>
                  <SelectItem value="bni">BNI</SelectItem>
                  <SelectItem value="bri">BRI</SelectItem>
                </SelectContent>
              </Select>
            </Demo>

            <Demo
              id="choices"
              title="Checkbox, Radio & Switch"
              description="Selected states fill with the gradient. Always pair with a Label; the whole row is the hit target."
              code={`<Label><Checkbox defaultChecked /> Email receipts</Label>
<RadioGroup defaultValue="pro">
  <Label><RadioGroupItem value="pro" /> Pro</Label>
</RadioGroup>
<Label><Switch defaultChecked /> Auto settlement</Label>`}
            >
              <div className="grid w-full max-w-xl gap-8 sm:grid-cols-3">
                <div className="flex flex-col gap-4">
                  <Label className="cursor-pointer">
                    <Checkbox defaultChecked /> Email receipts
                  </Label>
                  <Label className="cursor-pointer">
                    <Checkbox checked="indeterminate" /> Some selected
                  </Label>
                  <Label className="cursor-pointer">
                    <Checkbox /> SMS alerts
                  </Label>
                </div>
                <RadioGroup value={plan} onValueChange={setPlan}>
                  {["starter", "pro", "enterprise"].map((p) => (
                    <Label key={p} className="cursor-pointer capitalize">
                      <RadioGroupItem value={p} /> {p}
                    </Label>
                  ))}
                </RadioGroup>
                <div className="flex flex-col gap-4">
                  <Label className="cursor-pointer">
                    <Switch defaultChecked /> Auto settlement
                  </Label>
                  <Label className="cursor-pointer">
                    <Switch /> Maintenance
                  </Label>
                </div>
              </div>
            </Demo>

            <Demo
              id="card"
              title="Card"
              description="White, 1px border, rounded-2xl. default (shadow-md), elevated (shadow-xl), interactive (lifts with a faint primary wash) and featured (2px gradient stroke)."
              code={`<Card variant="interactive">
  <CardHeader>
    <IconTile><Store /></IconTile>
    <CardTitle>Instant settlement</CardTitle>
    <CardDescription>Funds land in seconds.</CardDescription>
  </CardHeader>
</Card>
<Card featured>…</Card>`}
              previewClassName="grid gap-5 md:grid-cols-3 items-stretch"
            >
              <Card variant="interactive">
                <CardHeader>
                  <IconTile className="mb-3">
                    <Store />
                  </IconTile>
                  <CardTitle>Interactive</CardTitle>
                  <CardDescription>Hover me: I lift, my shadow deepens, my icon grows.</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated</CardTitle>
                  <CardDescription>For surfaces that sit above the page, like popovers and hero cards.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button size="sm" variant="secondary">
                    Action
                  </Button>
                </CardFooter>
              </Card>
              <Card featured>
                <CardHeader>
                  <Badge variant="primary" className="mb-2">
                    Featured
                  </Badge>
                  <CardTitle>Featured</CardTitle>
                  <CardDescription>2px gradient stroke. One per view, at most.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={72} />
                </CardContent>
              </Card>
            </Demo>

            <Demo
              id="dialog"
              sample
              title="Dialog"
              description="Solid slate overlay (no blur), pops in with the AiYO ease. Footer buttons stack on mobile with the primary action first in reading order."
              code={`<Dialog>
  <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm payout</DialogTitle>
      <DialogDescription>…</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm payout</DialogTitle>
                    <DialogDescription>[Amount] will be sent to [bank account]. This can't be undone.</DialogDescription>
                  </DialogHeader>
                  <Field label="PIN" htmlFor="demo-pin">
                    <Input id="demo-pin" type="password" inputMode="numeric" placeholder="••••••" />
                  </Field>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>
                        Confirm payout
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Demo>

            <Demo
              id="tabs"
              title="Tabs"
              description="Segmented control on a muted track; the active tab becomes a small white card. Use orientation vertical for side navigation on settings-style pages (see App Patterns)."
              code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`}
            >
              <Tabs defaultValue="overview" className="w-full max-w-md">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                {["overview", "activity", "settings"].map((t) => (
                  <TabsContent key={t} value={t}>
                    <p className="rounded-xl border border-border bg-background p-5 text-sm capitalize text-muted-foreground">{t} panel content.</p>
                  </TabsContent>
                ))}
              </Tabs>
            </Demo>

            <Demo
              id="accordion"
              title="Accordion"
              description="FAQ-style disclosure. The plus rotates into an ×, filling with the gradient when open."
              code={`<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>How fast is settlement?</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`}
              previewClassName="block"
            >
              <Accordion type="single" collapsible defaultValue="a" className="mx-auto w-full max-w-xl">
                <AccordionItem value="a">
                  <AccordionTrigger>Can I use these outside React?</AccordionTrigger>
                  <AccordionContent>The tokens in aiyo.css are plain CSS variables, so any stack can read them. The components themselves are React.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                  <AccordionContent>Add the dark class to html. It's the same palette used by inverted sections.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="c">
                  <AccordionTrigger>How do AI agents learn the rules?</AccordionTrigger>
                  <AccordionContent>Point them at DESIGN.md, AGENTS.md or llms.txt, or install the aiyo-design Claude skill.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Demo>

            <Demo
              id="dropdown"
              title="Dropdown Menu"
              description="Floating card menu with mono group labels and keyboard shortcuts."
              code={`<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="secondary" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuItem><User /> Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><LogOut /> Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">
                    Account <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <User /> Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell /> Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings /> Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Demo>

            <Demo
              id="alert"
              sample
              title="Alert"
              description="Notices carry a 3px colour bar on the left. Info uses the brand gradient."
              code={`<Alert>
  <Info />
  <AlertTitle>Settlement scheduled</AlertTitle>
  <AlertDescription>Funds arrive tomorrow at 09:00.</AlertDescription>
</Alert>
<Alert variant="warning">…</Alert>`}
              previewClassName="grid w-full gap-4 md:grid-cols-2"
            >
              <Alert>
                <Info />
                <AlertTitle>Settlement scheduled</AlertTitle>
                <AlertDescription>Funds arrive tomorrow at 09:00 WIB.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CircleCheck />
                <AlertTitle>Payment received</AlertTitle>
                <AlertDescription>Invoice [number] is now paid.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <TriangleAlert />
                <AlertTitle>KYC expiring</AlertTitle>
                <AlertDescription>Renew documents within 7 days.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <TriangleAlert />
                <AlertTitle>Transfer failed</AlertTitle>
                <AlertDescription>The destination account was rejected.</AlertDescription>
              </Alert>
            </Demo>

            <Demo
              id="progress"
              sample
              title="Progress, Spinner & Skeleton"
              description="Progress fills with the gradient. Skeletons mirror the real layout's shape."
              code={`<Progress value={64} />
<Spinner className="text-primary" />
<Skeleton className="h-4 w-48" />`}
              previewClassName="block"
            >
              <div className="mx-auto grid w-full max-w-xl gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Onboarding</span>
                    <span className="text-muted-foreground">64%</span>
                  </div>
                  <Progress value={64} />
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Spinner className="text-primary" /> Syncing transactions…
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </Demo>

            <Demo
              id="tooltip"
              title="Tooltip & Kbd"
              description="Tooltips are always deep slate, whatever they float over. Wrap the app once in TooltipProvider."
              code={`<Tooltip>
  <TooltipTrigger asChild><Button size="icon" variant="secondary" aria-label="Mail"><Mail /></Button></TooltipTrigger>
  <TooltipContent>Inbox</TooltipContent>
</Tooltip>
<Kbd>⌘</Kbd><Kbd>K</Kbd>`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="secondary" aria-label="Inbox">
                    <Mail />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Inbox · 3 unread</TooltipContent>
              </Tooltip>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Search <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </Demo>

            <Demo
              id="stat"
              sample
              title="Stat"
              description="Metrics in Calistoga at display size, with a gradient trend badge. Looks best inside an inverted section."
              code={`<Stat label="Monthly volume" value="Rp 4,2M" trend="+18%" />
<Stat label="Refund rate" value="0.8%" trend="-0.3%" trendDirection="down" />`}
              previewClassName="grid gap-8 sm:grid-cols-3 justify-items-start"
            >
              <Stat label="Monthly volume" value="Rp 4,2M" trend="+18%" />
              <Stat label="Merchants" value="12.480" trend="+6%" />
              <Stat label="Refund rate" value="0.8%" trend="-0.3%" trendDirection="down" />
            </Demo>

            <Demo
              id="table"
              sample
              title="Table"
              description="Tables float in a card. Mono uppercase column heads; rows get a faint primary wash on hover."
              code={`<Table>
  <TableHeader>
    <TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>INV-0412</TableCell><TableCell><Badge variant="success">Paid</Badge></TableCell></TableRow>
  </TableBody>
</Table>`}
              previewClassName="block"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["INV-0003", "Sample customer C", "success", "Paid", "Rp 1.250.000"],
                    ["INV-0002", "Sample customer B", "warning", "Pending", "Rp 480.000"],
                    ["INV-0001", "Sample customer A", "destructive", "Failed", "Rp 2.100.000"],
                  ].map(([id, cust, v, s, amt]) => (
                    <TableRow key={id}>
                      <TableCell className="font-mono text-xs">{id}</TableCell>
                      <TableCell className="font-medium">{cust}</TableCell>
                      <TableCell>
                        <Badge variant={v as "success"}>{s}</Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{amt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Demo>

            <Demo
              id="pagination"
              sample
              title="Pagination"
              description="Mandatory under every data table, even with one page. Shows the range, rows per page, and pages with ellipses. The current page wears the gradient."
              code={`<Pagination
  page={page}
  pageSize={pageSize}
  total={248}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>`}
              previewClassName="block"
            >
              <Pagination page={page} pageSize={pageSize} total={248} onPageChange={setPage} onPageSizeChange={setPageSize} />
            </Demo>

            <Demo
              id="avatar"
              title="Avatar"
              description="Initials sit on the gradient. Groups overlap with a card-coloured ring."
              code={`<Avatar><AvatarImage src={url} /><AvatarFallback>AP</AvatarFallback></Avatar>
<AvatarGroup>…</AvatarGroup>`}
            >
              <Avatar className="size-12">
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <AvatarGroup>
                {["RS", "DW", "MN", "+5"].map((i) => (
                  <Avatar key={i}>
                    <AvatarFallback className={i.startsWith("+") ? "bg-muted bg-none text-foreground" : undefined}>{i}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </Demo>
          </div>
        </div>
      </Container>
    </Section>
  )
}
