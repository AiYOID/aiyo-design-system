import * as React from "react"
import { cn } from "@heroui/react"

type GradientTextProps = React.ComponentProps<"span"> & {
  /** Draws a soft accent bar under the word. Reserve it for the hero headline. */
  underline?: boolean
}

/** Paints one key headline word with the Electric Blue gradient. One per headline. */
function GradientText({ className, underline = false, children, ...props }: GradientTextProps) {
  return (
    <span data-slot="gradient-text" className={cn("relative inline-block", className)} {...props}>
      <span className="text-gradient relative z-10">{children}</span>
      {underline && <span aria-hidden className="absolute -bottom-1 left-0 h-3 w-full rounded-sm bg-accent-soft md:-bottom-1.5 md:h-4" />}
    </span>
  )
}

export { GradientText }
