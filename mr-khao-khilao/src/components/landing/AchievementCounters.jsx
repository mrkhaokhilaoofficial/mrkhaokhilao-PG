import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaUtensils, FaUsers, FaCodeBranch, FaRocket } from 'react-icons/fa'
import useInView from '../../hooks/useInView'
import useCounterAnimation from '../../hooks/useCounterAnimation'
import { staggerContainer, scaleIn } from '../../animations/variants'

const achievements = [
  {
    icon: <FaRocket />,
    value: 22,
    suffix: '+',
    label: 'Journey Started',
    sublabel: 'Months of Excellence',
    color: '#FF7A00',
    bg: 'from-orange-primary/20 to-orange-secondary/10',
    border: 'border-orange-primary/20',
  },
  {
    icon: <FaMapMarkerAlt />,
    value: 5,
    suffix: '+',
    label: 'Cities Experience',
    sublabel: 'Across India',
    color: '#FFD700',
    bg: 'from-gold/20 to-orange-secondary/10',
    border: 'border-gold/20',
  },
  {
    icon: <FaUtensils />,
    value: 100,
    suffix: '+',
    label: 'Recipes',
    sublabel: 'Perfected Over Years',
    color: '#FF7A00',
    bg: 'from-orange-primary/20 to-orange-secondary/10',
    border: 'border-orange-primary/20',
  },
  {
    icon: <FaUsers />,
    value: 10,
    suffix: 'L+',
    label: 'Content Reach',
    sublabel: 'Across Social Media',
    color: '#FFD700',
    bg: 'from-gold/20 to-orange-secondary/10',
    border: 'border-gold/20',
    isLakh: true,
  },
  {
    icon: <FaCodeBranch />,
    value: 3,
    suffix: '+',
    label: 'Upcoming Branches',
    sublabel: 'Expanding Across Vidarbha',
    color: '#FF7A00',
    bg: 'from-orange-primary/20 to-orange-secondary/10',
    border: 'border-orange-primary/20',
  },
]

const CounterCard = ({ achievement, index }) => {
  const [ref, inView] = useInView(0.3)
  const count = useCounterAnimation(achievement.value, 2000, inView)

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative bg-gradient-to-br ${achievement.bg} backdrop-blur-sm border ${achievement.border} rounded-2xl p-6 flex flex-col items-center text-center group overflow-hidden`}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${achievement.color}15, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 relative z-10"
        style={{ background: `${achievement.color}20`, color: achievement.color, border: `1px solid ${achievement.color}30` }}
      >
        {achievement.icon}
      </div>

      {/* Counter */}
      <div className="relative z-10">
        <p className="font-poppins font-extrabold text-4xl md:text-5xl text-white leading-none">
          {achievement.isLakh ? (
            <>
              <span>{count}</span>
              <span style={{ color: achievement.color }}>{achievement.suffix}</span>
            </>
          ) : (
            <>
              <span>{count}</span>
              <span style={{ color: achievement.color }}>{achievement.suffix}</span>
            </>
          )}
        </p>
        <p className="mt-2 font-poppins font-bold text-white text-base">{achievement.label}</p>
        <p className="mt-1 text-muted text-xs font-inter">{achievement.sublabel}</p>
      </div>
    </motion.div>
  )
}

const AchievementCounters = () => {
  return (
    <section className="py-16 md:py-20 bg-bg-secondary relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,122,0,0.08), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {achievements.map((achievement, index) => (
            <CounterCard key={index} achievement={achievement} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AchievementCounters
