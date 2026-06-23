import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7) % 80}%`,
  y: `${15 + (i * 11) % 70}%`,
  size: 1.5 + (i % 3) * 0.8,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}))

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '30%'])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-tb-dark">
      {/* Diagonal texture at 5% */}
      <div className="absolute inset-0 diag-texture pointer-events-none" style={{ opacity: 0.03 }} />

      {/* Parallax food photo - full-width on mobile behind a strong scrim, right-half at md+ */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://static.spotapps.co/spots/b5/db83fd4a254d978ac5047d35b95d8e/full')`,
          filter: 'brightness(0.6) saturate(1.3)',
          y: bgY,
        }}
      />
      {/* Mobile scrim: strong full-bleed dark overlay for text legibility (hidden at md+) */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-r from-tb-dark via-tb-dark/85 to-tb-dark/65" />
      <div className="absolute inset-0 md:hidden bg-tb-dark/35" />
      {/* Smooth left-to-right gradient blending photo into dark bg (md+) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-tb-dark via-tb-dark/75 to-transparent hidden md:block" />
      {/* Bottom fade so next section blends in */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tb-dark to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark/60 to-transparent" />

      {/* Floating gold particles - disabled when reduced motion is preferred */}
      {!reduceMotion && PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-tb-gold pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [-6, 6, -6], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-28 pb-24 sm:pt-24 sm:pb-20 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="text-tb-gold/80 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-5 sm:mb-6"
          >
            Est. in Shoreline, WA
          </motion.p>

          <h1 className="font-display leading-[1.08] mb-5">
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
              className="block text-[2.75rem] sm:text-6xl md:text-[4.5rem] font-bold text-tb-gold text-shadow"
            >
              Authentic Thai.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.52, ease: EASE_OUT }}
              className="block text-[2.75rem] sm:text-6xl md:text-[4.5rem] font-bold text-white text-shadow"
            >
              Made with Heart.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
            className="text-white/70 text-base md:text-lg max-w-md mb-8 sm:mb-10 leading-relaxed"
          >
            A family-owned restaurant serving traditional Thai cuisine crafted with
            passion, premium ingredients, and timeless recipes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#order"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT }}
              className="group relative inline-flex items-center justify-center gap-2.5 bg-tb-red hover:bg-tb-red-hover text-white font-bold w-full sm:w-auto min-h-[52px] px-9 py-4 rounded shadow-lg shadow-tb-red/30 transition-colors hover:scale-105 active:scale-95 text-base tracking-wide uppercase overflow-hidden"
            >
              {/* Pulsing focus ring (looping) - only when motion is allowed */}
              {!reduceMotion && (
                <span className="absolute inset-0 rounded ring-2 ring-tb-red/40 animate-ping opacity-60 pointer-events-none" aria-hidden="true" />
              )}
              {/* Continuous shimmer sheen sweeping across the button */}
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                  animate={{ left: ['-40%', '140%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                />
              )}
              {/* Soft glow halo to draw the eye */}
              <span className="absolute -inset-px rounded ring-1 ring-tb-gold/30 pointer-events-none" aria-hidden="true" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="relative">Order Online</span>
            </motion.a>
            <a href="https://thaibistro.us/food-menu" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-tb-gold/60 hover:border-tb-gold text-tb-gold hover:bg-tb-gold/10 font-semibold w-full sm:w-auto min-h-[48px] px-7 py-3.5 rounded transition-all hover:scale-105 active:scale-95 text-sm tracking-wide uppercase">
              View Our Menu
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE_OUT }}
            className="mt-6 sm:mt-5 text-white/55 text-xs sm:text-sm tracking-wide text-balance leading-relaxed"
          >
            Pickup &amp; delivery · ready in ~20 min · 3 Seattle-area locations
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className={`absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 ${reduceMotion ? '' : 'animate-bounce'}`}
      >
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/60 rotate-45" />
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/30 rotate-45 -mt-1.5" />
      </motion.div>
    </section>
  )
}
