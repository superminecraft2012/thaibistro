import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimateIn({ children, className, delay = 0, direction = 'up' }: Props) {
  const reduceMotion = useReducedMotion()

  // When reduced motion is preferred, skip transforms entirely and do a quick fade.
  const initial = reduceMotion
    ? { opacity: 0, y: 0, x: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 32 : 0,
        x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
      }

  const transition = reduceMotion
    ? { duration: 0.2, delay: 0, ease: [0.22, 1, 0.36, 1] as const }
    : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
