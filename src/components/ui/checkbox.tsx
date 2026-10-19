import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-5 shrink-0 cursor-pointer rounded-md border border-input bg-card shadow-sm transition-all duration-200",
        "hover:border-primary/50 focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
        "data-[state=checked]:border-transparent data-[state=checked]:bg-gradient-primary-diagonal data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-accent",
        "data-[state=indeterminate]:border-transparent data-[state=indeterminate]:bg-gradient-primary-diagonal data-[state=indeterminate]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="group/indicator flex items-center justify-center">
        <Check className="size-3.5 stroke-3 group-data-[state=indeterminate]/indicator:hidden" />
        <Minus className="hidden size-3.5 stroke-3 group-data-[state=indeterminate]/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
