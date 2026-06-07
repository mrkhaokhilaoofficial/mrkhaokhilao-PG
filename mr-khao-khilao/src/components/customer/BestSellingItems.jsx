import { motion } from 'framer-motion'
import { FaStar, FaFire, FaPlus, FaMinus } from 'react-icons/fa'
import { menuItems } from '../../data/menuItems'
import { useCart } from '../../context/CartContext'
import { staggerContainer, fadeUp } from '../../animations/variants'

const ItemCard = ({ item }) => {
  const { addToCart, cartItems, updateQuantity } = useCart()
  const cartItem = cartItems.find(i => i.id === item.id)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden group hover:border-orange-primary/20 hover:shadow-[0_4px_24px_rgba(255,122,0,0.15)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />

        {/* Bestseller badge */}
        {item.isBestseller && (
          <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-orange-primary rounded-full text-white text-xs font-bold">
            <FaFire className="text-[10px]" /> Best
          </span>
        )}

        {/* Veg indicator */}
        <span className="absolute top-2 right-2 w-5 h-5 border-2 border-success rounded-sm bg-bg-primary/80 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-success block" />
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-poppins font-bold text-white text-sm leading-tight">{item.name}</h4>

        <div className="flex items-center gap-1.5 mt-1.5">
          <FaStar className="text-gold text-xs" />
          <span className="text-white text-xs font-bold">{item.rating}</span>
          <span className="text-muted text-xs">({item.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-poppins font-extrabold text-orange-primary text-base">₹{item.price}</span>
            {item.originalPrice > item.price && (
              <span className="text-muted text-xs line-through ml-1">₹{item.originalPrice}</span>
            )}
          </div>

          {/* Add/Remove controls */}
          {cartItem ? (
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center text-orange-primary hover:bg-orange-primary hover:text-white transition-all"
              >
                <FaMinus className="text-[10px]" />
              </motion.button>
              <span className="text-white font-bold text-sm w-5 text-center">{cartItem.quantity}</span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                className="w-7 h-7 rounded-lg bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center text-orange-primary hover:bg-orange-primary hover:text-white transition-all"
              >
                <FaPlus className="text-[10px]" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(item)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-primary/10 border border-orange-primary/30 text-orange-primary rounded-xl text-xs font-bold hover:bg-orange-primary hover:text-white transition-all"
            >
              <FaPlus className="text-[10px]" />
              Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const BestSellingItems = () => {
  const bestSellers = menuItems.filter(item => item.isBestseller)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-poppins font-bold text-white text-base">Best Selling Items</p>
        <button className="text-orange-primary text-xs font-semibold hover:text-orange-secondary transition-colors">
          See All →
        </button>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {bestSellers.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  )
}

export default BestSellingItems
