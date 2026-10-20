import * as React from "react"
import { cn, tv, type VariantProps } from "@heroui/react"
import { SectionLabel } from "./section-label"

/** max-w-6xl content column with responsive side gutters. */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="container" className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />
}

const sectionVariants = tv({
  base: "relative isolate",
  variants: {
    spacing: {
      default: "py-16 md:py-32",
      lg: "py-20 md:py-44",
      sm: "py-12 md:py-20",
    },
  },
  defaultVariants: { spacing: "default" },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Flip this section to the solid deep-slate palette. HeroUI components inside re-theme too. */
    inverted?: boolean
  }

function Section({ className, spacing, inverted = false, ...props }: SectionProps) {
  return <section data-slot="section" className={cn(sectionVariants({ spacing }), inverted && "inverted", className)} {...props} />
}

type SectionHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  label?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
}

/** Mono label, Geist headline, muted lede: the opening of every major marketing section. */
function SectionHeader({ className, label, title, description, align = "left", ...props }: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex max-w-3xl flex-col items-start gap-5", align === "center" && "mx-auto items-center text-center", className)}
      {...props}
    >
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="heading-section">{title}</h2>
      {description && <p className="max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  )
}

export { Container, Section, SectionHeader, sectionVariants }
