import * as React from "react"
import { CircleCheck, Layers } from "@gravity-ui/icons"
import { cn } from "@heroui/react"

/**
 * Static hero composition: one product card with two overlapping status cards.
 * Decorative only (aria-hidden); hide it below `lg`. The numbers are labelled sample
 * data for the showcase: replace them with real product data in a product.
 */
function HeroGraphic({ className, ...props }: React.ComponentProps<"div">) {
  const bars = [38, 52, 44, 68, 58, 80, 100]
  return (
    <div aria-hidden className={cn("relative mx-auto aspect-square w-full max-w-[520px] select-none", className)} {...props}>
      <div className="absolute top-1/2 left-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-surface p-6 shadow-overlay">
        <div className="flex items-center justify-between">
          <span className="label-caps text-muted">Revenue · sample</span>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success-soft-foreground">+24%</span>
        </div>
        <div className="mt-3 text-4xl font-semibold tracking-[-0.04em] tabular-nums">Rp 84,2jt</div>
        <div className="mt-6 flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <span key={i} className={cn("flex-1 rounded-md", i === bars.length - 1 ? "bg-gradient-accent" : "bg-accent-soft")} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="absolute top-[9%] left-[4%] flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-surface">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent-soft-foreground">
          <Layers className="size-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">HeroUI v3</span>
          <span className="text-xs text-muted">AiYO theme</span>
        </span>
      </div>

      <div className="absolute right-[2%] bottom-[18%] flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-3 shadow-surface">
        <CircleCheck className="size-4 text-success" />
        <span className="text-sm font-semibold">Build passed</span>
      </div>
    </div>
  )
}

export { HeroGraphic }
