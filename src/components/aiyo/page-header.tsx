import * as React from "react"
import { ArrowLeft } from "@gravity-ui/icons"
import { Card, Link, cn } from "@heroui/react"

type PageHeaderProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
  /** Renders "← label" above the title. Use on create, edit and detail pages. */
  back?: { href: string; label: string }
  /** Primary actions, e.g. the "Add <Thing>" button. Right-aligned on desktop, full width on mobile. */
  actions?: React.ReactNode
}

/** Top of every app page (list, create, edit, detail): one h1, muted description, actions. */
function PageHeader({ title, description, back, actions, className, ...props }: PageHeaderProps) {
  return (
    <div data-slot="page-header" className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)} {...props}>
      <div className="flex min-w-0 flex-col gap-2">
        {back && (
          <Link href={back.href} className="-my-3 min-h-11 items-center gap-1.5 text-sm font-normal text-muted hover:text-foreground">
            <ArrowLeft aria-hidden className="size-4" />
            {back.label}
          </Link>
        )}
        <h1 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{title}</h1>
        {description && <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>}
    </div>
  )
}

type FormSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
}

/** One group of fields on a full-page form: explanation left (1/3), fields in a Card right (2/3). */
function FormSection({ title, description, className, children, ...props }: FormSectionProps) {
  return (
    <section data-slot="form-section" className={cn("grid gap-5 lg:grid-cols-[1fr_2fr] lg:gap-10", className)} {...props}>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-semibold tracking-[-0.01em]">{title}</h2>
        {description && <p className="text-sm leading-relaxed text-muted">{description}</p>}
      </div>
      <Card className="p-6 md:p-8">
        <Card.Content className="grid gap-5">{children}</Card.Content>
      </Card>
    </section>
  )
}

/** Sticky save bar at the bottom of a full-page form: status text, Cancel (secondary), then Save (primary). */
function FormActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-actions"
      className={cn(
        "sticky bottom-0 z-10 -mx-5 flex flex-col-reverse gap-3 border-t border-separator bg-background px-5 py-4 sm:mx-0 sm:flex-row sm:items-center sm:justify-end sm:px-0",
        className,
      )}
      {...props}
    />
  )
}

export { PageHeader, FormSection, FormActions }
