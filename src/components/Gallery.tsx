import { motion, useReducedMotion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import GoldOrnament from './GoldOrnament'

const photos = [
  { src: 'https://static.spotapps.co/spots/c5/c78ba71ead4547b89034dd1ee0c856/full', alt: 'Spicy shrimp stir fry with basil' },
  { src: 'https://static.spotapps.co/spots/40/87f1fbe71744758d8ec427cbc18837/full', alt: 'Table set with plates and woven chairs' },
  { src: 'https://static.spotapps.co/spots/bc/5092c2670e45eca3e1be7b1538142f/full', alt: 'White fish in creamy curry sauce' },
  { src: 'https://static.spotapps.co/spots/8a/feb5f590324d34a3f71804692c7803/full', alt: 'Bar area with colorful hanging lights' },
  { src: 'https://static.spotapps.co/spots/44/8c267aaf8348cdb09eac0c7a4a7b53/full', alt: 'Assorted fried appetizers with dipping sauces' },
  { src: 'https://static.spotapps.co/spots/b8/98663d2b5f46d09a54db1461b6a331/full', alt: 'Yellow iced drink with passion fruit' },
  { src: 'https://static.spotapps.co/spots/f2/7aa6914faf4633a67d2132067d5988/full', alt: 'Interior with traditional carved wooden elements' },
  { src: 'https://static.spotapps.co/spots/38/f41b6826904b15bb21b9d4a36d0e6a/full', alt: 'Booth area with dark wooden paneling' },
]

export default function Gallery() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="gallery" className="relative bg-tb-dark py-24 md:py-32 overflow-hidden">
      {/* Thai pattern at 5% */}
      <div className="absolute inset-0 thai-pattern pointer-events-none" style={{ opacity: 0.03 }} />
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-14">
          <p className="text-tb-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">Gallery</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5">A Feast for the Eyes</h2>
          <GoldOrnament className="max-w-xs mx-auto" />
        </AnimateIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduceMotion ? 0.3 : 0.6, delay: reduceMotion ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { scale: 1.03, transition: { duration: 0.3 } }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group aspect-square overflow-hidden rounded-lg sm:rounded-xl border border-white/[0.07] hover:border-tb-gold/50 transition-colors duration-300 cursor-pointer"
            >
              <motion.img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-dark to-transparent pointer-events-none" />
    </section>
  )
}
