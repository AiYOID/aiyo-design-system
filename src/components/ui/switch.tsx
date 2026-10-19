import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-muted-foreground/25 p-0.5 shadow-inner transition-all duration-200",
        "focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-gradient-primary data-[state=checked]:shadow-accent",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-out data-[state=checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
