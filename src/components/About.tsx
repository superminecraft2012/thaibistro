import { motion, useReducedMotion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import GoldOrnament from './GoldOrnament'

export default function About() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="about" className="relative bg-tb-dark py-24 md:py-32 overflow-hidden">
      {/* Thai diamond pattern at 5% */}
      <div className="absolute inset-0 thai-pattern pointer-events-none" style={{ opacity: 0.03 }} />
      {/* Left glow */}
      <div className="absolute inset-0 section-glow-left pointer-events-none" />
      {/* Seamless top blend from hero */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-tb-dark to-transparent pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-tb-gold/10 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-tb-gold/10 rounded-bl-lg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo - clip-path reveal */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Padding reserves room for the offset border so it never causes horizontal overflow on mobile */}
            <div className="relative pr-4 pb-4 md:pr-0 md:pb-0">
              <motion.div
                className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-2xl shadow-black/60"
                initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
                whileInView={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="https://static.spotapps.co/spots/f2/7aa6914faf4633a67d2132067d5988/full"
                  alt="Thai Bistro restaurant interior with carved wooden elements and woven rattan chairs"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tb-dark/40 to-transparent" />
              </motion.div>
              <div className="absolute bottom-0 right-0 w-[calc(100%-1rem)] h-[calc(100%-1rem)] border border-tb-gold/15 rounded-lg pointer-events-none" />
              <div className="absolute top-2 left-2 md:-top-2 md:-left-2 w-4 h-4 rounded-full border-2 border-tb-gold/30 bg-tb-dark" />
              <div className="absolute bottom-2 right-2 md:-bottom-2 md:-right-2 w-4 h-4 rounded-full border-2 border-tb-gold/30 bg-tb-dark" />
            </div>
          </motion.div>

          {/* Content - staggered text */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <AnimateIn direction="right" delay={0.05}>
              <p className="text-tb-gold text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-2 sm:mb-3">Our Story</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                A Tradition of<br />Flavors and Family
              </h2>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <GoldOrnament className="max-w-xs" />
            </AnimateIn>

            <AnimateIn direction="right" delay={0.22}>
              <p className="text-white/65 leading-relaxed text-base md:text-lg">
                Thai Bistro was born from a family dream to share the rich, vibrant flavors
                of Thailand with our community. Every dish is prepared with love, using
                fresh, authentic ingredients passed down through generations.
              </p>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.3}>
              <p className="text-white/65 leading-relaxed text-base md:text-lg">
                From our family to yours, we invite you to experience the warmth, hospitality,
                and unforgettable taste of Thailand, authentic gourmet Thai food with a
                contemporary twist, carefully prepared using only the freshest ingredients.
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Bottom blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-dark to-transparent pointer-events-none" />
    </section>
  )
}
