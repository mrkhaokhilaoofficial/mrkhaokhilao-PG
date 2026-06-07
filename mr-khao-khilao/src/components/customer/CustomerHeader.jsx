import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBell, FaMapMarkerAlt, FaSearch, FaShoppingCart, FaFire } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi'
import { useCart } from '../../context/CartContext'
import { fadeUp } from '../../animations/variants'

const CustomerHeader = () => {
  const { cartCount } = useCart()
  const [notifOpen, setNotifOpen] = useState(false)

  const notifications = [
    { id: 1, msg: 'Your order #MKK-2401 is out for delivery!', time: '2 min ago', unread: true },
    { id: 2, msg: 'New offer: Use WEEKEND15 for 15% off', time: '1 hr ago', unread: true },
    { id: 3, msg: 'You earned 50 reward points!', time: '3 hrs ago', unread: false },
  ]

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-secondary border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-40"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
        {/* Left — Logo + Greeting */}
        <div className="flex items-center gap-4">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-primary to-orange-secondary flex items-center justify-center">
              <FaFire className="text-white text-sm" />
            </div>
          </Link>
          <div className="hidden sm:block">
            <p className="font-poppins font-extrabold text-white text-lg leading-none">
              Hello Aman 👋
            </p>
            <div className="flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-orange-primary text-xs" />
              <span className="text-muted text-xs font-inter">Civil Lines, Gondia</span>
              <HiChevronDown className="text-muted text-xs cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Center — Search bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm" />
            <input
              type="search"
              placeholder="Search dishes, categories..."
              className="w-full bg-bg-card border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-orange-primary/50 transition-colors"
              aria-label="Search dishes"
            />
          </div>
        </div>

        {/* Right — Notifications + Cart + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all"
              aria-label="Notifications"
            >
              <FaBell className="text-sm" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-primary rounded-full text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
            </button>

            {/* Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-72 bg-bg-card border border-white/10 rounded-2xl shadow-card p-3 z-50">
                <p className="font-poppins font-bold text-white text-sm px-2 mb-3">Notifications</p>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-3 py-2.5 rounded-xl mb-1 cursor-pointer transition-colors ${n.unread ? 'bg-orange-primary/5 hover:bg-orange-primary/10' : 'hover:bg-white/5'}`}
                  >
                    <p className="text-white text-xs leading-relaxed">{n.msg}</p>
                    <p className="text-muted text-xs mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            className="relative w-10 h-10 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center text-muted hover:text-white hover:border-white/20 transition-all"
            aria-label="Cart"
          >
            <FaShoppingCart className="text-sm" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-primary rounded-full text-white text-xs font-bold flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              src="https://randomuser.me/api/portraits/men/41.jpg"
              alt="Aman Verma"
              className="w-10 h-10 rounded-xl border-2 border-orange-primary/30 object-cover group-hover:border-orange-primary/60 transition-all"
            />
            <div className="hidden sm:block">
              <p className="text-white text-xs font-semibold">Aman Verma</p>
              <p className="text-orange-primary text-xs">🥇 Gold Member</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default CustomerHeader
