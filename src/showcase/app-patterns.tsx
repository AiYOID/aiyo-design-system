import * as React from "react"
import {
  Bell,
  Check,
  FileText,
  Inbox,
  Lock,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  User,
  X,
} from "lucide-react"
import { Container, Section, SectionHeader } from "@/components/blocks/section"
import { FormActions, FormSection, PageHeader } from "@/components/blocks/page-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field } from "@/components/ui/field"
import { GradientText } from "@/components/ui/gradient-text"
import { IconTile } from "@/components/ui/icon-tile"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination } from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/lib/motion"
import { CodeBlock } from "./shared"

/* A mock app window so each pattern reads as a real screen. */
function AppFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <span className="truncate rounded-md bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground">{url}</span>
      </div>
      <div className="p-5 md:p-8">{children}</div>
    </div>
  )
}

function PatternIntro({ index, title, rules }: { index: string; title: string; rules: React.ReactNode[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div className="flex items-start gap-4">
        <span className="font-display text-4xl leading-none text-gradient">{index}</span>
        <h3 className="text-2xl font-semibold tracking-[-0.01em]">{title}</h3>
      </div>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        {rules.map((r, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-3 stroke-3" />
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------------------------------------------------------- Settings */
function SettingsDemo() {
  return (
    <AppFrame url="app.aiyo.id/settings">
      <PageHeader title="Settings" description="Manage your account, security and notifications." className="mb-8" />
      <Tabs defaultValue="password" orientation="vertical">
        <TabsList>
          <TabsTrigger value="profile">
            <User /> Profile
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock /> Password
          </TabsTrigger>
          <TabsTrigger value="address">
            <MapPin /> Address
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldCheck /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>How you appear across AiYO products.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-center gap-4 sm:col-span-2">
                <Avatar className="size-14">
                  <AvatarFallback className="text-base">AP</AvatarFallback>
                </Avatar>
                <Button variant="secondary" size="sm">
                  Change photo
                </Button>
              </div>
              <Field label="Full name" htmlFor="st-name">
                <Input id="st-name" defaultValue="Aji Prakoso" />
              </Field>
              <Field label="Phone" htmlFor="st-phone">
                <Input id="st-phone" defaultValue="+62 812 0000 0000" />
              </Field>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
              <CardDescription>Use at least 8 characters with a mix of letters and numbers.</CardDescription>
            </CardHeader>
            <CardContent className="grid max-w-md gap-5">
              <Field label="Current password" htmlFor="st-cur">
                <Input id="st-cur" type="password" placeholder="••••••••" />
              </Field>
              <Field label="New password" htmlFor="st-new" hint="Minimum 8 characters.">
                <Input id="st-new" type="password" placeholder="••••••••" />
              </Field>
              <Field label="Confirm new password" htmlFor="st-conf">
                <Input id="st-conf" type="password" placeholder="••••••••" />
              </Field>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Update password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>Used for invoices and settlement documents.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <Field label="Street" htmlFor="st-street" className="sm:col-span-2">
                <Textarea id="st-street" defaultValue="Jl. Sudirman No. 1" className="min-h-20" />
              </Field>
              <Field label="City" htmlFor="st-city">
                <Input id="st-city" defaultValue="Jakarta Selatan" />
              </Field>
              <Field label="Postal code" htmlFor="st-zip">
                <Input id="st-zip" defaultValue="12190" />
              </Field>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save address</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what we tell you about.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border">
              {[
                ["Payment received", "Every successful transaction", true],
                ["Daily summary", "A recap at 21:00 WIB", true],
                ["Product news", "New features and tips", false],
              ].map(([t, d, on]) => (
                <Label key={String(t)} className="flex cursor-pointer items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
                  <span className="flex flex-col gap-1">
                    <span>{t}</span>
                    <span className="text-xs font-normal text-muted-foreground">{d}</span>
                  </span>
                  <Switch defaultChecked={Boolean(on)} />
                </Label>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Two-factor authentication and active sessions.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <IconTile size="sm">
                  <ShieldCheck />
                </IconTile>
                <div className="text-sm">
                  <div className="font-medium">Two-factor authentication</div>
                  <div className="text-muted-foreground">Ask for an OTP on every new device.</div>
                </div>
              </div>
              <Switch defaultChecked aria-label="Two-factor authentication" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppFrame>
  )
}

/* ---------------------------------------------------------------- List page */
type Merchant = { id: string; name: string; city: string; status: "active" | "pending" | "suspended"; volume: number }

const CITIES = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar", "Yogyakarta", "Semarang"]
const NAMES = ["Toko", "Kopi", "Warung", "Apotek", "Bengkel", "Laundry", "Bakery", "Mart", "Studio", "Klinik"]
const SUFFIX = ["Sinar Jaya", "Senja", "Makmur", "Sehat", "Barokah", "Bersih", "Manis", "Sentosa", "Kreatif", "Prima", "Abadi"]
const SEED: Merchant[] = Array.from({ length: 57 }, (_, i) => ({
  id: `MRC-${String(1000 + i)}`,
  name: `${NAMES[i % NAMES.length]} ${SUFFIX[(i * 7) % SUFFIX.length]}`,
  city: CITIES[(i * 3) % CITIES.length],
  status: i % 9 === 4 ? "suspended" : i % 5 === 2 ? "pending" : "active",
  volume: ((i * 7919) % 97) * 1_250_000 + 500_000,
}))
const STATUS_BADGE = { active: "success", pending: "warning", suspended: "destructive" } as const
const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID")

function AddMerchantDialog({ onAdd }: { onAdd: (m: Merchant) => void }) {
  const [open, setOpen] = React.useState(false)
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    onAdd({
      id: `MRC-${Math.floor(2000 + Math.random() * 7000)}`,
      name: String(f.get("name") || "New merchant"),
      city: String(f.get("city") || "Jakarta"),
      status: "pending",
      volume: 0,
    })
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add merchant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add merchant</DialogTitle>
          <DialogDescription>A short form (≤6 fields), so it opens in a modal.</DialogDescription>
        </DialogHeader>
        <form id="add-merchant" onSubmit={submit} className="grid gap-5">
          <Field label="Merchant name" htmlFor="am-name" required>
            <Input id="am-name" name="name" placeholder="Toko Sinar Jaya" required />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" htmlFor="am-city">
              <Input id="am-city" name="city" placeholder="Jakarta" />
            </Field>
            <Field label="Phone" htmlFor="am-phone">
              <Input id="am-phone" name="phone" placeholder="+62…" />
            </Field>
          </div>
          <Field label="Email" htmlFor="am-email">
            <Input id="am-email" name="email" type="email" placeholder="owner@toko.id" />
          </Field>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="add-merchant">
            Save merchant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteDialog({ merchant, onConfirm, onClose }: { merchant: Merchant | null; onConfirm: () => void; onClose: () => void }) {
  return (
    <Dialog open={!!merchant} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {merchant?.name}?</DialogTitle>
          <DialogDescription>This removes the merchant and its outlets. This can't be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            <Trash2 /> Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ListPageDemo() {
  const [rows, setRows] = React.useState(SEED)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [toDelete, setToDelete] = React.useState<Merchant | null>(null)

  const filtered = rows.filter(
    (m) =>
      (status === "all" || m.status === status) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) || m.id.toLowerCase().includes(query.toLowerCase())),
  )
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <AppFrame url="app.aiyo.id/merchants">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Merchants"
          description="Every merchant registered on AiYO."
          actions={
            <AddMerchantDialog
              onAdd={(m) => {
                setRows((r) => [m, ...r])
                setPage(1)
              }}
            />
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              size="sm"
              className="h-10 pl-10"
              placeholder="Search name or ID…"
              aria-label="Search merchants"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v)
              setPage(1)
            }}
          >
            <SelectTrigger size="sm" className="h-10 sm:w-44" aria-label="Status filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Volume</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-14">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <IconTile variant="soft">
                      <Inbox />
                    </IconTile>
                    <div className="font-medium">No merchants found</div>
                    <div className="text-sm text-muted-foreground">Try another keyword or clear the filter.</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              visible.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{m.id}</TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.city}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE[m.status]} className="capitalize">
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{rupiah(m.volume)}</TableCell>
                  <TableCell className="py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${m.name}`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText /> View invoices
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onSelect={() => setToDelete(m)}>
                          <Trash2 /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
      </div>
      <DeleteDialog
        merchant={toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          setRows((r) => r.filter((x) => x.id !== toDelete?.id))
          setToDelete(null)
        }}
      />
    </AppFrame>
  )
}

/* ---------------------------------------------------------------- Create page */
function CreatePageDemo() {
  return (
    <AppFrame url="app.aiyo.id/invoices/new">
      <div className="flex flex-col gap-10">
        <PageHeader
          back={{ href: "#app-patterns", label: "Invoices" }}
          title="New invoice"
          description="A long form (multiple sections, line items), so it gets its own page."
        />
        <FormSection title="Customer" description="Who receives this invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Customer name" htmlFor="ci-name" required>
              <Input id="ci-name" placeholder="PT Maju Bersama" />
            </Field>
            <Field label="Email" htmlFor="ci-email">
              <Input id="ci-email" type="email" placeholder="finance@maju.id" />
            </Field>
            <Field label="NPWP" htmlFor="ci-npwp">
              <Input id="ci-npwp" placeholder="00.000.000.0-000.000" />
            </Field>
            <Field label="Phone" htmlFor="ci-phone">
              <Input id="ci-phone" placeholder="+62…" />
            </Field>
          </div>
        </FormSection>
        <FormSection title="Line items" description="Products or services billed.">
          <div className="grid gap-3">
            {[
              ["Langganan POS Growth", "1", "249.000"],
              ["Perangkat EDC", "2", "1.750.000"],
            ].map(([item, qty, price]) => (
              <div key={item} className="grid grid-cols-[1fr_4rem_8rem] gap-3">
                <Input size="sm" defaultValue={item} aria-label="Item" />
                <Input size="sm" defaultValue={qty} aria-label="Qty" className="text-center" />
                <Input size="sm" defaultValue={price} aria-label="Price" className="text-right" />
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-fit">
              <Plus /> Add line
            </Button>
          </div>
        </FormSection>
        <FormSection title="Payment" description="Terms and notes shown on the invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Due date" htmlFor="ci-due">
              <Input id="ci-due" type="date" defaultValue="2026-11-19" />
            </Field>
            <Field label="Method" htmlFor="ci-method">
              <Input id="ci-method" defaultValue="Virtual Account BCA" />
            </Field>
            <Field label="Notes" htmlFor="ci-notes" className="sm:col-span-2">
              <Textarea id="ci-notes" placeholder="Thank you for your business." className="min-h-20" />
            </Field>
          </div>
        </FormSection>
        <FormActions>
          <Button variant="secondary">Cancel</Button>
          <Button>Create invoice</Button>
        </FormActions>
      </div>
    </AppFrame>
  )
}

const LIST_CODE = `const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)

<PageHeader
  title="Merchants"
  description="Every merchant registered on AiYO."
  actions={<Button onClick={openAdd}><Plus /> Add merchant</Button>}
/>
{/* toolbar: search + filters, reset page to 1 on change */}
<Table>…</Table>
<Pagination
  page={page} pageSize={pageSize} total={total}
  onPageChange={setPage} onPageSizeChange={setPageSize}
/>`

const SETTINGS_CODE = `<Tabs defaultValue="profile" orientation="vertical">
  <TabsList>
    <TabsTrigger value="profile"><User /> Profile</TabsTrigger>
    <TabsTrigger value="password"><Lock /> Password</TabsTrigger>
    <TabsTrigger value="address"><MapPin /> Address</TabsTrigger>
  </TabsList>
  <TabsContent value="profile"><Card>…</Card></TabsContent>
  <TabsContent value="password"><Card>…</Card></TabsContent>
  <TabsContent value="address"><Card>…</Card></TabsContent>
</Tabs>`

const CREATE_CODE = `// /invoices/new
<PageHeader back={{ href: "/invoices", label: "Invoices" }} title="New invoice" />
<FormSection title="Customer" description="Who receives this invoice.">…</FormSection>
<FormSection title="Line items">…</FormSection>
<FormActions>
  <Button variant="secondary">Cancel</Button>
  <Button>Create invoice</Button>
</FormActions>`

export function AppPatterns() {
  return (
    <Section id="app-patterns" className="border-t border-border">
      <Container className="flex flex-col gap-24">
        <Reveal>
          <SectionHeader
            label="App Patterns"
            title={
              <>
                Product screens, <GradientText>decided once</GradientText>
              </>
            }
            description="The rules every AiYO admin and dashboard follows. These demos are fully interactive: search, filter, paginate, add and delete."
          />
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <PatternIntro
            index="01"
            title="Many sections? Use side tabs"
            rules={[
              "Pages with 3+ sub-sections (password, address, notifications…) use vertical Tabs, not a long stack of cards.",
              "One Card per tab, with its own Save button in the CardFooter.",
              "On mobile the side nav becomes a scrollable tab row on top.",
            ]}
          />
          <SettingsDemo />
          <CodeBlock code={SETTINGS_CODE} />
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <PatternIntro
            index="02"
            title="Every list has pagination"
            rules={[
              "PageHeader with the primary “Add <Thing>” button, then search and filters, then Table, then Pagination.",
              "Pagination is always there, even with one page. Default 10 rows. Reset to page 1 when search, filters or page size change.",
              "Row actions live in a ⋯ menu in the last column. Delete always asks for confirmation.",
              "No results? Show an empty state, never a blank table.",
            ]}
          />
          <ListPageDemo />
          <CodeBlock code={LIST_CODE} />
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <PatternIntro
            index="03"
            title="Add data: modal or new page"
            rules={[
              <>
                <strong className="text-foreground">Modal</strong> when the form is small: ≤6 fields, one section, no uploads or line items. Try “Add merchant” above.
              </>,
              <>
                <strong className="text-foreground">New page</strong> (<code className="font-mono text-xs">/things/new</code>) when it’s large: &gt;6 fields, several sections, uploads, line items, or the URL should be shareable.
              </>,
              "Full pages use PageHeader with a back link, FormSection blocks, and a sticky FormActions bar. Edit follows the same rule.",
            ]}
          />
          <CreatePageDemo />
          <CodeBlock code={CREATE_CODE} />
        </Reveal>
      </Container>
    </Section>
  )
}
