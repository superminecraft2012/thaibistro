import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import GoldOrnament from './GoldOrnament'

const dishes = [
  {
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with egg, bean sprouts, and grounded peanuts.',
    price: '$16.95+',
    img: 'https://static.spotapps.co/spots/27/5e64da6b3c400aa7dda72cc84a4eab/full',
    alt: 'Stir fried noodles with veggies',
  },
  {
    name: 'Green Curry',
    description: 'Creamy coconut curry with eggplant, Thai basil, and your choice of protein.',
    price: '$17.95+',
    img: 'https://static.spotapps.co/spots/b5/db83fd4a254d978ac5047d35b95d8e/full',
    alt: 'Panang Curry',
  },
  {
    name: 'Duck Curry',
    description: 'Roasted duck with pineapple, tomatoes, red bell peppers and basil in red curry.',
    price: '$21.95',
    img: 'https://static.spotapps.co/spots/f4/fb55ffae0141c5982710134725dad7/full',
    alt: 'Duck curry dish',
  },
  {
    name: 'Mango Sticky Rice',
    description: 'Sweet sticky rice topped with fresh ripe mango and coconut cream.',
    price: '$12.50',
    img: 'https://static.spotapps.co/spots/8f/a8ad68ef944439b4ff823f8bbf2be5/full',
    alt: 'Mango sticky rice and a glass of iced Thai tea',
  },
]

export default function SignatureDishes() {
  return (
    <section id="menu" className="relative bg-tb-dark py-24 md:py-32 overflow-hidden">
      {/* Diagonal texture at 5% */}
      <div className="absolute inset-0 diag-texture pointer-events-none" style={{ opacity: 0.03 }} />
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-14">
          <p className="text-tb-gold text-sm font-medium tracking-[0.25em] uppercase mb-3">Our Menu</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5">Signature Dishes</h2>
          <GoldOrnament className="max-w-xs mx-auto" />
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-lg overflow-hidden hover:border-tb-gold/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/40 transition-colors duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <motion.img
                  src={dish.img}
                  alt={dish.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/food-menu-banner.png' }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-lg text-white leading-tight">{dish.name}</h3>
                  <span className="text-tb-gold font-semibold text-sm shrink-0 mt-0.5">{dish.price}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{dish.description}</p>
                <motion.div
                  className="h-px mt-4 bg-gradient-to-r from-tb-gold/0 via-tb-gold/50 to-tb-gold/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimateIn className="text-center mt-12" delay={0.3}>
          <a href="https://thaibistro.us/food-menu" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-tb-gold/50 hover:border-tb-gold text-tb-gold hover:bg-tb-gold/10 font-semibold px-8 py-3.5 rounded transition-all hover:scale-105 active:scale-95 text-sm tracking-wide">
            Explore Full Menu
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimateIn>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-dark to-transparent pointer-events-none" />
    </section>
  )
}
