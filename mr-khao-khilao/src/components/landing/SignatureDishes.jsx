import { motion } from 'framer-motion'
import { FaStar, FaFire, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { signatureDishes } from '../../data/menuItems'
import SectionTitle from '../ui/SectionTitle'
import { staggerContainer, fadeUp } from '../../animations/variants'
import { useCart } from '../../context/CartContext'
import Button from '../ui/Button'

const DishCard = ({ dish, index }) => {
  const { addToCart } = useCart()

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-bg-card border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
      style={{ transition: 'box-shadow 0.3s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(255, 122, 0, 0.3)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-bg-card/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {dish.isBestseller && (
            <span className="px-2.5 py-1 bg-orange-primary rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-orange-glow">
              <FaFire className="text-xs" /> Bestseller
            </span>
          )}
          <span className="px-2.5 py-1 bg-success/90 rounded-full text-white text-xs font-bold">
            🟢 Pure Veg
          </span>
        </div>

        {/* Discount */}
        {dish.originalPrice > dish.price && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-danger rounded-full text-white text-xs font-bold">
            {Math.round((1 - dish.price / dish.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-poppins font-bold text-white text-lg group-hover:text-orange-primary transition-colors">
          {dish.name}
        </h3>
        <p className="text-muted text-sm mt-1 leading-relaxed font-inter line-clamp-2">
          {dish.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(dish.rating) ? 'text-gold text-xs' : 'text-muted text-xs'}
              />
            ))}
          </div>
          <span className="text-white font-bold text-sm">{dish.rating}</span>
          <span className="text-muted text-xs">({dish.reviews} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {dish.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-muted text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            <span className="font-poppins font-extrabold text-orange-primary text-xl">₹{dish.price}</span>
            {dish.originalPrice > dish.price && (
              <span className="text-muted text-sm line-through ml-2">₹{dish.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(dish)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-primary/10 border border-orange-primary/30 text-orange-primary rounded-xl text-sm font-semibold hover:bg-orange-primary hover:text-white transition-all duration-200"
          >
            <FaShoppingCart className="text-xs" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const SignatureDishes = () => {
  return (
    <section id="menu" className="py-16 md:py-24 bg-bg-secondary relative">
      <div className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,122,0,0.08), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="Chef's Picks"
          title="Signature"
          highlight="Dishes"
          subtitle="Handcrafted with love and perfected over years of culinary expertise."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {signatureDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-10"
        >
          <Link to="/customer">
            <Button variant="secondary" size="lg">
              View Full Menu →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SignatureDishes
