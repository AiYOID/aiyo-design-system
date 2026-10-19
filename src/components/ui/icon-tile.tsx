import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        gradient: "bg-gradient-primary-diagonal text-primary-foreground shadow-accent",
        soft: "bg-primary/10 text-primary",
        muted: "bg-muted text-foreground",
      },
      size: {
        sm: "size-9 rounded-lg [&_svg]:size-4",
        md: "size-12 rounded-xl [&_svg]:size-5",
        lg: "size-14 rounded-2xl [&_svg]:size-6",
      },
    },
    defaultVariants: { variant: "gradient", size: "md" },
  },
)

/** Square icon container. Gradient by default: the spec prefers full gradients over translucent fills. */
function IconTile({ className, variant, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof iconTileVariants>) {
  return <div data-slot="icon-tile" className={cn(iconTileVariants({ variant, size }), className)} {...props} />
}

export { IconTile, iconTileVariants }
