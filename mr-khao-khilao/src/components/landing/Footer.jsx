import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFire, FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { fadeUp, staggerContainer } from '../../animations/variants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="bg-bg-secondary border-t border-white/5 relative overflow-hidden">
      {/* Brand quote strip at top of footer */}
      <div className="py-6 text-center border-b border-white/5 relative"
        style={{ background: 'linear-gradient(135deg, rgba(255,122,0,0.06), transparent)' }}
      >
        <p className="font-poppins font-extrabold text-lg md:text-2xl italic"
          style={{ color: '#FF7A00', textShadow: '0 0 20px rgba(255,122,0,0.3)' }}
        >
          "Taste Se Shuruaat... Brand Tak Ka Safar"
        </p>
        <p className="text-xs mt-1" style={{ color: '#B3B3B3' }}>— Chef Piyush Gupta</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-primary to-orange-secondary flex items-center justify-center">
                <FaFire className="text-white text-lg" />
              </div>
              <div>
                <p className="font-poppins font-extrabold text-white text-sm">Mr. Khao Khilao</p>
                <p className="text-muted text-xs">by Chef Piyush Gupta</p>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-5 font-inter">
              Premium Indian street food crafted with passion and perfection. Every bite is a story.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram', color: '#E1306C' },
                { icon: <FaYoutube />, href: 'https://youtube.com', label: 'YouTube', color: '#FF0000' },
                { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook', color: '#1877F2' },
                { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-poppins font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'Our Journey', href: '#journey' },
                { label: 'Menu', href: '#menu' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Franchise', href: '#franchise' },
                { label: 'Outlets', href: '#outlets' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-muted text-sm hover:text-orange-primary transition-colors font-inter flex items-center gap-2 group"
                    onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }) }}
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-primary/40 group-hover:bg-orange-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dashboard Links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-poppins font-bold text-white mb-4">Dashboards</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Customer Portal', to: '/customer' },
                { label: 'Admin Dashboard', to: '/admin' },
                { label: 'Order Tracking', to: '/customer' },
                { label: 'My Rewards', to: '/customer' },
                { label: 'Menu Explorer', to: '/customer' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-muted text-sm hover:text-orange-primary transition-colors font-inter flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-primary/40 group-hover:bg-orange-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="font-poppins font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="text-orange-primary text-sm mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+919623859978" className="text-white text-sm font-medium hover:text-orange-primary transition-colors">+91 96238 59978</a>
                  <p className="text-muted text-xs">Mon–Sun, 11AM–11PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaInstagram className="text-orange-primary text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">@mrkhaokhilao</p>
                  <p className="text-muted text-xs">Follow for daily updates</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-primary text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">Railtoly, Gondia</p>
                  <p className="text-muted text-xs">Maharashtra — 441614</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-orange-primary text-sm mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">hello@mrkhaokhilao.com</p>
                  <p className="text-muted text-xs">We reply within 24 hours</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-inter text-center sm:text-left">
            © {year} Mr. Khao Khilao. All rights reserved. Made with ❤️ & 🔥 in Maharashtra.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted text-xs hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-muted text-xs">·</span>
            <a href="#" className="text-muted text-xs hover:text-white transition-colors">Terms of Service</a>
            <span className="text-muted text-xs">·</span>
            <a href="#" className="text-muted text-xs hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
