import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaFire, FaTachometerAlt, FaShoppingBag, FaMapMarkerAlt, FaChartBar,
  FaUtensils, FaUsers, FaTag, FaBox, FaCodeBranch, FaUserTie,
  FaCommentAlt, FaFileAlt, FaCog, FaSignOutAlt, FaBars, FaTimes,
} from 'react-icons/fa'

const navItems = [
  { group: 'Main', items: [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { id: 'orders', icon: <FaShoppingBag />, label: 'Orders', badge: '12' },
    { id: 'tracking', icon: <FaMapMarkerAlt />, label: 'Live Tracking' },
    { id: 'analytics', icon: <FaChartBar />, label: 'Analytics' },
  ]},
  { group: 'Management', items: [
    { id: 'menu', icon: <FaUtensils />, label: 'Menu Items' },
    { id: 'customers', icon: <FaUsers />, label: 'Customers' },
    { id: 'coupons', icon: <FaTag />, label: 'Coupons' },
    { id: 'inventory', icon: <FaBox />, label: 'Inventory' },
    { id: 'branches', icon: <FaCodeBranch />, label: 'Branches' },
    { id: 'employees', icon: <FaUserTie />, label: 'Employees' },
  ]},
  { group: 'Reports', items: [
    { id: 'feedback', icon: <FaCommentAlt />, label: 'Feedback' },
    { id: 'reports', icon: <FaFileAlt />, label: 'Reports' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' },
  ]},
]

const AdminSidebar = ({ activeItem, onItemChange }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 p-5 border-b border-white/5 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-primary to-orange-secondary flex items-center justify-center shrink-0 shadow-orange-glow">
          <FaFire className="text-white text-sm" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-poppins font-extrabold text-white text-sm leading-none truncate">Mr. Khao Khilao</p>
            <p className="text-muted text-xs mt-0.5">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5">
        {navItems.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="text-muted/50 text-[10px] font-bold uppercase tracking-widest px-5 mb-1">
                {group.group}
              </p>
            )}
            <div className="space-y-0.5 px-3">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onItemChange(item.id); setMobileOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group
                    ${activeItem === item.id
                      ? 'bg-orange-primary/15 text-orange-primary border border-orange-primary/20'
                      : 'text-muted hover:text-white hover:bg-white/5'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.label : ''}
                >
                  <span className={`text-base shrink-0 ${activeItem === item.id ? 'text-orange-primary' : 'group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="px-1.5 py-0.5 bg-orange-primary rounded-full text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:text-white hover:bg-white/5 transition-all"
        >
          <span className="text-base shrink-0">{collapsed ? '→' : '←'}</span>
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
        <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:text-danger hover:bg-danger/5 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <FaSignOutAlt className="text-base shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 bg-bg-secondary border border-white/10 rounded-xl flex items-center justify-center text-white hover:border-orange-primary/40 transition-all"
        aria-label="Open sidebar"
      >
        <FaBars />
      </button>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-bg-secondary z-50 lg:hidden border-r border-white/5"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-white p-1"
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen bg-bg-secondary border-r border-white/5 sticky top-0 shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>
    </>
  )
}

export default AdminSidebar
