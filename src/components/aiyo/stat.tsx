import * as React from "react"
import { ArrowDown, ArrowUp } from "@gravity-ui/icons"
import { Chip, cn } from "@heroui/react"

type StatProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  value: React.ReactNode
  /** e.g. "+12.4%". Only show a trend when the comparison period is real and named in `hint`. */
  trend?: string
  trendDirection?: "up" | "down"
  /** Whether the movement is good news. Defaults to up = positive. A rising refund rate is not. */
  trendTone?: "positive" | "negative"
  hint?: React.ReactNode
}

/** A key metric: mono label, large Geist numeral, optional trend chip. */
function Stat({ className, label, value, trend, trendDirection = "up", trendTone, hint, ...props }: StatProps) {
  const tone = trendTone ?? (trendDirection === "up" ? "positive" : "negative")
  const TrendIcon = trendDirection === "up" ? ArrowUp : ArrowDown
  return (
    <div data-slot="stat" className={cn("flex flex-col gap-3", className)} {...props}>
      <span className="label-caps text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-4xl leading-none font-semibold tracking-[-0.04em] tabular-nums md:text-5xl">{value}</span>
        {trend && (
          <Chip size="sm" variant="soft" color={tone === "positive" ? "success" : "danger"}>
            <TrendIcon aria-hidden className="size-3" />
            <Chip.Label>{trend}</Chip.Label>
          </Chip>
        )}
      </div>
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  )
}

export { Stat, type StatProps }
