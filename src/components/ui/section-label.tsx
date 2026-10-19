import * as React from "react"
import { cn } from "@/lib/utils"

type SectionLabelProps = React.ComponentProps<"div"> & {
  /** Animate the dot to signal something live or new. */
  pulse?: boolean
}

/**
 * The pill that opens every major section: accent dot + uppercase mono text.
 * Place it directly above the section headline.
 */
function SectionLabel({ className, pulse = false, children, ...props }: SectionLabelProps) {
  return (
    <div
      data-slot="section-label"
      className={cn("inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-5 py-2", className)}
      {...props}
    >
      <span className="relative flex size-2">
        {pulse && <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-primary" />}
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-xs uppercase leading-none tracking-[0.15em] text-primary">{children}</span>
    </div>
  )
}

export { SectionLabel }
