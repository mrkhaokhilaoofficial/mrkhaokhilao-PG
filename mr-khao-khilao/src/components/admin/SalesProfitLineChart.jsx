import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { monthlySalesData } from '../../data/analytics'
import { fadeUp } from '../../animations/variants'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-card border border-white/10 rounded-xl p-3 shadow-card">
        <p className="text-white font-bold text-xs mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted">{p.name}:</span>
            <span className="text-white font-semibold">₹{p.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const SalesProfitLineChart = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-poppins font-bold text-white text-base">Sales vs Profit</p>
          <p className="text-muted text-xs mt-0.5">Monthly comparison — FY 2024</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-orange-primary" style={{ borderRadius: 2 }} />
            <span className="text-muted text-xs">Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-success" style={{ borderRadius: 2 }} />
            <span className="text-muted text-xs">Profit</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlySalesData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#B3B3B3', fontSize: 11, fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#B3B3B3', fontSize: 10, fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="#FF7A00"
              strokeWidth={2.5}
              dot={{ fill: '#FF7A00', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#FF7A00', stroke: 'rgba(255,122,0,0.3)', strokeWidth: 4 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="#22C55E"
              strokeWidth={2.5}
              dot={{ fill: '#22C55E', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#22C55E', stroke: 'rgba(34,197,94,0.3)', strokeWidth: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default SalesProfitLineChart
