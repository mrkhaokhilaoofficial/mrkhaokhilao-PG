import { motion } from 'framer-motion'
import { FaStar, FaGift, FaFire } from 'react-icons/fa'
import { rewardsData, offers } from '../../data/rewards'
import { fadeUp, staggerContainer } from '../../animations/variants'
import useInView from '../../hooks/useInView'

const RewardSection = () => {
  const [ref, inView] = useInView(0.3)
  const { currentPoints, nextMilestone, tier, milestones } = rewardsData

  const progress = (currentPoints / nextMilestone) * 100

  return (
    <div className="space-y-4">
      {/* Points Card */}
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-bg-card border border-gold/20 rounded-2xl p-5 sm:p-6"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #1a1500 100%)' }}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaStar className="text-gold text-sm" />
                <span className="text-gold text-xs font-bold tracking-wider uppercase">{tier} Member</span>
              </div>
              <p className="font-poppins font-extrabold text-5xl text-white">
                {currentPoints}
              </p>
              <p className="text-muted text-sm mt-1">Reward Points</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <FaGift className="text-gold text-2xl" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted">{currentPoints} pts</span>
            <span className="text-muted">{nextMilestone} pts to next reward</span>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold to-orange-secondary"
              initial={{ width: 0 }}
              animate={inView ? { width: `${progress}%` } : { width: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2.5 bg-gradient-to-r from-gold to-orange-secondary text-black font-poppins font-bold text-sm rounded-xl hover:brightness-110 transition-all"
            >
              Redeem Points
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-4 py-2.5 border border-gold/30 text-gold text-sm font-semibold rounded-xl hover:bg-gold/10 transition-all"
            >
              History
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Milestones */}
      <div>
        <p className="font-poppins font-bold text-white text-sm mb-3">Milestones</p>
        <div className="grid grid-cols-2 gap-2">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all
                ${m.achieved
                  ? 'bg-success/10 border-success/30'
                  : 'bg-bg-card border-white/5'
                }`}
            >
              <span className="text-lg">{m.achieved ? '✅' : '🎯'}</span>
              <div>
                <p className={`text-xs font-bold font-poppins ${m.achieved ? 'text-success' : 'text-muted'}`}>
                  {m.points} pts
                </p>
                <p className="text-muted text-[10px]">{m.reward}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Offers */}
      <div>
        <p className="font-poppins font-bold text-white text-sm mb-3">Active Offers</p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 bg-bg-card border border-white/5 rounded-xl hover:border-orange-primary/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs"
                  style={{ background: `${offer.color}20`, color: offer.color, border: `1px solid ${offer.color}30` }}
                >
                  {offer.discount}
                </div>
                <div>
                  <p className="text-white text-xs font-bold font-poppins">{offer.title}</p>
                  <p className="text-muted text-[10px]">Min ₹{offer.minOrder} · Till {offer.validTill}</p>
                </div>
              </div>
              <button className="text-orange-primary text-xs font-bold hover:text-orange-secondary transition-colors">
                Apply
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default RewardSection
