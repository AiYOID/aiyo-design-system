import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Small mono label above a section headline: the system's typographic motif.
 * Plain text on purpose (no pill, no dot): it names the section, it marks no state.
 */
function SectionLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="section-label"
      className={cn("font-mono text-xs uppercase leading-none tracking-[0.15em] text-primary", className)}
      {...props}
    />
  )
}

export { SectionLabel }
