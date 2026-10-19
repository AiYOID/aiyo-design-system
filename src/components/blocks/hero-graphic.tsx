import * as React from "react"
import { Check, TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Abstract, slowly breathing composition for hero sections: rotating dashed rings,
 * two bobbing cards, a 3×3 dot grid and a solid corner block. Decorative only; hide below `lg`.
 */
function HeroGraphic({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div aria-hidden className={cn("relative mx-auto aspect-square w-full max-w-[520px] select-none", className)} {...props}>
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(0_82_255/0.08),transparent_70%)]" />
      <div className="absolute inset-[4%] animate-spin-slow rounded-full border-2 border-dashed border-primary/20" />
      <div className="absolute inset-[18%] animate-[spin_90s_linear_infinite_reverse] rounded-full border border-dashed border-foreground/10" />

      <div className="absolute right-[6%] top-[8%] size-16 rounded-2xl bg-primary shadow-accent-lg" />
      <div className="absolute bottom-[14%] left-[10%] size-20 animate-breathe rounded-full bg-gradient-primary-diagonal opacity-90 shadow-accent-lg" />

      <div className="absolute left-[8%] top-[14%] grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="size-1.5 rounded-full bg-primary/40" />
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Revenue</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
            <TrendingUp className="size-3" /> 24%
          </span>
        </div>
        <div className="mt-2 font-display text-3xl tracking-[-0.02em]">Rp 84,2jt</div>
        <div className="mt-4 flex h-20 items-end gap-1.5">
          {[38, 52, 44, 68, 58, 80, 100].map((h, i) => (
            <span
              key={i}
              className={cn("flex-1 rounded-md", i === 6 ? "bg-gradient-primary shadow-accent" : "bg-primary/15")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[2%] top-[30%] animate-float">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary-diagonal text-primary-foreground shadow-accent">
            <Zap className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-xs font-semibold">Deploy ready</div>
            <div className="text-[11px] text-muted-foreground">30+ components</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[12%] right-[2%] animate-float-delayed">
        <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-success" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-semibold">All checks passed</span>
          <Check className="size-3.5 text-success" />
        </div>
      </div>
    </div>
  )
}

export { HeroGraphic }
