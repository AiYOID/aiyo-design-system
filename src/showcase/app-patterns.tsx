import * as React from "react"
import {
  Bell,
  Check,
  Inbox,
  Lock,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  RotateCw,
  Search,
  ShieldCheck,
  Store,
  Trash2,
  TriangleAlert,
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
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"
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

/* Settings */

/** Inline confirmation next to a form's submit button. Announced to screen readers. */
function SavedNote({ message }: { message: string | null }) {
  return (
    <p role="status" aria-live="polite" className="mr-auto flex items-center gap-2 text-sm text-success-text">
      {message && (
        <>
          <Check className="size-4" /> {message}
        </>
      )}
    </p>
  )
}

function useSaved() {
  const [message, setMessage] = React.useState<string | null>(null)
  const timer = React.useRef<number>(undefined)
  const show = (m: string) => {
    setMessage(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 4000)
  }
  return { message, show }
}

function SettingsForm({
  title,
  description,
  submitLabel,
  savedMessage,
  contentClassName,
  children,
}: {
  title: string
  description: string
  submitLabel: string
  savedMessage: string
  contentClassName?: string
  children: React.ReactNode
}) {
  const saved = useSaved()
  return (
    <Card>
      <form
        className="flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault()
          saved.show(savedMessage)
        }}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className={cn("grid gap-5", contentClassName)}>{children}</CardContent>
        <CardFooter className="flex-wrap justify-end">
          <SavedNote message={saved.message} />
          <Button type="submit">{submitLabel}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

function ProfileCard() {
  const [photo, setPhoto] = React.useState<string | null>(null)
  const fileInput = React.useRef<HTMLInputElement>(null)
  return (
    <SettingsForm
      title="Profile"
      description="How you appear across AiYO products."
      submitLabel="Save changes"
      savedMessage="Profile saved. This demo keeps nothing after a reload."
      contentClassName="sm:grid-cols-2"
    >
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Avatar className="size-14">
          <AvatarFallback className="text-base">
            <User className="size-6" />
          </AvatarFallback>
        </Avatar>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(e) => setPhoto(e.target.files?.[0]?.name ?? null)}
        />
        <Button type="button" variant="secondary" size="sm" onClick={() => fileInput.current?.click()}>
          Change photo
        </Button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {photo ? `Selected: ${photo}` : "PNG or JPG, square works best."}
        </span>
      </div>
      <Field label="Full name" htmlFor="st-name">
        <Input id="st-name" placeholder="Your full name" autoComplete="name" />
      </Field>
      <Field label="Phone" htmlFor="st-phone">
        <Input id="st-phone" type="tel" placeholder="+62…" autoComplete="tel" />
      </Field>
    </SettingsForm>
  )
}

function PasswordCard() {
  const saved = useSaved()
  const [errors, setErrors] = React.useState<{ current?: string; next?: string; confirm?: string }>({})
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const current = String(f.get("current") ?? "")
    const next = String(f.get("next") ?? "")
    const confirm = String(f.get("confirm") ?? "")
    const found = {
      current: current ? undefined : "Enter your current password.",
      next: next.length >= 8 ? undefined : "Use at least 8 characters.",
      confirm: confirm === next ? undefined : "The two new passwords don't match.",
    }
    setErrors(found)
    if (!found.current && !found.next && !found.confirm) {
      e.currentTarget.reset()
      saved.show("Password updated. This demo sends nothing.")
    }
  }
  return (
    <Card>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Use at least 8 characters with a mix of letters and numbers.</CardDescription>
        </CardHeader>
        <CardContent className="grid max-w-md gap-5">
          <Field label="Current password" htmlFor="st-cur" error={errors.current}>
            <Input id="st-cur" name="current" type="password" autoComplete="current-password" />
          </Field>
          <Field label="New password" htmlFor="st-new" hint="Minimum 8 characters." error={errors.next}>
            <Input id="st-new" name="next" type="password" autoComplete="new-password" />
          </Field>
          <Field label="Confirm new password" htmlFor="st-conf" error={errors.confirm}>
            <Input id="st-conf" name="confirm" type="password" autoComplete="new-password" />
          </Field>
        </CardContent>
        <CardFooter className="flex-wrap justify-end">
          <SavedNote message={saved.message} />
          <Button type="submit">Update password</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

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
          <ProfileCard />
        </TabsContent>

        <TabsContent value="password">
          <PasswordCard />
        </TabsContent>

        <TabsContent value="address">
          <SettingsForm
            title="Address"
            description="Used for invoices and settlement documents."
            submitLabel="Save address"
            savedMessage="Address saved. This demo keeps nothing after a reload."
            contentClassName="sm:grid-cols-2"
          >
            <Field label="Street" htmlFor="st-street" className="sm:col-span-2">
              <Textarea id="st-street" placeholder="Street, number, building" className="min-h-20" />
            </Field>
            <Field label="City" htmlFor="st-city">
              <Input id="st-city" placeholder="City" />
            </Field>
            <Field label="Postal code" htmlFor="st-zip">
              <Input id="st-zip" inputMode="numeric" placeholder="5 digits" />
            </Field>
          </SettingsForm>
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

/* List page */
type Merchant = { id: string; name: string; city: string; status: "active" | "pending" | "suspended"; volume: number }
type DataState = "ready" | "loading" | "error" | "empty"

// Sample rows, labelled as such in the UI. Real pages load these from the API.
const CITIES = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar", "Yogyakarta", "Semarang"]
const SEED: Merchant[] = Array.from({ length: 57 }, (_, i) => ({
  id: `MRC-${String(i + 1).padStart(4, "0")}`,
  name: `Sample merchant ${String(i + 1).padStart(2, "0")}`,
  city: CITIES[(i * 3) % CITIES.length],
  status: i % 9 === 4 ? "suspended" : i % 5 === 2 ? "pending" : "active",
  volume: ((i * 7919) % 97) * 1_250_000 + 500_000,
}))
const STATUS_BADGE = { active: "success", pending: "warning", suspended: "destructive" } as const
const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID")

/** Add and edit share one small form (≤6 fields), so both open in a modal. */
function MerchantDialog({
  open,
  onOpenChange,
  merchant,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  merchant: Merchant | null
  onSave: (m: Merchant) => void
}) {
  const editing = merchant !== null
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    onSave({
      id: merchant?.id ?? `MRC-${String(Math.floor(1000 + Math.random() * 9000))}`,
      name: String(f.get("name")),
      city: String(f.get("city") || "Jakarta"),
      status: merchant?.status ?? "pending",
      volume: merchant?.volume ?? 0,
    })
    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit merchant" : "Add merchant"}</DialogTitle>
          <DialogDescription>A short form (≤6 fields), so it opens in a modal.</DialogDescription>
        </DialogHeader>
        <form id="merchant-form" key={merchant?.id ?? "new"} onSubmit={submit} className="grid gap-5">
          <Field label="Merchant name" htmlFor="am-name" required>
            <Input id="am-name" name="name" placeholder="Business name" defaultValue={merchant?.name} required />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" htmlFor="am-city">
              <Input id="am-city" name="city" placeholder="City" defaultValue={merchant?.city} />
            </Field>
            <Field label="Phone" htmlFor="am-phone">
              <Input id="am-phone" name="phone" type="tel" placeholder="+62…" />
            </Field>
          </div>
          <Field label="Email" htmlFor="am-email">
            <Input id="am-email" name="email" type="email" placeholder="email@example.com" />
          </Field>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="merchant-form">
            {editing ? "Save changes" : "Save merchant"}
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

/** One full-width row that replaces the data rows for the loading, error and empty states. */
function StateRow({ children }: { children: React.ReactNode }) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={6} className="py-14 whitespace-normal">
        <div className="flex flex-col items-center gap-3 text-center">{children}</div>
      </TableCell>
    </TableRow>
  )
}

function ListPageDemo() {
  const [rows, setRows] = React.useState(SEED)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [dataState, setDataState] = React.useState<DataState>("ready")
  const [dialog, setDialog] = React.useState<{ open: boolean; merchant: Merchant | null }>({ open: false, merchant: null })
  const [toDelete, setToDelete] = React.useState<Merchant | null>(null)

  const source = dataState === "empty" ? [] : rows
  const filtered = source.filter(
    (m) =>
      (status === "all" || m.status === status) &&
      (m.name.toLowerCase().includes(query.toLowerCase()) || m.id.toLowerCase().includes(query.toLowerCase())),
  )
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize)
  const filteredOut = source.length > 0 && filtered.length === 0

  const retry = () => {
    setDataState("loading")
    window.setTimeout(() => setDataState("ready"), 900)
  }

  return (
    <AppFrame url="app.aiyo.id/merchants">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Merchants"
          description="Every merchant registered on AiYO."
          actions={
            <Button onClick={() => setDialog({ open: true, merchant: null })}>
              <Plus /> Add merchant
            </Button>
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

        <Table aria-busy={dataState === "loading"}>
          <TableCaption className="text-left px-5">Sample data for this demo. Real pages load rows from the API.</TableCaption>
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
            {dataState === "loading" ? (
              Array.from({ length: Math.min(pageSize, 5) }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  <TableCell colSpan={6}>
                    {i === 0 && <span className="sr-only">Loading merchants…</span>}
                    <div className="flex items-center gap-6">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : dataState === "error" ? (
              <StateRow>
                <IconTile variant="muted">
                  <TriangleAlert className="text-destructive-text" />
                </IconTile>
                <div className="font-medium">Couldn't load merchants</div>
                <div className="max-w-sm text-sm text-muted-foreground">The server didn't respond. Check your connection, then try again.</div>
                <Button variant="secondary" size="sm" onClick={retry}>
                  <RotateCw /> Try again
                </Button>
              </StateRow>
            ) : source.length === 0 ? (
              <StateRow>
                <IconTile variant="soft">
                  <Store />
                </IconTile>
                <div className="font-medium">No merchants yet</div>
                <div className="max-w-sm text-sm text-muted-foreground">Merchants you add show up here, with their status and volume.</div>
                <Button size="sm" onClick={() => setDialog({ open: true, merchant: null })}>
                  <Plus /> Add the first merchant
                </Button>
              </StateRow>
            ) : filteredOut ? (
              <StateRow>
                <IconTile variant="soft">
                  <Inbox />
                </IconTile>
                <div className="font-medium">No merchants match</div>
                <div className="text-sm text-muted-foreground">Nothing matches "{query || status}". Try another keyword or clear the filter.</div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery("")
                    setStatus("all")
                  }}
                >
                  Clear search and filter
                </Button>
              </StateRow>
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
                        <DropdownMenuItem onSelect={() => setDialog({ open: true, merchant: m })}>
                          <Pencil /> Edit
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

        <Pagination
          page={page}
          pageSize={pageSize}
          total={dataState === "ready" || dataState === "empty" ? filtered.length : 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border p-3">
          <span className="text-sm text-muted-foreground">Preview state</span>
          <Tabs value={dataState} onValueChange={(v) => (v === "loading" ? retry() : setDataState(v as DataState))}>
            <TabsList>
              <TabsTrigger value="ready">Data</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
              <TabsTrigger value="error">Error</TabsTrigger>
              <TabsTrigger value="empty">Empty</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <MerchantDialog
        open={dialog.open}
        merchant={dialog.merchant}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        onSave={(m) => {
          setDataState("ready")
          setRows((r) => (r.some((x) => x.id === m.id) ? r.map((x) => (x.id === m.id ? m : x)) : [m, ...r]))
          if (!dialog.merchant) setPage(1)
        }}
      />
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

/* Create page */
type Line = { id: number }

function CreatePageDemo() {
  const [lines, setLines] = React.useState<Line[]>([{ id: 1 }])
  const [nameError, setNameError] = React.useState<string>()
  const [result, setResult] = React.useState<"created" | "discarded" | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = String(new FormData(e.currentTarget).get("customer") ?? "").trim()
    if (!name) {
      setNameError("Enter the customer's name.")
      setResult(null)
      return
    }
    setNameError(undefined)
    setResult("created")
  }
  const cancel = () => {
    formRef.current?.reset()
    setLines([{ id: 1 }])
    setNameError(undefined)
    setResult("discarded")
  }

  return (
    <AppFrame url="app.aiyo.id/invoices/new">
      <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col gap-10">
        <PageHeader
          back={{ href: "#app-patterns", label: "Invoices" }}
          title="New invoice"
          description="A long form (multiple sections, line items), so it gets its own page."
        />
        <FormSection title="Customer" description="Who receives this invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Customer name" htmlFor="ci-name" required error={nameError}>
              <Input id="ci-name" name="customer" placeholder="Company or person" />
            </Field>
            <Field label="Email" htmlFor="ci-email">
              <Input id="ci-email" type="email" placeholder="email@example.com" />
            </Field>
            <Field label="NPWP" htmlFor="ci-npwp">
              <Input id="ci-npwp" inputMode="numeric" placeholder="15 or 16 digits" />
            </Field>
            <Field label="Phone" htmlFor="ci-phone">
              <Input id="ci-phone" type="tel" placeholder="+62…" />
            </Field>
          </div>
        </FormSection>
        <FormSection title="Line items" description="Products or services billed.">
          <div className="grid gap-3">
            {lines.map((line, i) => (
              <div key={line.id} className="grid grid-cols-[1fr_4rem_7rem_2.25rem] gap-2 sm:gap-3">
                <Input size="sm" aria-label={`Item ${i + 1}`} placeholder="Item name" />
                <Input size="sm" aria-label={`Quantity ${i + 1}`} inputMode="numeric" defaultValue="1" className="text-center" />
                <Input size="sm" aria-label={`Price ${i + 1}`} inputMode="numeric" placeholder="0" className="text-right" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove line ${i + 1}`}
                  disabled={lines.length === 1}
                  onClick={() => setLines((l) => l.filter((x) => x.id !== line.id))}
                >
                  <X />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-fit"
              onClick={() => setLines((l) => [...l, { id: Math.max(...l.map((x) => x.id)) + 1 }])}
            >
              <Plus /> Add line
            </Button>
          </div>
        </FormSection>
        <FormSection title="Payment" description="Terms and notes shown on the invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Due date" htmlFor="ci-due">
              <Input id="ci-due" type="date" />
            </Field>
            <Field label="Method" htmlFor="ci-method">
              <Input id="ci-method" placeholder="e.g. virtual account" />
            </Field>
            <Field label="Notes" htmlFor="ci-notes" className="sm:col-span-2">
              <Textarea id="ci-notes" placeholder="Shown at the bottom of the invoice." className="min-h-20" />
            </Field>
          </div>
        </FormSection>
        <FormActions>
          <p role="status" aria-live="polite" className="mr-auto flex items-center gap-2 text-sm text-muted-foreground">
            {result === "created" && (
              <span className="flex items-center gap-2 text-success-text">
                <Check className="size-4" /> Invoice created. This demo saves nothing.
              </span>
            )}
            {result === "discarded" && "Changes discarded."}
          </p>
          <Button type="button" variant="secondary" onClick={cancel}>
            Cancel
          </Button>
          <Button type="submit">Create invoice</Button>
        </FormActions>
      </form>
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
