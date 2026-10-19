import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type StatProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** e.g. "+12.4%". Positive values get the gradient trend badge. */
  trend?: string
  trendDirection?: "up" | "down"
  hint?: React.ReactNode
}

/** A key metric: big display-font number, mono label, optional trend badge. */
function Stat({ className, label, value, trend, trendDirection = "up", hint, ...props }: StatProps) {
  const TrendIcon = trendDirection === "up" ? TrendingUp : TrendingDown
  return (
    <div data-slot="stat" className={cn("flex flex-col gap-3", className)} {...props}>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-4xl leading-none tracking-[-0.02em] md:text-5xl">{value}</span>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              trendDirection === "up"
                ? "bg-gradient-primary text-primary-foreground shadow-accent"
                : "bg-destructive/10 text-destructive-text",
            )}
          >
            <TrendIcon className="size-3.5" />
            {trend}
          </span>
        )}
      </div>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  )
}

export { Stat }
