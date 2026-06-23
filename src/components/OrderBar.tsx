import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const SHOW_AFTER = 600

function BagIcon({ className = 'w-5 h-5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
  )
}

export default function OrderBar() {
  const { scrollY } = useScroll()
  const reduceMotion = useReducedMotion()
  // Lazy initial value handles a page that loads already scrolled down.
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SHOW_AFTER
  )
  // True while the #order section or the footer is on screen - we hide the bar then
  // so it never permanently covers those conversion/contact surfaces.
  const [atDestination, setAtDestination] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SHOW_AFTER)
  })

  // Hide the bar whenever the order section or footer enters the viewport.
  useEffect(() => {
    const targets: Element[] = []
    const order = document.getElementById('order')
    const footer = document.querySelector('footer')
    if (order) targets.push(order)
    if (footer) targets.push(footer)
    if (targets.length === 0) return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setAtDestination(visible.size > 0)
      },
      { threshold: 0.2 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const visible = scrolled && !atDestination

  const enter = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: 96, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 96, opacity: 0 },
      }

  const enterDesktop = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: 32, opacity: 0, scale: 0.9 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: 32, opacity: 0, scale: 0.9 },
      }

  const pulse = reduceMotion ? '' : ' animate-order-pulse'

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: full-width fixed bottom bar (below md) */}
          <motion.div
            key="order-bar-mobile"
            initial={enter.initial}
            animate={enter.animate}
            exit={enter.exit}
            transition={{ duration: 0.4, ease: EASE }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-tb-dark via-tb-dark/95 to-transparent tap-highlight-none"
          >
            <a
              href="#order"
              aria-label="Order online"
              className={
                'flex w-full items-center justify-center gap-2.5 min-h-[3.5rem] bg-tb-red hover:bg-tb-red-hover text-white text-base font-bold rounded-2xl shadow-lg shadow-black/40 ring-1 ring-tb-gold/25 transition-colors active:scale-[0.98] tap-highlight-none' +
                pulse
              }
            >
              <BagIcon />
              Order Online
            </a>
          </motion.div>

          {/* Desktop: floating pill, bottom-right (md+) */}
          <motion.a
            key="order-bar-desktop"
            href="#order"
            aria-label="Order online"
            initial={enterDesktop.initial}
            animate={enterDesktop.animate}
            exit={enterDesktop.exit}
            transition={{ duration: 0.4, ease: EASE }}
            whileHover={reduceMotion ? undefined : { scale: 1.05, transition: { duration: 0.2, ease: EASE } }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className={
              'hidden md:inline-flex fixed bottom-7 right-7 z-40 items-center gap-2.5 bg-tb-red hover:bg-tb-red-hover text-white text-sm font-bold pl-5 pr-6 py-3.5 rounded-full shadow-xl shadow-black/50 ring-1 ring-tb-gold/30 transition-colors tap-highlight-none' +
              pulse
            }
          >
            <BagIcon className="w-5 h-5 shrink-0" />
            Order Online
          </motion.a>
        </>
      )}
    </AnimatePresence>
  )
}
