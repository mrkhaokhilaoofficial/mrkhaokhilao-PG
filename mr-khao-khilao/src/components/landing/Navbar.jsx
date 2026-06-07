import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FaFire } from 'react-icons/fa'
import useScrolled from '../../hooks/useScrolled'
import { navbarGlass } from '../../animations/variants'
import Button from '../ui/Button'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Journey', href: '#journey' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Franchise', href: '#franchise' },
  { label: 'Contact', href: '#footer' },
]

const Navbar = () => {
  const scrolled = useScrolled(80)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        variants={navbarGlass}
        animate={scrolled ? 'glass' : 'transparent'}
        initial="transparent"
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ height: '80px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-primary to-orange-secondary flex items-center justify-center shadow-orange-glow group-hover:scale-105 transition-transform">
              <FaFire className="text-white text-lg" />
            </div>
            <div className="leading-tight">
              <p className="font-poppins font-extrabold text-white text-sm leading-none">Mr. Khao</p>
              <p className="font-poppins font-extrabold text-gradient-orange text-sm leading-none">Khilao</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { setActiveLink(link.label); scrollTo(link.href) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                  ${activeLink === link.label
                    ? 'text-orange-primary bg-orange-primary/10'
                    : 'text-muted hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/customer">
              <Button variant="primary" size="sm">
                Order Now 🔥
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-bg-secondary z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <FaFire className="text-orange-primary text-xl" />
                  <span className="font-poppins font-extrabold text-white">Mr. Khao Khilao</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-muted hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <HiX size={22} />
                </button>
              </div>

              <div className="flex flex-col p-6 gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setActiveLink(link.label); scrollTo(link.href) }}
                    className="text-left px-4 py-3 rounded-xl text-white font-medium hover:bg-orange-primary/10 hover:text-orange-primary transition-all"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 flex flex-col gap-3">
                <Link to="/customer" onClick={() => setMenuOpen(false)}>
                  <Button variant="primary" fullWidth>Order Now 🔥</Button>
                </Link>
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="secondary" fullWidth size="sm">Admin Dashboard</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
