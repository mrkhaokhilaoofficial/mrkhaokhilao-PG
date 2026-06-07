import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaQuoteLeft } from 'react-icons/fa'
import { fadeUp, staggerContainer, slideRight, slideLeft } from '../../animations/variants'

// Real chef images
import chefImg3 from '../../assets/chef-img-3.jpeg'
import chefImg4 from '../../assets/chef-img-4.jpeg'
import chefImg5 from '../../assets/chef-img-5.jpeg'

const storyMilestones = [
  {
    icon: '💼',
    year: '2018',
    title: 'The Brave Decision',
    text: 'At the age of 22, Chef Piyush Gupta made one of the biggest decisions of his life — leaving the safety of a secure career to follow his passion for cooking.',
    color: '#B3B3B3',
  },
  {
    icon: '⭐',
    year: '2019',
    title: 'The Oberoi Beginning',
    text: 'His professional journey began at The Oberoi Hotel, Agra — one of India\'s finest hospitality groups — where he worked alongside experienced Indian and International chefs.',
    color: '#FFD700',
  },
  {
    icon: '🗺️',
    year: '2020',
    title: 'Five Cities, One Mission',
    text: 'Over the following years he travelled across multiple cities, mastered different cuisines, and sharpened his culinary expertise at every stop.',
    color: '#FFA726',
  },
  {
    icon: '📱',
    year: '2021',
    title: 'Sharing the Craft',
    text: 'Even after gaining valuable experience, his dream remained unchanged — to create something of his own and share authentic recipes with the world.',
    color: '#FF7A00',
  },
  {
    icon: '🔥',
    year: '2023',
    title: 'Mr. Khao Khilao Is Born',
    text: 'That dream became Mr. Khao Khilao. Today the brand is known for unique menu concepts, signature recipes, quality food, and deep customer trust.',
    color: '#FF7A00',
    isHighlight: true,
  },
  {
    icon: '🚀',
    year: 'Future',
    title: 'Building a Food Empire',
    text: 'The journey is no longer just about a restaurant. The mission is to build a trusted food brand and expand through multiple branches and franchises across India.',
    color: '#FFD700',
    isFuture: true,
  },
]

const FounderStory = () => {
  return (
    <section id="founder-story" className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #100800 40%, #0D0D0D 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255,122,0,0.07), transparent)' }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,122,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,0,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.25)' }}
          >
            <FaFire style={{ color: '#FF7A00' }} />
            <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#FF7A00' }}>
              Founder's Journey
            </span>
          </div>

          <h2 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            THE STORY OF{' '}
            <span className="text-gradient-orange fire-text">CHEF PIYUSH GUPTA</span>
          </h2>

          <blockquote className="text-lg md:text-xl font-inter max-w-2xl mx-auto italic"
            style={{ color: 'rgba(255,122,0,0.85)' }}
          >
            <FaQuoteLeft className="inline mr-2 text-sm opacity-60" />
            Taste Se Shuruaat... Brand Tak Ka Safar
          </blockquote>
        </motion.div>

        {/* ── Two-column: images + intro text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — image collage */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{
                border: '2px solid rgba(255,122,0,0.35)',
                boxShadow: '0 0 40px rgba(255,122,0,0.2)',
              }}
            >
              <img src={chefImg3} alt="Chef Piyush Gupta — Founder" className="w-full h-80 md:h-[420px] object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-6 px-5 py-3 rounded-2xl z-20"
              style={{
                background: 'rgba(13,13,13,0.92)',
                border: '1px solid rgba(255,122,0,0.4)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(255,122,0,0.2)',
              }}
            >
              <p className="font-poppins font-bold text-white text-sm">Chef Piyush Gupta</p>
              <p className="text-xs mt-0.5" style={{ color: '#FF7A00' }}>Founder · Mr. Khao Khilao · Est. 2018</p>
            </div>

            {/* Small accent image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-4 top-8 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden z-10"
              style={{
                border: '2px solid rgba(255,215,0,0.35)',
                boxShadow: '0 0 20px rgba(255,215,0,0.15)',
              }}
            >
              <img src={chefImg4} alt="Chef in action" className="w-full h-full object-cover object-top" />
            </motion.div>
          </motion.div>

          {/* Right — intro text */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl leading-relaxed font-inter" style={{ color: 'rgba(255,255,255,0.9)' }}>
              At the age of <span className="font-bold" style={{ color: '#FF7A00' }}>22</span>, Chef Piyush Gupta made one of the biggest decisions of his life. He left the safety of a secure career path and decided to follow his passion for cooking.
            </p>
            <p className="leading-relaxed font-inter" style={{ color: '#B3B3B3' }}>
              His professional journey began at <span className="font-semibold text-white">The Oberoi Hotel, Agra</span>, where he worked alongside experienced Indian and International chefs. During the following years, he travelled across multiple cities, learned different cuisines, and strengthened his culinary expertise.
            </p>
            <p className="leading-relaxed font-inter" style={{ color: '#B3B3B3' }}>
              Even after gaining valuable experience, his dream remained unchanged. He wanted to create something of his own. <span className="font-bold text-white">That dream became Mr. Khao Khilao.</span>
            </p>
            <p className="leading-relaxed font-inter" style={{ color: '#B3B3B3' }}>
              Today, the brand is known for unique menu concepts, signature recipes, quality food, and customer trust. The journey is no longer about a restaurant — the mission is to build a trusted food brand and expand through multiple branches and franchises.
            </p>

            {/* Quote block */}
            <div className="p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,122,0,0.08), rgba(255,215,0,0.04))',
                border: '1px solid rgba(255,122,0,0.2)',
              }}
            >
              <FaQuoteLeft className="absolute top-3 right-4 text-3xl opacity-10" style={{ color: '#FF7A00' }} />
              <p className="font-poppins font-bold text-xl text-white italic leading-snug">
                "Taste Se Shuruaat...<br />
                <span style={{ color: '#FF7A00' }}>Brand Tak Ka Safar"</span>
              </p>
              <p className="text-sm mt-2" style={{ color: '#B3B3B3' }}>— Chef Piyush Gupta</p>
            </div>
          </motion.div>
        </div>

        {/* ── Story Timeline Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {storyMilestones.map((milestone, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
              style={{
                background: milestone.isHighlight
                  ? 'linear-gradient(135deg, rgba(255,122,0,0.12), rgba(255,80,0,0.06))'
                  : 'rgba(26,26,26,0.8)',
                border: `1px solid ${milestone.isHighlight ? 'rgba(255,122,0,0.4)' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: milestone.isHighlight ? '0 0 30px rgba(255,122,0,0.15)' : 'none',
              }}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${milestone.color}10, transparent 70%)` }}
              />

              {/* Year badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{milestone.icon}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: `${milestone.color}20`,
                    color: milestone.color,
                    border: `1px solid ${milestone.color}35`,
                  }}
                >
                  {milestone.year}
                </span>
              </div>

              <h4 className="font-poppins font-bold text-white text-base mb-2 group-hover:text-orange-primary transition-colors">
                {milestone.title}
              </h4>
              <p className="text-sm leading-relaxed font-inter" style={{ color: '#B3B3B3' }}>
                {milestone.text}
              </p>

              {/* Glow line at bottom for highlight */}
              {milestone.isHighlight && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, transparent, #FF7A00, transparent)' }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FounderStory
