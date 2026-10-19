import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/** Card-like notice with a 3px colour bar on the left, echoing the testimonial accent bar. */
const alertVariants = cva(
  [
    "relative grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 overflow-hidden rounded-xl border border-border bg-card py-4 pl-5 pr-4 text-sm shadow-sm",
    "before:absolute before:inset-y-0 before:left-0 before:w-[3px]",
    "[&>svg]:mt-0.5 [&>svg]:size-4 [&>svg]:shrink-0",
    "[&:not(:has(>svg))]:grid-cols-1",
  ],
  {
    variants: {
      variant: {
        info: "before:bg-gradient-primary [&>svg]:text-primary",
        success: "before:bg-success [&>svg]:text-success",
        warning: "before:bg-warning [&>svg]:text-warning",
        destructive: "before:bg-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "info" },
  },
)

function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("col-start-2 font-semibold leading-snug [&:only-child]:col-start-1", className)} {...props} />
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("col-start-2 leading-relaxed text-muted-foreground in-[[data-slot=alert]:not(:has(>svg))]:col-start-1", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
