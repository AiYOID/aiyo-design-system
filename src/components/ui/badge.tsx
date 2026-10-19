import * as React from "react"
import { Slot } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-medium transition-colors [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-muted text-foreground",
        primary: "border-transparent bg-gradient-primary text-primary-foreground shadow-accent",
        soft: "border-primary/20 bg-primary/5 text-primary",
        outline: "border-border bg-transparent text-foreground",
        success: "border-success/20 bg-success/10 text-success-text",
        warning: "border-warning/25 bg-warning/10 text-warning-text",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive-text",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

export { Badge, badgeVariants }
