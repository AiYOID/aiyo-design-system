import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/ui/section-label"

/** max-w-6xl content column with responsive side gutters. */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="container" className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)} {...props} />
}

/** Large, blurred circle of primary colour that warms a corner of a section. */
function Glow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute size-[480px] rounded-full bg-primary opacity-[0.06] blur-[150px]", className)}
      {...props}
    />
  )
}

const sectionVariants = cva("relative isolate overflow-hidden", {
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
    /** Flip to the deep slate palette, with dot texture and corner glows. */
    inverted?: boolean
  }

function Section({ className, spacing, inverted = false, children, ...props }: SectionProps) {
  return (
    <section data-slot="section" className={cn(sectionVariants({ spacing }), inverted && "inverted", className)} {...props}>
      {inverted && (
        <>
          <div aria-hidden className="texture-dots pointer-events-none absolute inset-0 -z-10" />
          <Glow className="-left-40 -top-40 -z-10 opacity-[0.18]" />
          <Glow className="-bottom-48 -right-40 -z-10 opacity-[0.12]" />
        </>
      )}
      {children}
    </section>
  )
}

type SectionHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  label?: React.ReactNode
  pulse?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
}

/** Label pill, Calistoga headline, muted lede: the opening of every major section. */
function SectionHeader({ className, label, pulse, title, description, align = "left", ...props }: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn("flex max-w-3xl flex-col items-start gap-6", align === "center" && "mx-auto items-center text-center", className)}
      {...props}
    >
      {label && <SectionLabel pulse={pulse}>{label}</SectionLabel>}
      <h2 className="font-display text-[2.25rem] leading-[1.15] tracking-[-0.01em] md:text-[3.25rem]">{title}</h2>
      {description && <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  )
}

export { Container, Glow, Section, SectionHeader, sectionVariants }
