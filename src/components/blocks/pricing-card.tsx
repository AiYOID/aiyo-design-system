import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type PricingCardProps = {
  name: string
  price: React.ReactNode
  period?: string
  description: string
  features: string[]
  cta: string
  /** Gradient border, lifted above its siblings, primary CTA. */
  highlighted?: boolean
  /** The plan the user has picked. The CTA turns into a confirmation. */
  selected?: boolean
  onSelect?: () => void
  className?: string
}

function PricingCard({ name, price, period, description, features, cta, highlighted = false, selected = false, onSelect, className }: PricingCardProps) {
  return (
    <div className={cn("h-full", highlighted && "md:-translate-y-4", className)}>
      <Card featured={highlighted} variant={highlighted ? "elevated" : "default"} className="h-full gap-8 p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-[-0.01em]">{name}</h3>
          {highlighted && <Badge variant="primary">Most popular</Badge>}
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-5xl tracking-[-0.02em]">{price}</span>
            {period && <span className="text-sm text-muted-foreground">{period}</span>}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <ul className="flex flex-col gap-3 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                  highlighted ? "bg-gradient-primary text-primary-foreground" : "bg-primary/10 text-primary",
                )}
              >
                <Check className="size-3 stroke-3" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button
          variant={highlighted ? "primary" : "secondary"}
          size="lg"
          className="mt-auto w-full"
          aria-pressed={selected}
          onClick={onSelect}
        >
          {selected ? (
            <>
              <Check /> Selected
            </>
          ) : (
            cta
          )}
        </Button>
      </Card>
    </div>
  )
}

export { PricingCard }
