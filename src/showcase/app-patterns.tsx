import * as React from "react"
import {
  ArrowRotateRight,
  Bell,
  Briefcase,
  Check,
  Ellipsis,
  Lock,
  MapPin,
  Pencil,
  Person,
  Plus,
  Shield,
  ShieldCheck,
  TrashBin,
  Tray,
  TriangleExclamation,
  Xmark,
} from "@gravity-ui/icons"
import {
  AlertDialog,
  Avatar,
  Button,
  Card,
  Chip,
  Description,
  Dropdown,
  EmptyState,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  SearchField,
  Select,
  Skeleton,
  Switch,
  Table,
  Tabs,
  TextArea,
  TextField,
  useMediaQuery,
  useOverlayState,
  type Key,
} from "@heroui/react"
import { DataPagination } from "@/components/aiyo/data-pagination"
import { GradientText } from "@/components/aiyo/gradient-text"
import { IconTile } from "@/components/aiyo/icon-tile"
import { FormActions, FormSection, PageHeader } from "@/components/aiyo/page-header"
import { Container, Section, SectionHeader } from "@/components/aiyo/section"
import { Reveal } from "@/lib/motion"
import { CodeBlock } from "./shared"

/** A browser-like frame (address bar only) so each pattern reads as a real screen. */
function AppFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-background shadow-overlay">
      <div className="border-b border-separator bg-surface px-4 py-3">
        <span className="block w-fit max-w-full truncate rounded-lg bg-default px-3 py-1 font-mono text-xs text-muted">{url}</span>
      </div>
      <div className="p-5 md:p-8">{children}</div>
    </div>
  )
}

function PatternIntro({ index, title, rules }: { index: string; title: string; rules: React.ReactNode[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent tabular-nums">{index}</span>
        <h3 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
      </div>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
        {rules.map((r, i) => (
          <li key={i} className="flex gap-3">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
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
    <p role="status" aria-live="polite" className="me-auto flex items-center gap-2 text-sm text-success-soft-foreground">
      {message && (
        <>
          <Check aria-hidden className="size-4" /> {message}
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

function SettingsCard({
  title,
  description,
  submitLabel,
  savedMessage,
  validate,
  contentClassName,
  children,
}: {
  title: string
  description: string
  submitLabel: string
  savedMessage: string
  /** Returns field errors keyed by name; an empty object means the form is valid. */
  validate?: (data: FormData) => Record<string, string>
  contentClassName?: string
  children: React.ReactNode
}) {
  const saved = useSaved()
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  return (
    <Card className="p-0">
      <Form
        validationBehavior="aria"
        validationErrors={errors}
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const found = validate?.(new FormData(form)) ?? {}
          setErrors(found)
          if (Object.keys(found).length === 0) {
            if (validate) form.reset()
            saved.show(savedMessage)
          }
        }}
      >
        <Card.Header className="gap-1 p-6 pb-0 md:p-8 md:pb-0">
          <Card.Title className="text-lg font-semibold">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Header>
        <Card.Content className={`grid gap-5 p-6 md:p-8 ${contentClassName ?? ""}`}>{children}</Card.Content>
        <Card.Footer className="flex-wrap justify-end gap-3 border-t border-separator px-6 py-4 md:px-8">
          <SavedNote message={saved.message} />
          <Button type="submit">{submitLabel}</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}

function ProfileTab() {
  const [photo, setPhoto] = React.useState<string | null>(null)
  const fileInput = React.useRef<HTMLInputElement>(null)
  return (
    <SettingsCard
      title="Profile"
      description="How you appear across AiYO products."
      submitLabel="Save changes"
      savedMessage="Profile saved. This demo keeps nothing after a reload."
      contentClassName="sm:grid-cols-2"
    >
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Avatar size="lg" color="accent" variant="soft">
          <Avatar.Fallback>
            <Person aria-hidden className="size-5" />
          </Avatar.Fallback>
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
        <Button size="sm" variant="secondary" onPress={() => fileInput.current?.click()}>
          Change photo
        </Button>
        <span className="text-sm text-muted" aria-live="polite">
          {photo ? `Selected: ${photo}` : "PNG or JPG, square works best."}
        </span>
      </div>
      <TextField name="name" autoComplete="name" fullWidth>
        <Label>Full name</Label>
        <Input placeholder="Your full name" />
      </TextField>
      <TextField name="phone" type="tel" autoComplete="tel" fullWidth>
        <Label>Phone</Label>
        <Input placeholder="+62…" />
      </TextField>
    </SettingsCard>
  )
}

function PasswordTab() {
  return (
    <SettingsCard
      title="Change password"
      description="Use at least 8 characters with a mix of letters and numbers."
      submitLabel="Update password"
      savedMessage="Password updated. This demo sends nothing."
      contentClassName="max-w-md"
      validate={(f) => {
        const current = String(f.get("current") ?? "")
        const next = String(f.get("next") ?? "")
        const confirm = String(f.get("confirm") ?? "")
        const errors: Record<string, string> = {}
        if (!current) errors.current = "Enter your current password."
        if (next.length < 8) errors.next = "Use at least 8 characters."
        if (confirm !== next) errors.confirm = "The two new passwords don't match."
        return errors
      }}
    >
      <TextField name="current" type="password" autoComplete="current-password" fullWidth>
        <Label>Current password</Label>
        <Input />
        <FieldError />
      </TextField>
      <TextField name="next" type="password" autoComplete="new-password" fullWidth>
        <Label>New password</Label>
        <Input />
        <Description>Minimum 8 characters.</Description>
        <FieldError />
      </TextField>
      <TextField name="confirm" type="password" autoComplete="new-password" fullWidth>
        <Label>Confirm new password</Label>
        <Input />
        <FieldError />
      </TextField>
    </SettingsCard>
  )
}

function SwitchRow({ title, description, defaultSelected }: { title: string; description: string; defaultSelected?: boolean }) {
  return (
    <Switch defaultSelected={defaultSelected} className="py-2">
      <Switch.Content className="w-full justify-between gap-6">
        <span className="flex flex-col gap-0.5">
          <span>{title}</span>
          <span className="text-xs font-normal text-muted">{description}</span>
        </span>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  )
}

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: Person },
  { id: "password", label: "Password", icon: Lock },
  { id: "address", label: "Address", icon: MapPin },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
]

function SettingsDemo() {
  // Side navigation from md up; a scrollable tab row above the card on phones.
  const wide = useMediaQuery("(min-width: 768px)", { defaultValue: true })
  return (
    <AppFrame url="app.aiyo.id/settings">
      <PageHeader title="Settings" description="Manage your account, security and notifications." className="mb-8" />
      <Tabs variant="secondary" align="start" orientation={wide ? "vertical" : "horizontal"} defaultSelectedKey="password" className="gap-6">
        <Tabs.ListContainer className={wide ? "w-56 shrink-0 self-start" : undefined}>
          <Tabs.List aria-label="Settings sections" className="w-full">
            {SETTINGS_TABS.map((t) => (
              <Tabs.Tab key={t.id} id={t.id} className="h-11 justify-start gap-2.5 px-4">
                <t.icon aria-hidden className="size-4" />
                {t.label}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel id="profile" className="min-w-0 p-0 md:ms-0">
          <ProfileTab />
        </Tabs.Panel>
        <Tabs.Panel id="password" className="min-w-0 p-0 md:ms-0">
          <PasswordTab />
        </Tabs.Panel>
        <Tabs.Panel id="address" className="min-w-0 p-0 md:ms-0">
          <SettingsCard
            title="Address"
            description="Used for invoices and settlement documents."
            submitLabel="Save address"
            savedMessage="Address saved. This demo keeps nothing after a reload."
            contentClassName="sm:grid-cols-2"
          >
            <TextField name="street" className="sm:col-span-2" fullWidth>
              <Label>Street</Label>
              <TextArea rows={2} placeholder="Street, number, building" />
            </TextField>
            <TextField name="city" fullWidth>
              <Label>City</Label>
              <Input placeholder="City" />
            </TextField>
            <TextField name="postal" fullWidth>
              <Label>Postal code</Label>
              <Input inputMode="numeric" placeholder="5 digits" />
            </TextField>
          </SettingsCard>
        </Tabs.Panel>
        <Tabs.Panel id="notifications" className="min-w-0 p-0 md:ms-0">
          <Card className="p-6 md:p-8">
            <Card.Header className="gap-1">
              <Card.Title className="text-lg font-semibold">Notifications</Card.Title>
              <Card.Description>Choose what we tell you about. Changes apply right away.</Card.Description>
            </Card.Header>
            <Card.Content className="divide-y divide-separator">
              <SwitchRow title="Payment received" description="Every successful transaction" defaultSelected />
              <SwitchRow title="Daily summary" description="A recap at 21:00 WIB" defaultSelected />
              <SwitchRow title="Product news" description="New features and tips" />
            </Card.Content>
          </Card>
        </Tabs.Panel>
        <Tabs.Panel id="security" className="min-w-0 p-0 md:ms-0">
          <Card className="p-6 md:p-8">
            <Card.Header className="gap-1">
              <Card.Title className="text-lg font-semibold">Security</Card.Title>
              <Card.Description>Two-factor authentication for new devices.</Card.Description>
            </Card.Header>
            <Card.Content>
              <Switch defaultSelected>
                <Switch.Content className="w-full justify-between gap-6">
                  <span className="flex items-center gap-4">
                    <IconTile size="sm">
                      <ShieldCheck />
                    </IconTile>
                    <span className="flex flex-col gap-0.5">
                      <span>Two-factor authentication</span>
                      <span className="text-xs font-normal text-muted">Ask for an OTP on every new device.</span>
                    </span>
                  </span>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Content>
              </Switch>
            </Card.Content>
          </Card>
        </Tabs.Panel>
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
const STATUS_COLOR = { active: "success", pending: "warning", suspended: "danger" } as const
const STATUS_OPTIONS = [
  ["all", "All statuses"],
  ["active", "Active"],
  ["pending", "Pending"],
  ["suspended", "Suspended"],
] as const
const rupiah = (n: number) => "Rp " + n.toLocaleString("id-ID")

/** Add and edit share one small form (≤6 fields, one section), so both open in a modal. */
function MerchantModal({
  isOpen,
  onOpenChange,
  merchant,
  onSave,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  merchant: Merchant | null
  onSave: (m: Merchant) => void
}) {
  const editing = merchant !== null
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog>
          {({ close }) => (
            <Form
              key={merchant?.id ?? "new"}
              className="contents"
              onSubmit={(e) => {
                e.preventDefault()
                const f = new FormData(e.currentTarget)
                onSave({
                  id: merchant?.id ?? `MRC-${String(Math.floor(1000 + Math.random() * 9000))}`,
                  name: String(f.get("name")),
                  city: String(f.get("city") || "Jakarta"),
                  status: merchant?.status ?? "pending",
                  volume: merchant?.volume ?? 0,
                })
                close()
              }}
            >
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>{editing ? "Edit merchant" : "Add merchant"}</Modal.Heading>
                <p className="text-sm text-muted">A short form (6 fields or fewer), so it opens in a modal.</p>
              </Modal.Header>
              <Modal.Body className="grid gap-5">
                <TextField name="name" isRequired defaultValue={merchant?.name} fullWidth>
                  <Label>Merchant name</Label>
                  <Input placeholder="Business name" />
                  <FieldError>Enter the merchant's name.</FieldError>
                </TextField>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField name="city" defaultValue={merchant?.city} fullWidth>
                    <Label>City</Label>
                    <Input placeholder="City" />
                  </TextField>
                  <TextField name="phone" type="tel" fullWidth>
                    <Label>Phone</Label>
                    <Input placeholder="+62…" />
                  </TextField>
                </div>
                <TextField name="email" type="email" fullWidth>
                  <Label>Email</Label>
                  <Input placeholder="email@example.com" />
                </TextField>
              </Modal.Body>
              <Modal.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button type="submit">{editing ? "Save changes" : "Save merchant"}</Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}

function DeleteDialog({ merchant, onConfirm, onClose }: { merchant: Merchant | null; onConfirm: () => void; onClose: () => void }) {
  return (
    <AlertDialog.Backdrop isOpen={merchant !== null} onOpenChange={(open) => !open && onClose()}>
      <AlertDialog.Container size="sm">
        <AlertDialog.Dialog aria-describedby="delete-merchant-desc">
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>Delete {merchant?.name}?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body id="delete-merchant-desc">This removes the merchant and its outlets. You can't undo this.</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button variant="danger" onPress={onConfirm}>
              <TrashBin aria-hidden /> Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  )
}

/** Shared body for the error, first-run and filtered-to-nothing states: cause plus one next action. */
function ListState({ icon, title, body, action }: { icon: React.ReactNode; title: string; body: string; action: React.ReactNode }) {
  return (
    <EmptyState className="flex flex-col items-center gap-3 px-4 py-14 text-center">
      {icon}
      <span className="font-medium">{title}</span>
      <span className="max-w-sm text-sm text-muted">{body}</span>
      {action}
    </EmptyState>
  )
}

function ListPageDemo() {
  const [rows, setRows] = React.useState(SEED)
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<Key | null>("all")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [dataState, setDataState] = React.useState<DataState>("ready")
  const editor = useOverlayState()
  const [editing, setEditing] = React.useState<Merchant | null>(null)
  const [toDelete, setToDelete] = React.useState<Merchant | null>(null)

  const source = dataState === "empty" ? [] : rows
  const q = query.toLowerCase()
  const filtered = source.filter((m) => (status === "all" || m.status === status) && (m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)))
  const visible = dataState === "ready" || dataState === "empty" ? filtered.slice((page - 1) * pageSize, page * pageSize) : []

  const retry = () => {
    setDataState("loading")
    window.setTimeout(() => setDataState("ready"), 900)
  }
  const openAdd = () => {
    setEditing(null)
    editor.open()
  }
  const clearFilters = () => {
    setQuery("")
    setStatus("all")
    setPage(1)
  }

  const emptyState = () => {
    if (dataState === "error")
      return (
        <ListState
          icon={
            <IconTile variant="default">
              <TriangleExclamation className="text-danger-soft-foreground" />
            </IconTile>
          }
          title="Couldn't load merchants"
          body="The server didn't respond. Check your connection, then try again."
          action={
            <Button size="sm" variant="secondary" onPress={retry}>
              <ArrowRotateRight aria-hidden /> Try again
            </Button>
          }
        />
      )
    if (source.length === 0)
      return (
        <ListState
          icon={
            <IconTile>
              <Briefcase />
            </IconTile>
          }
          title="No merchants yet"
          body="Merchants you add show up here, with their status and volume."
          action={
            <Button size="sm" onPress={openAdd}>
              <Plus aria-hidden /> Add the first merchant
            </Button>
          }
        />
      )
    return (
      <ListState
        icon={
          <IconTile>
            <Tray />
          </IconTile>
        }
        title="No merchants match"
        body={`Nothing matches "${query || String(status)}". Try another keyword or clear the filter.`}
        action={
          <Button size="sm" variant="secondary" onPress={clearFilters}>
            Clear search and filter
          </Button>
        }
      />
    )
  }

  return (
    <AppFrame url="app.aiyo.id/merchants">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Merchants"
          description="Every merchant registered on AiYO."
          actions={
            <Button onPress={openAdd}>
              <Plus aria-hidden /> Add merchant
            </Button>
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <SearchField
            aria-label="Search merchants"
            value={query}
            onChange={(v) => {
              setQuery(v)
              setPage(1)
            }}
            className="flex-1"
            fullWidth
          >
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search name or ID" />
              <SearchField.ClearButton aria-label="Clear search">
                <Xmark aria-hidden />
              </SearchField.ClearButton>
            </SearchField.Group>
          </SearchField>
          <Select
            aria-label="Status filter"
            value={status}
            onChange={(v) => {
              setStatus(v)
              setPage(1)
            }}
            className="sm:w-48"
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {STATUS_OPTIONS.map(([id, label]) => (
                  <ListBox.Item key={id} id={id} textValue={label}>
                    {label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        <Table aria-busy={dataState === "loading"}>
          <Table.ScrollContainer>
            <Table.Content aria-label="Merchants" className="min-w-[640px]">
              <Table.Header>
                <Table.Column isRowHeader>Merchant</Table.Column>
                <Table.Column>ID</Table.Column>
                <Table.Column>City</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column className="text-end">Volume</Table.Column>
                <Table.Column className="w-16">
                  <span className="sr-only">Actions</span>
                </Table.Column>
              </Table.Header>
              <Table.Body renderEmptyState={emptyState}>
                {dataState === "loading"
                  ? Array.from({ length: Math.min(pageSize, 5) }, (_, i) => (
                      <Table.Row key={`loading-${i}`} id={`loading-${i}`}>
                        <Table.Cell>
                          {i === 0 && <span className="sr-only">Loading merchants…</span>}
                          <Skeleton aria-hidden className="h-4 w-36 rounded-lg" />
                        </Table.Cell>
                        <Table.Cell>
                          <Skeleton aria-hidden className="h-4 w-20 rounded-lg" />
                        </Table.Cell>
                        <Table.Cell>
                          <Skeleton aria-hidden className="h-4 w-20 rounded-lg" />
                        </Table.Cell>
                        <Table.Cell>
                          <Skeleton aria-hidden className="h-6 w-16 rounded-full" />
                        </Table.Cell>
                        <Table.Cell>
                          <Skeleton aria-hidden className="ms-auto h-4 w-24 rounded-lg" />
                        </Table.Cell>
                        <Table.Cell />
                      </Table.Row>
                    ))
                  : visible.map((m) => (
                      <Table.Row key={m.id} id={m.id}>
                        <Table.Cell className="font-medium">{m.name}</Table.Cell>
                        <Table.Cell className="font-mono text-xs text-muted">{m.id}</Table.Cell>
                        <Table.Cell>{m.city}</Table.Cell>
                        <Table.Cell>
                          <Chip size="sm" variant="soft" color={STATUS_COLOR[m.status]} className="capitalize">
                            {m.status}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell className="text-end tabular-nums">{rupiah(m.volume)}</Table.Cell>
                        <Table.Cell className="text-end">
                          <Dropdown>
                            <Button isIconOnly size="sm" variant="ghost" aria-label={`Actions for ${m.name}`}>
                              <Ellipsis aria-hidden />
                            </Button>
                            <Dropdown.Popover placement="bottom end">
                              <Dropdown.Menu
                                onAction={(key) => {
                                  if (key === "edit") {
                                    setEditing(m)
                                    editor.open()
                                  } else setToDelete(m)
                                }}
                              >
                                <Dropdown.Item id="edit" textValue="Edit">
                                  <Pencil aria-hidden className="size-4 text-muted" />
                                  <Label>Edit</Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="delete" textValue="Delete" variant="danger">
                                  <TrashBin aria-hidden className="size-4 text-danger" />
                                  <Label>Delete</Label>
                                </Dropdown.Item>
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
        <p className="-mt-3 text-xs text-muted">Sample data for this demo. Real pages load rows from the API.</p>

        <DataPagination
          page={page}
          pageSize={pageSize}
          total={dataState === "ready" || dataState === "empty" ? filtered.length : 0}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />

        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-border p-3">
          <span className="text-sm text-muted">Preview state</span>
          <Tabs selectedKey={dataState} onSelectionChange={(k) => (k === "loading" ? retry() : setDataState(k as DataState))}>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Preview state">
                {(["ready", "loading", "error", "empty"] as const).map((s) => (
                  <Tabs.Tab key={s} id={s} className="capitalize">
                    {s === "ready" ? "Data" : s}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>
      </div>

      <MerchantModal
        isOpen={editor.isOpen}
        onOpenChange={editor.setOpen}
        merchant={editing}
        onSave={(m) => {
          setDataState("ready")
          setRows((r) => (r.some((x) => x.id === m.id) ? r.map((x) => (x.id === m.id ? m : x)) : [m, ...r]))
          if (!editing) setPage(1)
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
function CreatePageDemo() {
  const [lines, setLines] = React.useState([1])
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [result, setResult] = React.useState<"created" | "discarded" | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)

  const cancel = () => {
    formRef.current?.reset()
    setLines([1])
    setErrors({})
    setResult("discarded")
  }

  return (
    <AppFrame url="app.aiyo.id/invoices/new">
      <Form
        ref={formRef}
        validationBehavior="aria"
        validationErrors={errors}
        className="flex flex-col gap-10"
        onSubmit={(e) => {
          e.preventDefault()
          const name = String(new FormData(e.currentTarget).get("customer") ?? "").trim()
          if (!name) {
            setErrors({ customer: "Enter the customer's name." })
            setResult(null)
            return
          }
          setErrors({})
          setResult("created")
        }}
      >
        <PageHeader
          back={{ href: "#app-patterns", label: "Invoices" }}
          title="New invoice"
          description="A long form (several sections, line items), so it gets its own page."
        />
        <FormSection title="Customer" description="Who receives this invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="customer" isRequired fullWidth>
              <Label>Customer name</Label>
              <Input placeholder="Company or person" />
              <FieldError />
            </TextField>
            <TextField name="email" type="email" fullWidth>
              <Label>Email</Label>
              <Input placeholder="email@example.com" />
            </TextField>
            <TextField name="npwp" fullWidth>
              <Label>NPWP</Label>
              <Input inputMode="numeric" placeholder="15 or 16 digits" />
            </TextField>
            <TextField name="phone" type="tel" fullWidth>
              <Label>Phone</Label>
              <Input placeholder="+62…" />
            </TextField>
          </div>
        </FormSection>
        <FormSection title="Line items" description="Products or services billed.">
          <div className="grid gap-3">
            {lines.map((id, i) => (
              <div key={id} className="grid grid-cols-[1fr_4rem_7rem_auto] items-center gap-2 sm:gap-3">
                <Input aria-label={`Item ${i + 1}`} placeholder="Item name" />
                <Input aria-label={`Quantity ${i + 1}`} inputMode="numeric" defaultValue="1" className="text-center" />
                <Input aria-label={`Price ${i + 1}`} inputMode="numeric" placeholder="0" className="text-end" />
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={`Remove line ${i + 1}`}
                  isDisabled={lines.length === 1}
                  onPress={() => setLines((l) => l.filter((x) => x !== id))}
                >
                  <Xmark aria-hidden />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="ghost" className="w-fit" onPress={() => setLines((l) => [...l, Math.max(...l) + 1])}>
              <Plus aria-hidden /> Add line
            </Button>
          </div>
        </FormSection>
        <FormSection title="Payment" description="Terms and notes shown on the invoice.">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="due" type="date" fullWidth>
              <Label>Due date</Label>
              <Input />
            </TextField>
            <TextField name="method" fullWidth>
              <Label>Method</Label>
              <Input placeholder="e.g. virtual account" />
            </TextField>
            <TextField name="notes" className="sm:col-span-2" fullWidth>
              <Label>Notes</Label>
              <TextArea rows={2} placeholder="Shown at the bottom of the invoice." />
            </TextField>
          </div>
        </FormSection>
        <FormActions>
          <p role="status" aria-live="polite" className="me-auto flex items-center gap-2 text-sm text-muted">
            {result === "created" && (
              <span className="flex items-center gap-2 text-success-soft-foreground">
                <Check aria-hidden className="size-4" /> Invoice created. This demo saves nothing.
              </span>
            )}
            {result === "discarded" && "Changes discarded."}
          </p>
          <Button variant="secondary" onPress={cancel}>
            Cancel
          </Button>
          <Button type="submit">Create invoice</Button>
        </FormActions>
      </Form>
    </AppFrame>
  )
}

const SETTINGS_CODE = `const wide = useMediaQuery("(min-width: 768px)")

<Tabs variant="secondary" align="start" orientation={wide ? "vertical" : "horizontal"} defaultSelectedKey="profile">
  <Tabs.ListContainer className={wide ? "w-56 shrink-0 self-start" : undefined}>
    <Tabs.List aria-label="Settings sections">
      <Tabs.Tab id="profile" className="h-11 justify-start"><Person /> Profile<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="password" className="h-11 justify-start"><Lock /> Password<Tabs.Indicator /></Tabs.Tab>
      <Tabs.Tab id="address" className="h-11 justify-start"><MapPin /> Address<Tabs.Indicator /></Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="profile"><Card>…</Card></Tabs.Panel>
  <Tabs.Panel id="password"><Card>…</Card></Tabs.Panel>
  <Tabs.Panel id="address"><Card>…</Card></Tabs.Panel>
</Tabs>`

const LIST_CODE = `const [query, setQuery] = useState("")
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)

<PageHeader title="Merchants" description="Every merchant registered on AiYO."
  actions={<Button onPress={openAdd}><Plus /> Add merchant</Button>} />

<SearchField aria-label="Search merchants" value={query}
  onChange={(v) => { setQuery(v); setPage(1) }}>…</SearchField>

<Table>
  <Table.ScrollContainer>
    <Table.Content aria-label="Merchants">
      <Table.Header>…<Table.Column><span className="sr-only">Actions</span></Table.Column></Table.Header>
      <Table.Body renderEmptyState={() => <EmptyState>…cause and one next action…</EmptyState>}>
        {rows.map((m) => (
          <Table.Row key={m.id} id={m.id}>
            …
            <Table.Cell>
              <Dropdown>
                <Button isIconOnly variant="ghost" aria-label={\`Actions for \${m.name}\`}><Ellipsis /></Button>
                <Dropdown.Popover placement="bottom end">
                  <Dropdown.Menu onAction={(key) => …}>
                    <Dropdown.Item id="edit" textValue="Edit"><Label>Edit</Label></Dropdown.Item>
                    <Dropdown.Item id="delete" textValue="Delete" variant="danger"><Label>Delete</Label></Dropdown.Item>
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

<DataPagination page={page} pageSize={pageSize} total={total}
  onPageChange={setPage} onPageSizeChange={setPageSize} />`

const CREATE_CODE = `// /invoices/new
<Form validationErrors={errors} onSubmit={save}>
  <PageHeader back={{ href: "/invoices", label: "Invoices" }} title="New invoice" />
  <FormSection title="Customer" description="Who receives this invoice.">
    <TextField name="customer" isRequired><Label>Customer name</Label><Input /><FieldError /></TextField>
  </FormSection>
  <FormSection title="Line items">…</FormSection>
  <FormActions>
    <Button variant="secondary" onPress={cancel}>Cancel</Button>
    <Button type="submit">Create invoice</Button>
  </FormActions>
</Form>`

export function AppPatterns() {
  return (
    <Section id="app-patterns" className="border-t border-separator">
      <Container className="flex flex-col gap-24">
        <Reveal>
          <SectionHeader
            label="App patterns"
            title={
              <>
                Product screens, <GradientText>decided once</GradientText>
              </>
            }
            description="The rules every AiYO admin and dashboard follows, built from HeroUI parts. The demos work: search, filter, paginate, add, edit and delete."
          />
        </Reveal>

        <Reveal className="flex flex-col gap-8">
          <PatternIntro
            index="01"
            title="Many sections? Use side tabs"
            rules={[
              "Pages with 3 or more sub-sections (password, address, notifications) use vertical secondary Tabs, not a long stack of cards.",
              "One Card per tab, each with its own Save button in the Card footer.",
              "Below 768px the side nav becomes a scrollable tab row on top.",
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
              "PageHeader with the primary “Add <Thing>” button, then search and filters, then Table, then DataPagination.",
              "Pagination is always there, even with one page. Default 10 rows. Reset to page 1 when search, filters or page size change.",
              "Row actions live in a Dropdown in the last column. Delete always asks first, in an AlertDialog.",
              "Loading, error, first-run and filtered-to-nothing states each say why and offer one next action.",
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
                <strong className="text-foreground">Modal</strong> when the form is small: 6 fields or fewer, one section, no uploads or line items. Try
                “Add merchant” above.
              </>,
              <>
                <strong className="text-foreground">New page</strong> (<code className="font-mono text-xs">/things/new</code>) when it's large: more
                than 6 fields, several sections, uploads, line items, or a URL worth sharing.
              </>,
              "Full pages use PageHeader with a back link, FormSection blocks and a sticky FormActions bar. Edit follows the same rule.",
            ]}
          />
          <CreatePageDemo />
          <CodeBlock code={CREATE_CODE} />
        </Reveal>
      </Container>
    </Section>
  )
}
