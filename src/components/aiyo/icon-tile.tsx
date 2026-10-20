import * as React from "react"
import { tv, type VariantProps } from "@heroui/react"

const iconTileVariants = tv({
  base: "inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0",
  variants: {
    variant: {
      /** The gradient tile marks the one item that leads; use it once per group. */
      gradient: "bg-gradient-accent-diagonal text-accent-foreground",
      soft: "bg-accent-soft text-accent-soft-foreground",
      default: "bg-default text-default-foreground",
    },
    size: {
      sm: "size-9 rounded-xl [&_svg]:size-4",
      md: "size-12 rounded-2xl [&_svg]:size-5",
      lg: "size-14 rounded-2xl [&_svg]:size-6",
    },
  },
  defaultVariants: { variant: "soft", size: "md" },
})

/** Square icon container for feature lists, empty states and settings rows. */
function IconTile({ className, variant, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof iconTileVariants>) {
  return <div data-slot="icon-tile" aria-hidden className={iconTileVariants({ variant, size, className })} {...props} />
}

export { IconTile, iconTileVariants }
