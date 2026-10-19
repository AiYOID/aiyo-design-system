import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("group relative flex flex-col rounded-2xl bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "border border-border shadow-md",
      elevated: "border border-border shadow-xl",
      flat: "border border-border",
      interactive: [
        "border border-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        // a faint primary wash fades in on hover
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-br before:from-primary/[0.04] before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
      ],
    },
  },
  defaultVariants: { variant: "default" },
})

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    /** Wrap the card in the 2px signature gradient stroke (pricing highlight, featured items). */
    featured?: boolean
  }

function Card({ className, variant, featured = false, ...props }: CardProps) {
  const card = (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), featured && "h-full rounded-[14px] border-0 shadow-none", className)}
      {...props}
    />
  )
  if (!featured) return card
  return (
    <div
      data-slot="card-featured"
      className="rounded-2xl bg-linear-to-br from-primary via-primary-end to-primary p-[2px] shadow-accent-lg"
    >
      {card}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-2 p-6 md:p-8", className)} {...props} />
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-snug tracking-[-0.01em] md:text-xl", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6 pb-6 md:px-8 md:pb-8", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-auto flex items-center gap-3 border-t border-border px-6 py-4 md:px-8", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
