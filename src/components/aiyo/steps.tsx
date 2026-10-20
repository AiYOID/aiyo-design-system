import * as React from "react"
import { cn } from "@heroui/react"

type Step = { title: React.ReactNode; description: React.ReactNode }

/**
 * "How it works" sequence: a mono step number on a hairline. Stacked on mobile,
 * one row on md+. Give it as many steps as the real process has.
 */
function Steps({ steps, className, ...props }: React.ComponentProps<"ol"> & { steps: Step[] }) {
  return (
    <ol data-slot="steps" className={cn("grid gap-8 md:grid-flow-col md:auto-cols-fr md:gap-8", className)} {...props}>
      {steps.map((step, i) => (
        <li key={i} className="flex flex-col gap-3 border-t border-separator pt-6">
          <span className="font-mono text-sm tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-lg font-semibold tracking-[-0.02em]">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}

export { Steps, type Step }
