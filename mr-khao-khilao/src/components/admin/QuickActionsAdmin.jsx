import { motion } from 'framer-motion'
import { FaPlus, FaTag, FaCodeBranch, FaFileAlt } from 'react-icons/fa'
import { staggerContainer, scaleIn } from '../../animations/variants'

const actions = [
  {
    icon: <FaPlus />,
    label: 'Add Menu Item',
    color: '#FF7A00',
    bg: 'from-orange-primary/15 to-transparent',
    border: 'border-orange-primary/20',
  },
  {
    icon: <FaTag />,
    label: 'Create Coupon',
    color: '#FFD700',
    bg: 'from-gold/15 to-transparent',
    border: 'border-gold/20',
  },
  {
    icon: <FaCodeBranch />,
    label: 'Add Branch',
    color: '#FFA726',
    bg: 'from-orange-secondary/15 to-transparent',
    border: 'border-orange-secondary/20',
  },
  {
    icon: <FaFileAlt />,
    label: 'Generate Report',
    color: '#22C55E',
    bg: 'from-success/15 to-transparent',
    border: 'border-success/20',
  },
]

const QuickActionsAdmin = () => {
  return (
    <div>
      <p className="font-poppins font-bold text-white text-base mb-4">Quick Actions</p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {actions.map((action, i) => (
          <motion.button
            key={i}
            variants={scaleIn}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${action.bg} bg-bg-card border ${action.border} cursor-pointer group transition-all hover:shadow-[0_4px_20px_rgba(255,122,0,0.15)]`}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform"
              style={{ background: `${action.color}20`, color: action.color, border: `1px solid ${action.color}25` }}
            >
              {action.icon}
            </div>
            <span className="font-poppins font-bold text-white text-xs text-center">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default QuickActionsAdmin
