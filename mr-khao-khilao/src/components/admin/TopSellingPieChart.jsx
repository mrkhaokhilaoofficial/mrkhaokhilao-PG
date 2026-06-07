import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { topSellingItems } from '../../data/analytics'
import { fadeUp } from '../../animations/variants'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0]
    return (
      <div className="bg-bg-card border border-white/10 rounded-xl p-3 shadow-card">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ background: d.payload.color }} />
          <span className="text-white text-sm font-semibold">{d.name}</span>
        </div>
        <p className="text-orange-primary font-bold text-sm mt-1">{d.value}%</p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }) => (
  <div className="flex flex-col gap-2 mt-4">
    {payload.map((entry, i) => (
      <div key={i} className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: entry.color }} />
          <span className="text-muted text-xs font-inter truncate max-w-[130px]">{entry.value}</span>
        </div>
        <span className="text-white text-xs font-bold shrink-0">{entry.payload.value}%</span>
      </div>
    ))}
  </div>
)

const TopSellingPieChart = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="mb-4">
        <p className="font-poppins font-bold text-white text-base">Top Selling Items</p>
        <p className="text-muted text-xs mt-0.5">Distribution by order volume</p>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topSellingItems}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
            >
              {topSellingItems.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend payload={topSellingItems.map(item => ({ value: item.name, color: item.color, payload: item }))} />
    </motion.div>
  )
}

export default TopSellingPieChart
