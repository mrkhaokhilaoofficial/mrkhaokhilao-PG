import { motion } from 'framer-motion'
import { recentOrders, statusColors } from '../../data/orders'
import { fadeUp } from '../../animations/variants'

const RecentOrdersTable = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <p className="font-poppins font-bold text-white text-base">Recent Orders</p>
          <p className="text-muted text-xs mt-0.5">Last 5 orders across all customers</p>
        </div>
        <button className="text-orange-primary text-xs font-semibold hover:text-orange-secondary transition-colors">
          View All →
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Time'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-muted text-xs font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="border-b border-white/3 hover:bg-white/2 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <span className="text-orange-primary text-sm font-bold">{order.id}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src={order.avatar} alt={order.customer} className="w-8 h-8 rounded-lg object-cover" />
                    <span className="text-white text-sm font-medium">{order.customer}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-muted text-xs">{order.items.join(', ')}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-white font-bold text-sm">₹{order.amount}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold border"
                    style={{
                      color: statusColors[order.status],
                      background: `${statusColors[order.status]}15`,
                      borderColor: `${statusColors[order.status]}30`,
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-muted text-xs">{order.time}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-white/5">
        {recentOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.07 }}
            className="p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <img src={order.avatar} alt={order.customer} className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="text-white text-xs font-bold">{order.customer}</p>
                  <p className="text-orange-primary text-xs">{order.id}</p>
                </div>
              </div>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ color: statusColors[order.status], background: `${statusColors[order.status]}15` }}
              >
                {order.status}
              </span>
            </div>
            <p className="text-muted text-xs">{order.items.join(', ')}</p>
            <div className="flex justify-between mt-2">
              <span className="text-muted text-xs">{order.time}</span>
              <span className="text-white font-bold text-sm">₹{order.amount}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default RecentOrdersTable
