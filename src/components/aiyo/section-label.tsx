import * as React from "react"
import { cn } from "@heroui/react"

/**
 * Small mono label above a section headline: the system's typographic motif.
 * Plain text on purpose (no pill, no dot): it names the section, it marks no state.
 */
function SectionLabel({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="section-label" className={cn("label-caps text-accent", className)} {...props} />
}

export { SectionLabel }
