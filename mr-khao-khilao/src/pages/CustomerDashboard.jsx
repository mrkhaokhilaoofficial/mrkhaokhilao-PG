import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFire } from 'react-icons/fa'
import { HiArrowLeft } from 'react-icons/hi'
import CustomerHeader from '../components/customer/CustomerHeader'
import FeaturedBanner from '../components/customer/FeaturedBanner'
import QuickActions from '../components/customer/QuickActions'
import FoodCategories from '../components/customer/FoodCategories'
import BestSellingItems from '../components/customer/BestSellingItems'
import OrderTracking from '../components/customer/OrderTracking'
import LiveDeliveryMap from '../components/customer/LiveDeliveryMap'
import RewardSection from '../components/customer/RewardSection'
import BottomNav from '../components/customer/BottomNav'
import { staggerContainer, fadeUp } from '../animations/variants'

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <CustomerHeader />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back to Landing */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-6"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-muted text-sm hover:text-orange-primary transition-colors"
          >
            <HiArrowLeft className="text-orange-primary" />
            Back to Home
          </Link>
          <span className="text-muted text-sm">·</span>
          <span className="flex items-center gap-1.5 text-orange-primary text-sm font-semibold">
            <FaFire className="text-xs" />
            Customer Dashboard
          </span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Featured Banner */}
          <motion.div variants={fadeUp}>
            <FeaturedBanner />
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp}>
            <QuickActions />
          </motion.div>

          {/* Food Categories */}
          <motion.div variants={fadeUp}>
            <FoodCategories />
          </motion.div>

          {/* Best Selling Items */}
          <motion.div variants={fadeUp}>
            <BestSellingItems />
          </motion.div>

          {/* Order Tracking + Delivery Map (side by side on lg+) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div variants={fadeUp}>
              <OrderTracking />
            </motion.div>
            <motion.div variants={fadeUp}>
              <LiveDeliveryMap />
            </motion.div>
          </div>

          {/* Rewards Section */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RewardSection />

              {/* Recent Orders mini list */}
              <div>
                <p className="font-poppins font-bold text-white text-base mb-4">Recent Orders</p>
                <div className="space-y-3">
                  {[
                    { id: '#MKK-2401', item: 'Chaap Biryani + Paneer Tikka', amount: 398, status: 'Delivered', time: 'Today, 12:45 PM' },
                    { id: '#MKK-2395', item: 'Saoji Chaap Roll × 2', amount: 298, status: 'Delivered', time: 'Dec 18, 7:30 PM' },
                    { id: '#MKK-2381', item: 'Makhani Momos + Biryani', amount: 348, status: 'Delivered', time: 'Dec 17, 1:15 PM' },
                  ].map((order, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="flex items-center justify-between p-4 bg-bg-card border border-white/5 rounded-xl hover:border-orange-primary/15 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-primary text-xs font-bold">{order.id}</span>
                          <span className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded-full text-[10px] font-semibold">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-white text-xs mt-1 font-inter">{order.item}</p>
                        <p className="text-muted text-[10px] mt-0.5">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">₹{order.amount}</p>
                        <button className="text-orange-primary text-xs mt-1 hover:text-orange-secondary transition-colors">
                          Reorder
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}

export default CustomerDashboard
