import * as React from "react"
import {
  ArrowRight,
  Bars,
  Book,
  CurlyBrackets,
  Cube,
  FileText,
  Font,
  Globe,
  HandPointUp,
  Layers,
  Palette,
  Xmark,
} from "@gravity-ui/icons"
import { Button, Card, Chip, Input, Link, Toast, buttonVariants, cn } from "@heroui/react"
import { GradientText } from "@/components/aiyo/gradient-text"
import { HeroGraphic } from "@/components/aiyo/hero-graphic"
import { IconTile } from "@/components/aiyo/icon-tile"
import { PricingCard } from "@/components/aiyo/pricing-card"
import { Container, Section, SectionHeader } from "@/components/aiyo/section"
import { SectionLabel } from "@/components/aiyo/section-label"
import { Stat } from "@/components/aiyo/stat"
import { Steps } from "@/components/aiyo/steps"
import { TestimonialCard } from "@/components/aiyo/testimonial-card"
import { ThemeToggle } from "@/components/aiyo/theme-toggle"
import { Reveal, RevealGroup, RevealItem } from "@/lib/motion"
import { AppPatterns } from "./showcase/app-patterns"
import { Gallery } from "./showcase/gallery"
import { CodeBlock, CopyButton, Logo, useCopy } from "./showcase/shared"

const NAV = [
  ["Foundations", "#foundations"],
  ["Components", "#components"],
  ["App patterns", "#app-patterns"],
  ["Blocks", "#blocks"],
  ["For AI agents", "#agents"],
] as const

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        // The one backdrop blur in the system: the sticky navbar.
        scrolled || open ? "border-separator bg-background/80 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" aria-label="AiYO Design System, back to top" className="inline-flex min-h-11 items-center rounded-lg">
          <Logo />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-default hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link href="./DESIGN.md" className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}>
            DESIGN.md
          </Link>
          <Button
            isIconOnly
            variant="ghost"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onPress={() => setOpen((o) => !o)}
          >
            {open ? <Xmark aria-hidden /> : <Bars aria-hidden />}
          </Button>
        </div>
      </Container>
      {open && (
        <nav aria-label="Sections" className="border-t border-separator lg:hidden">
          <Container className="flex flex-col py-3">
            {[...NAV, ["DESIGN.md", "./DESIGN.md"] as const].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-default">
                {label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-16 md:pt-44 md:pb-32">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <RevealGroup className="flex flex-col items-start gap-8">
          <RevealItem>
            <SectionLabel>Version 2 · a HeroUI v3 theme</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h1 className="heading-hero">
              Every AiYO product, one confident <GradientText underline>voice</GradientText>
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="max-w-xl text-lg leading-relaxed text-muted md:text-xl">
              The AiYO theme for HeroUI v3, plus the blocks and app patterns every AiYO product shares. Written so your team and your AI agents
              build screens the same way.
            </p>
          </RevealItem>
          <RevealItem className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="#components" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Browse components <ArrowRight data-arrow aria-hidden />
            </Link>
            <Link href="#setup" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto")}>
              Set up a project
            </Link>
          </RevealItem>
          <RevealItem>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              {["React 19 and Tailwind CSS v4", "HeroUI 3.2 on React Aria", "AA contrast, light and dark"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
        <Reveal className="hidden lg:block">
          <HeroGraphic />
        </Reveal>
      </Container>
    </section>
  )
}

const PRINCIPLES = [
  {
    icon: Layers,
    title: "HeroUI does the components",
    body: "Buttons, fields, overlays and tables come from HeroUI v3 as they ship: React Aria behaviour, HeroUI shapes and sizes. AiYO never forks a component. It themes them through one CSS file of variables.",
  },
  {
    icon: Palette,
    title: "One electric accent",
    body: "Electric Blue carries every primary action, focus ring and selected state. The gradient is kept for a few brand moments: one headline word, the leading icon, a single data highlight.",
  },
  {
    icon: Font,
    title: "One family, two voices",
    body: "Geist Sans sets headlines and interface text. Geist Mono, small and uppercase, labels sections, table heads and metadata.",
  },
  {
    icon: HandPointUp,
    title: "Motion answers the user",
    body: "Content rises in once as you scroll, and controls respond to hover and press with HeroUI's own feedback. Nothing loops for decoration.",
  },
]

function Principles() {
  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeader
            label="Principles"
            title={
              <>
                HeroUI builds it, AiYO <GradientText>brands</GradientText> it
              </>
            }
            description="Four rules decide every design call in an AiYO product."
          />
        </Reveal>
        {/* The first principle frames the other three, so it gets the full row and the gradient tile. */}
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <RevealItem key={p.title} className={cn(i === 0 && "md:col-span-3")}>
              <Card className={cn("h-full gap-5 p-6 md:p-8", i === 0 && "md:flex-row md:items-center md:gap-8")}>
                <IconTile variant={i === 0 ? "gradient" : "soft"} size={i === 0 ? "lg" : "md"}>
                  <p.icon />
                </IconTile>
                <Card.Header className="gap-2">
                  <Card.Title className={cn("text-lg font-semibold tracking-[-0.02em]", i === 0 && "text-2xl md:text-3xl")}>{p.title}</Card.Title>
                  <Card.Description className={cn("text-base leading-relaxed", i === 0 && "max-w-2xl md:text-lg")}>{p.body}</Card.Description>
                </Card.Header>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

const COLORS = [
  { name: "accent", hex: "#0052FF", note: "Brand. Primary buttons, links, focus, selection" },
  { name: "accent-end", hex: "#3366FF", note: "Gradient endpoint" },
  { name: "foreground", hex: "#0F172A", note: "Text, inverted sections" },
  { name: "background", hex: "#FAFAFA", note: "Page canvas" },
  { name: "surface", hex: "#FFFFFF", note: "Cards, tables, accordions" },
  { name: "default", hex: "#F1F5F9", note: "Neutral fills, secondary buttons" },
  { name: "muted", hex: "#5B6B80", note: "Secondary text" },
  { name: "field-border", hex: "#7C8BA1", note: "Field and control edges, 3:1" },
]

function Swatch({ name, hex, note }: { name: string; hex: string; note: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      aria-label={`Copy ${name} ${hex}`}
      className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface text-left shadow-surface transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span className="h-20 w-full border-b border-separator outline-1 -outline-offset-1 outline-separator" style={{ background: hex }} />
      <span className="flex flex-col gap-1 p-4">
        <span className="font-mono text-xs text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted uppercase">{copied ? "Copied" : hex}</span>
        <span className="mt-1 text-xs leading-snug text-muted">{note}</span>
      </span>
    </button>
  )
}

const TYPE_SCALE: [string, React.ReactNode][] = [
  ["Hero · Geist 600 · 80px", <span className="heading-hero">Bold and calm</span>],
  ["Section · Geist 600 · 48px", <span className="heading-section">Built to be trusted</span>],
  ["App page title · Geist 600 · 30px", <span className="text-3xl font-semibold tracking-[-0.03em]">Merchants</span>],
  ["Body · Geist 400 · 18px", <span className="text-lg leading-relaxed text-muted">A 1.6 line height keeps long copy calm and readable.</span>],
  ["Label · Geist Mono 500 · 12px", <span className="label-caps text-accent">Section label</span>],
]

function Foundations() {
  return (
    <Section id="foundations" className="border-t border-separator">
      <Container className="flex flex-col gap-24">
        <Reveal>
          <SectionHeader
            label="Foundations"
            title={
              <>
                Tokens on HeroUI's own <GradientText>variables</GradientText>
              </>
            }
            description="aiyo.css writes the AiYO palette into the variables HeroUI already reads, so every component re-themes without a per-component override. Click a swatch to copy its value. These are the light values; the dark palette is in DESIGN.md."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {COLORS.map((c) => (
              <RevealItem key={c.name}>
                <Swatch {...c} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-col gap-4">
            <div className="flex min-h-56 flex-1 flex-col justify-end rounded-3xl bg-gradient-accent-diagonal p-8 text-accent-foreground">
              <span className="label-caps">The signature gradient</span>
              <span className="mt-3 text-3xl font-semibold tracking-[-0.03em]">#0052FF → #3366FF</span>
              <code className="mt-3 font-mono text-xs">bg-gradient-accent · text-gradient</code>
            </div>
            <Card className="gap-4 p-5">
              <Card.Description>Status colours are for status only, always with a word or an icon.</Card.Description>
              <div className="flex flex-wrap gap-2">
                <Chip color="success" variant="soft">
                  Paid
                </Chip>
                <Chip color="warning" variant="soft">
                  Pending
                </Chip>
                <Chip color="danger" variant="soft">
                  Failed
                </Chip>
                <Chip color="accent" variant="soft">
                  Info
                </Chip>
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">Typography</h3>
            <p className="leading-relaxed text-muted">
              One family with two voices. Geist Sans carries headlines and UI; hierarchy comes from size, weight and tight tracking. Geist Mono,
              small and uppercase, is the label voice and the system's identity motif.
            </p>
          </div>
          <Card className="gap-0 divide-y divide-separator p-0">
            {TYPE_SCALE.map(([meta, sample]) => (
              <div key={meta} className="flex min-w-0 flex-col gap-3 p-6">
                <span className="label-caps text-muted">{meta}</span>
                {sample}
              </div>
            ))}
          </Card>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          <Reveal className="flex flex-col gap-4 rounded-3xl bg-surface-secondary p-6">
            <h3 className="font-semibold">Shape</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Field", "rounded-xl", "12px"],
                ["Card", "rounded-3xl", "24px"],
                ["Button", "rounded-full", "pill"],
              ].map(([n, c, v]) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <span className={cn("size-14 border border-field-border bg-surface", c)} />
                  <span className="text-center text-xs text-muted">
                    {n} · {v}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted">HeroUI's scale from --radius: 0.5rem. Radius marks the kind of thing, not decoration.</p>
          </Reveal>
          <Reveal className="flex flex-col gap-4 rounded-3xl bg-surface-secondary p-6">
            <h3 className="font-semibold">Elevation</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Field", "shadow-field"],
                ["Surface", "shadow-surface"],
                ["Overlay", "shadow-overlay"],
              ].map(([n, s]) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <span className={cn("size-14 rounded-2xl bg-surface", s)} />
                  <span className="text-xs text-muted">{n}</span>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-muted">Three levels, from HeroUI. Overlays float; cards sit just above the canvas.</p>
          </Reveal>
          <Reveal className="flex flex-col gap-4 rounded-3xl bg-surface-secondary p-6">
            <h3 className="font-semibold">Motion</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 rounded-2xl bg-gradient-accent-diagonal" />
                <span className="text-center text-xs text-muted">Enter 0.7s</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 rounded-2xl bg-surface shadow-surface transition-transform duration-200 hover:-translate-y-1" />
                <span className="text-center text-xs text-muted">Hover lift</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 rounded-2xl bg-accent transition-transform duration-200 active:scale-[0.97]" />
                <span className="text-center text-xs text-muted">Press 0.97</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted">Ease [0.16, 1, 0.3, 1] for entrances, once. HeroUI's own timing for controls. No loops.</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function Stats() {
  return (
    <Section inverted spacing="sm">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-separator">
          {[
            { label: "AiYO blocks", value: "16", hint: "Components in src/components/aiyo, on top of HeroUI" },
            { label: "Accent colour", value: "1", hint: "Electric Blue, light and dark" },
            { label: "Type family", value: "1", hint: "Geist Sans and Geist Mono" },
            { label: "Text contrast", value: "AA", hint: "Every token pair checked, 4.5:1 or more" },
          ].map((s) => (
            <RevealItem key={s.label} className="md:px-8 md:first:pl-0">
              <Stat label={s.label} value={s.value} hint={s.hint} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

function PatternTitle({ name, file }: { name: string; file: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-separator pb-4">
      <h3 className="text-2xl font-semibold tracking-[-0.02em]">{name}</h3>
      <code className="font-mono text-xs text-muted">components/aiyo/{file}</code>
    </div>
  )
}

function Blocks() {
  const [plan, setPlan] = React.useState<string | null>(null)
  return (
    <Section id="blocks" className="border-t border-separator">
      <Container className="flex flex-col gap-24">
        <Reveal>
          <SectionHeader
            label="Landing blocks"
            title={
              <>
                Blocks that compose into <GradientText>pages</GradientText>
              </>
            }
            description="Sections for landing and product pages, built from HeroUI parts. The content below is sample copy; in a product these blocks show real data or are left out."
          />
        </Reveal>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Steps" file="steps.tsx" />
          <Reveal>
            <Steps
              steps={[
                { title: "Install HeroUI and Geist", description: "Add @heroui/react, @heroui/styles and the two Geist font packages." },
                { title: "Copy the AiYO theme", description: "Drop aiyo.css into the project and import it once, in place of Tailwind." },
                { title: "Add the blocks you need", description: "Copy files from components/aiyo and lib/motion.tsx." },
                { title: "Brief your agent", description: "Point Claude, Codex or Cursor at AGENTS.md so generated UI follows the rules." },
              ]}
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Pricing" file="pricing-card.tsx" />
          <RevealGroup className="grid items-stretch gap-6 md:grid-cols-3">
            <RevealItem>
              <PricingCard
                selected={plan === "Starter"}
                onSelect={() => setPlan("Starter")}
                name="Starter"
                price="Rp 0"
                period="/month"
                description="Sample tier: one outlet."
                features={["1 outlet", "QRIS payments", "Email support"]}
                cta="Choose Starter"
              />
            </RevealItem>
            <RevealItem>
              <PricingCard
                highlighted
                highlightLabel="Fits 2 to 10 outlets"
                selected={plan === "Growth"}
                onSelect={() => setPlan("Growth")}
                name="Growth"
                price="Rp 249rb"
                period="/month"
                description="Sample tier: a growing merchant."
                features={["Up to 10 outlets", "All payment methods", "Daily settlement", "Priority support"]}
                cta="Choose Growth"
              />
            </RevealItem>
            <RevealItem>
              <PricingCard
                selected={plan === "Enterprise"}
                onSelect={() => setPlan("Enterprise")}
                name="Enterprise"
                price="Custom"
                description="Sample tier: chains and platforms."
                features={["Unlimited outlets", "Dedicated manager", "Custom SLA"]}
                cta="Choose Enterprise"
              />
            </RevealItem>
          </RevealGroup>
        </div>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Testimonials" file="testimonial-card.tsx" />
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            <RevealItem>
              <TestimonialCard quote="We rebuilt our admin in a week. It finally looks like one product." name="Frontend Lead" role="Sample quote · Bills team" />
            </RevealItem>
            <RevealItem className="md:translate-y-10">
              <TestimonialCard quote="My agent now ships screens that pass design review on the first try." name="Product Engineer" role="Sample quote · POS team" />
            </RevealItem>
            <RevealItem>
              <TestimonialCard quote="One accent colour sounded limiting. It made every screen easier to read." name="Product Designer" role="Sample quote · Design" />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}

const MAIN_FILES = [
  {
    icon: FileText,
    name: "DESIGN.md",
    href: "./DESIGN.md",
    body: "The full spec: tokens, the HeroUI component rules, AiYO blocks, page recipes, mandatory app patterns and the anti-slop decisions.",
  },
  {
    icon: Book,
    name: "AGENTS.md",
    href: "./AGENTS.md",
    body: "Install steps, the hard rules and a snippet to paste into any AiYO project's CLAUDE.md or AGENTS.md.",
  },
]

const MORE_FILES = [
  { icon: Globe, name: "llms.txt", href: "./llms.txt", body: "Index for agents with web access, plus llms-full.txt in one fetch." },
  { icon: CurlyBrackets, name: "aiyo.tokens.json", href: "./aiyo.tokens.json", body: "Tokens in the W3C DTCG format, for Figma plugins and code generators." },
  { icon: Cube, name: "SKILL.md", href: "./SKILL.md", body: "A Claude Code skill: copy skills/aiyo-design into .claude/skills." },
  { icon: Palette, name: "aiyo.css", href: "./aiyo.css", body: "The source of truth: the HeroUI theme, Geist, utilities and the touch layer." },
]

const AGENT_PROMPT = `Build this UI with the AiYO Design System.
Read DESIGN.md and AGENTS.md first, and follow them exactly:
- components from @heroui/react (v3), themed only by aiyo.css
- AiYO blocks from @/components/aiyo (Section, PageHeader, DataPagination...)
- accent = Electric Blue; Geist Sans for text, Geist Mono for labels
- icons from @gravity-ui/icons`

function Agents() {
  return (
    <Section id="agents" className="border-t border-separator">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0">
        <Reveal className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            label="For AI agents"
            title={
              <>
                Docs your agent can <GradientText>actually read</GradientText>
              </>
            }
            description="Markdown is the format every coding agent reads best. The same rules ship as a full spec, short rules, an llms.txt index, a token file and a Claude skill."
          />
          <CodeBlock label="prompt" code={AGENT_PROMPT} wrap />
        </Reveal>
        <div className="flex flex-col gap-5">
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {MAIN_FILES.map((f) => (
              <RevealItem key={f.name}>
                <a href={f.href} className="group block h-full rounded-3xl">
                  <Card className="h-full gap-5 p-6 transition-transform duration-200 group-hover:-translate-y-0.5 md:p-8">
                    <IconTile variant={f.name === "DESIGN.md" ? "gradient" : "soft"}>
                      <f.icon />
                    </IconTile>
                    <Card.Header className="gap-2">
                      <Card.Title className="font-mono text-base">{f.name}</Card.Title>
                      <Card.Description className="leading-relaxed">{f.body}</Card.Description>
                    </Card.Header>
                  </Card>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <Card className="gap-0 divide-y divide-separator p-0">
              {MORE_FILES.map((f) => (
                <a key={f.name} href={f.href} className="flex items-start gap-4 p-5 transition-colors first:rounded-t-3xl last:rounded-b-3xl hover:bg-surface-hover">
                  <f.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="flex flex-col gap-1">
                    <span className="font-mono text-sm font-medium">{f.name}</span>
                    <span className="text-sm leading-relaxed text-muted">{f.body}</span>
                  </span>
                </a>
              ))}
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

const INSTALL = "npm i @heroui/react @heroui/styles @fontsource-variable/geist @fontsource-variable/geist-mono @gravity-ui/icons"

function Setup() {
  return (
    <Section id="setup" inverted spacing="lg">
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <SectionLabel>Set up a project</SectionLabel>
          <h2 className="heading-section">
            Start an AiYO project on <GradientText>HeroUI</GradientText>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Install HeroUI and Geist, copy aiyo.css and the AiYO blocks you need, then let your team and your agents build.
          </p>
          <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Input readOnly fullWidth value={INSTALL} aria-label="Install command" className="pr-12 font-mono text-xs sm:text-xs" />
              <CopyButton value={INSTALL} className="absolute top-1/2 right-1.5 -translate-y-1/2" />
            </div>
            <Link href="./README.md" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Read the setup guide
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-separator py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <Logo />
        <span>© {new Date().getFullYear()} AiYO · Design System v2, on HeroUI v3</span>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#components"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-overlay focus:px-4 focus:py-2 focus:shadow-overlay"
      >
        Skip to components
      </a>
      <Navbar />
      <main>
        <Hero />
        <Principles />
        <Foundations />
        <Stats />
        <Gallery />
        <AppPatterns />
        <Blocks />
        <Agents />
        <Setup />
      </main>
      <Footer />
      <Toast.Provider placement="bottom end" />
    </>
  )
}
