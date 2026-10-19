import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldControl } from "./input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldControl, "min-h-28 resize-y px-4 py-3 leading-relaxed", className)}
      {...props}
    />
  )
}

export { Textarea }
