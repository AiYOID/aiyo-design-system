import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/** Shared field chrome, reused by Input, Textarea and Select so every control looks identical. */
const fieldControl = [
  "w-full min-w-0 rounded-xl border border-input bg-card text-base text-foreground shadow-sm md:text-sm",
  "transition-[border-color,box-shadow] duration-200 ease-out",
  "placeholder:text-muted-foreground",
  "hover:border-primary/30",
  "focus-visible:border-primary focus-visible:focus-ring",
  "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
  "aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive",
].join(" ")

const inputVariants = cva(fieldControl, {
  variants: {
    size: {
      sm: "h-9 px-3 rounded-lg",
      md: "h-12 px-4",
      lg: "h-14 px-5 text-base",
    },
  },
  defaultVariants: { size: "md" },
})

type InputProps = Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>

function Input({ className, size, type = "text", ...props }: InputProps) {
  return <input data-slot="input" type={type} className={cn(inputVariants({ size }), className)} {...props} />
}

export { Input, inputVariants, fieldControl }
