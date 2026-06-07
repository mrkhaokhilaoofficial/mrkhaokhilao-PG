import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaFire } from 'react-icons/fa'
import { HiExternalLink } from 'react-icons/hi'
import { MdConstruction } from 'react-icons/md'
import { branches } from '../../data/branches'
import SectionTitle from '../ui/SectionTitle'
import { staggerContainer, fadeUp } from '../../animations/variants'

// ── Active outlet card ─────────────────────────────────────────────────────────
const ActiveOutletCard = ({ branch }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 280 }}
    className="relative rounded-2xl overflow-hidden"
    style={{
      border: '2px solid rgba(255,122,0,0.45)',
      boxShadow: '0 0 30px rgba(255,122,0,0.2), 0 4px 24px rgba(0,0,0,0.5)',
    }}
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={branch.image}
        alt={branch.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/95 via-bg-card/20 to-transparent" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22C55E' }}
        >
          🟢 OPEN NOW
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(255,122,0,0.9)', color: '#fff' }}
        >
          ★ Flagship
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5" style={{ background: 'rgba(26,26,26,0.98)' }}>
      <h3 className="font-poppins font-bold text-white text-base leading-snug">{branch.name}</h3>
      <p className="text-xs font-semibold mt-0.5" style={{ color: '#FF7A00' }}>{branch.tagline}</p>
      <p className="text-xs mt-0.5" style={{ color: '#B3B3B3' }}>{branch.city}, {branch.state}</p>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)' }}>
          <FaStar style={{ color: '#FFD700', fontSize: 10 }} />
          <span className="text-xs font-bold" style={{ color: '#FFD700' }}>{branch.rating}</span>
        </div>
        <span className="text-xs" style={{ color: '#B3B3B3' }}>{branch.totalReviews.toLocaleString()} reviews</span>
      </div>

      <div className="mt-4 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <FaMapMarkerAlt style={{ color: '#FF7A00', fontSize: 11 }} className="mt-0.5 shrink-0" />
          <span className="text-xs leading-relaxed" style={{ color: '#B3B3B3' }}>{branch.address}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <FaPhone style={{ color: '#FF7A00', fontSize: 11 }} className="shrink-0" />
          <a href={`tel:${branch.phone}`} className="text-xs hover:text-orange-primary transition-colors" style={{ color: '#B3B3B3' }}>
            {branch.phone}
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <FaClock style={{ color: '#FF7A00', fontSize: 11 }} className="shrink-0" />
          <span className="text-xs" style={{ color: '#B3B3B3' }}>{branch.hours}</span>
        </div>
      </div>

      <button
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold transition-all hover:gap-2.5"
        style={{ color: '#FF7A00' }}
      >
        <HiExternalLink /> View on Map
      </button>
    </div>
  </motion.div>
)

// ── Coming soon card ───────────────────────────────────────────────────────────
const ComingSoonCard = ({ branch }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 280 }}
    className="relative rounded-2xl overflow-hidden group"
    style={{
      border: '1px dashed rgba(255,122,0,0.25)',
      background: 'rgba(26,26,26,0.6)',
    }}
  >
    {/* Construction placeholder visual */}
    <div className="relative h-44 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D0D0D, #1a0800)' }}
    >
      {/* Animated glow dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,122,0,0.08), transparent)' }}
      />

      <MdConstruction style={{ fontSize: 40, color: 'rgba(255,122,0,0.4)' }} />
      <p className="mt-2 font-poppins font-bold text-xs tracking-widest uppercase" style={{ color: 'rgba(255,122,0,0.6)' }}>
        Under Planning
      </p>

      {/* Coming soon badge */}
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(255,122,0,0.12)', border: '1px solid rgba(255,122,0,0.25)', color: '#FFA726' }}
        >
          🔜 Coming Soon
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-poppins font-bold text-white text-sm leading-snug">{branch.name}</h3>
      <p className="text-xs mt-0.5" style={{ color: '#FF7A00' }}>{branch.city}, {branch.state}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FaClock style={{ color: 'rgba(255,122,0,0.5)', fontSize: 10 }} />
          <span className="text-xs" style={{ color: '#B3B3B3' }}>Expected: {branch.established}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,122,0,0.6)' }}>Future Expansion · Stay Tuned!</p>
      </div>
    </div>
  </motion.div>
)

const OutletsSection = () => {
  const currentOutlet = branches.find(b => b.isCurrent)
  const upcomingBranches = branches.filter(b => !b.isCurrent)

  return (
    <section id="outlets" className="py-16 md:py-24 bg-bg-secondary relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(255,122,0,0.06), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          tag="Find Us"
          title="Our"
          highlight="Outlets"
          subtitle="One flagship open today — many more cities coming soon. We are expanding fast."
        />

        {/* Active outlet — full width accent */}
        <div className="mt-12 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaFire style={{ color: '#FF7A00' }} />
            <h3 className="font-poppins font-bold text-white text-sm tracking-widest uppercase">Active Outlet</h3>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(255,122,0,0.3), transparent)' }} />
          </div>
          <div className="max-w-sm">
            {currentOutlet && <ActiveOutletCard branch={currentOutlet} />}
          </div>
        </div>

        {/* Coming soon */}
        <div className="flex items-center gap-3 mb-6 mt-10">
          <MdConstruction style={{ color: 'rgba(255,122,0,0.6)' }} />
          <h3 className="font-poppins font-bold text-white text-sm tracking-widest uppercase">Upcoming Branches</h3>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(255,122,0,0.2), transparent)' }} />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {upcomingBranches.map(branch => (
            <ComingSoonCard key={branch.id} branch={branch} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OutletsSection
