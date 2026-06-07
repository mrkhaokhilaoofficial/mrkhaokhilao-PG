import { motion } from 'framer-motion'
import { FaFire } from 'react-icons/fa'

const words = [
  { text: 'PASSION', icon: '❤️' },
  { text: 'HARDWORK', icon: '💪' },
  { text: 'CREATIVITY', icon: '✨' },
  { text: 'PASSION', icon: '❤️' },
  { text: 'HARDWORK', icon: '💪' },
  { text: 'CREATIVITY', icon: '✨' },
  { text: 'PASSION', icon: '❤️' },
  { text: 'HARDWORK', icon: '💪' },
  { text: 'CREATIVITY', icon: '✨' },
]

const BrandStrip = () => {
  return (
    <section className="relative py-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(255,122,0,0.15), rgba(26,8,0,0.9), rgba(255,122,0,0.1))' }}
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF7A00, #FFD700, #FF7A00, transparent)' }}
      />
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF7A00, #FFD700, #FF7A00, transparent)' }}
      />

      {/* Scrolling ticker */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {words.map((w, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <FaFire style={{ color: '#FF7A00', fontSize: 14 }} />
              <span className="font-poppins font-extrabold text-sm md:text-base tracking-widest"
                style={{ color: i % 3 === 0 ? '#FF7A00' : i % 3 === 1 ? '#FFD700' : '#FFA726' }}
              >
                {w.text}
              </span>
              <span className="text-base">{w.icon}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Center hero text */}
      <div className="text-center mt-6 mb-2">
        <p className="font-poppins font-extrabold text-xl md:text-3xl tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #FF7A00, #FFD700, #FF7A00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 12px rgba(255,122,0,0.5))',
          }}
        >
          YEH HAI HAMARA RECIPE
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #FF7A00)' }} />
          <FaFire style={{ color: '#FF7A00' }} />
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #FF7A00)' }} />
        </div>
      </div>
    </section>
  )
}

export default BrandStrip
