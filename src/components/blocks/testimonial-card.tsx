import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TestimonialCardProps = React.ComponentProps<"figure"> & {
  quote: React.ReactNode
  name: string
  role: string
}

/** Quote card with a 120px gradient quote mark and a gradient accent bar. */
function TestimonialCard({ quote, name, role, className, ...props }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
  return (
    <figure
      data-slot="testimonial-card"
      className={cn("relative flex h-full flex-col gap-8 overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-md", className)}
      {...props}
    >
      <span aria-hidden className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-primary" />
      <span aria-hidden className="pointer-events-none absolute -top-6 right-6 font-display text-[120px] leading-none text-gradient opacity-20">
        &ldquo;
      </span>
      <blockquote className="relative text-base leading-relaxed">{quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export { TestimonialCard }
