import * as React from "react"
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react"

/** The AiYO easing curve: fast start, long confident settle. */
export const easeOut = [0.16, 1, 0.3, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

/** Default viewport options for scroll-triggered entrances. */
export const viewport = { once: true, amount: 0.15, margin: "-60px" } as const

type RevealProps = HTMLMotionProps<"div"> & { variants?: Variants }

/** Fades its content up into view once, when scrolled into the viewport. */
export function Reveal({ variants = fadeInUp, ...props }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...(props as React.ComponentProps<"div">)} />
  return <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={viewport} {...props} />
}

/** Staggers the entrance of direct `<RevealItem>` children. */
export function RevealGroup(props: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...(props as React.ComponentProps<"div">)} />
  return <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} {...props} />
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeInUp} {...props} />
}
