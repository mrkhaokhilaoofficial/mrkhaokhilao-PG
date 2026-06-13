import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaPlay, FaFire, FaStar, FaQuoteLeft } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import gsap from 'gsap'
import Button from '../ui/Button'
import { fadeUp, slideRight, slideLeft, staggerContainer } from '../../animations/variants'

// ─── Actual chef images from assets ───────────────────────────────────────────
import chef1 from '../../assets/1.jpeg'
import chef2 from '../../assets/2.jpeg'

const carouselImages = [
  { src: chef1, label: 'Chef Piyush Gupta' },
  { src: chef2, label: 'Chef Cooking' },
]

// ─── Premium embers and flames (no vegetables) ──────────────────────────────────
const EmberParticle = ({ style, duration, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={style}
    animate={{
      y: [0, -120 - Math.random() * 80],
      x: [0, (Math.random() - 0.5) * 60],
      opacity: [0, 0.8, 0.5, 0],
      scale: [0.4, 1, 0.5, 0],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
  />
)

const SmokeLayer = ({ style, duration, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ background: 'radial-gradient(circle, rgba(217,75,0,0.06) 0%, transparent 70%)', ...style }}
    animate={{
      y: [0, -50],
      opacity: [0, 0.35, 0],
      scale: [0.8, 2.2],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeOut' }}
  />
)

const embers = [
  { style: { left: '55%', bottom: '8%', width: 4, height: 4, background: '#D94B00', borderRadius: '50%' }, duration: 2.2, delay: 0 },
  { style: { left: '60%', bottom: '5%', width: 3, height: 3, background: '#E5B13C', borderRadius: '50%' }, duration: 1.8, delay: 0.4 },
  { style: { left: '65%', bottom: '10%', width: 5, height: 5, background: '#C23B22', borderRadius: '50%' }, duration: 2.6, delay: 0.8 },
  { style: { left: '52%', bottom: '3%', width: 3, height: 6, background: 'linear-gradient(to top, #D94B00, transparent)', borderRadius: 2 }, duration: 1.5, delay: 0.2 },
  { style: { left: '68%', bottom: '6%', width: 3, height: 3, background: '#E05300', borderRadius: '50%' }, duration: 2.0, delay: 1.0 },
  { style: { left: '58%', bottom: '15%', width: 2, height: 2, background: '#E5B13C', borderRadius: '50%' }, duration: 1.6, delay: 1.4 },
  { style: { left: '72%', bottom: '8%', width: 4, height: 4, background: '#D94B00', borderRadius: '50%' }, duration: 2.4, delay: 0.6 },
  { style: { left: '48%', bottom: '12%', width: 3, height: 3, background: '#D94B00', borderRadius: '50%' }, duration: 1.9, delay: 1.8 },
  // Small glowing sparks
  { style: { left: '62%', bottom: '20%', width: 5, height: 5, background: '#C23B22', borderRadius: '50%', boxShadow: '0 0 6px #C23B22' }, duration: 3.0, delay: 0.9 },
  { style: { left: '50%', bottom: '18%', width: 4, height: 4, background: '#D94B00', borderRadius: '50%', boxShadow: '0 0 6px #D94B00' }, duration: 2.8, delay: 1.2 },
]

const smokes = [
  { style: { left: '55%', bottom: '18%', width: 80, height: 80 }, duration: 4, delay: 0 },
  { style: { left: '62%', bottom: '10%', width: 100, height: 100 }, duration: 5, delay: 1.5 },
  { style: { left: '48%', bottom: '22%', width: 60, height: 60 }, duration: 3.5, delay: 0.8 },
]

// ─── Flickering Hero Background Flames ──────────────────────────────────────────────
const HeroBackgroundFlames = () => (
  <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none select-none z-0 overflow-hidden">
    {/* Flickering glow */}
    <motion.div
      className="absolute inset-0 opacity-40 mix-blend-screen"
      style={{
        background: 'radial-gradient(ellipse at bottom, rgba(217,75,0,0.65) 0%, rgba(217,75,0,0.18) 50%, transparent 80%)'
      }}
      animate={{
        opacity: [0.35, 0.5, 0.38, 0.48, 0.35],
        scaleY: [1, 1.08, 0.96, 1.04, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    
    {/* Visual flames across the entire bottom */}
    <div className="absolute bottom-[-15px] left-0 right-0 h-28 flex items-end justify-between opacity-50 mix-blend-screen px-2">
      {[...Array(28)].map((_, i) => {
        const height = 45 + Math.random() * 65;
        const width = 14 + Math.random() * 22;
        return (
          <motion.div
            key={i}
            className="rounded-t-full"
            style={{
              width,
              height,
              background: 'linear-gradient(to top, #D94B00 30%, #E5B13C 75%, transparent)',
              filter: 'blur(5px)',
              transformOrigin: 'bottom center',
            }}
            animate={{
              height: [height, height * 1.3, height * 0.85, height * 1.15, height],
              opacity: [0.55, 0.85, 0.45, 0.75, 0.55],
              x: [0, (Math.random() - 0.5) * 8, 0]
            }}
            transition={{
              duration: 1.0 + Math.random() * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 0.5
            }}
          />
        );
      })}
    </div>
  </div>
)

// ─── Chef Image Carousel ────────────────────────────────────────────────────────
const ChefCarousel = () => {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const timerRef = useRef(null)

  const advance = useCallback(() => {
    setCurrent(c => {
      setPrev(c)
      return (c + 1) % carouselImages.length
    })
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(advance, 4000)
    return () => clearInterval(timerRef.current)
  }, [advance])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 md:w-[420px] md:h-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(217,75,0,0.06) 0%, rgba(217,75,0,0.02) 50%, transparent 70%)' }}
        />
      </div>

      {/* Pulse rings */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-orange-primary/5 pointer-events-none"
          style={{ width: 280 + i * 60, height: 280 + i * 60 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.04, 0.15] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      {/* Scaled-up frame container */}
      <div className="relative z-10 w-72 h-[380px] md:w-[420px] md:h-[520px] lg:w-[460px] lg:h-[580px]">
        {/* Visual flames behind the card */}
        <div className="absolute inset-x-0 -bottom-6 h-48 pointer-events-none select-none z-0 overflow-hidden">
          {/* Flickering glow */}
          <motion.div
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at bottom, rgba(217,75,0,0.6) 0%, rgba(217,75,0,0.15) 50%, transparent 80%)'
            }}
            animate={{
              opacity: [0.45, 0.6, 0.48, 0.58, 0.45],
              scaleY: [1, 1.1, 0.95, 1.05, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Flame elements rising behind the card */}
          <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1.5 opacity-80 mix-blend-screen">
            {[...Array(16)].map((_, i) => {
              const height = 50 + Math.random() * 60;
              const width = 14 + Math.random() * 18;
              return (
                <motion.div
                  key={i}
                  className="rounded-t-full"
                  style={{
                    width,
                    height,
                    background: 'linear-gradient(to top, #D94B00 30%, #E5B13C 75%, transparent)',
                    filter: 'blur(4px)',
                    transformOrigin: 'bottom center',
                  }}
                  animate={{
                    height: [height, height * 1.35, height * 0.8, height * 1.2, height],
                    opacity: [0.6, 0.9, 0.5, 0.8, 0.6],
                    x: [0, (Math.random() - 0.5) * 10, 0]
                  }}
                  transition={{
                    duration: 0.9 + Math.random() * 1.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: Math.random() * 0.4
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Slide images card with subtle shadow and border */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-bg-card border border-white/10 shadow-2xl z-10">
          {carouselImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img.src}
              alt={`Chef Piyush Gupta — ${img.label}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: idx === current ? 1 : 0,
                scale: idx === current ? 1.04 : 1
              }}
              transition={{
                opacity: { duration: 1.5, ease: 'easeInOut' },
                scale: { duration: idx === current ? 5 : 0, ease: 'linear' }
              }}
            />
          ))}

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Dot indicators */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setPrev(current); setCurrent(idx); clearInterval(timerRef.current); timerRef.current = setInterval(advance, 4000) }}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === current ? 24 : 8,
                height: 8,
                background: idx === current ? '#D94B00' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Floating name badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-6 py-3 rounded-2xl z-30"
          style={{
            background: 'rgba(20,14,11,0.92)',
            border: '1px solid rgba(217,75,0,0.2)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-poppins font-bold text-white text-sm">
            👨‍🍳 Chef <span style={{ color: '#D94B00' }}>Piyush Gupta</span>
          </p>
          <p className="text-center text-xs mt-0.5" style={{ color: '#A69F9B' }}>Founder · Mr. Khao Khilao</p>
        </motion.div>
      </div>

      {/* Embers */}
      {embers.map((e, i) => (
        <EmberParticle key={i} {...e} />
      ))}
      {smokes.map((s, i) => (
        <SmokeLayer key={i} {...s} />
      ))}
    </div>
  )
}

// ─── Main HeroSection ──────────────────────────────────────────────────────────
const HeroSection = () => {
  const sectionRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 100])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-ambient', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary pt-20"
    >
      {/* Deep ambient glow — cinematic */}
      <div className="hero-ambient absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(217,75,0,0.12) 0%, rgba(217,75,0,0.04) 40%, transparent 70%)' }}
        />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(217,75,0,0.06), transparent 70%)' }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(217,75,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,75,0,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Smoke at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(217,75,0,0.02), transparent)' }}
      />

      {/* Visual background flames spanning the bottom behind all contents */}
      <HeroBackgroundFlames />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-80px)]"
        >
          {/* ── Left Content ── */}
          <div className="space-y-6 lg:space-y-8 z-10">
            {/* Tag */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(217,75,0,0.06)', border: '1px solid rgba(217,75,0,0.15)' }}
              >
                <FaFire style={{ color: '#D94B00', fontSize: 12 }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#D94B00' }}>
                  Premium Street Food Experience
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] tracking-tight">
                Taste Se{' '}
                <span className="text-gradient-orange fire-text">Shuruaat...</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  Brand Tak Ka Safar
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={fadeUp} className="text-base md:text-lg leading-relaxed max-w-lg font-inter" style={{ color: '#A69F9B' }}>
              Chef <span style={{ color: '#D94B00' }} className="font-semibold">Piyush Gupta</span> turned passion into a premium food brand — from working in 5-star hotels across 5 cities to launching{' '}
              <span className="text-white font-semibold">Mr. Khao Khilao</span>. Every dish tells that story.
            </motion.p>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['PS', 'RK', 'VG', 'AD'].map((init, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: '#0A0502',
                      background: `hsl(${20 + i * 15}, 80%, 40%)`,
                      color: '#fff',
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-gold text-xs" />)}
                  <span className="text-white font-bold text-sm ml-1">4.9</span>
                </div>
                <p className="text-xs" style={{ color: '#A69F9B' }}>1,842+ happy customers</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-poppins font-bold text-white text-sm transition-all duration-300 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #D94B00, #E05300)',
                  boxShadow: '0 0 12px rgba(217,75,0,0.15)',
                }}
              >
                <FaFire /> Explore Menu
              </button>
              <button
                onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 px-6 py-4 rounded-xl border font-semibold text-white text-sm group transition-all duration-300 hover:border-orange-primary/30 hover:text-orange-primary"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
              >
                <FaPlay style={{ color: '#D94B00', fontSize: 10 }} className="group-hover:scale-110 transition-transform" />
                Our Journey
              </button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={fadeUp}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="hidden md:flex items-center gap-2 text-sm"
              style={{ color: '#A69F9B' }}
            >
              <HiArrowDown style={{ color: '#D94B00' }} />
              <span>Scroll to explore</span>
            </motion.div>
          </div>

          {/* ── Right — Chef Carousel ── */}
          <motion.div
            variants={slideLeft}
            className="relative flex items-center justify-center z-10"
            style={{ y }}
          >
            <ChefCarousel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
