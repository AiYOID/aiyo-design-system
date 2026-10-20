import * as React from "react"
import { Check, Copy } from "@gravity-ui/icons"
import { Button, Tabs, cn } from "@heroui/react"
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
        // Clipboard blocked (insecure origin or denied permission): nothing to report.
      }
    },
    [timeout],
  )
  return { copied, copy }
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const { copied, copy } = useCopy()
  return (
    <Button isIconOnly size="sm" variant="ghost" aria-label={copied ? "Copied" : "Copy to clipboard"} className={className} onPress={() => copy(value)}>
      {copied ? <Check aria-hidden className="text-success" /> : <Copy aria-hidden />}
    </Button>
  )
}

/** Code sample on the deep-slate palette in both themes, with a copy button. */
export function CodeBlock({ code, label, className, wrap = false }: { code: string; label?: string; className?: string; wrap?: boolean }) {
  return (
    <div className={cn("inverted relative max-w-full min-w-0 overflow-hidden rounded-2xl border border-border", className)}>
      <div className="flex items-center justify-between border-b border-separator py-1.5 pr-1.5 pl-4">
        <span className="label-caps text-muted">{label ?? "tsx"}</span>
        <CopyButton value={code} />
      </div>
      <pre className={cn("overflow-x-auto p-4 font-mono text-[13px] leading-relaxed", wrap && "whitespace-pre-wrap")}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}

/** One entry in the component gallery: title, blurb, live preview and code. */
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
  description: React.ReactNode
  code: string
  children: React.ReactNode
  previewClassName?: string
  /** Shows a "Sample data" tag: the values in this preview are placeholders. */
  sample?: boolean
}) {
  const [last, setLast] = React.useState<string | null>(null)
  // Specimen controls have no app behind them, so the preview reports what was used instead.
  const record = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("button, a, [role=switch], [role=checkbox], [role=radio], label")
    if (el) setLast(el.getAttribute("aria-label") || el.textContent?.trim() || "control")
  }
  return (
    <Reveal id={id} className="scroll-mt-28">
      <div className="mb-5 flex flex-col gap-1.5">
        <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      </div>
      <Tabs defaultSelectedKey="preview" align="start">
        <Tabs.ListContainer className="w-fit">
          <Tabs.List aria-label={`${title} preview or code`}>
            <Tabs.Tab id="preview">
              Preview
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="code">
              Code
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="preview" className="px-0 pb-0">
          <div className="relative overflow-hidden rounded-3xl bg-surface shadow-surface" onClickCapture={record}>
            {sample && <span className="absolute top-3 right-3 z-10 rounded-lg bg-default px-2 py-1 text-xs text-muted">Sample data</span>}
            <div className={cn("relative flex min-h-48 flex-wrap items-center justify-center gap-4 p-6 md:p-10", previewClassName)}>{children}</div>
            <p aria-live="polite" className="min-h-9 border-t border-separator px-4 py-2 text-xs text-muted">
              {last ? (
                <>
                  Last action: <span className="font-medium text-foreground">{last}</span>
                </>
              ) : (
                "Try the controls above."
              )}
            </p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="code" className="px-0 pb-0">
          <CodeBlock code={code} />
        </Tabs.Panel>
      </Tabs>
    </Reveal>
  )
}

/** Text-only wordmark. No symbol until there is an approved AiYO logo file (R-23). */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("text-lg leading-none font-semibold tracking-[-0.03em]", className)}>
      AiYO <span className="text-muted">Design System</span>
    </span>
  )
}
