import * as React from "react"
import { ArrowRight, Bell, Envelope, Gear, Plus, Receipt, Wallet, ArrowRightFromSquare, Person } from "@gravity-ui/icons"
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Checkbox,
  Chip,
  Description,
  Dropdown,
  FieldError,
  Input,
  Kbd,
  Label,
  Link,
  ListBox,
  Modal,
  ProgressBar,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Table,
  Tabs,
  TextArea,
  TextField,
  Tooltip,
  buttonVariants,
  cn,
  toast,
  type Key,
} from "@heroui/react"
import { DataPagination } from "@/components/aiyo/data-pagination"
import { GradientText } from "@/components/aiyo/gradient-text"
import { IconTile } from "@/components/aiyo/icon-tile"
import { Container, Section, SectionHeader } from "@/components/aiyo/section"
import { SectionLabel } from "@/components/aiyo/section-label"
import { Stat } from "@/components/aiyo/stat"
import { Demo } from "./shared"

const GROUPS = [
  { label: "Actions", items: [["button", "Button"], ["icon-tile", "Icon Tile"]] },
  { label: "Labels", items: [["chip", "Chip"], ["brand-type", "Section Label · Gradient Text"]] },
  { label: "Forms", items: [["text-field", "Text Field"], ["select", "Select"], ["choices", "Checkbox · Radio · Switch"]] },
  { label: "Surfaces", items: [["card", "Card"], ["modal", "Modal"]] },
  { label: "Navigation", items: [["tabs", "Tabs"], ["accordion", "Accordion"], ["dropdown", "Dropdown"]] },
  { label: "Feedback", items: [["alert", "Alert"], ["toast", "Toast"], ["progress", "Progress · Spinner · Skeleton"], ["tooltip", "Tooltip · Kbd"]] },
  { label: "Data", items: [["stat", "Stat"], ["table", "Table"], ["pagination", "Data Pagination"], ["avatar", "Avatar"]] },
] as const

const ALL_IDS = GROUPS.flatMap((g) => g.items.map(([id]) => id))

function useActiveId(ids: string[]) {
  const [active, setActive] = React.useState(ids[0])
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
        // Scrolled back above the gallery: the first entry is the one coming next.
        else if ((document.getElementById(ids[0])?.getBoundingClientRect().top ?? 0) > window.innerHeight * 0.35) setActive(ids[0])
      },
      { rootMargin: "-20% 0px -65% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

const BANKS = ["BCA", "Mandiri", "BNI", "BRI"]
const INVOICES = [
  { id: "INV-0003", customer: "Sample customer C", status: "Paid", color: "success", amount: "Rp 1.250.000" },
  { id: "INV-0002", customer: "Sample customer B", status: "Pending", color: "warning", amount: "Rp 480.000" },
  { id: "INV-0001", customer: "Sample customer A", status: "Failed", color: "danger", amount: "Rp 2.100.000" },
] as const

function PendingButton() {
  const [pending, setPending] = React.useState(false)
  return (
    <Button
      isPending={pending}
      onPress={() => {
        setPending(true)
        window.setTimeout(() => setPending(false), 1200)
      }}
    >
      {({ isPending }) =>
        isPending ? (
          <>
            <Spinner color="current" size="sm" aria-label="Saving" /> Saving
          </>
        ) : (
          "Save draft"
        )
      }
    </Button>
  )
}

export function Gallery() {
  const active = useActiveId(ALL_IDS as unknown as string[])
  const [plan, setPlan] = React.useState("pro")
  const [bank, setBank] = React.useState<Key | null>("bca")
  const [page, setPage] = React.useState(4)
  const [pageSize, setPageSize] = React.useState(10)

  return (
    <Section id="components">
      <Container>
        <SectionHeader
          label="Components"
          title={
            <>
              HeroUI components, <GradientText>AiYO colours</GradientText>
            </>
          }
          description="Every preview below is the real HeroUI v3 component, imported from @heroui/react and themed only by aiyo.css. AiYO-only pieces are marked with their components/aiyo file."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
          <nav aria-label="Components" className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              {GROUPS.map((g) => (
                <div key={g.label} className="flex flex-col gap-1">
                  <span className="mb-1 label-caps text-muted">{g.label}</span>
                  {g.items.map(([id, name]) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      aria-current={active === id ? "location" : undefined}
                      className={cn(
                        "relative rounded-md py-1 pl-3 text-sm transition-colors before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full",
                        active === id ? "font-medium text-foreground before:bg-accent" : "text-muted before:bg-separator hover:text-foreground",
                      )}
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
              description="HeroUI's button, unchanged: primary is the Electric Blue fill, secondary a soft neutral, outline and ghost for low emphasis, danger for destructive actions. Use onPress, not onClick. An icon marked data-arrow slides on hover; give it to the one main CTA on a screen."
              code={`import { Button, Link, buttonVariants } from "@heroui/react"
import { ArrowRight, Plus } from "@gravity-ui/icons"

<Button onPress={create}>Create invoice <ArrowRight data-arrow /></Button>
<Button variant="secondary">Export CSV</Button>
<Button variant="outline">Preview</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button isIconOnly variant="secondary" aria-label="Add"><Plus /></Button>

{/* A link that looks like a button */}
<Link href="/docs" className={buttonVariants({ variant: "outline" })}>Read the API docs</Link>`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button>
                    Create invoice <ArrowRight data-arrow aria-hidden />
                  </Button>
                  <Button variant="secondary">Export CSV</Button>
                  <Button variant="tertiary">Duplicate</Button>
                  <Button variant="outline">Preview</Button>
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="danger">Delete</Button>
                  <Button variant="danger-soft">Archive</Button>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button isIconOnly variant="secondary" aria-label="Add">
                    <Plus aria-hidden />
                  </Button>
                  <PendingButton />
                  <Link href="#text-field" className={buttonVariants({ variant: "outline" })}>
                    Jump to forms
                  </Link>
                </div>
              </div>
            </Demo>

            <Demo
              id="icon-tile"
              title="Icon Tile"
              description="AiYO block (components/aiyo/icon-tile.tsx). Soft by default. The gradient tile marks the one item that leads a group, so use it once per group."
              code={`import { IconTile } from "@/components/aiyo/icon-tile"

<IconTile variant="gradient" size="lg"><Receipt /></IconTile>
<IconTile><Wallet /></IconTile>
<IconTile variant="default" size="sm"><Gear /></IconTile>`}
            >
              <IconTile variant="gradient" size="lg">
                <Receipt />
              </IconTile>
              <IconTile size="lg">
                <Wallet />
              </IconTile>
              <IconTile>
                <Wallet />
              </IconTile>
              <IconTile variant="default" size="sm">
                <Gear />
              </IconTile>
            </Demo>

            <Demo
              id="chip"
              title="Chip"
              description="Inline status and metadata. Use the soft variant with a status colour, and always keep the word: colour alone never carries the status. (HeroUI's Badge is a counter that sits on another element, not an inline label.)"
              code={`import { Chip } from "@heroui/react"

<Chip color="success" variant="soft">Paid</Chip>
<Chip color="warning" variant="soft">Pending</Chip>
<Chip color="danger" variant="soft">Failed</Chip>
<Chip>Draft</Chip>
<Chip color="accent" variant="soft">v2.0</Chip>`}
            >
              <Chip color="success" variant="soft">
                Paid
              </Chip>
              <Chip color="warning" variant="soft">
                Pending
              </Chip>
              <Chip color="danger" variant="soft">
                Failed
              </Chip>
              <Chip>Draft</Chip>
              <Chip color="accent" variant="soft">
                v2.0
              </Chip>
              <Chip color="accent" variant="primary">
                Selected
              </Chip>
            </Demo>

            <Demo
              id="brand-type"
              title="Section Label and Gradient Text"
              description="AiYO blocks (section-label.tsx, gradient-text.tsx). The label is plain uppercase Geist Mono with no pill and no dot. One headline word per screen may take the gradient; the underline bar is for the hero only."
              previewClassName="flex-col"
              code={`import { SectionLabel } from "@/components/aiyo/section-label"
import { GradientText } from "@/components/aiyo/gradient-text"

<SectionLabel>Settlement</SectionLabel>
<h2 className="heading-section">Settlement in <GradientText>one tap</GradientText></h2>
<h1 className="heading-hero">Ship it <GradientText underline>today</GradientText></h1>`}
            >
              <SectionLabel>Settlement</SectionLabel>
              <p className="heading-section text-center">
                Settlement in <GradientText>one tap</GradientText>
              </p>
            </Demo>

            <Demo
              id="text-field"
              title="Text Field"
              description="TextField wires Label, Input, Description and FieldError together, with validation and aria attributes. AiYO gives fields a 1px edge at 3:1 contrast, and on touch screens every field is at least 44px tall."
              previewClassName="block"
              code={`import { Description, FieldError, Input, Label, SearchField, TextArea, TextField } from "@heroui/react"

<TextField name="email" type="email" isRequired>
  <Label>Email</Label>
  <Input placeholder="email@example.com" />
  <Description>We only use it for receipts.</Description>
  <FieldError />
</TextField>

<TextField name="mid" isInvalid>
  <Label>Merchant ID</Label>
  <Input placeholder="MID-0000" />
  <FieldError>Enter the merchant ID.</FieldError>
</TextField>

<SearchField aria-label="Search transactions">
  <SearchField.Group>
    <SearchField.SearchIcon />
    <SearchField.Input placeholder="Search transactions" />
    <SearchField.ClearButton aria-label="Clear search" />
  </SearchField.Group>
</SearchField>`}
            >
              <div className="mx-auto grid w-full max-w-xl gap-6 sm:grid-cols-2">
                <TextField name="email" type="email" isRequired>
                  <Label>Email</Label>
                  <Input placeholder="email@example.com" />
                  <Description>We only use it for receipts.</Description>
                  <FieldError />
                </TextField>
                <TextField name="mid" isInvalid>
                  <Label>Merchant ID</Label>
                  <Input placeholder="MID-0000" />
                  <FieldError>Enter the merchant ID.</FieldError>
                </TextField>
                <SearchField aria-label="Search transactions" className="sm:col-span-2" fullWidth>
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="Search transactions" />
                    <SearchField.ClearButton aria-label="Clear search" />
                  </SearchField.Group>
                </SearchField>
                <TextField name="notes" className="sm:col-span-2" fullWidth>
                  <Label>Notes</Label>
                  <TextArea rows={3} placeholder="Anything we should know?" />
                </TextField>
              </div>
            </Demo>

            <Demo
              id="select"
              title="Select"
              description="A field trigger with a ListBox in a popover. Give every item an id and a textValue; read and set the choice with value and onChange."
              code={`import { Label, ListBox, Select } from "@heroui/react"

<Select value={bank} onChange={setBank} placeholder="Choose a bank" className="w-64">
  <Label>Settlement bank</Label>
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Popover>
    <ListBox>
      <ListBox.Item id="bca" textValue="BCA">BCA<ListBox.ItemIndicator /></ListBox.Item>
      <ListBox.Item id="mandiri" textValue="Mandiri">Mandiri<ListBox.ItemIndicator /></ListBox.Item>
    </ListBox>
  </Select.Popover>
</Select>`}
            >
              <Select value={bank} onChange={setBank} placeholder="Choose a bank" className="w-64">
                <Label>Settlement bank</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {BANKS.map((b) => (
                      <ListBox.Item key={b} id={b.toLowerCase()} textValue={b}>
                        {b}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </Demo>

            <Demo
              id="choices"
              title="Checkbox, Radio and Switch"
              description="Each control sits inside its own Content part, so the whole row is the target. Off states keep a 3:1 edge or track."
              code={`import { Checkbox, Label, Radio, RadioGroup, Switch } from "@heroui/react"

<Checkbox name="receipts" defaultSelected>
  <Checkbox.Content>
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
    Email receipts
  </Checkbox.Content>
</Checkbox>

<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Label>Plan</Label>
  <Radio value="pro">
    <Radio.Content>
      <Radio.Control><Radio.Indicator /></Radio.Control>
      Pro
    </Radio.Content>
  </Radio>
</RadioGroup>

<Switch defaultSelected>
  <Switch.Content>
    <Switch.Control><Switch.Thumb /></Switch.Control>
    Auto settlement
  </Switch.Content>
</Switch>`}
            >
              <div className="grid w-full max-w-xl gap-8 sm:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <Checkbox name="receipts" defaultSelected>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Email receipts
                    </Checkbox.Content>
                  </Checkbox>
                  <Checkbox name="some" isIndeterminate>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      Some outlets
                    </Checkbox.Content>
                  </Checkbox>
                  <Checkbox name="sms">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      SMS alerts
                    </Checkbox.Content>
                  </Checkbox>
                </div>
                <RadioGroup name="plan" value={plan} onChange={setPlan}>
                  <Label>Plan</Label>
                  {["starter", "pro", "enterprise"].map((p) => (
                    <Radio key={p} value={p}>
                      <Radio.Content className="capitalize">
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        {p}
                      </Radio.Content>
                    </Radio>
                  ))}
                </RadioGroup>
                <div className="flex flex-col gap-3">
                  <Switch defaultSelected>
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      Auto settlement
                    </Switch.Content>
                  </Switch>
                  <Switch>
                    <Switch.Content>
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      Maintenance
                    </Switch.Content>
                  </Switch>
                </div>
              </div>
            </Demo>

            <Demo
              id="card"
              title="Card"
              description="White surface, 24px radius, HeroUI's light surface shadow. Title, description, content and footer are parts. The secondary variant sits on a tinted fill for grouped or less important content."
              previewClassName="grid items-stretch gap-5 md:grid-cols-[1.2fr_1fr]"
              code={`import { Button, Card } from "@heroui/react"

<Card className="p-6">
  <Card.Header>
    <Card.Title>Instant settlement</Card.Title>
    <Card.Description>Funds land in the merchant's account the same day.</Card.Description>
  </Card.Header>
  <Card.Footer className="gap-3">
    <Button size="sm">Turn on</Button>
  </Card.Footer>
</Card>

<Card variant="secondary">…</Card>`}
            >
              <Card className="gap-5 p-6">
                <IconTile>
                  <Wallet />
                </IconTile>
                <Card.Header className="gap-1">
                  <Card.Title className="text-lg font-semibold">Instant settlement</Card.Title>
                  <Card.Description>Funds land in the merchant's account the same day.</Card.Description>
                </Card.Header>
                <Card.Footer className="gap-3">
                  <Button size="sm">Turn on</Button>
                  <Button size="sm" variant="ghost">
                    Learn how payouts work
                  </Button>
                </Card.Footer>
              </Card>
              <Card variant="secondary" className="justify-between gap-5 p-6">
                <Card.Header className="gap-1">
                  <Card.Title className="text-lg font-semibold">Secondary</Card.Title>
                  <Card.Description>For grouped settings and supporting content that sits behind the main card.</Card.Description>
                </Card.Header>
                <Card.Content>
                  <ProgressBar value={72} aria-label="Setup progress">
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                </Card.Content>
              </Card>
            </Demo>

            <Demo
              id="modal"
              sample
              title="Modal"
              description="Solid backdrop (no blur), focus trapped, closes on Escape. A Button with slot close closes it. For a delete confirmation use AlertDialog with a danger button (see App patterns)."
              code={`import { Button, Input, Label, Modal, TextField } from "@heroui/react"

<Modal>
  <Button>Confirm payout</Button>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.CloseTrigger />
        <Modal.Header>
          <Modal.Heading>Confirm payout</Modal.Heading>
          <p className="text-sm text-muted">[Amount] goes to [bank account].</p>
        </Modal.Header>
        <Modal.Body>
          <TextField name="pin" type="password"><Label>PIN</Label><Input /></TextField>
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" variant="secondary">Cancel</Button>
          <Button slot="close">Confirm payout</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`}
            >
              <Modal>
                <Button>Confirm payout</Button>
                <Modal.Backdrop>
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.CloseTrigger />
                      <Modal.Header>
                        <Modal.Heading>Confirm payout</Modal.Heading>
                        <p className="text-sm text-muted">[Amount] goes to [bank account]. This can't be undone.</p>
                      </Modal.Header>
                      <Modal.Body>
                        <TextField name="pin" type="password" fullWidth>
                          <Label>PIN</Label>
                          <Input inputMode="numeric" placeholder="6 digits" />
                        </TextField>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button slot="close" variant="secondary">
                          Cancel
                        </Button>
                        <Button slot="close">Confirm payout</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            </Demo>

            <Demo
              id="tabs"
              title="Tabs"
              description="Primary is a segmented control; secondary is an underline that also works as vertical side navigation (see App patterns). Put Tabs.Indicator inside every tab and give tabs and panels matching ids."
              previewClassName="flex-col items-stretch"
              code={`import { Tabs } from "@heroui/react"

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

<Tabs variant="secondary">…</Tabs>`}
            >
              {(["primary", "secondary"] as const).map((variant) => (
                <Tabs key={variant} variant={variant} defaultSelectedKey="overview" align="start" className="w-full max-w-md self-center">
                  <Tabs.ListContainer>
                    <Tabs.List aria-label={`Invoice, ${variant} tabs`}>
                      {["Overview", "Activity", "Settings"].map((t) => (
                        <Tabs.Tab key={t} id={t.toLowerCase()}>
                          {t}
                          <Tabs.Indicator />
                        </Tabs.Tab>
                      ))}
                    </Tabs.List>
                  </Tabs.ListContainer>
                  {["overview", "activity", "settings"].map((t) => (
                    <Tabs.Panel key={t} id={t} className="px-0">
                      <p className="rounded-2xl bg-surface-secondary p-4 text-sm text-muted capitalize">
                        {variant} · {t} panel
                      </p>
                    </Tabs.Panel>
                  ))}
                </Tabs>
              ))}
            </Demo>

            <Demo
              id="accordion"
              title="Accordion"
              description="For FAQs with questions real users ask. Items expand one at a time unless you set allowsMultipleExpanded."
              previewClassName="block"
              code={`import { Accordion } from "@heroui/react"

<Accordion defaultExpandedKeys={["provider"]}>
  <Accordion.Item id="provider">
    <Accordion.Heading>
      <Accordion.Trigger>Do I need a provider?<Accordion.Indicator /></Accordion.Trigger>
    </Accordion.Heading>
    <Accordion.Panel>
      <Accordion.Body>No. HeroUI v3 works without one.</Accordion.Body>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>`}
            >
              <Accordion defaultExpandedKeys={["provider"]} className="mx-auto w-full max-w-xl">
                {[
                  ["provider", "Do I need a provider around the app?", "No. HeroUI v3 works without one. Mount <Toast.Provider /> once if you use toasts."],
                  ["dark", "How does dark mode work?", "Call useTheme from @heroui/react, or put the dark class on html. aiyo.css holds the dark palette, and one section can go dark with the inverted class."],
                  ["agents", "How do AI agents learn the rules?", "Point them at AGENTS.md and DESIGN.md, or the llms.txt index, or install the aiyo-design Claude skill."],
                ].map(([id, q, a]) => (
                  <Accordion.Item key={id} id={id}>
                    <Accordion.Heading>
                      <Accordion.Trigger>
                        {q}
                        <Accordion.Indicator />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body>{a}</Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Demo>

            <Demo
              id="dropdown"
              title="Dropdown"
              description="A menu in a popover. Handle choices with onAction on the menu, and mark destructive items with the danger variant."
              code={`import { Button, Dropdown, Label } from "@heroui/react"

<Dropdown>
  <Button variant="secondary">Account</Button>
  <Dropdown.Popover>
    <Dropdown.Menu onAction={(key) => run(key)}>
      <Dropdown.Item id="profile" textValue="Profile"><Person /><Label>Profile</Label></Dropdown.Item>
      <Dropdown.Item id="settings" textValue="Settings"><Gear /><Label>Settings</Label></Dropdown.Item>
      <Dropdown.Item id="logout" textValue="Log out" variant="danger"><Label>Log out</Label></Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown.Popover>
</Dropdown>`}
            >
              <Dropdown>
                <Button variant="secondary">Account</Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={(key) => toast(`Menu: ${String(key)}`)}>
                    <Dropdown.Item id="profile" textValue="Profile">
                      <Person aria-hidden className="size-4" />
                      <Label>Profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="notifications" textValue="Notifications">
                      <Bell aria-hidden className="size-4" />
                      <Label>Notifications</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="settings" textValue="Settings">
                      <Gear aria-hidden className="size-4" />
                      <Label>Settings</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="Log out" variant="danger">
                      <ArrowRightFromSquare aria-hidden className="size-4" />
                      <Label>Log out</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </Demo>

            <Demo
              id="alert"
              sample
              title="Alert"
              description="Page-level messages. The status colours the icon and title; the description stays muted. Add role status or alert when the message appears after an action."
              previewClassName="grid w-full gap-4 md:grid-cols-2"
              code={`import { Alert } from "@heroui/react"

<Alert status="accent">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Settlement scheduled</Alert.Title>
    <Alert.Description>Funds arrive tomorrow at 09:00 WIB.</Alert.Description>
  </Alert.Content>
</Alert>`}
            >
              {(
                [
                  ["accent", "Settlement scheduled", "Funds arrive tomorrow at 09:00 WIB."],
                  ["success", "Payment received", "Invoice [number] is now paid."],
                  ["warning", "KYC expiring", "Renew the documents within 7 days."],
                  ["danger", "Transfer failed", "The bank rejected the destination account."],
                ] as const
              ).map(([status, title, body]) => (
                <Alert key={status} status={status}>
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>{title}</Alert.Title>
                    <Alert.Description>{body}</Alert.Description>
                  </Alert.Content>
                </Alert>
              ))}
            </Demo>

            <Demo
              id="toast"
              title="Toast"
              description="Short confirmations after an action. Mount Toast.Provider once at the app root, then call toast from anywhere."
              code={`import { Toast, toast } from "@heroui/react"

// once, next to the app
<Toast.Provider placement="bottom end" />

toast.success("Invoice sent", { description: "The customer gets an email with the PDF." })
toast.danger("Couldn't send the invoice", { description: "Check the email address, then try again." })`}
            >
              <Button variant="secondary" onPress={() => toast.success("Invoice sent", { description: "The customer gets an email with the PDF." })}>
                Show success toast
              </Button>
              <Button
                variant="secondary"
                onPress={() => toast.danger("Couldn't send the invoice", { description: "Check the email address, then try again." })}
              >
                Show error toast
              </Button>
            </Demo>

            <Demo
              id="progress"
              sample
              title="Progress, Spinner and Skeleton"
              description="ProgressBar fills with the accent. Spinner marks a wait you cannot measure. Skeletons copy the shape of the real content they stand in for."
              previewClassName="block"
              code={`import { Label, ProgressBar, Skeleton, Spinner } from "@heroui/react"

<ProgressBar value={64}>
  <Label>Onboarding</Label>
  <ProgressBar.Output />
  <ProgressBar.Track><ProgressBar.Fill /></ProgressBar.Track>
</ProgressBar>
<Spinner size="sm" aria-label="Syncing transactions" />
<Skeleton aria-hidden className="h-4 w-48 rounded-lg" />`}
            >
              <div className="mx-auto grid w-full max-w-xl gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <ProgressBar value={64}>
                    <Label>Onboarding</Label>
                    <ProgressBar.Output />
                    <ProgressBar.Track>
                      <ProgressBar.Fill />
                    </ProgressBar.Track>
                  </ProgressBar>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Spinner size="sm" aria-label="Syncing transactions" /> Syncing transactions
                  </div>
                </div>
                <div className="flex items-center gap-4" aria-hidden>
                  <Skeleton className="size-12 shrink-0 rounded-full" />
                  <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 rounded-lg" />
                  </div>
                </div>
              </div>
            </Demo>

            <Demo
              id="tooltip"
              title="Tooltip and Kbd"
              description="Tooltips name icon-only buttons on hover and focus, after HeroUI's default delay. The button still needs its own aria-label."
              code={`import { Button, Kbd, Tooltip } from "@heroui/react"

<Tooltip>
  <Button isIconOnly variant="secondary" aria-label="Inbox"><Envelope /></Button>
  <Tooltip.Content showArrow><Tooltip.Arrow />Inbox, 3 unread</Tooltip.Content>
</Tooltip>
<Kbd><Kbd.Abbr keyValue="command" /><Kbd.Content>K</Kbd.Content></Kbd>`}
            >
              <Tooltip>
                <Button isIconOnly variant="secondary" aria-label="Inbox">
                  <Envelope aria-hidden />
                </Button>
                <Tooltip.Content showArrow>
                  <Tooltip.Arrow />
                  Inbox, 3 unread
                </Tooltip.Content>
              </Tooltip>
              <span className="flex items-center gap-2 text-sm text-muted">
                Search
                <Kbd>
                  <Kbd.Abbr keyValue="command" />
                  <Kbd.Content>K</Kbd.Content>
                </Kbd>
              </span>
            </Demo>

            <Demo
              id="stat"
              sample
              title="Stat"
              description="AiYO block (stat.tsx): mono label, large Geist numeral, optional trend chip. Show a trend only when the comparison period is real, and name it in the hint. trendTone says whether the movement is good news."
              previewClassName="grid justify-items-start gap-8 sm:grid-cols-3"
              code={`import { Stat } from "@/components/aiyo/stat"

<Stat label="Monthly volume" value="Rp 4,2M" trend="+18%" hint="vs. September" />
<Stat label="Refund rate" value="0.8%" trend="+0.3%" trendTone="negative" hint="vs. September" />`}
            >
              <Stat label="Monthly volume" value="Rp 4,2M" trend="+18%" hint="vs. September" />
              <Stat label="Merchants" value="12.480" trend="+6%" hint="vs. September" />
              <Stat label="Refund rate" value="0.8%" trend="+0.3%" trendTone="negative" hint="vs. September" />
            </Demo>

            <Demo
              id="table"
              sample
              title="Table"
              description="React Aria table with keyboard navigation. Mark one column isRowHeader and give every row an id. Status cells use Chip."
              previewClassName="block"
              code={`import { Chip, Table } from "@heroui/react"

<Table>
  <Table.ScrollContainer>
    <Table.Content aria-label="Invoices">
      <Table.Header>
        <Table.Column isRowHeader>Invoice</Table.Column>
        <Table.Column>Status</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row id="INV-0003">
          <Table.Cell>INV-0003</Table.Cell>
          <Table.Cell><Chip color="success" variant="soft">Paid</Chip></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table.ScrollContainer>
</Table>`}
            >
              <Table>
                <Table.ScrollContainer>
                  <Table.Content aria-label="Invoices">
                    <Table.Header>
                      <Table.Column isRowHeader>Invoice</Table.Column>
                      <Table.Column>Customer</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column className="text-end">Amount</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {INVOICES.map((r) => (
                        <Table.Row key={r.id} id={r.id}>
                          <Table.Cell className="font-mono text-xs">{r.id}</Table.Cell>
                          <Table.Cell className="font-medium">{r.customer}</Table.Cell>
                          <Table.Cell>
                            <Chip color={r.color} variant="soft" size="sm">
                              {r.status}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-end tabular-nums">{r.amount}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </Demo>

            <Demo
              id="pagination"
              sample
              title="Data Pagination"
              description="AiYO block (data-pagination.tsx) on HeroUI's Pagination. Mandatory under every data table, even with one page: the row range, rows per page, and pages with ellipses."
              previewClassName="block"
              code={`import { DataPagination } from "@/components/aiyo/data-pagination"

const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)

<DataPagination
  page={page}
  pageSize={pageSize}
  total={248}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>`}
            >
              <DataPagination page={page} pageSize={pageSize} total={248} onPageChange={setPage} onPageSizeChange={setPageSize} />
            </Demo>

            <Demo
              id="avatar"
              title="Avatar"
              description="Initials on a soft accent fill until an approved photo exists. Groups overlap with a surface ring."
              code={`import { Avatar, AvatarGroup } from "@heroui/react"

<Avatar color="accent" variant="soft"><Avatar.Fallback>AP</Avatar.Fallback></Avatar>
<AvatarGroup aria-label="Reviewers" role="group">…</AvatarGroup>`}
            >
              <Avatar size="lg" color="accent" variant="soft">
                <Avatar.Fallback>AP</Avatar.Fallback>
              </Avatar>
              <AvatarGroup aria-label="Reviewers" role="group">
                {["RS", "DW", "MN"].map((i) => (
                  <Avatar key={i} color="accent" variant="soft">
                    <Avatar.Fallback>{i}</Avatar.Fallback>
                  </Avatar>
                ))}
                <Avatar>
                  <Avatar.Fallback>+5</Avatar.Fallback>
                </Avatar>
              </AvatarGroup>
            </Demo>
          </div>
        </div>
      </Container>
    </Section>
  )
}
