import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { FaFire, FaHandshake, FaChartLine, FaStore, FaMapMarkerAlt } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'
import { fadeUp, staggerContainer } from '../../animations/variants'

const benefits = [
  {
    icon: <FaStore />,
    title: 'Proven Brand',
    desc: 'Leverage a recognized and loved brand from Day 1.',
    color: '#FF7A00',
  },
  {
    icon: <FaChartLine />,
    title: 'High ROI',
    desc: 'Low investment, high margin food business model.',
    color: '#FFD700',
  },
  {
    icon: <FaHandshake />,
    title: 'Full Support',
    desc: 'Training, sourcing, marketing — we handle it together.',
    color: '#FFA726',
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Exclusive Territory',
    desc: 'Your city, your territory. No competition from us.',
    color: '#FF7A00',
  },
]

// Premium ember/spark particles
const emberData = [
  { left: '5%',  bottom: '5%',  size: 4, dur: 2.2, delay: 0 },
  { left: '12%', bottom: '8%',  size: 3, dur: 1.8, delay: 0.4 },
  { left: '20%', bottom: '3%',  size: 5, dur: 2.6, delay: 0.8 },
  { left: '30%', bottom: '6%',  size: 3, dur: 1.5, delay: 0.2 },
  { left: '40%', bottom: '10%', size: 4, dur: 2.0, delay: 1.0 },
  { left: '50%', bottom: '4%',  size: 3, dur: 1.9, delay: 0.6 },
  { left: '60%', bottom: '7%',  size: 5, dur: 2.3, delay: 1.3 },
  { left: '70%', bottom: '5%',  size: 3, dur: 2.1, delay: 0.3 },
  { left: '80%', bottom: '9%',  size: 4, dur: 1.7, delay: 0.9 },
  { left: '90%', bottom: '4%',  size: 3, dur: 2.4, delay: 1.5 },
  { left: '95%', bottom: '8%',  size: 5, dur: 1.6, delay: 0.7 },
  { left: '25%', bottom: '15%', size: 3, dur: 2.8, delay: 1.1 },
  // top embers
  { left: '15%', top: '10%',   size: 3, dur: 2.0, delay: 0.5 },
  { left: '55%', top: '8%',    size: 4, dur: 2.5, delay: 1.2 },
  { left: '85%', top: '12%',   size: 3, dur: 1.8, delay: 0.8 },
]

const smokeData = [
  { left: '10%', bottom: '15%', size: 100 },
  { left: '40%', bottom: '10%', size: 140 },
  { left: '75%', bottom: '20%', size: 120 },
  { left: '60%', top: '15%',   size: 90  },
]

const FranchiseSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.franchise-ambient', {
        opacity: 0.35,
        scale: 1.08,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'power1.inOut',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="franchise"
      ref={sectionRef}
      className="relative pt-4 pb-12 md:pt-4 md:pb-16 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A0502 0%, #130500 40%, #1a0a00 60%, #0A0502 100%)' }}
    >
      {/* Main ambient glow */}
      <div className="franchise-ambient absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,80,0,0.18), transparent)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,122,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ember particles */}
      {emberData.map((e, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: e.left,
            ...(e.bottom ? { bottom: e.bottom } : { top: e.top }),
            width: e.size,
            height: e.size,
            background: i % 3 === 0 ? '#FF7A00' : i % 3 === 1 ? '#FFD700' : '#FF4500',
            boxShadow: `0 0 ${e.size * 2}px currentColor`,
          }}
          animate={{
            y: [0, -(50 + Math.random() * 60)],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40],
            opacity: [0.9, 0.5, 0],
            scale: [1, 0.5, 0],
          }}
          transition={{ duration: e.dur, repeat: Infinity, delay: e.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Smoke layers */}
      {smokeData.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: s.left,
            ...(s.bottom ? { bottom: s.bottom } : { top: s.top }),
            width: s.size,
            height: s.size,
            background: 'radial-gradient(circle, rgba(255,80,0,0.07) 0%, transparent 70%)',
          }}
          animate={{ y: [0, -40], opacity: [0, 0.5, 0], scale: [1, 2.5] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Fire line at top */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF7A00 20%, #FFD700 50%, #FF7A00 80%, transparent)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF7A00 20%, #FFD700 50%, #FF7A00 80%, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          {/* Tag */}
          <motion.div variants={fadeUp} className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.25)', color: '#FF7A00' }}
            >
              <FaHandshake /> Franchise Opportunity
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-5xl text-white mb-3 leading-tight"
          >
            Become A{' '}
            <span className="text-gradient-orange fire-text">Franchise</span> Partner
          </motion.h2>

          {/* Subheading */}
          <motion.p variants={fadeUp} className="text-sm md:text-base max-w-xl mx-auto mb-5 font-inter" style={{ color: '#A69F9B' }}>
            Join the <span className="font-semibold" style={{ color: '#D94B00' }}>fastest growing food brand</span> in Vidarbha.
            Build your business backed by a proven model and a passionate team.
          </motion.p>

          {/* Benefit cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-4xl mx-auto"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl p-4 text-left group cursor-default"
                style={{
                  background: 'rgba(20,14,11,0.7)',
                  border: `1px solid ${b.color}25`,
                  backdropFilter: 'blur(8px)',
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${b.color}55`
                  e.currentTarget.style.boxShadow = `0 8px 30px ${b.color}20`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${b.color}25`
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)'
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5"
                  style={{ background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}30` }}
                >
                  {b.icon}
                </div>
                <h4 className="font-poppins font-bold text-white text-xs mb-0.5">{b.title}</h4>
                <p className="text-[11px] leading-relaxed" style={{ color: '#A69F9B' }}>{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              to="/franchise/apply"
              className="inline-flex items-center gap-3 px-8 py-3.5 font-poppins font-bold text-sm md:text-base text-white rounded-xl cursor-pointer hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(135deg, #D94B00, #E05300)',
                boxShadow: '0 0 12px rgba(217,75,0,0.15)',
              }}
            >
              <FaFire className="text-base" />
              Apply Now
              <HiArrowRight className="text-base" />
            </Link>
            <p className="text-[11px] mt-2.5" style={{ color: '#A69F9B' }}>
              📧 franchise@mrkhaokhilao.com · Forms reviewed within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FranchiseSection
