import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/lib/motion"

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = React.useState(false)
  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), timeout)
      } catch {
        /* clipboard blocked: ignore */
      }
    },
    [timeout],
  )
  return { copied, copy }
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:focus-ring",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
    </button>
  )
}

/** Always-dark code block (deep slate), with a copy button. */
export function CodeBlock({ code, label, className }: { code: string; label?: string; className?: string }) {
  return (
    <div className={cn("relative min-w-0 max-w-full overflow-hidden rounded-xl bg-slate-900 text-slate-100 shadow-lg", className)}>
      <div className="flex items-center justify-between border-b border-white/10 py-1.5 pl-4 pr-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-400">{label ?? "tsx"}</span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

/** One component entry in the gallery: title, blurb, live preview and code. */
export function Demo({
  id,
  title,
  description,
  code,
  children,
  previewClassName,
  sample = false,
}: {
  id: string
  title: string
  description: string
  code: string
  children: React.ReactNode
  previewClassName?: string
  /** Shows a "Sample data" tag: the values in this preview are placeholders. */
  sample?: boolean
}) {
  const [last, setLast] = React.useState<string | null>(null)
  // Specimen controls have no app behind them, so the preview reports what was used instead.
  const record = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("button, a, [role=switch], [role=checkbox], [role=radio]")
    if (el) setLast(el.getAttribute("aria-label") || el.closest("label")?.textContent?.trim() || el.textContent?.trim() || "control")
  }
  return (
    <Reveal id={id} className="scroll-mt-28">
      <div className="mb-5 flex flex-col gap-1.5">
        <h3 className="text-xl font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm" onClickCapture={record}>
            {sample && (
              <span className="absolute right-3 top-3 z-10 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">Sample data</span>
            )}
            <div className={cn("relative flex min-h-48 flex-wrap items-center justify-center gap-4 p-6 md:p-10", previewClassName)}>
              {children}
            </div>
            <p aria-live="polite" className="min-h-9 border-t border-border px-4 py-2 text-xs text-muted-foreground">
              {last ? (
                <>
                  Last action: <span className="font-medium text-foreground">{last}</span>
                </>
              ) : (
                "Try the controls above."
              )}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={code} />
        </TabsContent>
      </Tabs>
    </Reveal>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-primary-diagonal font-display text-lg leading-none text-primary-foreground shadow-accent">
        a
      </span>
      <span className="font-display text-xl leading-none tracking-[-0.01em]">
        AiYO <span className="text-gradient">Design System</span>
      </span>
    </span>
  )
}
