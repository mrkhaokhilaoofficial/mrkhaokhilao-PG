import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFire, FaBell, FaSearch } from 'react-icons/fa'
import { HiArrowLeft } from 'react-icons/hi'
import AdminSidebar from '../components/admin/AdminSidebar'
import KPICards from '../components/admin/KPICards'
import SalesOverviewChart from '../components/admin/SalesOverviewChart'
import TopSellingPieChart from '../components/admin/TopSellingPieChart'
import SalesProfitLineChart from '../components/admin/SalesProfitLineChart'
import LiveDeliveryMonitor from '../components/admin/LiveDeliveryMonitor'
import CustomerFeedbackChart from '../components/admin/CustomerFeedbackChart'
import RecentOrdersTable from '../components/admin/RecentOrdersTable'
import QuickActionsAdmin from '../components/admin/QuickActionsAdmin'
import { staggerContainer, fadeUp } from '../animations/variants'

const AdminTopBar = () => (
  <div className="sticky top-0 z-30 bg-bg-secondary/95 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 pl-16 lg:pl-6">
    {/* Left */}
    <div className="flex items-center gap-4">
      <Link to="/" className="flex items-center gap-2 text-muted text-sm hover:text-orange-primary transition-colors">
        <HiArrowLeft className="text-orange-primary" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>
      <div className="hidden sm:block w-px h-4 bg-white/10" />
      <div className="hidden md:block">
        <p className="font-poppins font-bold text-white text-sm">Admin Dashboard</p>
        <p className="text-muted text-xs">Mr. Khao Khilao — Railtoly, Gondia</p>
      </div>
    </div>

    {/* Right */}
    <div className="flex items-center gap-3">
      {/* Search */}
      <div className="relative hidden lg:block">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs" />
        <input
          type="search"
          placeholder="Search..."
          className="pl-8 pr-4 py-2 bg-bg-card border border-white/5 rounded-xl text-white text-xs placeholder-muted focus:outline-none focus:border-orange-primary/40 w-48 transition-all"
          aria-label="Search admin"
        />
      </div>

      {/* Notifications */}
      <button className="relative w-9 h-9 rounded-xl bg-bg-card border border-white/5 flex items-center justify-center text-muted hover:text-white transition-all" aria-label="Notifications">
        <FaBell className="text-sm" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-primary rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
      </button>

      {/* Admin avatar */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Admin"
          className="w-9 h-9 rounded-xl border-2 border-orange-primary/30 object-cover"
        />
        <div className="hidden sm:block">
          <p className="text-white text-xs font-bold font-poppins">Piyush Gupta</p>
          <p className="text-orange-primary text-[10px]">Super Admin</p>
        </div>
      </div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden">
      <AdminSidebar activeItem={activeSection} onItemChange={setActiveSection} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopBar />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between mb-6"
          >
            <div>
              <div className="flex items-center gap-2">
                <FaFire className="text-orange-primary" />
                <h1 className="font-poppins font-extrabold text-white text-xl sm:text-2xl">Dashboard Overview</h1>
              </div>
              <p className="text-muted text-sm mt-1 font-inter">
                Welcome back, Chef Piyush! Here is what is happening today.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg text-success text-xs font-semibold">
                🟢 Outlet Open
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-card border border-white/5 rounded-lg text-muted text-xs">
                📅 {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* KPI Cards */}
            <motion.div variants={fadeUp}>
              <KPICards />
            </motion.div>

            {/* Sales Overview + Top Selling */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <SalesOverviewChart />
              </motion.div>
              <motion.div variants={fadeUp}>
                <TopSellingPieChart />
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp}>
              <QuickActionsAdmin />
            </motion.div>

            {/* Live Delivery + Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div variants={fadeUp}>
                <LiveDeliveryMonitor />
              </motion.div>
              <motion.div variants={fadeUp}>
                <CustomerFeedbackChart />
              </motion.div>
            </div>

            {/* Sales vs Profit Line chart */}
            <motion.div variants={fadeUp}>
              <SalesProfitLineChart />
            </motion.div>

            {/* Recent Orders Table */}
            <motion.div variants={fadeUp}>
              <RecentOrdersTable />
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
