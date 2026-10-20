import * as React from "react"

/** The AiYO easing curve: fast start, long confident settle. Same as the CSS `ease-aiyo`. */
export const easeOut = [0.16, 1, 0.3, 1] as const

/**
 * Hides the element only when it starts below the fold, then shows it once when it
 * scrolls in. Elements already on screen, reduced-motion users and browsers without
 * IntersectionObserver never see it hidden. The transition itself lives in aiyo.css.
 */
function useReveal<T extends HTMLElement>(attribute: "reveal" | "revealGroup") {
  const ref = React.useRef<T>(null)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.dataset[attribute] = "hidden"
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset[attribute] = "shown"
        observer.disconnect()
      },
      { rootMargin: "0px 0px -60px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [attribute])
  return ref
}

/** Fades its content up into view once (0.7s, 28px), when scrolled into the viewport. */
export function Reveal(props: React.ComponentProps<"div">) {
  const ref = useReveal<HTMLDivElement>("reveal")
  return <div ref={ref} {...props} />
}

/** Staggers its direct `<RevealItem>` children by 0.1s when the group scrolls in. */
export function RevealGroup({ children, ...props }: React.ComponentProps<"div">) {
  const ref = useReveal<HTMLDivElement>("revealGroup")
  let index = 0
  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return child
    const style = { ...child.props.style, "--reveal-index": index++ } as React.CSSProperties
    return React.cloneElement(child, { style })
  })
  return (
    <div ref={ref} data-reveal-group="" {...props}>
      {items}
    </div>
  )
}

export function RevealItem(props: React.ComponentProps<"div">) {
  return <div data-reveal-item="" {...props} />
}
