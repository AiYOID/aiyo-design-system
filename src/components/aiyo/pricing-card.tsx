import * as React from "react"
import { Check } from "@gravity-ui/icons"
import { Button, Card, Chip, cn } from "@heroui/react"

type PricingCardProps = {
  name: string
  price: React.ReactNode
  period?: string
  description: string
  features: string[]
  cta: string
  /** Accent ring and a primary CTA. Highlight a tier only with a written reason. */
  highlighted?: boolean
  /** Short reason shown on a highlighted tier, e.g. "Fits 2 to 10 outlets". Not "Most popular". */
  highlightLabel?: string
  /** The plan the user has picked. The CTA turns into a confirmation. */
  selected?: boolean
  onSelect?: () => void
  className?: string
}

/** One card per real pricing tier. */
function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted = false,
  highlightLabel,
  selected = false,
  onSelect,
  className,
}: PricingCardProps) {
  return (
    <Card className={cn("h-full gap-8 p-6 md:p-8", highlighted && "ring-2 ring-accent", className)}>
      <Card.Header className="flex-row flex-wrap items-center justify-between gap-2">
        <Card.Title className="text-lg font-semibold">{name}</Card.Title>
        {highlighted && highlightLabel && (
          <Chip color="accent" variant="soft" size="sm">
            {highlightLabel}
          </Chip>
        )}
      </Card.Header>
      <Card.Content className="gap-8">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">{price}</span>
            {period && <span className="text-sm text-muted">{period}</span>}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <ul className="flex flex-col gap-3 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>
      </Card.Content>
      <Card.Footer className="mt-auto">
        <Button fullWidth size="lg" variant={highlighted ? "primary" : "secondary"} aria-pressed={selected} onPress={onSelect}>
          {selected ? (
            <>
              <Check aria-hidden /> Selected
            </>
          ) : (
            cta
          )}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export { PricingCard, type PricingCardProps }
