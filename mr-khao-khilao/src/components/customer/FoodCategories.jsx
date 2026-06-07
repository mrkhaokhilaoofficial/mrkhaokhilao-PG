import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { categories } from '../../data/menuItems'

const FoodCategories = ({ onCategoryChange }) => {
  const [active, setActive] = useState('all')
  const scrollRef = useRef(null)

  const handleSelect = (id) => {
    setActive(id)
    if (onCategoryChange) onCategoryChange(id)
  }

  return (
    <div>
      <p className="font-poppins font-bold text-white text-base mb-4">Food Categories</p>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => handleSelect(cat.id)}
            className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all duration-200 whitespace-nowrap shrink-0 border
              ${active === cat.id
                ? 'bg-orange-primary/15 border-orange-primary/40 text-orange-primary shadow-orange-glow/30'
                : 'bg-bg-card border-white/5 text-muted hover:border-white/15 hover:text-white'
              }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="text-xs font-semibold font-poppins">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default FoodCategories
