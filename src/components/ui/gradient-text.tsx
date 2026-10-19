import * as React from "react"
import { cn } from "@/lib/utils"

type GradientTextProps = React.ComponentProps<"span"> & {
  /** Draws the soft gradient bar under the word. Reserve for the hero headline. */
  underline?: boolean
}

/** Paints a key headline word with the signature Electric Blue gradient. */
function GradientText({ className, underline = false, children, ...props }: GradientTextProps) {
  return (
    <span data-slot="gradient-text" className={cn("relative inline-block", className)} {...props}>
      <span className="text-gradient relative z-10">{children}</span>
      {underline && (
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-3 w-full rounded-sm bg-[linear-gradient(to_right,rgb(0_82_255/0.15),rgb(77_124_255/0.1))] md:-bottom-2 md:h-4"
        />
      )}
    </span>
  )
}

export { GradientText }
