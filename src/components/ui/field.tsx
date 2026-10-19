import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

type FieldProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  /** Helper text under the control. Replaced by `error` when present. */
  hint?: React.ReactNode
  error?: React.ReactNode
  /** id of the control inside; wires up the label and aria-describedby. */
  htmlFor?: string
  required?: boolean
}

/**
 * Label + control + hint/error, stacked with consistent spacing.
 * Pass the control as the only child and give it the same `id` as `htmlFor`.
 */
function Field({ className, label, hint, error, htmlFor, required, children, ...props }: FieldProps) {
  const messageId = htmlFor ? `${htmlFor}-message` : undefined
  const control = React.isValidElement<Record<string, unknown>>(children)
    ? React.cloneElement(children, {
        "aria-describedby": hint || error ? messageId : undefined,
        "aria-invalid": error ? true : undefined,
      })
    : children

  return (
    <div data-slot="field" className={cn("grid gap-2", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="text-primary" aria-hidden>
              *
            </span>
          )}
        </Label>
      )}
      {control}
      {(error || hint) && (
        <p id={messageId} className={cn("text-xs leading-relaxed", error ? "text-destructive" : "text-muted-foreground")}>
          {error || hint}
        </p>
      )}
    </div>
  )
}

export { Field }
