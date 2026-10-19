import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/ui/section-label"

/** max-w-6xl content column with responsive side gutters. */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="container" className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />
}

const sectionVariants = cva("relative isolate", {
  variants: {
    spacing: {
      default: "py-24 md:py-32",
      lg: "py-28 md:py-44",
      sm: "py-16 md:py-20",
    },
  },
  defaultVariants: { spacing: "default" },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Flip to the solid deep slate palette for the one section that deserves the spotlight. */
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

/** Mono label, Calistoga headline, muted lede: the opening of a major marketing section. */
function SectionHeader({ className, label, title, description, align = "left", ...props }: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex max-w-3xl flex-col items-start gap-5", align === "center" && "mx-auto items-center text-center", className)}
      {...props}
    >
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="font-display text-[2.25rem] leading-[1.15] tracking-[-0.01em] md:text-[3.25rem]">{title}</h2>
      {description && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  )
}

export { Container, Section, SectionHeader, sectionVariants }
