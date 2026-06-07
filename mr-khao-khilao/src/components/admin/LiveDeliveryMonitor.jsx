import { motion } from 'framer-motion'
import { FaStar, FaMotorcycle, FaPhone, FaCircle } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { drivers } from '../../data/drivers'
import { fadeUp, staggerContainer } from '../../animations/variants'

const statusColor = {
  'On Delivery': '#FF7A00',
  'Available': '#22C55E',
}

// Mini animated map
const MiniMap = () => (
  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-bg-secondary border border-white/5">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,122,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,0.06) 1px, transparent 1px)',
        backgroundSize: '25px 25px',
      }}
    />
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
      <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,122,0,0.12)" strokeWidth="6" />
      <line x1="200" y1="0" x2="200" y2="160" stroke="rgba(255,122,0,0.12)" strokeWidth="4" />
      <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
      <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />

      {/* Driver 1 route */}
      <motion.path d="M 320 130 L 250 80 L 150 80 L 80 50"
        stroke="#FF7A00" strokeWidth="2" strokeDasharray="6 3" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }} />

      {/* Driver 2 route */}
      <motion.path d="M 350 40 L 300 80 L 200 80 L 120 120"
        stroke="#FFA726" strokeWidth="2" strokeDasharray="6 3" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.5 }} />

      {/* Driver dots */}
      <motion.circle cx="220" cy="80" r="6" fill="#FF7A00"
        animate={{ cx: [220, 180, 140, 100] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.circle cx="310" cy="55" r="6" fill="#FFA726"
        animate={{ cx: [310, 260, 220, 170] }} transition={{ duration: 10, repeat: Infinity }} />

      {/* Outlet */}
      <circle cx="200" cy="80" r="8" fill="rgba(255,122,0,0.8)" />
      <circle cx="200" cy="80" r="12" fill="rgba(255,122,0,0.2)" />
    </svg>

    <div className="absolute bottom-2 right-2">
      <span className="px-2 py-0.5 bg-bg-primary/80 text-muted text-[10px] rounded border border-white/5">Live Map</span>
    </div>
    <div className="absolute top-2 left-2 flex items-center gap-1">
      <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
      <span className="text-orange-primary text-[10px] font-bold">2 drivers active</span>
    </div>
  </div>
)

const LiveDeliveryMonitor = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-bg-card border border-white/5 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-poppins font-bold text-white text-base">Live Delivery Monitoring</p>
          <p className="text-muted text-xs mt-0.5">{drivers.filter(d => d.status === 'On Delivery').length} deliveries in progress</p>
        </div>
        <span className="flex items-center gap-1.5 text-success text-xs font-semibold">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          Live
        </span>
      </div>

      <MiniMap />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-4 space-y-3"
      >
        {drivers.map((driver, i) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between gap-3 p-3 bg-bg-secondary rounded-xl border border-white/5 hover:border-orange-primary/15 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={driver.avatar} alt={driver.name} className="w-10 h-10 rounded-xl object-cover" />
                <FaCircle
                  className="absolute -bottom-0.5 -right-0.5 text-xs"
                  style={{ color: statusColor[driver.status] || '#B3B3B3' }}
                />
              </div>
              <div>
                <p className="text-white text-xs font-bold font-poppins">{driver.name}</p>
                <p className="text-muted text-[10px] flex items-center gap-1">
                  <FaMotorcycle className="text-orange-primary" />
                  {driver.vehicle.split('—')[0].trim()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] text-muted">Orders Today</p>
                <p className="text-white text-xs font-bold">{driver.completedToday}</p>
              </div>
              {driver.eta && (
                <div className="text-right">
                  <p className="text-[10px] text-muted">ETA</p>
                  <p className="text-orange-primary text-xs font-bold flex items-center gap-1">
                    <HiClock />
                    {driver.eta}
                  </p>
                </div>
              )}
              <span
                className="px-2 py-1 rounded-full text-[10px] font-bold border"
                style={{
                  color: statusColor[driver.status],
                  background: `${statusColor[driver.status]}15`,
                  borderColor: `${statusColor[driver.status]}30`,
                }}
              >
                {driver.status}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LiveDeliveryMonitor
