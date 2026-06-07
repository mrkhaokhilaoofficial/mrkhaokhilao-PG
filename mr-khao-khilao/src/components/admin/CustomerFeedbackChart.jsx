import { motion } from 'framer-motion'
import {
  RadialBarChart, RadialBar, ResponsiveContainer, Tooltip
} from 'recharts'
import { feedbackAnalytics } from '../../data/analytics'
import { fadeUp } from '../../animations/variants'
import useInView from '../../hooks/useInView'

const sentimentData = [
  { name: 'Positive', value: feedbackAnalytics.positive, fill: '#22C55E' },
  { name: 'Neutral', value: feedbackAnalytics.neutral, fill: '#FFA726' },
  { name: 'Negative', value: feedbackAnalytics.negative, fill: '#EF4444' },
]

const CustomerFeedbackChart = () => {
  const [ref, inView] = useInView(0.3)

  const ratingBars = [
    { label: '5 ⭐', value: 65, color: '#22C55E' },
    { label: '4 ⭐', value: 20, color: '#FFD700' },
    { label: '3 ⭐', value: 9, color: '#FFA726' },
    { label: '2 ⭐', value: 4, color: '#FF5722' },
    { label: '1 ⭐', value: 2, color: '#EF4444' },
  ]

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="mb-5">
        <p className="font-poppins font-bold text-white text-base">Customer Feedback</p>
        <p className="text-muted text-xs mt-0.5">Based on {feedbackAnalytics.totalReviews.toLocaleString()} reviews</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Radial chart */}
        <div>
          <div className="relative h-40">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="90%"
                data={sentimentData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={4} />
                <Tooltip
                  formatter={(v, n) => [`${v}%`, n]}
                  contentStyle={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
                  labelStyle={{ color: '#FFF' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="font-poppins font-extrabold text-white text-2xl">{feedbackAnalytics.averageRating}</p>
              <p className="text-muted text-xs">Avg Rating</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-3">
            {sentimentData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.fill }} />
                <span className="text-muted text-xs">{d.name}</span>
                <span className="text-white text-xs font-bold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating bars */}
        <div className="space-y-2.5">
          {ratingBars.map((bar, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-muted text-xs font-medium w-8 shrink-0">{bar.label}</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: bar.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${bar.value}%` } : { width: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 + 0.3 }}
                />
              </div>
              <span className="text-muted text-xs w-8 text-right">{bar.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CustomerFeedbackChart
