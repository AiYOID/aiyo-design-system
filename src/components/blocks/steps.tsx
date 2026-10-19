import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = { title: React.ReactNode; description: React.ReactNode }

/**
 * "How it works" timeline. Stacked on mobile; on md+ a horizontal row on a hairline,
 * joined by small gradient arrow connectors.
 */
function Steps({ steps, className, ...props }: React.ComponentProps<"ol"> & { steps: Step[] }) {
  return (
    <ol data-slot="steps" className={cn("relative grid gap-10 md:grid-flow-col md:auto-cols-fr md:gap-6", className)} {...props}>
      <span aria-hidden className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-border md:block" />
      {steps.map((step, i) => (
        <li key={i} className="relative flex gap-5 md:flex-col md:gap-6">
          <div className="relative z-10 flex items-center gap-3">
            <span className="bg-background pr-2 font-display text-4xl leading-none text-gradient">{String(i + 1).padStart(2, "0")}</span>
            {i < steps.length - 1 && (
              <span className="ml-auto hidden size-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-accent md:flex">
                <ArrowRight className="size-3.5" />
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 md:pr-6">
            <h3 className="text-lg font-semibold tracking-[-0.01em]">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Steps, type Step }
