import * as React from "react"
import { ArrowRight, Bot, Braces, Columns2, FileText, Layers, Menu, MousePointerClick, Package, Palette, Terminal, X } from "lucide-react"
import { Container, Section, SectionHeader } from "@/components/blocks/section"
import { HeroGraphic } from "@/components/blocks/hero-graphic"
import { PricingCard } from "@/components/blocks/pricing-card"
import { Steps } from "@/components/blocks/steps"
import { TestimonialCard } from "@/components/blocks/testimonial-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GradientText } from "@/components/ui/gradient-text"
import { IconTile } from "@/components/ui/icon-tile"
import { Input } from "@/components/ui/input"
import { SectionLabel } from "@/components/ui/section-label"
import { Stat } from "@/components/ui/stat"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Reveal, RevealGroup, RevealItem } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { AppPatterns } from "./showcase/app-patterns"
import { Gallery } from "./showcase/gallery"
import { CodeBlock, CopyButton, Logo, useCopy } from "./showcase/shared"

const NAV = [
  ["Foundations", "#foundations"],
  ["Components", "#components"],
  ["App Patterns", "#app-patterns"],
  ["Landing", "#patterns"],
  ["For AI Agents", "#agents"],
] as const

/* ------------------------------------------------------------------ Navbar */
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
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <a href="#top" aria-label="AiYO Design System home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="./DESIGN.md">
              DESIGN.md
            </a>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </Button>
      </Container>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col py-3">
            {NAV.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                {label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  )
}

/* -------------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-16 pt-28 md:pb-32 md:pt-44">
      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <RevealGroup className="flex flex-col items-start gap-8">
          <RevealItem>
            <SectionLabel>AiYO Design System · v1.0</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]">
              Every AiYO product, one confident <GradientText underline>voice</GradientText>
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Tokens, React components and patterns for building AiYO interfaces, written so both your team and your AI agents can follow them.
            </p>
          </RevealItem>
          <RevealItem className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <a href="#components">
                Browse components <ArrowRight data-arrow />
              </a>
            </Button>
            <Button asChild size="xl" variant="secondary" className="w-full sm:w-auto">
              <a href="#agents">
                <Bot /> Use with AI agents
              </a>
            </Button>
          </RevealItem>
          <RevealItem className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-sm text-muted-foreground">
            {["React 19 + Tailwind v4", "shadcn/ui compatible", "AA text contrast"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" /> {t}
              </span>
            ))}
          </RevealItem>
        </RevealGroup>
        <Reveal className="hidden lg:block" transition={{ delay: 0.3 }}>
          <HeroGraphic />
        </Reveal>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------------- Principles */
const PRINCIPLES = [
  {
    icon: Layers,
    title: "Clarity through structure",
    body: "Generous whitespace directs attention. Every element on screen has earned its place, and the ones that remain are executed with confidence.",
  },
  { icon: Palette, title: "One electric accent", body: "Colour is concentrated into the Electric Blue gradient, so wherever it appears, the eye follows." },
  { icon: MousePointerClick, title: "Motion answers the user", body: "Content eases in once as you scroll, and controls respond to hover and press. Nothing moves on a loop." },
  { icon: Columns2, title: "Asymmetry on purpose", body: "1.1fr / 0.9fr heroes, offset cards, elevated tiers. Break the grid deliberately to guide the eye." },
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
                Minimalism that makes a <GradientText>statement</GradientText>
              </>
            }
            description="Restraint in quantity, confidence in execution. Four rules decide every design call."
          />
        </Reveal>
        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <RevealItem key={p.title} className={cn(i === 0 && "lg:col-span-2 lg:row-span-1")}>
              <Card variant="interactive" className={cn("h-full", i === 0 && "lg:flex-row lg:items-center")}>
                <CardHeader className="gap-4">
                  <IconTile size={i === 0 ? "lg" : "md"}>
                    <p.icon />
                  </IconTile>
                  <CardTitle className={cn(i === 0 && "md:text-2xl")}>{p.title}</CardTitle>
                  <CardDescription className="text-base">{p.body}</CardDescription>
                </CardHeader>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------------- Foundations */
const COLORS = [
  { name: "primary", hex: "#0052FF", note: "Electric Blue. CTAs, links, focus" },
  { name: "primary-end", hex: "#3366FF", note: "Gradient endpoint" },
  { name: "foreground", hex: "#0F172A", note: "Text, inverted sections" },
  { name: "background", hex: "#FAFAFA", note: "Canvas" },
  { name: "card", hex: "#FFFFFF", note: "Elevated surfaces" },
  { name: "muted", hex: "#F1F5F9", note: "Fills, hover surface" },
  { name: "muted-foreground", hex: "#5B6B80", note: "Secondary text" },
  { name: "border", hex: "#E2E8F0", note: "Hairlines" },
]
const STATUS = [
  { name: "success", hex: "#059669" },
  { name: "warning", hex: "#D97706" },
  { name: "destructive", hex: "#DC2626" },
  { name: "info", hex: "#0052FF" },
]

function Swatch({ name, hex, note }: { name: string; hex: string; note?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:focus-ring"
    >
      <span className="h-24 w-full border-b border-border" style={{ background: hex }} />
      <span className="flex flex-col gap-1 p-4">
        <span className="font-mono text-xs text-foreground">{name}</span>
        <span className="font-mono text-xs uppercase text-muted-foreground">{copied ? "Copied!" : hex}</span>
        {note && <span className="mt-1 text-xs leading-snug text-muted-foreground">{note}</span>}
      </span>
    </button>
  )
}

function Foundations() {
  return (
    <Section id="foundations" className="border-t border-border">
      <Container className="flex flex-col gap-24">
        <Reveal>
          <SectionHeader
            label="Foundations"
            title={
              <>
                Tokens are the <GradientText>DNA</GradientText>
              </>
            }
            description="A warm, near-monochrome palette amplified by one dual-tone gradient. Click any swatch to copy its value."
          />
        </Reveal>

        {/* Colour */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {COLORS.map((c) => (
              <RevealItem key={c.name}>
                <Swatch {...c} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-col gap-4">
            <div className="relative flex min-h-56 flex-1 flex-col justify-end overflow-hidden rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl bg-gradient-primary-diagonal p-8 text-primary-foreground shadow-accent-lg">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white">The signature gradient</span>
              <span className="mt-2 font-display text-3xl">#0052FF → #3366FF</span>
              <code className="mt-3 font-mono text-xs text-white">bg-gradient-primary · text-gradient</code>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {STATUS.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
                  <span className="size-8 rounded-full" style={{ background: s.hex }} />
                  <span className="font-mono text-[10px] text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Type */}
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold tracking-[-0.01em]">Typography</h3>
            <p className="leading-relaxed text-muted-foreground">
              A conversation between personality and precision: Calistoga speaks the headlines, Inter does the work, and JetBrains Mono adds the
              technical accent.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className="font-display text-sm">Calistoga</Badge>
              <Badge variant="outline" className="text-sm">Inter 400–700</Badge>
              <Badge variant="outline" className="font-mono text-sm">JetBrains Mono</Badge>
            </div>
          </div>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-md">
            {[
              ["Hero · Calistoga · 84px", <span className="font-display text-5xl leading-[1.05] tracking-[-0.02em] md:text-7xl">Bold & calm</span>],
              ["Section · Calistoga · 52px", <span className="font-display text-4xl leading-[1.15] md:text-[3.25rem]">Built to be trusted</span>],
              ["Card title · Inter 600 · 20px", <span className="text-xl font-semibold tracking-[-0.01em]">Instant settlement for every merchant</span>],
              ["Body · Inter 400 · 18px", <span className="text-lg leading-relaxed text-muted-foreground">Relaxed 1.7 line height keeps long copy calm and readable.</span>],
              ["Label · JetBrains Mono · 12px", <span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">Section label</span>],
            ].map(([meta, sample], i) => (
              <div key={i} className="flex flex-col gap-2 p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{meta}</span>
                {sample}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Shadow, radius, motion */}
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/50 p-6">
            <h3 className="font-semibold">Shadows</h3>
            <div className="grid grid-cols-3 gap-4">
              {["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-accent", "shadow-accent-lg"].map((s) => (
                <div key={s} className="flex flex-col items-center gap-2">
                  <span className={cn("size-14 rounded-xl bg-card", s)} />
                  <span className="text-center font-mono text-[10px] text-muted-foreground">{s.replace("shadow-", "")}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/50 p-6">
            <h3 className="font-semibold">Radius</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["md", "rounded-md", "8"],
                ["xl", "rounded-xl", "12"],
                ["2xl", "rounded-2xl", "16"],
                ["3xl", "rounded-3xl", "24"],
                ["full", "rounded-full", "∞"],
                ["organic", "rounded-tl-[2rem] rounded-br-[2rem] rounded-md", "4rem"],
              ].map(([n, c, px]) => (
                <div key={n} className="flex flex-col items-center gap-2">
                  <span className={cn("size-14 border-2 border-primary/40 bg-primary/10", c)} />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {n} · {px}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/50 p-6">
            <h3 className="font-semibold">Motion</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 animate-fade-in-up rounded-xl bg-gradient-primary-diagonal" />
                <span className="font-mono text-[10px] text-muted-foreground">enter 700ms</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 cursor-pointer rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" />
                <span className="font-mono text-[10px] text-muted-foreground">hover lift</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="size-14 cursor-pointer rounded-xl bg-primary transition-transform duration-200 active:scale-[0.92]" />
                <span className="font-mono text-[10px] text-muted-foreground">press 0.98</span>
              </div>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">ease [0.16, 1, 0.3, 1] · enter once, 700ms · hover 200 to 300ms · no loops</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/* ------------------------------------------------------- Inverted stats */
function Stats() {
  return (
    <Section inverted spacing="sm">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-border">
          {[
            { label: "Components", value: "30+", hint: "Radix-based, typed" },
            { label: "Accent colour", value: "1", hint: "Electric Blue gradient" },
            { label: "Typefaces", value: "3", hint: "Display · UI · Mono" },
            { label: "Text contrast", value: "AA", hint: "Every token pair checked, 4.5 : 1 or more" },
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

/* ---------------------------------------------------------------- Patterns */
function Patterns() {
  const [plan, setPlan] = React.useState<string | null>(null)
  return (
    <Section id="patterns" className="border-t border-border">
      <Container className="flex flex-col gap-28">
        <Reveal>
          <SectionHeader
            label="Landing Patterns"
            title={
              <>
                Blocks that compose into <GradientText>pages</GradientText>
              </>
            }
            description="Ready-made sections for landing and product pages: timeline, pricing, testimonials, inverted CTA. Content below is sample copy."
          />
        </Reveal>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Steps" file="blocks/steps.tsx" />
          <Reveal>
            <Steps
              steps={[
                { title: "Copy the tokens", description: "Drop aiyo.css into your Tailwind v4 project and import it once." },
                { title: "Add components", description: "Copy what you need from components/ui. Same API as shadcn/ui." },
                { title: "Brief your agent", description: "Point Claude or Cursor at AGENTS.md so generated UI follows the rules." },
                { title: "Ship with confidence", description: "Every AiYO product now looks, moves and reads the same." },
              ]}
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Pricing" file="blocks/pricing-card.tsx" />
          <RevealGroup className="grid items-stretch gap-6 pt-4 md:grid-cols-3">
            <RevealItem>
              <PricingCard selected={plan === "Starter"} onSelect={() => setPlan("Starter")} name="Starter" price="Rp 0" period="/bulan" description="For trying things out." features={["1 outlet", "QRIS payments", "Email support"]} cta="Start free" />
            </RevealItem>
            <RevealItem>
              <PricingCard
                highlighted
                selected={plan === "Growth"}
                onSelect={() => setPlan("Growth")}
                name="Growth"
                price="Rp 249rb"
                period="/bulan"
                description="For growing merchants."
                features={["Up to 10 outlets", "All payment methods", "Daily settlement", "Priority support"]}
                cta="Choose Growth"
              />
            </RevealItem>
            <RevealItem>
              <PricingCard selected={plan === "Enterprise"} onSelect={() => setPlan("Enterprise")} name="Enterprise" price="Custom" description="For chains and platforms." features={["Unlimited outlets", "Dedicated manager", "Custom SLA"]} cta="Contact sales" />
            </RevealItem>
          </RevealGroup>
        </div>

        <div className="flex flex-col gap-10">
          <PatternTitle name="Testimonials" file="blocks/testimonial-card.tsx" />
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            <RevealItem>
              <TestimonialCard quote="We rebuilt our admin in a week. It finally looks like one product." name="Frontend Lead" role="Sample quote · Bills team" />
            </RevealItem>
            <RevealItem className="md:translate-y-10">
              <TestimonialCard quote="My agent now ships screens that pass design review on the first try." name="Product Engineer" role="Sample quote · POS team" />
            </RevealItem>
            <RevealItem>
              <TestimonialCard quote="One accent colour sounded limiting. It turned out to be freeing." name="Product Designer" role="Sample quote · Design" />
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  )
}

function PatternTitle({ name, file }: { name: string; file: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
      <h3 className="text-2xl font-semibold tracking-[-0.01em]">{name}</h3>
      <code className="font-mono text-xs text-muted-foreground">components/{file}</code>
    </div>
  )
}

/* -------------------------------------------------------------- AI agents */
const AGENT_FILES = [
  { icon: FileText, name: "DESIGN.md", href: "./DESIGN.md", body: "The complete spec: tokens, components, patterns and do/don't rules in one Markdown file." },
  { icon: Bot, name: "AGENTS.md", href: "./AGENTS.md", body: "Short hard rules plus install steps. Paste the snippet into your project's CLAUDE.md or AGENTS.md." },
  { icon: Terminal, name: "llms.txt", href: "./llms.txt", body: "The llms.txt index, so any agent with web access can discover the docs from this site." },
  { icon: Braces, name: "aiyo.tokens.json", href: "./aiyo.tokens.json", body: "Tokens in the W3C DTCG format, for Figma plugins, Style Dictionary and code generators." },
  { icon: Package, name: "Claude skill", href: "./SKILL.md", body: "Drop skills/aiyo-design into .claude/skills and Claude Code applies the system automatically." },
  { icon: Palette, name: "aiyo.css", href: "#foundations", body: "The source of truth. Tailwind v4 theme plus CSS variables any stack can read." },
]

const AGENT_PROMPT = `Build this UI with the AiYO Design System.
Read DESIGN.md and AGENTS.md first, and follow them exactly:
- tokens from aiyo.css only (primary = Electric Blue gradient)
- components from @/components/ui (shadcn-style)
- Calistoga for h1/h2, Inter for UI, JetBrains Mono for labels
- every section opens with SectionLabel + display headline`

function Agents() {
  return (
    <Section id="agents" className="border-t border-border">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] [&>*]:min-w-0">
        <Reveal className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            label="For AI Agents"
            title={
              <>
                Docs your agent can <GradientText>actually read</GradientText>
              </>
            }
            description="Markdown is the format every coding agent understands best. The same rules ship in four shapes: full spec, short rules, an llms.txt index and a Claude skill."
          />
          <CodeBlock label="prompt" code={AGENT_PROMPT} />
        </Reveal>
        <RevealGroup className="grid gap-5 sm:grid-cols-2">
          {AGENT_FILES.map((f) => (
            <RevealItem key={f.name}>
              <a href={f.href} className="block h-full rounded-2xl focus-visible:focus-ring">
                <Card variant="interactive" className="h-full">
                  <CardHeader className="gap-4">
                    <IconTile size="sm">
                      <f.icon />
                    </IconTile>
                    <CardTitle className="font-mono text-base md:text-base">{f.name}</CardTitle>
                    <CardDescription>{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}

/* ---------------------------------------------------------------- Final CTA */
function FinalCta() {
  const install = "npm i radix-ui class-variance-authority clsx tailwind-merge lucide-react motion"
  return (
    <Section inverted spacing="lg">
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <SectionLabel>Get started</SectionLabel>
          <h2 className="font-display text-[2.5rem] leading-[1.1] tracking-[-0.02em] md:text-6xl">
            Start building the <GradientText>AiYO way</GradientText>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Install the peer dependencies, copy aiyo.css and the components you need, then let your team and your agents build.
          </p>
          <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Input readOnly value={install} aria-label="Install command" className="pr-12 font-mono text-xs md:text-xs" />
              <CopyButton value={install} className="absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
            <Button asChild size="lg" className="h-12 w-full sm:w-auto">
              <a href="./README.md">
                Read the guide
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <Logo />
        <span>© {new Date().getFullYear()} AiYO · Minimalist Modern, v1.0</span>
      </Container>
    </footer>
  )
}

export default function App() {
  return (
    <TooltipProvider>
      <a
        href="#components"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg"
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
        <Patterns />
        <Agents />
        <FinalCta />
      </main>
      <Footer />
    </TooltipProvider>
  )
}
