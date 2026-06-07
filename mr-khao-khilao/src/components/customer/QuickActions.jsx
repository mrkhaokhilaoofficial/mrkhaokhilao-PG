import { motion } from 'framer-motion'
import { FaUtensils, FaClipboardList, FaMapMarkerAlt, FaTag, FaStar } from 'react-icons/fa'
import { staggerContainer, scaleIn } from '../../animations/variants'

const actions = [
  {
    icon: <FaUtensils />,
    label: 'Menu',
    sublabel: '8+ items',
    color: '#FF7A00',
    bg: 'from-orange-primary/20 to-orange-secondary/5',
    border: 'border-orange-primary/20',
  },
  {
    icon: <FaClipboardList />,
    label: 'My Orders',
    sublabel: '5 orders',
    color: '#FFD700',
    bg: 'from-gold/20 to-orange-secondary/5',
    border: 'border-gold/20',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Track Order',
    sublabel: 'Live tracking',
    color: '#22C55E',
    bg: 'from-success/20 to-success/5',
    border: 'border-success/20',
  },
  {
    icon: <FaTag />,
    label: 'Offers',
    sublabel: '3 active',
    color: '#FFA726',
    bg: 'from-orange-secondary/20 to-orange-primary/5',
    border: 'border-orange-secondary/20',
  },
  {
    icon: <FaStar />,
    label: 'Rewards',
    sublabel: '320 pts',
    color: '#FFD700',
    bg: 'from-gold/20 to-orange-secondary/5',
    border: 'border-gold/20',
  },
]

const QuickActions = () => {
  return (
    <div>
      <p className="font-poppins font-bold text-white text-base mb-4">Quick Actions</p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-5 gap-3"
      >
        {actions.map((action, i) => (
          <motion.button
            key={i}
            variants={scaleIn}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350 }}
            className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${action.bg} border ${action.border} cursor-pointer group`}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-xl mb-2 group-hover:scale-110 transition-transform"
              style={{ background: `${action.color}20`, color: action.color }}
            >
              {action.icon}
            </div>
            <p className="font-poppins font-bold text-white text-xs text-center leading-tight">{action.label}</p>
            <p className="text-muted text-[10px] mt-0.5 hidden sm:block">{action.sublabel}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default QuickActions
