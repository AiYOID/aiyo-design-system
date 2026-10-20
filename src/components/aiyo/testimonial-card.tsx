import * as React from "react"
import { Avatar, Card, cn } from "@heroui/react"

type TestimonialCardProps = {
  quote: React.ReactNode
  name: string
  role: string
  className?: string
}

/** A real customer's words. Initials avatar unless an approved photo exists. */
function TestimonialCard({ quote, name, role, className }: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
  return (
    <Card className={cn("h-full p-6 md:p-8", className)}>
      <figure className="flex h-full flex-col gap-8">
        <blockquote className="text-base leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
        <figcaption className="mt-auto flex items-center gap-3">
          <Avatar size="sm" color="accent" variant="soft">
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-xs text-muted">{role}</span>
          </span>
        </figcaption>
      </figure>
    </Card>
  )
}

export { TestimonialCard }
