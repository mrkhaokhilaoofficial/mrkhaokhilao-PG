import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'
import { monthlySalesData } from '../../data/analytics'
import { fadeUp } from '../../animations/variants'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-card border border-white/10 rounded-xl p-3 shadow-card">
        <p className="text-white font-bold text-sm mb-2">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
            <span className="text-muted capitalize">{p.name}:</span>
            <span className="text-white font-semibold">₹{p.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const SalesOverviewChart = () => {
  const currentMonth = new Date().getMonth()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-poppins font-bold text-white text-base">Sales Overview</p>
          <p className="text-muted text-xs mt-0.5">Monthly revenue breakdown</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-orange-primary" />
            <span className="text-muted text-xs">Sales</span>
          </div>
          <select className="text-xs text-muted bg-bg-secondary border border-white/10 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-primary/50">
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </div>

      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlySalesData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }} barSize={20}>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,122,0,0.06)', radius: 8 }} />
            <Bar dataKey="sales" name="sales" radius={[6, 6, 0, 0]}>
              {monthlySalesData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === currentMonth ? '#FF7A00' : 'rgba(255,122,0,0.3)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default SalesOverviewChart
