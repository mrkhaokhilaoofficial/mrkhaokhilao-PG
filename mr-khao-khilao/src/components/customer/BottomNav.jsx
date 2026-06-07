import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaUtensils, FaShoppingCart, FaClipboardList, FaUser } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'menu', label: 'Menu', icon: <FaUtensils /> },
  { id: 'cart', label: 'Cart', icon: <FaShoppingCart />, showBadge: true },
  { id: 'orders', label: 'Orders', icon: <FaClipboardList /> },
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
]

const BottomNav = () => {
  const [active, setActive] = useState('home')
  const { cartCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-xl border-t border-white/5 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-0"
            aria-label={item.label}
          >
            {active === item.id && (
              <motion.div
                layoutId="navActive"
                className="absolute inset-0 bg-orange-primary/10 rounded-xl border border-orange-primary/20"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}

            <div className={`relative text-lg transition-colors ${active === item.id ? 'text-orange-primary' : 'text-muted'}`}>
              {item.icon}
              {item.showBadge && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-primary rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold transition-colors leading-none ${active === item.id ? 'text-orange-primary' : 'text-muted'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
