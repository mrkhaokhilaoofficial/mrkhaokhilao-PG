import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFire } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import { fadeUp, slideRight } from '../../animations/variants'

const FeaturedBanner = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #1a0800 0%, #2a0d00 40%, #1A1A1A 100%)',
        border: '1px solid rgba(255,122,0,0.15)',
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,122,0,1) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-primary/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
        {/* Left Content */}
        <div className="flex-1 text-center sm:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-primary/15 border border-orange-primary/25 rounded-full text-orange-primary text-xs font-semibold mb-4">
            <FaFire className="text-xs animate-fire" />
            Today's Special
          </div>

          <h2 className="font-poppins font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
            Taste Jo{' '}
            <span className="text-gradient-orange">Dil Se</span>
            <br />
            Bante Hai
          </h2>

          <p className="text-muted text-sm sm:text-base font-inter mb-6 max-w-xs sm:max-w-sm">
            Fresh ingredients, authentic recipes, and Chef Piyush's personal touch in every single dish.
          </p>

          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-secondary text-white font-poppins font-bold text-sm rounded-xl shadow-orange-glow hover:brightness-110 transition-all"
            >
              <FaFire />
              Order Now
              <HiArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-5 py-3 border border-white/15 text-white font-semibold text-sm rounded-xl hover:border-orange-primary/40 hover:text-orange-primary transition-all bg-white/5"
            >
              View Menu
            </motion.button>
          </div>
        </div>

        {/* Right — Food Image */}
        <motion.div
          variants={slideRight}
          className="relative shrink-0"
        >
          <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-2xl overflow-hidden border border-orange-primary/20 relative">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop"
              alt="Featured dish"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 -left-4 bg-bg-card border border-orange-primary/30 rounded-xl px-3 py-2 shadow-orange-glow"
          >
            <p className="text-orange-primary font-bold text-xs">🔥 Bestseller</p>
            <p className="text-white text-xs font-semibold">Chaap Biryani</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-3 -right-4 bg-bg-card border border-gold/30 rounded-xl px-3 py-2"
          >
            <p className="text-gold font-bold text-xs">⭐ 4.9/5</p>
            <p className="text-muted text-xs">445 reviews</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FeaturedBanner
