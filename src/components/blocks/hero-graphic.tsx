import * as React from "react"
import { Check, Package, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Static hero composition: a product card with two overlapping status cards and one
 * solid accent block, layered for depth. Decorative only; hide it below `lg`.
 * Replace the sample numbers with real product data before using it in a product.
 */
function HeroGraphic({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div aria-hidden className={cn("relative mx-auto aspect-square w-full max-w-[520px] select-none", className)} {...props}>
      <div className="absolute right-[8%] top-[10%] size-16 rounded-2xl bg-primary shadow-accent-lg" />
      <div className="absolute bottom-[12%] left-[8%] size-24 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl bg-gradient-primary-diagonal" />

      <div className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Revenue · sample</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            <TrendingUp className="size-3" /> 24%
          </span>
        </div>
        <div className="mt-2 font-display text-3xl tracking-[-0.02em]">Rp 84,2jt</div>
        <div className="mt-4 flex h-20 items-end gap-1.5">
          {[38, 52, 44, 68, 58, 80, 100].map((h, i) => (
            <span key={i} className={cn("flex-1 rounded-md", i === 6 ? "bg-gradient-primary" : "bg-primary/15")} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="absolute left-[2%] top-[26%] flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
        <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary-diagonal text-primary-foreground">
          <Package className="size-4" />
        </span>
        <div className="leading-tight">
          <div className="text-xs font-semibold">Components</div>
          <div className="text-[11px] text-muted-foreground">30+ in the library</div>
        </div>
      </div>

      <div className="absolute bottom-[22%] right-[2%] flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
        <Check className="size-4 text-success" />
        <span className="text-xs font-semibold">Build passed</span>
      </div>
    </div>
  )
}

export { HeroGraphic }
