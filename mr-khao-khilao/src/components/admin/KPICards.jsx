import { motion } from 'framer-motion'
import { FaRupeeSign, FaShoppingBag, FaChartLine, FaUsers } from 'react-icons/fa'
import { HiArrowUp, HiArrowDown } from 'react-icons/hi'
import { kpiData } from '../../data/analytics'
import useInView from '../../hooks/useInView'
import useCounterAnimation from '../../hooks/useCounterAnimation'
import { staggerContainer, scaleIn } from '../../animations/variants'

const kpiConfig = [
  {
    id: 'sales',
    label: "Today's Sales",
    value: kpiData.todaySales,
    growth: kpiData.salesGrowth,
    icon: <FaRupeeSign />,
    prefix: '₹',
    color: '#FF7A00',
    bg: 'from-orange-primary/15 to-transparent',
    border: 'border-orange-primary/20',
    format: (v) => v.toLocaleString('en-IN'),
  },
  {
    id: 'orders',
    label: 'Orders Today',
    value: kpiData.ordersToday,
    growth: kpiData.ordersGrowth,
    icon: <FaShoppingBag />,
    color: '#FFA726',
    bg: 'from-orange-secondary/15 to-transparent',
    border: 'border-orange-secondary/20',
    format: (v) => v.toString(),
  },
  {
    id: 'profit',
    label: 'Monthly Profit',
    value: kpiData.monthlyProfit,
    growth: kpiData.profitGrowth,
    icon: <FaChartLine />,
    prefix: '₹',
    color: '#22C55E',
    bg: 'from-success/15 to-transparent',
    border: 'border-success/20',
    format: (v) => v.toLocaleString('en-IN'),
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: kpiData.activeCustomers,
    growth: kpiData.customersGrowth,
    icon: <FaUsers />,
    color: '#FFD700',
    bg: 'from-gold/15 to-transparent',
    border: 'border-gold/20',
    format: (v) => v.toLocaleString('en-IN'),
  },
]

const KPICard = ({ kpi }) => {
  const [ref, inView] = useInView(0.3)
  const count = useCounterAnimation(kpi.value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative bg-gradient-to-br ${kpi.bg} bg-bg-card border ${kpi.border} rounded-2xl p-5 overflow-hidden`}
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none"
        style={{ background: kpi.color }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted text-xs font-medium font-inter">{kpi.label}</p>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm"
            style={{ background: `${kpi.color}20`, color: kpi.color, border: `1px solid ${kpi.color}25` }}
          >
            {kpi.icon}
          </div>
        </div>

        {/* Value */}
        <p className="font-poppins font-extrabold text-white text-2xl sm:text-3xl leading-none">
          {kpi.prefix}{kpi.format(count)}
        </p>

        {/* Growth */}
        <div className={`flex items-center gap-1.5 mt-3 text-xs font-semibold ${kpi.growth >= 0 ? 'text-success' : 'text-danger'}`}>
          {kpi.growth >= 0 ? <HiArrowUp /> : <HiArrowDown />}
          {Math.abs(kpi.growth)}% vs last month
        </div>
      </div>
    </motion.div>
  )
}

const KPICards = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 xl:grid-cols-4 gap-4"
    >
      {kpiConfig.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </motion.div>
  )
}

export default KPICards
